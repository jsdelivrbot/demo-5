$(function(){
	
	var userId,token;
	
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	
	userId = GetQueryString("userId");
	token = GetQueryString("token");
	goBack = GetQueryString("goBack");
	
	console.log(userId,token);
	
	if(userId == null && token == null && goBack == null){
		userId = localStorage.getItem('userId');
		token = localStorage.getItem('token');
		goBack = localStorage.getItem('goBack');
	}
	
	localStorage.setItem('userId',userId);
	localStorage.setItem('token',token);
	localStorage.setItem('goBack',goBack);

	//点击开始进去测评试题
	$('.btn-test').on('click',function(){
		console.log('开始测评');
		window.location.href = '../html/test_que.html';
	});
	
	// 返回
	$("#return").on("click",function(){
		layer.open({
			content: 'Are you sure?'
		    ,btn: ['NO', 'YES']
		    ,no: function(index){
		          window.history.back(-1);
		          layer.close(index);
		    }
		});
	});
})
