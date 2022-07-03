const map: {[key: string]: string} = {
    '歩': 'と',
    '香': '杏',
    '桂': '圭',
    '銀': '全',
    '角': '馬',
    '飛': '龍',
}

const promote: (text: string) => string = (text) => {
    if (text in map) {
        return map[text]
    } else {
        return text
    }
}

export default promote