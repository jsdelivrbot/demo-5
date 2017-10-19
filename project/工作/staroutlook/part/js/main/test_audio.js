$(function(){
	//播放完毕
	$('#mp3Btn').on('ended', function() {
		console.log("音频已播放完成");
		$('.btn-audio').css({'background':'url(../images/voice_stop.png) no-repeat center bottom','background-size':'cover'});
	})
	//播放器控制
	var audio = document.getElementById('mp3Btn');
	audio.volume = .3;
	$('.btn-audio').click(function(e) {
		var e=e||event;
		e.cancelBubble=true;
	//	event.stopPropagation();//防止冒泡
		if(audio.paused){ //如果当前是暂停状态
			$('.btn-audio').css({'background':'url(../images/voice_play.png) no-repeat center bottom','background-size':'cover'});
			$('.btn-test').removeAttr('disabled').css('background','#FF296A');
			audio.play(); //播放
			return;
		}else{//当前是播放状态
			$('.btn-audio').css({'background':'url(../images/voice_stop.png) no-repeat center bottom','background-size':'cover'});
			audio.pause(); //暂停
		}
	});
	//点击开始进去测评试题
	$('.btn-test').on('click',function(){
		var userId = localStorage.getItem('userId');
		console.log(userId);
		window.location.href = 'evaluation.html';
	})
})