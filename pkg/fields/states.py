import cshogi
import numpy as np

from . import board as b
from . import game as g
from . import pieces as p

# 手番2 * 駒の種類14 = 28
NUM_FEATURES_ON_BOARD_PER_SQUARE = g.NUM_TURNS * p.NUM_ALL_PIECE_TYPES
# 手番2 * 持ち駒数38 = 76
NUM_FEATURES_ON_HAND_PER_SQUARE = g.NUM_TURNS * p.NUM_AVAILABLE_PIECES
# 手番2 * (駒の種類14 + 持ち駒数38) + 繰り返し数1 = 105
NUM_FEATURES_PER_SQUARE = NUM_FEATURES_ON_BOARD_PER_SQUARE + NUM_FEATURES_ON_HAND_PER_SQUARE + g.NUM_FEATURES
# 81 * 105 = 8505
NUM_FEATURES = b.NUM_SQUARES * NUM_FEATURES_PER_SQUARE


def load_state_from_env(env):
    arr = np.zeros((1, NUM_FEATURES_PER_SQUARE, b.NUM_ROWS, b.NUM_COLUMNS), dtype=np.float32)
    # 最初の14*2チャンネルに盤上の駒の配置を記録
    env.board.piece_planes_rotate(arr)
    # 次の38*2チャンネルに手駒を記録
    pieces_in_hand = env.board.pieces_in_hand
    piece_hands_rotate(arr, pieces_in_hand, turn=env.board.turn)
    # 繰り返し数を記録
    arr[0, -1].fill(env.repetition_hash[env.board.zobrist_hash()] / g.MAX_REPETITIONS)
    return arr


def load_state_from_board(board):
    arr = np.zeros((1, NUM_FEATURES_PER_SQUARE, b.NUM_ROWS, b.NUM_COLUMNS), dtype=np.float32)
    board.piece_planes_rotate(arr)
    pieces_in_hand = board.pieces_in_hand
    piece_hands_rotate(arr, pieces_in_hand, turn=board.turn)
    arr[0, -1].fill(0.)
    return arr


def piece_hands_rotate(arr, pieces_in_hand, turn=cshogi.BLACK):
    """
    >>> v = np.zeros((1, 105, 1, 1), dtype=np.float32)
    >>> piece_hands_rotate(v, ([2, 1, 0, 0, 3, 0, 1], [1, 0, 2, 2, 0, 0, 0]), turn=0)
    >>> v[0, :28].sum()
    0.0
    >>> v.flatten().astype(int).tolist()[28:66]
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0]
    >>> v.flatten().astype(int).tolist()[66:104]
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    """
    if turn == cshogi.WHITE:
        pieces_in_hand = (pieces_in_hand[1], pieces_in_hand[0])
    start = NUM_FEATURES_ON_BOARD_PER_SQUARE
    for hands in pieces_in_hand:
        for hp, num in enumerate(hands):  # 各駒種について
            arr[0, start:(start+num)].fill(1.)
            start += p.AVAILABLE_PIECES[hp]
    return


if __name__ == '__main__':
    import doctest
    doctest.testmod(verbose=True)
