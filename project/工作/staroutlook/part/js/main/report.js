$(document).ready(function() {
	$(".commend_tab ul li").click(function() {
		$(this).addClass("active").siblings().removeClass("active"); //切换选中的按钮高亮状态
		var index = $(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
		$(".tab_box > div").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
	});

	var userId = localStorage.getItem('userId');
	var token = localStorage.getItem('token');

	if(userId != undefined) {
		$(".share_content").css("display", "block");
	} else {
		userId = GetQueryString("userId");
	}

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	console.log(userId);
	// 	测评分数
	$.ajax({
		type: "POST",
		url: "/star/question/myTest",
		data: {
			"userId": userId,currentVersion:current
		},
		dataType: "json",
		success: function(data) {
			console.log(data);
			if(data.result == 1) {
				$('.score').html(data.data.score);
				$('.SOOPT').html('<span>SOOPT</span>' + data.data.SOOPT);
				$('.CRFR').html('<span>CEFR</span>' + data.data.CEFR);
				
			} else {
				mask.Alert(data.msg,2);
//				layer.open({
//					content: data.msg,
//					style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
//					time: 2
//				});
			}
			localStorage.removeItem('userInfo'+userId);
		}
	});
	
	//获取tabs选项卡图片
	$.ajax({
		type: "get",
		url: "/star/course/images",
		dataType: "json",
		success: function(data) {
			if(data.result == 1) {
				$('.tab_1 img').attr("src", data.data.test_image_course);
				$('.tab_2 img').attr("src", data.data.test_image_agency);
			}
		}
	});

	// 分享
	$(".share").click(function() {
		$('#sharePopover').show();
//		$('#sharePopover').css('visibility','visible'); 
	});
	$("#channel1").click(function() {
		$('#sharePopover').hide();
//		$('#sharePopover').css('visibility','hidden'); 
	});

	var shareUrl = location.href + "?userId=" + userId;
	mobShare.config({
		debug: false, // 开启调试，将在浏览器的控制台输出调试信息	 
		appkey: '178ebbfdd38af', // appkey	 
		params: {
			url: shareUrl // 分享链接
		}
	});

	if(isWeiXin()) {
		$(".weixin").parent().css("display", "block");
		$(".friend").parent().css("display", "block");
	}
	// 判断是否为微信浏览器
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

	$(document).click(function(e){
		if($(e.target).parent().hasClass("check")){
			document.body.style.overflow='hidden';        
		}else{
			document.body.style.overflow='auto';     
		}
	})

	// 查看报告
	var phone;
	$.ajax({
		url: "/star/matchZone/getZonePhone",
		type: "post",
		data: {
			'userId': userId,
			'token': token,
			currentVersion:current
		},
		dataType: "json",
		success: function(data) {
			if(data.result == 1) {
				phone = data.data.zonePhone;
			}

		}
	});
	$(".check").click(function() {
		mask.Confirm('<p class="contact">请联系赛务负责人获取详细报告</p><p class="tel">联系电话:' + phone + '</p><p class="tel">全国统一参考价:10元</p>',["了解了"])
//		layer.open({
//			content: '<p class="contact">请联系赛务负责人获取详细报告</p><p class="tel">联系电话:' + phone + '</p><p class="tel">全国统一参考价:10元</p>',
//			btn: ['了解了'],
//			yes: function(index) {
//				layer.close(index);
//
//			}
//		});
	});
	
	// 返回
	$(".mui-icon-left-nav").on("tap",function(){
		var goBack = localStorage.getItem("goBack");
		
		if(goBack){
			location.href = localStorage.getItem("goBack");
		}else{
			history.back(-1);
		}

	})
	
	
});