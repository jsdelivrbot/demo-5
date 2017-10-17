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
		<title>预约报名</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/signUp.css" />
	</head>
	<script type="text/javascript">var basePath = '<%=basePath%>';</script>
	<body>
		<jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="tour" />
        </jsp:include>
		<ol class="breadcrumb w1100 mt120 clear">
			<span class="fl">当前位置：</span>
			<li>
				<a href="<%=basePath%>tour/info/tourIndex">星游学</a><i class="crumbIcon"></i></li>
			<li>
				<a href="<%=basePath%>tour/info/ow/travelroute">全部线路</a><i class="crumbIcon"></i></li>
			<li>
				<a href="<%=basePath%>tour/info/ow/detail?id=${tour.id }">游学详情</a><i class="crumbIcon"></i></li>
			<li>预约报名</li>
		</ol>
		<div class="tip shadow w1100">
			<h2>温馨提示：</h2>
			<p>你所预约的线路，全国正在同步销售，名额有限，我们将以客户支付定金先后时间为准。 为确保您能顺利报名该团，建议您尽快生成订单，采用在线支付预交订金，锁定名额。请等待顾问与您联系，如有疑问请拨打电话<span>400-9665-550</span></p>
		</div>
		<div class="signUp-wrapper shadow w1100">
			<div class="clear">
				<form class="form-horizontal" id="saveForm" role="form">
				<div class="info fl">
					<h2 class="title">预约报名信息</h2>
					<div>
						<label for="name">学员姓名：</label><input type="text" id="name" name="name" value="" />
						<span class="error nameerror"></span>
					</div>
					<div>
						<label for="phone">联系电话：</label><input type="text" id="phone" name="phone" value="" maxlength="12"/>
						<span class="error phoneerror"></span>
					</div>
					<div>
						<label for="email">电子邮箱：</label><input type="text" id="email" name="email" value="" />
						<span class="error emailerror"></span>
					</div>
					<div>
						<label for="route">选择线路：</label>
						<select id="route" name="tourId">
							<option value="${tour.id }">${tour.name }</option>
						</select>
					</div>
					<div>
						<label for="date">出团选择：</label>
						<select id="date" name="tourGroupId">
							<c:forEach items="${groups }" var="group">
								<option value="${group.id }" city="${group.departCity }" <c:if test="${group.id eq s_groupId }">selected</c:if>
									departDate="<fmt:formatDate value="${group.departDate }" pattern="yyyy-MM-dd" timeZone="GMT+8"/>">
									${group.departCity } <fmt:formatDate value="${group.departDate }" pattern="yyyy-MM-dd" timeZone="GMT+8"/>
								</option>
							</c:forEach>
						</select>
						<span class="grouperror"></span>
					</div>
				</div>
				</form>
				<div class="route fr">
					<h2 class="title">已选择游学路线</h2>
					<img src="${tour.indexImg }?x-oss-process=image/resize,m_fill,w_460,h_255,limit_0/auto-orient,0/sharpen,156/quality,q_100" alt="" />
					<p>${tour.name }</p>
					<p><span>价格 (¥)：</span><i>${tour.price }／人</i></p>
					<p><span>出发日期：</span><i id="departDate"></i></p>
					<p><span>出发城市：</span><i id="departCity"></i></p>
				</div>
			</div>

			<button id="submit" disabled="disabled">确认信息</button>
		</div>
		<footer  class="common-footer">
			<p>此网站隶属于北京星路风采国际教育咨询有限公司</p>
			<p>Copyright © 2016 Beijing Star of Outlook Int’l Education Consultant Co., Ltd All Rights Reserved. 京ICP备16005203号-1</p>
		</footer>
		<div class="success">
			<p>您已成功报名!&nbsp;&nbsp;请等待顾问与您联系</p>
		</div>
		<script src="<%=basePath%>website/js/lib/jquery.min.1.7.js"></script>
		<script type="text/javascript" src="<%=basePath%>common/js/jquery.form.js"></script>
		<script>
			var nameval = "",telval = "",emailval = "";
			var nameerror = $(".error").eq(0),
				namereg = /^[a-zA-Z\u4e00-\u9fa5]{1,15}$/,
				telerror = $(".error").eq(1),
				telreg = /^\d{0,12}$/,
				emailerror = $(".error").eq(2),
				emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

			$("input").on('input propertychange', function() {
				nameval = $("#name").val();
				telval = $("#phone").val();
				emailval = $("#email").val();
				if(nameval != "" && telval != "" && emailval != "") {
					$("#submit").addClass("available").removeAttr("disabled");
				} else {
					$("#submit").removeClass("available").attr("disabled", "disabled");
				}
			});
			
			initDepartInfo();
			
			$("#date").change(function(){
				initDepartInfo();
			});
			
			$("#submit").click(function() {
				$(this).attr("disabled","disabled");
				if(checkVal()) { // 提交信息
					// 报名成功
					var options = {
							method:"POST",
							url: basePath + "tour/register/save",
							success: function (data){
								if(data.result == '1'){
									$(".success").fadeIn();
									setTimeout(function() {
										$(".success").fadeOut();
										window.location.href = "<%=basePath%>tour/info/ow/detail?id=${tour.id }";
									}, 3000);
							   }else{
								   alert(data.msg);
							   }
							}
						};
					$("#saveForm").ajaxSubmit(options);
				}else{
					$(this).removeAttr("disabled");
				}
			});

			function initDepartInfo(){
				var $option = $("#date option:selected");
				$("#departCity").html($option.attr("city"));
				$("#departDate").html($option.attr("departDate"));
			}
			
			function checkVal() {
				namereg.test(nameval) == true ? nameerror.text(""):nameerror.text("姓名输入格式错误！");
				telreg.test(telval) == true ? telerror.text(""):telerror.text("电话输入格式错误！");
				emailreg.test(emailval) == true ? emailerror.text(""):emailerror.text("邮箱输入格式错误！");
				if(nameerror.text() == "" && telerror.text() == "" && emailerror.text() == "") {
					return true;
				} else {
					return false;
				}
			}
			
		</script>
	</body>
</html>