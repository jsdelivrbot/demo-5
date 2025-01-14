// input保留小数位数,配合 <input onkeypress="return myNumberic(event,2)" />

// 判断系统&浏览器类型; 1.IE; 2.edge; 3.chrome; 4.firefox; 5.opear; 6.safari; 7.其他
function getOSAndBrowser() {
    var os = navigator.platform;
    var userAgent = navigator.userAgent;
    var info = "";
    var tempArray = "";
    //判断操作系统
    if (os.indexOf("Win") > -1) {
        if (userAgent.indexOf("Windows NT 5.0") > -1) {
            info += "Win2000";
        } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
            info += "WinXP";
        } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
            info += "Win2003";
        } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
            info += "WindowsVista";
        } else if (userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1) {
            info += "Win7";
        } else if (userAgent.indexOf("Windows NT 6.2") > -1 || userAgent.indexOf("Windows 8") > -1) {
            info += "Win8";
        } else if (userAgent.indexOf("Windows NT 6.3") > -1 || userAgent.indexOf("Windows 8.1") > -1) {
            info += "Win8.1";
        } else if (userAgent.indexOf("Windows NT 10.0") > -1 || userAgent.indexOf("Windows 10") > -1) {
            info += "Win10";
        } else {
            info += "Other";
        }
    } else if (os.indexOf("Mac") > -1) {
        info += "Mac";
    } else if (os.indexOf("X11") > -1) {
        info += "Unix";
    } else if (os.indexOf("Linux") > -1) {
        info += "Linux";
    } else {
        info += "Other";
    }
    info += "/";
    // 1.IE; 2.edge; 3.chrome; 4.firefox; 5.opear; 6.safari; 7.其他
    var broswerProperty = {
        info: null,
        broswerId: 7,
        isIE: false,
        IEversion: null,
    };
    //判断浏览器版本
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.toLowerCase().indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = (userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1);

    if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
        tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
        broswerProperty.broswerId = 4;
    } else if (isIE) {
        broswerProperty.isIE = true;
        broswerProperty.broswerId = 1;
        var version = "";
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            version = "IE7";
            broswerProperty.IEversion = 7;
        } else if (fIEVersion == 8) {
            version = "IE8";
            broswerProperty.IEversion = 8;
        } else if (fIEVersion == 9) {
            version = "IE9";
            broswerProperty.IEversion = 9;
        } else if (fIEVersion == 10) {
            version = "IE10";
            broswerProperty.IEversion = 10;
        } else {
            version = "0"
            broswerProperty.IEversion = 0;
        }

        info += version;
    } else if (isEdge) {
        info += "Edge";
        broswerProperty.isIE = true;
        broswerProperty.broswerId = 2;
    } else if (isIE11) {
        info += "IE11";
        broswerProperty.isIE = true;
        broswerProperty.broswerId = 1;
        broswerProperty.IEversion = 11;
    } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
        tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
        broswerProperty.broswerId = 3;
    } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
        tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
        info += tempArray[3] + tempArray[1];
        broswerProperty.broswerId = 6;
    } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
        tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
        info += tempArray[1] + tempArray[2];
        broswerProperty.broswerId = 5;
    } else {
        info += "unknown";
        broswerProperty.broswerId = 7;
    }
    broswerProperty.info = info;
    return broswerProperty;
}

function myNumberic(e,len) {
    var obj=e.srcElement || e.target;
    var dot=obj.value.indexOf(".");//alert(e.which);
    len =(typeof(len)=="undefined")?2:len;
    var  key=e.keyCode|| e.which;
    if(key==8 || key==9 || key==46 || (key>=37  && key<=40))//这里为了兼容Firefox的backspace,tab,del,方向键
        return true;
    if (key<=57 && key>=48) { //数字
        if(dot==-1)//没有小数点
            return true;
        else if(obj.value.length<=dot+len)//小数位数
            return true;
        } else if((key==46) && dot==-1){//小数点
            return true;
    }
    return false;
}

//数组去重
var unique=function(arr){
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
        var obj = arr[i];
        for(var j=0,jlen = res.length;j<jlen;j++){
            if(res[j]===obj) break;
        }
        if(jlen===j)res.push(obj);
    }
    return res;
};

//获取url中的参数
var getUrlParamH = function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
};
/**
 * 弹框的关闭
 * @param msg 弹框关闭后的提示信息
 * @param hideArea 弹框id
 */
var outBoxClose = function outBox(msg,hideArea){
	$("#tipMsg").addClass("active").html(msg).show();
	function tipHide(){
		$("#tipMsg").hide();
	}
    setTimeout(tipHide,2000);
	$("#"+hideArea).modal('hide');
};

var errorBox = function(msg){
    if (msg=='login.html') {
        window.location.href = "/";
        return false;
    }
    $("#errorInfo").text(msg);
    $("#errorBtn").modal("show");
};

/**数组中删除指定元素**/
 var deleteValue = function(arr,val){
   	for (var i = 0; i < arr.length; i++) {
   	 	if(arr[i] == val){
   	 		arr.splice(i,1);
   	 		break;
   	 	}
   	}
 };

//获取当前日期
var DateToday= function(flag) {
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
};

var datePrev = function(){
	var year = $('#monthsPicker').val().split("-")[0];
	var month = $('#monthsPicker').val().split("-")[1];
	month--;
	if(month<1){
		month = 12;
		year-=1;
	}

	if(month<10){
		month='0'+month;
	}
	$('#monthsPicker').val(year+'-'+month);
	return year+'-'+month;
};
var dateNext = function(){
	var d=new Date();
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
	return year+'-'+month;
};

