mui.init({
	gestureConfig: {
		doubletap: true, //默认为false
		longtap: true, //默认为false
	},
	options: {
		scrollY: true, //是否竖向滚动
		indicators: false, //是否显示滚动条
		deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
		bounce: true //是否启用回弹
	},
	pullRefresh: {
		container: '#pullrefresh', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
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
var url = "/star/message/unReadList";
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
			console.log(data);
			var mm = '';
			if(data.result == 1) {
				if(count > data.data.pages) {
					count = data.data.pages;
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				} else {
					var size = data.data.list;
					$.each(size, function(obj, news) {
						if(news.readStatus == 0) {
							mm += '<ul class="list-li" dataid="' + news.id + '" action-type="go.mydetails"><li class="mui-table-view-cell con"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red delp">删除</a></div><div class="mui-slider-handle"><div class="sysTime"><p class="newstitle">' + news.title + '</p><span>' + news.lastUpdatedTime.substring(0, 10) + '</span></div><div class="syeCont"><p class="newsbody">' + news.body + '</p><div><span id="redblo" style="display:block"></span></div></div></div></li></ul>';
						} else {
							mm += '<ul class="list-li" dataid="' + news.id + '" action-type="go.mydetails"><li class="mui-table-view-cell con"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red delp">删除</a></div><div class="mui-slider-handle"><div class="sysTime"><p class="newstitle">' + news.title + '</p><span>' + news.lastUpdatedTime.substring(0, 10) + '</span></div><div class="syeCont"><p class="newsbody">' + news.body + '</p><div><span id="redblo" style="display:none"></span></div></div></div></li></ul>';
						}
					});
					$('.mui-table-view').append(mm);
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




var pageSize = 10; // 消息列表默认每页10条
var mynews = {
	init: function(){
		this.getReadStatus();
		if(pageSize > 10){ // 消息数超过一页
			this.getReadStatus();
		}
		this.goToMydetails();
		this.delet();
		
		$('.edit').on('tap', function() {
			window.location.href = "../html/newslist.html";
		})
	},
	goToMydetails: function(){
		mui('body').on('tap', '.list-li', function() {
			var dataid = $(this).attr("dataid");
			var newsTitle = $(this).children().children('.mui-slider-handle').children('.sysTime').children('.newstitle').html();
			var newsBody = $(this).children().children('.mui-slider-handle').children('.syeCont').children('.newsbody').html();
			localStorage.setItem('dataid', dataid);
			localStorage.setItem('newsTitle', newsTitle);
			localStorage.setItem('newsBody', newsBody);
			window.location.href = '../html/mydetails.html';
		});
	},
	delet: function(){
		mui('body').on('tap', '.delp', function() {
			$(this).parent().parent().parent().remove();
			var messageIds = $(this).parent().parent().parent().attr("dataid");
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
		});
	},
	getReadStatus: function(){
		$.ajax({
			url: "/star/message/unReadList",
			type: "post",
			async: false,
			data: {'userId': userId,'token': token,'pageSize':pageSize},
			dataType: "json",
			success: function(data) {
				pageSize = data.data.total; // 总消息数
				$.each(data.data.list,function(index,obj){
					if(obj.readStatus == "0"){
						sessionStorage.setItem("unRead","1");
						return false;
					}else{
						sessionStorage.setItem("unRead","0");
					}
				});
			}
		});
	}
}
mynews.init();
	
	
	
	
	
