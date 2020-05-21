import React, { useState, useRef, useEffect } from 'react'
import Title from '../title/title'
import './index.scss'
import DashChart from '../../assets/js/dashboard'
import { IOPS_config, bandWidth_config } from '../../config/echartsOption'
import echarts from '../../config/echarts'
import usableImg from '../../assets/images/usable.png'
import unusableImg from '../../assets/images/unusable.png'

const DataStatus: React.FC = () => {
    // 数据可用 true 数据不可用 false
    let [usableState, setUsableState] = useState<boolean>(false)
    // 同步比例
    let [rate, setRate] = useState<number>(0.1)

    const Dashboard = useRef<HTMLCanvasElement>(null)
    const DashWrap = useRef<HTMLDivElement>(null)
    const IOPS = useRef<HTMLDivElement>(null)
    const BandWidth = useRef<HTMLDivElement>(null)

    // useEffect和 componentDidMouted获取 ref高度时, 不准确。
    useEffect(() => {
        // 设置iops和带宽
        const iops = echarts.init(IOPS.current)
        const bandWidth = echarts.init(BandWidth.current)
        iops.setOption(IOPS_config)
        bandWidth.setOption(bandWidth_config)

        setTimeout(() => {
            iops.resize()
            bandWidth.resize()
            if (Dashboard.current && DashWrap.current) {
                Dashboard.current.width = DashWrap.current.clientWidth
                Dashboard.current.height = DashWrap.current.clientHeight - 20
                console.log(DashWrap.current.clientHeight)
            }

            let radius = Number(document.documentElement.style.fontSize.replace('px', '')) * 0.38
            let pointerWidth = Number(document.documentElement.style.fontSize.replace('px', '')) * 0.38
            let fontSize = Number(document.documentElement.style.fontSize.replace('px', '')) * 0.14
            if (!radius) radius = 40
            if (!pointerWidth) pointerWidth = 50
            if (!fontSize) fontSize = 14
            // 设置仪表盘
            new DashChart('#dashboard', radius, rate, pointerWidth, fontSize)
        }, 0)
    }, [rate])
    return (
        <div className="dataStatus">
            <Title title="数据状态" />
            <div className="con">
                <div className="top">
                    <div className="leftImg">
                        {
                            usableState ? <img src={ usableImg } alt="可用" /> : 
                            <img src={ unusableImg } alt="不可用" />
                        }
                        {
                            usableState ? <p className="label">数据可用</p> : 
                            <p className="label">数据不可用</p>
                        }
                    </div>
                    <div className="rightDashboard" ref={ DashWrap }>
                        <canvas ref={ Dashboard } width="200" height="80" id="dashboard"></canvas>
                        <p className="label">已同步 { rate * 100 }%</p>
                    </div>
                </div>
                <div ref={ IOPS } className="iops"></div>
                <div ref={ BandWidth } className="bandWidth"></div>
            </div>
        </div>
    )
}

export default DataStatus