$(document).ready(function() {
	$('#userEmail').html(sessionStorage.getItem("userEmail"));
	var index = {
		init: function() {
			this.getAuthen();
			this.logOut(); //退出登录	
			this.settings(); //设置
			this.startAuthen();//获取机构认证状态
		},
		getAuthen:function(){
			var authStatus=localStorage.getItem('authStatus');
			if(authStatus!='2'){
				$('#organizationSetting,.channelSettings').css('display','none');
				$('.contentBox').css('display','block');
			}else{
				$('#organizationSetting,.channelSettings').css('display','block');
			}
			
		},
		startAuthen:function(){
			$('.startBtn').click(function(){
				$('.page').html('');
				$('.page').load('html/authenInformation.html');
			})
		},
		logOut: function() {
			//退出登录
			$('#outBtn').click(function() {
				$.ajax({
					dataType: "json",
					type: "post",
					url: "/public_platform/businessUser/logOut",

					success: function(data) {

						if(data.result == 1) {
							sessionStorage.removeItem('userEmail');
							document.location.href = 'html/login.html';
						} else {
							console.log(data.msg);
						}
					}
				});
			});
		},
		settings: function() {
			//认证设置
			$('#AuthenticationSettings').click(function() {
				$(this).find('.authenticationSettings').removeClass('authenticationSettings').addClass('authenticationSettings_selected');

				$('.page').html('');
				$('.page').load('html/authenInformation.html');
			});
			//机构设置
			$('#organizationSetting').click(function() {
				$(this).find('.organizationSetting').removeClass('organizationSetting').addClass('organizationSetting_selected');
				$('.page').html('');
				$('.page').load('html/institute.html');
			});
			//频道设置
			$('.channelSettings').click(function() {
				$(this).find('.channelSetting').removeClass('channelSetting').addClass('channelSetting_selected');
				if($('#channelSetting').css('display')=='none'){
					$('#channelSetting').css('display','block');
				}else{
					$('#channelSetting').css('display','none');
				}
				
			});
			//课程信息
			$('#curriculum').click(function() {
				$('#curriculum>a').addClass('on').parent().siblings().children('a').removeClass('on');
				$('.page').html('');
				$('.page').load('html/curriculum.html');
			});
			//讲师设置
			$('#starLecturer').click(function() {
				$('#starLecturer>a').addClass('on').parent().siblings().children('a').removeClass('on');
				$('.page').html('');
				$('.page').load('html/starLecturer.html');
			});
			//测试设置
			$('#testManagement').click(function() {
				$('#testManagement>a').addClass('on').parent().siblings().children('a').removeClass('on');
				$('.page').html('');
				$('.page').load('html/testManagement.html');
			});
		},

	}
	index.init();

});