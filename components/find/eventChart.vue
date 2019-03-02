<style lang="less">
.hello{
    width: 100%;
    height: 350px;
}
</style>
<template>
  <div><v-chart :options="polar" :auto-resize="true" class="hello"/></div>
</template>

<script>
let data = []

for (let i = 0; i <= 360; i++) {
    let t = i / 180 * Math.PI
    let r = Math.sin(2 * t) * Math.cos(2 * t)
    data.push([r, i])
}

export default {
    name: 'eventChart',
    data () {
        return {
            polar: {
                title: {
                    show: false,
                    text: '天氣變化',
                    subtext: '資料來自YAHOO'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['最高氣溫','最低氣溫']
                },
                toolbox: {
                    show: false,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                }, dataZoom : {
                    show : true,
                    realtime : true,
                    start : 0,
                    end : 100
                },
                xAxis:  {
                    type : 'category',
                    boundaryGap : false,
                    splitLine: {
                        show: false
                    },
                    data: ['2019-02-28T15:00:00Z','2019-02-28T16:00:00Z','2019-02-28T17:00','2019-02-28T18:00:00Z','2019-02-28T19:00:00Z','2019-02-28T20:00:00Z','2019-02-28T21:00:00Z']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name:'最高氣溫',
                        type:'line',
                        data:[29, 27, 22, 23, 25, 23, 26],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'最低氣溫',
                        type:'line',
                        data:[18, 21, 20, 19, 20, 21, 20],
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高點'
                                }]
                            ]
                        }
                    }
                ]
            }
        }
    }
};
</script>