$(function() {
	var userId = localStorage.getItem('userId'),
		token = localStorage.getItem('token');
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005
	});
	var myinfo = {
		init: function() {
			var _this = this;
			_this.getInfo();
			_this.other();
			_this.matchStatus();
			_this.getReadStatus();
		},
		getReadStatus: function(){
			var unRead = sessionStorage.getItem("unRead");
			if(unRead == 1){
				$(".gomynews").append("<span class='unRead'><span>");
				$("#myinfo").append("<span class='unRead'><span>");
			}
		},
		getInfo: function() {
			var _this = this;
			$.ajax({
				url: "/star/user/getInfo",
				type: "post",
				data: {'userId': userId,'token': token},
				dataType: "json",
				success: function(data) {
//					console.log(data);
					switch(data.result) {
						case "1":
							var user = data.data.user;
							$("#avatar").attr("src",user.avatar);
							$("#name").html(user.name);
							$("#enounce").html(user.enounce);
							$("#videoTotal").html(user.videoTotal);
							$("#shareTotal").html(user.shareTotal);
							$("#followTotal").html(user.followTotal);
							$("#fansTotal").html(user.fansTotal);
							break;
						case "200":
							layer.open({
								content: '用户名不存在',
								style: 'background:rgba(0,0,0,.8); color:#fff; border:none;'
							});
							break;
						default:
							layer.open({
								content: '网络出错',
								style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
								time: 2
							});
							break;
					}
				},
				error: function() {
					layer.open({
						content: '请求失败，请重试',
						style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
						time: 2
					});
				}
			})
		},
		myTest: function(){
			$.ajax({
				url: "/star/question/myTest",
				type: "post",
				data: {'userId': userId,currentVersion:current},
				dataType: "json",
				success: function(data) {
					if(data.data !== null) {
						$('.goreport').show();
					} else{
						$('.goreport').hide();
					}
				}
			})
		},
		matchStatus: function() {
			var _this = this;
			$.ajax({
				url: "/star/match/matchStatus",
				type: "post",
				data: {'userId': userId,'token': token,currentVersion:current},
				dataType: "json",
				success: function(data) {
					var authStatus = data.data.authStatus;
					var testStatus = data.data.testStatus;
					if(testStatus == 1) {
						$('.goreport').show();
						
					} else{
						$('.goreport').hide();
					}
					/*判断选手是否认证*/
					$('.gomytest').click(function(){
						if(authStatus == 0) {
							window.location.href = '../html/prove.html';
						} else if(authStatus == 1) {
							window.location.href = "../html/matchinfo.html";
						}
					});
				}
			});
		},
		other: function() {
			var _this = this;
			$('.gomynews').click(function() {
				window.location.href = '../html/mynews.html';
			});
			$('.goreport').click(function() {
				window.location.href = '../html/report.html';
			});
			$('.golabelmana').click(function() {
				window.location.href = '../html/labelmana.html';
			});
			$('.gofeedback').click(function() {
				window.location.href = '../html/feedback.html';
			});
			$('.goset').click(function() {
				window.location.href = '../html/set.html';
			});
			mui('.mui-bar').on('tap', 'a', function() {
				mui.openWindow({
					url: this.href,
					styles: {
						top: 0,
						bottom: '50px',
						bounce: 'vertical'
					}
				})
			})
		}
	}
	myinfo.init();
});