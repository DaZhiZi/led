const log = console.log.bind(console)

const e = sel => document.querySelector(sel)

const bindEvent = (element, event, callback) => {
    element.addEventListener(event, callback)
}

const bitsFromByte = byte => {
    let bits = []
    for (let i = 0; i < 8; i++) {
        let bit = (byte >> i) % 2
        bits.push(bit)
    }
    bits.reverse()
    return bits
}

const bitsFromBytes = bytes => {
    let bits = []
    for (let i = 0; i < bytes.length; i++) {
        let bits8 = bitsFromByte(bytes[i])
        bits = bits.concat(bits8)
    }
    return bits
}

const padRows = (rows, w, h) => {
    for (let i = 0; i < h; i++) {
        let row = rows[i]
        for (let j = 0; j < w; j++) {
            row.push(0)
        }
    }
}

const mergeStringBits = (stringBits, w, h) => {
    let rows = []
    for (let i = 0; i < h; i++) {
        rows.push([])
    }
    // 前面填充 0
    padRows(rows, w, h)
    // 合并字符
    for (let i = 0; i < stringBits.length; i++) {
        let wordBits = stringBits[i]
        for (let j = 0; j < wordBits.length; j++) {
            rows[j] = rows[j].concat(wordBits[j])
        }
    }
    // 后面填充 0
    padRows(rows, w, h)

    return rows
}
