import cshogi

board = cshogi.Board()

for move in board.legal_moves:
    print(cshogi.move_to_usi(move))
