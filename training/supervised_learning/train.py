import os
from glob import glob

import cshogi
import torch
import torch.nn as nn
import torch.optim as optim

from pkg import envs
from pkg.networks.cnn import CNN
from pkg.utils.data import get_hcp, get_state_from_board
from pkg.utils.play_action import PlayAction
from pkg.utils.replay_memory import ReplayMemory
from pkg.utils.transition import Transition

GAMMA = 0.7
BATCH_SIZE = 1024
VERBOSE_ITERATIONS = 1024 * 20
VERSION = "2.0.0"
SAVE_DIR = os.path.join('kifu', VERSION)
HCP_DIR = os.path.join('kifu', 'hcp')


def optimize_model():
    if len(memory) < BATCH_SIZE:
        return
    transitions = memory.sample(BATCH_SIZE)
    batch = Transition(*zip(*transitions))

    state_batch = torch.cat(batch.state).to(device)
    action_t_batch = torch.cat(batch.action).flatten().to(device)

    action_y_batch = net(state_batch)

    # Compute Huber loss
    loss = criterion(action_y_batch, action_t_batch)

    # Optimize the model
    optimizer.zero_grad()
    loss.backward()
    for param in net.parameters():
        param.grad.data.clamp_(-1, 1)
    optimizer.step()

    return loss.item()


def train():
    # 棋譜保存用
    os.makedirs(SAVE_DIR, exist_ok=True)
    os.makedirs(os.path.join(SAVE_DIR, 'train'), exist_ok=True)

    net_path = os.path.join(SAVE_DIR, 'net_last.pth')

    if os.path.isfile(net_path):
        state_dict = torch.load(net_path)
        net.load_state_dict(state_dict)
        net.load_state_dict(state_dict)

    hcp_files = glob(os.path.join(HCP_DIR, '*.hcpe'))
    iterator = iter(get_hcp(hcp_files))

    num_iterations = 10000000

    for i in range(num_iterations):
        hcp = next(iterator)
        board.set_hcp(hcp['hcp'])

        state = get_state_from_board(board, device=device)
        _, action, _, _ = play_action(board, hcp)

        # Store the transition in memory
        memory.push(state, action, None, None, None)

        if i % BATCH_SIZE == BATCH_SIZE - 1:
            loss = optimize_model()

            if i % VERBOSE_ITERATIONS == VERBOSE_ITERATIONS - 1:
                print(f'loss = {loss}')
                state_dict = net.state_dict()
                torch.save(state_dict, net_path)



if __name__ == '__main__':
    memory = ReplayMemory(10000)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    net = CNN().to(device)
    optimizer = optim.RMSprop(net.parameters(), lr=1e-5)
    criterion = nn.CrossEntropyLoss().to(device)
    board = cshogi.Board()
    play_action = PlayAction()
    train()
