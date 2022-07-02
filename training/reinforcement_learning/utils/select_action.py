import torch

from pkg.fields import actions as act

from ..policies.base import BasePolicy


class SelectAction(BasePolicy):
    def __init__(self, policy: BasePolicy, device=torch.device('cpu')):
        self.steps_done = 0
        self.policy = policy
        self.device = device

    def __call__(self, board, state):
        self.steps_done += 1

        # 詰み探索
        if not board.is_check():
            move = board.mate_move(5)
            if move != 0:
                return move, torch.tensor([[act.load_action(move, board.turn)]], device=self.device, dtype=torch.long), 30000, True

        legal_moves, legal_labels = act.get_legal_moves_labels(board)

        select, score = self.policy(state, legal_labels, self.steps_done)

        return legal_moves[select], torch.tensor([[legal_labels[select]]], device=self.device, dtype=torch.long), score, False
