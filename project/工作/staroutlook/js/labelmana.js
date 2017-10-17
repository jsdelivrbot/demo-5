$('.addtags').on('click', function() {
	window.location.href = '../html/addtags.html';
})

$(function() {
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	var userId = localStorage.getItem('userId'),
		token = localStorage.getItem('token');

	mui.init();

	(function($) {
		//阻尼系数
		var deceleration = mui.os.ios ? 0.003 : 0.0009;
		$('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: false, //是否显示滚动条
			deceleration: deceleration
		});
		$.ready(function() {
			//循环初始化所有下拉刷新，上拉加载。
			$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
				$(pullRefreshEl).pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								self.endPullDownToRefresh();
							}, 1000);

						}
					},
					up: {
						callback: function() {
//							this.endPullUpToRefresh(false);
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								self.endPullUpToRefresh();
							}, 1000);
							if(labelmana.pages[labelmana.items.index()]==0){
								this.endPullUpToRefresh(true);
							}else{
								this.endPullUpToRefresh(false);
							}
							if(labelmana.labelmanaNum[labelmana.items.index()] < labelmana.pages[labelmana.items.index()]) {
								labelmana.labelmanaNum[labelmana.items.index()]++;
								labelmana.load(labelmana.labelmanaClass, labelmana.items, labelmana.labelmanaNum[labelmana.items.index()]);
							} else {
								//								labelmana.items.find(".mui-pull-bottom-wrapper").text("没有更多数据了");
							}
						}
					}
				});
			});

		});
	})(mui);
	

	var labelmana = {
		init: function() {
			var _this = this;
			_this.load(_this.labelmanaClass, _this.items);
			_this.tabload();
		},
		load: function(labelmanaClass, items, pageNum) {
			var pageNum = pageNum == undefined ? 1 : pageNum;
			var _this = this;
			$.ajax({
				url: "/star/tag/user/list",
				type: "post",
				dataType: "json",
				data: {
					'userId': userId,
					'token': token,
					'pageNum': pageNum,
					'pageSize': 10,		
					'status': labelmanaClass
				},
				success: function(data) {
					_this.pages[items.index()] = data.data.pages;
					var length = data.data.list.length;
					
					switch(data.result) {
						case "1":
							var html = '';
							if(length > 0) {
								$.each(data.data.list, function(obj, tags) {
									html += '<li data-id="' + tags.id + '" class="mui-table-view-cell">' + tags.content + '</li>';		
								});
							} else {
								html += '<div class="backImg"><div class="backImg-star"><img src="../images/sweet.jpg"/></div><span>没有对应的信息!</span></div>';
							};

							if(data.data.pageNum > data.data.pages) {
								data.data.pageNum = data.data.pages
							}
							items.find('.mui-table-view').append(html);
							

							break;
						case "200":
							alert('用户不存在');
							break;
						default:
							alert('网络出错，请重试');
							break;
					}
				},
				error: function() {
					alert('获取失败');
				}
			});
		},
		tabload: function() {
			var _this = this;
			document.getElementById('slider').addEventListener('slide', function(e) {
				_this.labelmanaClass = e.detail.slideNumber;
				if(e.detail.slideNumber==0){
					_this.labelmanaClass=1;	
				}else{
					_this.labelmanaClass=0
				}
				_this.items = $('#item' + (e.detail.slideNumber + 1) + 'mobile');
				/*if(_this.items.find(".backImg").length == 0) {
					labelmana.load(_this.labelmanaClass, _this.items);
				}*/
				if(_this.items.find(".mui-table-view").html() == "") {
					labelmana.load(_this.labelmanaClass, _this.items);
				}
			});
		},
		items: $('#item1mobile'),//容器选项
		labelmanaNum: ["1", "1"],
		labelmanaClass: 1,//初始显示页数
		pages: []//总页数
	}
	labelmana.init();

});
