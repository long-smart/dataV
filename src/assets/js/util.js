/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable no-extend-native */
var bytesToSizeForCount = function(bytes, k, precision) {
    if (bytes === 0) {
        return [0, 'B']
    } else if (!bytes) {
        return '数据异常'
    } else if (bytes < 1) {
        return [bytes, 'B']
    } else {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        var i = Math.floor(Math.log(bytes) / Math.log(k))
        return [(bytes / Math.pow(k, i)).toFixed(precision), sizes[i]]
    }
}
/**
 *
 * @param { number } bytes 字节数
 * @param { number } k 进制 (1024)
 * @param { number } precision 保留几小数
 * @returns { string } 返回将字节为单位的容量转化为 对应的 TB/GB
 */
var bytesToSize = function(bytes, k, precision) {
    if (bytes === 0) {
        return '0B'
    } else if (!bytes) {
        return '数据异常'
    } else if (bytes < 1) {
        return bytes + 'B'
    } else {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        var i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toFixed(precision) + sizes[i]
    }
}
var bytesToSizeForChart = function(bytes, k, precision) {
    if (bytes === 0) {
        return '0'
    } else if (bytes < 1) {
        return bytes + ''
    } else {
        var sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
        var i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toFixed(precision) + sizes[i]
    }
}
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'H+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return fmt
}
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).UTCFormat("yyyy-MM-ddThh:mm:ss.SZ") ==> 2006-07-02T08:09:04.423Z
//(new Date()).UTCFormat("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.UTCFormat = function(fmt) {
    var o = {
        'M+': this.getUTCMonth() + 1, //月份
        'd+': this.getUTCDate(), //日
        'h+': this.getUTCHours(), //小时
        'm+': this.getUTCMinutes(), //分
        's+': this.getUTCSeconds(), //秒
        'q+': Math.floor((this.getUTCMonth() + 3) / 3), //季度
        S: this.getUTCMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getUTCFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return fmt
}

// function getUrlParam(name) {
// 	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
// 	var r = window.location.search.substr(1).match(reg);
// 	if (r != null) {
// 		return unescape(r[2]);
// 	} else {
// 		return null;
// 	}
// }

/**
 * @param {*} dataMax
 * @returns 返回Echarts图表的max属性, 确定Y轴的最大值
 */
function getTickMax(dataMax) {
    if (dataMax === 0) {
        return 1
    } else {
        var tickInterval = this.getTickInterval(dataMax)
        var times = Math.ceil(dataMax / tickInterval)
        return tickInterval * times
    }
}
/**
 *
 * @param {*} dataMax
 * @returns 返回Echarts图表的 interval 间隔
 */
function getTickInterval(dataMax) {
    if (dataMax === 0) {
        return 0.2
    } else {
        var i = Math.floor(Math.log(dataMax) / Math.log(1024))
        var maxValue = dataMax / Math.pow(1024, i)
        var baseInterval = Math.pow(1024, i)
        var factor = 1
        if (maxValue > 0 && maxValue <= 2) {
            factor = 0.5
        } else if (maxValue > 2 && maxValue <= 5) {
            factor = 1
        } else if (maxValue > 5 && maxValue <= 10) {
            factor = 2
        } else if (maxValue > 10 && maxValue <= 35) {
            factor = 5
        } else if (maxValue > 35 && maxValue <= 70) {
            factor = 10
        } else if (maxValue > 70 && maxValue <= 180) {
            factor = 30
        } else if (maxValue > 180 && maxValue <= 300) {
            factor = 50
        } else if (maxValue > 300 && maxValue <= 500) {
            factor = 100
        } else if (maxValue > 500 && maxValue <= 750) {
            factor = 150
        } else if (maxValue > 750) {
            factor = 200
        }
        var tickInterval = baseInterval * factor
        return tickInterval
    }
}

