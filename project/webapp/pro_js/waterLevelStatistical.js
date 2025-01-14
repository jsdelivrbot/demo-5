var successReturn=0;
var dropDownIdx=0;
var dropDonMenuLength;
var sta_id;//保存站id
var typeFlag='1';//记录类型 河道水情1 水库水情0
// var hasEcharts = false;
var begin_time=getBeforeDate(1);//默认近24小时
var end_time=getNowDate();//获取现在的日期

//获取现在时间
function getNowDate(){
 	var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    var hours=d.getHours();
    var minutes=d.getMinutes();
    return s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)+" "+(hours<10?('0'+hours):hours)+":"+(minutes<10?('0'+minutes):minutes);
}

/**获取今天前24小时,7天,30天**/
function getBeforeDate(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    var hours=d.getHours();
    var minutes=d.getMinutes();
    var seconds=d.getSeconds();

    if(day <= n){
	    if(mon>1) {
	     mon=mon-1;
	    }else {
	     year = year-1;
	     mon = 12;
	    }
    }
	d.setDate(d.getDate()-n);
	year = d.getFullYear();
	mon=d.getMonth()+1;
	day=d.getDate();
    return s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day)+" "+(hours<10?('0'+hours):hours)+":"+(minutes<10?('0'+minutes):minutes)+":"+(seconds<10?('0'+seconds):seconds);

}
//获得年月日
function getMyDate(str){
    var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),

    oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin);//最后拼接时间
    return oTime;
}
//补0操作
function getzf(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}

//重置选择框
function initSelectBox(){
    // console.log($('.dropDonMenu li')[0].dataset.id);
	$(".selectView span,#selectedStation").text($(".dropDonMenu li").eq(dropDownIdx).text());  //设置选中项的名称
	sta_id=$(".selectView span")[0].dataset.sta_id=$(".dropDonMenu li").eq(dropDownIdx)[0].dataset.id;
    dropDonMenuLength=$(".dropDonMenu").children("li").length;
    var a = $('.dropDonMenu li')[0].dataset.id;
    // console.log(a);

    setLeftAndRightStationStatus();
}

