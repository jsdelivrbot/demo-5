$(function(){
	var id,name,sourceMaterialUrl,logo,weight,details;
	$.get("../template/view",{"id" : $("#templateId").val()},function(result){
		if(result.result == 1){

			var data = result.data;
			$("#templateName").val(data.name);
			$("#templateMaterial").fileinput({
				language: "zh",
				browseLabel: '选取文件',
				allowedFileExtensions: ['MP4'],
				uploadUrl: '/public_platform/file/upload',
				uploadAsync: 　false,
				showUpload: false,
				showRemove: false,
				maxFileSize: 51200,
				layoutTemplates: {
				    main1: "{preview}\n" +
				    "<div class=\'input-group {class} \'>\n" +
				    "   <div class=\'input-group-btn\'>\n" +
				    "       {browse}\n" +
				    "       {upload}\n" +
				    "       {remove}\n" +
				    "   </div>\n" +
				    "   {caption}\n" +
				    "</div>"
				},
				initialPreviewFileType: "file",
				fileActionSettings: {
					showUpload: false,
				},
				initialPreview:'<video class="file-preview-image" controls autoplay><source src="' + data.sourceMaterialUrl + '" type="video/mp4"></source></video>',
		        // initialPreview:'<video src="' + data.sourceMaterialUrl + '" class="file-preview-image ">',			
				initialCaption: '未选择文件'
			});

			$("#templateImage").fileinput({
				language: "zh",
				browseLabel: '选取文件',
				allowedFileExtensions: ['jpg', 'png'],
				uploadUrl: '/public_platform/file/upload',
				uploadAsync: 　false,
				showUpload: false,
				showRemove: false,
				maxFileSize: 1024,
				layoutTemplates: {
				    main1: "{preview}\n" +
				    "<div class=\'input-group {class} \'>\n" +
				    "   <div class=\'input-group-btn\'>\n" +
				    "       {browse}\n" +
				    "       {upload}\n" +
				    "       {remove}\n" +
				    "   </div>\n" +
				    "   {caption}\n" +
				    "</div>"
				},
				initialPreviewFileType: "file",
				fileActionSettings: {
					showUpload: false,
				},
		        initialPreview:'<img src="' + data.logo + '" class="file-preview-image ">',	//			
				initialCaption: '未选择文件'
			});
			// editor = CKEDITOR.replace('financial.bz');
			$("#weights").val(data.weight);
			editor.setData(data.details);
		}
	});


	var updateCourse = {
		init: function() {
			var _this=this;	
			_this.clickSubmit(); //添加课程信息
		},

		clickSubmit: function() {
			var _this = this;
			$("#saveBtn").click(function() {
				id = $("#templateId").val();
				name = $("#templateName").val(),
//				sourceMaterialUrl = $("#templateMaterial").val(),
				weight = $("#weights").val(),
				details = editor.getData();//富文本编辑器内容
				
				if(!_this.checkValue()){
					return;
				}else {
					if ($("#templateMaterial").val() != "") {
						$("#templateMaterial").fileinput("upload");
						$("#templateMaterial").on("filebatchuploadsuccess", function(event, data) {
							console.log(data.response);
							console.log(data.response.result);
							if(data.response.result == 1) {
								sourceMaterialUrl = data.response.data.url;//模板素材
							} else {
								modalDialog("模板素材上传失败");
							}
						});
					}
					if ($("#templateImage").val() != "") {
						$("#templateImage").fileinput("upload");
						$("#templateImage").on("filebatchuploadsuccess", function(event, data) {
							console.log(data.response);
							if(data.response.result == 1) {
								logo = data.response.data.url;//模板图片
							} else {
								modalDialog("模板图片上传失败");
							}
						});
						
						$("#templateImage").on("filebatchuploadcomplete", function(event, files, extra) {
							_this.AddTemplate();
						});
					}else{
						if ($("#templateMaterial").val() != "") {
							$("#templateMaterial").on("filebatchuploadcomplete", function(event, files, extra) {
								_this.AddTemplate();
							});
						}else{
							_this.AddTemplate();
						}
					}
				}
			});

		},
		AddTemplate: function() {
			var _this=this;	
			$.ajax({
				url: "../template/update",
				type: "post",
				dataType: "json",
				data: {
					"id": id,
					"name": name,
					"sourceMaterialUrl":sourceMaterialUrl,
					"logo": logo,
					"details": details,
					"weight": weight
					
				},
				success: function(data) {
					overTime(data);
					if(data.result == "1") {
						modalDialog(data.msg);
						setTimeout(function() {
							$('#returnMsg').modal("hide");
							$('.page').html('');
							$('.page').load('html/testManagement.html');
						}, 3000);
					} else {
						modalDialog(data.msg);
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
			
			var templateMaterial = $('.file-preview-frame').length;
			if(templateMaterial == 0){
				modalDialog("模板素材不能为空");
				return false;
			}
			
			var templateImage = $('.file-preview-frame').length;
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
	if($("#templateId").val() != "" && typeof($("#templateId").val()) != "undefined"){
		updateCourse.init();
	}
	
	$('#goStartemplate,#returnBtn').on('click',function(){
		$('.page').html('');
       	$('.page').load('html/testManagement.html');
	})
})