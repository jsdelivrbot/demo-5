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
		<title>联系我们</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/contactUs.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/js/lib/laypage/skin/laypage.css"/>
	</head>
	<body>
		<jsp:include page="/website/html/header.jsp" >
			<jsp:param name="activeMenu" value="contactus" />
		</jsp:include>
		<div class="banner">
			<ul class="company-address">
				<h2>北京星路风采国际教育咨询有限公司</h2>
				<li>
					<i class="comIcon-01 fl"></i>
					<h3>全国组委会电话:</h3>
					<p>400-966-5550</p>
				</li>
				<li>
					<i class="comIcon-02 fl"></i>
					<h3>总部地址：</h3>
					<p>北京市朝阳区朝阳门外大街乙12号昆泰国际大厦1702室</p>
				</li>
			</ul>
		</div>
		
		<jsp:include page="/website/static/contactus.jsp" />
		
		<%-- <div class="division-contact">
			<div class="contact-choice w1000">
                <span>各省市赛区联系方式查询：</span>
                <select name="zoneSearchName" id="matchZoneId">
                    <option value="">请选择赛区</option>
                	<c:forEach items="${matchZoneList }" var="matchZone">
                		<option value="${matchZone.id }">${matchZone.zoneName }</option>
					</c:forEach>
                </select>
                <input type="button" value="查询" id="btnSearch" onclick="reqMatchZoneList(1);" class="MyPointBt02">
            </div>
            
		</div> --%>
		<div class="contact-info w1000">
			<ul id="matchZoneList">
	        </ul>

			<div class="page-box">
				<div name="laypage1.3" class="laypage_main laypageskin_default" id="laypage_12">
				</div>
			</div>
		</div>
		<jsp:include page="footer.jsp"></jsp:include>
	    <script src="<%=basePath%>website/js/lib/jquery.min.1.7.js" type="text/javascript" charset="utf-8"></script>
	    <script src="<%=basePath%>website/js/main/pagination.js" type="text/javascript" charset="utf-8"></script>
	    
	    <script>

	    function reqMatchZoneList(pageNum){
   	    	$.ajax({
   	            url: "<%=basePath%>matchZone/list?pageNum="+pageNum +"&pageSize=8"+"&matchZoneId="+$("#matchZoneId").val(),
   	            success: function(data){
   	            	var list = data.data.list;
   	            	$("#matchZoneList").empty();
   	            	for(var i=0;i<list.length;i++){
   	            		var zone = list[i];
   	            		$("#matchZoneList").append("<li>\
   		    	        		<p>" + zone.zoneName + "</p>\
   		    	        		<p>承办单位：<span>" + zone.orgName + "</span></p>\
   		    	        		<p>联系电话：<span>" + zone.fixPhone + "</span></p>\
   		    	        		<p>手机号码：<span>" + zone.mobilePhone + "</span></p>\
   		    	        		<p>详细地址：<span>" + zone.address + "</span></p>\
   		    	        	</li>");
   	            	}
   	            	genPageBar(pageNum,data.data.lastPage,'laypage_12',function(data){
   	            		reqMatchZoneList(data);
   	            	});
   	            }
   	        });
   	    }
   	    reqMatchZoneList(1);
	   </script> 
	</body>
</html>