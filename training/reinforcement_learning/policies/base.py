import abc


class BasePolicy(metaclass=abc.ABCMeta):
    @abc.abstractclassmethod
    def __call__(self, board, state, steps_done=0):
        pass
