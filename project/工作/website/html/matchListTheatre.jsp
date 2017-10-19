<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>新闻资讯</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/css/base.css"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/js/lib/laypage/skin/laypage.css"/>
        <script type="text/javascript" src="${pageContext.request.contextPath}/website/js/main/pagination.js"></script>
        <style type="text/css">
            .banner{
                background: url(${pageContext.request.contextPath}/website/images/xw_home_news_bg.png) no-repeat;
                background-size: 100% 100%;
            }
        </style>
    </head>
    <body class="bg-pale">
       
               <jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="index" />
        </jsp:include>
       
       <div class="banner second-banner">
            <div class="w1100">
                <h2>赛务信息</h2>
                <ol class="breadcrumb w1100 clear">
                    <span class="fl">当前位置：</span>
                    <li><a>希望之星</a><i class="crumbIcon"></i></li>
                    <li><a href="${pageContext.request.contextPath}/match/dramaMatch">戏剧赛</a><i class="crumbIcon"></i></li>
                    <li>赛务信息</li>
                </ol>
            </div>
        </div>
        <div class="container-box position-offset w1100">
            <ul class="clear">
            
            <c:forEach items="${data.list }" var="item">
                <li>
                    <span class="news-title"><a href="${pageContext.request.contextPath}/news/newsDetail?id=${item.id}">${item.title }</a></span>
                    <span class="release-time"><fmt:formatDate value="${item.gmtCreate }" type="both" pattern="yyyy-MM-dd HH:mm:ss"/></span>
                </li>
            </c:forEach>
               
            </ul>
            <div class="page-box">
                <div name="laypage1.3" class="laypage_main laypageskin_default" id="laypage_12">
                   
                </div>
            </div>
        </div>
        
		<jsp:include page="copyright_common.jsp"></jsp:include>
        <script src="${pageContext.request.contextPath}/website/js/lib/jquery.min.1.7.js" type="text/javascript" charset="utf-8"></script>
    </body>
                <script type="text/javascript">
    genPageBar('${data.pageNum}',"${data.pages}",'laypage_12',function(data){
        window.location.href="matchListTheatre?pageNum="+data;
    });
    </script>
</html>
