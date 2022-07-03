import math

import torch

from .base import BasePolicy


class Softmax(BasePolicy):
    def __init__(self, net, temperature=0.6):
        self.net = net
        self.temperature = temperature

    def __call__(self, state, legal_labels, steps_done):
        with torch.no_grad():
            q = self.net(state)
            log_prob = q[0, legal_labels] / self.temperature
            select = torch.distributions.categorical.Categorical(logits=log_prob).sample()
            value = q[0, legal_labels[select]]
            score = int(-math.log(1 / ((torch.clamp(value, -0.99, 0.99).item() + 1) / 2) - 1) * 600)
        return select, score
