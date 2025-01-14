var flag=0;  //0:日; 1:月; 2:年
var myArr;
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
    var str;
    if(flag=="years"){
        str = year;
        return str;
    }else if(flag=="months"){
        str = year + "-" + month ;
        return str;
    }else if(flag=="days"){
    	str = year + "-" + month + "-" + day;
    	return str;
    }
}

function datePrev(flag){

  if (flag === 0) {//日统计
      var year= $('#daysPicker').val().split("-")[0];
      var month= $('#daysPicker').val().split("-")[1];
      var day = $('#daysPicker').val().split("-")[2];
      day--;

      if(day<10){
          day='0'+day;
        if(day<1){
          month-=1;
          if(month<10){
            month='0'+month;
          }
          day=getLastDay(year,month);
        }
      }
      $('#daysPicker').val(year+'-'+month+'-'+day);
  }else if (flag === 1) {//月统计
      var year= $('#monthsPicker').val().split("-")[0];
      var month = $('#monthsPicker').val().split("-")[1];
      month--;
     if(month<1){
        month=12;
        year-=1;
     }

      if(month<10){
          month='0'+month;
      }
      $('#monthsPicker').val(year+'-'+month);
  }else{//年统计

      var year = $('#yearsPicker').val().split("-")[0];
      year--;
      $('#yearsPicker').val(year);
  }

}
function dateNext(flag){
  var d=new Date();
  if (flag === 0) {//日统计
      var year= $('#daysPicker').val().split("-")[0];
      var month=$('#daysPicker').val().split("-")[1];
      var day = $('#daysPicker').val().split("-")[2];
      day++;
      if(day<10){
        day='0'+day;
      }
      if(year==d.getFullYear()&&month==d.getMonth()+1&&day>d.getDate()){
        return ;
      }
      if(day>getLastDay(year,month)){
        month=Number(month)+1;
        day=1;
        if(day<10){
          day='0'+day;
        }
        if(month<10){
          month='0'+month;
        }
      }
      $('#daysPicker').val(year+'-'+month+'-'+day);
  }else if (flag === 1) {//月统计
      var year= $('#monthsPicker').val().split("-")[0];
      var month = $('#monthsPicker').val().split("-")[1];
      month++;
      if(month<10){
        month='0'+month;
      }

      if(month>12){
        year++;
        month-=12;
        if(month<10){
          month='0'+month;
        }
      }
      if(year==d.getFullYear()&&month>d.getMonth()+1){
          return ;
      }
      $('#monthsPicker').val(year+'-'+month);

  }else{//年统计

      var year = $('#yearsPicker').val().split("-")[0];

      if(year==d.getFullYear()){
        return ;
      }
      year++;
      $('#yearsPicker').val(year);
  }

}



// 日统计&&月统计&&年统计
function changeDayMonthYear(e){
    $(this).addClass("active").siblings().removeClass("active");
    if(e.target.id=="days"){
        $('.wrap-title-second').addClass('hide');//日统计不显示人工自动站
        $(".wrap-content>*:eq(0)").removeClass("hide").siblings().addClass("hide");
        $('#daysPicker').val(DateToday('days'));

        initTableDate();
        flag=0;
    }else if(e.target.id=="months"){
        $('.wrap-title-second').removeClass('hide');
        $(".wrap-content>*:eq(1)").removeClass("hide").siblings().addClass("hide");
        $('.wrap-title-second button:last-child').addClass('active').siblings().removeClass('active');
        $('#monthsPicker').val(DateToday('months'));

        initTableMonth();
        flag=1;
    }else if(e.target.id=="years"){
        $('.wrap-title-second').removeClass('hide');
        $(".wrap-content>*:eq(2)").removeClass("hide").siblings().addClass("hide");
        $('.wrap-title-second button:last-child').addClass('active').siblings().removeClass('active');
        $('#yearsPicker').val(DateToday('years'));

        initTableYear();
        flag=2;
    }
    var idx=$(this).index();
    $('.pickerBox .timePicker').eq($(this).index()).removeClass('hide').siblings('.timePicker').addClass('hide');

    setLeftAndRightTimeStatus(flag);
}

// 切换 自动站 or 人工站
function changeAutoAndArti(){
    $(this).addClass("active").siblings().removeClass("active");
    if ($("#months").hasClass("active")) {
        initTableMonth();
    }else{
        initTableYear();
    }
}

//datetimepicker上一项下一项
function changeTime(){

    if($(this)[0].className.indexOf("prevButton")!==-1){
        if (flag === 2) {
            datePrev(2);
            initTableYear();
        }else if(flag === 1){
            datePrev(1);
            initTableMonth();
        }else{
            datePrev(0);
            initTableDate();
        }
        $(".nextButton").addClass("active");
    }else{
        if (flag === 2) {
            dateNext(2);
            initTableYear();
            setLeftAndRightTimeStatus();
        }else if(flag === 1){
            dateNext(1);
            initTableMonth();
            setLeftAndRightTimeStatus();
        }else{
            dateNext(0);
            initTableDate();
            setLeftAndRightTimeStatus();
        }
    }
}

