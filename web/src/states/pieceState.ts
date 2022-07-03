import { atom } from 'recoil';

interface PieceProps {
  text: string,
  rotate: boolean,
}

const pieceState = atom<PieceProps[]>({
  key: 'pieceState',
  default: [
    {
      text: '香',
      rotate: true,
    },
    {
      text: '桂',
      rotate: true,
    },
    {
      text: '銀',
      rotate: true,
    },
    {
      text: '金',
      rotate: true,
    },
    {
      text: '王',
      rotate: true,
    },
    {
      text: '金',
      rotate: true,
    },
    {
      text: '銀',
      rotate: true,
    },
    {
      text: '桂',
      rotate: true,
    },
    {
      text: '香',
      rotate: true,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '飛',
      rotate: true,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '角',
      rotate: true,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '歩',
      rotate: true,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '歩',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '角',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '飛',
      rotate: false,
    },
    {
      text: '',
      rotate: false,
    },
    {
      text: '香',
      rotate: false,
    },
    {
      text: '桂',
      rotate: false,
    },
    {
      text: '銀',
      rotate: false,
    },
    {
      text: '金',
      rotate: false,
    },
    {
      text: '玉',
      rotate: false,
    },
    {
      text: '金',
      rotate: false,
    },
    {
      text: '銀',
      rotate: false,
    },
    {
      text: '桂',
      rotate: false,
    },
    {
      text: '香',
      rotate: false,
    },
  ],
});

export default pieceState;