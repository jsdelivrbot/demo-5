$(function() {
	var $newPassword = $("#newPassword");
	var $confirmpassword = $("#confirmpassword");
	var reSet = {
		init: function() {
			var _this = this;
			_this.next();
			_this.monitor();
		},
		initTime:function(){
			var second = 5;
			var time = setInterval(function(){
				if(second == 0) {
					window.location = "login.html";
					clearInterval(time);
				}
				$(".countTime").html(second);
				second--;
			}, 1000);	
		},
		next: function() {
			var _this = this;
			//页面跳转下一步
			$('#btn-next').click(function() {
				_this.resetPassword();
			});
		},
		resetPassword: function() {
			var _this = this;
			var passwordReg1 = /^(.){8,}$/;
			var passwordReg2 = /^([a-zA-Z]|\d|[-,?:;'"!`\.\(\)\{\}\[\]]){8,}$/;
			
			if($newPassword.val() == "" || $confirmpassword.val() == "") {
				modalDialog("所填信息不得为空");
			}else if(!passwordReg1.test($newPassword.val())){
				modalDialog("密码最少8位");
			}else if(!passwordReg2.test($newPassword.val())){
				modalDialog("密码只能为字母、数字或者英文符号");
			}else if($newPassword.val() != $confirmpassword.val()){
				modalDialog("两次新密码输入不一致");
			}else{
				$.ajax({
					dataType: "json",
					type: "post", //请求方式
					url: "/public_platform/businessUser/resetPassword", //发送请求地址
					data: {"newPassword":$newPassword.val(),"verifyCode": verifyCode},
					//请求成功后的回调函数有两个参数
					success: function(data) {
						overTime(data);
						if(data.result == 1) {
							$(".active").removeClass('active').next().addClass('active');
							_this.initTime();
						} else {
							modalDialog("请求失败，稍后重试");
						}
					}
				});
			}
		},
		monitor: function(){
			var _this = this;
			//修改密码提交按钮变色
			$('.form-horizontal input').on('input  propertychange', function() {
				if($newPassword.val() != "" && $newPassword.val() != $newPassword.attr('placeholder') && $confirmpassword.val() != "" && $confirmpassword.val() != $confirmpassword.attr('placeholder')) {
					$('#btn-next').css("background-color", "#2a66bd");
				} else {
					$('#btn-next').css("background-color", "#3879d9");
				}
			});
			//密码是否可见
			$('.icon-password').on('click',function(){
				if($(this).hasClass('password-default')){
					$(this).removeClass('password-default').addClass('password-pressed');
					$(this).prev("input[type='password']").attr('type','text');
				}else{
					$(this).removeClass('password-pressed').addClass('password-default');
					$(this).prev("input[type='text']").attr('type','password');
				}
			})
		}
	};
	reSet.init();
	//取url参数
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	verifyCode = GetQueryString("verifyCode");
})