const map: {[key: string]: string} = {
    'と': '歩',
    '杏': '香',
    '圭': '桂',
    '全': '銀',
    '馬': '角',
    '龍': '飛',
}

const unpromote: (text: string) => string = (text) => {
    if (text in map) {
        return map[text]
    } else {
        return text
    }
}

export default unpromote