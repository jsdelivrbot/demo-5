$(document).ready(function() {
	var name, sourceMaterialUrl, logo, weight, details;
	
	$("#templateImage").fileinput({
		language: "zh",
		browseLabel: '选取文件',
		uploadUrl: '/public_platform/file/upload',
		allowedFileExtensions: ['jpg', 'png'],
		uploadAsync: 　false,
		showUpload: false,
		showRemove: false,
		maxFileSize: 1024,
		initialPreviewFileType: "file",
		fileActionSettings: {
			showUpload: false,
		},
		initialCaption: '未选择文件'
	});
	$("#templateMaterial").fileinput({
		language: "zh",
		browseLabel: '选取文件',
		uploadUrl: '/public_platform/file/upload',
		allowedFileExtensions: ['MP4'],
		uploadAsync: 　false,
		showUpload: false,
		showRemove: false,
		maxFileSize: 51200,
		initialPreviewFileType: "file",
		fileActionSettings: {
			showUpload: false,
		},
		initialCaption: '未选择文件'
	});
	var addTemplate = {
		init: function() {
			var _this=this;	
			
			_this.clickSubmit();
		},

		clickSubmit: function() {
			var _this = this;
			$("#saveBtn").click(function() {
				name = $("#templateName").val(),
				weight = $("#weights").val(),
				details = editor.getData();//富文本编辑器内容
				
				
				if(!_this.checkValue()){
					return;
				}else{
					$("#templateMaterial").fileinput("upload");
					$("#templateImage").fileinput("upload");
					
					$("#templateImage").on("filebatchuploadsuccess", function(event, data) {
						console.log(data.response);
						if(data.response.result == 1) {
							logo = data.response.data.url;//模板图片
						} else {
							modalDialog("模板图片上传失败");
						}
					});
					
					$("#templateMaterial").on("filebatchuploadsuccess", function(event, data) {
						console.log(data.response);
						if(data.response.result == 1) {
							sourceMaterialUrl = data.response.data.url;//模板素材
						} else {
							modalDialog("模板素材上传失败");
						}
					});
					
					$("#templateMaterial").on("filebatchuploadcomplete", function(event, files, extra) {
						_this.AddTemplate();
					});
				}
				
			});
		},
		AddTemplate: function() {
			var _this=this;	
			$.ajax({
				url: "/public_platform/template/add",
				type: "post",
				dataType: "json",
				data: {
					"name": name,
					"sourceMaterialUrl":sourceMaterialUrl,
					"logo": logo,
					"weight": weight,
					"details": details
				},
				success: function(data) {
					console.log(data);
					overTime(data);
					if(data.result == "1") {
						modalDialog(data.msg);
						setTimeout(function() {
							$('#returnMsg').modal('hide');
							$('.page').html('');
							$('.page').load('html/testManagement.html');
						}, 3000);
					} else {
						modalDialog("操作失败!");
					}
				},
				error: function() {
					modalDialog("网络请求错误!");
				}
			});
		},
		checkValue: function() {
			var _this=this;	
			if(name == ""){
				modalDialog("模板名称不能为空");
				return false;
			}
			
			var templateMaterial = $('.templateMaterial .file-preview-frame').length;
			if(templateMaterial == 0){
				modalDialog("模板素材不能为空");
				return false;
			}
			
			var templateImage = $('.templateImage .file-preview-frame').length;
			if(templateImage == 0){
				modalDialog("模板图片不能为空");
				return false;
			}
			if(weight == ""){
				modalDialog("权重值不能为空");
				return false;
			}
			if(details == ""){
				modalDialog("模板介绍不能为空");
				return false;
			}
			return true;
		}
	}
	addTemplate.init();
	$('#goTestManagement,#returnBtn').on('click',function(){
		$('.page').html('');
       	$('.page').load('html/testManagement.html');
	})
});