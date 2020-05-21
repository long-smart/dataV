/**
 *  大屏展示页面的饼图, 类似于仪表盘的图形控件
 */
export default class Pie {
    constructor(id, option) {
        this.ele = document.querySelector(id) // canvas元素
        this.ctx = this.ele.getContext('2d') // canvas context
        this.width = this.ele.width
        this.height = this.ele.height
        this.centerX = this.width / 2 // 圆心x坐标
        this.centerY = this.height / 2 // 圆心y坐标
        this.radius = option.radius || 0 // 半径
        this.pieBorderWidth = option.borderWidth // 饼图的边框宽度
        this.pieBorderColor = option.borderColor // 饼图的边框颜色
        
        if (typeof option.innerPointer == 'object') {
            this.innerPointer = { // 内部指示器
                show: option.innerPointer.show, // 是否显示
                count: option.innerPointer.count || 100, // 指示器数量
                color: option.innerPointer.color || '#03ccbb', // 指示器颜色
                highlight: option.innerPointer.highlight || '#f90' // 指示器高亮颜色
            }
            this.currentProgress = 0 // 当前进度, 执行动画时使用
        }

        // 饼图中心百分比进度
        if (typeof option.progress == 'object') {
            this.progress = {
                show: option.progress.show,
                progress: option.progress.progress, // 百分比
                position: option.progress.position || [this.centerX, this.centerY - 25],
                font: option.progress.font || 28 + "px Arial",
                color: option.progress.color || '#03ccbb'
            }
        }

        // 饼图title
        if (typeof option.title == 'object') {
            this.title = {
                show: option.title.show,
                text: option.title.text,
                position: option.title.position || [this.width / 2, this.height - 20],
                font: option.title.font || 28 + "px Arial",
                color: option.title.color || '#03ccbb'
            }
        }

        this.init()
    }

    /**
     * @description 初始化饼图基本的圆形，指示器，中心文字或进度
     */
    init() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.currentProgress = 0
        
        this.drawCircle()
            .drawPiePointer()
            .drawPieProgress()
            .drawPieTitle()
            .startAnimate()

