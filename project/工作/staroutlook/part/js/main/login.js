$(function(){

	var wait = 60;
	var enroll = {
		init: function(){
			var _this = this;
			_this.other();
			_this.getcode();
			_this.login();
		},
		// 登录
		login:function(){
			var _this = this;
			$('.btn-login').on('click',function(){
				var phone = $('.login-phone'),
					code = $('.login-code');

				if(_this.phone(phone)&&_this.code(code)){
					$.ajax({
						url:'/star/user/loginWithVcode',
						type:'post',
						dataType:'json',
						data:{phone:phone.val(),code:code.val(),currentVersion:current},
						success:function(data){
							console.log(data);
							switch(data.result){
					 			case "1":
					 				mask.Alert("登录成功",2);
					 				var token = data.data.token,
					 					userId = data.data.user.id;
									localStorage.setItem('token', token);
									localStorage.setItem('userId', userId);
									localStorage.setItem('totalHeight', document.documentElement.clientHeight);
									localStorage.setItem('phone', phone.val());
									_this.matchStatus();
					 				break;
					 			case "202": mask.Alert("验证码错误",2); break;
					 			case "205": mask.Alert("手机号已经报名",2); break;
								default: mask.Alert("网络出错",2); break;
							}
						},
						error:function(){
							mask.Alert("网络出错！",2)
						}
					})
				}
			})
		},
		//校验手机
		phone:function(val){
			var _this = this;
			var phoneVal = val.val();
			if(phoneVal == "" || phoneVal == val.attr('placeholder')){
				mask.Alert("请填写手机号",2);
				return false;
			}else if(phoneVal !== "" && !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phoneVal.trim())){
				mask.Alert("请输入正确手机号",2)
				return false;
			}else{
				return true;
			}
		},
		//校验验证码
		code:function(val){
			var _this = this;
			var codeVal = val.val();
			if(codeVal == "" || codeVal == val.attr('placeholder')){
				mask.Alert("请填写验证码",2)
				return false;
			}else if(codeVal !=="" && !/^\d{6}$/.test(codeVal.trim())){
				mask.Alert("请输入正确的验证码",2)
				return false;
			}else{
				return true;
			}
		},
		// 发送验证码
		getcode: function(){
			var _this = this;
			$('.btn-code').on('click',function(){
				var phone = $('.login-phone');
				var btn = $(this);
				if(_this.phone(phone)){
					btn.attr("disabled",true);
					$.ajax({
						url:'/star/user/getVerifyCode?operation=4&phone=' + $(".login-phone").val(),
						type:'get',
						dataType:'json',
						success:function(data){
							console.log(data.data.code);
							switch(data.result){
					 			case "1":
		 							_this.time(btn);
					 				$('#codetype').val(0);
					 				mask.Alert("短信发送成功",2);
					 				break;
					 			case "200": mask.Alert("用户不存在",2);btn.removeAttr("disabled"); break;
					 			case "205": mask.Alert("手机号已注册",2);btn.removeAttr("disabled"); break;
					 			case "206": mask.Alert("手机验证码操作类型错误",2);btn.removeAttr("disabled"); break;
								default: mask.Alert("网络出错",2);btn.removeAttr("disabled"); break;
							}
						},
						error:function(){
							mask.Alert("请求失败",2);
						}
					})
				}
			})
		},
		//验证码倒计时
		time:function(t){
			var _this = this;
			if(wait == 1){
				t.removeAttr("disabled").css("background","#ff296a").val("发送验证码");
				wait = 60;
			}else{
				t.attr("disabled",true).css({"background":"rgba(255,255,255,0.25)","font-size":".24rem"});
				wait --;
				t.val( "重新发送" + wait + "秒");
				setTimeout(function(){
					_this.time(t)
				},1000)
			}
		},
		matchStatus: function(){
			var _this = this;
			var userId = localStorage.getItem("userId"),
				token = localStorage.getItem("token");
			$.ajax({
				url: '/star/match/matchStatus',
				type: 'post',
				dataType: 'json',
				data: {userId:userId,token:token,currentVersion:current},
				success: function(data){
					console.log(data);
					if(data.data.authStatus == 1){
						setTimeout(function(){window.location.href = "matchinfo.html"},1000);
					}else{
						setTimeout(function(){window.location.href = "prove.html"},1000);
					}
				},
				error:function(){
					mask.Alert("请求失败",2);
				}
			})
			
		},
		other: function(){
			var _this = this;
			$('.login-content input').on("input propertychange",function(){
				if($(this).val() !== ""&& $(this).val() !== $(this).attr('placeholder')){
					$(this).next().show();
				}else{
					$(this).next().hide();
				}
			})
			//快速清空input
			$('.icon-shanchu').click(function(){
				$(this).hide().prev().val("");
				$('.btn-login').css("background-color", "rgba(255,255,255,.25)");
			})
			//登录按钮变色
			$('.login-content input').on('input propertychange', function() {
				if($('.login-phone').val() != "" && $('.login-phone').val() != $('.login-phone').attr('placeholder') && $('.login-code').val() != "" && $('.login-code').val() != $('.login-code').attr('placeholder')) {
					$('.btn-login').css("background-color", "#ff296a");
				} else {
					$('.btn-login').css("background-color", "rgba(255,255,255,.25)");
				}
			})

			var system ={};
		    var p = navigator.platform;
		    system.win = p.indexOf("Win") == 0;
		    system.mac = p.indexOf("Mac") == 0;
		    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
		    if(system.win||system.mac||system.xll){//电脑
		    	$('.clause-state').css({'position':'fixed','bottom':'0.5rem'});
		    }else{  //手机
		       $('.login-phone,.login-code').bind('focus',function(){
		            $('.clause-state').css('position','static');
		        }).bind('blur',function(){
		            $('.clause-state').css({'position':'fixed','bottom':'0.5rem'});
		        });
		    }
		}
	}
	enroll.init();
})