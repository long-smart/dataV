import React, { useRef, useEffect } from 'react'
import './index.scss'
import Title from '../title/title'
import echarts from '../../config/echarts'
import { capacity_config } from '../../config/echartsOption'

let chart: any = null

const Capacity: React.FC = () => {
    const capacity = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {
            chart = echarts.init(capacity.current)
            chart.setOption(capacity_config)
            window.addEventListener('resize', () => {
                chart.resize()
            })
        }, 0)
    }, [])
    return (
        <div className="capacity">
            <Title title="存储容量趋势" />
            <div className="con" ref={ capacity }></div>
        </div>
    )
}


export default Capacity