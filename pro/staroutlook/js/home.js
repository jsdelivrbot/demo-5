var userId = localStorage.getItem("userId"),
	token = localStorage.getItem("token"),
	matchAreaId = localStorage.getItem("matchAreaId"),
	matchArea = localStorage.getItem("matchArea"),
	matchId = localStorage.getItem("matchId"),
	match = localStorage.getItem("match"),
	matchAgeId = localStorage.getItem("matchAgeId"),
	matchAge = localStorage.getItem("matchAge");
var matchNum = 1;

matchAreaId = matchAreaId == null?0:matchAreaId;
matchId = matchId == null?0:matchId;
matchAgeId = matchAgeId == null?0:matchAgeId;



if(matchAreaId == 0 && matchId == 0 && matchAgeId == 0) {
	$(".hot-nav").append("<i>全国</i>");
} else if(matchAgeId == 0) {
	$(".hot-nav").append("<i>" + matchArea + "-</i><i>" + match + "</i>");
} else {
	$(".hot-nav").append("<i>" + matchArea + "-</i><i>" + match + "-</i><i>" + matchAge + "</i>");
}

mui.init({
	pullRefresh: {
		container: '#matchRefresh',
		up: {
			contentrefresh: '正在加载...',
			callback: matchPullupRefresh
		}
	}
});
mui.ready(function() {
	mui('#matchRefresh').pullRefresh().pullupLoading();
});

function matchPullupRefresh() {
	$.ajax({
		type: "post",
		url: "/star/video/match/list",
		data: {
			'userId': userId,
			'token': token,
			'pageNum': matchNum,
			'matchAreaId': matchAreaId,
			'matchId': matchId,
			'matchAgeId': matchAgeId,
			'pageSize': 10
		},
		dataType: "json",
		success: function(data) {
			console.log(data);
			if(data.result == 1) {
				if(data.data.videoList.list.length == 0){
					$("#matchList").append('<div class="backImg"><div class="backImg-star"><img src="../images/sweet.jpg"/></div><span>没有相关视频，请更改筛选条件</span></div>');
					mui('#matchRefresh').pullRefresh().endPullupToRefresh(true);
					$('.mui-pull-caption-nomore').hide();
				}else if(matchNum <= data.data.videoList.pages) {
					matchListInit(data);
					matchNum++;
					mui('#matchRefresh').pullRefresh().endPullupToRefresh(false);
				} else {
					mui('#matchRefresh').pullRefresh().endPullupToRefresh(true);
				}
			}

			mui('.mui-scroll-wrapper').scroll({
				indicators: false //是否显示滚动条
			});
			tap.other();
		}
	});
}

function matchListInit(data) {
	var matchList = '';
	$.each(data.data.videoList.list, function(index, ele) {
		matchList += '<li>\
							<p class="goVideoDetails" data-videoId="' + ele.id + '">\
								<img src="' + ele.thumbUrl + '">\
							</p>\
							<div class="avator" data-visitUserId="' + ele.userId + '">\
								<img src="' + ele.uAvatar + '">\
							</div>';
		if(ele.uCategory == 2||ele.uCategory == 3||ele.uCategory == 4){
			matchList += '<i class="iconfont icon-v"></i>';
		}					
		matchList += '<p><span>' + ele.uName + '</span>';
		if(ele.isFavour == 1) {
			matchList += '<span class="iconfont rehear">&#xe60f;</span><span>' + ele.hot + '</span>';
		} else {
			matchList += '<span class="iconfont">&#xe60f;</span><span>' + ele.hot + '</span>';
		}
		matchList += '</p><h4>' + ele.name + '</h4>\
						</li>';
	});
	$("#matchList").append(matchList);
}

