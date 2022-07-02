import math
import random

import torch

from .base import BasePolicy


class EpsilonGreedy(BasePolicy):
    def __init__(self, net, eps_start=0.9, eps_end=0.05, eps_decay=200):
        self.net = net
        self.eps_start = eps_start
        self.eps_end = eps_end
        self.eps_decay = eps_decay

    def __call__(self, state, legal_labels, steps_done):
        sample = random.random()
        eps_threshold = self.eps_end + (self.eps_start - self.eps_end) * math.exp(-1. * steps_done / self.eps_decay)

        score = 0
        if sample > eps_threshold:
            with torch.no_grad():
                q = self.net(state)
                try:
                    value, select = q[0, legal_labels].max(0)
                except:
                    assert False, legal_labels
                score = int(-math.log(1 / ((torch.clamp(value, -0.99, 0.99).item() + 1) / 2) - 1) * 600)
        else:
            select = random.randrange(len(legal_labels))
        return select, score
