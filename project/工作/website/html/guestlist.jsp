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
		<title>嘉宾列表</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/js/lib/laypage/skin/laypage.css" />
		<style>
			.second-banner {
				background-image: url(<%=basePath%>website/images/xw_match_judges_bg.jpg);
			}
			
			.wrapper-box {
				padding: 30px 0 0 30px;
			}
			
			.wrapper-box li {
				width: 156px;
			}
			
			.wrapper-box li div {
				width: 156px;
				height: 156px;
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
				<h2>嘉宾列表</h2>
				<ol class="breadcrumb w1100 clear">
					<span class="fl">当前位置：</span>
					<li>
						希望之星<i class="crumbIcon"></i></li>
					<%-- <li>
						<a href="<%=basePath%>match/theme" id="breadcrumb">主体赛</a><i class="crumbIcon"></i></li> --%>
					<li>嘉宾列表</li>
				</ol>
			</div>
		</div>
		<div class="w1100 position-offset wrapper-box">
			<!--  -->
			        <jsp:include page="/website/static/guestlist.jsp" />
			<div class="page-box">
				<div name="laypage1.3" pageNum="${data.pageNum }" lastPage="${data.lastPage }" class="laypage_main laypageskin_default" id="laypage_12">
				</div>
			</div>
		</div>

		<jsp:include page="copyright_common.jsp"></jsp:include>
		<script src="<%=basePath%>website/js/lib/jquery.min.1.7.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="<%=basePath%>website/js/main/pagination.js"></script>
		<%-- <script src="<%=basePath%>website/js/lib/laypage/laypage.js" type="text/javascript" charset="utf-8"></script> --%>
	</body>
	<script type="text/javascript">
		$(function(){
			genPageBar($("#laypage_12").attr("pageNum"),$("#laypage_12").attr("lastPage"),'laypage_12',function(data){
				window.location.href = basePath + "judgestguest/ow/viewlist?pageNum="+data;
			});
			
		});
	</script>
</html>