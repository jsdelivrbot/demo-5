$(function(){
	var institutionId = localStorage.getItem('institutionId');
        console.log(institutionId);
    
	var ciUrl,tgUrl,slUrl,oeqUrl;//图片课程介绍/名师指导/明星讲师/在线试题
	var preview = {
		init: function(){
			var _this = this;
			_this.item();
		},
		item: function(){
			$.ajax({
				url: "/star/mechnismInfo/item",
				type: "post",
				dataType: "json",
				data:{"id":institutionId},
				success: function(data) {
					if(data.result == 1) {
						var html ='';
						html += '<div class="institution-top">\
									<h3 class="title">' + data.data.name + '</h3>\
									<div class="info">' + data.data.details + '</div></div>'
						$('.institution').append(html);
					}else{
						layer.open({content: '网络请求出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2})
					}
				},
				error: function() {
					layer.open({content: '网络请求出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2})
				}
			});
		}
	}
	preview.init();
});