//获取站名列表刷新右下角表格数据
function getStationNameList(typeFlag){
	$.ajax({
		url:getStationNameListUrl,
		type:'get',
		data: {
			typeFlag:typeFlag
		},
		dataType: 'json',
		success: function(result){
            // console.log(result);
			if (result.status === successReturn) {
				var data = result.data;
				var arr=[];
                // console.log(data);
				if(data){
					var dataProperty={
						station_name:{
							"data-id": function(){
								return this.id;
							}
						}
					};

					// $.each(data,function(i,o){
					// 	arr.push(o);
					// });
					$('.dropDonMenu').render(data,dataProperty);
                    // console.log("前:"+sta_id);
                    initSelectBox();
                    // console.log("后:"+sta_id);

                    typeFlagChange(typeFlag);//类型切换
				}else {
                    $('.rightContentNoData').removeClass("hide");  // 没有站名,下面的数据都不用显示了
                    $(".selectView span").html("");  // 清空站名
				}
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

//类型切换列表
function typeFlagChange(typeFlag){
	if(typeFlag=='1'){//河道水情
		getRiverDataForEcharts(begin_time,end_time,sta_id);
        getRiverDataList(begin_time,end_time,sta_id);
	}else if(typeFlag=='0'){//水库水情
		getResvoirDataForEcharts(begin_time,end_time,sta_id);
        getResvoirDataList(begin_time,end_time,sta_id);
	}
}

// 重置站名左右按钮状态
function setLeftAndRightStationStatus(){
    $(".prevButton,.nextButton").addClass('active');
    if (dropDownIdx+1<=1) {
        $(".prevButton").removeClass("active");
    }
    if (dropDownIdx+1>=dropDonMenuLength) {
        $(".nextButton").removeClass("active");
    }
}

//河道水情echart
function getRiverDataForEcharts(begin_time,end_time,sta_id){
	$.ajax({
        url:getRiverDataForEchartsUrl,
		type:'get',
		data: {
			begin_time:begin_time,
			end_time:end_time,
			sta_id:sta_id
		},
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
				var data = result.data;//数据排序处理
				var dataSub=result.dataSub;//时间排序处理

                // 添加折线
                dataSub = $.each(dataSub,function(i,val){
                    dataSub[i] = !val?val:val.replace(" ","\n");
                });
                // 若数据是null, 添加 0
                $.each(data,function(i,val){
                    $.each(val,function(j,subVal){
                        if ((j>1)&&(j<(val.length-1))) {
                            data[i][j] = (subVal==null)?0:subVal;
                        }
                    });
                });

				echartData.series[0].data = data[0];
                echartData.series[1].data = data[1];
                echartData.series[1].name = "流量";
				echartData.xAxis[0].data = dataSub;
                echartData.legend.data[1].name = "流量";
	 			echartData.yAxis[1].name = '流量 m³/s';
                var value0 = calcValue(data[0]);
                echartData.yAxis[0].max = value0.maxData;
                echartData.yAxis[0].min = value0.minData;
                var value1 = calcValue(data[1]);
                echartData.yAxis[1].max = value1.maxData;
                echartData.yAxis[1].min = value1.minData;

                lienChart(echartData);
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}
//水库水情echart
function getResvoirDataForEcharts(begin_time,end_time,sta_id){
	$.ajax({
		url:getResvoirDataForEchartsUrl,
		type:'get',
		data: {
			begin_time:begin_time,
			end_time:end_time,
			sta_id:sta_id
		},
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
                $("#echart .echartTitle .cuUnit").removeClass("hide");
				var data = result.data;//数据排序处理
				var dataSub=result.dataSub;//时间排序处理

                // 若数据是null, 添加 0
                $.each(data,function(i,val){
                    $.each(val,function(j,subVal){
                        data[i][j] = (subVal==null)?0:subVal;
                    });
                });
                // 添加折线
                dataSub = $.each(dataSub,function(i,val){
                    dataSub[i] = !val?val:val.replace(" ","\n");
                });

                echartData.series[0].data = data[0];
				echartData.series[1].data = data[1];
                echartData.series[1].name = "库容";
				echartData.xAxis[0].data = dataSub;
                echartData.legend.data[1].name = "库容";
	 			echartData.yAxis[1].name = "";
                var value0 = calcValue(data[0]);
                echartData.yAxis[0].max = value0.maxData;
                echartData.yAxis[0].min = value0.minData;
                var value1 = calcValue(data[1]);
                echartData.yAxis[1].max = value1.maxData;
                echartData.yAxis[1].min = value1.minData;

				lienChart(echartData);
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});

}

//河道水位数据列表
function getRiverDataList(begin_time,end_time,sta_id){
    // console.log(sta_id);
	$.ajax({
		url:getRiverDataListUrl,
		type:'get',
		data: {
			begin_time:begin_time,
			end_time:end_time,
			sta_id:sta_id
		},
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
                // console.log(begin_time+" "+end_time);
                // console.log(sta_id);
                // console.log(result);
				var data = result.data;
                // console.log(data.length);
				if(data.length==0){
                    // 显示nodata
					$('.rightContentNoData').removeClass("hide");
				}else{
                    // 隐藏nodata
					$('.rightContentNoData').addClass("hide");

					$.each(data,function(i,o){
						if(null==o.rateOfFlow){
							o.rateOfFlow="—";
						}
						if(null==o.waterLevel){
							o.waterLevel="—";
						}
						o.time=getMyDate(o.time);
					});

					var dataProperty={
						waterLevel:{
							class:function(e){
								if(this.waterLevel==""||this.waterLevel=="—"){
									return e.value+" frozen";
								}else{
                      				return e.value;
                   				}
							},
							text:function(){
			 					if(this.waterLevel==""){
			                      return "—";
			                    }else{
			                    	return this.waterLevel;
			                    }
							}
						},
						rateOfFlow:{
							class:function(e){
								if(this.rateOfFlow==""||this.rateOfFlow=="—"){
									return e.value+" frozen";
								}else{
                      				return e.value;
                   				}

							},
							text:function(){
								if(this.rateOfFlow==""){
			                      return "—";
			                    }else{
			                    	return this.rateOfFlow;
			                    }
							}
						},
						time:{
							text:function(){
								return this.time;
							}
						}
					};

					$('#riverList .data-bind').render(data,dataProperty);
				}
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});
}

//水库水位数据列表
function getResvoirDataList(begin_time,end_time,sta_id){
	$.ajax({
		url:getResvoirDataListUrl,
		type:'get',
		data: {
			begin_time:begin_time,
			end_time:end_time,
			sta_id:sta_id
		},
		dataType: 'json',
		success: function(result){
			if (result.status === successReturn) {
				var data = result.data;
				if(data.length==0){
					$('.rightContentNoData').removeClass("hide");
				}else{
					$('.rightContentNoData').addClass("hide");
					$.each(data,function(i,o){
						if(null==o.storageCapacity){
							o.storageCapacity="—";
						}
                        if(null==o.waterLevel){
							o.waterLevel="—";
						}
						o.time=getMyDate(o.time);
					});
					var dataProperty={
						waterLevel:{
							class:function(e){
								if(this.waterLevel==""||this.waterLevel=="—"){
									return e.value+" frozen";
								}else{
                      				return e.value;
                   				}
							}
						},
						storageCapacity:{
							class:function(e){
								if(this.storageCapacity==""||this.storageCapacity=="—"){
									return e.value+" frozen";
								}else{
                      				return e.value;
                   				}
							}
						}
					};
                    $('#waterList .data-bind').render(data,dataProperty);
				}
			}else {
				errorBox(result.msg);
			}
		},
		error: function(XMLHttpRequest){
			// error_500(XMLHttpRequest.responseText);
		}
	});

}

//初始化右侧数据
function initRightContentData(){
	if(typeFlag=="0"){
		$('#selectedRegimen').html('水库水情');
		getStationNameList( typeFlag );//获取水库水情站名列表
	}else if(typeFlag=="1"){
		$('#selectedRegimen').html('河道水情');
		getStationNameList( typeFlag );//获取河道水情站名列表
	}
	setChartTime(begin_time);
}

function setChartTime(begin_time){
	$('#selectedStartYear').html(begin_time.substring(0,10).replace(/-/g,"."));//开始年月日
	$('#selectedStartMinute').html(begin_time.substring(11,16));//开始时分

	$('#selectedEndYear').html(end_time.substring(0,10).replace(/-/g,"."));//结束年月日
	$('#selectedEndMinute').html(end_time.substring(11,16));//结束时分
}

// 修正时间选择器的样式;
$(".timePicker").on("show",function(e){
    e.target.style.borderColor = "#4791ea";
    e.target.style.boxShadow = "1px 1px 10px rgba(71,145,234,.6)";
}).on("hide",function(e){
    e.target.style.borderColor = "";
    e.target.style.boxShadow ="";
});

$(function(){
	begin_time=getBeforeDate(1);
	initRightContentData();//初始化右侧内容
    $(window).resize(function(){myChart.resize();});  //动态设置chart大小

	//左侧菜单切换
	$("#left li").off('click').on('click',function(e){
        begin_time=getBeforeDate(1);  // 设置开始时间24小时前
        // initSelectBox();
		$(this).addClass('active').siblings().removeClass('active');  // 左侧按钮
        $('.timepickerBox').addClass('hide');  // 时间弹框
        $('.btn-tabs button:first').addClass('active').siblings().removeClass('active');  // 头部按钮

		if($(e.target).hasClass('left-item1')){//河道水情
            typeFlag='1';
			getStationNameList(typeFlag);//获取站名列表,获取右侧表格数据
			$('#selectedRegimen').html('河道水情');
			$('#riverList').removeClass('hide').siblings().addClass('hide');
            $("#echart .echartTitle .cuUnit").addClass("hide");  // 给第二个echart用的单位;
		}else{//水库水情
            typeFlag='0';
			getStationNameList(typeFlag);//获取站名列表,获取右侧表格数据

			$('#selectedRegimen').html('水库水情');
			$('#waterList').removeClass('hide').siblings().addClass('hide');
		}
        // dropDownIdx=0;
	});

	//右侧头部按钮切换
	$(".btn-tabs button").off('click').on('click',function(e){
		$(this).addClass('active').siblings().removeClass('active');
		//切换日期范围
		if($('.btn-tabs .btn1').hasClass('active')){//近24小时
            begin_time=getBeforeDate(1);
            setChartTime(begin_time);
            // initRightContentData();
            getStationNameList( typeFlag );
		}else if($('.btn-tabs .btn2').hasClass('active')){//近7天
			begin_time=getBeforeDate(7);
			setChartTime(begin_time);
			typeFlagChange(typeFlag);
		}else if($('.btn-tabs .btn3').hasClass('active')){//近30天
			begin_time=getBeforeDate(30);
			setChartTime(begin_time);
			typeFlagChange(typeFlag);
		}else if($('.btn-tabs .btn4').hasClass('active')){
			$('#customTime').modal('show');
            initDateTimePicker("content1Starttime","content1Endtime");
            // $('#content1Starttime').val(begin_time);
		}

	});
    // 切换站名库名(左右键)
    $(".selectBox").on("click",".prevButton.active,.nextButton.active",function(){
        if ($(this)[0].className.indexOf("prevButton")!==-1) {
            dropDownIdx--;
        }else {
            dropDownIdx++;
        }
        initSelectBox();
        typeFlagChange(typeFlag);
    });
    //切换站名库名(点击)
    $(".dropDonMenu").off('click').on('click','li',function(){
        dropDownIdx=$(this).index();
        $(".dropDonMenu").hide();
        initSelectBox();
        typeFlagChange(typeFlag);
    });
	//搜索
	$('#rightContent1_search_btn').on('click',function(){
		begin_time=$('#content1Starttime').val();
		end_time=$('#content1Endtime').val();
		$('#customTime').modal('hide');
		setChartTime(begin_time);
		typeFlagChange(typeFlag);
	});
	//交互
	$(".selectView span").on('click',function(){
		$(".dropDonMenu").show();
	});

	$(document).click(function(evt){
		if($(evt.target).parents(".selectBox").length==0){
			$('.dropDonMenu').hide();
		}
	});

});