        return this
    }
    
    /**
     * @description 画圆形
     */
    drawCircle() {
        if (!this.radius) {
            throw new Error('Radius parameter error')
        }
        this.ctx.save()
        this.ctx.beginPath()
        const interval = 25 / 200 * this.height
        // const interval = 25
        this.ctx.arc(this.centerX, this.centerY - interval, this.radius, 0, Math.PI * 2, false)
        this.ctx.lineWidth = this.pieBorderWidth
        this.ctx.strokeStyle = this.pieBorderColor
        this.ctx.stroke()
        this.ctx.restore()
        return this
    }

    /**
     *  @description 画饼图内部的仪表指针
     */
    drawPiePointer() {
        if (!this.innerPointer || !this.innerPointer.show) return
        
        const angle = 360 / this.innerPointer.count // 每个指示器的角度
        const rad = Math.PI / 180 * -90// 指示器器角度 Math.PI / 180 * 90(90deg), 这里是 0deg
        const p = 10 / 200 * this.width
        const x = Math.cos(rad) * (this.radius - p) // 计算指示器的x坐标
        const y = Math.sin(rad) * (this.radius - p) // 计算指示器的y坐标

        this.ctx.save()
        const interval = 25 / 200 * this.height
        // const interval = 25
        this.ctx.translate(this.centerX, this.centerY - interval)

        const x1 = 1 / 200 * this.width
        const x2 = 0.5 / 200 * this.width
        const y1 = 20 / 200 * this.height
        // const y2 = (y + 20) / 200 * this.height

        for (let i = 0; i < this.innerPointer.count; i++) {
            this.ctx.beginPath()
            this.ctx.rotate(Math.PI / 180 * angle)
            this.ctx.moveTo(x - x1, y)
            this.ctx.lineTo(x + x1, y)
            this.ctx.lineTo(x + x2, y + y1)
            this.ctx.lineTo(x - x2, y + y1)
            this.ctx.fillStyle = '#002E8C'
            this.ctx.fill()
        }
        this.ctx.restore()
        return this
    }

    /**
     *  @description 画饼图中心的title
     */
    drawPieProgress() {
        if (!this.progress || !this.progress.show) return
        // 当前进度
        const rate = Number((this.currentProgress / this.innerPointer.count * 100).toFixed(1)) + "%"
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.textAlign = 'center' //绘制的刻度在整个画布左右居中 
        this.ctx.textBaseline = 'middle' 
        this.ctx.font = this.progress.font //设置显示刻度的数字 1,2,3.. 的字体及字号 　
        this.ctx.fillStyle = this.progress.color

        // const x = this.progress.position[0] / 200 * this.width
        // const y = this.progress.position[0] / 200 * this.height

        this.ctx.fillText(rate, this.progress.position[0], this.progress.position[1])
        
        this.ctx.restore()
        return this 
    }

    /**
     *  @description 画title
     */
    drawPieTitle() {
        if (!this.title || !this.title.show) return
        this.ctx.save()
        this.ctx.beginPath()

        this.ctx.textAlign = 'center' //绘制的刻度在整个画布左右居中 
        this.ctx.textBaseline = 'middle'
        this.ctx.font = this.title.font //设置显示刻度的数字 1,2,3.. 的字体及字号 　
        this.ctx.fillStyle = this.title.color
        if (this.title.text) {
            this.ctx.fillText(this.title.text, this.title.position[0], this.title.position[1])
        }

        this.ctx.restore()
        return this 
    }

    /**
     * @description 开启动画, 过渡显示指示器, 开始动画前, 请先渲染基础的带有底色的指示器。
     */
    startAnimate() {
        if (!this.progress || !this.progress.show) return

        const rate = Number(this.progress.progress) || 0 // 当前进度
        if (!rate) return // 如果rate为0, 直接return

        const count = this.innerPointer.count
        const ratePointer = Math.ceil(count * rate) // 当前进度对应的指示器范围, 全部高亮显示
        
        const angle = 360 / count // 每个指示器的角度
        const rad = -Math.PI / 180 * (90)  // 指示器器角度 Math.PI / 180 * 90(90deg)
        const p = 10 / 200 * this.width
        const x = Math.cos(rad) * (this.radius - p) // 计算指示器的x坐标
        const y = Math.sin(rad) * (this.radius - p) // 计算指示器的y坐标

        window.requestAnimationFrame(this.animation.bind(this, ratePointer, x, y, angle)) // 
        return this
    }

    /**
     * 
     * @param {*} count 当前进度
     * @description 将指示器高亮到当前进度的位置
     */
    animation(count, x, y, angle) {
        this.ctx.save()
        this.ctx.clearRect(0, 0, this.width, this.height)
        
        this.drawCircle()
            .drawPiePointer()
            .drawPieProgress()
            .drawPieTitle()

        const interval = 25 / 200 * this.height
        this.ctx.translate(this.centerX, this.centerY - interval)

        const x1 = 1 / 200 * this.width
        const x2 = 0.5 / 200 * this.width
        const y1 = 20 / 200 * this.height
        for (let i = 0; i < this.currentProgress; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(x - x1, y)
            this.ctx.lineTo(x + x1, y)
            this.ctx.lineTo(x + x2, y + y1)
            this.ctx.lineTo(x - x2, y + y1)
            this.ctx.fillStyle = this.innerPointer.highlight
            this.ctx.fill()
            this.ctx.rotate(Math.PI / 180 * angle)
        }
        const timer = window.requestAnimationFrame(this.animation.bind(this, count, x, y, angle))
        
        if (this.currentProgress >= count) {
            window.cancelAnimationFrame(timer)
            this.ctx.restore()
        }
        this.ctx.restore()
        this.currentProgress++
    }

}

// export default Pie