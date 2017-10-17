$(function() {
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	var userId = localStorage.getItem("userId");
	var token = localStorage.getItem("token");
	var videoId = localStorage.getItem("videoId");
	var flag = 1;
	
	var videoComment = {
		init: function(){
			var _this = this;
			_this.systemlabel();
			_this.userlabel();
			_this.selected();
			_this.other();
			var pageNum = 2;
			mui.init({
				gestureConfig:{
				   longtap: true
				},
			    pullRefresh : {
				    container:'#refresh',
				    up : {
				      contentrefresh : "正在加载...",
				      contentnomore:'没有更多数据了',
				      auto:true,
				      callback : morecommentlist
				    }
			    }
			});
			
			function morecommentlist(){
				if(flag == 1){
					$.ajax({
						url:"/star/comment/list",
						type:"post",
						dataType: "json",
						async: false,
						data:{'userId': userId,'token': token,'videoId': videoId,'pageSize':10},
						success: function(data) {
							switch(data.result){
								case "1":
									if(data.data.commonComments.list.length == 0 && data.data.expertComments.length == 0){
										mui('#refresh').pullRefresh().disablePullupToRefresh();
										$(".backImg").show();
//										$(".mui-scroll:first").append('<div class="backImg"><div class="backImg-star"><img src="../images/sweet.jpg"/></div><span>暂无评论，快抢沙发</span></div>');
									}else{
										if(data.data.expertComments.length != 0){
											_this.eachcomments(data.data.expertComments,1);
										}
										if(data.data.commonComments.length != 0){
											_this.eachcomments(data.data.commonComments,2);
										}
										mui('#refresh').pullRefresh().endPullupToRefresh(false);
									}
									break;
								case "200": layer.open({content: '用户不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
								case "401": layer.open({content: '视频不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
								default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
							}
						},
						error: function(){
							layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
						}
					});
				}else if(flag == 0){
					mui('#refresh').pullRefresh().enablePullupToRefresh();
					$.ajax({
						type:"post",
						url:"/star/comment/common/list",
						async: false,
						data: {userId:userId,token:token,videoId:videoId,pageNum:pageNum},
						success: function(data){
							console.log(data);
							if(data.result == "1"){
								if(pageNum <= data.data.pages){
									_this.eachcomments(data.data,3);
									pageNum++;
									mui('#refresh').pullRefresh().endPullupToRefresh(false);	
								}else{
									mui('#refresh').pullRefresh().endPullupToRefresh(true);	
								}
							}else{
								layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							}
						},
						error: function(){
							layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
						}
					});
				}
				flag = 0;
			}
		},
		eachcomments: function(obj,type){
			var _this = this;
			var commentlist = '';
			if(type == 1){
				commentlist += '<h3 class="title">专家评论</h3><ul class="mui-table-view experts">';
				list(obj);
			}else if(type == 2){
				commentlist += '<h3 class="title">最新评论</h3><ul class="mui-table-view latest">';
				list(obj.list);
			}else{
				list(obj.list);
			}
			function list(listobj){
				$.each(listobj, function(obj, common) {
					var createdTime = common.createdTime.slice(5,16);
					
					commentlist += '<li><div class="first clear"><div class="header fl" data-userId="'+ common.userId +'"><img src="'+ common.avatar +'" />';
					
					if(common.uCategory == 2||common.uCategory == 3||common.uCategory == 4){
						commentlist += '<i class="iconfont icon-v"></i>';
					}
					
					commentlist += '</div><div class="comment fl"><p><span class="name">'+ common.name +'</span><span class="fr">'+ createdTime +'</span></p><p class="reply" data-userId="'+ common.userId +'" data-id="'+ common.id +'" data-name="'+ common.name +'">';
					
					if(common.userId == userId){
						commentlist += '<span class="det fr" data-id="'+ common.id +'">删除</span>'+ common.content +'</p>';
					}else{
						commentlist += '<span class="reply fr" data-id="'+ common.id +'" data-name="'+ common.name +'">回复</span>'+ common.content +'</p>';
					}
					
					if(common.childrenComment.length > 0){
						commentlist += '</div></div><ul class="second">';
						$.each(common.childrenComment, function(obj, common) {
							if(common.userId == userId){
								commentlist += '<li class="reply" data-id="'+ common.id +'" data-userId="'+ common.userId +'" data-name="'+ common.name +'"><span class="det fr" data-id="'+ common.id +'">删除</span><span class="purple" data-userId="'+ common.userId +'">'+ common.name +'</span>回复<span class="purple" data-userId="'+ common.replyUserId +'">'+ common.replyUserName +'：</span>'+ common.content +'</li>';
							}else{
								commentlist += '<li class="reply" data-id="'+ common.id +'" data-userId="'+ common.userId +'" data-name="'+ common.name +'"><span class="purple" data-userId="'+ common.userId +'">'+ common.name +'</span>回复<span class="purple" data-userId="'+ common.replyUserId +'">'+ common.replyUserName +'：</span>'+ common.content +'</li>';
							}
						});
						if(common.childrenComment.length > 3){
							commentlist += '</ul><p class="more purple">查看全部评论...</p>';
						}else{
							commentlist += '</ul>';
						}
					}
				});
			}
			
			if(type == 3){
				commentlist += "</li>";
				$(".latest").append(commentlist);
			}else{
				commentlist += "</li></ul>";
				$("#commentList").append(commentlist);
			}
			$(".second").each(function(index,obj){
				$(obj).find("li:gt(2)").addClass("hide"); // 多于3条回复收起
			})
			
			
		},
		selected: function(){
			var _this = this;
			$("body").on("tap",".replay-comment li",function(){
				$('.send').removeAttr("disabled").css({"background":"#ec1c60","color":"#fff"});
				var newes = $(this).text();
				$(".write-comment").text(newes).css("color","#000");
			});
		},
		add: function(){//发布评论
			var _this = this;
			$(".send").off().on("tap",function(){
				$.ajax({
					type:"post",
					url:"/star/comment/add",
					data: {userId:userId,token:token,videoId:videoId,content:$(".write-comment").text()},
					success: function(data){
						if(data.result == "1"){
							var comt = data.data;
							var createdTime = comt.createdTime.slice(5,16);
							var html = '<li>\
											<div class="first clear">\
												<div class="header fl" data-userId="'+ comt.userId +'"><img src="'+ comt.avatar +'">';
							if(comt.uCategory == 2||comt.uCategory == 3||comt.uCategory == 4){
								html += '<i class="iconfont icon-v"></i>';
							}
							html += '</div>\
									<div class="comment fl">\
										<p><span class="name">'+ comt.name +'</span><span class="fr">'+ createdTime +'</span><p>\
										<p><span class="det fr" data-id="'+ comt.id +'">删除</span>'+ comt.content +'</p>\
									</div>\
								</div>\
							</li>';	
							
							if(comt.uCategory == 4){
								if($(".experts").length <= 0){
									$("#commentList").prepend('<h3 class="title">专家评论</h3><ul class="mui-table-view experts"></ul>');
									$(".backImg").hide();
								}
								$(".experts").prepend(html);
							}else{
								if($(".latest").length <= 0){
									$("#commentList").append('<h3 class="title">最新评论</h3><ul class="mui-table-view latest"></ul>');
									$(".backImg").hide();
								}
								$(".latest").prepend(html);
							}
							
							_this.commentinit();
						}else{
							layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
						}
						
					},
					error: function(){
						layer.open({content: '请求失败!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}
				});
			});
		},
		det: function(rid,rthis){
			$.ajax({
				type:"post",
				url:"/star/comment/delete",
				data: {userId:userId,token:token,commentId: rid},
				success: function(data){
					if(data.result == "1"){
						$(rthis).parents("li").eq(0).remove();
						if($(".latest:empty").length > 0){
							$(".latest").prev().remove().end().remove();
						}
						if($(".experts:empty").length > 0){
							$(".experts").prev().remove().end().remove();
						}
						if($("#refresh").find(".experts").length <= 0 && $("#refresh").find(".latest").length <= 0){
							$(".backImg").show();
						}
					}else{
						layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}
				},
				error: function(){
					layer.open({content: '请求失败!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		}, 
		reply: function(ruserId,rname,rid,rthis){
				if(ruserId == userId){
					layer.open({content: "不能回复自己",style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}else{
					$(".down-comment").show();
					$(".write-comment").text('@'+rname);
					$(".send").off().on("tap",function(){
						$.ajax({
							type:"post",
							url:"/star/comment/reply",
							data: {userId:userId,token:token,commentId:rid,content:$(".write-comment").text()},
							success: function(data){
								if(data.result == "1"){
										var common = data.data;
										
										if($(rthis).parents("li").find(".hide").length > 0){
											var html = '<li class="reply hide" data-id="'+ common.id +'" data-userId="'+ common.userId +'" data-name="'+ common.name +'"><span class="det fr" data-id="'+ common.id +'">删除</span><span class="purple" data-userId="'+ common.userId +'">'+ common.name +'</span>回复<span class="purple" data-userId="'+ common.replyUserId +'">'+ common.replyUserName +'：</span>'+ common.content +'</li>';
										}else{
											var html = '<li class="reply" data-id="'+ common.id +'" data-userId="'+ common.userId +'" data-name="'+ common.name +'"><span class="det fr" data-id="'+ common.id +'">删除</span><span class="purple" data-userId="'+ common.userId +'">'+ common.name +'</span>回复<span class="purple" data-userId="'+ common.replyUserId +'">'+ common.replyUserName +'：</span>'+ common.content +'</li>';
										}

										if($(rthis).parents("li").find(".second").length <= 0){
											$(rthis).parents("li").append('<ul class="second"></ul>');
										}
										
										$(rthis).parents("li").find(".second").append(html);
										$(rthis).parents("li").find(".hide").show();
										$(rthis).parents("li").find(".more").text("收起");
										videoComment.commentinit();
								}else{
									layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
								}
							},
							error: function(){
								layer.open({content: '请求失败!',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
							}
						});
					});
				}
				
		},
		systemlabel: function(){//系统标签
			var _this = this;
			$.ajax({
				url:"/star/tag/system/list",
				type:"post",
				dataType: "json",
				data:{'userId': userId,'token': token},
				success: function(data) {
					switch(data.result){
						case "1":
							var systemlabel = '';
							$.each(data.data, function(obj, systemlist) {
								systemlabel += '<li>' + systemlist.content + '</li>';
							});
							$('.systemlabel ul').append(systemlabel);
							_this.random();
							
							break;
						case "200": layer.open({content: '用户不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
				},
				error: function(){
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		},
		userlabel: function(){//用户标签
			var _this = this;
			$.ajax({
				url:"/star/tag/user/all",
				type:"post",
				dataType: "json",
				data:{'userId': userId,'token': token,'status':1},
				success: function(data) {
					switch(data.result){
						case "1":
							var userlabel = '';
							if(data.data.length == 0){
								$('.userlabel ul').append('<i class="iconfont addtages">&#xe61c;</i><p>您还没有自定义标签</p>');
							}else{
								$.each(data.data, function(obj, userlist) {
									userlabel += '<li>' + userlist.content + '</li>';
								});
								$('.userlabel ul').append(userlabel);
							}
							_this.random();
							break;
						case "200": layer.open({content: '用户不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
						default: layer.open({content: '网络出错',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2}); break;
					}
				},
				error: function(){
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		},
		random: function(){//随机颜色
			var _this = this;
			$(".replay-comment ul.mui-table-view li").each(function() {
				$(this).css("border-color", getRandomColor());
			});
			
			function getRandomColor() {
				var color = '#';
				var cArray = ['ef7a5c', 'e1d657', 'facecd', '8babb1', 'b1edcd', 'b6f7ff', 'e3b3fc'];
				for(var i = 0; i < 1; i++) {
					var cIndex = Math.round(Math.random() * 6);
					color += cArray[cIndex];
				}
				return color;
			}
		},
		commentinit: function(){
			$(".down-comment").hide();
			$(".send").attr("disabled","disabled").css({"color":"#9E9E9E","background":"#666"});
			$(".write-comment").text("写评论").css("color","#807f83");
		},
		other: function(){
			var _this = this;
			//初始化MUI滚动事件
			mui('#refresh').scroll({
				deceleration: 0.0005
			});
			mui('.Comment').scroll({
				bounce: false
			});
			
			//下方tab切换
			$(".self-comment ul li").eq(1).click(function() {
				$(this).addClass("active").siblings().removeClass("active");
				$(".replay-comment").eq(0).css("display", "block")
			});
			$(".self-comment ul li").eq(2).click(function() {
				$(this).addClass("active").siblings().removeClass("active");
				$(".replay-comment").eq(0).css("display", "none")
				
			});
			
			//自定义评论
			var headerHeight = $(".mui-bar-nav").height();//标题高度
			var commentHeight = $(".l-footer").height();//评论条高度
			var scrollHeight = document.documentElement.clientHeight - headerHeight - commentHeight;//评论内容高度
			$('.mui-scroll-wrapper').eq(0).css('height',scrollHeight + 'px');
			
			$(".comment-text").click(function() {
				$(".down-comment").show();
				_this.add();
			});
			
			$(".mui-scroll-wrapper").not(".Comment").on("tap",function(e) {
				if($(".down-comment").is(":visible")){
					_this.commentinit();
					e.stopPropagation();
				}
			});
			$("body").on("tap",".addtages",function(){
				window.location.href = "addtags.html"
			});
			
			$("body").on("tap",".more",function(){
				if($(this).text() == "查看全部评论..."){
					$(this).text("收起").parent().find(".hide").show();
				}else{
					$(this).text("查看全部评论...").parent().find(".hide").hide();
				}
			});
			
			$("body").on("tap",".reply",function(){
				var ruserId = $(this).attr("data-userId");
				var rname = $(this).attr("data-name");
				var rid = $(this).attr("data-id");
				var rthis = this;
				_this.reply(ruserId,rname,rid,rthis);
			});
			
			$("body").on("tap",".det",function(e){
				var did = $(this).attr("data-id");
				var dthis = this;
				_this.det(did,dthis);
				e.stopPropagation();
			});
			
			$("body").on("tap",".header,.purple",function(e){
				if($(this).hasClass("more"))return;
				operation.gohome($(this).attr("data-userId"));
				e.stopPropagation();
			});
			
			$("body").on("longtap","li.reply,.comment>p:last-child",function(e){
				$("#preply").removeClass("hide");
				$("#pdet").removeClass("hide");
				
				var ruserId = $(this).attr("data-userId");
				var rname = $(this).attr("data-name");
				var rid = $(this).attr("data-id");
				var rthis = this;
				if(ruserId == userId){
					$("#preply").addClass("hide");
				}else{
					$("#pdet").addClass("hide");
				}
				mui('#popover').popover("show");
				var matrix = $("#refresh>.mui-scroll").css("transform");
				var scrollTop = parseInt(matrix.match(/matrix\(\d+, \d+, \d+, \d+, \d+, (\-?\d+)\)/)[1]);
		        var x = e.currentTarget.offsetLeft + 80; //页面触点X坐标
		        var y = e.currentTarget.offsetTop + scrollTop; //页面触点Y坐标
		        $("#popover").css({"top":y+"px","left":x+"px"});
		        $("#preply").on("tap",function(){
		        	mui('#popover').popover("hide");
		        	_this.reply(ruserId,rname,rid,rthis);
		        })
		        $("#pdet").on("tap",function(){
		        	mui('#popover').popover("hide");
		        	_this.det(rid,$(rthis).find(".det"));
		        })
		       	$("#preport").on("tap",function(){
		        	mui('#popover').popover("hide");
		        	mui('#reportPopover').popover("show");
		        	$("#reportPopover li").on("tap", function(e) {
						var reason;
						switch($(e.target).index()){
							case 0:
								reason = 1;
								break;
							case 1:
								reason = 2;
								break;
							case 2:
								reason = 3;
								break;
							case 3:
								reason = 4;
								break;
							case 4:
								reason = 5;
								break;
						}
						operation.report(2,reason,rid);
					});
					$("#channel2").on("tap",function(){
		        		mui('#reportPopover').popover("hide");
					});
		       	});
		       	$("#pcancel").on("tap",function(){
		        	mui('#popover').popover("hide");
		       	});
			});
			
			
		}
	}
	videoComment.init();
});