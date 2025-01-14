/**
 * Created by EKuter-amu on 2017/7/10.
 */
var nameNum = 0;
var dataNum = 0;
var showName = false;
var showVal = false;

window.onresize = function() {
    setMapHeight();
};

function setMapHeight() {
    $('.mapBox').css('height', $('.contentRight').outerHeight(true) + 5 + 'px');
}

//雨量信息
function rainPointInfos(getRainfallStationCountInfo) {

    $.each(getRainfallStationCountInfo, function(i, ele) {
        if (ele) {
            Map.rainAddPoints([ele.x, ele.y], ele.station_name, ele.rainfall);
            Map.rainSetInfos([ele.x, ele.y], ele.station_name, ele.rainfall, ele.id);
        }
    });
}
//库水位
function reservoirPointInfos(getReservoirInfoData) {
    $.each(getReservoirInfoData, function(i, ele) {
        if (ele) {
            Map.waterAddPoints([ele.x, ele.y], ele.station_name, 0);
            Map.waterSetInfos([ele.x, ele.y], ele.station_name, ele.waterLevel, ele.id);
        }
    });
}
//河道水位
function RiverWaterPointInfos(RiverWaterPointInfosData) {
    $.each(RiverWaterPointInfosData, function(i, ele) {
        if (ele) {
            Map.waterAddPoints([ele.x, ele.y], ele.station_name, 1);
            Map.waterSetInfos([ele.x, ele.y], ele.station_name, ele.waterLevel, ele.id);
        }
    });
}

function tabsChange() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.tab-pannel').eq($(this).index()).addClass('active').siblings().removeClass('active');

    removeNameAndPoint();  //清除站名+数值
    // 切换后,根据按钮数据状态改变显示状态;
    if (Map.property.showName) {  //站名
        $(".userControll .name").removeClass('controlOff').addClass('controlOn');
    }
    if (Map.property.showNum) {  //数值
        $(".userControll .num").removeClass('controlOff').addClass('controlOn');
    }
    // 切换后,加载数据;
    if ($(this).hasClass('tabs1')) { //实时水情
        initDateTimePicker("starttime", "endtime");
        getReservoirInfo(true); //获取水库信息
    } else if ($(this).hasClass('tabs2')) { //实时雨情
        initDateTimePicker("starttime1", "endtime1");
        getRainfallStationCountInfo(true); //雨量信息
    }
}

function changeSwitch(e) {
    if ($(e.currentTarget).hasClass('nameSwitch')) { //名称显示
        if (nameNum == 0) {
            $(e.currentTarget).find('b').css('left', '28px');
            $(e.currentTarget).addClass('active');
            nameNum = 1;
        } else if (nameNum == 1) {
            $(e.currentTarget).find('b').css('left', '2px');
            $(e.currentTarget).removeClass('active');
            nameNum = 0;
        }
    } else { //数据显示
        if (dataNum == 0) {
            $(e.currentTarget).find('b').css('left', '28px');
            $(e.currentTarget).addClass('active');
            dataNum = 1;
        } else if (dataNum == 1) {
            $(e.currentTarget).find('b').css('left', '2px');
            $(e.currentTarget).removeClass('active');
            dataNum = 0;
        }
    }
}

