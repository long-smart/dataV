import React, { useState, useEffect } from 'react'
import Util from '../../assets/js/util'
import '../../style/home.css'
import System from '../../components/system'
import DataStatus from '../../components/dataStatus'
import RoadMap from '../../components/roadMap'
import AlertTable from '../../components/alertTable'
import ClusterStatus from '../../components/clusterStatus'
import Capacity from '../../components/capacity'

export default function() {
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        Util.resetPc()
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [])
    
    return (
        <div className="largeScreen">
            <div className="topTitle">
                <p className="leftRoad">
                    <img src={require('../../assets/images/logo.png')} alt="logo" />
                    <span>京哈线</span>
                </p>
                {/* <p className="rightDate">{ Util.format(date, 'yyyy-MM-dd HH:mm:ss') }</p> */}
                <p className="rightDate">{ Util.format(date, 'yyyy-MM-dd HH:mm:ss') }</p>
            </div>
            <div className="main">
                <div className="column1">
                    <System />
                    <DataStatus />
                </div>
                <div className="column2">
                    <RoadMap />
                    <AlertTable />
                </div>
                <div className="column3">
                    <ClusterStatus />
                    <Capacity />
                </div>
            </div>
        </div>
    )
}
