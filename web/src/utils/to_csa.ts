const map: {[key: string]: string} = {
    '歩': 'FU',
    '香': 'KY',
    '桂': 'KE',
    '銀': 'GI',
    '金': 'KI',
    '飛': 'HI',
    '角': 'KA',
    '王': 'OU',
    'と': 'TO',
    '杏': 'NY',
    '圭': 'NK',
    '全': 'NG',
    '龍': 'RY',
    '馬': 'UM',
}

const to_csa = (i: number, j: number, k: number, l: number, name: string) => {
    return (9 - j).toString() + (1 + i).toString() + (9 - l).toString() + (1 + k).toString() + map[name]
}

export default to_csa;