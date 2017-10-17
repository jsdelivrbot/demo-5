$(function() {
	var userId = localStorage.getItem("userId");
	var token = localStorage.getItem("token");
	
	mui.init();
	(function($) {
		//阻尼系数
		var deceleration = mui.os.ios ? 0.003 : 0.0009;
		$('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
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
								schedule.goView();
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
						}
					}
				});
			});
		});
	})(mui);
	
	var schedule = {
		init: function() {
			var _this = this;
			_this.matchList();
			_this.other();
			$("#place").text(sessionStorage.getItem("place"));
		},
		// 刷新页面
		goView: function(){
			$.ajax({
				type: "post",
				url: "/star/match/matchStatus",
				data:{userId:userId,token:token,currentVersion:current},
				dataType: "json",
				success: function(data) {
					if(data.data.testStatus == null){
						parent.location.reload();
					}else{
						window.location.reload();
					}
				},
				error: function(){
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			})
		},
		// 是否匹配赛程
		matchList: function() {
			var _this = this;
			$.ajax({
				url: "/star/match/list",
				type: "post",
				dataType: "json",
				data: {'userId': userId,'token': token,currentVersion:current},
				success: function(data) {
					console.log(data);
					if(data.result == 1) {
						if(data.data.length == 0) {
							var html = '';
							html = '<div class="no-schedule"><img src="../images/my_match_image_schedule.png" alt="" /><p>赛程信息暂未设置<br />如有问题请咨询本地区赛务老师</p></div>'
							$('#item1mobile .mui-table-view').append(html);
						} else {
							var html = '';
							$.each(data.data, function(obj, match) {
								
								if(match.isShowScore == 0){
									sumFraction = '';
								}else{
									sumFraction = match.sumFraction;
								}
								
								localStorage.setItem('personMatchId', match.personMatchId);
								//模拟数据
//								var createTime = "2016-11-16 14:01:51",   //
//									createUserId = 6,   //
//									remarks = "123",      //
//									id = 69,   //
//									
//									startTime = "2016-06-26 14:01:38",    //比赛开始时间
//									endTime = "2016-11-17 14:01:40",      //比赛结束时间
//									serverTime = "2016-11-17 17:41:34",   //服务器当前时间
//									
//									isReleaseScore = "1",  //已公布成绩 1:是 其他都是否
//									isShowScore = "0",     //显示分数 1:是 0：否
//									sumFraction = "100",   //总成绩
//									
//									promotion = "1",     //晋级状态 1:晋级 2:未晋级
//									notUpgradeNotice = "没晋级",   //未晋级通知
//									upgradeNotice = "已晋级";    //晋级通知
//									
//									stage = "1",   //比赛阶段(1:初赛2:复赛3:决赛4:市赛5:省赛)
//									personMatchId = "55885",   //比赛人成绩id
//									place = "北京",    //比赛地点（一级赛区名）
//									twoPlace = "朝阳",    //二级赛区名
//									matchAreaId = "12",    //地区
//									matchGroup = "2";      //组别
									
								//日期格式化(开始时间/结束日期)
								var startMonth = match.startTime.substr(5,2);//11
								var startDay = match.startTime.substr(8,2);//16
								var endMonth = match.endTime.substr(5,2);//11
								var endDay = match.endTime.substr(8,2);//17

								var m1 = ["01","02","03","04","05","06","07","08","09","10","11","12"];
								var m2 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"];
								function changeMonth(before,after,value){
									var index = before.indexOf(value);
									var changemonth = after[index];
									return changemonth;
								}

								var changeStartTime = changeMonth(m1,m2,startMonth);
								var changeEndTime = changeMonth(m1,m2,endMonth)


								//开始拼接接口数据
								html+='<li><div class="cont-time-img"><img src=""/></div><p class="match-data clear"><span class="fl"><i>' + changeStartTime + '</i>.' + startDay + '&nbsp;/&nbsp;<i>' + changeEndTime + '</i>.' + endDay + '</span>';
								//查看成绩详情按钮(是否公布成绩)
								if(match.isReleaseScore == "1"){
									html += '<span class="fr"><a class="score-details" data-isShowScore="'+ match.isShowScore +'">查看详情>></a></span></p>'
								}
								//显示赛事列表
								if(match.stage == "5"){//省赛
									html += '<h3 data-stage="' + match.stage + '">省赛' + '(' + match.place + ')</h3>';
								}else if(match.stage == "4"){//市赛
									html += '<h3 data-stage="' + match.stage + '">市赛' + '(' + match.twoPlace + ')</h3>';
								}else if(match.stage == "3"){//决赛
									html += '<h3 data-stage="' + match.stage + '">决赛' + '(' + match.threePlace + ')</h3>';
								}else if(match.stage == "2"){//复赛
									html += '<h3 data-stage="' + match.stage + '">复赛' + '(' + match.threePlace + ')</h3>';
								}else if(match.stage == "1"){//初赛
									html += '<h3 data-stage="' + match.stage + '">初赛' + '(' + match.threePlace + ')</h3>';
								}

								//比赛状态
								if(match.serverTime<match.startTime){
									html+='<p class="promotion-status">比赛暂未开始</p>';
								}else if(match.serverTime>match.endTime){
									if(match.isReleaseScore !== "1"){//是否公布成绩
										html += '<p class="promotion-status">比赛已结束，请耐心等待结果</p>';
									}else if(match.promotion=="1"){//已晋级
										html += '<p class="promotion-status">已晋级<br />' + match.sumFraction + '</p><span class="supply-text">' + match.upgradeNotice + '</span>';
//										html+='<p class="promotion-status">' + upgradeNotice + '<br />' + sumFraction + '</p><span class="supply-text">恭喜您已晋级市赛，详情请咨询赛区张老师，电话：158123586974</span>';
									}else{//未晋级
										html += '<p class="promotion-status">未晋级<br />' + match.sumFraction + '</p><span class="supply-text">' + match.notUpgradeNotice + '</span>';
//										html+='<p class="promotion-status">' + notUpgradeNotice + '<br />' + sumFraction + '</p><span class="supply-text">恭喜您已晋级市赛，详情请咨询赛区张老师，电话：158123586974</span>';
									}
								}else{
									html += '<p class="promotion-status">比赛进行中……</p>';
								}
							});
							$('#scroll1 .have-schedule').show().children('.clear').append(html);

							$('.score-details').on('tap',function(){
								var stage = $(this).parent().parent().next().attr('data-stage');
								var schedule = $(this).parent().parent().next().text();
								var isShowScore = $(this).attr("data-isShowScore");
								localStorage.setItem('stage',stage);
								localStorage.setItem('schedule',schedule);
								localStorage.setItem('isShowScore',isShowScore);
							})

							_this.other();
						}
					}
				}
			});
		},
		other: function(){
			var _this = this;
			$('.have-schedule ul li:nth-child(4n+1) img').attr('src','../images/my_match_icon_time_red.png');
			$('.have-schedule ul li:nth-child(2n) img').attr('src','../images/my_match_icon_time_white.png');
			$('.have-schedule ul li:nth-child(4n+3) img').attr('src','../images/my_match_icon_time_green.png');
			$('.score-details').on('tap',function(){
				mui.openWindow({
					url: "../html/score_details.html"
				});
			})
		}
	};
	schedule.init();
})