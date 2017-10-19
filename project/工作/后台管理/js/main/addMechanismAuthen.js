$(function() {
	var id, name, businessLicense, idCardUrl, telephone, address, provinceCode, cityCode, countyCode, businessLicenseNumber;
	$("#idcardimg,#certificateimg").fileinput({
		language: "zh",
		browseLabel: '选取文件',
		uploadUrl: '/public_platform/file/upload',
		allowedFileExtensions: ['jpg', 'png'],
		uploadAsync: 　false,
		showUpload: false,
		showRemove: false,
		maxFileSize: 1024,
		fileActionSettings: {
			showUpload: false,
		},
		initialPreviewFileType: "file",
		initialCaption: '未选择文件'
	});
	
	var addMechanismAuthen = {
		init: function() {
			var _this = this;

			$("input").on("input propertychange", function() {
				_this.checkValue();
			});
			$("#province").change(function() {
				_this.checkValue();
			});
			$("#idcardimg,#certificateimg").on("filebatchselected", function(event, data) {
				_this.checkValue();
			});
			$("#idcardimg,#certificateimg").on("filecleared", function(event, key) {
				_this.checkValue();
			});
			_this.clickSubmit();
		},
		clickSubmit: function() {
			var _this = this;
			$("#saveBtn").click(function() {
//				if(!/^\d{6}[123]\d{7}[1-9]$/.test($("#agencyBusinessLicenseNo").val())){
//					modalDialog("请输入正确格式的机构营业执照号");
//					return;
//				}
				if(!/^(-|\d)+$|^1[34578]\d{9}$/.test($("#mechanismAuthenticationPhone").val())){
					modalDialog("请输入正确格式的联系电话");
					return;
				}
				
				name = $("#agencyFullName").val();
				telephone = $("#mechanismAuthenticationPhone").val();
				address = $("#detailAdress").val();
				provinceCode = $("#province").val();
				cityCode = $("#city").val();
				countyCode = $("#county").val();
				businessLicenseNumber = $("#agencyBusinessLicenseNo").val();

				$("#certificateimg").fileinput("upload");
				
				$("#certificateimg").on("filebatchuploadsuccess", function(event, data) {
					console.log(data.response);
					if(data.response.result == 1) {
						businessLicense = data.response.data.url;
					} else {
						modalDialog("图片上传失败");
					}
				});
				
				$("#certificateimg").on("filebatchuploadcomplete", function(event, files, extra) {
					$("#idcardimg").fileinput("upload");
				});

				$("#idcardimg").on("filebatchuploadsuccess", function(event, data) {
					console.log(data.response);
					if(data.response.result == 1) {
						idCardUrl = data.response.data.url;
					} else {
						modalDialog("图片上传失败");
					}
				});

				$("#idcardimg").on("filebatchuploadcomplete", function(event, files, extra) {
					_this.addMechanismAuth();
				});
			});

		},
		addMechanismAuth: function() {
			$.ajax({
				url: "/public_platform/mechanism/addMechanismAuth",
				type: "post",
				dataType: "json",
				data: {
					"name": name,
					"businessLicense": businessLicense,
					"idCardUrl": idCardUrl,
					"telephone": telephone,
					"address": address,
					"provinceCode": provinceCode,
					"cityCode": cityCode,
					"countyCode": countyCode,
					"businessLicenseNumber": businessLicenseNumber
				},
				success: function(data) {
					overTime(data);
					console.log(data);
					if(data.result == "1") {
						$('#myModal').modal("show");
						setTimeout(function(){
							$('#myModal').modal("hide");
							$('.page').html('');
							$('.page').load('html/authenInformation.html');
						},5000);
					}else if(data.result == "0"){
						modalDialog(data.msg);
						setTimeout(function(){
							$('#returnMsg').modal("hide");
							$('.page').html('');
							$('.page').load('html/authenInformation.html');
						},5000);
					}else{
						modalDialog(data.msg);
					}
				},
				error: function() {
					modalDialog("网络请求错误!");
				}
			});
		},
		checkValue: function() {
			
			if($("#agencyFullName").val() != "" && $("#agencyBusinessLicenseNo").val() != "" &&
				$("#mechanismAuthenticationPhone").val() != "" && $("#detailAdress").val() != "") {
				$("#saveBtn").removeAttr("disabled").css("background", "#4790fb");
			} else {
				$("#saveBtn").attr("disabled", "disabled").css("background", "#cbced2");
				return;
			}
			if($("#province").val() != "") {
				$("#saveBtn").removeAttr("disabled").css("background", "#4790fb");
			} else {
				$("#saveBtn").attr("disabled", "disabled").css("background", "#cbced2");
				return;
			}
			$.each($(".file-preview-thumbnails"), function(index, obj) {
				if($(obj).html().trim() == "") {
					$("#saveBtn").attr("disabled", "disabled").css("background", "#cbced2");
					return false;
				} else {
					$("#saveBtn").removeAttr("disabled").css("background", "#4790fb");
				}
			});

		}

	};
	addMechanismAuthen.init();
	$('#goAuthenInformation').on('click',function(){
		$('.page').html('');
		$('.page').load('html/authenInformation.html');
  	})
})