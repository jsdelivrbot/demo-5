<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>成长记录</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/css/base.css"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/js/lib/laypage/skin/laypage.css"/>
        <script type="text/javascript" src="${pageContext.request.contextPath}/website/js/main/pagination.js"></script>
        <style type="text/css">
            .banner{
                background: url(${pageContext.request.contextPath}/website/images/xw_startour_growup_bg.jpg) no-repeat;
                background-size: 100% 100%;
            }
        </style>
    </head>
    <body class="bg-pale">
        <jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="tour" />
        </jsp:include>
        <div class="banner second-banner">
            <div class="w1100">
                <h2>成长记录</h2>
                <ol class="breadcrumb w1100 clear">
                    <span class="fl">当前位置：</span>
                    <li><a href="${pageContext.request.contextPath}/tour/info/tourIndex">星游学</a><i class="crumbIcon"></i></li>
                    <li>成长记录</li>
                </ol>
            </div>
        </div>
        <div class="growth-box position-offset w1100">
            <ul class="clear">
            
            
            <c:forEach items="${data.list}" var="item">
            
                <li>
                    <a class="clear" href="${pageContext.request.contextPath}/news/newsDetail?id=${item.id}">
                        <img class="fl" src="${item.newsPic }"/>
                        <h3>${item.title }</h3>
                        <p>${item.contentAbstract }...</p>
                        <span class="news-time"><fmt:formatDate value="${item.gmtCreate }" type="both" pattern="yyyy-MM-dd HH:mm:ss"/></span>
                    </a>
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
        window.location.href="gwowthRecord?pageNum="+data;
    });
    </script>
</html>
