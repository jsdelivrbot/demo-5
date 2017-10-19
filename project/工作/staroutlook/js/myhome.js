$(function() {
	var otherid = localStorage.getItem('otherid');
	
	mui.init();
	(function($) {
		//阻尼系数
		var deceleration = mui.os.ios ? 0.003 : 0.0009;
		$('.mui-scroll-wrapper').scroll({
			bounce: true,
			indicators: false, //是否显示滚动条
			deceleration: deceleration
		});
		$.ready(function() {
			//循环初始化所有上拉加载。
			$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
				$(pullRefreshEl).pullToRefresh({
					up: {
						callback: function() {	
							this.endPullUpToRefresh(false);
							if(myhome.hotNum[myhome.items.index()] < myhome.pages[myhome.items.index()]){
								myhome.hotNum[myhome.items.index()]++;				
								if(myhome.items.index() == 0){
									myhome.load("/star/video/visit/list",{'userId': userId,'token': token,'visitUserId':otherid,'pageNum':myhome.hotNum[myhome.items.index()],'pageSize':10},myhome.items);
								}else if(myhome.items.index() == 1){
									myhome.load("/star/video/share/list",{'userId': userId,'token': token,'visitorUserId':otherid,'pageNum':myhome.hotNum[myhome.items.index()],'pageSize':10},myhome.items);
								}else if(myhome.items.index() == 2){
									myhome.load("/star/user/followed/list",{'userId': userId,'token': token,'visitUserId':otherid,'pageNum':myhome.hotNum[myhome.items.index()],'pageSize':10},myhome.items);
								}else{
									myhome.load("/star/user/fans/list",{'userId': userId,'token': token,'visitUserId':otherid,'pageNum':myhome.hotNum[myhome.items.index()],'pageSize':10},myhome.items);
								}
							}else{
								this.endPullUpToRefresh(true);
							}
						}
					}
				});
			});
		});		
	})(mui);
	
	var myhome = {
		init: function(){
			var _this = this;
			_this.getinfo();
			_this.load("/star/video/visit/list",{'userId': userId,'token': token,'visitUserId':otherid,'pageNum':1},_this.items);
			_this.tabload();
			_this.suspended(0);
		},
		//获取用户信息
		getinfo: function(){
			$.ajax({
			 	url:"/star/user/getVisitInfo",
			 	type:"post",
			 	data: {'userId':userId,'token':token,'visitUserId':otherid},
			 	dataType:"json",
			 	success:function(data){
			 		console.log(data);
			 		switch(data.result){
			 			case "1":
				 			var user = data.data.user;
				 			var html = '';
				 			$("#videoNum").text(user.videoTotal);
				 			$("#forwardNum").text(user.shareTotal);
				 			$("#attentionNum").text(user.followTotal);
				 			$("#fansNum").text(user.fansTotal);
				 			
				 			$('.remyinfo .reImg img').attr('src',user.avatar);
				 			
				 			html += '<div class="headavator"><img src="' + user.avatar + '" />';
				 			
				 			if(user.category == 2||user.category == 3||user.category == 4){
								html += '<i class="iconfont icon-v"></i>';
							}
				 			
				 			html += '</div><p class="name">' + user.name + '</p><p class="enouce">' + user.enounce + '</p>';
				 			
							$('.avator').append(html);
				 			if(user.isOpenedHomepage == false){
				 				html = '<div class="backImg"><div class="backImg-star"><img src="../images/sweet.jpg"/></div><span>肿么办，该用户主页未对外开放</span></div>';
				 				$('#home-swiper').html(html);
				 			}else{
				 				if(otherid != userId){
					 				if(data.data.isFollowed == false){
										html = '<button type="button" class="btn-follow add">+关注</button>';
						 			}else{
						 				html = '<button type="button" class="btn-follow del">取消关注</button>';
						 			}
					 			
					 				$('.avator').append(html);
									$('.avator button').on('click',function(){
										if($(this).hasClass('add')){
											myhome.addfollow();
										}else{
											myhome.cancelfollow();
										}
									});
								}
								
								$("body").on("tap",".tap-share", function() {
									var shareId = $(this).parent().attr("data-id");
									var videoUrl = $(this).parent().attr("data-videoUrl");
									var videoName = $(this).parent().attr("data-videoName");
									var thumbUrl = $(this).parent().attr("data-thumbUrl");
									var userName = $(this).parent().attr("data-uName");
									operation.share(shareId,videoUrl,videoName,thumbUrl,userName);
								});
								$("body").on("click",".tap-comment",function(){
									shareId = $(this).parent().attr("data-id");
									var isOpenedComment = $(this).attr("data-isOpenedComment");
									operation.comment(shareId,isOpenedComment);
								});
								$('body').on("tap",".tap-like", function() {
									var _this = this;
									shareId = $(this).parent().attr("data-id");
									operation.favour(shareId,_this);
								});
					
								$("body").on("tap",".myhome",function(){
									var otherid = $(this).attr("data-id");
									operation.gohome(otherid);
								});
							}
			 				break;
			 			case "200": layer.open({content: '用户名不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
			 	},
			 	error:function(){
					layer.open({content: '请求失败，请重试',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
		 	})
		},
		//添加关注
		addfollow: function(){
			var num = $('#fansNum').text();
			$.ajax({
			 	url:"/star/follow/add",
			 	type:"post",
			 	data: {'userId':userId,'token':token,'followedUserId':otherid},
			 	dataType:"json",
			 	success:function(data){
			 		switch(data.result){
			 			case "1": layer.open({content: '添加关注成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 3});
			 				$('.avator button').removeClass('add').addClass('del').text('取消关注');
			 				$('#fansNum').text(++num);
			 				break;
			 			case "300": layer.open({content: '被关注的用户不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
			 			case "301": layer.open({content: '用户已被关注',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
			 	},
			 	error:function(){
					layer.open({content: '请求失败，请重试',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
		 	})
		},
		//取消关注
		cancelfollow: function(){
			var num = $('#fansNum').text();
			$.ajax({
			 	url:"/star/follow/delete",
			 	type:"post",
			 	data: {'userId':userId,'token':token,'followedUserId':otherid},
			 	dataType:"json",
			 	success:function(data){
			 		switch(data.result){
			 			case "1": layer.open({content: '取消关注成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 3});
			 				$('.avator button').removeClass('del').addClass('add').text('+关注');		 				
			 				$('#fansNum').text(--num);
			 				break;
			 			case "302": layer.open({content: '关注记录不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
			 	},
			 	error:function(){
					layer.open({content: '请求失败，请重试',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
		 	})
		},
		getVideo: function(data,flag){
			var html = '';
			$.each(data.data.list, function(index, ele) {
				var time = ele.createdTime.slice(0,10);
				html += '<div class="reContent"><div class="reHeader"><ul>';
				if(flag == 1){
					html += '<li data-id="'+ ele.userId +'"><img src="'+ ele.uAvatar +'" />';
					if(ele.uCategory == 2||ele.uCategory == 3||ele.uCategory == 4){
						html += '<i class="iconfont icon-v"></i>';
					}
					html += '</li><li><span class="name">'+ ele.uName +'</span><span class="yo-ico">'+ time +'</span></li>';
				
				}else if(flag == 2){
					
					html += '<li data-id="'+ ele.userId +'" class="myhome"><img src="'+ ele.fromUserAvatar +'" />';
					if(ele.uCategory == 2||ele.uCategory == 3||ele.uCategory == 4){
						html += '<i class="iconfont icon-v"></i>';
					}
					html += '</li><li><span class="name">'+ ele.fromUserName +'</span><span class="yo-ico">'+ time +'</span></li>';
				}
				html += '</ul>\
							</div>\
							<div class="reImg">\
								<video poster="'+ ele.thumbUrl +'"  src="'+ ele.videoUrl +'" width="100%" height="100%" style="position: relative;">当前浏览器不支持 video直接播放，点击这里下载视频</video>\
								<div class="video_Btnplaye"><img src="../images/video_playerbg.png"/></div>\
								<p class="reMess">'+ ele.name +'</p>\
							</div>';
				
				if(flag == 1){
					html += '<ul class="reShare"  data-uName="'+ ele.uName +'" data-thumbUrl="'+ ele.thumbUrl +'" data-videoUrl="'+ ele.videoUrl +'" data-videoName="'+ ele.name +'" data-id="'+ ele.id +'">';
				}else if(flag == 2){
					html += '<ul class="reShare"  data-uName="'+ ele.fromUserName +'" data-thumbUrl="'+ ele.thumbUrl +'" data-videoUrl="'+ ele.videoUrl +'" data-videoName="'+ ele.name +'" data-id="'+ ele.id +'">';
				}
				
				html += '<li class="tap-share"><a class="share" href="#middlePopover"><i class="iconfont share">&#xe60a;</i>&nbsp;&nbsp;分享</a></li>';
				
				if(ele.isOpenedComment == false || ele.countComment == "0"){
					html += '<li class="tap-comment" data-isOpenedComment="'+ ele.isOpenedComment +'"><i class="iconfont">&#xe610;</i>&nbsp;&nbsp;评论</li>';
				}else{
					html += '<li class="tap-comment" data-isOpenedComment="'+ ele.isOpenedComment +'"><i class="iconfont">&#xe610;</i>&nbsp;&nbsp;'+ ele.countComment +'</li>';
				}
				
				if(ele.isFavour == "1"){
				    html +=	'<li class="tap-like"><i class="iconfont relike dianzan" data-id="'+ ele.id +'">&#xe60b;</i>&nbsp;&nbsp;<span>'+ ele.hot +'</span></li>';
				}else{
					html += '<li class="tap-like"><i class="iconfont dianzan" data-id="'+ ele.id +'">&#xe60b;</i>&nbsp;&nbsp;<span>'+ ele.hot +'</span></li>';
				}
				html += '</ul></div>';
			});
			return html;
		},
		suspended: function(num){
			// 视频的播放暂停
			$("body").on("tap",".reImg",function(){
				$(".reImg video").each(function(index,obj){
					$(obj).removeAttr("controls").get(0).pause();
				});
				$(".video_Btnplaye").each(function(index,obj){
					$(obj).show();
				});
				
				$(this).find(".video-thrum,.video_Btnplaye").hide().end().find("video").attr("controls","controls").addClass("activeAudio").get(0).play();
				
				audioOffsetHeight = $(".activeAudio").offset().top;
				scrolTopStar = -parseInt($(".mui-scroll").eq(num).css("transform").match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\-?\d+)\)/)[1]);
				scrollHeight = $(".mui-scroll-wrapper").eq(num).height();
			});
			var headerHeight = $(".remyinfo").height() + $("#home-hot-nav").height();
			window.onscroll = function(){
				if($(".activeAudio").size() != 0){
					var scrolTopNow = -parseInt($(".mui-scroll").eq(num).css("transform").match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\-?\d+)\)/)[1]);
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
		},
		getPerson: function(data){
			var html = '';
			$.each(data.data.list, function(index, ele) {
				html += '<li data-id="'+ ele.id +'" class="myhome"><img src="' + ele.avatar + '" />';
				
				if(ele.category == 2||ele.category == 3||ele.category == 4){
					html += '<i class="iconfont icon-v"></i>';
				}	
				
				html += '<span class="reName">' + ele.name + '</span></li>';
			});
			return html;
		},
		load: function(postUrl,postData,items){
			//var pageNum = pageNum==undefined?1:pageNum;
			var _this = this;
			$.ajax({
				type:"post",
				url:postUrl,
				data: postData,
				dataType:"json",
				success: function(data){
					_this.pages[items.index()] = data.data.pages;
					switch(data.result){
						case "1":				
							if(items.index() == 0){
								items.find('.recommend').append(_this.getVideo(data,1));
							}else if(items.index() == 1){
								items.find('.recommend').append(_this.getVideo(data,2));
							}else if(items.index() == 2){
								items.find('.recommend').append(_this.getPerson(data));
							}else{
								items.find('.recommend').append(_this.getPerson(data));
							}		
							break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
				}
			
			});
		},
		tabload:function(){
			var _this = this;
			document.getElementById('home-swiper2').addEventListener('slide', function(e) {
				switch(e.detail.slideNumber){
					case 0:
						_this.items = $('#item1mobile');
						_this.suspended(0);

						break;
					case 1:
						_this.items = $('#item2mobile');
						if(_this.items.find(".recommend").html() == ""){
							myhome.load("/star/video/share/list",{'userId': userId,'token': token,'visitorUserId':otherid,'pageNum':1},_this.items);
						}
						_this.suspended(1);

						break;
					case 2:
						_this.items = $('#item3mobile');
						if(_this.items.find(".recommend").html() == ""){
							myhome.load("/star/user/followed/list",{'userId': userId,'token': token,'visitUserId':otherid,'pageNum':1},_this.items);
						}
						break;
					case 3:
						_this.items = $('#item4mobile');
						if(_this.items.find(".recommend").html() == ""){
							myhome.load("/star/user/fans/list",{'userId': userId,'token': token,'visitUserId':otherid,'pageNum':1},_this.items);
						}
						break;
				}
			});
		},
		items: $('#item1mobile'),
		hotNum: [1,1,1,1],
		pages:[]
	}
	myhome.init();		
});