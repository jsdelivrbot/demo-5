$(document).ready(function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	
	$('.option p').click(function(){
			$(this).addClass("selected").siblings().removeClass("selected");
	})
});