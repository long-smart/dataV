/**
 *  数据同步仪表盘图表
 */
export default class Dashboard {
    constructor(id, radius, rate, pointerWidth, fontSize) {
        this.el = document.querySelector(id)
        this.ctx = this.el.getContext('2d')
        this.width = this.el.width
        this.height = this.el.height
        this.centerX = this.width / 2
        this.centerY = this.height / 2
        this.radius = radius
        this.rate = rate
        this.countRate = this.rate * 180 // 当前百分比乘以度数, 0.9 * 180(计算90%对应的弧度)
        this.currentRate = 0

        this.pointerWidth = pointerWidth // 指针长度
        this.fontSize = fontSize

        this.init()
    }

    init() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawWrapDash()
        this.drawInnerCircle()
        this.drawText()
        // this.drawBottomText()
        window.requestAnimationFrame(this.drawPointer.bind(this, this.rate))
    }

    /**
     *  @description 画外层虚线
     */
    drawWrapDash() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(this.centerX, this.centerY, this.radius, Math.PI / 180 * 150, Math.PI / 180 * 30, false)
        this.ctx.strokeStyle = '#002DD9'
        this.ctx.lineWidth = 5
        this.ctx.setLineDash([12])
        this.ctx.stroke()
        this.ctx.restore()
    }

    /**
     *  @description 画内层渐变圆
     */
    drawInnerCircle() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.translate(this.centerX, this.centerY)
        this.ctx.arc(0, 0, this.radius - 15, Math.PI / 180 * 140, Math.PI / 180 * 40, false)
        let gr = this.ctx.createLinearGradient(-70, -70, 50, 30)
        gr.addColorStop(0, '#0070F3')
        gr.addColorStop(1, '#00F378')
        this.ctx.strokeStyle = gr
        this.ctx.lineWidth = 10
        this.ctx.stroke()
        this.ctx.restore()
    }

    /**
     *  @description 画指针
     */
    drawPointer(rate) {
        if (rate < 0 || rate > 1) throw new Error('rate parameter error')
        this.currentRate += 2 // 当前进度++
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawWrapDash()
        this.drawInnerCircle()
        this.drawText()
        // this.drawBottomText()

        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.translate(this.centerX, this.centerY + 20)
        this.ctx.rotate(Math.PI / 180 * this.currentRate)
        this.ctx.moveTo(-2, -4)
        this.ctx.lineTo(-2, 4)
        this.ctx.lineTo(-this.pointerWidth, 0)
        this.ctx.fillStyle = '#00F5F5'
        this.ctx.fill()

        this.ctx.beginPath()
        this.ctx.arc(0, 0, 5, 0, Math.PI * 2, false)
        this.ctx.fillStyle = '#00F5F5'
        this.ctx.fill()
        this.ctx.textAlign = 'center' //绘制的刻度在整个画布左右居中 
        this.ctx.textBaseline = 'middle' 
        this.ctx.fillStyle = '#000'
        this.ctx.fillText('+', 0, 0)
        this.ctx.restore()
        const timer = window.requestAnimationFrame(this.drawPointer.bind(this, rate))
        
        if (this.currentRate >= this.countRate) {
            window.cancelAnimationFrame(timer)
        }
    }

    /**
     *  @description 画文字
     */
    drawText() {
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.translate(this.centerX, this.centerY)
        const rad1 = Math.PI / 180 * 140
        const x1 = Math.cos(rad1) * this.radius
        const y1 = Math.sin(rad1) * this.radius
        this.ctx.textAlign = 'center' //绘制的刻度在整个画布左右居中 
        this.ctx.textBaseline = 'middle'
        this.ctx.fillStyle = '#fff'
        this.ctx.font = `${this.fontSize}px 微软雅黑`
        this.ctx.fillText('0', x1 - 10, y1)

        const rad2 = Math.PI / 180 * 40
        const x2 = Math.cos(rad2) * this.radius
        const y2 = Math.sin(rad2) * this.radius
        this.ctx.fillText('100', x2 + 10, y2)
        this.ctx.restore()
    }

    /**
     *  @description 画图表底部的文字
     */
    drawBottomText() {
        const rate = Math.floor(this.currentRate / 180 * 100) + '%'
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.translate(this.centerX, this.centerY + 10)
        this.ctx.textAlign = 'center' //绘制的刻度在整个画布左右居中 
        this.ctx.textBaseline = 'middle' 
        this.ctx.fillStyle = '#fff'
        this.ctx.font = '14px SimSun, Songti SC'
        this.ctx.fillText('已同步' + rate, 0, 30)
        this.ctx.restore()
    }
}