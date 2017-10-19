$(function() {
	var userEmail = localStorage.getItem("userEmail");
	var password = localStorage.getItem("password");
	var email;
	if(userEmail) {
		$("#email").val(userEmail);
	}
	if(password) {
		$("#password").val(password);
	}
	

	var login = {
		init: function() {
			var _this = this;
			_this.remeberPass();
			
			document.onkeydown = function keyListener(e) {
				e = e ? e : event;
				if(e.keyCode == 13) {
					_this.validate();
				}
			};
			$("#login").click(function() {
				_this.validate();
			});
		},
		validate: function() {
			var _this = this;
			//邮箱验证
			if($('#email').val() == '') {
				$("#tinfo").css("visibility","visible").html("请输入邮箱名!");
				return;
			} else if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($('#email').val()))) {
				$('#tinfo').css("visibility","visible").text('邮箱格式不正确，请重新输入');
				$('#email').val('').focus();
				return;
			} else {
				$('#tinfo').css("visibility","hidden");
				email = $('#email').val();
			}
			// 密码验证
			if($('#password').val() == '') {
				$("#tinfo").css("visibility","visible").html("请输入密码!");
				return;
			}else{
				password = $('#password').val();
			}

			_this.toLogin();
		},
		remeberPass: function() {
			$("#remeberPass").next().click(function() {
				$(this).find(".Ischecked").toggleClass("selected");
			});
		},
		toLogin: function() {
			var that=this;
			$.ajax({
				dataType: "json",
				type: "post",
				url: "/public_platform/businessUser/login",
				data: {
					email: email,
					password: password
				},
				success: function(data) {
					console.log(data);
					if(data.result == 1) {
						if($("#remeberPass").is(":checked")) {
							localStorage.setItem("userEmail", $("#email").val());
							localStorage.setItem("password", $("#password").val());
						}
						sessionStorage.setItem("userEmail", $("#email").val());
						that.getAuthStatus();
						
					} else {
						$("#tinfo").css("visibility","visible").html(data.msg);
					}
				}
			});
		},
		getAuthStatus:function(){
			$.ajax({
				dataType: "json",
				type: "post",
				url: "/public_platform/mechanism/authStatus",

				success: function(data) {

					if(data.result == 1) {
						localStorage.setItem('authStatus',data.data.status);
						document.location.href = '../index.html';
					} else {
						console.log(data.msg);
					}
				}
			});		
		}
	}
	login.init();
});