// 设置datetimepicker左右按钮状态
function setLeftAndRightTimeStatus(){
    var thisDate = new Date();
    var todayNumber = thisDate.getDate();
    var tomonthNumber = thisDate.getMonth()+1;
    var toyearNumber = thisDate.getFullYear();
    var arr = $('.pickerBox input').not(".hide").val().split("-");

    $(".nextButton").removeClass("active");
    if (flag === 2) { //年
        if (Number(arr[0]) < toyearNumber) {
            $(".nextButton").addClass("active");
        }
    }else if (flag === 1) {  //月份
        if (Number(arr[0]) < toyearNumber) {
            $(".nextButton").addClass("active");
        }else if(Number(arr[0]) === toyearNumber){
            if (Number(arr[1]) < tomonthNumber) {
                $(".nextButton").addClass("active");
            }
        }
    }else{  //日
        if (Number(arr[0]) < toyearNumber) {
            $(".nextButton").addClass("active");
        }else if(Number(arr[0]) === toyearNumber){
            if (Number(arr[1]) < tomonthNumber) {
                $(".nextButton").addClass("active");
            }else if(Number(arr[1]) === tomonthNumber){
                if (Number(arr[2]) < todayNumber) {
                    $(".nextButton").addClass("active");
                }
            }
        }
    }
}

function initTableDate(){
    // 处理day超时时间, 添加"-"

    var checkOvertimeDate = function(a,b,c){
        var thatHour = parseInt(b.colModel.name,10);
        if ((thatHour>=0)&&(thatHour<=7)) {
            var thatTime = new Date(new Date($("#daysPicker").val()).getTime()+24*60*60*1000);
            thatTime.setMinutes(0);
            thatTime.setSeconds(0);
        }else {
            var thatTime = new Date($("#daysPicker").val());
        }
        thatTime.setHours(thatHour);
        if (thatTime>new Date()) {
            return " ";
        }
        return String(a);
    };

    var afterLoad = function(data){
        // console.log(data);
        // $(this).jqGrid("setCaption","年毕业学生信息表"); 
        // 重置左侧固定列的高度
        var height = $("div.frozen-bdiv").outerHeight();
        if((getOSAndBrowser().broswerId == 3)&&(height != 0)){
			$("div.frozen-bdiv").height( $("div.frozen-bdiv").outerHeight()+9 );
		}
    };

    var param = {  //组装初始化表格需要的参数;
        url: getDayRainInfoUrl,
        postData: {
            days: $("#daysPicker").val()
        },
        arrName: ["测站编码","测站名称",'合计',"8时","9时","10时","11时","12时","13时","14时","15时","16时","17时","18时","19时","20时","21时","22时","23时","0时","1时","2时","3时","4时","5时","6时","7时"],
        arrModel: [
            {name: 'sys_code',align:'center',sortable: false,width: 120,frozen: true},
            {name: 'station_name',align:'center',sortable:false,width:120,frozen: true},
            {name: 'total',align:'center',sortable:false,width:90,formatter: "integer",frozen: true},
            {name: '8',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '9',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '10',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '11',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '12',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '13',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '14',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '15',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '16',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '17',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '18',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '19',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '20',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '21',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '22',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '23',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '0',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '1',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '2',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '3',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '4',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '5',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '6',align:'center',width:60,sortable:false,formatter : checkOvertimeDate},
            {name: '7',align:'center',width:60,sortable:false,formatter : checkOvertimeDate}
        ],
        afterLoad: afterLoad
    };

    initTable(param);
}

// 月
function initTableMonth(){
    var checkOvertimeMonth = function(a,b,c){
        var monthsPickerArr = $("#monthsPicker").val().split("-");
        var thatTime = new Date(monthsPickerArr[0],(monthsPickerArr[1]-1),b.colModel.name);
        thatTime.setHours(0,0,0,0);
        if (thatTime>new Date()) {
            return " ";
        }
        return String(a);
    };

    var afterLoad = function(result){
        // 获取年月的天数
        var arrDate = $("#monthsPicker").val().split("-");
        var lastDate = getLastDay(arrDate[0], arrDate[1]);

        if (lastDate === 30) {
            $("#rainfallTable").showCol("29").showCol("30").hideCol("31").trigger("reloadGrid");
        }else if(lastDate === 29){
            $("#rainfallTable").showCol("29").hideCol("30").hideCol("31").trigger("reloadGrid");
        }else if(lastDate === 28){
            $("#rainfallTable").hideCol("29").hideCol("30").hideCol("31").trigger("reloadGrid");
        }else{
            $("#rainfallTable").showCol("29").showCol("30").showCol("31").trigger("reloadGrid");
        }

        // 重置左侧固定列的高度
        var height = $("div.frozen-bdiv").outerHeight();
        if((getOSAndBrowser().broswerId == 3)&&(height != 0)){
			$("div.frozen-bdiv").height( $("div.frozen-bdiv").outerHeight()+9 );
		}
        // 重置内容宽度,消除右侧缝隙
        if (getLastDay() !== 31) {
            $(".ui-jqgrid")[0].setAttribute("style","width: calc(100% - 1px)!important");
        }
    };

    var param = {  //组装初始化表格需要的参数;
        url: getMonthRainInfoUrl,
        postData: {
            month: $("#monthsPicker").val(),
            type: $(".wrap-title-second .active").data("type")
        },
        arrName: ["测站编码","测站名称",'合计',"1日","2日","3日","4日","5日","6日","7日","8日","9日","10日","11日","12日","13日","14日","15日","16日","17日","18日","19日","20日","21日","22日","23日","24日","25日","26日","27日","28日","29日","30日","31日"],
        arrModel: [
            {name: 'sys_code',align:'center',width:120,sortable: false,frozen: true},
            {name: 'station_name',align:'center',width:120,sortable:false,frozen: true},
            {name: 'total',align:'center',width:90,sortable:false,formatter:'integer',frozen: true},
            {name: '1',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '2',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '3',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '4',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '5',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '6',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '7',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '8',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '9',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '10',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '11',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '12',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '13',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '14',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '15',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '16',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '17',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '18',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '19',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '20',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '21',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '22',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '23',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '24',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '25',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '26',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '27',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '28',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth},
            {name: '29',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth,hidden:false},
            {name: '30',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth,hidden:false},
            {name: '31',align:'center',width:60,sortable:false,formatter: checkOvertimeMonth,hidden:false}
        ],
        afterLoad: afterLoad
    };
    initTable(param);
}

