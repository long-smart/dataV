import React, { useRef, useState, useEffect } from 'react'
import './index.scss'
import Title from '../title/title'
import Pie from '../../assets/js/pie'


const ClusterStatus: React.FC = () => {
    const CPU = useRef<HTMLCanvasElement>(null)
    const RAM = useRef<HTMLCanvasElement>(null)
    const CAPACITY = useRef<HTMLCanvasElement>(null)
    const USER_CAPACITY = useRef<HTMLCanvasElement>(null)

    const [cpuConfig, setCpuConfig] = useState<any>(
        {
            radius: 72,
            borderWidth: 4,
            borderColor: '#0375EE',
            innerPointer: {
                show: true,
                count: 36,
                color: '#002E8C',
                highlight: '#34FAFB'
            },
            progress: {
                show: true,
                progress: 0.98,
                font: '30px Arial',
                color: '#34FAFB',
                position: [124, 84]
            },
            title: {
                show: true,
                text: 'CPU总数：10',
                font: '14px 微软雅黑',
                color: '#34FAFB',
                position: [124, 190]
            }
        }
    )
    
    const [ramConfig, setRamConfig] = useState<any>(
        {
            radius: 70,
            borderWidth: 4,
            borderColor: '#0375EE',
            innerPointer: {
                show: true,
                count: 36,
                color: '#002E8C',
                highlight: '#34FAFB'
            },
            progress: {
                show: true,
                progress: 0.01,
                font: '30px Arial',
                color: '#34FAFB',
                position: [124, 84]
            },
            title: {
                show: true,
                text: '内存总数：920GB',
                font: '14px 微软雅黑',
                color: '#34FAFB',
                position: [124, 190]
            }
        }
    )
    
    const [physicalCapacity, setPhysicalCapacity] = useState<any>(
        {
            radius: 70,
            borderWidth: 4,
            borderColor: '#0375EE',
            innerPointer: {
                show: true,
                count: 36,
                color: '#002E8C',
                highlight: '#34FAFB'
            },
            progress: {
                show: true,
                progress: 0.5,
                font: '30px Arial',
                // color: '#34FAFB'
                color: '#ff1c1c',
                position: [124, 84]
            },
            title: {
                show: true,
                text: '物理容量：600TB',
                font: '14px 微软雅黑',
                color: '#34FAFB',
                position: [124, 190]
            }
        }
    )

    const [userCapacity, setUserCapacity] = useState<any>(
        {
            radius: 70,
            borderWidth: 4,
            borderColor: '#0375EE',
            innerPointer: {
                show: true,
                count: 36,
                color: '#002E8C',
                highlight: '#34FAFB'
            },
            progress: {
                show: true,
                progress: 0.75,
                font: '30px Arial',
                // color: '#34FAFB'
                color: '#fde907',
                position: [124, 84]
            },
            title: {
                show: true,
                text: '用户容量：450TB',
                font: '14px 微软雅黑',
                color: '#34FAFB',
                position: [124, 190]
            }
        }
    )

    
    useEffect(() => {
        setTimeout(() => {
            const designW = 248
            const designH = 218
            const canvases = [CPU.current, RAM.current, CAPACITY.current, USER_CAPACITY.current]
            const config = JSON.parse(JSON.stringify([cpuConfig, ramConfig, physicalCapacity, userCapacity]))
            canvases.forEach((item: any) => {
                item.width = item.parentNode.clientWidth
                item.height = item.parentNode.clientHeight
            })

            config.forEach((item: any, i: number) => {
                let width = canvases[i]?.width
                let height = canvases[i]?.height
                if (!width) width = 0
                if (!height) height = 0
                
                item.radius = (item.radius / designW) * width
                item.borderWidth = (item.borderWidth / designW) * width
                item.progress.font = `${(26 / designW) * width}px Arial`
                item.progress.position = [(item.progress.position[0] / designW) * width, (item.progress.position[1] / designH) * height]

                item.title.position = [(item.title.position[0] / designW) * width, (item.title.position[1] / designH) * height]

                item.title.font = `${(14 / designW) * width}px 微软雅黑`
            })

            new Pie('#cpu', config[0])
            new Pie('#ram', config[1])
            new Pie('#capacity', config[2])
            new Pie('#userCapacity', config[3])
        }, 0)
    }, [cpuConfig, physicalCapacity, ramConfig, userCapacity])

    return (
        <div className="clusterStatus">
            <Title title="集群状态" />
            <div className="con">
                <ul>
                    <li>
                        <canvas ref={ CPU } width="248" height="218" id="cpu"></canvas>
                    </li>
                    <li>
                        <canvas ref={ RAM } width="248" height="218" id="ram"></canvas>
                    </li>
                    <li>
                        <canvas ref={ CAPACITY } width="248" height="218" id="capacity"></canvas>
                    </li>
                    <li>
                        <canvas ref={ USER_CAPACITY } width="248" height="218" id="userCapacity"></canvas>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ClusterStatus