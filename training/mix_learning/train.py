import datetime
import os
from glob import glob
from itertools import count

import cshogi
import gym
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from cshogi import KIF

from pkg import envs
from pkg.fields import actions as act
from pkg.networks.cnn import CNN
from pkg.policies.epsilon_greedy import EpsilonGreedy
from pkg.utils.data import get_state_from_env, get_hcp, get_state_from_board
from pkg.utils.play_action import PlayAction
from pkg.utils.replay_memory import ReplayMemory
from pkg.utils.select_action import SelectAction
from pkg.utils.transition import Transition

GAMMA = 0.7
BATCH_SIZE = 512
OPTIMIZE_PER_EPISODES = 2
TARGET_UPDATE = 10
MAX_MOVES = 512
VERSION = "1.0.1"
SAVE_DIR = os.path.join('kifu', VERSION)
HCP_DIR = os.path.join('kifu', 'hcp')


def optimize_model():
    if len(memory_s) < BATCH_SIZE:
        return

    transitions = memory_s.sample(BATCH_SIZE)
    batch = Transition(*zip(*transitions))

    state_batch = torch.cat(batch.state).to(device)
    action_t_batch = torch.cat(batch.action).flatten().to(device)

    action_y_batch = policy_net(state_batch)

    # Compute Huber loss
    loss1 = criterion(action_y_batch, action_t_batch)

    if len(memory_r) < BATCH_SIZE:
        return
    transitions = memory_r.sample(BATCH_SIZE)
    batch = Transition(*zip(*transitions))

    non_final_mask = torch.tensor(tuple(map(lambda s: s is not None,
                                            batch.next_state)), device=device, dtype=torch.bool)
    non_final_next_states = torch.cat([s for s in batch.next_state if s is not None])
    state_batch = torch.cat(batch.state)
    action_batch = torch.cat(batch.action)
    reward_batch = torch.cat(batch.reward)

    assert 0 <= action_batch.min() and action_batch.max() < act.NUM_FEATURES

    # 合法手のみ
    non_final_next_actions_list = []
    for next_actions in batch.next_actions:
        if next_actions is not None:
            non_final_next_actions_list.append(next_actions + [next_actions[0]] * (593 - len(next_actions)))
    non_final_next_actions = torch.tensor(non_final_next_actions_list, device=device, dtype=torch.long)

    # Compute Q(s_t, a) - the model computes Q(s_t), then we select the
    state_action_values = policy_net(state_batch).gather(1, action_batch)

    # Compute V(s_{t+1}) for all next states.
    next_state_values = torch.zeros(BATCH_SIZE, device=device)

    # 合法手のみの最大値
    target_q = target_net(non_final_next_states)
    next_state_values[non_final_mask] = target_q.gather(1, non_final_next_actions).max(1)[0].detach()

    # Compute the expected Q values
    # 相手番の価値のため反転する
    expected_state_action_values = (-next_state_values * GAMMA) + reward_batch

    # Compute Huber loss
    loss2 = F.smooth_l1_loss(state_action_values, expected_state_action_values.unsqueeze(1))

    loss = loss1 + loss2

    print(f"loss = {loss.item()}")

    # Optimize the model
    optimizer.zero_grad()
    loss.backward()
    for param in policy_net.parameters():
        param.grad.data.clamp_(-1, 1)
    optimizer.step()


def train():
    # 棋譜保存用
    os.makedirs(SAVE_DIR, exist_ok=True)
    os.makedirs(os.path.join(SAVE_DIR, 'train'), exist_ok=True)
    kif = KIF.Exporter()

    net_path = os.path.join(SAVE_DIR, 'net_last.pth')

    if os.path.isfile(net_path):
        state_dict = torch.load(net_path)
        policy_net.load_state_dict(state_dict)
        target_net.load_state_dict(state_dict)

    hcp_files = glob(os.path.join(HCP_DIR, '*.hcpe'))
    iterator = iter(get_hcp(hcp_files))

    num_episodes = 1000000

    for i_episode in range(num_episodes):
        # Initialize the environment and state
        env.reset()
        state_r = get_state_from_env(env, device=device)
        # env.render('sfen')
        kif.open(os.path.join(SAVE_DIR, 'train', datetime.datetime.now().strftime('%Y%m%d%H%M%S') + '.kifu'))
        kif.header(['dqn', 'dqn'])

        for t in count():
            hcp = next(iterator)
            board.set_hcp(hcp['hcp'])

            state_s = get_state_from_board(board, device=device)
            _, action, _, _ = play_action(board, hcp)

            memory_s.push(state_s, action, None, None, None)

            # Select and perform an action
            move, action, score, mate = select_action(env.board, state_r)
            reward, done, is_draw = env.step(move)

            # 詰みの場合
            if mate:
                reward = 1.0
                done = True
            # 持将棋の場合
            if t + 1 == MAX_MOVES:
                done = True

            reward = torch.tensor([reward], device=device)

            # Observe new state
            if not done:
                next_state = get_state_from_env(env, device=device)
                next_actions = act.get_legal_labels(env.board)
            else:
                next_state = None
                next_actions = None

            # 棋譜出力
            kif.move(move)
            kif.info('info score cp ' + str(score))
            if done:
                if is_draw == cshogi.REPETITION_DRAW:
                    kif.end('sennichite')
                elif is_draw == cshogi.REPETITION_WIN:
                    kif.end('illegal_win')
                elif is_draw == cshogi.REPETITION_LOSE:
                    kif.end('illegal_lose')
                elif t + 1 == MAX_MOVES:
                    kif.end('draw')
                else:
                    kif.end('resign')

            # Store the transition in memory
            memory_r.push(state_r, action, next_state, next_actions, reward)

            # Move to the next state
            state_r = next_state

            if done:
                kif.close()
                break

        if i_episode % OPTIMIZE_PER_EPISODES == OPTIMIZE_PER_EPISODES - 1:
            # Perform several episodes of the optimization (on the target network)
            optimize_model()

            # Update the target network, copying all weights and biases in DQN
            if i_episode // OPTIMIZE_PER_EPISODES % TARGET_UPDATE == 0:
                state_dict = policy_net.state_dict()
                target_net.load_state_dict(state_dict)
                torch.save(state_dict, net_path)

    print('Complete')
    env.close()


if __name__ == '__main__':
    memory_r = ReplayMemory(10000)
    memory_s = ReplayMemory(10000)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    policy_net = CNN().to(device)
    target_net = CNN().to(device)
    optimizer = optim.RMSprop(policy_net.parameters(), lr=1e-5)
    criterion = nn.CrossEntropyLoss().to(device)
    env = gym.make('shogi-v0').unwrapped
    board = cshogi.Board()
    policy = EpsilonGreedy(policy_net)
    play_action = PlayAction()
    select_action = SelectAction(policy, device=device)
    train()
