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
		<title>游学详情</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/starTourDetail.css" />
	</head>

	<body class="bg-pale">
       	<jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="tour" />
        </jsp:include>
		<ol class="breadcrumb w1100 mt120 clear">
			<span class="fl">当前位置：</span>
			<li>
				<a href="<%=basePath%>tour/info/tourIndex">星游学</a><i class="crumbIcon"></i></li>
			<li>
				<a href="<%=basePath%>tour/info/ow/travelroute">全部线路</a><i class="crumbIcon"></i></li>
			<li>游学详情</li>
		</ol>
		<div class="skin-container" style="background-color:rgb(64, 64, 64);background-image:url(<%=basePath%>website/images/xw_startour_details_bg.png);"> </div>
		<div class="tour-details-wrapper w1100">
			<div class="tour-details-title">
				<h1>${data.name }</h1>
				<p>剩余名额(人)：<span>${data.quota }</span>价格/人(￥)：<span>${data.price }</span></p>
			</div>

			<div class="tour-details-img">
				<div class="caroursel poster-main" data-setting='{
					"isAutoplay": false,
			        "width":1020,
			        "height":500,
			        "posterWidth":900,
			        "posterHeight":500
			    }'>
					<ul class="poster-list">
						<c:forEach items="${tourImages }" var="tourImage">
							<li class="poster-item"><img src="${tourImage.img }?x-oss-process=image/resize,m_fill,w_900,h_500,limit_0/auto-orient,0/quality,q_100"></li>
						</c:forEach>
					</ul>
					<div class="poster-btn poster-prev-btn"></div>
					<div class="poster-btn poster-next-btn"></div>
				</div>
				<c:if test="${data.registerEndDate le date }"><a href="javascript:;">报名已截止</a></c:if>
				<c:if test="${data.registerEndDate gt date }"><a id="register" href="<%=basePath%>tour/register/ow/reg?tourId=${data.id}">预约报名</a></c:if>
			</div>
			<div class="tour-details-info clear">
				<div><span>适合年龄：${data.properAge }</span><span>游学天数：${data.tourDayCount }天</span></div>
				<c:forEach items="${tourGroups }" var="group">
					<div class="group_active" group_id="${group.id }"><span><fmt:formatDate value="${group.departDate }" pattern="yyyy-MM-dd" timeZone="GMT+8"/></span><span>${group.departCity }</span></div>
				</c:forEach>
			</div>
			<div class="tour-details-introduction w1100">
				<section>
					<div class="title-wrapper">
						<div class="title-leve1 active">行程特色</div>
					</div>
					<p>${data.feature }</p>
				</section>
				<section>
					<div class="title-wrapper">
						<div class="title-leve1 active">优惠信息</div>
					</div>
					<input type="hidden" value="${data.discount }" id="hidediscount">
					<ul id="discount_ul">
					</ul>
				</section>
				
				<section>
					<div class="title-wrapper">
						<div class="title-leve1 active">课程路线及行程</div>
					</div>
					<ul class="tour-details-list">
						<c:if test="${empty tourLines }">
							<li><div><p>暂未配置路线级行程</p></div></li>
						</c:if>
						<c:forEach items="${tourLines }" var="line">
							<li>
								<span class="title-leve2">Day ${line.dayNo }${line.location }</span>
								<div>
									<span class="title-trip">行程描述</span>
									<p>
										${line.description }
									</p>
								</div>
								<div>
									<span class="title-sleep">住宿</span>
									<p>${line.accommodation }</p>
									<c:if test=""></c:if>
								</div>
							</li>
						</c:forEach>
					</ul>
					<p class="tip">注：以上为参考行程，根据实际航班情况或略有调整，实际行程以最终出团安排行程为准，免费咨询电话 400-9665-550</p>
				</section>
				<section>
					<div class="title-wrapper" id="active_show">
						<div class="title-leve1 active">费用包含</div>
						<div class="title-leve1">费用不包含</div>
						<div class="title-leve1">行前准备</div>
					</div>
					<div class="tab-wrapper">
						<!--费用包含-->
						<input type="hidden" id="hidePriceInclude" value="${data.priceInclude }">
						<ul id="priceInclude_ul">
						</ul>
						<!--费用不包含-->
						<input type="hidden" id="hidePriceExclude" value="${data.priceExclude }">
						<ul id="priceExclude_ul">
						</ul>
						<!--行前准备-->
						<input type="hidden" id="hidePreparation" value="${data.preparation }">
						<ul id="preparation_ul">
						</ul>
					</div>
				</section>
			</div>
		</div>
		<div class="recommended travel-box">
			<div class="recommended-wrapper w1100">
				<h2>推荐路线</h2>
				<ul class="clear">
					<c:forEach items="${tourRecommend }" var="tour">
						<li>
							<a href="<%=basePath%>tour/info/ow/detail?id=${tour.id }">
								<img src="${tour.indexImg }?x-oss-process=image/resize,m_fill,w_250,h_180,limit_0/auto-orient,0/sharpen,156/quality,q_100">
								<h3><span>${tour.name }</span></h3>
