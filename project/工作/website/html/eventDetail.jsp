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
        <jsp:include page="/website/html/header.jsp" >
            <jsp:param name="activeMenu" value="match" />
        </jsp:include>
       

        <ol class="breadcrumb w1100 clear">
            <span class="fl">当前位置：</span>
            <li><a>希望之星</a><i class="crumbIcon"></i></li>
            
            <li>
            <c:if test="${pageType==1 }">
            <a href="themeMatch.html">首页</a>
            </c:if>
            <c:if test="${pageType==2 }">
            <a href="themeMatch.html">成长记录</a>
            </c:if>
            <c:if test="${pageType==3 }">
            <a href="themeMatch.html">主体赛</a>
            </c:if>
            <c:if test="${pageType==4 }">
            <a href="themeMatch.html">戏剧赛</a>
            </c:if>
            <c:if test="${pageType==5 }">
            <a href="themeMatch.html">歌曲赛</a>
            </c:if>
            <i class="crumbIcon"></i></li>
            <li><a href="${pageContext.request.contextPath}/match/theme">赛务信息</a><i class="crumbIcon"></i></li>
            <li>赛务信息详情</li>
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
