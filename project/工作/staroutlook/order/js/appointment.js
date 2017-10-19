$(function(){
	var basePath = "http://staroutlook.com";
	var ele = {
		inputs: $('input'),
		enrollName: $("#enrollName"),
		enrollPhone: $("#enrollPhone"),
		enrollEmail: $("#enrollEmail"),
		submitBtn: $("#submitBtn"),
		enrollRoute: $('#enrollRoute'),
		enrollGroup: $('#enrollGroup'),
	}
	var enroll = {
		init: function(){
			var _this = this;
			ele.inputs.on("input propertychange",function(){
				if(ele.enrollName.val() != "" && ele.enrollPhone.val() != "" && ele.enrollEmail.val() != "") {
					ele.submitBtn.removeAttr("disabled").css({"background":"url(../images/my_guidebook_survey_btn_submit_pressed.png) no-repeat center","background-size":"100%"});
					ele.submitBtn.attr("disabled", true);
				} else {
					ele.submitBtn.attr("disabled", "disabled").css({"background":"url(../images/my_guidebook_survey_btn_submit_default.png) no-repeat center","background-size":"100%"});
					return false;
				}
			});
			_this.Clicksubmit();
		},
		checkVal: function(){
			var _this = this;
			if(ele.enrollName.val() == "" || !Chk.chkRealName(ele.enrollName.val().trim()) ){
				alert("请输入真实姓名!");
				return false;
			}
			if(ele.enrollPhone.val() == "" || !Chk.chkMPhone(ele.enrollPhone.val().trim()) ){
				alert("请输入正确的手机号!");
				return false;
			} 
			if(ele.enrollEmail.val() == "" || !Chk.chkMail(ele.enrollEmail.val().trim()) ){
				alert("请输入正确的邮箱地址!");
				return false;
			}
			return true;
		},
		Clicksubmit: function(){
			var _this = this;
			ele.submitBtn.on("click", function() {
				console.log(basePath)
				if(_this.checkVal()){
					var name = ele.enrollName.val(),
						phone = ele.enrollPhone.val(),
						email = ele.enrollEmail.val(),
						tourId = ele.enrollRoute.val(),
						tourGroupId = ele.enrollGroup.val();
						console.log(name,phone,email,tourId,tourGroupId);
						data = {"name":name,"phone":phone,"email":email,"tourId":tourId,"tourGroupId":tourGroupId};
						
					new ajax(basePath + "/tour/register/save", "get", data, "jsonp", suc, err)
					function suc(data){
						if(data.result == '1'){
								alert("预约成功");
						  }else{
								alert(data.msg);
						  }
					}
					function err(data){
						console.log("请求失败");
					}
				}
			});
		}
	}
	enroll.init();
})
