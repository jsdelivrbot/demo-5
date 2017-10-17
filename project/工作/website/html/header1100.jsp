<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	String activeMenu = request.getParameter("activeMenu");
%>
<header>
	<div class="header-wrapper clear">
		<span class="header-hotline">全国咨询热线：<b>400-9665-550</b></span>
		<span class="header-login hide"><span id="loginSpan">登录&nbsp;</span><!--|<span id="registerSpan">&nbsp;注册</span>--></span>
		<div class="header-logged fr hide">
			<div class="header-img fl"><img id="userImg" src="<%=basePath %>website/images/person.jpg" /></div>
			<span id="realNameSpan"></span>|<span id="logoutSpan">退出</span>
		</div>
	</div>
	<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?6c381bc743ab01d56f8e2217c1c5198c";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
<script>

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?7bbdb5ad1a0889de49e14415f9cc9bec";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
 
	
</header>
<nav class="w1100 clear">
	<div class="logo fl"><img src="<%=basePath%>website/images/xw_header_image_logo_2.png" /></div>
	<ul class="clear">
		<li id=indexTab class="home-page"><a href="<%=basePath%>index"><i class="homeIcon-01 fl"></i>OUTLOOK首页</a></li>
		<li id="matchTab">希望之星<i class="drop"></i>
			<ul>
				<li>
					<a href="<%=basePath%>match/theme">主体赛</a>
				</li>
				<li>
					<a href="<%=basePath%>match/dramaMatch">戏剧赛</a>
				</li>
				<li>
					<a href="<%=basePath%>match/musicMatch">歌曲赛</a>
				</li>
			</ul>
		</li>
		<li id="tourTab">
			<a href="<%=basePath%>tour/info/tourIndex">星游学</a>
		</li>
		<li id="aboutusTab">
			<a href="<%=basePath%>aboutus/timeline">关于我们</a>
		</li>
		<li id="contactusTab">
			<a href="<%=basePath%>contactus">联系我们</a>
		</li>
	</ul>
</nav>
<script>
	var basePath = '<%=basePath%>';
	var activeMenuId = '<%=activeMenu%>Tab';
	var tab = document.getElementById(activeMenuId);
	if(tab != null){
		tab.className += " active";
	}
</script>
<script src="<%=basePath%>website/js/lib/jquery.min.1.7.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=basePath%>website/js/main/header.js"></script>