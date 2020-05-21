import React, { useState } from 'react'
import Title from '../../components/title/title'
import './index.scss'

interface Item {
    key: number|string,
    label: string,
    online: number,
    offline: number,
    total: number
}


export default function System() {
    const [scale, setScaleNum] = useState<Array<number>>([1, 2, 3, 4, 5, 6, 7, 8])
    const [systemOverview, setSystem] = useState<Array<Item>>(
        [
            {
                key: 0,
                label: '集群',
                online: 3,
                offline: 5,
                total: 8
            },
            {
                key: 1,
                label: '服务器',
                online: 10,
                offline: 5,
                total: 25
            },
            {
                key: 2,
                label: '存储池',
                online: 10,
                offline: 5,
                total: 15
            },
            {
                key: 3,
                label: '视图',
                online: 10,
                offline: 5,
                total: 15
            },
            {
                key: 4,
                label: '磁盘',
                online: 10,
                offline: 5,
                total: 15
            }
        ]
    )

    return (
        <div className="system">
            <Title title="系统概述" />
            <ul className="con">
                {
                    systemOverview?.map(item => {
                        return (
                            <li key={item.key}>
                                <div className="left_label">{ item.label }</div>
                                <div className="right_progress">
                                    <div className="online">
                                        <div className="val">{ item.online }</div>
                                        {
                                            
                                            [...scale].reverse().map(num => {
                                                const cls: string = num <= Math.round(scale.length * (item.online / item.total)) ? 'active ' : ''

                                                return (
                                                    <p key={num} className={cls + 'block'}></p>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="offline">
                                        <div className="val">{ item.offline }</div>
                                        {
                                            scale.map(num => {
                                                const cls: string = num <= Math.round(scale.length * (item.offline / item.total)) ? 'active' : ''
                                                return (
                                                    <p key={num} className={cls + ' block'}></p>
                                                )
                                            })
                                        }
                                    </div>
                                    <p className="xian"></p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}