from collections import defaultdict

import cshogi
import gym
import numpy as np
from gym import spaces

from ..fields import actions as act


class ShogiEnv(gym.Env):
    metadata = {'render.modes': ['human', 'svg', 'ansi', 'sfen']}

    def __init__(self):
        super().__init__()

        self.board = cshogi.Board()
        self.moves = []
        self.repetition_hash = defaultdict(int)
        self.is_draw = None

        self.observation_space = spaces.Box(0, len(cshogi.PIECES)-1, (9, 9), dtype=np.uint8)
        self.action_space = gym.spaces.Discrete(act.NUM_FEATURES)  # sample()は非合法手も含む

    def reset(self, sfen=None, hcp=None):
        if not sfen is None:
            self.board.set_sfen(sfen)
        elif not hcp is None:
            self.board.set_hcp(hcp)
        else:
            self.board.reset()

        self.moves.clear()
        self.repetition_hash.clear()
        self.repetition_hash[self.board.zobrist_hash()] += 1
        self.is_draw = None

        return self.board

    def render(self, mode='human'):
        if mode == 'svg':
            if len(self.moves) > 0:
                return self.board.to_svg(lastmove=self.moves[-1])
            else:
                return self.board.to_svg()
        elif mode == 'ansi':
            print(self.board)
        elif mode == 'sfen':
            print(self.board.sfen())
        else:
            return self.board

    def step(self, move):
        # 投了
        if move == 0:
            reward = -1.0
            done = True
            return reward, done, None

        assert self.board.is_legal(move)

        self.board.push(move)
        self.moves.append(move)

        key = self.board.zobrist_hash()
        self.repetition_hash[key] += 1

        # 千日手
        if self.repetition_hash[key] >= 4:
            done = True
            # 連続王手
            self.is_draw = self.board.is_draw()
            if self.is_draw == cshogi.REPETITION_WIN:
                # 相手の手番なので報酬は反対になる
                reward = -1.0
            elif self.is_draw == cshogi.REPETITION_LOSE:
                reward = 1.0
            else:
                reward = 0.0
            return reward, done, self.is_draw

        # 勝利 or 継続
        done = self.board.is_game_over()
        if done:
            reward = 1.0
        else:
            reward = 0.0
        return reward, done, self.is_draw
