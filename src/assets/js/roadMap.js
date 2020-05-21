import dotImage from '../images/site.png'
import SiteImage1 from '../images/default_site.png'
import SiteImage2 from '../images/xz1.png'
import SiteImage3 from '../images/yj.png'
import SiteImage4 from '../images/xz.png'

export default class RoadMap {
    constructor(id, sites) {
        this.el = document.querySelector(id)
        this.ctx = this.el.getContext('2d')
        this.width = this.el.width
        this.height = this.el.height
        this.actived = 0
        this.sites = sites
        this.ctx.translate(0, this.height)
        this.init()
    }
    
    init()  {
        this.ctx.textAlign = 'center' 
        this.ctx.textBaseline = 'middle' 
        // 先清除整个画布, 这里画布的原点被设置为 左下角。
        this.ctx.clearRect(0, 0, this.width, -this.height)

        this.drawRoad()

        // 画每个站点
        this.sites.forEach((item, index) => {
            this.drawSite(item.x, item.y, item.title, index)
        })
        
        this.addClick()
    }

    

    /**
     * @description 画站点
     * @param {number} x 站点中心x坐标
     * @param {number} y 站点中心y坐标
     * @param {String} title 站点名称
     * @param {number} index 站点索引
     */
    drawSite(x, y, title, index) {
        // 将x, y坐标转化一下
        // x = x / 884 * this.width // 884为设计图上的canvas大小
        // y = y / 496 * this.height // 884为设计图上的canvas大小
        this.ctx.save()
        const img1 = new Image() // 站点中心小图
        const img2 = new Image() // 站点房子图
    
        img1.src = dotImage
        
        if (index == this.actived) {
            if (this.sites[index].alert) {
                img2.src = SiteImage4
            } else {
                img2.src = SiteImage2
            }
        } else {
            if (this.sites[index].alert) {
                img2.src = SiteImage3
            } else {
                img2.src = SiteImage1
            }
        }
        
        // 画站点中心小图
        img1.onload = () => {
            // let x1 = img1.width / 2
            // let y1 = img1.height / 2
            const width = 15 / 884 * this.width
            const height = 8 / 496 * this.height
            this.ctx.drawImage(img1, x - width / 2, y - height / 2, width, height)
        }

        // 画站点房子图
        img2.onload = () => {
            // let x1 = img2.width / 2
            // let y1 = img2.height
            // 先清除之前画的图片， 每次点击的时候都要重新画图
            // this.ctx.clearRect(x - width, y - height - 15, img2.width, img2.height)
            // 103 * 82
            const width = 103 / 884 * this.width
            const height = 82 / 496 * this.height
            const interval = 20 / 496 * this.height
            this.ctx.drawImage(img2, x - width / 2, y - height - interval, width, height)
            this.sites[index].siteImg = img2
        }
        
        const fontSize = 16 / 884 * this.width
        this.ctx.font = `${fontSize}px 微软雅黑`
        this.ctx.fillStyle = '#00e6ff'
        const intervalX = 10 / 884 * this.width
        const intervalY = 25 / 496 * this.height
        this.ctx.fillText(title, x + intervalX, y + intervalY)
        this.ctx.restore()
    }

