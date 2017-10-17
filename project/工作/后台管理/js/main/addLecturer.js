$(document).ready(function() {
	var name,logo,weight,details;
	$("#lecturerPic").fileinput({
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

	var addLecturer = {
		init: function() {
			var _this=this;		
			_this.clickSubmit(); //添加讲师信息
		},
		clickSubmit: function() {
			var _this = this;
			
			$("#saveBtn").click(function() {
				name = $("#lecturerName").val();//讲师姓名		
				weight = $("#lecturerWeight").val();//权重值
				details = editor.getData();//讲师介绍 //富文本编辑器内容
				
				if(!_this.checkValue()){
					return;
				}else{
					$("#lecturerPic").fileinput("upload");
					$("#lecturerPic").on("filebatchuploadsuccess", function(event, data) {
						if(data.response.result == 1) {
							logo = data.response.data.url;//讲师照片
						} else {
							modalDialog("图片上传失败");
						}
					});
					$("#lecturerPic").on("filebatchuploadcomplete", function(event, files, extra) {
						_this.sendAddLecturer();//添加讲师
					});
				}
			});
		},
		sendAddLecturer: function() {
			var _this=this;	
			$.ajax({
				url: "/public_platform/lecturer/add",
				type: "post",
				dataType: "json",
				data: {
					"name": name,
					"logo": logo,
					"details":details,
					"weight": weight
					
				},
				success: function(data) {
					overTime(data);
					if(data.result == "1") {
						modalDialog(data.msg);
						setTimeout(function() {
							$('#returnMsg').modal('hide');
							$('#returnMsg').remove();
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
			if(name == ""){
				modalDialog("讲师名称不能为空");
				return false;
			}

			var lecturerPic = $('.lecturerPic .file-preview-frame').length;
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
	if($("#courseId").val() == "" || typeof($("#courseId").val()) == "undefined"){
		addLecturer.init();
	}
	$('#goStarLecturer,#returnBtn').on('click',function(){
		$('.page').html('');
        $('.page').load('html/starLecturer.html');
	})
});