$(function(){
	var id = getQueryString('id');//课程id
	var couseDetail={
		init:function(){
			this.courseItem();
		},
		courseItem:function(){
			$.ajax({
				url: "/star/course/item",
				type: "post",
				dataType: "json",
				data: {
					id:id,				
				},
				success: function(data) {
					if(data.result == "1") {
											
						$('.name').html(data.data.name);	
						$('.course-info').html(data.data.content);		
						
					} else {
						layer.open({content:data.msg,style:'background:rgba(0,0,0,.8);color:#fff;border:none;',time:2});
					}
				},
				error: function() {
					layer.open({content:'网络请求错误!',style:'background:rgba(0,0,0,.8);color:#fff;border:none;',time:2});
				}
			});	
		}	
	};
	couseDetail.init();
})
