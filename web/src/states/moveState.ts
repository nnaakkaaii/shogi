import { atom } from 'recoil';

const moveState = atom<{[index: number]: number[]}>({
  key: 'moveState',
  default: {
    54: [45],
    55: [46],
    56: [47],
    57: [48],
    58: [49],
    59: [50],
    60: [51],
    61: [52],
    62: [53],
    70: [71, 69, 68, 67, 66, 65],
    72: [63],
    74: [66, 65],
    75: [67, 66, 65],
    76: [68, 67, 66],
    77: [69, 68, 67],
    78: [69, 68],
    80: [71],
  },
});

export default moveState;