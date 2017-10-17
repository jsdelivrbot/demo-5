$(document).ready(function() {

	var userId = localStorage.getItem('userId'),
		token = localStorage.getItem('token'),
		cookie = localStorage.getItem("cookie");
	var userInfo, testQuestions, answerTime, totalCount, groupId;

	var timeOut = false;

	var evaluation = {
		init: function() {
			var _this = this;
			_this.reading();
			var userInfo = JSON.parse(localStorage.getItem("userInfo"+userId));
			if(userInfo){
				_this.getquestion();
			}
			

			$('#btn-next,.btn-test').off().on('click', function(e) {
				_this.nextPage();
			});

			// 选中文本
			$("body").on("click",".option .option-text",function(){
				$(this).addClass("selected").siblings().removeClass("selected");
				$('#btn-next').removeAttr('disabled').addClass('active');
				$('.btn-test').css('background', '#ff296a');
			})
			

			// 选中图片
			$('.option .option-img').click(function() {
				$(this).addClass("img-selected").siblings().removeClass("img-selected");
				$('#btn-next').removeAttr('disabled').addClass('active');
				$('.btn-test').css('background', '#ff296a');
			});

			$("#tips").hide();
			$("#btn-next").hide();

		},
		getquestion: function() { //获取试题
			console.log(testQuestions);
			$.each(testQuestions, function(index, ele) {
				// 每部分首页说明
				var explain = '<div class="container test-explain"><section><h2>' + ele.indexTitle + '</h2>'

				for(var i = 0, l = ele.indexContent.length; i < l; i++) {
					explain += '<dl>\
									<dt><img src="../images/test_icon_' + (i + 1) + '.png"></dt>\
									<dd>' + ele.indexContent[i] + '</dd>\
								</dl>';
				}
				explain += '</section><button class="btn-test">Next</button></div>';
				$("body").append(explain);

				switch(ele.id) {
					case "1": //词汇
						var vocabulary = '';
						$.each(ele.questions, function(index, questions) {
							console.log(questions)
							vocabulary += '<div class="container">\
										<div class="question-num" data-id="' + questions.id + '">\
											<span class="number-curren">' + questions.number + '</span>/<span class="number-tolal">' + totalCount + '</span>\
										</div>\
										<div class="ques-stems">' + questions.title + '</div>';
							// 图片
							if(questions.image) {
								vocabulary += '<div class="ques-img"><img src="' + questions.image.url + '" alt=""></div>';
							}

							vocabulary += '<div class="option">';

							for(var i = 0, l = questions.options.length; i < l; i++) {
								vocabulary += '<p class="option-text" data-score="' + questions.options[i].code + '"><span class="option-ques option-' + questions.options[i].code + '"></span><span class="option-digit">' + questions.options[i].title + '</span></p>';
							}

							vocabulary += '</div>\
												<div id="tipsPopover" class="mui-popover">\
													<i class="btn-close"></i>\
													<h3>Topic</h3>\
													<div class="introduction">' + questions.smallQuestionType.tips[0] + '</div>\
												</div>\
											</div>';
						});
						
						$(".test-explain").eq(index).after(vocabulary);
						break;
					case "2": //语法
						var grammar = '';
						$.each(ele.questions, function(index, questions) {
							console.log(questions)
							
							grammar += '<div class="container">\
										<div class="question-num" data-id="' + questions.id + '">\
											<span class="number-curren">' + questions.number + '</span>/<span class="number-tolal">' + totalCount + '</span>\
										</div>\
										<div class="ques-stems">' + questions.title + '</div>\
										<div class="option">';

							for(var i = 0, l = questions.options.length; i < l; i++) {
								grammar += '<p class="option-text" data-score="' + questions.options[i].code + '"><span class="option-ques option-' + questions.options[i].code + '"></span><span class="option-digit">' + questions.options[i].title + '</span></p>';
							}

							grammar += '</div>\
									<div id="tipsPopover" class="mui-popover">\
										<i class="btn-close"></i>\
										<h3>Topic</h3>\
										<div class="introduction">' + questions.smallQuestionType.tips[0] + '</div>\
									</div>\
								</div>';
						});
						

						$(".test-explain").eq(index).after(grammar);
						break;
					case "3": //阅读
						var reading = '';

						$.each(ele.questions, function(index, questions) {
							console.log(questions)
							var title = questions.title == null ? "" : questions.title;
							if(questions.finllInputs) { // 填空

								var finllInputs = questions.finllInputs;
								var finllInputsIndex = -1;

								var content = questions.content.replace(/\[\]/g, function() {
									finllInputsIndex++;
									return '<span class="brackets">(</span><span class="number-curren">' + finllInputs[finllInputsIndex].number + '</span>/<span class="number-tolal">70</span><span class="brackets">)</span><span class="blank_area"><input type="text" class="inp" data-id="' + finllInputs[finllInputsIndex].id + '" value=""></span>';
								});

								reading += '<div class="container reading cloze">\
											<div class="ques-tittle">' + title + '</div>\
											<div class="ques-stems">' + content + '</div>\
											<div id="tipsPopover" class="mui-popover">\
												<i class="btn-close"></i>\
												<h3>Topic</h3>\
												<div class="introduction">' + questions.smallQuestionType.tips[0] + '</div>\
											</div>\
										</div>';

							} else {

								reading += '<div class="container reading reading-choice">\
												<div class="mui-scroll-wrapper">\
													<div class="mui-scroll">\
														<div class="ques-tittle">' + title + '</div>';
								// 图片阅读
								if(questions.questionImage && questions.questionImage.length) {
									reading += '<div class="read-img mui-content-padded">\
										<img src="' + questions.questionImage[0].url + '" alt="" data-preview-src="">\
									</div>';
								}

								if(questions.content) {
									reading += '<div class="ques-stems">' + questions.content + '</div>';
								}

								reading += '</div></div><div class="read-container">\
											<div class="read-slip-btn"><img src="../images/test_icon_slip.png"></div>';

								if(questions.choiceQuestions) {
									for(var i = 0, l = questions.choiceQuestions.length; i < l; i++) {
										if(i == 0) {
											reading += '<section class="read-cont read-active">';
										} else if(i == l - 1) {
											reading += '<section class="read-cont read-last">';
										} else {
											reading += '<section class="read-cont">';
										}
										reading += '<div class="question-num" data-id="' + questions.choiceQuestions[i].id + '">\
															<span class="number-curren">' + questions.choiceQuestions[i].number + '</span>/<span class="number-tolal">' + totalCount + '</span>\
														</div>\
														<div class="ques-stems">' + questions.choiceQuestions[i].title + '</div>\
														<div class="option">';

										for(var n = 0, c = questions.choiceQuestions[i].options; n < c.length; n++) {
											reading += '<p class="option-text" data-score="' + c[n].code + '"><span class="option-ques option-' + c[n].code + '"></span><span class="option-digit">' + c[n].title + '</span></p>';
										}
										reading += '</div></section>';
									}
								}
								if(questions.options) {

									reading += '<section class="read-cont read-active read-last">\
													<div class="question-num" data-id="' + questions.id + '">\
														<span class="number-curren">' + questions.number + '</span>/<span class="number-tolal">' + totalCount + '</span>\
													</div>\
													<div class="ques-stems"></div>\
													<div class="option">';

									for(var n = 0, c = questions.options; n < c.length; n++) {
										reading += '<p class="option-text" data-score="' + c[n].code + '"><span class="option-ques option-' + c[n].code + '"></span><span class="option-digit">' + c[n].title + '</span></p>';
									}
									reading += '</div></section>';
								}

								reading += '</div><div id="tipsPopover" class="mui-popover">\
												<i class="btn-close"></i>\
												<h3>Topic</h3>\
												<div class="introduction">' + questions.smallQuestionType.tips[0] + '</div>\
											</div>\
										</div>';
							}

						});

						$(".test-explain").eq(index).after(reading);
						break;
					case "4": //听力
						var listening = '';
						$.each(ele.questions, function(index, questions) {
							console.log(questions)
							
							// 音频+文字
							listening += '<div class="container listening">\
											<div class="question-num" data-id="' + questions.id + '">\
												<div class="fl listening-num">\
													<span class="number-curren">' + questions.number + '</span>/<span class="number-tolal">' + totalCount + '</span>\
												</div>\
												<div class="listening-btn-audio">\
													<audio id="mp3Btn"><source src="' + questions.audioUrl + '" type="audio/mpeg"></audio>\
												</div>\
											</div>\
												<div class="ques-stems">' + questions.title + '</div>';
							// 图片		
							if(questions.image) {
								listening += '<div class="ques-img"><img src="' + questions.image.url + '"></div>';
							}

							listening += '<div class="option">';

							for(var i = 0, l = questions.options; i < l.length; i++) {
								if(l[i].image) {
									// 图片选项
									listening += '<p class="option-img" data-score="' + l[i].code + '">\
										<span class="option-ques option-' + l[i].code + '"></span>\
										<span class="answer-img"><img src="' + l[i].image.url + '"><span></span></span>\
									</p>';
								} else {
									// 文字选项
									listening += '<p class="option-text" data-score="' + l[i].code + '"><span class="option-ques option-' + l[i].code + '"></span><span class="option-digit">' + l[i].title + '</span></p>';
								}
							}

							listening += '</div>\
											<div id="tipsPopover" class="mui-popover">\
												<i class="btn-close"></i>\
												<h3>Topic</h3>\
												<div class="introduction">' + questions.smallQuestionType.tips[0] + '</div>\
											</div>\
										</div>';

						});

						$(".test-explain").eq(index).after(listening);
						break;
				}
			});

			$(".container").eq(0).addClass("answer-active");
		},
		continueanswer: function() { //继续答题
			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId)),
				currentPage = userInfo.currentPage,
				answeredCount = userInfo.answeredCount,
				totalCount = userInfo.totalCount;

			if(currentPage) {
				$(".answer-active").removeClass("answer-active");

				$(".container").eq(currentPage).addClass("answer-active");

				var currentQuestion = $(".number-curren").eq(answeredCount);
				if($(".answer-active").hasClass("reading")) {
					currentQuestion.parents(".read-cont").addClass("read-active").siblings().removeClass("read-active");
				}

				if(answeredCount == totalCount - 1 || timeOut == true) {
					$('#btn-next').html("交卷");
				}

				evaluation.changeNextBtn();
				evaluation.listening();
				evaluation.reading();
			}
		},
		countDown: function() { //倒计时
			var _this = this;
			var t = answerTime.split(":");
			var m = t[0];
			var s = t[1];

			var timer = setInterval(function() {
				s--;
				if(s < 0) {
					s = 59;
					m--;
				}
				if(s < 10) {
					$('#header .mui-title').html(m + ':0' + s);
				} else {
					$('#header .mui-title').html(m + ':' + s);
				}
				//时间到自动交卷
				if(s == 0 && m == 0) {
					timeOut = true;
					clearInterval(timer);
					_this.submitAnswer();
				}

				var answerTime = $('#timeCounter').text();
				var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
				userInfo.answerTime = answerTime;
				localStorage.setItem("userInfo" + userId, JSON.stringify(userInfo));

			}, 1000);
		},
		listening: function() {
			//音频
			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			audioIndex = userInfo.audioIndex;

			$('.answer-active #mp3Btn').on('ended', function() { //播放完毕
					var path = "../images/voice_stop.png";
					$('.answer-active .listening-btn-audio').css({
						'background': 'url(' + path + ') no-repeat center bottom',
						'background-size': 'cover'
					});
				})
			//播放器控制
			var audio = $('.answer-active #mp3Btn').get(0);

			if(audioIndex == 0) {
				$('.answer-active .listening-btn-audio').click(function() {
					if($('.answer-active .listening-btn-audio').attr("data-available")) { // 测评听力只能听一遍
						return;
					}
					event.stopPropagation(); //防止冒泡
					if(audio.paused) { //如果当前是暂停状态
						var path = "../images/voice_play.png";
						$('.answer-active .listening-btn-audio').attr("data-available", "false").css({
							'background': 'url(' + path + ') no-repeat center bottom',
							'background-size': 'cover'
						});
						audio.play(); //播放
					}
					var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
					userInfo.audioIndex = 1;
					localStorage.setItem("userInfo" + userId, JSON.stringify(userInfo));
				});
			}
		},
		reading: function() {
			if($('.answer-active').find('.mui-scroll-wrapper').size() != 0) {
				//阅读类型-图表/文字
				var totalHeight = document.documentElement.clientHeight || document.body.clientHeight;
				var headerHeight = $("#header").height(); //标题高度
				var optionHeight = $(".answer-active .read-container").height(); //选项高度
				var questionHeight = totalHeight - optionHeight - headerHeight; //题干高度
				var slipHeight = optionHeight - 170; //滑动高度
				$('.answer-active .mui-scroll-wrapper').css('height', questionHeight + 'px');

				$('.answer-active .read-slip-btn').off().on('click', function() {
					if($(".answer-active .read-container").hasClass('read-cont-slip')) {
						$(".answer-active .read-container").animate({
							bottom: '0'
						}).removeClass('read-cont-slip');
						$('.answer-active .mui-scroll-wrapper').css('height', questionHeight + 'px');
					} else {
						$(".answer-active .read-container").animate({
							bottom: '-' + slipHeight + 'px'
						}).addClass('read-cont-slip');
						$('.answer-active .mui-scroll-wrapper').css('height', questionHeight + slipHeight + 'px');
					}
				})
			}

			//阅读类型-完形填空
			$('input').on('input propertychange', function() {
				var quesCount = 0;
				var fillCount = 0;
				$(".answer-active .inp").each(function() {
					quesCount++;
					if($(this).val() != '') {
						fillCount++;
					}
				});
				if(fillCount < quesCount) {
					$('#btn-next').attr("disabled", 'true').removeClass('active');
				} else {
					$('#btn-next').removeAttr("disabled").addClass('active');
				}
			});

			//阅读类型-图表/文字初始化
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005
			});
			mui.previewImage();
		},
		nextPage: function(e) {
			var _this = this;

			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			var answeredCount = userInfo.answeredCount;
			userInfo.audioIndex = 0;
			localStorage.setItem("userInfo" + userId, JSON.stringify(userInfo));

			//如果已做完所有题,就直接提交

			if(!answeredCount) {
				answeredCount = 0;
			}

			if($('#btn-next').hasClass("active") && !$('#btn-next').is(":hidden")) {
				if(answeredCount < totalCount && timeOut == false) {
					_this.storeAnswer();
				}
			}
			
			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			var answeredCount = userInfo.answeredCount;
			if(answeredCount == totalCount - 1 || timeOut == true) {
				$('#btn-next').html("交卷");
			}
			if(answeredCount == totalCount || timeOut == true) {
				_this.submitAnswer();
				return;
			}

			if($('.answer-active').find('.listening-btn-audio').size() != 0) {
				var audio = $('.answer-active').find('#mp3Btn').get(0);
				audio.pause();
			}

			//如果当前是阅读多个选择题
			if($('.answer-active').hasClass('reading-choice')) {
				// 阅读选项卡初始化显示所有答案
				$(".answer-active .read-container").animate({
					bottom: '0'
				}).removeClass('read-cont-slip');

				//如果当前是多个选择题的最后个,就跳转到下一个页面
				if(!$('.answer-active .read-active').hasClass('read-last')) {
					//如果不是最后一个,就跳转到下一个选择题
					$('.answer-active .read-active').removeClass('read-active').hide().next().addClass('read-active').show();
					_this.changeNextBtn();
					return;
				}
			}

			var isCurrentExplain = $('.answer-active').hasClass("test-explain");

			$('.answer-active').removeClass('answer-active').hide().next().show().addClass('answer-active');

			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			userInfo.currentPage = $(".container").index($(".answer-active"));// 记录当前页
			localStorage.setItem("userInfo" + userId, JSON.stringify(userInfo));

			if(isCurrentExplain) {
				mui(".answer-active #tipsPopover").popover("show");
			}

			_this.changeNextBtn();

			if($('.answer-active').hasClass('listening')) {
				_this.listening();
			}

			if($('.answer-active').hasClass('reading')) {
				_this.reading();
			}
		},
		storeAnswer: function() { //保存答案
			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			var answers = userInfo.answers;
			if(answers == null) {
				answers = new Array();
			}

			var questionCount = 0;

			if($('.answer-active').hasClass('cloze')) { //完型
				$(".answer-active").find('.inp').each(function(i, d) {
					var choice = $(this).val();
					var id = $(this).attr("data-id");
					var answer = new Object();
					answer.id = id;
					answer.choice = choice;
					answers.push(answer);

					questionCount++;
				});
			} else if($(".answer-active").hasClass('reading-choice')) { //阅读
				var id = $(".answer-active .read-active .question-num").attr("data-id");
				var choice = $(".answer-active .read-active .selected").attr("data-score");
				var answer = new Object();
				answer.id = id;
				answer.choice = choice;
				answers.push(answer);
				questionCount++;
			} else { //其他
				var selectedObj = $(".answer-active").find('.selected');
				if(selectedObj.length == 0) {
					selectedObj = $(".answer-active").find('.img-selected');
				}
				var choice = $(selectedObj).attr('data-score');
				var id = $('.answer-active').find('.question-num').attr('data-id');
				var answer = new Object();
				answer.id = id;
				answer.choice = choice;
				answers.push(answer);
				questionCount++;
			}

			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			userInfo.answers = answers;
			localStorage.setItem("userInfo" + userId, JSON.stringify(userInfo));

			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			var answeredCount = userInfo.answeredCount;
			if(!answeredCount) {
				answeredCount = 0;
			}
			answeredCount = parseInt(answeredCount) + questionCount;
			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			userInfo.answeredCount = answeredCount;
			localStorage.setItem("userInfo" + userId, JSON.stringify(userInfo));
			console.log(userInfo)
		},
		changeNextBtn: function() { //next按钮显示
			if($('.answer-active').hasClass('test-explain')) {
				$('#btn-next').hide();
				$("#tips").hide();
			} else {
				$('#btn-next').show();
				$('#btn-next').attr('disabled', 'ture').removeClass('active').css('color', '#969595');
				$("#tips").show();
			}

			// 弹框
			$("#tips").click(function() {
				mui(".answer-active #tipsPopover").popover("show");

			});
			$(".btn-close").click(function() {
				mui(".answer-active #tipsPopover").popover("hide");
			});
		},
		submitAnswer: function() { //提交答案
			var userInfo = JSON.parse(localStorage.getItem("userInfo" + userId));
			var answeredCount = userInfo.answeredCount;
			var answers = userInfo.answers;
			
			if(answers == null) {
				layer.open({
					content: "请先答题",
					btn: ["确定"],
					yes: function() {
						window.location.reload();
					}
				});
				var answerTime = userInfo.totalTime;
				$('#timeCounter').text(answerTime);
				evaluation.countDown();
				return;
			}

			var answerJson = new Object();
			for(var i = 0; i < answers.length; i++) {
				var id = answers[i].id;
				var choice = answers[i].choice;
				answerJson[id] = choice;
			}

			$.ajax({
				url: '/star/question/submitAnswer',
				type: 'post',
				data: {
					"answerJson": JSON.stringify(answerJson),
					"userId": userId,
					'token': token,
					"id": groupId
				},
				beforeSend: function() {
					if(answeredCount == totalCount) {
						layer.open({
							content: '所有题目都已完成，正在提交<br/><img src="../images/ajax-loader.gif"',
							shadeClose: false
						});
					} else {
						layer.open({
							content: '时间已经用尽，正在提交<br/><img src="../images/ajax-loader.gif"',
							shadeClose: false
						});
					}
				},
				success: function(result) {
					if(result.result == "1") {
						window.location.href = "report.html";
					} else {
						layer.open({
							content: result.msg,
							btn: ["确定"],
							yes: function() {
								window.location.href = "report.html";
							}
						});
					}
				}
			});
		}
	}
		
		var userInfo = JSON.parse(localStorage.getItem("userInfo"+userId));
		if(userInfo) {
			answerTime = userInfo.answerTime;
			totalCount = userInfo.totalCount;
			groupId = userInfo.groupId;
			testQuestions = userInfo.testQuestions;
			$('#timeCounter').text(answerTime);
			if(answerTime !== "0:00") {
				evaluation.countDown();
			}
			
			evaluation.init();
			evaluation.continueanswer();
		}else{
			var userInfo = new Object();
			userInfo.userId = userId;
			userInfo.token = token;

			$.ajax({
				url: "/star/question/testGet",
				data: {
					'userId': userId,
					'token': token
				},
				dataType: 'json',
				async: false,
				type: 'post',
				success: function(data) {
					console.log(data);

					answerTime = data.data.answerTime + ":00";
					totalTime = data.data.answerTime + ":00";
					totalCount = data.data.total;
					groupId = data.data.id;
					testQuestions = data.data.partsQuestions;

					userInfo.answerTime = answerTime;
					userInfo.totalCount = totalCount;
					userInfo.groupId = groupId;
					userInfo.testQuestions = data.data.partsQuestions;
					localStorage.setItem("userInfo" + userId, JSON.stringify(userInfo));
					$('#timeCounter').text(answerTime);
					if(answerTime !== "0:00") {
						evaluation.countDown();
					}
					evaluation.init();
					evaluation.continueanswer();
				}
			});
		}

});