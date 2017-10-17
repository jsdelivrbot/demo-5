$(function(){
	var institutionId;
	var institute = {
		init: function() {
			var _this = this;
			_this.list();

		},
		list: function() {
			var _this = this;
			$.ajax({
				url:"/public_platform/mechanism/list",
				type: "post",
				dataType: "json",
				success: function(data) {
					console.log(data);
					var listDate = data.data;
					if(listDate.length == 0){
						$('.no-organ').show();
						$('.add-authen').on('click',function(){//跳转到添加机构页面
							$('.page').html('');
							$('.page').load('html/addInstitutionalInfo.html');
						})
					}else{
						var html = '';
						var status1 = ["未发布","已发布","已下线","已删除","修改未发布"];
						$.each(listDate, function(index,obj) {
							institutionId = obj.id;
							html += '<div class="thumbnail fl"><img src="' + obj.logo + '" /><span class="fl">' + status1[obj.status-1] + '</span></div><div class="fl text-center"><h3 class="color-354252">' + obj.name + '</h3><button id="deployBtn" type="button" class="btn btn-primary">配置内容</button>';
							
							if(obj.status == "1" || obj.status == "5" ){
								html += '<button id="releaseBtn" type="button" class="btn btn-primary">发布</button>';
							}else if(obj.status=='2'){
								html += '<button id="offlineBtn" type="button" class="btn btn-primary">下线</button>';
							}
							
							html += '<button id="editBtn" type="button" class="btn btn-primary">编辑</button><button id="previewBtn" type="button" class="btn btn-primary">预览</button></div>';
						});
						$('.have-organ').show().append(html);
						localStorage.setItem("institutionId",institutionId);
						_this.operate();
					}
				}
			});
		},
		operate: function(){
			var that=this;
			$("#deployBtn").click(function(){
				$('.page').html('');
				$('.page').load('html/courseConfiguration.html');
			});
			$("#editBtn").click(function(){
				$('.page').html('');
				$('.page').load('html/editInstitutionalInfo.html');
			});
			$('#releaseBtn').click(function(){
				that.release();
			})
			$('#offlineBtn').click(function(){
				that.offline();
			})
			$("#previewBtn").click(function(){
				$('#preview').modal("show");
				var institutionId = localStorage.getItem("institutionId");
				window.onload=function(){
		            window.frames[0].postMessage('institutionId','https://test.api.staroutlook.com/star/staroutlook/preview/html/preview.html');
		        }
				document.getElementById("coursePreview").src = "https://test.api.staroutlook.com/star/staroutlook/preview/html/preview.html?institutionId=" + institutionId;
			})
		},
		//发布
		release:function(){
			 $.get("/public_platform/mechanism/release",{"id":institutionId},function(data){
	            if (data.result == 1) {
	                modalDialog("发布成功！");
	                setTimeout(function(){
	                	 $('.page').html('').load('html/institute.html');
	                },1000);
	               
	            }else{
	                modalDialog("发布失败！");
	            }
	            dataTable.ajax.reload();
        	})
		},
		//下线
		offline:function(){
			$.get("/public_platform/mechanism/offline",{"id":institutionId},function(data){
        	
            if (data.result == 1) {
                modalDialog("下线成功！");
                 setTimeout(function(){
	                $('.page').html('').load('html/institute.html');
	             },1000);
            }else{
                modalDialog("下线失败！");
            }
            dataTable.ajax.reload();
       	 })
		}
	}
	institute.init();
});
