from gym.envs.registration import register

register(
    id='shogi-v0',
    entry_point='training.reinforcement_learning.envs.env:ShogiEnv'
)