var tap = {
	init: function() {
		var _this = this;
		_this.ad();
		_this.other();
		_this.changeMain();
		
	},
	ad: function() {
		$.ajax({
			type: "post",
			url: "/star/video/advert/list",
			dataType: "json",
			success: function(data) {
				if(data.result == 1) {
					var advertList = '<div class="swiper-wrapper">';
					$.each(data.data, function(index, ele) {
						advertList += '<div class="swiper-slide advert" data-h5Url="' + ele.h5Url + '" style="background-image:url(' + ele.imageUrl + ')"></div>';
					});
					advertList += '</div><div class="swiper-pagination"></div>';
					$("#upswiper").append(advertList);
					
					if(data.data.length !== 1){
						var upSwiper = new Swiper('.swiper-container', {
							loop: true,
							pagination: '.swiper-pagination',
							grabCursor: true,
							autoplay: 3000,
							autoplayDisableOnInteraction: false,
						});
					}else{
						$(".swiper-wrapper").addClass('stop-swiping');
						var upSwiper = new Swiper('.swiper-container', {
							loop: false,
							noSwiping : true,
							noSwipingClass : 'stop-swiping',
						});
					}
				}
			}
		});
	},
	other: function() {
		$(document).on("tap", function(e) {
			if($(e.target).hasClass("advert")) { // 广告链接
				var goh5Url = $(e.target).attr("data-h5Url");
				if(goh5Url == 'null'){ // 测评地址
					tap.goEvaluation();
				}else{
					mui.openWindow({
						url: "http://"+goh5Url
					});
				}
			} else if($(e.target).parent().hasClass("goVideoDetails")) {
				var videoId = $(e.target).parent().attr("data-videoid");
				localStorage.setItem("videoId", videoId);
				mui.openWindow({
					url: "videodetails.html"
				});
			} else if($(e.target).parent().hasClass("avator")) {
				var visitUserId = $(e.target).parent().attr("data-visitUserId");
				localStorage.setItem("otherid", visitUserId);
				mui.openWindow({
					url: "myhome.html"
				});
			} else if(e.target.id == "goSelect") {
				mui.openWindow({
					url: "select.html"
				});
			}
		});
	},
	changeMain: function(){
		document.getElementById('main').addEventListener('slide', function(e) {
		    if (e.detail.slideNumber === 0) {
		       $("#goSelect").show();
		    }
		    if (e.detail.slideNumber === 1) {
		       $("#goSelect").hide();
		    }
		});
		document.querySelector('#item1mobile').addEventListener("swiperight", function() {
			mui("#main").slider().gotoItem(0);
			
		});
	},
	goEvaluation: function(){
		$.ajax({
			type: "post",
			url: "/star/match/matchStatus",
			data:{userId:userId,token:token,currentVersion:current},
			dataType: "json",
			success: function(data) {
				if(data.data.authStatus == 0){
					layer.open({content: '只有报名参加希望之星风采大赛才可使用',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}else if(data.data.licenseCodeBindStatus == 0){
					layer.open({
						content: '<p class="tips">未信息匹配,是否进行信息匹配</p>'
					    ,btn: ['确认', '取消']
					    ,yes: function(){
					    	mui.openWindow({
								url: "../html/matchinfo.html"
							});
					    }
					});
				}else if(data.data.isInfantGroup == "true"){
					layer.open({content: '幼儿组比赛不用做测评',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}else if(data.data.testStatus == 1){
					layer.open({content: '已做过测评',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}else if(data.data.isAddSchedule == 1){
					if(data.data.isContainPreliminaries == 0){
						layer.open({content: '参加初赛的选手才可做测评',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}else if(data.data.isCanTest == 1){
						layer.open({content: '测评暂未开始',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}else if(data.data.isCanTest == 2){
						layer.open({content: '测评已经结束',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}else{
						layer.open({
							content: '<p class="title">开始答题</p><p class="tips">答题过程中不能退出，测评成绩将计入初赛成绩中</p>'
						    ,btn: ['确认', '取消']
						    ,yes: function(){
						    	localStorage.setItem("goBack","../index.html");
						    	mui.openWindow({
									url: "../html/test_explain.html"
								});
						    }
						});
					}
				}else{
					layer.open({content: '选手还未匹配赛程',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			},
			error: function(){
				layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			}
		})	
	}
}
tap.init();
//我秀部分的功能
$(function() {
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
							var self = this;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								self.endPullUpToRefresh();
							}, 1000);
							if(xiu.xiuNum[xiu.items.index()] < xiu.pages[xiu.items.index()]){
								xiu.xiuNum[xiu.items.index()] ++;
								xiu.load(xiu.xiuClass,xiu.items,xiu.xiuNum[xiu.items.index()]);
							}else{
								xiu.items.find(".mui-pull-bottom-wrapper").text("没有更多数据了");
								return;
							}

						}
					}
				});
			});

		});
		
	})(mui);
	var xiu = {
		init: function(){
			var _this = this;
			_this.category();
			_this.load(_this.xiuClass,_this.items);
			_this.tabload();
		},
		category: function(){
			$.ajax({
				type:"get",
				url:"/star/video/xiu/category",
				dataType:"json",
				success: function(data){
					switch(data.result){
						case "1":
							var category = '';
							$.each(data.data.xiuClassList, function(obj, categorys) {
								var index = obj+2;
								category += '<a class="mui-control-item" href="#item' + index + 'mobile">' + categorys.name +'</a>';
							});
							$('#sliderSegmentedControl .mui-scroll').append(category);
							break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
				},
				error: function() {
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		},
		load: function(xiuClass,items,pageNum){
			var pageNum = pageNum==undefined?1:pageNum;
			var _this = this;
			$.ajax({
				type:"post",
				url:"/star/video/xiu/list",
				data: {'userId': userId,'token': token,'xiuClass':xiuClass,'pageNum':pageNum},
				dataType:"json",
				success: function(data){
					_this.pages[items.index()] = data.data.videoList.pages;
					switch(data.result){
						case "1":
							var hotlist = '';
							$.each(data.data.videoList.list, function(obj, hot) {
								hotlist += '<li class="mui-table-view-cell">\
								<p class="goVideoDetails" data-videoid="' + hot.id + '"><img src="' + hot.thumbUrl + '"></p>\
								<div class="avator" data-visituserid="' + hot.userId + '"><img src="' + hot.uAvatar + '"></div>';
								
								if(hot.uCategory == 2||hot.uCategory == 3||hot.uCategory == 4){
									hotlist += '<i class="iconfont icon-v"></i>';
								}
								
								hotlist += '<p><span>' + hot.uName + '</span>\
								<span class="yo-ico iconfont">&#xe60f;' + hot.hot + '</span></p>\
								<h4>' + hot.name + '</h4>\
								</li>';
							});
							items.find('.mui-table-view').append(hotlist);
							break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
				},
				error: function() {
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		},
		tabload:function(){
			var _this = this;
			document.getElementById('slider').addEventListener('slide', function(e) {
				_this.xiuClass = e.detail.slideNumber;
				_this.items = $('#item'+ (e.detail.slideNumber+1) +'mobile');
				if(_this.items.find(".matchList>li").length==0){
					xiu.load(_this.xiuClass,_this.items);
				}
			});
		},
		items: $('#item1mobile'),
		xiuNum: ["1","1","1","1"],
		xiuClass: 0,
		pages:[]
	}
	xiu.init();
})


