import os

import cshogi
import torch

from pkg.networks.cnn import CNN
from pkg.policies.softmax import Softmax
from pkg.utils.data import get_state_from_board
from pkg.utils.select_action import SelectAction

VERSION = '2.0.3'


def handler(csa_moves):
    """
    >>> handler(['7776FU', '3334FU'])
    {'opponent_move': '8822UM', 'next_moves': ['1314FU', '2324FU', '3435FU', '4344FU', '5354FU', '6364FU', '7374FU', '8384FU', '9394FU', '1112KY', '9192KY', '2133KE', '3122GI', '3132GI', '3142GI', '7162GI', '7172GI', '8222HI', '8232HI', '8242HI', '8252HI', '8262HI', '8272HI', '8292HI', '4132KI', '4142KI', '4152KI', '6152KI', '6162KI', '6172KI', '5142OU', '5152OU', '5162OU']}
    """
    # 盤面を再生
    board = cshogi.Board()
    for csa_move in csa_moves:
        move = board.move_from_csa(csa_move)
        board.push(move)
    
    # AIの手
    net = CNN()
    net_path = os.path.join('kifu', VERSION, 'net_last.pth')
    state_dict = torch.load(net_path, map_location={'cuda:0': 'cpu'})
    net.load_state_dict(state_dict)

    policy = Softmax(net)
    select_action = SelectAction(policy)

    state = get_state_from_board(board)
    opponent_move, _, _, _ = select_action(board, state)
    board.push(opponent_move)
    opponent_move_csa = cshogi.move_to_csa(opponent_move)

    # 次のユーザーの取り得る手
    next_moves_csa = []
    for move in board.legal_moves:
        next_move_csa = cshogi.move_to_csa(move)
        next_moves_csa.append(next_move_csa)
    return {'opponent_move': opponent_move_csa, 'next_moves': next_moves_csa}


if __name__ == '__main__':
    import doctest
    doctest.testmod(verbose=True)