/*水库信息*/ /*是否加载 河道信息:isLoad12*/
function getReservoirInfo(isLoad12) {
    var beginTime = $('#starttime').val();
    var endTime = $('#endtime').val();
    $.ajax({
        url: getWaterLevelInfoUrl,
        type: 'get',
        data: {
            begin_time: beginTime,
            end_time: endTime
        },
        dataType: 'json',
        success: function(result) {
            if (result.status == 0) {
                var getReservoirInfoData = result.data;
                var autoStaion = []; //显示自动站
                var artificialStaion = []; //显示人工站

                if (!getReservoirInfoData || getReservoirInfoData.length == 0) {
                    $('.tab-pannel1 .panelRow2 .panelRow2-dataBind').render('');
                    errorBox("水库信息无内容");
                } else {
                    var autoArr = [];
                    var getReservoirInfoDataProperty = {
                        waterLevel: {
                            class: function(e) {
                                if (this.waterLevel == "" || this.waterLevel == "—") {
                                    return e.value + " frozen";
                                } else {
                                    return e.value;
                                }
                            },
                            text: function() {
                                if (this.waterLevel == "") {
                                    return "—";
                                }
                            }
                        },
                        storageCapacity: {
                            class: function(e) {
                                if (this.storageCapacity == "" || this.storageCapacity == "—") {
                                    return e.value + " frozen";
                                } else {
                                    return e.value;
                                }
                            }
                        },
                    };
                    $.each(getReservoirInfoData, function(i, o) {

                        if (null == o) { //无数据----
                            o = {
                                'sys_code': "—",
                                'station_name': "—",
                                'waterLevel': "—",
                                'storageCapacity': "—"
                            };
                            arr.push(o);

                            $('.tab-pannel1 .panelRow2 .panelRow2-dataBind').render(arr);
                        } else {
                            if (o.waterLevel) {
                                o.waterLevel = round(o.waterLevel, 2);
                            } else {
                                o.waterLevel = "—";
                            }


                            if (o.storageCapacity) {
                                o.storageCapacity = round(o.storageCapacity, 3);
                            } else {
                                o.storageCapacity = "—";
                            }

                            if (o.station_type == 6) { //自动站
                                autoArr.push(this);
                            }
                        }
                    });

                    //需求过滤人工站出去
                    $('.tab-pannel1 .panelRow2 .panelRow2-dataBind').render(autoArr, getReservoirInfoDataProperty);
                    reservoirPointInfos(autoArr);
                    // 先加载"水库信息"再加载"河道信息"
                    if (isLoad12) {
                        getRiverwayInfo(); //获取河道信息
                    }
                    setMapHeight();
                }
            } else {
                errorBox(result.msg);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}
//河道信息
function getRiverwayInfo() {
    var beginTime = $('#starttime').val();
    var endTime = $('#endtime').val();
    $.ajax({
        url: getRiverWaterLevelInfoUrl,
        type: 'get',
        data: {
            begin_time: beginTime,
            end_time: endTime
        },
        dataType: 'json',
        success: function(result) {
            if (result.status == 0) {
                var getRiverWaterLevelInfoData = result.data;
                var autoArr = [];

                if (!getRiverWaterLevelInfoData || getRiverWaterLevelInfoData.length == 0) {
                    $('.tab-pannel1 .panelRow3 .panelRow3-dataBind').render('');
                    errorBox("河道信息无内容");
                } else {
                    //console.log(getRiverWaterLevelInfoData);
                    var arr = [];
                    var getRiverWaterLevelInfoDataProperty = {
                        waterLevel: {
                            class: function(e) {
                                if (this.waterLevel == "" || this.waterLevel == "—") {
                                    return e.value + " frozen";
                                } else {
                                    return e.value;
                                }
                            },
                            text: function() {
                                if (this.waterLevel == "") {
                                    return "—";
                                }
                            }
                        },
                        rateOfFlow: {
                            class: function(e) {
                                if (this.rateOfFlow == "" || this.rateOfFlow == "—") {
                                    return e.value + " frozen";
                                } else {
                                    return e.value;
                                }
                            },
                            text: function() {
                                if (this.rateOfFlow == "") {
                                    return "—";
                                }
                            }
                        }
                    };
                    $.each(getRiverWaterLevelInfoData, function(i, o) {
                        if (null == o) {
                            o = {
                                'sys_code': "—",
                                'station_name': "—",
                                'waterLevel': "—",
                                'rateOfFlow': "—"
                            };
                            arr.push(o);
                            $('.tab-pannel1 .panelRow3 .panelRow3-dataBind').render(arr);
                        } else {
                            if (o.waterLevel) {
                                o.waterLevel = round(o.waterLevel, 2);
                            } else {
                                o.waterLevel = "—";
                            }

                            if (o.rateOfFlow) {
                                o.rateOfFlow = round(o.rateOfFlow, 2);
                            } else {
                                o.rateOfFlow = "—";
                            }

                            if (o.station_type == 6) {
                                autoArr.push(this);
                            }
                        }
                    });
                    //需求过滤人工站出去
                    $('.tab-pannel1 .panelRow3 .panelRow3-dataBind').render(autoArr, getRiverWaterLevelInfoDataProperty);
                    //需求过滤人工站出去
                    RiverWaterPointInfos(autoArr);
                    setMapHeight();
                    changeNameAndNum();
                }
            } else {
                errorBox(result.msg);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

/**雨量信息**/ /*是否加载 雨量统计:isLoad22*/
function getRainfallStationCountInfo(isLoad22) {
    var beginTime = $('#starttime1').val();
    var endTime = $('#endtime1').val();

    $.ajax({
        url: rainfallStationCountInfoUrl,
        type: 'get',
        data: {
            begin_time: beginTime,
            end_time: endTime
        },
        dataType: 'json',
        success: function(result) {
            if (result.status == 0) {
                var getRainfallStationCountInfo = result.data;
                var autoArr = [];

                if (!getRainfallStationCountInfo || getRainfallStationCountInfo.length == 0) {
                    $('.tab-pannel2 .panelRow2 .panelRow2-dataBind').render('');
                    errorBox("雨量信息无内容");
                } else {
                    //console.log(getRainfallStationCountInfo);
                    var getRainfallStationCountInfoProperty = {
                        rainfall: {
                            class: function(e) {
                                if (this.rainfall == "" || this.rainfall == "—") {
                                    return e.value + " frozen";
                                } else {
                                    return e.value;
                                }
                            },
                            text: function() {
                                if (this.rainfall == "") {
                                    return this.rainfall = "—";
                                }
                            }
                        }
                    };
                    $.each(getRainfallStationCountInfo, function(i, o) {
                        if (o) {
                            if (o.rainfall) {
                                o.rainfall = round(o.rainfall, 1);
                            } else {
                                o.rainfall = "—";
                            }

                            if (o.station_type == 6) {
                                autoArr.push(this);
                            }

                        }
                    });

                    //排除人工站
                    $('.tab-pannel2 .panelRow2 .panelRow2-dataBind').render(autoArr, getRainfallStationCountInfoProperty);
                    rainPointInfos(autoArr);
                    // 先加载"雨量信息"再加载"雨量统计"
                    if (isLoad22) {
                        getRainfallStatisticsList();
                    }
                    setMapHeight();
                }
            } else {
                errorBox(result.msg);
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

/**雨量统计**/
function getRainfallStatisticsList() {

    var beginTime = $('#starttime1').val();
    var endTime = $('#endtime1').val();
    $.ajax({
        url: areaAverageRainfallUrl,
        type: 'get',
        data: {
            begin_time: beginTime,
            end_time: endTime
        },
        dataType: 'json',
        success: function(result) {

            var rainfallStatisticsList = result.data;
            if (!rainfallStatisticsList || rainfallStatisticsList.length == 0) {
                errorBox("雨量统计无内容");
            } else {
                console.log(rainfallStatisticsList);
                var rainfallStatisticsListProperty = {
                    maxStation: {
                        class: function(e) {
                            if (this.maxStation == "—" || this.maxStation == "") {
                                return e.value + " frozen";
                            } else {
                                return e.value;
                            }
                        },
                        text: function() {
                            if (this.maxStation == "") {
                                return "—";
                            }
                        }
                    },
                    average_rainfall: {
                        class: function(e) {
                            if (this.average_rainfall == "—" || this.average_rainfall == "") {
                                return e.value + " frozen";
                            } else {
                                return e.value;
                            }
                        },
                        text: function() {
                            if (this.average_rainfall == "") {
                                return "—";
                            }
                        }
                    },
                    max_Rainfall: {
                        class: function(e) {
                            if (this.max_Rainfall == "—") {
                                return e.value + " frozen";
                            } else {
                                return e.value;
                            }
                        }
                    },
                };
                var popupStyle = {maxLength: 0};
                $.each(rainfallStatisticsList, function(i,obj){
                    if (obj.station_info_list) {
                        popupStyle.maxLength = Math.max(popupStyle.maxLength,obj.station_info_list.length);
                    }
                });
                var averageNum = 0;
                $.each(rainfallStatisticsList, function(idx, obj) {
                    if (obj) {
                        // if(obj.area_name=="全库"){//不显示全库
                        //   rainfallStatisticsList.splice(idx,1); //把全库的项清除
                        // }

                        if (obj.rainfall) { //雨量
                            obj.rainfall = round(obj.rainfall, 1); //保留1位小数
                        } else if (obj.rainfall == 0) {
                            obj.rainfall = round(obj.rainfall, 1); //保留1位小数
                        } else {
                            obj.rainfall = "—";
                        }

                        if (obj.average_rainfall) { //平均雨量
                            obj.average_rainfall = round(obj.average_rainfall, 1); //保留1位小数
                        } else if (obj.average_rainfall == 0) {
                            obj.average_rainfall = round(obj.average_rainfall, 1); //保留1位小数
                        } else {
                            obj.average_rainfall = "—";
                        }

                        if (obj.max_Rainfall) { //最大雨量
                            obj.max_Rainfall = round(obj.max_Rainfall, 1); //保留1位小数
                        } else if (obj.max_Rainfall == 0) {
                            obj.max_Rainfall = round(obj.max_Rainfall, 1); //保留1位小数
                        } else {
                            obj.max_Rainfall = "—";
                        }

                        if (!obj.station_info_list) {
                            obj.average_rainfall = obj.maxStation = obj.max_Rainfall = "—";
                        }

                        if (null == obj.maxStation) { //最大雨量站名
                            obj.maxStation = "—";
                        }

                        if (null !== obj.average_rainfall) { //计算全库平均
                            if ("—" !== obj.average_rainfall) {
                                averageNum += Number(obj.average_rainfall); //全库平均
                            }
                        }



                        $.each(obj.station_info_list, function(i, o) { //弹窗雨量站点
                            o.rainfall = round(o.rainfall, 1);
                        });

                        if (!obj.station_info_list) {  //处理样式
                            obj.station_info_list = [];
                        }
                        if (obj.station_info_list.length<popupStyle.maxLength) {  //处理样式
                            var start = obj.station_info_list.length;
                            for(var i=start;i< popupStyle.maxLength;i++){
                                obj.station_info_list[i] = {
                                    station_name: "-",
                                    rainfall: "-"
                                };
                            }
                        }

                    }
                });

                var aa = {
                    station_info_list: {
                        rainfall: {
                            class: function(e) {
                                if (this.rainfall == "" || this.rainfall == "—") {
                                    return e.value + ' item-color8';
                                } else if (this.rainfall == 0) {
                                    return e.value + ' item-color7';
                                } else if (this.rainfall >= 0.1 && this.rainfall < 10) {
                                    return e.value + ' item-color6';
                                } else if (this.rainfall >= 10 && this.rainfall < 25) { //atrovirens
                                    return e.value + ' item-color5';
                                } else if (this.rainfall >= 25 && this.rainfall < 50) { //wathet
                                    return e.value + ' item-color4';
                                } else if (this.rainfall >= 50 && this.rainfall < 100) { //darkBlue
                                    return e.value + ' item-color3';
                                } else if (this.rainfall >= 100 && this.rainfall < 250) { //croci
                                    return e.value + ' item-color2';
                                } else if (this.rainfall >= 250) { //red
                                    return e.value + ' item-color1';
                                }
                            }
                        }
                    }
                };

                $('.panelRow3 .right-table-body-dataBind').render(rainfallStatisticsList, rainfallStatisticsListProperty);
                //计算全库平均值
                averageNum = (rainfallStatisticsList.length) ? round(averageNum / rainfallStatisticsList.length, 1) : 0.0;
                $('#libraryAverage').html(averageNum);
                $('#popInfoTr').render(rainfallStatisticsList, aa);
                $("#popInfoTr [data-bind=station_info_list] td:contains(-)").css("opacity",0);  //处理样式
                $("#popInfoTr [data-bind=average_rainfall]:contains(—)").css("color","#ccc");  //处理样式
                setMapHeight();
                changeNameAndNum();
            }
        },
        error: function(err) {
            // console.log(err);
        }
    });
}

/*清除 站名 and 站点*/
function removeNameAndPoint() {
    var length = map.getLayers().a.length;
    while (length > 1) {
        map.removeLayer(map.getLayers().item(1));
        length = map.getLayers().a.length;
    }

    $(".popup").remove();
}

//获取当前日期
function DateToday(flag) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var hour = d.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    var min = d.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    var str = year + "-" + month + "-" + day + " " + hour + ":" + min;
    return str;

}
//获取上月今日
function prevMonthDateToday() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    if (month < 10) {
        month = '0' + month;
    }
    var day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var str = year + "-" + month + "-" + day + " " + "00:00";
    return str;
}

/*点击[详情],显示弹窗*/
function showDetail() {
    var popInfoStartTime = $('#starttime1').val();
    var popInfoEndTime = $('#endtime1').val();
    $('#popInfo').modal('show');
    $('#popInfo').on('shown.bs.modal', function(e) {
        $('#dataLeft').css('height', $('#popInfoTr tbody').outerHeight(true));
    });

    $('#popInfoStartTime').html(popInfoStartTime); //开始时间
    $('#popInfoEndTime').html(popInfoEndTime); //结束时间
}

//列表点击及放大地图
function tableListClick() {
    $('.table-responsive').find('ul').removeClass('active');
    $(this).addClass('active');
    var x = parseInt($(this).find('li:first input[data-bind="x"]').val());
    var y = parseInt($(this).find('li:first input[data-bind="y"]').val());
    var view = map.getView();
    var zoom = view.getZoom();
    view.setCenter([x, y]); //设置中心
    view.setZoom(zoom + 3); //放大
    $('.popup').css('color', 'white');
    $('#popup' + $(this).find('input[data-bind="id"]').val()).css('color', 'red'); //高亮layer
}

// 修正时间选择器的样式;
$(".timePicker").on("show", function(e) {
    e.target.style.borderColor = "#4791ea";
    e.target.style.boxShadow = "1px 1px 10px rgba(71,145,234,.6)";
}).on("hide", function(e) {
    e.target.style.borderColor = "";
    e.target.style.boxShadow = "";
});

//需求：站 数值 可同时存在 点击即按下出现对应文字（数字）
function popUpCtr(){
    var $this = $(this);
    if ($this.hasClass("name")) {
        if ($this.hasClass("controlOn")) {
            Map.property.showName = false;
            $this.removeClass("controlOn").addClass("controlOff");
        }else {
            Map.property.showName = true;
            $this.removeClass("controlOff").addClass("controlOn");
        }
    }else {
        if ($this.hasClass("controlOn")) {
            Map.property.showNum = false;
            $this.removeClass("controlOn").addClass("controlOff");
        }else {
            Map.property.showNum = true;
            $this.removeClass("controlOff").addClass("controlOn");
        }
    }
    changeNameAndNum();
}
/* 处理站名和数值 */
function changeNameAndNum(){
    if (Map.property.showName) {
        $('.popup .name').show();  // 显示名称
    }else {
        $('.popup .name').hide();
    }
    if (Map.property.showNum) {
        $('.popup .num').show();
    }else {
        $('.popup .num').hide();
    }
    if (Map.property.showName||Map.property.showNum) {
        $('.popup').show();
    }else {
        $('.popup').hide();
    }
}

$(function() {
    getPropertyAndSetMap(false, 'map');

    setMapHeight();
    initDateTimePicker("starttime", "endtime");
    initDateTimePicker("starttime1", "endtime1");

    //切换站名和数值
    $('.userControll .name,.userControll .num').off('click').on('click', popUpCtr);
    $('.tabs').click(tabsChange);

    $('.panelRow2-dataBind').off('click').on('click', 'ul', tableListClick);
    $('.panelRow3-dataBind').off('click').on('click', 'ul', tableListClick);

    getReservoirInfo(true); //获取水库信息

    //点击保存切换列表数据
    //实时水情显示
    $('#water_search_btn').click(function() {
        //清除point,info
        removeNameAndPoint();
        getReservoirInfo(true);
        // getRiverwayInfo();
    });
    //实时雨情显示
    $('#rain_search_btn').click(function() {
        //清除point,info
        removeNameAndPoint();
        getRainfallStationCountInfo(true);
        // getRainfallStatisticsList();
    });
    //切换名称显示和数据展示开关
    $('.switch').off('click').on('click', function(e) {
        changeSwitch(e);
    });

    /*单击详情,显示弹窗*/
    $(".pannel-title .detail").click(showDetail);

    /**切换图例**/
    $('.contentRightTabs .tabs1').click(function() {
        $('#waterLengend').removeClass('hide').siblings('.lengendBox').addClass('hide');
    });
    $('.contentRightTabs .tabs2').click(function() {
        $('#rainLengend').removeClass('hide').siblings('.lengendBox').addClass('hide');
    });

    /**切换图例按钮**/
    $('#collapseOne').on('show.bs.collapse', function() {
        $(this).prev().find('.triangular').addClass('rotate'); //上
    });
    $('#collapseOne').on('hide.bs.collapse', function() {
        $(this).prev().find('.triangular').removeClass('rotate'); //下
    });
    $('#collapseTwo').on('show.bs.collapse', function() {
        $(this).prev().find('.triangular').addClass('rotate'); //上
    });
    $('#collapseTwo').on('hide.bs.collapse', function() {
        $(this).prev().find('.triangular').removeClass('rotate'); //下
    });
});