export default {
    bytesToSize,
    bytesToSizeForChart,
    bytesToSizeForCount,
    getTickMax,
    getTickInterval,
    /**
     * @param {*} result
     * @description 冗余代码, 不要使用它来做校验。
     */
    validate(result) {
        if (result) {
            if (Array.isArray(result)) {
                return !!result.length
            }
            return true
        } else {
            return false
        }
    },
    /**
     * @param {date} startTime 开始时间
     * @param {date} endTime 结束时间
     * @param {number} step 步长
     * @returns 返回格式化完毕之后时间戳字符串
     */
    setQueryData(startTime, endTime, step) {
        // console.log(endTime.getTime())
        // endTime.setTime(endTime.getTime() + step)
        // console.log(endTime.getTime())
        let dateFormat = 'yyyy-MM-ddThh:mm:ss.SZ'
        let date = {
            start: startTime.UTCFormat(dateFormat),
            end: endTime.UTCFormat(dateFormat),
            // start: startTime.getTime() / 1000,
            // end: endTime.getTime() / 1000,
            step: step
        }
        return date
    },
    /**
     *
     * @param {date} startDate 开始时间
     * @param {date} endDate 结束时间
     * @returns 返回步长
     */
    getStep(startDate, endDate) {
        // 返回时间 步数
        let period = endDate.getTime() - startDate.getTime()
        let step = Math.ceil(period / 1000 / 250 / 10) * 10
        return step > 10 ? step : 10
    },

    /**
     *
     * @param {String} interval 间隔 5m 30m 1h 2h 24h 2d 7d
     */
    getIntegerStep(interval) {
        switch (true) {
            case interval == '5':
                return 15
            case interval == '30':
                return 15
            case interval == '60':
                return 15
            case interval == '120':
                return 20
            case interval == '24':
                return 300
            case interval == '2':
                return 600
            case interval == '7':
                return 1800
        }
    },
    getDateParams() {},
    /**
     * @param  {...any} data 对Prometheus query_range数据进行计算(相同时间点相加)
     * @returns { Array } 返回计算好之后的数据
     */
    transformData(...data) {
        /**
         *  根据prometheus返回的数组，把相同时间的各个数组的value相加
         */
        let dataMap = []
        // data.forEach((el, i) => {
        //     dataMap.push([])
        //     el.forEach((el, j) => {
        //         el.values.forEach((item, k) => {
        //             if (dataMap[i][k]) {
        //                 dataMap[i][k][1] += Number(item[1])
        //             } else {
        //                 dataMap[i][k] = [item[0], Number(item[1])]
        //             }
        //         })
        //     })
        // })
        // 修改为用 map 取值，避免重复时间戳
        data.forEach((el, i) => {
            dataMap.push({})
            el.forEach(el => {
                el.values.forEach(item => {
                    // if (dataMap[i][k]) {
                    //     dataMap[i][k][1] += Number(item[1])
                    // } else {
                    //     dataMap[i][k] = [item[0], Number(item[1])]
                    // }
                    if (dataMap[i][item[0]]) {
                        dataMap[i][item[0]] += Number(item[1])
                    } else {
                        dataMap[i][item[0]] = Number(item[1])
                    }
                })
            })
        })
        let dataArray = []

        dataMap.forEach((item, i) => {
            dataArray.push([])
            for (let k in item) {
                dataArray[i].push([k, item[k]])
            }
        })

        return dataArray
    },
    /**
     *
     * @param {object} opt Echarts图表配置项
     * @param  {...any} data 要给图表数据
     * 用于计算图表y轴的间隔
     */
    setChartInterval(opt, ...data) {
        /**
         *  opt图表的配置项
         */
        let valList = []
        data.forEach(item => {
            item.forEach(el => {
                valList.push(Number(el[1]))
            })
        })
        opt.yAxis.interval = this.getTickInterval(Math.max(...valList))
    },
    /**
     * @param  {...any} data Prometheus的数据
     * 由于promethues返回的数据：例如磁盘的容量，如果磁盘刚接入，那么promethues返回的数组在接入之前都是空，这
     * 造成数组长度不一， 在根据下标累加容量时， 就会加错。
     * 所以利用循环，找出最大的length，然后给小于这个length的数组，unshift一些数据，这样图表在显示的时候就
     * 正常了
     */
    dataToBalance(...data) {
        /**
         *
         */
        // eslint-disable-next-line no-unused-vars
        let maxLength = 0
        data.forEach(item => {
            item.forEach(el => {
                let maxLength = 0
                el.values.forEach(item => {
                    if (item.length > maxLength) {
                        maxLength = item.length
                    }
                })
                el.values.forEach(el => {
                    if (el.length < maxLength) {
                        let lack = maxLength - el.length
                        for (let j = 0; j < lack; j++) {
                            el.unshift([0, 0])
                        }
                    }
                })
            })
        })
    },
    isEmpty(val) {
        if (val == undefined || val == null || val == '') {
            return false
        } else {
            return true
        }
    },

    /**
     *
     * @param {date} start
     * @param {date} end
     * @description 根据interval获取 Prometheus sql 区间向量
     */
    // getTimeVector(start, end) {
    //     let interval = new Date(end).getTime() - new Date(start).getTime()

    //     if (!interval) return '1m'
    //     switch (true) {
    //         // 5分钟
    //         case interval <= 300 * 1000:
    //             return '1m'
    //         // 30 分钟
    //         case interval <= 1800 * 1000 && interval > 300 * 1000:
    //             return '2m'
    //         // 1小时
    //         case interval <= 3600 * 1000 && interval > 1800 * 1000:
    //             return '5m'
    //         // 6个小时
    //         case interval <= 6 * 3600 * 1000 && interval > 3600 * 1000:
    //             return '30m'
    //         // 12个小时
    //         case interval <= 12 * 3600 * 1000 && interval > 6 * 3600 * 1000:
    //             return '1h'
    //         // 24个小时
    //         case interval <= 24 * 3600 * 1000 && interval > 12 * 3600 * 1000:
    //             return '2h'
    //         // 2天
    //         case interval <= 2 * 24 * 3600 * 1000 && interval > 24 * 3600 * 1000:
    //             return '6h'
    //         // 7天
    //         case interval <= 7 * 24 * 3600 * 1000 && interval > 2 * 24 * 3600 * 1000:
    //             return '12h'
    //         // 30天
    //         case interval <= 30 * 24 * 3600 * 1000 && interval > 7 * 24 * 3600 * 1000:
    //             return '1d'
    //         // 90天
    //         case interval <= 90 * 24 * 3600 * 1000 && interval > 30 * 24 * 3600 * 1000:
    //             // return '7d'
    //         // 180天(6月)
    //         case interval <= 180 * 24 * 3600 * 1000 && interval > 90 * 24 * 3600 * 1000:
    //             return '7d'
    //         // 365天(1y)
    //         case interval <= 365 * 24 * 3600 * 1000 && interval > 180 * 24 * 3600 * 1000:
    //             return '30d'
    //         default:
    //             return '30d'
    //     }
    // },

    /**
     *
     * @param {Array} objArray
     * @returns {String} csv文本
     */
    JSON2CSV(objArray) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray

        let str = ''
        // 添加key，表头
        for (let index in array[0]) {
            str += index + ','
        }
        str += '\r'

        for (let i = 0; i < array.length; i++) {
            let line = ''

            for (let index in array[i]) {
                line += array[i][index] + ','
            }
            // 添加双引号
            // for (let index in array[i]) {
            //    line += '"' + array[i][index] + '",';
            // }
            line.slice(0, line.Length - 1)

            str += line + '\r'
        }

        return str
    },
    /**
     * 针对ie浏览器返回ie 版本
     */
    IEVersion() {
        var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
        if (isIE) {
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
            reIE.test(userAgent)
            var fIEVersion = parseFloat(RegExp['$1'])
            if (fIEVersion == 7) {
                return 7
            } else if (fIEVersion == 8) {
                return 8
            } else if (fIEVersion == 9) {
                return 9
            } else if (fIEVersion == 10) {
                return 10
            } else {
                return 6 //IE版本<=7
            }
        } else if (isEdge) {
            return 'edge' //edge
        } else if (isIE11) {
            return 11 //IE11
        } else {
            return -1 //不是ie浏览器
        }
    },

    /**
     *
     * @param {Array} arr
     * @description 找出Prometheus(vm_exporter)返回的数组中相同下标点最大值(相同时间戳多个值)
     */
    getMaxByArray(arr = []) {
        if (!Array.isArray(arr) || !arr.length) return []
        // 一个数组不用比较, 直接返回
        if (arr.length === 1) return arr[0].values

        let values = [],
            result = []

        // 判断arr是否是 Prometheus的数据集, 取出其中的 values
        arr.forEach(item => {
            if (Array.isArray(item.values)) {
                values.push(item.values)
            }
        })
        // 将 Prometheus返回的数据集, 按照 key是时间戳, value是 保存各个数据集当前时间戳的值。 便于最后取出最大值
        let dataMap = {}
        values.forEach(val => {
            val.forEach(item => {
                if (Array.isArray(dataMap[item[0]])) {
                    dataMap[item[0]].push(Number(item[1]))
                } else {
                    dataMap[item[0]] = [Number(item[1])]
                }
            })
        })

        for (let timestamp in dataMap) {
            result.push([timestamp, Math.max(...dataMap[timestamp])])
        }

        result.sort((prev, next) => {
            return prev[0] - next[0]
        })

        return result
    },

    resetPc() {
        var wH = window.innerHeight // 当前窗口的高度
        var wW = window.innerWidth // 当前窗口的宽度
        var whdef = 100 / 1920 // 表示1920的设计图, 使用100PX的默认值
        if (wW > 1400) {
            var rem = wW * whdef // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
            var html = document.documentElement
            html.style.fontSize = rem + "px" //适用于PC网站
        } else {
            var rem = 1400 * whdef
            var html = document.documentElement
            html.style.fontSize = rem + "px"
        }
    },

    format(date, fmt) {
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'H+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                )
            }
        }
        return fmt
    }
}
