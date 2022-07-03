import { atom } from 'recoil';

const newGameState = atom<boolean>({
  key: 'newGameState',
  default: false,
});

export default newGameState;