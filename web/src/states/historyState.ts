import { atom } from 'recoil';

const historyState = atom<string[]>({
  key: 'historyState',
  default: [],
});

export default historyState;