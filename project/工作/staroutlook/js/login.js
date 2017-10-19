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
					 				layer.open({content: '登录成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 1});
					 				var token = data.data.token,
					 					userId = data.data.user.id;
									localStorage.setItem('token', token);
									localStorage.setItem('userId', userId);
									localStorage.setItem('totalHeight', document.documentElement.clientHeight);
									localStorage.setItem('phone', phone.val());
									setTimeout(function(){window.location.href = "../index.html"},1000);
					 				break;
					 			case "202": layer.open({content: '验证码错误',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					 			case "205": layer.open({content: '手机号已经报名',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
								default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
							}
						},
						error:function(){
							layer.open({content: '网络出错！',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
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
				layer.open({content: '请填写手机号',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				return false;
			}else if(phoneVal !== "" && !/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phoneVal.trim())){
				layer.open({content: '请输入正确手机号',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
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
				layer.open({content: '请填写验证码',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				return false;
			}else if(codeVal !=="" && !/^\d{6}$/.test(codeVal.trim())){
				layer.open({content: '请输入正确的验证码',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
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
					 				layer.open({content: '短信发送成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					 				break;
				 				case "200": layer.open({content: '用户不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});btn.removeAttr("disabled"); break;
					 			case "205": layer.open({content: '手机号已注册',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});btn.removeAttr("disabled"); break;
					 			case "206": layer.open({content: '手机验证码操作类型错误',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});btn.removeAttr("disabled"); break;
								default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});btn.removeAttr("disabled"); break;
							}
						},
						error:function(){
							layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});btn.removeAttr("disabled");
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
		other: function(){
			var _this = this;
			$('.login-content input').on("input propertychange",function(){
				if($(this).val() !== ""&& $(this).val() !== $(this).attr('placeholder')){
					$(this).next().show();
				}else{
					$(this).next().hide();
				}
			});
			//快速清空input
			$('.icon-shanchu').click(function(){
				$(this).hide().prev().val("");
				$('.btn-login').css("background-color", "rgba(255,255,255,.25)");
			});
			//登录按钮变色
			$('.login-content input').on('input propertychange', function() {
				if($('.login-phone').val() != "" && $('.login-phone').val() != $('.login-phone').attr('placeholder') && $('.login-code').val() != "" && $('.login-code').val() != $('.login-code').attr('placeholder')) {
					$('.btn-login').css("background-color", "#ff296a");
				} else {
					$('.btn-login').css("background-color", "rgba(255,255,255,.25)");
				}
			});

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