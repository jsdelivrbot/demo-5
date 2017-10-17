$(function(){
//	var institutionId = localStorage.getItem('institutionId')||'73';
	var institutionId = getQueryString('institutionId');//机构id

	window.addEventListener('message',function(e){
        if(e.source!=window.parent) return;
        var institutionId = e.data;
    },false);
    
    console.log(institutionId);
    localStorage.setItem("institutionId",institutionId);
    
	var ciUrl,tgUrl,slUrl,oeqUrl;//图片课程介绍/名师指导/明星讲师/在线试题
	var preview = {
		init: function(){
			var _this = this;
			_this.itemImg();
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
						$('.header-wrapper').css('background-image','url(' + data.data.logo + ')');
						html += '<div class="institution-top">\
									<h3 class="title">' + data.data.name + '</h3>\
									<div class="info">' + data.data.details + '</div>\
									<p class="more">点击查看</p>\
								</div>\
								<ul class="institution-bottom">\
									<li><a href="courseIntroduction.html"><img src="' + ciUrl + '" /></a></li>\
									<li><a href="teacherGuidance.html"><img src="' + tgUrl + '" /></a></li>\
									<li><a href="starLecturer.html"><img src="' + slUrl + '" /></a></li>\
									<li><a href="onlineexam.html"><img src="' + oeqUrl + '" /></a></li>\
									<a class="icon-phone" href="tel:' + data.data.telephone + '"></a>\
								</ul>'
						$('.institution').append(html);
						if($(".info").height() > 100){
							$(".info").css('height','80px');
							$(".info").addClass("beyond").next().show();
						}
						$('.more').on('click',function(){
							window.location.href = "institution.html";
						})
						$('.icon-phone').on('click',function(){
							layer.open({
								content: '是否呼叫' + data.data.telephone + ''
							    ,btn: ['呼叫', '取消']
							    
							});
						})
					}else{
						layer.open({content: '网络请求出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2})
					}
				},
				error: function() {
					layer.open({content: '网络请求出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2})
				}
			});
		},
		itemImg: function(){
			$.ajax({
				url: "/star/mechnismInfo/itemImg",
				type: "post",
				dataType: "json",
				data:{"id":institutionId},
				success: function(data) {
					ciUrl = data.data.ciUrl_750;
					tgUrl = data.data.tgUrl_750;
					slUrl = data.data.slUrl_750;
					oeqUrl = data.data.oeqUrl_750;
				},
				error: function() {
					layer.open({content: '网络请求出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2})
				}
			});
		},
		
	}
	preview.init();
});
