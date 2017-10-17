// JavaScript Document
//响应式自适应
(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		if(clientWidth>750)	clientWidth=750;
		docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//---------------------------------------------------------------
//获取URL参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
var userId = GetQueryString("userId");
var token = GetQueryString("token");
//---------------------------------------------------------------
//跨域请求
var ajax=function(url,type,data,dataType,suc,err){
	this.url=url;
	this.type=type;
	this.data=data;
	this.dataType=dataType;
	this.suc=suc;
	this.err=err;
	this.init(this.suc,this.err);
}
ajax.prototype={
	init:function(suc,err){
		$.ajax({
			url:this.url,
			type:this.type,
			data:this.data,
			dataType:this.dataType,
			jsonp:"callback",
			success:function(datas){suc(datas);},
			error:function(datas){err(datas);}
		});	
	}
}
window['ajax']=ajax;
//---------------------------------------------------------------
//限制输出字数个数
function maxTxtNum(element,maxNum){
	element.each(function(){
		var node=$(this)[0].nodeName;
		var _val=$(this).val(),
			_html=$(this).html();
		if(node=="INPUT"){
			if(_val.length>maxNum){
				$(this).val(_val.substring(0,maxNum));
			}
		}else{
			if(_html.length>maxNum){
				$(this).html(_html.substring(0,maxNum)+"...");
			}	
		}	
	});
}
//---------------------------------------------------------------
//判断是否滚轮到底部
$(document).scroll(function(){
	var docH=$(document).height();
	var winH=$(window).height();
	if($(this).scrollTop()>=(docH-winH)){
		//alert("已到底部");
	}
	if($(this).scrollTop()<=0){
		//alert("已到头部");
	}
});
//---------------------------------------------------------------
//判断是否PC
function isPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v])>0){flag=false;break;}
    }
    return flag;
}
//---------------------------------------------------------------
//是否IE
function isIE(){
	return !!window.ActiveXObject || "ActiveXObject" in window;	
}
//---------------------------------------------------------------
//正则验证
var Chk={
	//验证手机(验证段号，位数)
	chkMPhone:function(num){
		return /^((13\d)|(15[0-35-9])|(17[36-8])|(14[57])|(18\d))\d{8}$/.test(num+'');
	},
	//验证邮箱
	chkMail:function(str){
		return /^[_\w]+@[_\w]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2})?$/.test(str+'');
	},
	//验证用户名(验证只能_$\w，最少2位)
	chkUserName:function(str){
		return /^[_$\w]{2,}$/.test(str+'');
	},
	chkRealName:function(str){
		return /^[a-zA-Z\u4e00-\u9fa5]{1,15}$/.test(str+'');
	},
	//验证密码(验证只能_$@\w，最少6位)
	chkpassword:function(str){
		return /^[_$@\w]{6,}$/.test(str+'');
	},
	//验证身份证(验证15位或18位，末尾x)
	chkId:function(str){
		return /^[1-9](\d{16}|\d{13})[\dxX]$/.test(str+'');
	}	
}
window['Chk']=Chk;
//---------------------------------------------------------------
//弹出层
var Mask = function() {
	this.init = function(){
		var container = $(".mask-container");
		var width = container.outerWidth();
		var height = container.outerHeight();
		container.css({"marginLeft":"-" + width/2 + "px","marginTop":"-" + height/2 + "px"});
	},
	this.open = function(html){
		$("body").append(html);
		$("html,body").css("overflow", "hidden");
		this.init();
	},
	this.close = function() {
		$(".mask").off().remove();
		$("html,body").css("overflow", "auto");
	}
};
Mask.prototype.Alert = function(msg, time, callback) {
	var _this = this;
	var timer = null;
	var html = '<div class="mask"><div class="mask-bg"></div><div class="mask-container">' + msg + '</div></div>'
	_this.open(html);
	$(".mask").click(function(ev) {
		clearTimeout(timer);
		_this.close();
	});
	$(".mask-container").click(function(ev) {
		ev.stopPropagation()
	});
	if(time && time > 0) {
		timer = setTimeout(function() {
			_this.close();
			callback && callback();
			clearTimeout(timer);
		}, time * 1000);
	}
};
var mask = new Mask();


var Tab = function(ele){
	this.container = ele;
	this.select_nav = $(".tab-select span");
	this.select_box = this.container.find(".section");
	this.change();
}
Tab.prototype = {
	change: function(){
		var _this = this;
		_this.select_nav.click(function(){
			var index = $(this).addClass("active").siblings().removeClass("active").end().index();
			_this.select_box.eq(index).show().siblings().hide();
			document.documentElement.scrollTop = document.body.scrollTop =0;
		})
	}
}
