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
		<title>关于我们</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/aboutUs.css"/>
	</head>
	<body>
		<jsp:include page="/website/html/header.jsp" >
			<jsp:param name="activeMenu" value="aboutus" />
		</jsp:include>
		<jsp:include page="/website/static/aboutus.jsp" flush="true"/>
	<jsp:include page="footer.jsp"></jsp:include>
	</body>
</html>
