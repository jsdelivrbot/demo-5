$(function() {
	var id = getQueryString('temleteId');
	var $btn = $(".icon-video"),
		$video = $("#video");
	$btn.click(function() {
		$video.attr("controls", "controls").get(0).play();
		$btn.hide();
	});
	$video.click(function() {
		if($btn.is(":hidden")) {
			$video.removeAttr("controls", "controls").get(0).pause();
			$btn.show();
		} else {
			$video.attr("controls", "controls").get(0).play();
			$btn.hide();
		}
	});
	var uploadVideo={
		init:function(){
			this.templateItem();
		},
		templateItem:function(){
			$.ajax({
				url: "/star/template/item",
				type: "post",
				dataType: "json",
				data: {
					templateId:id,				
				},
				success: function(data) {
					if(data.result == "1") {
						$('#video').attr('src',data.data.templateInfo.sourceMaterialUrl);
						$('.info').html('<h3>'+data.data.templateInfo.name+'</h3>'+data.data.templateInfo.details);
						
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
	uploadVideo.init();
	
});