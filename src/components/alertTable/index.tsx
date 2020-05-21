import React from 'react'
import Title from '../title/title'
import './index.scss'
import { Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import alertImg from '../../assets/images/alert.png'

interface Alert {
    key: string,
    img: string,
    site: string,
    date: string,
    detail: string,
    status: string
}


const columns: ColumnProps<Alert>[] = [
    {
        title: 'img',
        dataIndex: 'img',
        key: 'img',
        render: img => {
            return <img src={img} alt="img" />
        },
        align: 'center'
    },
    {
        title: 'site',
        dataIndex: 'site',
        key: 'site',
        align: 'center'
    },
    {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
        align: 'center'
    },
    {
        title: 'detail',
        dataIndex: 'detail',
        key: 'detail',
        ellipsis: true,
        align: 'center'
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
        align: 'center'
    }
]

const data: Alert[] = [
    {
        key: '1',
        img: alertImg,
        site: '1',
        date: '2016-05-02 10:51:32',
        detail: '节点test01的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '2',
        img: alertImg,
        site: '2',
        date: '2016-05-02 10:51:32',
        detail: '节点test02的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '3',
        img: alertImg,
        site: '3',
        date: '2016-05-02 10:51:32',
        detail: '节点test03的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '4',
        img: alertImg,
        site: '4',
        date: '2016-05-02 10:51:32',
        detail: '节点test04的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '5',
        img: alertImg,
        site: '5',
        date: '2016-05-02 10:51:32',
        detail: '节点test01的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '6',
        img: alertImg,
        site: '6',
        date: '2016-05-02 10:51:32',
        detail: '节点test01的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '7',
        img: alertImg,
        site: '7',
        date: '2016-05-02 10:51:32',
        detail: '节点test01的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '8',
        img: alertImg,
        site: '8',
        date: '2016-05-02 10:51:32',
        detail: '节点test01的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    },
    {
        key: '9',
        img: alertImg,
        site: '9',
        date: '2016-05-02 10:51:32',
        detail: '节点test2112的电源PS1 Status故障，如果供电正常此故障仍存在，请及时联系售后团队协助处理。',
        status: '未处理'
    }
]


const AlertTable: React.FC = () => {
    return (
        <div className="alertTable">
            <Title title="告警列表" />
            <Table rowClassName={(record, index) => {
                if (index % 2 === 0) {
                    return 'even'
                } else {
                    return 'odd'
                }
            }} scroll={
                {
                    y: 260
                }
            } size="middle" showHeader={false} columns={columns} dataSource={data}></Table>
        </div>
    )
}

export default AlertTable
