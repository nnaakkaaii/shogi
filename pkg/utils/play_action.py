import cshogi
import torch

from pkg.fields import actions as act


class PlayAction:
    def __init__(self, device=torch.device('cpu')):
        self.device = device

    def __call__(self, board, hcp):

        move = board.move_from_move16(hcp['bestMove16'])
        action = torch.tensor([[act.load_action(move, board.turn)]], device=self.device, dtype=torch.long)

        return move, action, 0, False
