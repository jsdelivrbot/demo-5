$(function(){
    var userId = localStorage.getItem('userId'),
		token = localStorage.getItem('token');
	var match_bot_through = {
		init: function() {
			var _this = this;
			_this.goEvaluation();
		},
		goEvaluation: function(){
			$("#start").on("click",function(){
				$.ajax({
				 	url:"/star/match/matchStatus",
				 	type:"post",
				 	data:{userId:userId,token:token,currentVersion:current},
				 	dataType:"json",
				 	success:function(data){
				 		if(localStorage.getItem("surplusTime")){
				 			layer.open({
								content: '<p class="title">继续答题</p><p class="tips">是否继续测评</p>'
							    ,btn: ['继续', '取消']
							    ,yes: function(index){
							    	localStorage.setItem("goBack","../html/matchinfo.html");
							    	mui.openWindow({url: "../html/evaluation.html"});
							    	layer.close(index);
							    }
							});
				 		}
				 		if(data.data.isCanTest == 1){
				 			layer.open({content: '测评暂未开始',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				 		}else if(data.data.isCanTest == 3){
				 			layer.open({
								content: '<p class="title">开始答题</p><p class="tips">答题过程中不能退出，测评成绩将计入初赛成绩中</p>'
							    ,btn: ['确认', '取消']
							    ,yes: function(index){
							    	localStorage.setItem("goBack","../html/matchinfo.html");
							    	mui.openWindow({url: "../html/test_explain.html"});
							    	layer.close(index);
							    }
							});
				 		}
				 	}
				});
			});
		}
	}
	match_bot_through.init();
});