// 年
function initTableYear(){
    var yearsPickerValue = $("#yearsPicker").val();
    var monthArr = {"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Octb":10,"Nov":11,"Dece":12};
    var checkOvertimeYear = function(a,b,c){
        var thatTime = new Date(new Date(yearsPickerValue).setMonth(monthArr[b.colModel.name]-1,1));
        thatTime.setHours(0);
        if (thatTime>new Date()) {
            return " ";
        }
        return String(a);
    };

    var afterLoad = function(){
        // 重置左侧固定列的高度
        var height = $("div.frozen-bdiv").outerHeight();
        if((getOSAndBrowser().broswerId == 3)&&(height != 0)){
			$("div.frozen-bdiv").height( $("div.frozen-bdiv").outerHeight()+9 );
		}
    };

    var param = {  //组装初始化表格需要的参数;
        url: getYearRainInfoUrl,
        postData: {
            year: $("#yearsPicker").val(),
            type: $(".wrap-title-second .active").data("type")
        },
        arrName: ["测站编码","测站名称",'合计',"1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        arrModel: [
            {name: 'sys_code',align:'center',width:120,sortable: false,frozen: true},
            {name: 'station_name',align:'center',width:120,sortable:false,frozen: true},
            {name: 'total',align:'center',width: 90,sortable:false,formatter:'integer',frozen: true},
            {name: 'Jan',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Feb',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Mar',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Apr',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'May',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Jun',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Jul',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Aug',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Sep',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Octb',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Nov',align:'center',sortable:false,width:120,formatter:checkOvertimeYear},
            {name: 'Dece',align:'center',sortable:false,width:121,formatter:checkOvertimeYear}
        ],
        afterLoad: afterLoad
    };
    initTable(param);
}

/*更新table数据*/
function initTable(param){
    document.querySelector(".wrap-content").style.opacity = 0;
    $.jgrid.gridUnload("rainfallTable");  // 清除旧数据

    $("#rainfallTable").jqGrid({
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
        // caption: '我是标题',
        // title: '我是title',
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
    $("#rainfallTable").jqGrid('setFrozenColumns');
    document.querySelector(".wrap-content").style.opacity = 1;
}

$(function(){
	//初始化日期控件
    $('#daysPicker').val(DateToday('days'));
    setLeftAndRightTimeStatus();
    // 日统计&&月统计&&年统计
    $(".wrap-title-first>button").on("click",changeDayMonthYear);
    // 人工站&&自动站
    $(".wrap-title-second>button").on("click",changeAutoAndArti);

    //左右按钮切换日期 存在问题
    $(".pickerBox").on("click",".prevButton.active,.nextButton.active",changeTime);

    // 导出到excel文件
    $(".wrap-title-forth>button:first").on("click",function(){
        var time = $(".wrap-title-third .pickerBox>input:not(.hide)").val();
        $("#rainfallTable").jqGrid('exportToExcel', {
            title: "嘿嘿嘿",
            includeCaption : true,
            includeLabels: true,
            includeGroupHeader: true,
            includeHeader: true,
            includeFooter: false,
            fileName: "雨量统计报表-"+time+".xlsx",
            mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            maxlength: 40,
            onBeforeExport: null,
            replaceStr: null
        });
    }); 

    $(".wrap-title-forth>button:eq(1)").on("click",function(){
        console.log("想要导出1");
        var jsonn = JSON.stringify($('#rainfallTable').jqGrid('getRowData'));
        ExportToExcel(jsonn,"Report Title",true);
    });

    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    initTableDate();

    window.onresize = function(){
		var width = $(".wrap-content").outerWidth();
		$("#rainfallTable").jqGrid('setGridWidth', width);
	};
});
