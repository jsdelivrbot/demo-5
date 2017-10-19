$(function(){
	var answers = {};
	var answersNum = 0;
	var answersTotal = 11;
	var ele = {
		input_text: $("input[type='text']"),
		input_radio: $("input[type='radio']"),
		submit_btn: $("#submit"),
	}

	function storeAnswer(id, value) {
		if(!answers[id] && answers[id] != ""){
			answersNum++;
		}
		answers[id] = value;
	}
	ele.input_radio.click(function() {
		var question = $(this).parents(".question");
		var option = $(this).parents("li").eq(0);
		option.addClass("selected").siblings().removeClass("selected");
		var id = question.attr("data-id");
		var value = $(this).val();
		storeAnswer(id, value);

		if(answersNum == answersTotal) {
			ele.submit_btn.addClass("submit").removeAttr("disabled");
		}
	});
	ele.input_text.blur(function() {
		var question = $(this).parents(".question");
		var id = question.attr("data-id");
		var value = $(this).val();
		storeAnswer(id, value);
	});

	ele.input_text.bind('input propertychange', function() {
		if(answersNum == answersTotal - 1||answersNum == answersTotal) {
			ele.submit_btn.addClass("submit").removeAttr("disabled");
		}
		ele.input_text.each(function(index,obj){
			if($(this).val() == ""){
				ele.submit_btn.removeClass("submit").attr("disabled","disabled");
				return false;
			}
		});
	});
	ele.submit_btn.click(function(){
		answers = JSON.stringify(answers);
		data = {"userId":userId,"token":token,"answerJson":answers};
		new ajax("/star/questionaire/submit", "get", data, "json", suc, err)
		function suc(data){
			if(data.result == '1'){
				mask.Alert("提交成功!",2);
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
				    window.webkit.messageHandlers.iOSNative.postMessage("提交成功！");
				} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
				    window.androidBackMethod.submitSuccess("提交成功！");
				};
			}else{
				mask.Alert("提交失败，请重试!",2);
			}
		}
		function err(data){
			mask.Alert("提交失败，稍后请重试!",2);
		}
	})
})