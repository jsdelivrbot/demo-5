$(function(){
	var id,name,logo,weight,details;

	$.get("../lecturer/view",{"id" : $("#lecturerId").val()},function(result){
		if(result.result == 1){
			var data = result.data;
			$("#lecturerName").val(data.name);
			$("#lecturerPic").fileinput({
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
				initialCaption: '未选择文件'
			});
			$("#lecturerWeight").val(data.weight);
			// editor = CKEDITOR.replace("financial.bz");
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
				id = $("#lecturerId").val();
				name = $("#lecturerName").val();//讲师姓名		
				weight = $("#lecturerWeight").val();//权重值
				details = editor.getData();//讲师介绍 //富文本编辑器内容
				
				if(!_this.checkValue()){
					return;
				}else {

					if ($("#lecturerPic").val() != "") {
						$("#lecturerPic").fileinput("upload");
						$("#lecturerPic").on("filebatchuploadsuccess", function(event, data) {
							console.log(data.response);
							if(data.response.result == 1) {
								logo = data.response.data.url;//课程照片
							} else {
								modalDialog("图片上传失败");
							}
						});
		
						$("#lecturerPic").on("filebatchuploadcomplete", function(event, files, extra) {
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
				url: "../lecturer/update",
				type: "post",
				dataType: "json",
				data: {
					"id": id,
					"name": name,
					"logo": logo,
					"details": details,
					"weight": weight
					
				},
				success: function(data) {
					overTime(data);
					if(data.result == "1") {
						modalDialog(data.msg);
						setTimeout(function() {
							$('#returnMsg').modal('hide');
							$('.page').html('');
							$('.page').load('html/starLecturer.html');
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
			console.log(details);
			if(name == ""){
				modalDialog("讲师名称不能为空");
				return false;
			}

			// var lecturerPic = $('.lecturerPic .file-preview-frame').length;
			var lecturerPic = $('.file-preview-frame').length;
			if(lecturerPic == 0){
				modalDialog("讲师照片不能为空");
				return false;
			}
			if(weight == ""){
				modalDialog("权重值不能为空");
				return false;
			}
			if(details == ""){
				modalDialog("讲师介绍不能为空");
				return false;
			}
			return true;
		}

	}
	if($("#lecturerId").val() != "" && typeof($("#lecturerId").val()) != "undefined"){
		updateCourse.init();
	}
	
	$('#goStarLecturer,#returnBtn').on('click',function(){
		$('.page').html('');
        $('.page').load('html/starLecturer.html');
	})
})