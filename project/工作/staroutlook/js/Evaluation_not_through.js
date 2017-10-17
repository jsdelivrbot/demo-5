$(function(){
      		document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
});
var userId = localStorage.getItem('userId'),
	token = localStorage.getItem('token');
mui('.mui-scroll-wrapper').scroll({
	indicators: false, //是否显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
$(function() {
	var match_bot_through = {
		init: function() {
			var _this = this;
			_this.content();
		
			
		},
		content: function() {
			$.ajax({
				type: "post",
				url: "/star/match/matchStatus",
				data:{userId:userId,token:token},
				dataType: "json",
				success: function(data) {
					console.log(data);
					switch(data.result) {
						case "1":
						var str = '';
						$.each(data.data.matchList, function(index, ele) {
							str += '<div>1</div>';
						});
					$(".bottom").append(str);
						
						default:layer.open({content: '网络出错，请重试',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});break;
					}
				},
				error: function() {
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		}
		
	}
	match_bot_through.init();
})
