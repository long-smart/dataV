import React from 'react'
import Title from '../title/title'
import './index.scss'
import DashChart from '../../assets/js/dashboard'
import { IOPS_config, bandWidth_config } from '../../config/echartsOption'
import echarts from '../../config/echarts'
import usableImg from '../../assets/images/usable.png'
import unusableImg from '../../assets/images/unusable.png'


export default class DataStatus extends React.Component<any, any> {
    public Dashboard: any
    public DashWrap: any
    public IOPS: any
    public BandWidth: any
    constructor(props: any) {
        super(props)
        this.state = {
            usableState: false,
            rate: 0.1
        }
    }

    public componentDidMount() {
        // 设置iops和带宽
        const iops = echarts.init(this.IOPS)
        const bandWidth = echarts.init(this.BandWidth)
        iops.setOption(IOPS_config)
        bandWidth.setOption(bandWidth_config)

        setTimeout(() => {
            iops.resize()
            bandWidth.resize()
            if (this.Dashboard.current && this.DashWrap.current) {
                this.Dashboard.current.width = this.DashWrap.current.clientWidth
                this.Dashboard.current.height = this.DashWrap.current.clientHeight - 20
                console.log(this.DashWrap.current.clientHeight)
            }

            let radius = Number(document.documentElement.style.fontSize.replace('px', '')) * 0.38
            let pointerWidth = Number(document.documentElement.style.fontSize.replace('px', '')) * 0.38
            let fontSize = Number(document.documentElement.style.fontSize.replace('px', '')) * 0.14
            if (!radius) radius = 40
            if (!pointerWidth) pointerWidth = 50
            if (!fontSize) fontSize = 14
            // 设置仪表盘
            new DashChart('#dashboard', radius, this.state.rate, pointerWidth, fontSize)
        }, 0)
    }

    public render() {
        return (
            <div className="dataStatus">
                <Title title="数据状态" />
                <div className="con">
                    <div className="top">
                        <div className="leftImg">
                            {
                                this.state.usableState ? <img src={ usableImg } alt="可用" /> : 
                                <img src={ unusableImg } alt="不可用" />
                            }
                            {
                                this.state.usableState ? <p className="label">数据可用</p> : 
                                <p className="label">数据不可用</p>
                            }
                        </div>
                        <div className="rightDashboard" ref={ (ref) => this.DashWrap = ref }>
                            <canvas ref={(ref) => this.Dashboard = ref} width="200" height="80" id="dashboard"></canvas>
                            <p className="label">已同步 { this.state.rate * 100 }%</p>
                        </div>
                    </div>
                    <div ref={ (ref) => this.IOPS = ref } className="iops"></div>
                    <div ref={ (ref) => this.BandWidth = ref } className="bandWidth"></div>
                </div>
            </div>
        )
    }
}