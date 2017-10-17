$(document).ready(function() {
	if(sessionStorage.getItem("unRead") == 1){
		$("#myinfo").append("<span class='unRead'><span>");
	}
	mui('.mui-bar').on('tap', 'a', function() {
		mui.openWindow({
			url: this.href,
			styles: {
				top: 0,
				bottom: '50px',
				bounce: 'vertical'
			}
		})
	});

	var active = {
		init: function(){
			this.videolist();
		},
		videolist: function(){
			mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					up: {
						auto: true,
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
				setTimeout(function() {
					count++;
					ajax(count);
				}, 150);
			}
			//触发下拉时出发ajax
			var ajax = function(count) {
				mui.ajax('/star/dynamic/list', {
					data: {
						'userId': userId,
						'token': token,
						'pageNum': count,
						'pageSize': 10
					},
					dataType: 'json',
					type: 'post',
					async: false,
					success: function(data) {
						console.log(data)
						
						if(data.result == 1) {
							if(data.data.list.list.length == 0){
								$(".recommend").append('<div class="backImg"><div class="backImg-star"><img src="../images/sweet.jpg"/></div><span>关注才会有动态哦！</span></div>');
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
								$('.mui-pull-caption-nomore').hide();
							}else if(count > data.data.list.pages) {
								count = data.data.list.pages;
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
							}else {
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
								var videoList = '';
								mui.each(data.data.list.list, function(obj, video) {
									videoList += '<div class="reContent">\
												<div class="user-info"><a class="user-thumb fl gohome" data-userId="' + video.fromUserId + '"><img src="' + video.uAvatar + '" />';
														
									if(video.uCategory == 2||video.uCategory == 3||video.uCategory == 4){
										videoList += '<i class="iconfont icon-v"></i>';
									}	
									
									videoList +='</a></li><span class="user-name">' + video.fromUserName + '</span><span class="fr">' + video.createdTime.substring(0, 10) + '</span>\
												</div>\
												<div class="user-video">\
													<video poster="'+ video.thumbUrl +'" src="'+ video.videoUrl +'" width="100%" height="100%" style="position: relative;">当前浏览器不支持 video直接播放，点击这里下载视频</video>\
													<div class="video_Btnplaye"><img src="../images/video_playerbg.png"/></div>\
													<p class="video-name">' + video.name + '</p>\
												</div>\
												<ul class="reShare" data-id="' + video.id + '" data-fromUserName="'+ video.fromUserName +'" data-thumbUrl="' + video.thumbUrl + '" data-videoUrl="' + video.videoUrl + '" data-videoName="' + video.name + '">\
													<li class="tap-share"><a class="share" href="#middlePopover"><i class="iconfont share">&#xe60a;</i>分享</a></li>';
									
									if(video.openedComment == false || video.countComment == "0"){
										videoList += '<li class="tap-comment" data-isOpenedComment="'+ video.openedComment +'"><a class="comment" href="javascript:void(0)"><i class="iconfont iconfont_comment">&#xe610;</i>评论</a></li>';
									}else{
										videoList += '<li class="tap-comment" data-isOpenedComment="'+ video.openedComment +'"><a class="comment" href="javascript:void(0)"><i class="iconfont iconfont_comment">&#xe610;</i>'+ video.countComment +'</a></li>';
									}
									
									if(video.isFavour == "1") {
										videoList += '<li class="tap-like"><i class="iconfont dianzan relike">&#xe60b;</i><span>' + video.hot + '</span></li></ul></div>';
									} else {
										videoList += '<li class="tap-like"><i class="iconfont dianzan">&#xe60b;</i><span>' + video.hot + '</span></li></ul></div>';
									}
								});
								$(".recommend").append(videoList);
								
								active.suspended();
								$('.tap-share').on("tap", function() {
									var shareId = $(this).parent().attr("data-id");
									var videoUrl = $(this).parent().attr("data-videoUrl");
									var videoName = $(this).parent().attr("data-videoName");
									var thumbUrl = $(this).parent().attr("data-thumbUrl");
									var userName = $(this).parent().attr("data-fromUserName");
									operation.share(shareId,videoUrl,videoName,thumbUrl,userName);
								});
								$(".tap-comment").on("tap",function(){
									shareId = $(this).parent().attr("data-id");
									var isOpenedComment = $(this).attr("data-isOpenedComment");
									operation.comment(shareId,isOpenedComment);
								});
								$('.tap-like').on("tap", function() {
									var _this = this;
									shareId = $(this).parent().attr("data-id");
									operation.favour(shareId,_this);
								});
	
								$(".gohome").on("tap",function(){
									var otherid = $(this).attr("data-userId");
									operation.gohome(otherid);
								});
							}
						} else {
							layer.open({content: '获取数据失败!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
						}
					},
					error: function() {
						layer.open({content: '请求失败!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}
				})
			};
			
		},
		suspended: function(){
			
			// 视频的播放暂停
			$(".user-video").on("tap",function(){
				$(".user-video video").each(function(index,obj){
					$(obj).removeAttr("controls").get(0).pause();
				});
				$(".video_Btnplaye").each(function(index,obj){
					$(obj).show();
				});
				
				$(this).find(".video-thrum,.video_Btnplaye").hide().end().find("video").attr("controls","controls").addClass("activeAudio").get(0).play();
				
				audioOffsetHeight = $(".activeAudio").offset().top;
				scrolTopStar = -parseInt($(".mui-scroll").css("transform").match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\-?\d+)\)/)[1]);
				scrollHeight = $(".mui-scroll-wrapper").height();
			});
			var headerHeight = $(".mui-bar-nav").height();
			var clientHeight = $(".mui-scroll-wrapper").height();
			window.onscroll = function(){
				if($(".activeAudio").size() != 0){
					var scrolTopNow = -parseInt($(".mui-scroll").css("transform").match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\-?\d+)\)/)[1]);
					var slip = audioOffsetHeight - headerHeight + $(".activeAudio").get(0).offsetHeight;
					if(scrolTopNow - scrolTopStar>slip){
						$(".activeAudio").attr("controls","controls").removeClass("activeAudio").get(0).pause();
						$(".video_Btnplaye").show();
					}else if(scrolTopStar - scrolTopNow>scrollHeight - slip + $(".activeAudio").get(0).offsetHeight){
						$(".activeAudio").attr("controls","controls").removeClass("activeAudio").get(0).pause();
						$(".video_Btnplaye").show();
					}					
				}
			}
		}
	}
	active.init();
});






