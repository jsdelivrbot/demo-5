$(function() {
	var userId = localStorage.getItem('userId'),
	token = localStorage.getItem('token'),
	personMatchId = localStorage.getItem('personMatchId'),
	status = localStorage.getItem('stage'),
	schedule = localStorage.getItem('schedule');
	matchAgeId = sessionStorage.getItem('matchAgeId'),
	isShowScore = localStorage.getItem('isShowScore');
	$('.status').html(schedule);

	mui('.mui-scroll-wrapper').scroll({
		indicators: false, //是否显示滚动条
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});

	var search_score = {
		init: function() {
			var _this = this;
			_this.scoreEvaluation(matchAgeId);
		},
		//分数.评价
		scoreEvaluation: function(matchAgeId) {
			var _this = this;
			
			$('#score_area').css('display','none');
			$.ajax({
				type: "get",
				url: "/star/match/matchScore",
				data: {
					userId: userId,
					token: token,
					personMatchId: personMatchId,
					currentVersion:current
				},
				dataType: "json",
				success: function(data) {
					$('#score_area').css('display','block');
					console.log(data);
					switch(data.result) {
						case "1":
							//得分评价
							var str = data.data.scoreEvaluation.replace(/\r|\n/g,'<br>');
							$('.bottom_content').html("<p>" + str + "</p>");
							
							if(isShowScore == 1){
								_this.showScore(data);
							}else{
								$(".top").hide().next().css("margin-top","1.72rem");
							}
							break;
						default:
							layer.open({
								content: '网络出错，请重试',
								style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
								time: 2
							});
							break;
					}

				},

				error: function() {
					layer.open({
						content: '请求失败',
						style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',
						time: 2
					});
				}
			}); //ajax
		}, //scoreEvaluation
		showScore: function(data){
			var _this = this;
			var contentFraction = data.data.contentFraction; //内容得分
			var pronunciationFraction = data.data.pronunciationFraction; //发音得分
			var styleFraction = data.data.styleFraction; //风采得分
			var sumFraction = data.data.sumFraction; //总分
			var testFraction = data.data.testFraction; //测评
			var interviewFraction = data.data.interviewFraction; //面试
			console.log('发音得分为：' + pronunciationFraction, '风采得分为：' + styleFraction, '内容得分:' + contentFraction, '测试得分为：' + testFraction, '面试得分：' + interviewFraction, '总分为:' + sumFraction);
			//模拟数据
			/*matchAgeId="1";幼儿组
			status='1';
			console.log('现在是大学组初赛' + status + '显示1环');
			console.log('开始模拟大学成人组初赛数据,显示1环');*/
			if(status !== "1") { //非初赛
				//内容 发音 风采
				$('.score_num').html(sumFraction);//总分
				$('.pie_info').children('.three').css('display', 'block').siblings().css('display', 'none');
				$('.contentFraction').html(contentFraction);//内容
				$('.pronunciationFraction').html(pronunciationFraction);//发音
				$('.styleFraction').html(styleFraction);//风采
				_this.drawThreeCircle(contentFraction,pronunciationFraction,styleFraction);

			} else { //初赛
				if( matchAgeId == '1') {
					//面试
					$('.score_num').html(sumFraction);//总分
					$('.interview').html(interviewFraction);//面试
					_this.drawOneCircle(interviewFraction);
				} else {//测评，面试
					$('.score_num').html(sumFraction);//总分
					$('.pie_info').children('.two').css('display', 'block').siblings().css('display', 'none');
					$('.evaluate').html(testFraction);//测评
					$('.interview').html(interviewFraction);//面试
					_this.drawTwoCircle(testFraction,interviewFraction);
				}
			}
		},
		drawPercentCircle: function(circleId, percent, circleRadius, strokeColor, strokeWidth, fill, transform, sumFraction, pronunciationFraction, styleFraction, contentFraction) {
			var circle = document.getElementById(circleId);
			var percent = parseInt(percent) / 100,
				perimeter = Math.PI * 2 * circleRadius; //周长=2πr
			circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1 - percent));
			circle.setAttribute('stroke', strokeColor);
			circle.setAttribute('stroke-width', strokeWidth);
			circle.setAttribute('fill', fill);
			circle.setAttribute('transform', transform);
		},
		drawOneCircle: function(contentFraction) {
			var _this = this;
			$('#circle2').css('display', 'none');
			$('#circle3').css('display', 'none');
			$('.pie_info').children('.one').css('display', 'block').siblings().css('display', 'none');
			_this.drawPercentCircle("circle", 75, 180, "#252331", '24', 'none', 'matrix(0,-1,1,0,0,440)');
			_this.drawPercentCircle("circle1", contentFraction * 0.75, 180, "#f74468", '24', 'none', 'matrix(0,-1,1,0,0,440)');
		},
		drawTwoCircle: function(testFraction, interviewFraction) {
			console.log('大学成人组测评得分:' + testFraction + '大学成人组面试得分:' + interviewFraction);
			var _this = this;
			$('#circle3').css('display', 'none');
			_this.drawPercentCircle("circle", 75, 180, "#252331", '24', 'none', 'matrix(0,-1,1,0,0,440)');
			_this.drawPercentCircle("circle1", testFraction * 0.75, 180, "#f74468", '24', 'none', 'matrix(0,-1,1,0,0,440)');
			_this.drawPercentCircle("circle2", interviewFraction * 0.75, 145, "#2f92ff", '24', 'none', 'matrix(0,-1,1,0,0,440)');
		},
		drawThreeCircle: function(contentFraction, pronunciationFraction, styleFraction) {
			var _this = this;
			_this.drawPercentCircle("circle", 75, 180, "#252331", '24', 'none', 'matrix(0,-1,1,0,0,440)');
			_this.drawPercentCircle("circle1", contentFraction * 1.875, 180, "#f74468", '24', 'none', 'matrix(0,-1,1,0,0,440)');
			_this.drawPercentCircle("circle2", pronunciationFraction * 1.875, 145, "#2f92ff", '24', 'none', 'matrix(0,-1,1,0,0,440)');
			_this.drawPercentCircle("circle3", styleFraction * 1.875, 110, "#c03cfd", '24', 'none', 'matrix(0,-1,1,0,0,440)');
		}

	}
	search_score.init();
});