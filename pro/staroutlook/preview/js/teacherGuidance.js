$(function() {
	var institutionId = localStorage.getItem('institutionId');
        console.log(institutionId);
    
	var teacherGuidance = {
		init: function() {
			var _this = this;
			_this.templateList();
		},
		templateList: function(curr) {
			var _this = this;
			var curr = curr==undefined?"1":curr;
			$.ajax({
				url: "/star/template/list",
				type: "post",
				dataType: "json",
				data: {
					id: institutionId,
					pageNum: curr
				},
				success: function(data) {
					if(data.result == "1") {
						var templateListStr = '';
						var pageTotal = data.data.pages;
						if(data.data.list.length != 0) {
							$.each(data.data.list, function(index, element) {
								templateListStr += '<li class="gotoDetail" data-Id="' + element.id + '"><img src="' + element.logo + '"/><p class="guidance-name">' + element.name + '</p></li>';
							});

							$('#btn-more').before(templateListStr);
							laypage({
								cont: 'btn-more', //容器。值支持id名、原生dom对象，jquery对象,
								pages: pageTotal, //总页数
								curr: data.data.pageNum || 1, //当前页
								groups: 0, //连续分数数0
								prev: false, //不显示上一页
								next: '点击加载更多',
								skin: 'flow', //设置信息流模式的样式
								jump: function(obj, first){ //触发分页后的回调
									if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					                	_this.templateList(obj.curr);
					                }
					                if(obj.curr >= pageTotal) {
										$('.page_nomore').on('click',function(){
											layer.open({content: '没有更多啦',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time:2});
											$('.page_nomore').html('没有更多啦');
										})
										
									}
								}
							});

							$('.gotoDetail').click(function() {
								window.location.href = '../html/uploadVideo.html?temleteId=' + $(this).data('id');
							});

						} else {
							seize();
						}

					} else {
						layer.open({
							content: data.msg,
							style: 'background:rgba(0,0,0,.8);color:#fff;border:none;',
							time: 2
						});
					}
				},
				error: function() {
					layer.open({
						content: '网络请求错误!',
						style: 'background:rgba(0,0,0,.8);color:#fff;border:none;',
						time: 2
					});
				}
			});
		}
	};
	teacherGuidance.init();
})