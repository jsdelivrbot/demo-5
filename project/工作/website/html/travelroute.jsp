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
		<title>游学路线</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/js/lib/laypage/skin/laypage.css"/>
		<style type="text/css">
			.banner{
				background: url(<%=basePath%>website/images/xw_home_news_bg.jpg) no-repeat;
				background-size: 100% 100%;
			}
		</style>
		<script type="text/javascript">
			var basePath = "<%=basePath%>";
		</script>
	</head>
	<body class="bg-pale">
      	<jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="tour" />
        </jsp:include>
		<div class="banner second-banner">
			<div class="w1100">
				<h2>游学路线</h2>
				<ol class="breadcrumb w1100 clear">
					<span class="fl">当前位置：</span>
					<li><a href="<%=basePath%>tour/info/tourIndex">星游学</a><i class="crumbIcon"></i></li>
					<li>游学路线</li>
				</ol>
			</div>
		</div>
		<div class="travel-box position-offset w1100">
			<ul class="clear">
				<c:forEach items="${data.data.list }" var="tour">
					<li>
						<a href="<%=basePath%>tour/info/ow/detail?id=${tour.id }">
							<img src="${tour.indexImg }?x-oss-process=image/resize,m_fill,w_250,h_180,limit_0/auto-orient,0/sharpen,156/quality,q_100">
							<h3><span>${tour.name }</span></h3>
							<c:if test="${tour.registerEndDate le date }"><p class="deadline">报名已截止</p></c:if>
							<c:if test="${tour.registerEndDate gt date }"><p><fmt:formatDate value="${tour.registerEndDate}" pattern="yyyy-MM-dd" timeZone="GMT+8"/></p></c:if>
							<p class="priceRemark">
								<span>剩余名额<br /><i>${tour.quota }</i></span>
								<span>价格/人<br /><i>${tour.price }</i></span>
							</p>
						</a>
					</li>
				</c:forEach>
			</ul>
			<div class="page-box">
				<div name="laypage1.3" pageNum="${data.data.pageNum }" lastPage="${data.data.lastPage }" class="laypage_main laypageskin_default" id="laypage_12">
				</div>
			</div>
		</div>
		<div class="propaganda">
			<h3>希望之星游学值得信赖</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. </p>
			<p>Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis disparturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
		</div>
		<jsp:include page="copyright_common.jsp"></jsp:include>
	</body>
    <script src="<%=basePath%>website/js/lib/jquery.min.1.7.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="<%=basePath%>website/js/main/pagination.js"></script>
	<script type="text/javascript">
		$(function(){
			genPageBar($("#laypage_12").attr("pageNum"),$("#laypage_12").attr("lastPage"),'laypage_12',function(data){
				window.location.href = basePath + "tour/info/ow/travelroute?pageNum="+data;
			});
		});
	</script>
</html>