<%-- 								<p class="deadline">
									<fmt:formatDate value="${tour.registerEndDate}" pattern="yyyy-MM-dd" timeZone="GMT+8"/>
								</p> --%>
								
								<c:if test="${tour.registerEndDate le date }"><p class="deadline">报名已截止</p></c:if>
								<c:if test="${tour.registerEndDate gt date }"><p><fmt:formatDate value="${tour.registerEndDate}" pattern="yyyy-MM-dd" timeZone="GMT+8"/></p></c:if>
							
								<p class="priceRemark">
									<span>剩余名额<br /><i>${tour.quota }</i></span>
									<span>价格/人<br /><i>￥${tour.price}</i></span>
								</p>
							</a>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
		<div class="contact-us">
			<div class="w1000 clear">
				<div class="fl">
					<ul>
						<li>
							<i class="conIcon-01 fl"></i>
							<h2>全国组委会总部：</h2>
							<p>北京星路风采国际教育咨询有限公司</p>
						</li>
						<li>
							<i class="conIcon-02 fl"></i>
							<h2>联系电话：</h2>
							<p>4009665550</p>
						</li>
						<li>
							<i class="conIcon-03 fl"></i>
							<h2>详细地址：</h2>
							<p>北京市朝阳区朝阳门外大街乙12号昆泰国际大厦1702室</p>
						</li>
						<div class="qr-code">
							<div class="code" style="margin-right: 10px;">
								<img src="<%=basePath%>website/images/xw_footer_image_code_public.png" />
								<h3>公众号二维码</h3>
							</div>
							<div class="code">
								<img src="<%=basePath%>website/images/xw_footer_image_code_app.png" />
								<h3>APP下载</h3>
							</div>
						</div>
					</ul>
				</div>
				<div class="location fr"><img src="<%=basePath%>website/images/xw_footer_image_map.png" /></div>
			</div>
		</div>
		<jsp:include page="copyright_common.jsp"></jsp:include>
		<script src="<%=basePath%>website/js/lib/jquery.min.1.7.js"></script>
		<script src="<%=basePath%>website/js/lib/jquery.carousel.js"></script>
		<script>
			$(function(){
				
				var register_url = $("#register").attr("href");
				
				$(".tour-details-info div:not(:first)").click(function(){
					$(this).css("background-color","rgba(255, 255, 255, 0.5)");
					$(this).siblings("div:not(:first)").css("background-color","rgba(255, 255, 255, 0.2)");
					$("#register").attr("href", register_url + "&groupId=" + $(this).attr("group_id"));
				});
				
				$("#priceInclude_ul").show().siblings().hide();
				initDiscount();
				initPriceInclude();
				initPriceExclude();
				initPreparation();
				var a = Caroursel.init($('.caroursel'));
				
				$(".title-leve1").click(function() {
					if($(this).siblings().length > 0) {
						var currentIndex = $(this).index();
						$(this).addClass("active").siblings().removeClass("active").parents("section").find("ul").eq(currentIndex).show().siblings().hide();
					}

				});
			});
			
			function initDiscount(){
				$("#discount_ul").html("");
				var html = $("#hidediscount").val().split("\n");
				var discountHtml = "";
				for(var i=0; i<html.length; i++){
					discountHtml += "<li>" + html[i] + "</li>";
				}
				$("#discount_ul").html(discountHtml);
			}
			
			function initPriceInclude(){
				$("#priceInclude_ul").html("");
				var html = $("#hidePriceInclude").val().split("\n");
				var priceIncludeHtml = "";
				for(var i=0; i<html.length; i++){
					priceIncludeHtml += "<li>" + html[i] + "</li>";
				}
				$("#priceInclude_ul").html(priceIncludeHtml);
			}
			
			function initPriceExclude(){
				$("#priceExclude_ul").html("");
				var html = $("#hidePriceExclude").val().split("\n");
				var priceExcludeHtml = "";
				for(var i=0; i<html.length; i++){
					priceExcludeHtml += "<li>" + html[i] + "</li>";
				}
				$("#priceExclude_ul").html(priceExcludeHtml);
			}
			
			function initPreparation(){
				$("#preparation_ul").html("");
				var html = $("#hidePreparation").val().split("\n");
				var preparationHtml = "";
				for(var i=0; i<html.length; i++){
					preparationHtml += "<li>" + html[i] + "</li>";
				}
				$("#preparation_ul").html(preparationHtml);
			}
		</script>
	</body>

</html>