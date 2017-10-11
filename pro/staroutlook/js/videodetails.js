$(function() {
	var userId = localStorage.getItem('userId'),
		token = localStorage.getItem('token');
	var videoId = localStorage.getItem('videoId');
	var videoUserId // 视频用户ID
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	
	var videodetails = {
		init: function() {
			var _this = this;
			_this.getinfo();
		},
		//获取视频信息
		getinfo: function() {
			var _this = this;
			$.ajax({
				url: "/star/video/getInfo",
				type: "post",
				data: {
					'userId': userId,
					'token': token,
					'videoId': videoId
				},
				dataType: "json",
				success: function(data) {
					console.log(data);
					switch(data.result) {
						case "1":
							var user = data.data.user,
							    videoinfo = '',
							    userinfo = '',
							    userList = '',
							    pushList = '',
								userName = data.data.video.uName,
								videoName = data.data.video.name,
								videoUrl = data.data.video.videoUrl,
								thumbUrl = data.data.video.thumbUrl;
							videoUserId = data.data.video.userId;
								
							//视频
							videoinfo += '<video src="'+ data.data.video.videoUrl +'" width="100%" height="100%" autoplay="autoplay" style="position: relative;" controls="controls" loop="loop">\
											当前浏览器不支持 video直接播放，点击这里下载视频\
										  </video>';
							$(".reImg").append(videoinfo);
							
							//标题
							$(".videoTitle").html(videoName);
							
							//用户信息
							userinfo += '<li><div class="headavator"><img data-id="'+ user.id +'" data-open="'+ user.isOpenedHomepage +'" class="myhome" src="' + user.avatar + '" />';
							
							if(user.category == 2||user.category == 3||user.category == 4){//判断是否加V
								userinfo += '<i class="iconfont icon-v"></i>';
							}
							
							userinfo += '</div></li><li><div class="nes"><p>' + user.name + '</p><p>' + user.enounce + '</p></div></li><li class="avator">';
							
							if(data.data.isFollowed == false) {
								userinfo += '<button type="button" class="btn-follow add" id="followBtn">+关注</button></li>';
							} else {
								userinfo += '<button type="button" class="btn-follow del" id="followBtn">取消</button></li>';
							}
							$('.user-info ul').append(userinfo);
							
							// 评论/点赞信息				
							var html = '<li class="tap-share"><a class="share" href="#middlePopover"><i class="iconfont">&#xe60a;</i>&nbsp;&nbsp;分享</a></li>';
							if(data.data.video.isOpenedComment == false || data.data.video.countComment == "0"){
								html += '<li class="tap-comment" data-isOpenedComment="'+ data.data.video.isOpenedComment +'"><i class="iconfont">&#xe610;</i>&nbsp;&nbsp;评论</li>';
							}else{
								html += '<li class="tap-comment" data-isOpenedComment="'+ data.data.video.isOpenedComment +'"><i class="iconfont">&#xe610;</i>&nbsp;&nbsp;'+ data.data.video.countComment +'</li>';
							}
							
							if(data.data.isFavour == 0) {
								html += '<li class="tap-like"><i class="iconfont dianzan">&#xe60b;</i>&nbsp;&nbsp;<span>' + data.data.video.hot + '</span></li>';
							} else {
								html += '<li class="tap-like"><i class="iconfont relike dianzan">&#xe60b;</i>&nbsp;&nbsp;<span>' + data.data.video.hot + '</span></li>';
							}
							$('.reShare').append(html);

							//热门视频
							$.each(data.data.userVideoList, function(obj, vid) {
								userList += '<li data-id="' + vid.id + '"><div class="video-thumb"><img src="' + vid.thumbUrl + '" /></div><p>' + vid.name + '</p><p>';
								if(vid.isFavour == 0){
									userList += '<span class="iconfont" data-id="'+ vid.id +'">&#xe60b;</span>';
								}else{
									userList += '<span class="iconfont rehear" data-id="'+ vid.id +'">&#xe60b;</span>';
								}
								userList += '&nbsp;<span>' + vid.hot + '</span></p></li>';
							});

							$('.hot-video ul').append(userList);

							//推荐
							$.each(data.data.pushVideoList, function(obj, vid) {
								pushList += '<li class="clear" data-id="' + vid.id + '">\
												<div class="video-thumb fl"><img src="' + vid.thumbUrl + '" /></div>\
												<div class="fl">\
													<p class="user-name"><span>' + vid.name + '</span></p>\
													<p class="hot-num">';
								if(vid.isFavour == 0){
									pushList += '<span class="iconfont" data-id="'+ vid.id +'">&#xe60b;</span>';
								}else{
									pushList += '<span class="iconfont rehear" data-id="'+ vid.id +'">&#xe60b;</span>';
								}
								pushList += '&nbsp;<span>' + vid.hot + '</span></p></div><span class="fr">' + vid.auditTime.substring(0, 10) + '</span></li>';
							});

							$('.recommend-video ul').append(pushList);


							//切换他的热门视频
							$('.hot-video .video-thumb').click(function() {
								var videoId = $(this).parent().attr('data-id');
								$.ajax({
									url: "/star/video/getInfo",
									type: "post",
									data: {
										'userId': userId,
										'token': token,
										'videoId': videoId
									},
									dataType: "json",
									success: function(data) {
										var video = data.data.video;
										localStorage.setItem('videoId',video.id);
										$('.reImg video').attr("src",video.videoUrl);
										$(".videoTitle").text(video.name);
										
										var html = '<li class="tap-share"><a class="share" href="#middlePopover"><i class="iconfont">&#xe60a;</i>&nbsp;&nbsp;分享</a></li>';
										if(video.isOpenedComment == false || video.countComment == "0"){
											html += '<li class="tap-comment" data-isOpenedComment="'+ video.isOpenedComment +'"><i class="iconfont">&#xe610;</i>&nbsp;&nbsp;评论</li>';
										}else{
											html += '<li class="tap-comment" data-isOpenedComment="'+ video.isOpenedComment +'"><i class="iconfont">&#xe610;</i>&nbsp;&nbsp;'+ video.countComment +'</li>';
										}
										
										if(data.data.isFavour == 0) {
											html += '<li class="tap-like"><i class="iconfont dianzan">&#xe60b;</i>&nbsp;&nbsp;<span>' + video.hot + '</span></li>';
										} else {
											html += '<li class="tap-like"><i class="iconfont relike dianzan">&#xe60b;</i>&nbsp;&nbsp;<span>' + video.hot + '</span></li>';
										}
										$('.reShare').html(html);
										
									}
								})
								
							});
							
							//切换推荐视频
							$('.recommend-video li').click(function() {
								videoId = $(this).attr('data-id');
								console.log(videoId);
								localStorage.setItem('videoId',videoId);
								window.location.href = "../html/videodetails.html";
								
							});
							
							//关注
							$('.avator button').on('click', function() {
								if($(this).hasClass('add')) {
									videodetails.addfollow();
								} else {
									videodetails.cancelfollow();
								}
							});
							
							
							$('body').on("tap",".tap-share", function() {
								var videoId = localStorage.getItem("videoId");
								operation.share(videoId,videoUrl,videoName,thumbUrl,userName);
							});
							
							$("body").on("click",".tap-comment",function(){
								var videoId = localStorage.getItem("videoId");
								operation.comment(videoId,$(this).attr("data-isOpenedComment"));
							});
							
							$('body').on("tap",".tap-like", function() {
								var videoId = localStorage.getItem("videoId");
								var _this = this;
								operation.favour(videoId,_this);
							});

							$(".myhome").on("tap",function(){
								var otherid = $(this).attr("data-id");
								var isopen = $(this).attr("data-open");
								operation.gohome(otherid,isopen);
							});
							
							$(document).click(function(e){
								$(".messHeader").css("display","none");
								if(e.target.nodeName.toLowerCase() == "video"){
									//点击显示"返回"和视频标题
									$(".messHeader").css("display","flex");
									
								}else if($(e.target).hasClass("return")){
									location.href=history.go(-1);
								}
							});														
							break;
						default:
							layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							break;
					}
				},
				error: function() {
					layer.open({content: '请求失败，请重试',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			})
		},
		//添加关注
		addfollow: function() {
			var _this = this;
			$.ajax({
				url: "/star/follow/add",
				type: "post",
				data: {
					'userId': userId,
					'token': token,
					'followedUserId': videoUserId
				},
				dataType: "json",
				success: function(data) {
					console.log(data);
					switch(data.result) {
						case "1":
							$('.avator button').removeClass('add').addClass('del').text('取消');
							break;
						default:
							layer.open({
								content: data.msg,
								style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
								time: 2
							});
							break;
					}
				},
				error: function() {
					layer.open({
						content: '请求失败，请重试',
						style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
						time: 2
					});
				}

			})
		},
		//取消关注
		cancelfollow: function() {
			var _this = this;
			$.ajax({
				url: "/star/follow/delete",
				type: "post",
				data: {
					'userId': userId,
					'token': token,
					'followedUserId': videoUserId
				},
				dataType: "json",
				success: function(data) {
					switch(data.result) {
						case "1":
							/*layer.open({
								content: '取消关注成功',
								style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
								btn: ['确定']
							});*/
							$('.avator button').removeClass('del').addClass('add').text('+关注');
							break;
						case "302":
							layer.open({
								content: '关注记录不存在',
								style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
								time: 2
							});

							break;
						default:
							layer.open({
								content: '网络出错',
								style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
								time: 2
							});
							break;
					}
				},
				error: function() {
					layer.open({
						content: '请求失败，请重试',
						style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
						time: 2
					});
				}
			})
		},
		
	}
	videodetails.init();
})


