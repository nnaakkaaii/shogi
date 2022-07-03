import random

import cshogi
import numpy as np
import torch

from pkg.fields import states as sts


def get_state_from_env(env, device=torch.device('cpu')):
    features = sts.load_state_from_env(env)
    state = torch.from_numpy(features[:1]).to(device)
    return state


def get_state_from_board(board, device=torch.device('cpu')):
    features = sts.load_state_from_board(board)
    state = torch.from_numpy(features[:1]).to(device)
    return state


def get_hcp(hcp_files):
    hcpes = None
    hcp_index = 0

    while True:
        if hcp_index == 0:
            index = random.randint(0, len(hcp_files) - 1)
            hcp_file = hcp_files[index]
            hcpes = np.fromfile(hcp_file, dtype=cshogi.HuffmanCodedPosAndEval)

        ret = hcpes[hcp_index]
        hcp_index += 1

        if hcp_index == len(hcpes):
            hcp_index = 0

        yield ret
