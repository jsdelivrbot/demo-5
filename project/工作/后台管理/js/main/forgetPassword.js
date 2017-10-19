$(function() {
	var forget = {
		init: function() {
			var _this = this;
			_this.next();
		},
		next: function() {
			var _this = this;
			//页面跳转下一步
			$('#btn-next').click(function() {
				var userEmail = $("#email").val();
				_this.forgetPassword(userEmail);
			});
		},
		forgetPassword: function(userEmail) {
			var _this = this;
			$.ajax({
				dataType: "json",
				type: "post", //请求方式
				url: "/public_platform/businessUser/forgetPassword", //发送请求地址
				data: { //发送给数据库的数据
					"email": userEmail,
				},
				//请求成功后的回调函数有两个参数
				success: function(data) {
					overTime(data);
					if(data.result == 1) {
						//跳转下一步
						console.log(userEmail);
						$(".active").removeClass('active').next().addClass('active');
						if($('#step2').show()) {
							$('.panel-body #btn-next').click(function() {
								_this.gotoEmail(userEmail);
							});
						}
					} else {
						$('#myModal').modal({
							keyboard: false
						});
					}
				}
			});
		},
		//跳转到用户指定的邮箱地址
		gotoEmail: function($mail) {
			$t = $mail.split('@')[1];
			$t = $t.toLowerCase();
			if($t == '163.com') {
				window.location.href = 'mail.163.com';
			} else if($t == 'vip.163.com') {
				window.location.href = 'http://vip.163.com';
			} else if($t == '126.com') {
				window.location.href = 'http://mail.126.com';
			} else if($t == 'qq.com' || $t == 'vip.qq.com' || $t == 'foxmail.com') {
				window.location.href = 'https://mail.qq.com';
			} else if($t == 'gmail.com') {
				window.location.href = 'http://mail.google.com';
			} else if($t == 'sohu.com') {
				window.location.href = 'http://mail.sohu.com';
			} else if($t == 'tom.com') {
				window.location.href = 'http://mail.tom.com';
			} else if($t == 'vip.sina.com') {
				window.location.href = 'http://vip.sina.com';
			} else if($t == 'sina.com.cn' || $t == 'sina.com') {
				window.location.href = 'http://mail.sina.com.cn';
			} else if($t == 'tom.com') {
				window.location.href = 'http://mail.tom.com';
			} else if($t == 'yahoo.com.cn' || $t == 'yahoo.cn') {
				window.location.href = 'http://mail.cn.yahoo.com';
			} else if($t == 'tom.com') {
				window.location.href = 'http://mail.tom.com';
			} else if($t == 'yeah.net') {
				window.location.href = 'www.yeah.net';
			} else if($t == '21cn.com') {
				window.location.href = 'http://mail.21cn.com';
			} else if($t == 'hotmail.com') {
				window.location.href = 'www.hotmail.com';
			} else if($t == 'sogou.com') {
				window.location.href = 'http://mail.sogou.com';
			} else if($t == '188.com') {
				window.location.href = 'www.188.com';
			} else if($t == '139.com') {
				window.location.href = 'http://mail.10086.cn';
			} else if($t == '189.cn') {
				window.location.href = 'http://webmail15.189.cn/webmail';
			} else if($t == 'wo.com.cn') {
				window.location.href = 'http://mail.wo.com.cn/smsmail';
			} else if($t == '139.com') {
				window.location.href = 'http://mail.10086.cn';
			} else {
				return '';
			}
		}
	};
	forget.init();
})