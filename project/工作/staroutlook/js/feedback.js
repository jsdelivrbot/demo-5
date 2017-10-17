$(function() {
	$('input,textarea').on('input propertychange', function() {
		if($(this).val() != "" && $(this).val() != $(this).attr('placeholder')) {
			$(this).next().show();
		} else {
			$(this).next().hide();
		}
		if($(".texta").val() != "" && $(".texta").val() != $(".texta").attr('placeholder')
		&& $(".singlephone").val() != "" && $(".singlephone").val() != $(".singlephone").attr('placeholder')){
			$('.testSub').css("background-color", "#ff296a");
		}else{
			$('.testSub').css("background-color", "#605f6a");
		}
	});

	//当删除任意一个填写的内容时  确认按钮变为默认颜色
	$('.cleartext').click(function() {
		$(this).hide().prev().val("");
		$('.testSub').css("background-color", "#605f6a");
	});
	
	//判断非空
	$('.testSub').click(function() {
		var phone = $('.singlephone').val(),
			userId = localStorage.getItem('userId'),
			token = localStorage.getItem('token'),
			texta = $('.texta').val();
		if($('.texta').val() == "" || $('.singlephone').val() == "") {
			layer.open({content: '所填信息不得为空',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			return false;
		}
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
			layer.open({content: '手机号码有误，请重填',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
			return false;
		} else{
			$.ajax({
				type: "get",
				async: true,
				url: '/star/user/feedback',
				dataType: "json",
				data:{'userId':userId,'token':token,'contactInfo':phone,'content':texta},
				success: function(data) {
					if(data.result == 1) {
						layer.open({content: '提交成功',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}
					if(data.result == 200) {
						layer.open({content: '用户不存在',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
					}
				},
				error: function() {
					layer.open({content: '请求失败',style: 'background:rgba(0,0,0,.8); color:#fff; border:none;',time: 2});
				}
			});
		}
	});
});