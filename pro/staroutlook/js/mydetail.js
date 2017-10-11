;$(function(){
	var messageIds=localStorage.getItem('dataid');
	var userId=localStorage.getItem('userId');
	var token=localStorage.getItem('token');
	var newsTitle=localStorage.getItem('newsTitle');
	var newsBody=localStorage.getItem('newsBody');
	
	$('.sysTime').html(newsTitle);
	$('.syeCont').html(newsBody);
	$.ajax({
		type: "post",
		async: true,
		url: '/star/message/read',
		dataType: "json",
		data:{'userId':userId,'token':token,'messageIds':messageIds},
		success: function(data) {
			console.log(data);
			if(data.result == 1) {
				console.log(data.data);						
			}
			else if(data.result == 811){
				layer.open({content: '消息已查看',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			}
			else if(data.result == 812){
				layer.open({content: '消息没有全部插入',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			}
		},
		error: function() {
			layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
		}
	});
});