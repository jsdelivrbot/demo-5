$(document).ready(function() {

mui.init({
	options: {
		indicators: false, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
	},
	pullRefresh: {
		container: '#pullrefresh', 
		up: {
			height: 50, 
			contentrefresh: "正在加载...",
			contentnomore: '没有更多数据了',
			callback: pullupRefresh
		},
		down: {
			callback: pulldownRefresh
		}
	}
});

function pulldownRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
var count = 0;

function pullupRefresh() {
	mui('.mui-scroll-wrapper').scroll({
		indicators: false
	});

	$('.mui-scrollbar-indicator').css('display', 'none');
	setTimeout(function() {
		count++;
		ajax(count)
	}, 150);
}
mui.ready(function() {
	mui('#pullrefresh').pullRefresh().pullupLoading();
});

var userId = localStorage.getItem('userId');
var token = localStorage.getItem('token');
var url = '/star/message/unReadList';
var ajax = function(count) {

	mui.ajax(url, {
		data: {
			'userId': userId,
			'token': token,
			'pageNum': count,
			'pageSize': 15
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型

		success: function(data) {
			if(data.result == 1) {
				if(count > data.data.pages) {
					count = data.data.pages;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);

				} else {
					var html = '';
					$.each(data.data.list, function(obj, news) {
					
						if(news.readStatus == 0) {
							html += '<li class="mui-table-view-cell" data-id="' + news.id + '"><div class="cell_left"><input class="check_box" type="checkbox"></div><div class="cell_right"><h3><span class="lastUpdatedTime">' + news.lastUpdatedTime.substring(0, 10) + '</span>' + news.title + '</h3><p class="list_body">' + news.body + '<span id="redblo" style="display:block"></span></p></li>';
							$('.selectAll').css('display','block');
						};
						if(news.readStatus == 1) {
							html += '<li class="mui-table-view-cell" data-id="' + news.id + '"><div class="cell_left"><input class="check_box" type="checkbox"></div><div class="cell_right"><h3><span class="lastUpdatedTime">' + news.lastUpdatedTime.substring(0, 10) + '</span>' + news.title + '</h3><p class="list_body">' + news.body + '<span id="redblo" style="display:none"></span></p></li>';
						};
					});
					
					$('.mui-table-view').append(html);
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
				}
			} else {
				layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			}
		},
		error: function(xhr, type, errorThrown) {
			layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
		}
	})

}
$('.selectAll').css('display','none');
//全选已读

//  发送给后台已阅读列表
$("body").on('tap','.selectAll', function() {
	 			var valArr = new Array; 
    			$(".cell_left :checkbox").each(function(i){ 
       			 valArr[i] = $(this).parent().parent('.mui-table-view-cell').attr('data-id'); 
   				 }); 
    			var vals = valArr.join(','); 
     		 
				var btnArray = ['否', '是'];
				mui.confirm('你确定要全部已读吗？', '提示', btnArray, function(e) {
					if (e.index == 1) {
						//确定
						$.ajax({
							type: "post",
							async: true,
							url: '/star/message/read',
							dataType: "json",
							data:{'userId':userId,'token':token,'messageIds':vals},
							success: function(data) {
		
								console.log(data);
								if(data.result == 1) {
									console.log(data.data);						
								}
								else if(data.result == 811){
									console.log('消息已查看');
								}
								else if(data.result == 812){
									console.log('消息没有全部插入');
								}
							},
							error: function() {
								layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							}
						});
						window.location.href='mynews.html';
						
						$('.selectAll').css('display','none')
					} else {
						//返回
						
					}
				})
			
	$(this).css('color', '#fff');

	if($('.check_box').prop("checked") == true) {
		
		var messageIds = $('.check_box').parent().parent('li').attr("data-id");
		console.log(messageIds);
		$.ajax({
			type: "post",
			async: true,
			url: '/star/message/read',
			dataType: "json",
			data: {
				'userId': userId,
				'token': token,
				'messageIds': messageIds
			},
			success: function(data) {
				console.log(data);
				if(data.result == 1) {} else if(data.result == 811) {
					console.log('消息已查看');
				} else if(data.result == 812) {
					console.log('消息没有全部插入');
				}
			},
			error: function() {
				layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			}
		});
	}
});

//取消
$(".cancel").click(function() {
	$(this).css('color', '#fff');

});
//监听所有输入框状态全选删除做出相应改变
$('.deletes').attr('disabled',true);
$('.selectAll').attr('disabled',false);

$('body').on('click','.check_box',function(){
	$('.check_box').each(function(){
		if($(this).prop("checked")){
			$('.deletes').prop('disabled',true);
			$('.selectAll').prop('disabled',false);
		}
	})
	if($('.deletes').prop('disabled')==true){
		$('.deletes').prop('disabled',false);
	}else{
		$('.deletes').prop('disabled',true);

	}
	if($('.selectAll').prop('disabled')==false){
		$('.selectAll').prop('disabled',true);
	}else{
		$('.selectAll').prop('disabled',false);
	}
	
})
//删除
$(".deletes").on('click', function() {

	$(this).css('color', '#fff');
	$(".check_box:checkbox").each(function() {
		if($(this).prop("checked") == true) {
			var messageIds = $(this).parent().parent('li').attr("data-id");
			$(this).parent().parent('li').remove();
			console.log(userId, token, messageIds)
			$.ajax({
				url: '/star/message/delete',
				type: "post",
				dataType: "json",
				data: {
					'userId': userId,
					'token': token,
					'messageIds': messageIds,
				},
				success: function(data) {
					if(data.result == 1) {
						layer.open({content: '删除消息成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
						
					} else {
						layer.open({content: '删除消息失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}
				},
				error: function() {
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		}
	})
})
});
