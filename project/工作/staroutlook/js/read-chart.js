$(document).ready(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	//音频
	$('#mp3Btn').on('ended', function() {//播放完毕
		$('.btn-audio,.listening-btn-audio').css({'background':'url(../images/voice_stop.png) no-repeat center bottom','background-size':'cover'});
	})
	//播放器控制
	var audio = document.getElementById('mp3Btn');
	$('.btn-audio,.listening-btn-audio').click(function() {
		if($('.listening-btn-audio').attr("data-available")){ // 测评听力只能听一遍
			return;
		}
		event.stopPropagation();//防止冒泡
		if(audio.paused){ //如果当前是暂停状态
			$('.btn-audio,.listening-btn-audio').css({'background':'url(../images/voice_play.png) no-repeat center bottom','background-size':'cover'});
			$('.btn-test').removeAttr('disabled').css('background','#FF296A');
			audio.play(); //播放
			$(".listening-btn-audio").attr("data-available","false");
		}else{//当前是播放状态
			$('.btn-audio').css({'background':'url(../images/voice_stop.png) no-repeat center bottom','background-size':'cover'});
			audio.pause(); //暂停
		}
		
	});
	//点击开始进去测评试题
	$('.btn-test').on('click',function(){
		console.log('开始测评');
	})


	// 选中文本
	$('.option .option-text').click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		$('#btn-next').removeAttr('disabled').addClass('active');
		$('.btn-test').css('background','#ff296a');
	});
	// 选中图片
	$('.option .option-img').click(function(){
		$(this).find(".answer-img span").addClass("img-selected");
		$(this).siblings().find(".answer-img span").removeClass("img-selected");
		$('#btn-next').removeAttr('disabled').addClass('active');
		$('.btn-test').css('background','#ff296a');
	});
	
	$('#btn-next').click(function(){
		if($('.read-cont').hasClass('read-active')){
			$('.read-active').removeClass('read-active').hide().next().show().addClass('read-active');
		}
	})
	
	
	//阅读类型
	var headerHeight = $("#header").height();//标题高度
	var optionHeight = $(".read-container").height();//选项高度
	var questionHeight = document.documentElement.clientHeight - optionHeight - headerHeight;//题干高度
	var slipHeight = optionHeight -170;//滑动高度
	$('.mui-scroll-wrapper').css('height',questionHeight + 'px');
	
	
	$('.read-slip-btn').on('click',function(){
		if($(".read-container").hasClass('read-cont-slip')){
			$(".read-container").animate({bottom: '0'}).removeClass('read-cont-slip');
			$('.mui-scroll-wrapper').css('height',questionHeight + 'px');
		}else{
			$(".read-container").animate({bottom: '-' + slipHeight + 'px'}).addClass('read-cont-slip');
			$('.mui-scroll-wrapper').css('height',questionHeight + slipHeight + 'px');
			mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
		}
	})
	
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	

});