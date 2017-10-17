$(document).ready(function() {
	var name,logo,weight,details;
	if($("#courseId").val() == "" || typeof($("#courseId").val()) == "undefined"){
		$("#courseImage").fileinput({
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
	}
	var addCourse = {
		init: function() {
			var _this=this;	
			_this.clickSubmit(); //添加课程信息
		},

		clickSubmit: function() {
			var _this = this;
			$("#saveBtn").click(function() {
				name = $("#courseName").val();
				weight = $("#courseWeight").val();
				details = editor.getData();
				
				if(!_this.checkValue()){
					return;
				}else{
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
				}
			});

		},
		sendAddLecturer: function() {
			var _this=this;	
			$.ajax({
				url: "/public_platform/course/add",
				type: "post",
				dataType: "json",
				data: {
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
			
			var courseImage = $('.courseImage .file-preview-frame').length;
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
	if($("#courseId").val() == "" || typeof($("#courseId").val()) == "undefined"){
		addCourse.init();
	}
	$('#goCurriculum,#returnBtn').on('click',function(){
		$('.page').html('');
		$('.page').load('html/curriculum.html');
  	})
});