var userId = localStorage.getItem("userId"),
token = localStorage.getItem("token");

if(userId == null) {
	window.location.href = basePath + "website/html/login.jsp";
}

var imageCode = "",statusStr, statusObj, matchList, score = [];
var information = {
init: function() {
	this.getMatchStatus();
	this.getAuth();
	this.isNeetImageCode();
},
// 获取认证信息
getAuth: function() {
	$.ajax({
		type: "get",
		url: urlPash + "/star/user/getAuth",
		data: {
			"userId": userId,
			"token": token
		},
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			if(data.result == 1) {
				var data = data.data;
				$(".header-logged img").attr("src", data.certificateImgUrl);
				$("#realNameSpan").html(data.realName);
				localStorage.setItem("certificateImgUrl", data.certificateImgUrl);
				localStorage.setItem("realName", data.realName);

				var gender = data.gender == 0 ? "女" : "男";
				var html = '<li>\
							<div class="info-portrait"><img src="' + data.certificateImgUrl + '" /></div>\
						</li>\
						<li>' + data.realName + '</li>\
						<li><span>' + gender + '</span><span>' + data.nationName + '</span></li>\
						<li>身份证号：<span>' + data.idNumber + '</span></li>\
						<li>' + data.provinceName + '－' + data.cityName + '</li>\
						<li>' + data.matchName + '－' + data.matchAgeName + '</li>';
				$(".info").append(html);
			} else {
				layer("获取认证信息失败!", 2);
			}
		},
		error: function() {
			layer("网络请求出错!", 2);
		}
	});
},
// 获取状态
getMatchStatus: function() {
	var _this = this;
	$.ajax({
		type: "get",
		url: urlPash + "/star/match/matchStatus",
		data: {
			"userId": userId,
			"token": token,
			"currentVersion": currentVersion
		},
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {

			if(data.result == 1) {
				statusObj = data.data;
				if(data.data.licenseCodeBindStatus == 0) {
					$(".spinner").hide();
					$(".code-wrapper").show();

					$("#bind").click(function() {
						if($(".code-box").is(':hidden')) {
							if($("#code").val() == "") {
								layer("请输入参赛编码", 2)
							} else if($("#code").val() != "") {
								_this.bindLicenseCodeBind($("#code").val(), '');
							}
						} else {
							if($("#coding").val() == "") {
								layer("请输入验证码", 2)
							} else if($("#code").val() == "") {
								layer("请输入参赛编码", 2)
							} else if($("#code").val() != "" && $("#coding").val() != "") {
								_this.bindLicenseCodeBind($("#code").val(), $("#coding").val());
							}
						}

					});
				} else if(data.data.isAddSchedule == 0) {
					$(".spinner").hide();
					$(".unconfigured-wrapper").show();
				} else {
					_this.getMatchList();
				}
			} else {
				layer("获取状态失败!", 2);
			}
		},
		error: function() {
			layer("网络请求出错!", 2);
		}
	});
},
getMatchList: function() {
	var _this = this;
	$.ajax({
		type: "get",
		url: urlPash + "/star/match/list",
		data: {
			"userId": userId,
			"token": token
		},
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			if(data.result == 1) {
				matchList = data.data;
				_this.setMatchList(matchList);
			} else {
				layer(data.msg, 2);
			}
		},
		error: function() {
			layer("网络请求出错!", 2);
		}
	});
},
getMatchScore: function() {
	var _this = this;
	$(".configured-wrapper li").each(function(index, obj) {
		var that = this;
		if(typeof($(that).attr("data-personmatchid")) != "undefined") {
			var personMatchId = $(that).attr("data-personmatchid");
			$.ajax({
				type: "get",
				url: urlPash + "/star/match/matchScore",
				data: {
					"userId": userId,
					"token": token,
					"personMatchId": personMatchId
				},
				dataType: "jsonp",
				jsonp: "jsonpCallback",
				success: function(data) {
					if(data.result == 1) {
						var score = data.data;
						var spans = $(that).find("span:empty");
						if(typeof($(that).attr("data-stage")) == "undefined") {
							spans.each(function(index, obj) {
								if(index == 0) {
									$(this).text(score.sumFraction);
								} else if(index == 1) {
									$(this).text(score.pronunciationFraction);
								} else if(index == 2) {
									$(this).text(score.styleFraction);
								} else {
									$(this).text(score.contentFraction);
								}
							});
						} else {
							if(spans.length == 1) {
								spans.text(score.interviewFraction);
							} else {
								spans.each(function(index, obj) {
									if(index == 0) {
										$(this).text(score.testFraction);
									} else if(index == 1) {
										$(this).text(score.interviewFraction);
									}
								});
							}
						}
					} else {
						layer(data.msg, 2);
					}
				},
				error: function() {
					layer("网络请求出错!", 2);
				}
			});
		}
		if(index == $(".configured-wrapper li").length - 1) {
			$(".spinner").hide();
			$(".configured-wrapper").show();
		}
	})

},

