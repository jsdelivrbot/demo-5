$(function() {
	var surplus = 60; //倒计时时间

	var login = {
		init: function() {
			var _this = this;
			_this.start();
			_this.getcode();
			_this.clickSubmit();
		},
		start: function() {
			var _this = this;

			$('input').focus(function() {
				$(this).parent("li").css("border-bottom", "1px solid #ef6002");
			});
			$('input').blur(function() {
				$(this).parent("li").css("border-bottom", "1px solid #dad9d9");
			});
			//登录按钮变化
			$('.login-box input').on('input propertychange', function() {
				if($('#login_phone').val() != "" && $('#login_code').val() != "") {
					$('.btn-box').css("background", "url(../images/xw_login_btn_signin_pressed.png) no-repeat center");
				} else {
					$('.btn-box').css("background", "url(../images/xw_login_btn_signin_default.png) no-repeat center");
				}
			});
		},
		clickSubmit: function() {
			var _this = this;
			$('.btn-submit').on("click", function() {
				var phone = $('#login_phone'),
					code = $('#login_code');

				if(_this.checkPhone(phone) && _this.checkCode(code)) {
					$.ajax({
						url: urlPash + '/star/user/loginWithVcode',
						type: 'get',
						dataType: 'jsonp',
						jsonp: 'jsonpCallback',
						data: {
							phone: phone.val(),
							code: code.val()
						},
						success: function(data) {
							console.log(data);
							
							switch(data.result) {
								case "1":
									token = data.data.token,
									userId = data.data.user.id;
//									status = data.data.authStatus;
									localStorage.setItem("userId", userId);
									localStorage.setItem("token", token);
									localStorage.setItem("status", data.data.authStatus);
									if(data.data.authStatus == 0) {
										layer("请先认证信息！", 2, function() {
											window.location.href = basePath + "website/html/register.jsp";
										});
									} else {
										window.location.href = basePath + "website/html/information.jsp";
									}
									break;
								case "202":
									$(".error-tip").html("验证码错误!");
									break;
								default:
									$(".error-tip").html("网络出错!");
									break;
							}
						},
						error: function() {
							console.log(data);
							$(".error-tip").html("请求失败!");
						}
					})
				}
			})
		},
		//校验手机
		checkPhone: function(val) {
			var _this = this;
			var phoneVal = val.val();
			if(phoneVal == "") {
				$(".error-tip").html("请输入手机号!");
				return false;
			} else if(phoneVal !== "" && !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phoneVal.trim())) {
				$(".error-tip").html("请输入正确的手机号!");
				return false;
			} else {
				return true;
			}
		},
		//校验验证码
		checkCode: function(val) {
			var _this = this;
			var codeVal = val.val();
			if(codeVal == "") {
				$(".error-tip").html("请输入验证码!");
				return false;
			} else {
				return true;
			}
		},
		// 发送验证码
		getcode: function() {
			var _this = this;
			$('.btn-code').on('click', function() {
				var phone = $('#login_phone');
				var btn = $(this);
				if(_this.checkPhone(phone)) {
					btn.attr("disabled", true);
					$.ajax({
						type: "get",
						url: urlPash + "/star/user/getVerifyCode?operation=4&phone=" + phone.val(),
						dataType: "jsonp",
						jsonp: "jsonpCallback",
						success: function(data) {
							console.log(data);
							switch(data.result) {
								case "1":
									_this.countDown(btn);
									$(".error-tip").html("短信发送成功!");
									break;
								case "200":
									$(".error-tip").html("用户不存在!");
									btn.removeAttr("disabled");
									break;
								case "205":
									$(".error-tip").html("手机号已注册!");
									btn.removeAttr("disabled");
									break;
								case "206":
									$(".error-tip").html("手机验证码错误!");
									btn.removeAttr("disabled");
									break;
								default:
									$(".error-tip").html("网络出错!");
									btn.removeAttr("disabled");
									break;
							}
						},
						error: function() {
							$(".error-tip").html("请求失败!");
							btn.removeAttr("disabled");
						}
					})
				}
			})
		},
		//验证码倒计时
		countDown: function(btn) {
			var _this = this;

			if(surplus == 1) {
				btn.removeAttr("disabled").css("color", "#ef6002").val("获取验证码");
				surplus = 60;
			} else {
				btn.attr("disabled", true).css("color", "#686868");
				surplus--;
				btn.val("重新发送" + surplus + "秒");
				setTimeout(function() {
					_this.countDown(btn)
				}, 1000)
			}
		}
		
	}
	login.init();
})