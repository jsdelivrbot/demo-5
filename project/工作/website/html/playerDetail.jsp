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
		<title>选手简介</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css"/>
	</head>
	<body class="bg-pale">
		<jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="match" />
        </jsp:include>
        
		<ol class="breadcrumb w1100 mt120 clear">
			<span class="fl">当前位置：</span>
			<li><a>希望之星</a><i class="crumbIcon"></i></li>
			<li><a href="<%=basePath%>starPlayer/players">明星选手</a><i class="crumbIcon"></i></li>
			<li>选手简介</li>
		</ol>
		<div class="person-details w1100 clear">
			<div class="person-bg fr"><img src="${player.pic }?x-oss-process=image/resize,m_fill,w_140,h_140,limit_0/auto-orient,0/quality,q_100"/><h2>${player.name }</h2></div>
			${player.content }
		</div>
		<jsp:include page="copyright_common.jsp"></jsp:include>
	</body>
</html>
