import React, { useRef, useState, useEffect } from 'react'
import './index.scss'
import yunImg from '../../assets/images/yun.png'
import RoadMapChart from '../../assets/js/roadMap'

interface Site {
    x: number,
    y: number,
    title: string,
    siteImg: any,
    alert: boolean
}

const RoadMap: React.FC = () => {
    const wrapMap = useRef<HTMLDivElement>(null)
    const roadMap = useRef<HTMLCanvasElement>(null)

    const [sitesData, setSites] = useState<Array<Site>>(
        [
            {
                // x: 60,
                x: 60,
                y: -100,
                title: '九龙山站(3/3)',
                siteImg: null,
                alert: false
            },
            {
                x: 160,
                y: -140,
                title: '双桥站(3/3)',
                siteImg: null,
                alert: true
            },
            {
                x: 280,
                y: -180,
                title: '蓟县站(3/3)',
                siteImg: null,
                alert: false
            },
            {
                x: 450,
                y: -150,
                title: '唐山北站(3/3)',
                siteImg: null,
                alert: false
            },
            {
                x: 600,
                y: -160,
                title: '滦县站(3/3)',
                siteImg: null,
                alert: false
            },
            {
                x: 800,
                y: -230,
                title: '秦皇岛站(3/3)',
                siteImg: null,
                alert: false
            }
        ]
    )

    useEffect(() => {
        setTimeout(() => {
            let width: number, height: number;
            if (wrapMap.current) {
                width = wrapMap.current.clientWidth
                height = wrapMap.current.clientHeight
            }

            // 884 和 496 为设计图 1920 * 1080 的宽度
            const sites = JSON.parse(JSON.stringify(sitesData))
            sites.forEach((item: any) => {
                item.x = (item.x / 884) * width
                item.y = (item.y / 496) * height
            })
            new RoadMapChart('#road', sites)
        }, 0)
        
    }, [sitesData])

    return (
        <div ref={ wrapMap } className="roadMap">
            <div className="topImg">
                <img src={ yunImg } alt="yun" />
            </div>
            <div className="con">
                <canvas ref={ roadMap } id="road" width="884px" height="496px"></canvas>
            </div>
        </div>
    )
}


export default RoadMap