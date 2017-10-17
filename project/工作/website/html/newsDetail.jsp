<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>新闻详情</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/css/base.css"/>
    </head>
    <body class="bg-pale">

 <jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="index" />
        </jsp:include>

        <ol class="breadcrumb w1100 mt120 clear">
            <span class="fl">当前位置：</span>
            <li>
            <c:if test="${pageType==1 }">
            <a href="${pageContext.request.contextPath}/index">首页</a>
            <i class="crumbIcon"></i>
            </c:if>
            <c:if test="${pageType==2 }">
            <a href="${pageContext.request.contextPath}/news/growthRecord">成长记录</a>
            <i class="crumbIcon"></i>
            </c:if>
            <c:if test="${pageType==3 }">
            <a href="${pageContext.request.contextPath}/match/theme">主体赛</a>
             <i class="crumbIcon"></i></li>
            <li><a href="${pageContext.request.contextPath}/news/matchThemelist">新闻资讯</a><i class="crumbIcon"></i></li>
            </c:if>
            <c:if test="${pageType==4 }">
            <a href="${pageContext.request.contextPath}/match/dramaMatch">戏剧赛</a>
             <i class="crumbIcon"></i></li>
            <li><a href="${pageContext.request.contextPath}/news/matchListTheatre">新闻资讯</a><i class="crumbIcon"></i></li>
            </c:if>
            <c:if test="${pageType==5 }">
            <a href="${pageContext.request.contextPath}/match/musicMatch">歌曲赛</a>
             <i class="crumbIcon"></i></li>
            <li><a href="${pageContext.request.contextPath}/news/matchListSing">新闻资讯</a><i class="crumbIcon"></i></li>
            </c:if>
            <li>新闻详情</li>
        </ol>
        <div class="news-details w1100 clear">
            <img class="bg fr" src="${pageContext.request.contextPath}/website/images/xw_home_match_image_star.png"/>
            <h2>${item.title }<span class="news-details-datetime"><fmt:formatDate value="${item.gmtCreate }" type="both" pattern="yyyy-MM-dd HH:mm:ss"/></span></h2>
            <div class="news-details-box">
              ${item.content }
            </div>
        </div>
        <jsp:include page="copyright_common.jsp"></jsp:include>
    </body>
</html>
