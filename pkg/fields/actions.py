import cshogi

from .board import NUM_SQUARES
from .pieces import NUM_ALL_PIECE_TYPES, PIECE_TYPES_TO_CSA

# 駒の種類14
NUM_FEATURES_PER_SQUARE = NUM_ALL_PIECE_TYPES
# 81 * 14 = 1134
NUM_FEATURES = NUM_SQUARES * NUM_FEATURES_PER_SQUARE


def load_action(move, turn=cshogi.BLACK):
    if turn == cshogi.WHITE:
        move = cshogi.move_rotate(move)
    return cshogi.move_to(move) * NUM_ALL_PIECE_TYPES + PIECE_TYPES_TO_CSA[cshogi.move_to_csa(move)[-2:]] - 1


def get_legal_moves_labels(board):
    legal_moves = []
    legal_labels = []
    for move in board.legal_moves:
        legal_moves.append(move)
        legal_labels.append(load_action(move, turn=board.turn))

    return legal_moves, legal_labels


def get_legal_labels(board):
    legal_labels = []
    for move in board.legal_moves:
        legal_labels.append(load_action(move, turn=board.turn))

    return legal_labels
