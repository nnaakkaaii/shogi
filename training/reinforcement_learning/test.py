import datetime
import os
from itertools import count

import cshogi
import gym
import torch
from cshogi import KIF

from pkg import envs
from pkg.networks.cnn import CNN
from pkg.policies.softmax import Softmax
from pkg.utils.data import get_state_from_env
from pkg.utils.select_action import SelectAction

VERSION = "2.0.4"
SAVE_DIR = os.path.join('kifu', VERSION)

MAX_MOVES = 512


def test():
    kif = KIF.Exporter()

    net_path = os.path.join('kifu', VERSION, 'net_last.pth')
    state_dict = torch.load(net_path, map_location={'cuda:0': 'cpu'})
    policy_net.load_state_dict(state_dict)

    env.reset()
    state = get_state_from_env(env, device=device)

    os.makedirs(os.path.join(SAVE_DIR, 'test'), exist_ok=True)
    kif.open(os.path.join(SAVE_DIR, 'test', datetime.datetime.now().strftime('%Y%m%d%H%M%S') + '.kifu'))
    kif.header(['dqn', 'dqn'])

    for t in count():
        # Select and perform an action
        move, _, score, mate = select_action(env.board, state)
        _, done, is_draw = env.step(move)

        kif.move(move)
        kif.info('info score cp ' + str(score))

        if mate:
            print('詰み')
            done = True

        if done:
            if is_draw == cshogi.REPETITION_DRAW:
                kif.end('sennichite')
                print('千日手で引き分け')
            elif is_draw == cshogi.REPETITION_WIN:
                kif.end('illegal_win')
                print('千日手で勝ち')
            elif is_draw == cshogi.REPETITION_LOSE:
                kif.end('illegal_lose')
                print('千日手で負け')
            elif t + 1 == MAX_MOVES:
                kif.end('draw')
                print('引き分け')
            else:
                kif.end('resign')
                print('投了')

        if done:
            print(f'{t}手にて終了')
            break

        next_state = get_state_from_env(env, device=device)

        state = next_state


if __name__ == '__main__':
    device = torch.device("cpu")
    policy_net = CNN().to(device)
    env = gym.make('shogi-v0').unwrapped
    policy = Softmax(policy_net)
    select_action = SelectAction(policy, device=device)
    test()
