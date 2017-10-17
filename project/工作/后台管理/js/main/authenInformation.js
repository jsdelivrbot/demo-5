$(function(){
	var authStatus = localStorage.getItem('authStatus');
		
	$('.addMechanismAuthen').on('click',function(){
		$('.page').html('');
		if(authStatus != '-1'){
			$('.page').load('html/mechanismAuthenticationList.html');
		}else{
			$('.page').load('html/addMechanismAuthen.html');
		}
		
	})
	$('.addPersonalAuthen').on('click',function(){
		$('.page').html('');
		$('.page').load('html/personalAuthenticationList.html');
	})
})
