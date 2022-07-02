import torch

from pkg.fields import states as sts


def get_state(env, device=torch.device('cpu')):
    features = sts.load_state(env)
    state = torch.from_numpy(features[:1]).to(device)
    return state
