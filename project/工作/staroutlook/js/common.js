document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
var userId = localStorage.getItem('userId');
var token = localStorage.getItem('token');
var clicktag = 0;
var operation = {
	report: function(reportType,reason,id){
		switch(reportType){
			case 1: // 视频
				reportajax({'userId': userId,'token': token,'reportType': 1,'reason': reason,'videoId': id});
				break;
			case 2: // 评论
				reportajax({'userId': userId,'token': token,'reportType': 2,'reason': reason,'commentId': id});
	 			break;
		}
		function reportajax(postdata){
			$.ajax({
				url:"/star/report/add",
				type:"post",
				data:postdata,
				success: function(data){
					if(data.result == "1") {
						layer.open({content: '操作成功!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
		        		mui('#reportPopover').popover("hide");
					}
				},
				error: function(){
					layer.open({content: '请求失败!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		}
	},
	share: function(shareId,videoUrl,videoName,thumbUrl,userName){
			
			mobShare.config({
				debug: true, // 开启调试，将在浏览器的控制台输出调试信息	 
				appkey: '178ebbfdd38af', // appkey	 
				params: {
					url: videoUrl, // 分享链接
					title: videoName, // 分享标题
					description: '', // 分享内容
					pic: thumbUrl // 分享图片
				}
			});
			if(isWeiXin()) {
				$(".weixin").parent().css("display", "block");
				$(".friend").parent().css("display", "block");
			}
			//微信
			function isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true;
				} else {
					return false;
				}
			}
			// 举报
			$("#reportPopover li").on("tap", function(e) {
				var reason;
				switch($(e.target).index()){
					case 0:
						reason = 1;
						break;
					case 1:
						reason = 2;
						break;
					case 2:
						reason = 3;
						break;
					case 3:
						reason = 4;
						break;
					case 4:
						reason = 5;
						break;
				}
				operation.report(1,reason,shareId);
			});
			// 关闭分享弹出层
			$("#channel1").click(function() {
				mui('#middlePopover').popover('hide');
			});
			// 关闭举报弹出层
			$("#channel2").click(function() {
				mui('#reportPopover').popover('hide');
			});
			
			// 分享到希望之星弹出层
			$(".star").off().on("tap", function() {
				mui('#starPopover').popover('show');
				$("#starPopover").addClass("mui-active");
				console.log(userName, videoName);
				var html = '';
				html += '<dt><img src="' + thumbUrl + '" /></dt>\
						 <dd><p class="star-user">@' + userName + '</p><p class="star-info">' + videoName + '</p></dd>';
				$(".star-content").html("").append(html);
				if($(".star-info").css("height") <= "21px") {
					$("dd p").css("margin-top", "0px");
				}
			});
			// 关闭希望之星分享
			$("#star-close").on("tap", function() {
				$(".star-text").val("说点什么吧(20字以内)").css("color", "#858585").siblings("#star-btn").css({
					"color": "#fff",
					"background-color": "#343240"
				}).attr("disabled", "disabled");
				mui('#starPopover').popover('hide');
			
			});
			// 填写评论信息
			$(".star-text").focus(function() {
				if($(this).val() == "说点什么吧(20字以内)") {
					$(this).val("").css("color", "#fff");
				}
				$(this).keyup(function() {
					$(this).siblings("#star-btn").removeAttr("disabled").css("background-color", "#ff004d");
					if($(this).val() == "") {
						$(this).siblings("#star-btn").attr("disabled", "disabled").css("background-color", "#343240");
					}
				});
			});
			$(".star-text").blur(function() {
				if($(this).val() == "") {
					$(this).val("说点什么吧(20字以内)").css("color", "#858585").siblings("#star-btn").css({
						"color": "#fff",
						"background-color": "#343240"
					}).attr("disabled", "disabled");
				}
			});
			// 分享转发到我的希望之星
			$("#star-btn").off().on("tap", function() {
				var comment = $(this).siblings(".star-text").val();
				if(comment != "说点什么吧(20字以内)" && comment != "") {
					$.ajax({
						type: "post",
						url: "/star/share/add",
						data: {
							'userId': userId,
							'token': token,
							'videoId': shareId,
							'comment': comment
						},
						dataType: "json",
						success: function(data) {
							if(data.result == "1") {
								layer.open({content: '分享成功!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							} else {
								layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							} 
							window.setTimeout(function() {
								mui('#starPopover').popover('hide');
							}, 2000);
						}
					});
				}
			});
	},
	favour: function(videoId,_this){
		//点赞
		if(clicktag == 1) {
			return;
		}
		if(clicktag == 0) {
			clicktag = 1;
			var hotNum = parseInt($(_this).find("span").text());
			$.ajax({
				type: "post",
				url: "/star/video/favour",
				data: {'userId': userId,'token': token,'videoId': videoId},
				success: function(data) {
					if($(_this).find(".dianzan").hasClass("relike")) {
						hotNum = hotNum - 1;
						$(_this).find(".dianzan").removeClass("relike").next().text(hotNum);
						console.log("取消点赞成功")
					} else {
						hotNum = hotNum + 1;
						$(_this).find(".dianzan").addClass("relike").next().text(hotNum);
						console.log("点赞成功")
					}
					if($(".hot-video").length>0){
						$(".hot-video li").each(function(index,obj){
							if($(this).attr("data-id") == localStorage.getItem("videoId")){
								$(this).find(".iconfont").next().text(hotNum);
							}
						})
						
					}
					setTimeout(function() {
						clicktag = 0;
					}, 1000)
				}
			});
			
		}
	},
	gohome: function(otherid,isopen){
		localStorage.setItem('otherid', otherid);
		window.location.href = '../html/myhome.html';
		
//		if(isopen){
//			if(isopen == "false"){
//				layer.open({content: '用户未开启主页!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
//				return;
//			}else{
//				window.location.href = '../html/myhome.html';
//				return;
//			}
//		}
//		
//
//		$.ajax({
//			type:"post",
//			url:"/star/user/getVisitInfo",
//			data:{
//				'userId': otherid,
//				'visitUserId': userId
//			},
//			success: function(data){
//				if(data.result == 1) {
//					mui.openWindow({url: "../html/myhome.html"});
//					if(data.data.user.isOpenedHomepage) {
//						mui.openWindow({url: "../html/myhome.html"});
//					} else {
//						layer.open({content: '该用户没有开通个人主页!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
//					}
//				}
//			},
//			error: function(){
//				layer.open({content: '获取数据失败!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
//			}
//		});
	},
	comment: function(shareId,isOpenedComment){
		if(isOpenedComment == "false"){
			layer.open({content: '该视频未开启评论!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
		}else{
			localStorage.setItem("videoId",shareId);
			window.location.href = "comment.html";
		}
	}
}
	