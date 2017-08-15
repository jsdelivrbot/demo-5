/*接口调用*/
var IndexModel = {
	//获得直播视频的地址
	is_pay: function() {
		var self = this;

		$.ajax({
			type: "get",
			dataType: 'jsonp',

			url: ajaxUrl.signUp + "?id=" + itegid,
			success: function(data) {
				var data = IndexView.parseJson(data);
				if(data.status == 200) {
					IndexView.videoPlay(data.address, false);
					IndexModel.m3u8 = data.address;

					if(data.count_down.day) {

						$(".J_day").text(data.count_down.day);
						$(".J_hour").text(data.count_down.hour);
						$(".J_minute").text(data.count_down.minute);
						$(".J_second").text(data.count_down.second);
						$(".J_subscribe").show();
					} else {
						$(".J_subscribe").hide();
					}
					if(data.is_subscribe == 1) {
						$(".J_reserve").addClass("gray-btn").attr("disabled", "disabled").text("已预约").removeClass("J_reserve");
					}
				} else if(data.status == 502) {
					var url = "/introduce.php?id=" + itegid; //跳转到付费页
					window.location.href = url;
				} else if(data.status == 503) {
					var url = "/passwd.php?id=" + itegid; //跳转到口令页
					window.location.href = url;
				}
			}
		});
	},
	pageOnload: function() {
		var from = IndexView.getQueryString("from") || '';
		$.ajax({
			type: "get",
			dataType: 'jsonp',

			url: ajaxUrl.view + "?id=" + itegid + "&from=" + from
		});
	},
	m3u8: "",
	isChatFirstTime: true,
	isLiveMsgFirstTime: true,
	
	//获得在线人数、消息数、(被)打赏人头像、打赏数(组件右上角气泡数字)
	getNumbersUrl: ajaxUrl.getNumbers,
	//直播过程中走静态化接口不需要跨域
	jsonp: "jsonp",
	get_number: function() {
		var ele = '.live-num';

		$.ajax({
			type: "get",
			dataType: IndexModel.jsonp,

			url: IndexModel.getNumbersUrl + "?id=" + itegid + "&rand=" + Math.random(),
			success: function(data) {
				var data = IndexView.parseJson(data);
				console.log("uuuu");
				console.log(data);
				if(data.status == 200) {
//					alert(0)
//					alert(data.live_state)
					//直播状态
					if(data.live_state == "回看") {
						IndexModel.jsonp = "jsonp";
						$(".live-state-box").addClass("back");
						IndexModel.getNumbersUrl = ajaxUrl.getNumbers;

					} else {
						$(".live-state-box").removeClass("back");
						IndexModel.jsonp = "json";
						IndexModel.getNumbersUrl = ajaxUrl.liveGetNumbers;
					}
					if(data.live_state == "直播") {
						$('#videoBtn').show();
					} else {
						$('#videoBtn').hide();
					}
					$('.J_liveState').html(data.live_state);
					
					//气泡s
					if($('.J_chatNum').length > 0) {
						IndexView.bubbleAction('.J_chatNum', data.message);
						$('.J_chatNum').text(data.message);
					}
					if($('.J_rewardNum').length > 0) {
						IndexView.bubbleAction('.J_rewardNum', data.reward_number);
						$('.J_rewardNum').text(data.reward_number);
					}
					if($('.J_voteNum').length > 0) {
						IndexView.bubbleAction('.J_voteNum', data.vote);
						$('.J_voteNum').text(data.vote);
					}
					//气泡e
					$(ele).html(data.online); //在线人数
					// 聊天和图文直播的最新消息id--start
					if($('.chat').length > 0) {
						var chatLastId = 0;
						if($(".normal-chat .container-left").length > 0) {
							chatLastId = $(".normal-chat .container-left").first().data("id");
						}
						if(IndexModel.isChatFirstTime) {
							IndexModel.droploadChatMsg(); //添加聊天数据及加载更多
							IndexModel.isChatFirstTime = false;
						} else if(chatLastId != data.mes_id || IndexModel.chatTopLastTime != data.mes_toptime) {
							IndexModel.updateChatMsg();
						}
					}
					if($('.section').length > 0) {
						var liveMsgLastId = 0;
						if($(".normal-section .container-left").length > 0) {
							liveMsgLastId = $(".normal-section .container-left").first().data("id");
						}
						if(IndexModel.isLiveMsgFirstTime) {
							IndexModel.loadLiveMsg('.section'); //添加直播数据
							IndexModel.isLiveMsgFirstTime = false;
						} else if(liveMsgLastId != data.host_id || IndexModel.liveMsgTopLastTime != data.host_toptime) {
							IndexModel.loadLiveMsg('.section'); //添加直播数据
						}
					}
					// 聊天和图文直播的最新消息id--end
				}
			}
		});
	},
	rewardPhotos: [],
	get_rewardInfo: function() {

		$.ajax({
			type: "get",
			dataType: 'jsonp',

			url: ajaxUrl.getRewardInfo + "?id=" + itegid + "&rand=" + Math.random(),
			success: function(data) {
				var data = IndexView.parseJson(data),
					photos = data.photos, //打赏人头像
					rewardImgbox = '';
				if(data.status == 200) {
					$('.J_rewardPerNum').text(data.number); //打赏弹框上的打赏人数
					if(photos.length > 0) {
						if(IndexModel.rewardPhotos.length != photos.length) {
							for(var i = 0; i < photos.length; i++) {
								rewardImgbox += '<div class="img-box"><img src="' + photos[i].photos + '" alt=""></div>';
							};
							$(".rewardbox .reward-imgbox").html(rewardImgbox);
						} else {
							IndexModel.rewardPhotos = photos;
						}
					}
					if(data.number==0){
						$(".rewardbox .reward-imgbox .img-box").hide();
					}
				}
			}
		});
	},
	/*加载视频片段*/
	loadFragData: function() {
		var ele = ".fragment";
		var ajaxData = [];

		$.ajax({
			type: "get",
			dataType: 'jsonp',

			url: ajaxUrl.getVideoList + "?id=" + itegid,
			success: function(d) {
				var d = IndexView.parseJson(d);
				if(d.status == 200) {
					ajaxData = d.result.list;
					if(ajaxData.length <= 0) {
						IndexView.loadFrag(false);
					} else {
						IndexView.loadFrag(true);
						var result = '';
						var haveFragments = $(".fragment").find(".fragments"),
							haveFragmentsLen = haveFragments.length;
						if(haveFragmentsLen > 0) {
							var myData = ajaxData;
							for(var j = 0; j < ajaxData.length; j++) {
								for(var i = 0; i < haveFragmentsLen; i++) {
									if(haveFragments.eq(i).attr("data-url") == ajaxData[j].url) {
										myData.splice(j, 1);
									}
								}
							}
							for(var i = 0; i < myData.length; i++) {
								// result+='<div class="fragments" data-url="'+myData[i].url+'"><div class="fragments-title"><span>·</span><span>'+myData[i].title+'</span></div><img src="'+
								//         myData[i].photo+'" alt=""><div class="fragment-play"></div><div class="fragments-bg "></div></div>';
								// myData[i].title
								result += '<div class="fragments" data-url="' + myData[i].url + '" data-cover="' + myData[i].photo + '"><p>' + myData[i].title + '</p></div>';
							}
							$(ele).find(".fragment-list").append(result);

						} else {
							for(var i = 0; i < ajaxData.length; i++) {
								// result+='<div class="fragments" data-url="'+ajaxData[i].url+'"><div class="fragments-title"><span>·</span><span>'+ajaxData[i].title+'</span></div><img src="'+
								//                 ajaxData[i].photo+'" alt=""><div class="fragment-play"></div><div class="fragments-bg "></div></div>';
								result += '<div class="fragments" data-url="' + ajaxData[i].url + '" data-cover="' + ajaxData[i].photo + '"><p>' + ajaxData[i].title + '</p></div>';
							}
							$(ele).find(".fragment-list").html(result);

						}
						//计算宽度
						IndexModel.setFragmentWidth('.fragment-list');
					}
				}
				
			}
		});
	},
	setFragmentWidth: function(ele){
		var _width = 0 ; 
		var allFragments = $(ele+" .fragments") ;//$(".fragment-list .fragments") 
		$.each(allFragments, function(ix,va) {
			console.log($(va).outerWidth(true));
		});
		console.log(allFragments.length);
		for(var m=0;m<allFragments.length;m++){
			console.log(allFragments.eq(m).outerWidth(true));
			
			_width += allFragments.eq(m).outerWidth(true)+1;
		}
		$(".fragment-list").width(_width);
	},
	/* 获取当前的投票值 */
	getVoteData: function(ele) {
		var checkedList = $(ele).find('.checked'),
			value = [];
		for(var i = 0; i < checkedList.length; i++) {
			value.push($(checkedList[i]).attr('data-value'));
		};
		return value.join(",");
	},
	/* 点击右侧投票图标 */
	voteBtnAction: function(isFirstTime) {

		$.ajax({
			type: "get",
			dataType: 'jsonp',

			url: ajaxUrl.getVoteList + "?id=" + itegid,
			success: function(d) {
				var d = IndexView.parseJson(d);
				if(d.status == 200) {
					var data = d.result;
					if(data) {
						var list = data.list,
							imageList = data.avatar;
					}
					// 已投票 且 后台配置可显示投票结果
					if(data.type == 1 && data.is_show == 1) {
						$(".vote-resultbox .J_vote-sum").text(data.number);
						var lists = '',
							imageLists = '';
						for(var i = 0; i < list.length; i++) {
							lists += '<div class="vote-r-center-item">' +
								'<span class"vote-item-name">' + list[i].option + '</span>' +
								'<div class="loader-container"><span style="width:' + list[i].number + '"></span></div>' +
								'<span class="loader-num">' + list[i].number + '</span>' +
								'</div>';
						}
						for(var i = 0; i < imageList.length; i++) {
							imageLists += '<div class="img-box"><img src="' + imageList[i] + '" alt=""></div>';
						}
						$(".vote-resultbox").find(".vote-r-center").html(lists);
						$(".vote-resultbox").find(".reward-imgbox").html(imageLists);
						IndexView.popWinIsShow(".vote-resultbox", true);
					} else if(isFirstTime) {
						alert("投票成功");
					} else { //1.未投票 2.已投票 且 后台配置不显示投票结果
						$(".vote-selectbox .J_vote-s-title").text(data.title);
						$(".vote-selectbox .J_vote-sum").text(data.number);

						if(data.chose == 1) {
							$(".vote-selectbox .vote-s-center").attr("data-checkbox", "checkbox");
						} else {
							$(".vote-selectbox .vote-s-center").attr("data-checkbox", "radio");
						}
						var lists = '',
							imageLists = '';
						for(var i = 0; i < list.length; i++) {
							lists += '<div class="vote-s-center-item"><div class="input-box not" data-value="' + list[i].id + '"><div class="input"></div></div><span>' + list[i].option + '</span></div>'
						}
						for(var i = 0; i < imageList.length; i++) {
							imageLists += '<div class="img-box"><img src="' + imageList[i] + '" alt=""></div>';
						}
						$(".vote-selectbox").attr("data-themeid", data.id);
						$(".vote-selectbox").find(".vote-s-center").html(lists);
						$(".vote-selectbox").find(".vote-s-imgbox").html(imageLists);
						IndexView.popWinIsShow(".vote-selectbox", true);
					}
				} else if(d.status == 300) {
					IndexView.popWinIsShow(".openinweixin", true);
				} else {
					alert(d.message);
				}
			}

		});
	},
	/* 投票的点击事件 */
	bindVote: function(radioEle, voteEle) {
		var self = this;
		$(radioEle).delegate('.vote-s-center-item', 'click', function() {
			if($(this).find('.input-box').hasClass("checked")) {
				$(this).find('.input-box').addClass('not').removeClass('checked');
			} else if($(this).closest(".vote-s-center").data("checkbox") == "checkbox") {
				$(this).find('.input-box').removeClass('not').addClass('checked');
			} else {
				$('.input-box').addClass('not').removeClass('checked');
				$(this).find('.input-box').removeClass('not').addClass('checked');
			}
		});
		$(voteEle).on('click', function() {
			// ajax put datas
			var itegid = $("#pageID").val(),
				theme = $(".vote-selectbox").data("themeid");
			options = self.getVoteData('.vote-s-center');
			$.ajax({
				type: "get",
				dataType: 'jsonp',

				url: ajaxUrl.voteAction + "?id=" + itegid + "&theme=" + theme + "&options=" + options,
				success: function(d) {
					var d = IndexView.parseJson(d);
					if(d.status == 200) {
						IndexView.popWinIsShow('.vote-selectbox', false);
						self.voteBtnAction(true);
					} else {
						alert(d.message);
					}
				}
			});
		});
	},
	/* 抽奖的点击事件 */
	bindLotteryDraw: function(ele) {
		$(ele).on('click', function() {
			var name = $.trim($("#name").val()),
				phone = $.trim($("#tel").val());
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
			if(name == '') {
				alert("请输入您的姓名");
			} else if(phone == "") {
				alert("请输入您的手机号码");
			} else if(!myreg.test(phone)) {
				alert('请输入有效的手机号码');
			} else {
				//ajax

				$.ajax({
					type: "GET",
					dataType: 'jsonp',

					url: ajaxUrl.luckAction,
					data: {
						id: itegid,
						username: name,
						phone: phone
					},
					success: function(data) {
						var data = IndexView.parseJson(data);
						if(data.status == 200) {
							alert(data.message);
							var times = parseInt($(".J_lotteryTimes").text());
							if(times > 0) {
								times--;
							}
							$(".J_lotteryTimes").text(times);
						} else {
							alert(data.message);
						}
					}
				});
			}

		});
	},
	/* 打赏的点击事件 */
	bindReward: function(rootEle, itemEle) {
		var that = this;
		$(rootEle).delegate(itemEle, "click", function() {
			var money = $(this).attr('data-value');

			$.ajax({
				type: "get",
				dataType: 'jsonp',

				url: ajaxUrl.payInWx + "?id=" + itegid + "&money=" + money,
				success: function(data) {
					var data = IndexView.parseJson(data);
					if(data.status == 200) {
						var order = $.parseJSON(data.order);

						function jsApiCall() {
							WeixinJSBridge.invoke(
								'getBrandWCPayRequest',
								order,
								function(res) {
									WeixinJSBridge.log(res.err_msg);
									IndexView.popWinIsShow('.J_rewardbox', false);
								}
							);
						}
						//jsApiCall();
						function callpay() {
							if(typeof WeixinJSBridge == "undefined") {
								if(document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
								} else if(document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', jsApiCall);
									document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
								}
							} else {
								jsApiCall();
							}
						}
						callpay();
					} else if(data.status == 300) {
						IndexView.popWinIsShow('.openinweixin', true);
					} else {
						alert(data.message);
					}
				}
			});
		});
	},
	/*获得抽奖信息*/
	getLuckyInfo: function(ele) {
		$(ele).on("click", function() {
			IndexModel.careWxCode(function() {
				$.ajax({
					type: "get",
					dataType: 'jsonp',

					url: ajaxUrl.getLuckData + "?id=" + itegid,
					success: function(d) {
						var d = IndexView.parseJson(d);
						if(d.status == 200) {
							var data = d.result;
							$(".lotterybox").find(".J_luckTxt").text(data.summary);
							$(".lotterybox").find(".J_lotteryTimes").text(data.number);

							IndexView.popWinIsShow('.lotterybox', true);
						} else if(d.status == 300) {
							IndexView.popWinIsShow('.openinweixin', true);
						} else {
							alert(d.message);
						}
					},
					error: function() {
						console.log("失败")
					}
				});
			});
		});
	},
	/* 向图文直播栏中添加数据 */
	loadLiveMsgTopIdList: [],
	liveMsgTopLastTime: 0,
	everInitVideo:true,
//  videoHeightArr:[] ,
//	setVideoBox:function(){
//		var trendsVideo = $('.center-item').find('.video-box') ;
//		var videoWidth = '' ;
//		var videoHeight = '' ;
//		$.each(trendsVideo, function(vi,va) {			
//			videoWidth = $(va).find('video').width();
//			videoHeight = $(va).find('video').height();
//			if(videoWidth > videoHeight){
//				videoWidth = videoHeight*16/9 ;
//			}else if(videoWidth < videoHeight){
//				videoWidth = videoHeight*9/16 ;
//			}
//			IndexModel.videoHeightArr[vi] = videoHeight ;
//			console.log(videoWidth);
//			console.log(videoHeight);
//			$(this).width(videoWidth);
//			$(this).height(videoHeight) ;
//			
//		});
//	},
	playVideoBox:function(){
		var trendsVideo = $('.center-item').find('.video-box') ;
		$('.center-item .video-box').unbind("click").click(function(){
			if(!IndexModel.everInitVideo){
				return false;
			}
			var _videoUrl = $(this).find(".video_btn").attr('data-url');
			var _videoPoster =  $(this).find(".video_btn").attr('data-poster');
			if(_videoUrl==""){
				return false;
			}
			$('.video-modal .video-pup').append(
				'<video controls="controls" autoplay="autoplay" src="'+_videoUrl+'" webkit-playsinline poster=""></video>'
				//'<video controls="controls" autoplay="autoplay" src="'+_videoUrl+'" poster="'+_videoPoster+'" ></video>'
			);
			var playing =  $('.video-modal video') ;			
			playing[0].play();
			$('.video-modal').show();
			IndexModel.everInitVideo = false ;
			var timer = null ;
			timer = setInterval(function(){
				if(playing[0].paused){
					clearInterval(timer) ;
					playing.remove();	
					$('.video-modal').hide() ;
					IndexModel.everInitVideo = true ;				
				}
			},10)
			playing[0].ended = function(){
				playing.remove();
				$('.video-modal').hide() ;
				IndexModel.everInitVideo = true ;
			}			
			
			
            return false;
		});
		$('.video-modal a.video-close').unbind("click").click(function(){
        	var _playing = $(this).siblings(".video-pup").find('video');
        	_playing.remove();
        	$('.video-modal').hide();
        })
			
		
	},
	loadLiveMsg: function(ele, data, last_id) {
		var data = [];

		var last_id = last_id || $(".normal-section .container-left").first().data("id")
		$.ajax({
			type: "get",
			dataType: 'jsonp',

			url: ajaxUrl.getPicTxtList + "?id=" + itegid + "&last_id=" + last_id + "&rand=" + Math.random(),
			success: function(r) {
				var r = IndexView.parseJson(r);
				if(r.status == 200) {
					var data = r.list.result,
						topData = r.list.top;
					var resultTop = [],
						result = [],
						newTopDataId = []
					haveTopListId = [],
						haveTopList = $(".top-section .container-left"),
						normalList = $(".normal-section .container-left");
					if(topData.length > 0) {
						IndexModel.liveMsgTopLastTime = topData[0].top_time;
					} else {
						IndexModel.liveMsgTopLastTime = 0;
					}
					topData.map(function(val, index) {
						newTopDataId.push(val.id);
					});
					if(haveTopList.length > 0) {
						for(var i = 0; i < haveTopList.length; i++) {
							var itemId = $.trim(haveTopList.eq(i).data("id"));
							haveTopListId.push(itemId);
						}
					};
					var listNotSame = newTopDataId.toString() != haveTopListId.toString();
					if(listNotSame && !(haveTopListId == [] && newTopDataId == [])) {
						topData.map(function(val, index) {
							var imgList = '';
							if(val.photos) {
								var photos = val.photos;
								for(var i = 0; i < photos.length; i++) {
									if(photos.length==3){
										imgList += '<li class="img_img" style="width:31.5%;float:left;max-height:133px;max-width:133px;"><img big-src="' + photos[i].big + '" src="' + photos[i].small + '" alt=""></li>'
									}else if(photos.length==2){
										imgList += '<li class="img_img" style="width:47.5%;float:left;max-height:133px;max-width:133px;"><img big-src="' + photos[i].big + '" src="' + photos[i].small + '" alt=""></li>'
									}else if(photos.length==1){
										imgList += '<li class="img_img" style="width:95%;float:left;max-height:133px;max-width:133px;"><img big-src="' + photos[i].big + '" src="' + photos[i].small + '" alt=""></li>'
									}
									
								}
							} else if(val.video) {
								imgList += '<li class="video-box" style="margin:0;padding:0;position:relative;" >' ;
								imgList += '<img style="max-width:100%;max-heihgt:100%;" src="'+val.video.pic+'">';
//								imgList += '<video width="" height="100%" style="margin:0;padding:0;min-width:97px;height:129px;margin:5px 5px 0px 5px;" poster="'+val.video.pic+'" src="'+val.video.url+'"></video>';
								imgList += '<div class="video_btn" data-url="'+val.video.url+'" data-poster="'+val.video.pic+'" style="width:36px;height:36px;position:absolute;top:33%;left:43%;z-index:30;background:url(../images/playbtn.png) no-repeat;background-size:contain;" ></div>' ;
								imgList += '</li>'
							};
							if($('#liveMsg_' + val.id).length > 0) {
								$('#liveMsg_' + val.id).remove();
							}
							resultTop.push('<div class="container-left" id="liveMsg_' + val.id + '" data-id="' + val.id + '"><div class="center-item"><div class="center-item-title"><div class="img-box"><img src="' + val.user_logo +
								'" alt=""></div><span class="center-item-name">' + val.user_name + '</span>' +
								'<span class="center-item-badge">' + val.host_name + '</span><span class="center-item-badge orange">置顶</span>' +
								'<span class="center-item-date">' + val.date + '</span>' +
								'</div><div class="center-item-center"><span class="cic-corner"></span>' +
								'<p class="container_p">' + val.msg_content + '</p><ul class="img_ul" style="margin:0 5px;overflow:hidden;">' + imgList + '</ul></div></div></div>');
//								
								if(!$(".container_p").html()==null){
									$(".container_p").css("margin-bottom","10px !important");
								}
						});
						$(ele).find(".top-section").html(resultTop.join(''));
					};
					if(data.length > 0 || topData.length > 0) {
						$(ele).find(".container-nomsg").addClass("hide");
						if(data.length > 0) {
							data.map(function(val, index) {
								var imgList = '';
								if(val.photos) {
									var photos = val.photos;
									for(var i = 0; i < photos.length; i++) {
										if(photos.length==3){
											imgList += '<li class="img_img" style="width:31.5%;float:left;max-height:133px;max-width:133px;"><img big-src="' + photos[i].big + '" src="' + photos[i].small + '" alt=""></li>'
										}else if(photos.length==2){
											imgList += '<li class="img_img" style="width:47.5%;float:left;max-height:133px;max-width:133px;"><img big-src="' + photos[i].big + '" src="' + photos[i].small + '" alt=""></li>'
										}else if(photos.length==1){
											imgList += '<li class="img_img" style="width:95%;float:left;max-height:133px;max-width:133px;"><img big-src="' + photos[i].big + '" src="' + photos[i].small + '" alt=""></li>'
										}
									}
								} else if(val.video) {
										//imgList += '<li class="video-box" style="margin:0;padding:0;position:relative;background:url('+val.video.pic+') no-repeat;background-size:cover;" >' ;
										imgList += '<li class="video-box" style="margin:0;padding:0;position:relative;" >' ;
										imgList += '<img style="max-width:100%;max-heihgt:100%;" src="'+val.video.pic+'">';
//										imgList += '<video width="" height="100%" style="margin:0 !important;padding:0 !important;min-width:97px;height:129px;margin:5px 5px 0px 5px;" poster="'+val.video.pic+'" src="'+val.video.url+'"></video>';
										imgList += '<div class="video_btn" data-url="'+val.video.url+'" data-poster="'+val.video.pic+'" style="width:36px;height:36px;position:absolute;top:33%;left:43%;z-index:30;background:url(../images/playbtn.png) no-repeat;background-size:contain;" ></div>' ;
										imgList += '</li>'
								};

								result.push('<div class="container-left" id="liveMsg_' + val.id + '" data-id="' + val.id + '"><div class="center-item"><div class="center-item-title"><div class="img-box"><img src="' + val.user_logo +
									'" alt=""></div><span class="center-item-name">' + val.user_name + '</span>' +
									'<span class="center-item-badge">' + val.host_name + '</span>' +
									'<span class="center-item-date">' + val.date + '</span>' +
									'</div><div class="center-item-center"><span class="cic-corner"></span>' +
									'<p>' + val.msg_content + '</p><ul class="img_ul" style="margin:0 5px;overflow:hidden;">' + imgList + '</ul></div></div></div>');
//									
									if(!$(".container_p").html()==null){
										$(".container_p").css("margin-bottom","10px !important");
									}
							});
							$(ele).find(".normal-section").prepend(result.join(''));
						}
					} else if($(ele).find(".container-left").length > 0) {
						$(ele).find(".container-nomsg").addClass("hide");
					} else {
						$(ele).find(".container-nomsg").removeClass("hide");
					};
					//IndexModel.setVideoBox();
					IndexModel.playVideoBox();
				} else {
					alert(r.message);
				}
			}
		});
	},
	/*聊天室-加载更多*/
	droploadChatMsg: function() {
		var self = this;
		dropload = $(".chat-scroll").dropload({
			scrollArea: $(".chat-scroll"),
			domDown: {
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
				domNoData: '<div class="dropload-noData">没有更多评论了</div>'
			},
			loadDownFn: function(me) {
				var itegid = $("#pageID").val(),
					min_id = $.trim($("#minChatId").val());
				$.ajax({
					type: "get",
					dataType: 'jsonp',

					url: ajaxUrl.getChatList + "?id=" + itegid + "&min_id=" + min_id,
					success: function(d) {
						var d = IndexView.parseJson(d);
						if(d.status == 200) {
							if(d.num1 == 0) {
								me.resetload();
								me.lock();
								me.noData();
								me.resetload();
							};
							self.chatMsgTemplate(d, function(result) {
								if(min_id != '') {
									$('.chat-warpper .normal-chat').append(result.join(''));
								} else {
									$('.chat-warpper .normal-chat').html(result.join(''));
								}
								if($(".chat-warpper").height() > $(".chat-scroll").height()) {
									$(".dropload-down").show();
								}
								$("#minChatId").val(d.min_id);
								me.resetload();
							}, function() {
								if($('.chat-warpper .container-left').length <= 0) {
									$('.chat-scroll').find(".container-nomsg").removeClass("hide"); //消息列表为空的现象
									$('.dropload-down').hide();
								}
							});
						}
					}

				});
			}
		});
	},
	/*聊天室-消息更新*/
	updateChatMsgTimer: null,
	updateChatMsg: function() {
		var itegid = $("#pageID").val(),
			last_id = $(".normal-chat .container-left").not(".chat_local").first().data("id");

		var self = this;
		$.ajax({
			type: "get",
			dataType: 'jsonp',

			url: ajaxUrl.getChatList + "?id=" + itegid + "&last_id=" + last_id,
			success: function(d) {
				var d = IndexView.parseJson(d);
				if(d.status == 200) {
					$(".chat_local").remove();
					self.chatMsgTemplate(d, function(result) {
						$('.chat-warpper .normal-chat').prepend(result.join(''));
					}, false, function() {
						var min_id = $.trim($("#minChatId").val());
						if(min_id == '') {
							$("#minChatId").val(d.min_id);
						}
					});
				}
			}
		});
	},
	chatTopLastTime: 0,
	chatMsgTemplate: function(d, normalDataCallback, noDataCallBack, updateChatMsgCallback) {
		var data = d.list.result,
			topData = d.list.top,
			newTopDataId = []
		haveTopListId = [],
			haveTopList = $(".top-chat .container-left"),
			normalList = $(".normal-chat .container-left");
		var topHtml = [],
			reply = '',
			hostName = '',
			lastTopTime
		if(topData.length > 0) {
			IndexModel.chatTopLastTime = topData[0].top_time;
		} else {
			IndexModel.chatTopLastTime = 0;
		}
		topData.map(function(val, index) {
			newTopDataId.push(val.id);
		});
		if(haveTopList.length > 0) {
			for(var i = 0; i < haveTopList.length; i++) {
				var itemId = $.trim(haveTopList.eq(i).data("id"));
				haveTopListId.push(itemId);
			}
		};
		var listNotSame = newTopDataId.toString() != haveTopListId.toString();
		if(listNotSame && !(haveTopListId == [] && newTopDataId == [])) {
			topData.map(function(val, index) {
				hostName = '';
				if(val.is_reply) {
					reply = '<p class="replay"><span>' + val.reply_user_name + ':</span>' + val.reply_msg + '</p>';
				} else {
					reply = '';
				}
				if(val.host == 1) {
					hostName = '<span class="center-item-badge">' + val.host_name + '</span>';
				}
				if($("#chat_" + val.id).length > 0) {
					$("#chat_" + val.id).remove();
				}
				topHtml.push('<div class="container-left" id="chat_' + val.id + '" data-id="' + val.id + '"><div class="center-item"><div class="center-item-title"><div class="img-box"><img src="' + val.user_logo +
					'" alt=""></div><span class="center-item-name">' + val.user_name + '</span>' +
					hostName +
					'<span class="center-item-badge orange">置顶</span>' +
					'<span class="center-item-date">' + val.date + '</span></div><div class="center-item-center"><span class="cic-corner"></span>' +
					'<p>' + val.msg_content + '</p>' + reply + '</div></div></div>');
			});
			$('.chat-warpper .top-chat').html(topHtml.join(''));
		}

		if(data.length > 0 || topData.length > 0) {
			if(!($('.chat-scroll').find(".container-nomsg").is(":hidden"))) {
				$('.chat-scroll').find(".container-nomsg").addClass("hide");
			}
			if(data.length > 0) {
				var result = [];
				var reply = '',
					hostName = '';
				data.map(function(val, index) {
					hostName = '';
					if(val.is_reply) {
						reply = '<p class="replay"><span>' + val.reply_user_name + ':</span>' + val.reply_msg + '</p>';
					} else {
						reply = '';
					}
					if(val.host == 1) {
						hostName = '<span class="center-item-badge">' + val.host_name + '</span>';
					}
					if($("#chat_" + val.id).length > 0) {
						$("#chat_" + val.id).remove();
					}
					if(val.is_reward == 1) {
						result.push('<div class="container-left reward-chatmsg" id="chat_' + val.id + '" data-id="' + val.id + '"><div class="center-item">' +
							'<div class="center-item-center">感谢' +
							'<span class="reward-chattext">' + val.user_name + '</span>打赏' +
							'<span class="J_rewardMoney">' + val.msg_content + '</span>元' +
							'<span class="r-icon"></span></div></div></div>');
					} else if(val.is_luck == 1) {
						if(val.msg_content != "") {
							result.push('<div class="container-left reward-chatmsg" id="chat_' + val.id + '" data-id="' + val.id + '"><div class="center-item">' +
								'<div class="center-item-center">恭喜' +
								'<span class="reward-chattext">' + val.user_name + '</span>中了' + val.msg_content +
								'<span class="luck-icon"></span></div></div></div>');
						} else {
							result.push('<div class="container-left reward-chatmsg" id="chat_' + val.id + '" data-id="' + val.id + '"><div class="center-item">' +
								'<div class="center-item-center">恭喜' +
								'<span class="reward-chattext">' + val.user_name + '</span>中奖了' +
								'<span class="luck-icon"></span></div></div></div>');
						}

					} else {
						result.push('<div class="container-left" id="chat_' + val.id + '" data-id="' + val.id + '"><div class="center-item"><div class="center-item-title"><div class="img-box"><img src="' + val.user_logo +
							'" alt=""></div><span class="center-item-name">' + val.user_name + '</span>' +
							hostName +
							'<span class="center-item-date">' + val.date + '</span></div><div class="center-item-center"><span class="cic-corner"></span>' +
							'<p>' + val.msg_content + '</p>' + reply + '</div></div></div>');
					}
				});
				normalDataCallback(result);
			}
			if(updateChatMsgCallback) {
				updateChatMsgCallback();
			}
		} else {
			if(noDataCallBack) {
				noDataCallBack();
			}
		}
	},
	/* send chat msgs*/
	bindSendMsg: function(ele) {
		$(ele).on('click', function() {
			var parentId = $.trim($(".chat-input").attr("data-parent"));
			var mess = $.trim($(".chat-input").val()),
				result = '',
				reply = '';

			var url;
			if(mess == '') {
				$(".chat-input").val('').attr("data-parent", "");
				setTimeout(function() {
					$(".chat-input").focus();
				}, 100)

				return;
			}
			$(ele).attr("disabled", "disabled");
			if(parentId == '') {
				url = ajaxUrl.sendChatMsg + "?message=" + mess + "&id=" + itegid;
			} else {
				console.log
				url = ajaxUrl.sendChatMsg + "?parent=" + parentId + "&message=" + mess + "&id=" + itegid;
				reply = '<p class="replay"><span>' + IndexView.replyObj.reply_user_name + ':</span>' + IndexView.replyObj.reply_msg + '</p>';
			}
			$.ajax({
				type: "get",
				url: url,
				dataType: 'jsonp',

				success: function(data) {
					var val = IndexView.parseJson(data);
					if(val.status == 200) {
						result = '<div class="container-left chat_local"><div class="center-item"><div class="center-item-title"><div class="img-box"><img src="' + val.avatar +
							'" alt=""></div><span class="center-item-name">' + val.username + '</span>' +
							'<span class="center-item-date">' + IndexView.getTime() + '</span></div><div class="center-item-center"><span class="cic-corner"></span>' +
							'<p>' + mess + '</p>' + reply + '</div></div></div>';
						$(".normal-chat").prepend(result);
						IndexModel.get_number();
						IndexView.gotoChatTop();
					}
					$(".chat-input").val('').attr("data-parent", "");
					$(ele).removeAttr("disabled");
				}
			});
		});
	},
	/*预约*/
	bespeakAction: function() {
		$(".J_reserve").on("click", function() {

			$.ajax({
				type: "get",
				url: ajaxUrl.bespeak + "?id=" + itegid,
				dataType: 'jsonp',

				success: function(data) {
					var data = IndexView.parseJson(data);
					if(data.status == 200) //预约成功
					{
						$(".J_reserve").text("已预约").addClass("gray-btn");
						$(".J_reserve").attr("disabled", "disabled");
					} else if(data.status == 502) //未关注公众号
					{
						$(".wx-code .J_code").attr("src", data.qrcode);
						IndexView.popWinIsShow(".wx-code", true);
					} else if(data.status == 501) {
						IndexView.popWinIsShow(".openinweixin", true);
					} else {
						alert(data.message)
					}
				}
			})
		});
	},
	// 检测是否关注公众号
	careWxCode: function(callback) {
		$.ajax({
			url: ajaxUrl.wxlogin + "?id=" + itegid,
			dataType: 'jsonp',

			success: function(data) {
				var data = IndexView.parseJson(data);
				if(data.status == 200) {
					if(data.is_subscribe) {
						callback();
					} else {
						$(".wx-care-code").find(".J_care_code").attr("src", data.qrcode);
						IndexView.popWinIsShow(".wx-care-code", true);
					}
				} else if(data.status == 500) {
					IndexView.popWinIsShow(".openinweixin", true)
				} else {
					alert(data.message);
				}
			}
		})
	},

}
var IndexView = {
	init: function() {
		var self = this;
		$("#player").css("background-image", 'url(' + $(".player-cover").val() + ')');
		this.setPlayerSize(); //设置播放器外层div的具体宽高,一定要放在resizePage()之上
		this.resizePage();
		$(window).resize(function() {
			self.resizePage();
		});
		this.JXtabs(); //导航点击的行为
		this.JXshowSlider(); //导航栏右侧收起放开图标的行为
		this.bindToggleVideo(); /*视频片段点击事件*/
		this.chatInput(); //点击聊天组件的输入框行为
		this.bindReplay(); //二级回复
		this.closeWeixinCover(); //关闭微信打开遮罩层
		this.bindAd('.ad-close', '.ad'); // 绑定广告关闭事件

		/*<--弹框绑定 start-!>*/
		this.dialog("", ".reward-content-close", ".rewardbox");
		this.dialog("", ".lottery-content-close", ".lotterybox");
		this.dialog("", ".vote-r-close", ".vote-resultbox"); //投票结果
		this.dialog("", ".vote-s-close", ".vote-selectbox"); //投票
		this.dialog("", ".wx-code .wx-code-close", ".wx-code"); //预约-二维码
		this.dialog("", ".wx-care-code .wx-code-close", ".wx-care-code"); //预约-二维码
		this.initHDImgbox('.hdImgbox-close'); // 绑定大图显示Swiper
		this.dialog('.show-img-item img');
		/*<--弹框绑定 end-!>*/
		this.videoTimer();
		/*<--Ajax-!>*/

		IndexModel.pageOnload(); //页面加载时请求
		IndexModel.get_number(); //获得在线人数等数据
		IndexModel.bespeakAction(); //点击预约按钮

		var fragShow = parseInt($.trim($("#fragShow").val()));
		if(fragShow) {
			IndexModel.loadFragData(); /* ajaxData - 加载视频选择列表 */
			setInterval(function() {
				IndexModel.loadFragData('.fragment'); //加载视频列表
			}, 300 * 1000);
		}
		setInterval(function() {
			IndexModel.get_number(); //在线人数更新
		}, 5 * 1000);
		IndexModel.getLuckyInfo(".fnbox-lottery"); //获得抽奖信息
		IndexModel.bindSendMsg(".chat-input-send");
		IndexModel.bindVote('.vote-s-center', '.vote-s-button'); // 绑定投票点击事件
		IndexModel.bindLotteryDraw('.lottery-content-draw'); // 绑定抽奖事件
		IndexModel.bindReward('.reward-cc', '.reward-cc-item'); // 绑定打赏
		//投票
		$(".fnbox-vote").on("click", function() {
			IndexModel.careWxCode(function() {
				IndexModel.voteBtnAction();
			});
		});
		IndexView.goReward();
		if($('.section').length > 0) {
			this.initHDImgbox('.hdImgbox-close'); // 绑定大图显示Swiper
		};
	},
	setPlayerSize: function() {
		var _screenWith = $(document.body).width();
		var _screenHeight = parseInt(_screenWith * 9 / 16);
		$('header').width(_screenWith);
		$('header').height(_screenHeight);
	},
	videoPlay: function(file, play, cover) {
		var cover = cover || $(".player-cover").val();
		jwplayer("player").remove();
		jwplayer("player").setup({
			file: file,
			autostart: play, //自动播放
			width: '100%',
			height: '100%',
			image: cover, //封面图，
			hlshtml: true,
			controls: true,
			aboutlink: "http://www.tidemedia.com", //自定义右键菜单跳转的链接
			abouttext: "泰德网聚", //自定义右键菜单
			timesliderabove: false,
			stretching: "exactfit", //画面比例设置，exactfit，fill,uniform,none
			primary: "html5",
			preload: "auto",
			skin: {
				name: "custom",
				url: "http://static.juyun.tv/css/17.05.16/custom.css"
			}
		});
	},
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	},
	JXtabs: function() {
		var tab = $("nav").find("li");
		tabLen = tab.length;
		$("nav").delegate("li", "click", function(e) {
			if(tabLen > 1) {
				var width = $('section.container').width(),
					index = $(this).index();
				if(!($(this).hasClass("now"))) {
					$(".chat-inputbox").hide();
					$(".dropload-down").css("padding-bottom", "0px");
					$(".fnbox").css("padding-bottom", "0px");
				}
				$("nav").find('li').removeClass("now");
				$(this).addClass('now');
				$(".container-wrap").animate({
					'margin-left': (-index * width) + 'px'
				}, 400);
			}
		});
	},

	JXshowSlider: function() {
		var ele = '.fragClose',
			self = this,
			fragmentHeight = $(".fragment-box").outerHeight(true);
			console.log(fragmentHeight+"bb")
		return $(ele).on("click", function(e) {
			var frag = $('.fragment-box');
			var content = $('.container');
			$(this).toggleClass("rotate180");
			if(frag.is(":hidden")) {
//				alert(111)
				$(".fragment-box").slideDown(5);
				self.resizePage(fragmentHeight);

			} else {
//				alert(222)
				$(".fragment-box").slideUp(5);
				self.resizePage();
			}
			e.stopPropagation();
			e.preventDefault();
		});
	},
	/* 是否需要加载视频片段栏目 */
	loadFrag: function(load) {
		if(load) {
			if($(".fragClose").is(":hidden")) {
				$("nav ul").css("padding-right", "20px");
				$(".fragClose").show();
				$('.fragment-box').css('display', 'block');
			}
		} else {
			$('.fragment-box').css('display', 'none');
			$('.fragClose').hide();
			$("nav ul").css("padding-right", "0px");
		}
		this.resizePage();
	},
	bindToggleVideo: function(ele) {
		var ele = '.fragment-box',
			self = this;
		$(ele).delegate('.fragments', 'click', function() {
			// $('.fragment-play').removeClass("playing");
			// $(".fragments-bg").show();
			$(".fragments").removeClass("playing");
			$(this).addClass("playing"); //.siblings(".fragments-bg").hide();
			// 这里处理视频点击逻辑 即 切换Video的播放url
			var videoUrl = $(this).attr("data-url");
			if(this.id == "videoBtn") videoUrl = IndexModel.m3u8;

			var videoImg = $(this).attr("data-cover");
			self.videoPlay(videoUrl, true, videoImg);
		});
	},
	/* 内容区高度调整 */
	resizePage: function(h) {
		var h = h || $(".fragment-box").outerHeight(true);
		if($(".fragClose.rotate180").length > 0) {
			h = 0;
		}
		if($(".fragment-box").is(":hidden")) {
			h = 0;
		}
		var headerHeight = $("header").outerHeight(true),
			navHeight = $("nav").outerHeight(true),
			windowHeight = $(window).height(),
			windowWidth = $("body").width(),
			contentHeight = windowHeight - headerHeight - navHeight - h;
		$(".main").animate({
			"height": contentHeight
		}, 400);
		/*设置视频片段容器的宽度*/
		var itemWidth = Math.ceil($(".fragment").find(".fragments").outerWidth(true) + 1),
			itemLen = $(".fragment").find(".fragments").length;
		//$(".fragment").find(".fragment-list").width(itemWidth * itemLen);
		/*内容区container块的宽度*/
		if($("nav").find("li").length > 1) {
			var sectionIndex = $("nav").find("li.now").index();
			$(".container-wrap").css({
				'margin-left': (-sectionIndex * windowWidth) + 'px'
			});
		}
		if($(".fnbox").find(".fnbox-circular").length <= 0) {
			$(".main .container-wrap .intro-container p").css("padding-right", "15px");
		}
		var fnboxItemHeight = $(".fnbox").find(".fnbox-circular").outerHeight(true),
			fnboxItemNum = $(".fnbox").find(".fnbox-circular").length,
			fnboxSumHeight = fnboxItemHeight * fnboxItemNum;
		if(contentHeight > fnboxSumHeight + 10) {
			$(".fnbox").height(fnboxSumHeight);
		} else {
			$(".fnbox").height(contentHeight - 20);
		}
	},
	/*聊天室-输入框连带效果*/
	chatInput: function() {
		var timer;
		//点击聊天组件打开输入框
		$(".fnbox-msg").on("click", function(e) {
			var target = this;
			var chatTab = $(".J_chatTab");
			if(!(chatTab.hasClass('now'))) {
				chatTab.addClass('now').siblings("li").removeClass("now");
				var width = $('.chat').width();
				var index = chatTab.index();
				$(".container-wrap").css('margin-left', -(index * 100) + '%');
			}
			if($(".chat-inputbox").is(":hidden")) {
				$(".dropload-down").css("padding-bottom", "46px");
				$(".fnbox").css("padding-bottom", "46px");
				$(".chat-inputbox").show().find(".chat-input").val('').focus();
				timer = setInterval(function() {
					target.scrollIntoView({
						block: "end",
						behavior: "smooth"
					}); //将一个元素滚动到视窗，如果参数为true则元素会被滚动到视窗的顶部，否则他会被滚动到视窗底部，默认为true。    
				}, 100);
			} else {
				$(".dropload-down").css("padding-bottom", "0px");
				$(".fnbox").css("padding-bottom", "0px");
				$(".chat-inputbox").hide().find(".chat-input").val('').blur();
				clearInterval(timer);
			}
			e.stopPropagation();
			e.preventDefault();
		});
		//关闭输入框
		$(document).on("touchstart", function(e) {
			e = window.event || e; // 兼容IE7
			obj = $(e.srcElement || e.target);
			if(!$(obj).is(".chat-inputbox,.chat-inputbox *,.fnbox-msg,.fnbox-msg *,.center-item-center,.center-item-center *")) {
				$(".chat-inputbox").hide().find(".chat-input").val('').blur();
				clearInterval(timer);
				$(".dropload-down").css("padding-bottom", "0px");
				$(".fnbox").css("padding-bottom", "0px");
			}
		});
	},
	/*二级回复*/
	replyObj: {
		reply_user_name: '',
		reply_msg: ''
	},
	bindReplay: function() {
		$('.chat-warpper').delegate(".center-item-center", "click", function() {
			var name = $(this).parent().find(".center-item-name").text(),
				msg = $(this).find("p").not(".replay").text()
			id = $(this).closest(".container-left").data("id");
			IndexView.replyObj.reply_user_name = name;
			IndexView.replyObj.reply_msg = msg;
			$(".dropload-down").css("padding-bottom", "46px");
			$(".fnbox").css("padding-bottom", "46px");
			$('.chat-inputbox').show();
			$('.chat-input').focus().val("@" + name + ":").attr("data-parent", id)
		});
	},
	/*打赏弹框出现*/
	goReward: function() {
		$(".fnbox-reward").on("click", function() {
			IndexModel.get_rewardInfo();
			IndexView.popWinIsShow(".rewardbox", true);
		});
	},
	parseJson: function(data) {
		if(typeof(data) == "object" &&
			Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length) {
			return data;
		} else {
			var myData = data;
			try {
				data = $.parseJSON(data);
			} catch(e) {
				data = {};
				console.log("error:", e)
				console.log("receive data:", myData)
			}
			return data;
		}

	},
	getTime: function() {
		var myDate = new Date(),
			myMonth = (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1).toString() : '0' + (myDate.getMonth() + 1),
			myDay = myDate.getDate() > 9 ? myDate.getDate().toString() : '0' + myDate.getDate(),
			myHours = myDate.getHours() > 9 ? myDate.getHours().toString() : '0' + myDate.getHours(),
			myMinutes = myDate.getMinutes() > 9 ? myDate.getMinutes().toString() : '0' + myDate.getMinutes(),
			myTimeHtml = myMonth + '-' + myDay + '&nbsp;' + myHours + ':' + myMinutes;
		return myTimeHtml;
	},
	indexOf: function(arr, val) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == val) return i;
		}
		return -1;
	},
	removeEle: function(arr, val) {
		var index = IndexView.indexOf(arr, val);
		console.log(0)
		if(index > -1) {
			arr.splice(index, 1);
		}
	},
	/*气泡动画*/
	bubbleAction: function(ele, data) {
		var val = $.trim($(ele).text());
		if(val != data) {
			$(ele).parent(".crc-comment").addClass("active");
			setTimeout(function() {
				$(ele).parent(".crc-comment").removeClass("active");
			}, 1000);
		}
	},
	/* Ad 广告关闭 */
	bindAd: function(closebtn, adbox) {
		$(closebtn).on("click", function() {
			$(adbox).hide();
		})
	},
	/*回到聊天室顶部*/
	gotoChatTop: function() {
		$('.chat .chat-scroll').scrollTop(0);
	},
	/* 初始化大图浏览Swiper */
	initHDImgbox: function(closebtn) {
		$(closebtn).on('click', function() {
			IndexView.popWinIsShow('.hdImgbox', false);
		});
		var mySwiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationType: 'custom',
			paginationCustomRender: function(swiper, current, total) {
				var html = '';
				for(var i = 0; i < total; i++) {
					if(i + 1 == current) {
						html += '<span class="mybullets active"></span>';
					} else {
						html += '<span class="mybullets"></span>';
					}
				}
				return html;
			}
		});
		$('.section').delegate('.center-item-center .img_img img', 'click', function() {
			var imgBox = $(this).closest(".center-item-center"),
				imglist = imgBox.find("img"),
				imgLen = imglist.length,
				imgWidth = $(this).width(),
				urlArr = '',
				index = 0;
			for(var i = 0; i < imgLen; i++) {
				urlArr += '<div class="swiper-slide show-img-item">' +
					'<span class="vertical-fix"></span>' +
					'<img src="' + imglist.eq(i).attr("big-src") + '" alt="hdimg">' +
					'</div>';
				if($.trim(imglist.eq(i).attr("big-src")) == $.trim($(this).attr("big-src"))) {
					index = i;
				}
			}
			$('.hdImgbox').find(".swiper-wrapper").html(urlArr);
			IndexView.popWinIsShow('.hdImgbox', true);
			mySwiper.update();
			mySwiper.slideTo(index, 10, false);
		});
	},
	closeWeixinCover: function() {
		$(".J_openinweixin").on("click", function() {
			if($(".rewardbox").is(":hidden")) {
				$("#player").css("display", "block");
				$(".videoHidden").css("display", "none");
			}
			$(".openinweixin").hide();
		});
	},
	/* 弹窗和遮罩显示时，播放器隐藏效果*/
	popWinIsShow: function(popWin, isShow) {
		if(isShow) {
			$("#player").css("display", "none");
			$(".videoHidden").css("display", "block");
			$("input[type='text']").val('');
			$(popWin).css({
				"display": "block",
				"opacity": "0"
			}).animate({
				"opacity": "1"
			}, 200);
		} else {
			$("#player").css("display", "block");
			$(".videoHidden").css("display", "none");
			$(popWin).hide();

		}
	},
	/* 弹窗 显示和关闭事件*/
	dialog: function(showbtn, closebtn, dialog) {
		$(showbtn).on('click', function() {
			IndexView.popWinIsShow(dialog, true);
		});

		$(closebtn).on('click', function(evt) {
			IndexView.popWinIsShow(dialog, false);
			evt.stopPropagation();
			return false;
		});
	},
	/*直播倒计时*/
	videoTimer: function() {
		setInterval(function() {
			var dayEle = $(".header-footer").find(".J_day"),
				hourEle = $(".header-footer").find(".J_hour"),
				minuteEle = $(".header-footer").find(".J_minute"),
				secondEle = $(".header-footer").find(".J_second"),
				day = parseInt(dayEle.text()),
				hour = parseInt(hourEle.text()),
				minute = parseInt(minuteEle.text()),
				second = parseInt(secondEle.text());
			if(second > 0) {
				second--;
				if(second >= 10) {
					secondEle.text(second);
				} else {
					secondEle.text("0" + second);
				}

			} else {
				if(minute > 0) {
					minute--;
					if(minute >= 10) {
						minuteEle.text(minute);
					} else {
						minuteEle.text("0" + minute);
					}
					secondEle.text(59);
				} else {
					if(hour > 0) {
						hour--;
						if(hour >= 10) {
							hourEle.text(hour);
						} else {
							hourEle.text("0" + hour);
						}
						minuteEle.text(59);
						secondEle.text(59);
					} else {
						if(day > 0) {
							day--;
							if(day >= 10) {
								dayEle.text(day);
							} else {
								dayEle.text("0" + day);
							}
							hourEle.text(23);
							minuteEle.text(59);
							secondEle.text(59);
						} else {
							$(".header-footer").hide();
							// ajax
						}
					}
				}
			}
		}, 1000);
	}
}
IndexView.init();
// 页面入口
window.onload = function() {
	
	wxlogin_verify();
	
	// 微信登录
	function wxlogin() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			window.location.href = ajaxUrl.wxShare + "?state=" + encodeURIComponent(window.location.href);
		}
		IndexModel.is_pay();
	}

	function wxlogin_verify() {
		$.ajax({
			type: "get",
			url: ajaxUrl.wxlogin,
			dataType: 'jsonp',

			async: false,
			success: function(data) {
				if(data.status == 200) {
					IndexModel.is_pay();
				} else if(data.status == 500) {
					wxlogin();
				}
			}
		});
	}
	//解决不同手机视频点击完成能不能继续播放是否只显示图片的问题
	$(".center-item").on("click",".center-item-center video",function(){
		this.play();
	})
	

	
}
$(function() {

	wx.ready(function() {
		//获取标题，简介，图片和当前页链接
		var shareImg = $("#shareimg").find("img").attr("src");
		var shareTitle = $("title").html();
		var shareIntro = $("#intro").text();
		var shareUrl = window.location.href;
		// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		wx.onMenuShareTimeline({
			title: shareTitle, // 分享标题
			desc: shareIntro,
			link: shareUrl,
			imgUrl: shareImg, // 分享图标
			success: function() {
				// 用户确认分享后执行的回调函数
				//alert("分享成功！");
			},
			cancle: function() {
				// 用户取消分享后执行的回调函数
			}
		});
		// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
		wx.onMenuShareAppMessage({
			title: shareTitle,
			desc: shareIntro,
			link: shareUrl,
			imgUrl: shareImg,
			type: 'link',
			success: function() {
				//alert("分享成功！");
			},
			cancle: function() {
				// 用户取消分享后执行的回调函数
			}
		});
	});

	$.ajax({
		type: 'GET',
		url: ajaxUrl.wxSign + "?id=" + itegid,
		dataType: 'jsonp',

		success: function(data) {
			wx.config({
				debug: false,
				appId: data.result.appId,
				timestamp: data.result.timestamp,
				nonceStr: data.result.nonceStr,
				signature: data.result.signature,
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
			});
		},
		error: function() {
			console.log("接口请求失败！");
		}
	});
});
window.onbeforeunload = function() {

	$.ajax({
		type: "get",
		dataType: "jsonp",

		url: ajaxUrl.leave + "?id=" + itegid
	});
};
//解决后台上传图片不一致的高度自适应问题，先注掉
window.onload = function() {
	var imgHeight = $(".user-container p img").height();
	if(imgHeight >= 313) {
		$(".user-container p img").css("height", "313px");
	}
	$(".hdImgbox").on("click",".swiper-slide",function(){
		$(".hdImgbox").css("display","none");
	});
};

