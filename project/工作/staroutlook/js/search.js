$(function() {
	var userId = localStorage.getItem('userId'),
		token = localStorage.getItem('token');
	
	var find = {
		init: function() {
			var _this = this;
			_this.discover();
			_this.course();
			_this.other();
			_this.goEvaluation();
			if(sessionStorage.getItem("unRead") == 1){
				$("#myinfo").append("<span class='unRead'><span>");
			}
		},
		discover: function() {
			$.ajax({
				type: "post",
				url: "/star/discover/list",
				data:{userId:userId,token:token},
				dataType: "json",
				success: function(data) {
					switch(data.result) {
						case "1":
						var picList = '';
						$.each(data.data.matchList, function(index, ele) {
							picList += '<div class="swiper-slide"><a href="' + ele.linkUrl + '"><img src="' + ele.imageUrl + '" /></a></div>';
						});

						$(".swiper-wrapper").append(picList);
						
						if(data.data.matchList.length !== 1){
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
						
					
						/*	var matchList = '';
							var videoList = '';
							$.each(data.data.matchList, function(obj, match) {
								matchList += '<li><a href="' + match.linkUrl + '"><img src="' + match.imageUrl + '" /></a></li>';
							});
							$.each(data.data.videoList, function(obj, video) {
								videoList += '<div class="reContent">\
									<div class="reHeader">\
										<ul>\
											<li data-id="' + video.userId + '"><a  class="myhome"><img src="' + video.uAvatar + '" /></a></li>\
											<li>\
												<p class="reName"><span>' + video.uName + '</span><span class="yo-ico">' + video.auditTime.substring(0, 10) + '</span></p>\
											</li>\
										</ul>\
									</div>\
									<div class="reImg">\
										<video src="' + video.videoUrl + '" width="100%" height="100%" autobuffer="" autoplay="autoplay" style="position: relative;">当前浏览器不支持 video直接播放，点击这里下载视频</video>\
										<p class="reMess">' + video.name + '</p>\
									</div>\
									<ul class="reShare">\
										<li class="tap-share" data-thumbUrl="' + video.thumbUrl + '" data-videoUrl="' + video.videoUrl + '" data-videoName="' + video.name + '" data-id="' + video.id + '"><a class="share" href="#middlePopover"><i class="iconfont share">&#xe60a;</i>分享</a></li>\
										<li class="tap-comment"><i class="iconfont">&#xe610;</i>评论</li>';
								if(video.isFavour == "1") {
									videoList += '<li class="tap-like"><i class="iconfont dianzan relike">&#xe60b;</i><span>' + video.hot + '</span></li></ul></div>';
								} else {
									videoList += '<li class="tap-like"><i class="iconfont dianzan">&#xe60b;</i><span>' + video.hot + '</span></li></ul></div>';
								}
							});
							$('.mSearch ul').append(matchList);
							$('.recommend').append(videoList);*/
							//明星榜
	//						var starList = '';
	//						$.each(data.data.starList, function(obj, star) { 
	//							starList += '<li><span>' + star.name + '</span><div class="gomyhome"><img src="' + star.avatar + '" /></div></li>';
	//						});
	//						$('.mStarList').append(starList);
							
							
							$('.myhome').on('click', function() {
								var otherid = $(this).parent('li').attr("data-id");
								$.ajax({
									type:"post",
									url:"/star/user/getVisitInfo",
									data: {'userId':userId,'token':token,'visitUserId':otherid},
									success: function(data){
										if(data.data.user.isOpenedHomepage == false){
											layer.open({content: '用户未开启主页!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
										}else if(otherid != localStorage.getItem('otherid')){
											localStorage.setItem('otherid', otherid);
											window.location.href = '../html/myhome.html';
										}
									}
								});
							})
							$('.tap-comment').on('click', function() {
								layer.open({
									content: '该视频未开启评论!',
									style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
									time: 2
								});
							})
							break;
						default:layer.open({content: '网络出错，请重试',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});break;
					}
				},
				error: function() {
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		},
		course: function(){
			$.ajax({
				type: "post",
				url: "/star/course/images",
				data:{userId:userId,token:token},
				dataType: "json",
				success: function(data) {
					
					$('.left img').attr('src',data.data.find_image_test);
					$('.physical_course img').attr('src',data.data.find_image_course);
					$('.training_agency img').attr('src',data.data.find_image_agency);
				},
				error: function(){
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			})	
		},
		other: function() {
			$('.btn-search').on('tap',function() {
				console.log('111');
				window.location.href = '../html/menu.html';
			});
			var menu = null,
				main = null;
			var showMenu = false;
			mui('.mui-scroll-wrapper').scroll({
				indicators: false, //是否显示滚动条
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
			mui('.mui-bar').on('tap', 'a', function() {
					var id = this.getAttribute('href');
					var href = this.href;
					mui.openWindow({
						id: id,
						url: this.href,
						styles: {
							top: 0,
							bottom: '50px',
							bounce: 'vertical'
						}
					})
				})
//			点击进入明星榜
//			$('.gostar').click(function() {
//				window.location.href = '../html/star.html';
//			});
			
		},
		goEvaluation: function(){
			$(".left").on("click",function(){
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
							    	location.href = "../html/matchinfo.html";
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
								    	localStorage.setItem("goBack","../html/search.html");
								    	location.href = "../html/test_explain.html";
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
			})
			
		}
	}
	find.init();
})