import { atom } from 'recoil';

const finishGameState = atom<string>({
  key: 'finishGameState',
  default: '',  // '': ゲーム継続, '投了': 投了で終了, '詰み': 詰みで終了
});

export default finishGameState;