    /**
     *  @description 利用贝塞尔曲线画曲线, 连接各个点
     */
    drawRoad() {
        // 以下用于计算 在 884 * 496 下, 等比例缩放的三次贝塞尔曲线的两个控制点的横纵坐标。
        let x1 = 90 / 884 * this.width
        let y1 = -130 / 496 * this.height
        let x2 = 120 / 884 * this.width
        let y2 = -100 / 496 * this.height

        let x3 = 200 / 884 * this.width
        let y3 = -160 / 496 * this.height
        let x4 = 250 / 884 * this.width
        let y4 = -130 / 496 * this.height
        
        let x5 = 320 / 884 * this.width
        let y5 = -200 / 496 * this.height
        let x6 = 410 / 884 * this.width
        let y6 = -120 / 496 * this.height

        let x7 = 500 / 884 * this.width
        let y7 = -180 / 496 * this.height
        let x8 = 560 / 884 * this.width
        let y8 = -210 / 496 * this.height

        let x9 = 680 / 884 * this.width
        let y9 = -140 / 496 * this.height
        let x10 = 760 / 884 * this.width
        let y10 = -160 / 496 * this.height

        
        // 画路线
        this.drawRailway(this.sites[0].x, this.sites[0].y, x1, y1, x2, y2, this.sites[1].x, this.sites[1].y)
        this.drawRailway(this.sites[1].x, this.sites[1].y, x3, y3, x4, y4, this.sites[2].x, this.sites[2].y)
        this.drawRailway(this.sites[2].x, this.sites[2].y, x5, y5, x6, y6, this.sites[3].x, this.sites[3].y)
        this.drawRailway(this.sites[3].x, this.sites[3].y, x7, y7, x8, y8, this.sites[4].x, this.sites[4].y)
        this.drawRailway(this.sites[4].x, this.sites[4].y, x9, y9, x10, y10, this.sites[5].x, this.sites[5].y)
    }

    // 画两个站点间的铁路
    /**
     * @description 画两点之间的铁路
     * @param {*} startX 开始x坐标
     * @param {*} startY 开始y坐标
     * @param {*} ctlx1 控制点1 x坐标
     * @param {*} ctly1 控制点1 y坐标
     * @param {*} ctlx2 控制点2 x坐标
     * @param {*} ctly2 控制点2 y坐标
     * @param {*} endX  结束点x坐标
     * @param {*} endY  结束点y坐标
     */
    drawRailway(startX, startY, ctlx1, ctly1, ctlx2, ctly2, endX, endY) {
        // 画铁路图
        this.ctx.save()
        this.ctx.moveTo(startX, startY)
        const lineWidth = 6 / 496 * this.height
        this.ctx.lineWidth = lineWidth
        this.ctx.strokeStyle = '#0068b7'
        this.ctx.lineJoin = 'round'
        this.ctx.lineCap = 'round'
        this.ctx.bezierCurveTo(ctlx1, ctly1, ctlx2, ctly2, endX, endY)
        this.ctx.stroke()
        
        // 铁轨，黑色
        // this.ctx.globalCompositeOperation = 'copy'
        this.ctx.moveTo(startX, startY)
        const lineWidth1 = 3 / 496 * this.height
        this.ctx.lineWidth = lineWidth1
        
        this.ctx.setLineDash([5 / 496 * this.height, 8 / 496 * this.height])
        this.ctx.bezierCurveTo(ctlx1, ctly1, ctlx2, ctly2, endX, endY)
        this.ctx.strokeStyle = '#00345b'
        this.ctx.stroke()
        this.ctx.restore()
    }

    /**
     *  @description 给canvas添加点击事件,并判断点击的是哪个站点, 让那个站点的图片刷新, 并获取那个站点的数据
     */
    addClick() {
        this.el.onclick = (e) => {
            const offsetx = e.offsetX
            const offsetY = e.offsetY
            const imgY = -(this.height - offsetY)

            this.sites.forEach((item, i) => {
                const img2 = item.siteImg
                const startX = img2.width / 2
                
                // 判断点击的位置是否在每一个站点的图片上
                if (
                    offsetx >= item.x - startX && offsetx <= item.x - startX + img2.width && 
                    imgY >= item.y - img2.height - 15 && imgY <= item.y - 15
                ) {
                    
                    // const index = this.actived
                    // const oldSite = this.sites[this.actived]
                    this.actived = i
                    // const newSite = this.sites[this.actived]
                    
                    // 这里将新图覆盖旧图的做法, 画出来不那么好看(新图不会完全覆盖住旧图, 导致重叠), 但是性能高。
                    // this.drawSite(oldSite.x, oldSite.y, oldSite.title, index)
                    // this.drawSite(newSite.x, newSite.y, newSite.title, this.actived)

                    // 直接清楚整个画布, 重新画所有东西。
                    this.init()
                }
            })
        }
    }
}