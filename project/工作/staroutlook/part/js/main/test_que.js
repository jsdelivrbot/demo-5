$(function(){
	
	$('.option .option-text').click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		$('.btn-test').removeAttr('disabled').css('background','#ff296a');
	});
	
	//点击开始进去测评试题
	$('.btn-test').on('click',function(){
		console.log('开始测评');
		window.location.href = '../html/test_audio.html';
	})
})
