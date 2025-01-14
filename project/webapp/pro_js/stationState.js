var thisDate = new Date();
var todayNumber = thisDate.getDate();
var tomonthNumber = thisDate.getMonth()+1;
var toyearNumber = thisDate.getFullYear();

//切换月份
function clickLeftOrRightMonth(){
	if ($(this)[0].className.indexOf("prevButton")!==-1) {
		datePrev();
	}else {
		dateNext();
	}
	initTable();
	setLeftAndRightMonthStatus();
}

//设置月份左右按钮状态
function setLeftAndRightMonthStatus(){
	var arr = $('#monthsPicker').val().split("-");

	$(".nextButton").removeClass("active");
	if (Number(arr[0]) < Number(toyearNumber)) {
		$(".nextButton").addClass("active");
	}else if (Number(arr[0]) === Number(toyearNumber)) {
		if (Number(arr[1]) < Number(tomonthNumber)) {
			$(".nextButton").addClass("active");
		}
	}
}

// 查询测站状态
function initTable(){
	var thisTimeEnd = new Date(new Date().setHours(23,59,0,0));  // 定义今天结束的时间
	var yyyymmArr = $("#monthsPicker").val().split("-");

	var createStatusHTML = function(a,b,c){

		var yyyymmArr = $("#monthsPicker").val().split("-");
		var thatDate = $("#monthsPicker").val()+"-"+((b.colModel.name<10)?"0"+b.colModel.name:b.colModel.name);
		var result = "";  // 定义返回的数据
		var thatTime = new Date(new Date(yyyymmArr[0],(yyyymmArr[1]-1),b.colModel.name));  //定义某一天的时间
		if (thatTime < thisTimeEnd) {  //是否是已经过去的时间
			if (c.statusList&&c.statusList.length) {  // 是否有数据
				$.each(c.statusList,function(i,val){
					if (val.date_time == thatDate) {
						if (val.type == 12) {
							result = "<i class='circle normal'></i>";
						}else if(val.type == 13){
							result = "<i class='circle abnormal'></i>";
						}
					}
				});
			}
			// else {
			// 	result = "—";
			// }
		}
		return result;
	};

	var afterLoad = function(result){
		var yyyymmArr = $("#monthsPicker").val().split("-");
		var lastDate = getLastDay(yyyymmArr[0],yyyymmArr[1]);

		if (lastDate === 30) {
			$("#stationStateTable").showCol("29").showCol("30").hideCol("31").trigger("reloadGrid");
		}else if(lastDate === 29){
			$("#stationStateTable").showCol("29").hideCol("30").hideCol("31").trigger("reloadGrid");
		}else if(lastDate === 28){
			$("#stationStateTable").hideCol("29").hideCol("30").hideCol("31").trigger("reloadGrid");
		}else{
			$("#stationStateTable").showCol("29").showCol("30").showCol("31").trigger("reloadGrid");
		}
		// 无数据,添加占位图片
		// var data = result.data;
		// if (data==null||data.length==0) {
		// 	$(".ui-jqgrid-bdiv:first").append("<div class='noContent'>无数据</div>");
		// }
		console.log(result);

		// 重置左侧固定列的高度
		var height = $("div.frozen-bdiv").outerHeight();
        if((getOSAndBrowser().broswerId == 3)&&(height != 0)){
			$("div.frozen-bdiv").height( $("div.frozen-bdiv").outerHeight()+9 );
		}
	};


	var param = {  //组装初始化表格需要的参数;
		url: getStatusInfoListUrl,
        postData: {
			begin_time: $("#monthsPicker").val()+"-01",
			end_time: $("#monthsPicker").val()+"-"+getLastDay(yyyymmArr[0],yyyymmArr[1])
        },
        arrName: ["测站名称","1日","2日","3日","4日","5日","6日","7日","8日","9日","10日","11日","12日","13日","14日","15日","16日","17日","18日","19日","20日","21日","22日","23日","24日","25日","26日","27日","28日","29日","30日","31日"],
        arrModel: [
	        {name: 'sta_name',align:'center',width:120,sortable:false,frozen: true},
	        {name: '1',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '2',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '3',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '4',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '5',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '6',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '7',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '8',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '9',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '10',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '11',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '12',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '13',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '14',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '15',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '16',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '17',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '18',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '19',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '20',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '21',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '22',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '23',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '24',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '25',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '26',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '27',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '28',align:'center',width:60,sortable:false,formatter: createStatusHTML},
	        {name: '29',align:'center',width:60,sortable:false,formatter: createStatusHTML,hidden:false},
	        {name: '30',align:'center',width:60,sortable:false,formatter: createStatusHTML,hidden:false},
	        {name: '31',align:'center',width:60,sortable:false,formatter: createStatusHTML,hidden:false}
	    ],
        afterLoad: afterLoad
    };
    initTableData(param);
}

/*更新table数据*/
function initTableData(param){
    document.querySelector(".wrap-content").style.opacity = 0;
    $.jgrid.gridUnload("stationStateTable");  // 清除旧数据

    $("#stationStateTable").jqGrid({
        url: param.url,
        mtype: 'post',
        datatype: "json",
        postData: param.postData,
        jsonReader : {
            root: "data",
            repeatitems: false
        },
        colNames: param.arrName,
        colModel: param.arrModel,
        shrinkToFit: false,
        autoScroll: true,
        loadonce: true,
        width: $(".wrap-content").outerWidth(),
        height: "auto",
        styleUI : 'Bootstrap',
        loadui: 'disable',
		rowNum: -1,  //显示全部数据
        loadComplete: param.afterLoad
    });
    $("#stationStateTable").jqGrid('setFrozenColumns');
    document.querySelector(".wrap-content").style.opacity = 1;
}


$(function(){
	$('#monthsPicker').val(DateToday('months'));
	//切换月份
	$(".pickerBox").on("click",".prevButton.active,.nextButton.active",clickLeftOrRightMonth);

	$.jgrid.defaults.responsive = false;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	initTable();

	window.onresize = function(){
		var width = $(".wrap-content").outerWidth();
		$("#stationStateTable").jqGrid('setGridWidth', width);
	};
});
