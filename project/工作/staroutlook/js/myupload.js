mui.init({
	swipeBack: true, //启用右滑关闭功能
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh,
			auto:true
		}
	}
});

// 刷新
function pulldownRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
// 加载
function pullupRefresh() {
	setTimeout(function() {
		ajax();
	}, 1500);
};

mui.ready(function() {
	
	mui('#pullrefresh').pullRefresh().pullupLoading();
});

var userId = localStorage.getItem('userId');
var token = localStorage.getItem('token');
var pageNum = 1;

var ajax = function() {
	$.ajax({
		type: "post",
		url: "/star/video/list",
		data: {
			'userId': userId,
			'token': token,
			'status': '1',
			'pageNum': pageNum
		},
		dataType: "json",
		success: function(data) {
			console.log(data);
			switch(data.result) {
				case "1":
					var length = data.data.list.length;
					// 没有数据时
					if(length == 0) {
						var html = '<div class="backImg"><div class="backImg-star"><img src="../images/sweet.jpg"/></div><span>还没有视频，赶快上传一个视频吧！</span></div>';
						$('#pullrefresh').html(html);
					} else if(pageNum <= data.data.pages) {
					
							var html = "";
							var users = data.data.list;
							$(users).each(function(index, ele) {
								var user = ele;
								var time = user.auditTime.slice(0, 10).replace(/-/g, '/');
								html += '<li class="mui-table-view-cell mui-media">\
						<a href="javascript:;">\
							<img class="mui-media-object mui-pull-left" src="' + user.uAvatar + '">\
							<div class="mui-media-body">\
								<p class="viedoname">' + user.name + '</p>\
								<p class="date">' + time + '</p>';
								// 若用户已点赞,添加active类
								if(user.isFavour == "1") {
									html += '<p><span class="mui-icon-extra mui-icon-extra-heart-filled active"></span><span>' + user.hot + '</span></p>';
								} else {
									html += '<p><span class="mui-icon-extra mui-icon-extra-heart-filled"></span><span>' + user.hot + '</span></p>';
								}
								html += '</div>\
						</a>\
					</li>';
							});
							$("#upLoadTab").append(html);
							pageNum++;
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); // 停止加载
					}else{
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); // 停止加载
					}
			}
		}
	});

}