//获取某月份总天数,不传值代表当月
function getLastDay(year,month) {
    if (year==undefined&&month==undefined) {
		year = new Date().getFullYear();
		month = new Date().getMonth()+1;
	}
    return new Date(year,month,0).getDate();
}

function formatnumber(value, num) {
    var a, b, c, i;
    a = value.toString();
    b = a.indexOf(".");
    c = a.length;
    if (num == 0) {
        if (b != -1) {
            a = a.substring(0, b);
        }
    } else {
        if (b == -1) {
            a = a + ".";
            for (i = 1; i <= num; i++) {
                a = a + "0";
            }
        } else {
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i++) {
                a = a + "0";
            }
        }
    }
    return a;
}

function round(num,n){
    var   dd=1;
    var   tempnum;
    for(i=0;i<n;i++){
        dd*=10;
    }
    tempnum=num*dd;
    tempnum=Math.round(tempnum);
    return formatnumber(tempnum/dd,n);
}


/*初始化datetimepicker*/
function initDateTimePicker(startId,endId){
    //改变时间时,限制前后时间
    $("#"+startId).on("changeDate",function(){
        var time = Date.parse($(this).val())+5*60*1000;
        $('#'+endId).datetimepicker('setStartDate', new Date(time));
    });
    $("#"+endId).on("changeDate",function(){
        var time = Date.parse($(this).val())-5*60*1000;
        $('#'+startId).datetimepicker('setEndDate', new Date(time));
    });

    // 1. 初始化插件
    // 结束时间
    var end = new Date();
    end = end - end%(5*60*1000);
    $("#"+endId).datetimepicker("setDate", new Date(end));
    // 开始时间
    var start=new Date();
        start.setHours(8,0,0,0);
    if (start > new Date(end)) {
        start = new Date(start.getTime()-24*60*60*1000);
    }
    $('#'+startId).datetimepicker('setDate', start);
    //2. 开始和结束时间限制
    $("#"+startId).trigger("changeDate");
    $("#"+endId).trigger("changeDate");

    // 2. 每分钟更新结束时间
    $('#'+endId).datetimepicker('setEndDate', new Date());
    $('#'+endId).datetimepicker('setDate', new Date());
    var i;
    clearInterval(i);
    i = setInterval(function(){
        $('#'+endId).datetimepicker('setEndDate', new Date());
        $('#'+endId).datetimepicker('setDate', new Date());
    },1000*60);
}

// 获取dateTimePicker显示日期的前一天
function getPrevDate(inputId){
    var prevTime = new Date(new Date($("#"+inputId).val())-24*60*60*1000);
    var year = prevTime.getFullYear();
    var month = prevTime.getMonth()+1;
    var day = prevTime.getDate();

    if (month < 10) {
        month = "0"+month;
    }
    if (day < 10) {
        day = "0"+day;
    }

    return year+"-"+month+"-"+day;
}

// 获取 时间格式"2017.01.01 8:00:00"
function getAutoRepairTime(time){
    var addHorizon = function(value){
        return (value<10)?"0"+value:value;
    };
    var thatTime = new Date(time);
    var year = thatTime.getFullYear();
    var month = addHorizon(thatTime.getMonth()+1);
    var date = addHorizon(thatTime.getDate());
    var hour = addHorizon(thatTime.getHours());
    var minute = addHorizon(thatTime.getMinutes());
    var second = addHorizon(thatTime.getSeconds());

    return (year+"."+month+"."+date+" "+hour+":"+minute+":"+second);
}


// 获取echart合适的最大最小值
function calcValue(dataArr){
    // 没有数组时；
    if (!dataArr||dataArr.length==0) {
        return {
            maxData: 1,
            minData: 0
        };
    }

    // 定义返回值；
    var value = {
        maxData: 0,
        minData: dataArr[0]
    };
    // 获取最大最小值
    $.each(dataArr,function(i,val){
        if (value.maxData<val) {
            value.maxData = val;
        }
    });
    $.each(dataArr,function(i,val){
        if (value.minData>val) {
            value.minData = val;
        }
    });
    // 最大值为0时；
    if (value.maxData == 0) {
        return {maxData: 1,minData: 0};
    }
    // 定时最大差值；
    var gap = value.maxData-value.minData;
    // 差值处理系数
    var paramGap = [0.001,0.005,0.01,0.025,0.05,0.1];

    // 获取最大值处理结果
    var paramArr = [0.001,0.005,0.01,0.015,0.025,0.05,0.1];
    var maxRes;
    var calcMax = function(maxData){
        for(var i=0;i<7;i++){
            if (maxData <= paramArr[i]) {
                value.maxData = paramArr[i];
                return false;
            }
        }
        paramArr = paramArr.map(function(val){return val*10;});
        calcMax(maxData);
    };
    calcMax(value.maxData);

    // 定义最小值处理函数
    var calcMin = function(){
        for(var i=0;i<paramGap.length;i++){
            if (value.minData > value.maxData-paramGap[i]) {
                value.minData = value.maxData-paramGap[i];
                return false;
            }
        }
        paramGap = paramGap.map(function(val){
            return val*10;
        });
        calcMin();
    };
    // 获取最小值处理结果
    if (gap/value.minData < 0.3) {
        calcMin();
    }else {
        value.minData = 0;
    }

    return value;
}
