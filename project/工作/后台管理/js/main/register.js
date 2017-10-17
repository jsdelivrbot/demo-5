$(function() {
	var register = {
		init: function() {
			var _this = this;
			_this.step();
			_this.toRegister();
			_this.changeImgCode();
			$('.changeCode').click(function() {
				_this.changeImgCode();
			});
		},
		changeImgCode: function() {
			var _this = this;
			$('.code').attr('src', '/public_platform/getImgCode?tm=' + Math.random());
		},
		step: function() { //下一步
			var _this = this;
			
			$(".agreement label").click(function() {
				$(this).find(".Ischecked").toggleClass("selected");
			});
			$("#returnStep1").click(function() {
				$(".step2").hide().prev().show();
			});
			//登录邮箱
			$("#loginEmail").click(function() {
				_this.gotoEmail($('#email').val());
			})
			
			//密码是否可见
			$('.icon-password').on('click',function(){
				if($(this).hasClass('password-default')){
					$(this).removeClass('password-default').addClass('password-pressed');
					$(this).prev("input[type='password']").attr('type','text');
				}else{
					$(this).removeClass('password-pressed').addClass('password-default');
					$("input[type='text']").attr('type','password');
				}
			});
		},
		checkrule: function() {
			var _this = this;
			if($('#email').val() == '') {
				modalDialog("邮箱不能为空");
				return false;
			} else if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($('#email').val()) == false) {
				modalDialog("邮箱格式不正确，请重新输入");
				return false;
			}
			
			if($('#password').val() == '') {
				modalDialog("密码不能为空");
				return false;
			} else if(/^([a-zA-Z]|\d|[-,?:;'"!`\.\(\)\{\}\[\]]){8,}$/.test($('#password').val()) == false) {
				modalDialog("请根据要求输入密码，密码不匹配，请重新输入");
				return false;
			}
			
			if($('#password').val() !== $('#confirmpassword').val()) {
				modalDialog("两次密码不一致，请重新输入");
				return false;
			}
			
			if(	$('#verification').val() == '') {
				modalDialog("验证码不能为空");
				return false;
			}
			return true;
		},
		toRegister: function() {
			var _this = this;
			$("#registered").click(function() {
				console.log($("#email").val(),$("#password").val(),$('#verification').val());
				if(!register.checkrule()){
					return;
				}else if($("#agreementCheck").is(":checked") == false){
					modalDialog("请同意遵守《希望之星公众平台服务协议》");
				}else{
					_this.sendRegister();
				}
			})
		},
		sendRegister: function() {
			var _this = this;
			$.ajax({
				dataType: "json",
				type: "post",
				url: "/public_platform/businessUser/register",
				data: { "email": $("#email").val(),"password": $("#password").val(),"imgCode": $('#verification').val()},
				success: function(data) {
					console.log(data);
					if(data.result == 1) {
						//激活邮箱
						$(".step1").hide().next().show();
						$(".ui-active").next().addClass("ui-active");
						if($('.step2').show()) {
							$('.userEmail').html($("#email").val());
							$('#sendAgain').click(function() {
								_this.sendRegister();
							})
						}
					} else {
						//登陆失败提示信息
						if(data.msg == "验证码错误"){
							modalDialog(data.msg);
						}else{
							modalDialog("注册失败");
						}
						
						_this.changeImgCode(); //验证码错误自动更换验证码
					}
				}
			});
		},
		gotoEmail: function($mail) {
			$t = $mail.split('@')[1];
			$t = $t.toLowerCase();
			if($t == '163.com') {
				window.location.href = 'http://mail.163.com';
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

		},
	};
	register.init();
})