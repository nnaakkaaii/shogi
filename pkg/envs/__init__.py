from gym.envs.registration import register

register(
    id='shogi-v0',
    entry_point='pkg.envs.env:ShogiEnv'
)