setMatchList: function(matchList) {
	var _this = this;
	var html = '';
	console.log(matchList)
	$.each(matchList.reverse(), function(index, obj) {
		var promotion = obj.promotion == 1 ? "晋级" : "未晋级";

		function FormatTime(time) {
			return time.substr(0, 10).replace(/-/g, ".");
		}

		if(obj.stage == "1") {

			if(statusObj.isInfantGroup == false && statusObj.testStatus == null) {
				if(obj.isReleaseScore == "0") {
					html += '<li class="clear">';
				} else {
					html += '<li class="clear" data-personMatchId="' + obj.personMatchId + '">';
				}

				html += '<div class="configured-date fl">\
							<sup>' + FormatTime(obj.startTime) + '</sup><sub>' + FormatTime(obj.endTime) + '</sub>\
						</div>\
						<div class="configured-match fl clear">\
							<div class="configured-info clear">\
								<span class="fl">初赛</span>\
							</div>\
							<p>SOOPT测评：<a id="btnTest" class="btn btn-start" href="http://test.api.staroutlook.com:8080/star/staroutlook/part/html/test_explain.html?userId=' + userId + '&token=' + token + '&goBack=http://test.www.staroutlook.com/www/website/html/information.jsp">开始测评</a></p>\
						</div>\
					</li>';
			} else {
				if(obj.isReleaseScore == "0") {
					html += '<li class="clear">';
				} else {
					html += '<li class="clear" data-personMatchId="' + obj.personMatchId + '" data-stage="1" >';
				}
				html += '<div class="configured-date fl">\
								<sup>' + FormatTime(obj.startTime) + '</sup><sub>' + FormatTime(obj.endTime) + '</sub>\
							</div>\
							<div class="configured-match fl clear">\
								<div class="configured-info clear">\
									<span class="fl">初赛</span>';

				if(obj.serverTime < obj.startTime) {
					html += '</div><p>比赛暂未开始</p></div></li>';
					return true;
				} else if(obj.serverTime > obj.endTime && obj.isReleaseScore == "0") {
					html += '</div><p>比赛已结束，请耐心等待结果</p></div></li>';
					return true;
				} else if(obj.serverTime > obj.startTime && obj.serverTime < obj.endTime) {
					html += '</div><p>比赛进行中……</p></div></li>';
					return true;
				}

				if(promotion == "未晋级") {
					html += '<span class="not-qualify fl">' + promotion + '</span>';
				} else {
					html += '<span class="fl">' + promotion + '</span>';
				}

				if(statusObj.isInfantGroup == true) {
					html += '</div>\
							<p>面试得分：<span></span></p>\
						</div>\
						</li>';

				} else {
					html += '</div>\
							<p>SOOPT测评：<span></span></p>\
							<p>面试得分：<span></span></p>\
							<a href="#" class="btn" style="display:none">查看测评报告</a>\
						</div>\
						</li>';
				}

			}
		}
		if(obj.stage != "1") {
			var stage = ["初赛", "复赛", "决赛", "市赛", "省赛"];
			if(obj.isReleaseScore == "0") {
				html += '<li class="clear">';
			} else {
				html += '<li class="clear" data-personMatchId="' + obj.personMatchId + '">';
			}
			html += '<div class="configured-date fl">\
							<sup>' + FormatTime(obj.startTime) + '</sup><sub>' + FormatTime(obj.endTime) + '</sub>\
						</div>\
						<div class="configured-match fl">\
							<div class="configured-info clear">\
								<span class="fl">' + stage[obj.stage - 1] + '</span>';

			if(obj.serverTime < obj.startTime) {
				html += '</div><p>比赛暂未开始</p></div></li>';
				return true;
			} else if(obj.serverTime > obj.endTime && obj.isReleaseScore == "0") {
				html += '</div><p>比赛已结束，请耐心等待结果</p></div></li>';
				return true;
			} else if(obj.serverTime > obj.startTime && obj.serverTime < obj.endTime) {
				html += '</div><p>比赛进行中……</p></div></li>';
				return true;
			}

			if(promotion == "未晋级") {
				html += '<span class="not-qualify fl">' + promotion + '</span>';
			} else {
				html += '<span class="fl">' + promotion + '</span>';
			}

			html += '</div>\
					<p>总分：<span></span></p>\
					<p>发音：<span></span></p>\
					<p>风采：<span></span></p>\
					<p>内容：<span></span></p>\
				</div>\
			</li>';
		}
	});
	$(".configured-wrapper ul").append(html);
	
	_this.getMatchScore();
},

bindLicenseCodeBind: function(licenseCode, imageCode) {
	var _this = this;
	console.log(imageCode);
	if(imageCode == "") {
		postData = {
			'userId': userId,
			'token': token,
			'licenseCode': licenseCode
		};
	} else {
		postData = {
			'userId': userId,
			'token': token,
			'licenseCode': licenseCode,
			'imageCode': imageCode
		};
	}
	$.ajax({
		type: "get",
		url: urlPash + "/star/match/bindLicenseCodeBind",
		data: postData,
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			if(data.result == 1) {
				layer("绑定成功!", 2, function() {
					$(".code-wrapper").hide();
					$(".unconfigured-wrapper").show();
				});
			} else if(data.msg == "参赛码已被他人使用") {
				layer("参赛码已被他人使用!", 2);
			} else if(data.msg == "验证码不能为空") {
				layer("验证码不能为空!", 2);
				_this.isNeetImageCode();
			} else if(data.msg == "验证码错误") {
				layer("验证码错误,请重新输入!", 2);
				_this.isNeetImageCode();
			} else if(data.msg == "参赛码不存在") {
				layer("参赛码不存在", 2);
				_this.isNeetImageCode();
			}
		},
		error: function() {
			layer("网络请求出错!", 2);
		}
	});
},
isNeetImageCode: function() {
	var _this = this;
	$.ajax({
		url: urlPash + "/star/match/isNeetImageCode",
		type: "get",
		data: {
			'userId': userId,
			'token': token,
			currentVersion: currentVersion
		},
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			if(data.result == 1) {
				if(data.data.value == 0) { // 不需要
					$(".code-box").hide();
				} else {
					$(".code-box").show();
					_this.getImgCode();
				}
			}
		}
	});
},
// 获取图片验证码
getImgCode: function() {
	$("#verifyImg").attr("src", urlPash + "/star/getImgCode?userId=" + userId + "&token=" + token + "&rnd=" + Math.random());
},
}
information.init();