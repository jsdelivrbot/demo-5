$(function() {
	var complteRegister = {
		init: function() {
			this.initTime();
			this.verifyEmail(); //发送验证码激活邮箱并完成注册
		},
		initTime: function() {

			var second = 5;
			var time = setInterval(function() {
				if(second == 0) {
					window.location = "login.html";
					clearInterval(time);
				}
				$(".countTime").html(second);
				second--;
			}, 1000);
		},
		verifyEmail: function() {

			var verifyCode = window.location.search;
			if(verifyCode.indexOf("?") != -1) { //判断是否有参数
				var str = verifyCode.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
				strs = str.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
				verifyCode = strs[1] //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
			}
			$.ajax({
				dataType: "json",
				type: "post",
				url: "/public_platform/businessUser/verifyEmail",
				data: {
					verifyCode: verifyCode
				},
				success: function(data) {
					console.log(data);
					overTime(data);
					if(data.result == 1) {
						console.log(data.msg);
					} else {
						console.log(data.msg);
					}
				}
			});
		}
	};
	complteRegister.init();
})