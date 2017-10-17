$(function(){
	var id,name,logo,weight,details;
	$.get("../course/view",{"id" : $("#courseId").val()},function(result){
		if(result.result == 1){
			var data = result.data;
			$("#courseName").val(data.name);
			$("#courseImage").fileinput({
				language: "zh",
				browseLabel: '选取文件',
				allowedFileExtensions: ['jpg', 'png'],
				uploadUrl: '/public_platform/file/upload',
				uploadAsync: 　false,
				showUpload: false,
				showRemove: false,
				maxFileSize: 1024,
				fileActionSettings: {
					showUpload: false,
				},
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
		        initialPreview:'<img src="' + data.logo + '" class="file-preview-image ">',	//			
			});
			$("#courseWeight").val(data.weight);
			// editor = CKEDITOR.replace("financial.bz");
			console.log(data.content);
			// editor.data = data.content;
			editor.setData(data.content);
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
				id = $("#courseId").val();
				name = $("#courseName").val();
				weight = $("#courseWeight").val();
				details = editor.getData();
				
				if(!_this.checkValue()){
					return;
				}else{

					if ($("#courseImage").val() != "") {
						$("#courseImage").fileinput("upload");
						$("#courseImage").on("filebatchuploadsuccess", function(event, data) {
							console.log(data.response);
							if(data.response.result == 1) {
								logo = data.response.data.url;//课程照片
							} else {
								modalDialog("图片上传失败");
							}
						});
		
						$("#courseImage").on("filebatchuploadcomplete", function(event, files, extra) {
							_this.sendAddLecturer();
						});
					}else{
						_this.sendAddLecturer();
					}
				}
			});

		},
		sendAddLecturer: function() {
			var _this=this;	
			$.ajax({
				url: "../course/update",
				type: "post",
				dataType: "json",
				data: {
					"id": id,
					"name": name,
					"logo": logo,
					"content": details,
					"weight": weight
					
				},
				success: function(data) {
					overTime(data);
					if(data.result == "1") {
						modalDialog(data.msg);
						setTimeout(function() {
							$('#returnMsg').modal("hide");
							$('.page').html('');
							$('.page').load('html/curriculum.html');
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
				modalDialog("课程名称不能为空");
				return false;
			}
			
			// var courseImage = $('.courseImage .file-preview-frame').length;
			var courseImage = $('.file-preview-frame').length;
			if(courseImage == 0){
				modalDialog("课程图片不能为空");
				return false;
			}
			if(weight == ""){
				modalDialog("权重值不能为空");
				return false;
			}
			if(details == ""){
				modalDialog("课程内容不能为空");
				return false;
			}
			return true;
		}

	}
	if($("#courseId").val() != "" && typeof($("#courseId").val()) != "undefined"){
		updateCourse.init();
	}
	
	$('#goCurriculum,#returnBtn').on('click',function(){
		$('.page').html('');
		$('.page').load('html/curriculum.html');
  	});
})