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
		<title>明星选手</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/website/css/base.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/website/js/lib/laypage/skin/laypage.css" />
		<style>
			.second-banner {
				background-image: url(<%=basePath%>/website/images/xw_match_star_bg.jpg);
			}
			
			.wrapper-box {
				padding: 18px 0 0 32px;
			}
			
			.wrapper-box li {
				width: 156px;
			}
			
			.wrapper-box li div {
				width: 156px;
				height: 156px;
			}
		</style>
	</head>

	<body class="bg-pale">
		<jsp:include page="/website/html/header1100.jsp" >
			<jsp:param name="activeMenu" value="match" />
		</jsp:include>
		<div class="banner second-banner">
			<div class="w1100">
				<h2>明星选手</h2>
				<ol class="breadcrumb w1100 clear">
					<span class="fl">当前位置：</span>
					<li>希望之星<i class="crumbIcon"></i></li>
					<li>明星选手</li>
				</ol>
			</div>
		</div>
		<ul class="w1100 position-offset select-box">
			<li class="clear"><span class="fl">年份：</span><ul class="fl year"><li class="active">全部</li><c:forEach items="${yearList }" var="year"><li>${year }</li></c:forEach></ul></li>
			<li class="clear"><span class="fl">赛事：</span><ul class="fl matchType"><li class="active" matchType="">全部</li><c:forEach items="${matchTypeMap }" var="matchType"><li matchType="${matchType.key }">${matchType.value }</li></c:forEach></ul></li>
			<li class="clear"><span class="fl">赛区：</span><ul class="fl matchZone"><li class="active" matchzoneid="">全部</li><c:forEach items="${matchZoneList }" var="matchZone"><li matchzoneid="${matchZone.id }">${matchZone.zoneName }</li></c:forEach></ul></li>
			<li class="clear"><span class="fl">组别：</span><ul class="fl ageGroup"><li class="active" agegroup="">全部</li><c:forEach items="${ageGroupMap }" var="ageGroup"><li agegroup="${ageGroup.key}">${ageGroup.value }</li></c:forEach></ul></li>
		</ul>
		<div class="w1100 wrapper-box">
			<ul class="clear" id="playerList">
			</ul>
			<div class="page-box">
				<div name="laypage1.3" class="laypage_main laypageskin_default" id="laypage_12">
				</div>
			</div>
		</div>

		<jsp:include page="copyright_common.jsp"></jsp:include>
		<script src="<%=basePath%>/website/js/lib/jquery.min.1.7.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=basePath%>website/js/main/pagination.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			$(".select-box li li").click(function(){
				$(this).addClass("active").siblings().removeClass("active");
			});
			
			$(".year,.matchType,.matchZone,.ageGroup").children("li").each(function(){
				$(this).click(function(){
					reqPlayerList(1);
				});
			});
			
			function reqPlayerList(pageNum){
				var year = $(".year li.active").html();
				if(year == "全部"){
					year = "";
				}
				var matchType = $(".matchType li.active").attr("matchType");
				var matchAreaId = $(".matchZone li.active").attr("matchzoneid");
				var matchAgeId = $(".ageGroup li.active").attr("agegroup");
				
	   	    	$.ajax({
	   	            url: "<%=basePath%>starPlayer/getPlayerList?pageNum="+pageNum +"&pageSize=18&matchType="+matchType+"&matchAreaId="+matchAreaId+"&matchAgeId="+matchAgeId+"&year="+year,
	   	            success: function(data){
	   	            	var list = data.data.list;
	   	            	$("#playerList").empty();
	   	            	if(list.length == 0){
	   	            		$("#playerList").html("<p>无对应条件的选手 </p>");
	   	            		return;
	   	            	}
	   	            	for(var i=0;i<list.length;i++){
	   	            		var player = list[i];
	   	            		$("#playerList").append("<li><a href='<%=basePath%>starPlayer/" + player.starPlayerId + "'><div><img src='" + player.pic + "?x-oss-process=image/resize,m_fill,w_156,h_156,limit_0/auto-orient,0/sharpen,156/quality,q_100' /></div><span>" + player.name + "</span></a></li>");
	   	            	}
	   	            	genPageBar(pageNum,data.data.lastPage,'laypage_12',function(data){
	   	            		reqPlayerList(data);
	   	            	});
	   	            }
	   	        });
   	    	}
			reqPlayerList(1);
		</script>
	</body>
</html>