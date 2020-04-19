const saveLocalOptions = () => {
    let keys = Object.keys(options)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        localStorage.setItem(key, options[key])
    }
}

const loadLocalOptions = () => {
    let keys = Object.keys(options)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let value = localStorage.getItem(key)
        if (value != undefined) {
            options[key] = value
        }
    }

    let speed = e('#id-input-speed')
    speed.value = options.scrollSpeed

    let scrollString = e('#id-textarea-string')
    scrollString.value = options.scrollString

    let color = e('#id-input-color')
    color.value = options.color
    color.style.background = color.value
}

const updateString = () => {
    let input = e('#id-textarea-string')
    options.scrollString = input.value
    saveLocalOptions()
}

const bindString = () => {
    let input = e('#id-textarea-string')
    bindEvent(input, 'keyup', () => {
        updateString()
    })

    let button = e('#id-button-update-options')
    bindEvent(button, 'click', () => {
        updateString()
    })
}

const bindColor = () => {
    let input = e('#id-input-color')
    bindEvent(input, 'change', () => {
        options.color = input.value
        input.style.background = input.value
        saveLocalOptions()
    })
}

const bindSpeed = () => {
    let input = e('#id-input-speed')
    bindEvent(input, 'change', () => {
        options.scrollSpeed = parseInt(input.value)
        saveLocalOptions()
    })
}

const bindEvents = () => {
    bindString()
    bindColor()
    bindSpeed()
}

const matrixOn = () => {
    let matrix = LedMatrix.instance()
    matrix.on()
}

const __main = () => {
    loadLocalOptions()
    bindEvents()
    matrixOn()
}

__main()
