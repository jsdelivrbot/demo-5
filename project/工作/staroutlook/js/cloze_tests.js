$(function(){
	$('input').on('input propertychange',function(){
		if($('#inp1').val()!==""&&$('#inp2').val()!==""){
			$('#btn-next').removeAttr("disabled").addClass('active');
		}else{
			$('#btn-next').attr("disabled",'true').removeClass('active');
		}
	});
	
})
