$(function(){
	var id = getQueryString('id');//明星讲师id
	var lecturerDetail = {
		init:function(){
			this.lecturer();
		},
		lecturer:function(){
			$.ajax({
				url: "/star/lecturer/item",
				type: "post",
				dataType: "json",
				data: {"id":id},
				success: function(data) {
					if(data.result == "1") {
						$('.lecturer-header img').attr('src',data.data.logo);
						$('.lecturer-name').html(data.data.name);	
						$('.lecturer-info').html(data.data.details);	
					} else{
						layer.open({content: '网络请求出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2})
					}
				},
				error: function() {
					layer.open({content: '网络请求出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2})
				}
			});	
		}	
	};
	lecturerDetail.init();
})
