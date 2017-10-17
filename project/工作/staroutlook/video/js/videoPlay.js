var areaid = "",
	matchid = "",
	groupid = "";
var pageNum = 0,
	pages;
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		up: {
			auto: true,
			contentrefresh: "正在加载...",
			contentnomore: '没有更多数据了',
			callback: pullupRefresh
		}
	}
});
mui('.mui-scroll-wrapper').scroll({
	indicators: false
});

function pullupRefresh() {
	pageNum++;
	videoFeature.getVideo();
}
var videoFeature = {
	init: function() {
		var _this = this;
		_this.getMatchArea();
		_this.changeTab();
		_this.itemChange();
	},
	getMatchArea: function() { //赛区
		var _this = this;
		$.ajax({
			url: "/star/video/match/matchAndArea",
			type: "post",
			dataType: "json",
			success: function(data) {
				if(data.result == 1) {
					var matchAreaList = '',
						matchList = '';
					$.each(data.data.matchAreaList, function(index, ele) {
						matchAreaList += '<li data-areaId="' + ele.id + '">' + ele.name + '</li>';
					});
					$(".select-content ul:first-child").append(matchAreaList);
					$.each(data.data.matchList, function(index, ele) {
						matchList += '<li data-matchId="' + ele.id + '">' + ele.name + '</li>'
					});
					$(".select-content ul:nth-child(2)").append(matchList);
					var groupList = '';
					var group = data.data.matchList[0].list;
					$.each(group, function(index, ele) {
						groupList += '<li data-groupId="' + ele.id + '">' + ele.name + '</li>'
					});
					$(".select-content ul:last-child").append(groupList);
					_this.itemChange();
				}
			}
		})
	},
	itemChange: function() {
		var _this = this;
		$(".select-content ul:first-child").on('tap', "li", function() {
			areaid = $(this).attr("data-areaId");
		})
		$(".select-content ul:nth-child(2)").on('tap', "li", function() {
			matchid = $(this).attr("data-matchId");
		})
		$(".select-content ul:last-child").on('tap', "li", function() {
			groupid = $(this).attr("data-groupId");
		})
		$(".select-content ul").on('tap', "li", function() {
			var selectIndex = $('.select-option .selected').index();
			$(this).addClass("selected").siblings().removeClass("selected");
			var textVal = $(this).text();
			var valueindex = $(this).index();
			if(valueindex == 0) { //判断二级菜单是否选择全部
				selectIndex == 0 ? textVal = "全部赛区"　 : 　selectIndex == 1　 ? 　textVal = "全部项目"　 : 　textVal = "全部组别";
			}
			$('.select-option .selected').removeClass("selected").find("span").text(textVal);
			$("body").css("overflow", "auto");
			$(".select-content,.select-bg").hide();
			$(".have-video").html("");
			pageNum = 1;
			mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
			_this.getVideo();
		})
	},
	getVideo: function() {
		var _this = this;
		$.ajax({
			type: "post",
			async: false,
			url: "/star/video/h5SpecialList",
			data: {
				'pageNum': pageNum,
				'matchAreaId': areaid,
				'matchId': matchid,
				'matchAgeId': groupid,
				'pageSize': 8
			},
			dataType: "json",
			success: function(data) {
				pages = data.pages;
				if(data.list.length == 0) {
					$('.no-video').show();
					$('.spinner,.have-video').hide();
					mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
				} else {
					if(pageNum <= pages) {
						mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
						mui('#pullrefresh').pullRefresh().refresh(true);
						$('.no-video').hide();
						$('.have-video').show();
						var videoList = '';
						$.each(data.list, function(index, ele) {
							videoList += '<li><img src="' + ele.thumbUrl + '" videourl="' + ele.videoUrl + '"/><h3>' + ele.name + '</h3></li>'
						});
						$('.have-video').append(videoList).show();
						$('.spinner').hide();
						_this.videoPlay();
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					} else {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					}

				}
			}
		});
	},
	videoPlay: function() {
		var _this = this;
		$('.have-video img').on("tap", function() {
			$('.videoView,.videoViewBg').show();
			var newVideoUrl = $(this).attr('videourl');
			var oldVideoUrl = $('.video').attr('src');
			if(newVideoUrl != oldVideoUrl) {
				$('.video').attr('src', newVideoUrl);
			}
			var video = document.getElementById("video");
			$("#video").css("max-height",screen.width + "px");
			video.play();
			$("body").css("overflow", "hidden");
		});
		$('.videoViewBg').on("tap", function() {
			$('.videoViewBg,.videoView').hide();
			video.pause();
			$("body").css("overflow", "auto");
		});
	},
	changeTab: function() { //二级菜单选项show
		var _this = this;
		var selectedGroup, groupindex, selectedContent;

		$(".select-option div").on("tap", function() {
			$(".select-content").show();
			$(".select-bg").show();
			$("body").css("overflow", "hidden");
			selectedGroup = $(this);
			groupindex = selectedGroup.index();
			selectedContent = $(".select-content ul").eq(groupindex);
			selectedGroup.addClass("selected").siblings().removeClass("selected");
			selectedContent.show().siblings().hide();
		});

		$(".select-bg").on("tap", function() { //二级菜单选项hide
			$(this).hide();
			$(".select-content").hide();

			$("body").css("overflow", "auto");
			selectedContent.hide();
			selectedGroup.removeClass("selected");
		});
	}
};
videoFeature.init();