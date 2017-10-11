$(function(){
			
	var userId = localStorage.getItem("userId");
	var token = localStorage.getItem("token");
	var licenseCode,imageCode,isContainPreliminaries;
	var matchAreaId;
	var matchinfo = {
		
		init: function(){
			this.getAuth();
			this.getFirstAuditionStatus();
			$("#infomatching").click(function(){
				$("#matchcode").val("");
				$("#coding").val("");
				$("#match").attr("disabled","disabled").css("background","rgba(255,255,255,.25)");
				mui('#infomatchingPopover').popover('toggle');
				matchinfo.isNeetImageCode();
			});
			$("#match").click(function(){
				licenseCode = $("#matchcode").val();
				imageCode = $("#coding").val();
				matchinfo.bindLicenseCodeBind();
			});
			$("#toView").click(function(){
				location.href = "../html/certification.html";
			});
			$("#verifyImg").click(function(){
				matchinfo.getImgCode();
			});
			this.changeColor();
		},
		// 获取认证信息
		getAuth: function(){
			$.ajax({
			 	url:"/star/user/getAuth",
			 	type:"post",
			 	data: {'userId':userId,'token':token,currentVersion:current},
			 	dataType:"json",
			 	success:function(data){
			 		console.log(data);
			 		if(data.result == 1){
			 			sessionStorage.setItem("place",data.data.provinceName + '赛区');
			 			sessionStorage.setItem("matchAgeId",data.data.matchAgeId);

			 			$(".info-header img").attr("src",data.data.certificateImgUrl);
			 			$(".info-name").text(data.data.realName);
			 			$(".info-area").text(data.data.matchName + " - " + data.data.provinceName + "赛区" + " - " + data.data.matchAgeName);
			 			matchAreaId = data.data.matchAreaId;
			 			matchinfo.getMatchImage();

			 			matchinfo.goView();
			 		}
			 	}
			});
		},
		// 获取赛区图片
		getMatchImage: function(){
			$.ajax({
			 	url:"/star/match/matchImage",
			 	type:"post",
			 	data: {'userId':userId,'token':token,'matchZoneId':matchAreaId,currentVersion:current},
			 	dataType:"json",
			 	success:function(data){
			 		if(data.result == 1){
			 			$(".info-bg").css("backgroundImage","url("+data.data.url+")");
			 		}
			 		
			 	}
			});
		},
		// 获取海选状态
		getFirstAuditionStatus: function(){
			$.ajax({
			 	url:"/star/match/matchStatus",
			 	type:"post",
			 	data: {'userId':userId,'token':token,currentVersion:current},
			 	dataType:"json",
			 	success:function(data){
			 		if(data.result == 1){
			 			isContainPreliminaries = data.data.isContainPreliminaries;
			 			if(data.data.firstAuditionStatus == 1){ // 进行中
			 				$(".instructions").css("background-image","url(../images/ongoing.png)");
			 			}else if(data.data.firstAuditionStatus == 2){ // 已通过
			 				$(".instructions").css("background-image","url(../images/passing.png)");
			 				$(".notice").text(data.data.firstZuditionNotice);
			 			}else{
			 				$(".instructions").css("background-image","url(../images/no_passing.png)");
			 			}				 			
			 		}
			 	}
			});
		},
		// 展示相应子页面
		goView: function(){
			$.ajax({
				type: "post",
				url: "/star/match/matchStatus",
				data:{userId:userId,token:token,currentVersion:current},
				dataType: "json",
				success: function(data) {
					if(data.data.licenseCodeBindStatus == 1){ // 信息匹配
						if(data.data.isAddSchedule == 0 || data.data.isInfantGroup == "true" || data.data.testStatus == 1 || data.data.isContainPreliminaries == 0 || data.data.isCanTest == 2){
							$(".match-container").hide();
			 				mui.init({
							    subpages:[{
							      url:'schedule.html',
							      id:'schedule.html',
							      styles:{
							        top:'5.2rem',
							        bottom:'0px',
							      }
							    }]
							});
						}else{
							$(".match-container").hide();
			 				mui.init({
							    subpages:[{
							      url:'not_evaluation.html',
							      id:'not_evaluation.html',
							      styles:{
							        top:'5.2rem',
							        bottom:'0px',
							      }
							    }]
							});
						}
					}else{
						$(".match-container").show();
					}
				},
				error: function(){
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			})	
			
		},
		// 绑定参赛编码
		bindLicenseCodeBind: function(){
			if(imageCode == ""){
				postData = {'userId':userId,'token':token,'licenseCode':licenseCode};
			}else{
				postData = {'userId':userId,'token':token,'licenseCode':licenseCode,'imageCode':imageCode};
			}
			post(postData);
			
			function post(postData){
				$.ajax({
				 	url:"/star/match/bindLicenseCodeBind",
				 	type:"post",
				 	data: postData,
				 	dataType:"json",
				 	success:function(data){
				 		if(data.result == 1){
				 			layer.open({content: '选手信息匹配成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 1});
				 			mui('#infomatchingPopover').popover('hide');
				 			setTimeout(function(){mui.openWindow({url:"../html/matchinfo.html"});},1000);
				 		}else{
				 			matchinfo.isNeetImageCode();
				 			layer.open({content: data.msg,style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				 		}
				 		
				 	}
				});
			}
			
		},
		// 是否需要图片验证码
		isNeetImageCode: function(){
			$.ajax({
			 	url:"/star/match/isNeetImageCode",
			 	type:"post",
			 	data: {'userId':userId,'token':token,currentVersion:current},
			 	dataType:"json",
			 	success:function(data){
			 		if(data.result == 1){
			 			if(data.data.value == 0){ // 不需要
			 				$("#coding").hide();
			 				$("#verifyImg").hide();
			 			}else{
			 				$("#coding").show();
			 				$("#verifyImg").show();
			 				matchinfo.getImgCode();
			 				$("#matchcode").css("border-radius","0.1rem 0.1rem 0 0");
			 				$("#coding").css("border-radius","0 0 0.1rem 0.1rem");
			 			}
			 		}
			 	}
			});
		},
		// 获取图片验证码
		getImgCode: function(){
			$("#verifyImg").attr("src","/star/getImgCode?userId="+userId+"&token="+token+"?rnd=" + Math.random());
		},
		// 按钮变色
		changeColor: function(){
			$("input").on("input propertychange",function(){				
				if($("#coding").is(":hidden")){
					if($("#matchcode").val() == ""){
						$("#match").attr("disabled","disabled").css("background","rgba(255,255,255,.25)");
					}else{
						$("#match").removeAttr("disabled").css("background","#ff296a");	
					}
				}else{
					if($("#matchcode").val() == "" || $("#coding").val() == ""){
						$("#match").attr("disabled","disabled").css("background","rgba(255,255,255,.25)");
					}else{
						$("#match").removeAttr("disabled").css("background","#ff296a");	
					}
				}
			});
		
		}
	}
	matchinfo.init();
	
});