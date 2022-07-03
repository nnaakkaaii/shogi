import { atom } from 'recoil';

interface PieceProps {
  text: string,
  rotate: boolean,
  isClicked: boolean,
}

const pieceState = atom<PieceProps[]>({
  key: 'pieceState',
  default: [
    {
      text: '香',
      rotate: true,
      isClicked: false,
    },
    {
      text: '桂',
      rotate: true,
      isClicked: false,
    },
    {
      text: '銀',
      rotate: true,
      isClicked: false,
    },
    {
      text: '金',
      rotate: true,
      isClicked: false,
    },
    {
      text: '王',
      rotate: true,
      isClicked: false,
    },
    {
      text: '金',
      rotate: true,
      isClicked: false,
    },
    {
      text: '銀',
      rotate: true,
      isClicked: false,
    },
    {
      text: '桂',
      rotate: true,
      isClicked: false,
    },
    {
      text: '香',
      rotate: true,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '飛',
      rotate: true,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '角',
      rotate: true,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: true,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '歩',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '角',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '飛',
      rotate: false,
      isClicked: false,
    },
    {
      text: '',
      rotate: false,
      isClicked: false,
    },
    {
      text: '香',
      rotate: false,
      isClicked: false,
    },
    {
      text: '桂',
      rotate: false,
      isClicked: false,
    },
    {
      text: '銀',
      rotate: false,
      isClicked: false,
    },
    {
      text: '金',
      rotate: false,
      isClicked: false,
    },
    {
      text: '玉',
      rotate: false,
      isClicked: false,
    },
    {
      text: '金',
      rotate: false,
      isClicked: false,
    },
    {
      text: '銀',
      rotate: false,
      isClicked: false,
    },
    {
      text: '桂',
      rotate: false,
      isClicked: false,
    },
    {
      text: '香',
      rotate: false,
      isClicked: false,
    },
  ],
});

export default pieceState;