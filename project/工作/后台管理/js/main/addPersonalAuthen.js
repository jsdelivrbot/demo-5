$(function() {
	var realName, idCard, idCardJustUrl, idCardBackUrl, phone, inputCode, countdown,lecturerId;
	var reallyName = $("#reallyName");
	var idCardNo = $("#idCardNo");
	var personalAuthenticationPhone = $("#personalAuthenticationPhone");
	var validateCode = $("#validateCode");
	var saveBtn = $("#saveBtn");
	var codeBtn = $("#codeBtn");
	
	function errorTip(target,msg){
		var checkError = target.find(".check-error");
		if(checkError){
			checkError.remove();
		}
		var html = '<span class="check-error">'+ msg +'</span>';
		target.append(html);
	}
	
	/*$("#idcardimg,#certificateimg").fileinput({
		language: "zh",
		browseLabel: '选取文件',
		uploadUrl: '/public_platform/file/upload',
		allowedFileExtensions: ['jpg', 'png'],
		uploadAsync: 　false,
		showUpload: false,
		showRemove: false,
		validateInitialCount: true,
		maxFileSize: 1024,
		initialPreviewFileType: "file",
		fileActionSettings: {
			showUpload: false,
		},
		initialCaption: '未选择文件'
	});*/

	var addPersonalAuthen = {
		init: function() {
			var _this = this;
			$('#gotoPersonalAuthList').click(function(){
				$('.page').html('');
				$('.page').load('html/personalAuthenticationList.html')
			});

			$("input").on("input propertychange", function() {
				_this.checkValue();
			});
			$("#idcardimg,#certificateimg").on("filebatchselected", function(event, data) {
				_this.checkValue();
			});
			$("#idcardimg,#certificateimg").on("filecleared", function(event, key) {
				_this.checkValue();
			});
			codeBtn.click(function() {
				if(_this.checkPhone()){
					_this.sendPhoneCode();
				}
			});
			_this.clickSubmit();
		},
		checkPhone: function(){
			var _this = this;
			phone = personalAuthenticationPhone.val();
			if(/^1[34578]\d{9}$/.test(phone)) {
				return true;
			} else if(!phone){
				modalDialog("请输入手机号");
				return false;
			}else{
				modalDialog("请输入有效手机号");
				return false;
				
			}
		},
		sendPhoneCode: function() {
			var _this = this;
			$.ajax({
				url: "/public_platform/businessUser/sendPhoneCode",
				type: "post",
				dataType: "json",
				data: {
					"phone": phone
				},
				success: function(data) {
					console.log(data);
					overTime(data);
					if(data.result == "1") {
						_this.setCountdown(60);
						modalDialog("验证码已发送成功,请注意查收");
					} else {
						modalDialog(data.msg);
					}
				},
				error: function() {
					modalDialog("网络请求错误!");
				}
			});
		},
		setCountdown: function(time) {
			countdown = window.setInterval(function() {
				if(time > 0) {
					time--;
					codeBtn.html('重新发送' + time + '秒');
					codeBtn.attr('disabled', 'disabled');
					codeBtn.css("background-color", "#7e7e7e");
				}
				if(time <= 0) {
					codeBtn.html('发送验证码');
					codeBtn.removeAttr('disabled');
					codeBtn.css("background-color", "#3879d9");
					clearInterval(countdown);
				}
			}, 1000);
		},
		clickSubmit: function() {
			var _this = this;
			saveBtn.click(function() {
				if(!_this.checkReg()||!_this.checkPhone()) {
					return;
				}else{
					$(".check-error").remove();
				}
				realName = reallyName.val();
				idCard = idCardNo.val();
				phone = personalAuthenticationPhone.val();
				inputCode = validateCode.val();
				idCardJustUrl = $("#idCardJustUrl").val();
				idCardBackUrl = $("#idCardBackUrl").val();
				lecturerId = $("#lecturerId").val();
				
				$("#idcardimg").fileinput("upload");
				$("#idcardimg").on("filebatchuploadsuccess", function(event, data) {
					console.log(data.response);
					if(data.response.result == 1) {
						idCardJustUrl = data.response.data.url;
					} else {
						modalDialog("图片上传失败");
					}
				});
				
				$("#idcardimg").on("filebatchuploadcomplete", function(event, files, extra) {
					$("#certificateimg").fileinput("upload");
				});
				
				$("#certificateimg").on("filebatchuploadsuccess", function(event, data) {
					console.log(data.response);
					if(data.response.result == 1) {
						var idCardJustUrlArray = data.response.data.url.split(",");
						idCardBackUrl = "";
						for(var i=0,l=idCardJustUrlArray.length;i<l;i++){
							if(i!=l-1){
								idCardBackUrl += idCardJustUrlArray[i] + ",";
							}else{
								idCardBackUrl += idCardJustUrlArray[i];
							}
						}
						console.log(idCardJustUrl);
					} else {
						modalDialog("图片上传失败");
					}
				});
				$("#certificateimg").on("filebatchuploadcomplete", function(event, files, extra) {
					_this.config();
				});
				// $("#idcardimg").fileinput("upload");
				// $("#certificateimg").fileinput("upload");
				// $("#idcardimg").on("filebatchuploadsuccess", function(event, data) {
				// 	console.log(data.response);
				// 	if(data.response.result == 1) {
				// 		idCardJustUrl = data.response.data.url;
				// 	} else {
				// 		modalDialog("图片上传失败");
				// 	}
				// });
				// $("#certificateimg").on("filebatchuploadsuccess", function(event, data) {
				// 	console.log(data.response);
				// 	if(data.response.result == 1) {
				// 		var idCardJustUrlArray = data.response.data.url.split(",");
				// 		idCardBackUrl = "";
				// 		for(var i=0,l=idCardJustUrlArray.length;i<l;i++){
				// 			if(i!=l-1){
				// 				idCardBackUrl += idCardJustUrlArray[i] + ",";
				// 			}else{
				// 				idCardBackUrl += idCardJustUrlArray[i];
				// 			}
				// 		}
				// 		console.log(idCardJustUrl);
				// 	} else {
				// 		modalDialog("图片上传失败");
				// 	}
				// });
			});

		},
		config: function() {
			console.log(idCardJustUrl,idCardBackUrl);
			$.ajax({
				url: "/public_platform/businessUser/addIndividualAuth",
				type: "post",
				dataType: "json",
				data: {
					"realName": realName,
					"idCard": idCard,
					"idCardJustUrl": idCardJustUrl,
					"idCardBackUrl": idCardBackUrl,
					"phone": phone,
					"inputCode": inputCode,
					"lecturerId": $("#lecturerId").val()
				},
				success: function(data) {
					console.log(data);
					overTime(data);
					if(data.result == "1") {
						$('#myModal').modal("show");
						setTimeout(function() {
							$('#myModal').modal("hide");
							$('.page').html('');
							$('.page').load('html/authenInformation.html');
						}, 5000);
					} else {
						modalDialog(data.msg,2);
					}
				},
				error: function() {
					modalDialog("网络请求错误!");
				}
			});
		},
		checkReg: function() {
			if(!(/^(\d{15}$|^\d{17}(\d|X|x))$/.test(idCardNo.val()))){
				modalDialog("请输入正确的身份证号码");
				return false;
			}else{
				return true;
			}
		},
		checkValue: function() {
			if(reallyName.val() != "" && idCardNo.val() != "" &&
				personalAuthenticationPhone.val() != "" && validateCode.val() != "") {
				saveBtn.removeAttr("disabled").css("background", "#4790fb");
			} else {
				saveBtn.attr("disabled", "disabled").css("background", "#cbced2");
				return;
			}
			$.each($(".file-preview-thumbnails"), function(index, obj) {
				if($(obj).html().trim() == "") {
					saveBtn.attr("disabled", "disabled").css("background", "#cbced2");
					return false;
				} else {
					saveBtn.removeAttr("disabled").css("background", "#4790fb");
				}
			});

		}

	};
	addPersonalAuthen.init();
})