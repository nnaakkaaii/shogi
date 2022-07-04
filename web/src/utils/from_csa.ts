const map: {[key: string]: string} = {
    'FU': '歩' ,
    'KY': '香' ,
    'KE': '桂',
    'GI': '銀' ,
    'KI': '金' ,
    'HI': '飛' ,
    'KA': '角' ,
    'OU': '王' ,
    'TO': 'と' ,
    'NY': '杏' ,
    'NK': '圭' ,
    'NG': '全' ,
    'RY': '龍' ,
    'UM': '馬' ,
}

const to_csa = (csa: string): [number, number, string] => {
    const i = Number(csa[0]);
    const j = Number(csa[1]);
    const k = Number(csa[2]);
    const l = Number(csa[3]);
    const ij = (9-i) + (j-1)*9;
    const kl = (9-k) + (l-1)*9;
    const name = map[csa.slice(4)];
    return [ij, kl, name]
}

export default to_csa;