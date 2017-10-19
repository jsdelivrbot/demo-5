var userId = localStorage.getItem("userId"),
	realName = localStorage.getItem("realName"),
	status = localStorage.getItem("status");
var certificateImgUrl = localStorage.getItem("certificateImgUrl");
if(userId == '' || userId == null){
	$(".header-login").show();
	$(".header-logged").hide();
}else if(status == 1){
	$(".header-login").hide();
	$(".header-logged").show();
	
	$("#userImg").attr("src",certificateImgUrl);
	$("#realNameSpan").html(realName);
}
//登录
$("#loginSpan").click(function(){
	window.location.href=basePath + "website/html/login.jsp";
});
//注册
$("#registerSpan").click(function(){
	window.location.href=basePath + "website/html/register.jsp";
});
//退出登录
$("#logoutSpan").click(function(){
	localStorage.removeItem("userId");
	localStorage.removeItem("realName");
	localStorage.removeItem("certificateImgUrl");
	localStorage.removeItem("token");
	window.location.href=basePath + "index";
});
//点击头像或名字进入信息页面
$("#userImg,#realNameSpan").click(function(){
	window.location.href=basePath + "website/html/information.jsp";
});