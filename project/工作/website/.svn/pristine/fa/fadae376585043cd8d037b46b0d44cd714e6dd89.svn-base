<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>登录-希望之星</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/login.css"/>
	</head>
	<body>
		<div class="skin-container"></div>
		<jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="" />
        </jsp:include>
		<div class="login-box-bg">
			<div class="login-box">
				<h2>欢迎登录希望之星官方网站</h2>
				<ul>
					<li>
						<input type="tel" id="login_phone" placeholder="手机号码" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/></li>
					<li class="clear">
						<input type="tel" id="login_code" class="fl" style="width: 100px" placeholder="验证码" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
						<input type="button" class="btn-code fr" value="获取验证码">
					</li>
				</ul>
				<div class="error-tip"></div>
				<div class="btn-box">
					<button class="btn-submit" type="button">登录</button>
					<!--<a class="btnRegister" href="<%=basePath%>website/html/register.jsp">去注册</a>-->
				</div>
			</div>
		</div>
		<jsp:include page="copyright_common.jsp"></jsp:include>
	    <script src="<%=basePath%>website/js/main/login.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
