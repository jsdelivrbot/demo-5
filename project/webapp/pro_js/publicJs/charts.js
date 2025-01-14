//近7天的水位,流量折线图
var myChart;
var echartContent = document.getElementsByClassName("echartContent")[0];
var echartData = {
    color: ['#FF5581', '#2DC0E9'],
    grid: {
        bottom: 82
    },
    tooltip: { //提示框，鼠标悬浮交互时的信息提示
        trigger: 'axis'
    },
    legend: { //图例组件
        data: [{
                name: '水位',
                icon: 'stack'
            },
            {
                name: '流量',
                icon: 'stack'
            }
        ],
        show: true,
        orient: 'horizontal',
        top: 10,
        x: 'center',
        // x: 15,
        // y: 'top',
    },
    dataZoom: [ //数据区域缩放，仅对直角坐标系适用
        {
            show: true,
            realtime: true, //缩放变化是否实时显示
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
        }
    ],
    xAxis: [ //直角坐标系 grid 中的 x 轴
        {
            type: 'category', //类目型
            boundaryGap: false, //两端空白
            // axisLabel:{
            //     showMinLabel: true,
            //     showMaxLabel: true,
            // },
            data: []
        }
    ],
    yAxis: [{
        name: "水位/m",
        nameTextStyle: {
            color: '#333'
        },
        type: 'value',
        minInterval: 0.01,
        axisLabel: {
            formatter: '{value}'
        },
        max: 1,
        min: 0,
        position: 'left',
        data: []
    }, {
        name: '流量m³/s',
        nameTextStyle: {
            color: '#333'
        },
        type: 'value',
        minInterval: 0.001,
        inverse: false,
        axisLabel: {
            formatter: '{value}'
        },
        max: 1,
        min: 0,
        position: 'right',
        data: []
    }],
    series: [ //系列列表
        {
            name: '水位',
            type: 'line',
            animation: false,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            yAxisIndex: 0,
            data: [
                [],
                []
            ]
        }, {
            name: '流量',
            type: 'line',
            animation: false,
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            yAxisIndex: 1,
            data: [
                [],
                []
            ]
        }
    ]
};

function lienChart(echartData) {
    // console.log(echartData);
    myChart = echarts.init(echartContent);
    // console.log(myChart);
    myChart.setOption(echartData);
}
