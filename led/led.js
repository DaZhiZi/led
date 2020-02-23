class LedMatrix {
    constructor() {
        this.fps = 60
        this.height = 16
        this.width = 32
        this.pixelRadius = 5
        this.pixelSpace = 1
        this.pixels = new Array(this.height * this.width).fill(0)
        this.canvas = e('#id-canvas-matrix')
        this.context = this.canvas.getContext('2d')
        this.color = options.color
        this.cooldownSpeed = 10 - options.scrollSpeed % 10
        this.cooldown = this.cooldownSpeed
        this.scrollString = options.scrollString
        this.scrollStringBits = Font.stringBitsFromString(this.scrollString)
        this.scrollOffset = 0
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    updateColor() {
        this.color = options.color
    }

    updateScrollSpeed() {
        this.cooldownSpeed = 10 - options.scrollSpeed % 10
    }

    updateScrollString() {
        if (this.scrollString != options.scrollString) {
            this.scrollString = options.scrollString
            this.scrollStringBits = Font.stringBitsFromString(this.scrollString)
            this.scrollOffset = 0
        }
    }

    pixelColor(x, y) {
        let pixel = this.pixels[this.width * y + x]
        let color = '#ccc'
        if (pixel == 1) {
            color = this.color
        }

        return color
    }
    isScroll() {
        this.cooldown -= 1
        let scroll = false
        if (this.cooldown == 0) {
            this.cooldown = this.cooldownSpeed
            if (this.cooldownSpeed != 10) {
                scroll = true
            }
        }
        return scroll
    }
    update() {
        this.updateColor()
        this.updateScrollSpeed()
        this.updateScrollString()

        if (this.isScroll()) {
            let scrollWidth = this.scrollStringBits[0].length - this.width
            if (this.scrollOffset < scrollWidth) {
                this.scrollOffset += 1
            } else {
                this.scrollOffset = 0
            }
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    this.pixels[this.width * y + x] = this.scrollStringBits[y][this.scrollOffset + x]
                }
            }
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    draw() {
        let radius = this.pixelRadius
        let space = this.pixelSpace
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let px = (x + 1) * space + (2 * x + 1) * radius
                let py = (y + 1) * space + (2 * y + 1) * radius
                let circle = new Path2D()
                circle.arc(px, py, radius, 0, 2 * Math.PI)
                this.context.fillStyle = this.pixelColor(x, y)
                this.context.fill(circle)
            }
        }
    }

    on() {
        this.update()
        // clear
        this.clear()
        // draw
        this.draw()
        // interval
        setTimeout(() => {
            this.on()
        }, 1000 / this.fps)
    }
}

