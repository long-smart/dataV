import Echarts from './echarts'

/**
 *  IOPS图表
 */
export const IOPS_config = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['读', '写'],
        right: 10,
        top: 10,
        textStyle: {
            color: '#0083ff'
        }
    },
    title: {
        text: '存储IOPS',
        top: 10,
        left: 10,
        textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 14
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '0',
        top: 40,
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            // data: ['12:00', '13:00', '14:00', '15:00', '14:00'],
            axisLabel: {
                color: '#0083ff'
            },
            axisLine: {
                lineStyle: {
                    color: '#0083ff'
                }
            },
            interval: 0
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                color: '#0083ff'
            },
            axisLine: {
                lineStyle: {
                    color: '#0083ff'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#0083ff'
                }
            }
        }
    ],
    series: [
        {
            name: '读',
            type: 'bar',
            itemStyle: {
                // color: '#edc27b'
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#b87b2c' }, //柱图渐变色
                    { offset: 1, color: '#edc27b' } //柱图渐变色
                ])
            },
            barWidth: 10,
            data: [
                ['12:00', 20],
                ['13:00', 5],
                ['14:00', 13],
                ['15:00', 15]
            ]
        },
        {
            name: '写',
            type: 'bar',
            itemStyle: {
                // color: '#21acde'
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#21acde' }, //柱图渐变色
                    { offset: 1, color: '#0072ff' } //柱图渐变色
                ])
            },
            barWidth: 10,
            data: [
                ['12:00', 10],
                ['13:00', 15],
                ['14:00', 23],
                ['15:00', 5]
            ]
        }
    ]
}

/**
 *  存储带宽图表
 */
export const bandWidth_config = {
    title: {
        text: '存储带宽(MB/S)',
        top: 0,
        left: 10,
        textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 14
        }
    },
    tooltip: {
        trigger: 'axis'
        // axisPointer: {
        //     type: 'cross',
        //     label: {
        //         backgroundColor: '#6a7985'
        //     }
        // }
    },
    legend: {
        data: ['读', '写'],
        right: 10,
        top: 0,
        icon: 'roundRect',
        textStyle: {
            color: '#0083ff'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        top: 30,
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: '#0083ff'
            },
            axisLine: {
                lineStyle: {
                    color: '#0083ff'
                }
            },
            interval: 0
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                color: '#0083ff'
            },
            axisLine: {
                lineStyle: {
                    color: '#0083ff'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#0083ff'
                }
            }
        }
    ],
    series: [
        {
            name: '读',
            type: 'line',
            stack: '总量',
            itemStyle: {
                color: '#ffae00'
            },
            areaStyle: {
                color: '#ffae00'
            },
            symbol: 'none', //去掉折线图中的节点
            smooth: true, //true 为平滑曲线，false为直线
            data: [
                ['12:00', 12],
                ['13:00', 15],
                ['14:00', 8],
                ['15:00', 25]
            ]
        },
        {
            name: '写',
            type: 'line',
            stack: '总量',
            itemStyle: {
                color: '#28e1f3'
            },
            areaStyle: {
                color: '#28e1f3'
            },
            symbol: 'none', //去掉折线图中的节点
            smooth: true, //true 为平滑曲线，false为直线
            data: [
                ['12:00', 15],
                ['13:00', 18],
                ['14:00', 9],
                ['15:00', 30]
            ]
        }
    ]
}

/**
 *  容量趋势图表
 */
export const capacity_config = {
    grid: {
        left: '30',
        right: '30',
        top: '30',
        bottom: 30,
        containLabel: false
    },
    tooltip: {
        show: true,
        trigger: 'axis',
        formatter: function(params) {
            const data1 = params[0].data
            if (data1 == '-') {
                return params[1].data
            } else {
                return data1
            }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        axisTick: {
            //是否显示刻度线
            show: false
        },
        axisLabel: {
            //相关轴上的刻度值的设置，show:false，表示不显示轴上的刻度值
            textStyle: {
                //刻度值的字体样式设置
                color: '#0083ff'
            },
            fontSize: 12,
            showMinLabel: true,
            showMaxLabel: true
        },
        axisLine: {
            lineStyle: {
                color: '#0083ff'
            }
        },
        axisPointer: {
            show: true
        },
        data: ['2020.1.1 0:0', '2020.1.2 0:0', '2020.1.3 0:0', '2020.1.4 0:0', '2020.1.5 0:0', '2020.1.6 0:0']
    },
    yAxis: {
        type: 'value',
        nameLocation: 'end',
        nameRotate: 0.1,
        splitNumber: '3',
        min: 0,
        minInterval: 10,
        axisLine: {
            show: true,
            lineStyle: {
                color: '#0083ff'
            }
        },
        axisTick: {
            show: true,
            color: '#0083ff'
        },
        splitLine: {
            lineStyle: {
                color: '#0083ff'
            }
        }
    },
    series: [
        {
            data: [12, 18, 22, 38],
            type: 'line',
            cursor: 'pointer',
            smooth: true,
            // symbol: 'none', //去掉折线图中的节点
            symbolSize: 8,
            itemStyle: {
                color: '#193749'
            },
            lineStyle: {
                color: '#01fcfd'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#063d8a' // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#01fcfd' // 100% 处的颜色
                        }
                    ],
                    global: false // 缺省为 false
                }
            },
            markLine: {
                symbol: ['none', 'none'],
                data: [
                    {
                        yAxis: 45,
                        label: {
                            show: true,
                            // position: 'insideMiddleTop',
                            position: 'insideStartTop',
                            formatter: function() {
                                return '最大设计容量82.0TB'
                            }
                        },
                        lineStyle: {
                            color: '#ff1c1c',
                            type: 'solid'
                        }
                    },
                    {
                        yAxis: 40,
                        label: {
                            show: true,
                            // position: 'insideMiddleTop',
                            position: 'insideStartTop',
                            formatter: function() {
                                return '最大设计容量80%线：65.6TB'
                            }
                        },
                        lineStyle: {
                            color: '#fde907',
                            type: 'dashed'
                        }
                    },
                    {
                        xAxis: '2020.1.4 0:0',
                        label: {
                            show: false
                            // position: 'insideMiddleTop',
                            // position: 'insideStartTop',
                            // formatter: function() {
                            //     return '最大设计容量80%线：65.6TB'
                            // }
                        },
                        lineStyle: {
                            color: '#fff',
                            type: 'solid'
                        }
                    }
                ]
            }
        },
        {
            data: ['-', '-', '-', 38, 48, 60],
            type: 'line',
            smooth: false,
            symbol: 'none',
            lineStyle: {
                color: '#0083ff',
                width: 2,
                type: 'dashed' //'dotted'虚线 'solid'实线
            }
        }
    ]
}
