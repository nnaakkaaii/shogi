import { atom } from 'recoil';


export interface Piece {
    name: string,
    count: number,
    isClicked: boolean,
}

export const myHandPieceState = atom<{[name: string]: Piece}>({
    key: 'myHandPieceState',
    default: {
        '歩': {
            name: '歩',
            count: 0,
            isClicked: false,
        },
        '香': {
            name: '香',
            count: 0,
            isClicked: false,
        },
        '桂': {
            name: '桂',
            count: 0,
            isClicked: false,
        },
        '銀': {
            name: '銀',
            count: 0,
            isClicked: false,
        },
        '金': {
            name: '金',
            count: 0,
            isClicked: false,
        },
        '角': {
            name: '角',
            count: 0,
            isClicked: false,
        },
        '飛': {
            name: '飛',
            count: 0,
            isClicked: false,
        },
    }
});

export const yourHandPieceState = atom<{[name: string]: Piece}>({
    key: 'yourHandPieceState',
    default: {
        '歩': {
            name: '歩',
            count: 0,
            isClicked: false,
        },
        '香': {
            name: '香',
            count: 0,
            isClicked: false,
        },
        '桂': {
            name: '桂',
            count: 0,
            isClicked: false,
        },
        '銀': {
            name: '銀',
            count: 0,
            isClicked: false,
        },
        '金': {
            name: '金',
            count: 0,
            isClicked: false,
        },
        '角': {
            name: '角',
            count: 0,
            isClicked: false,
        },
        '飛': {
            name: '飛',
            count: 0,
            isClicked: false,
        },
    }
});
