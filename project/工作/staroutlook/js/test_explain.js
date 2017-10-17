$(function(){

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
