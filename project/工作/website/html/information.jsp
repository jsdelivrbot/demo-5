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
		<title>个人信息</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/base.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>website/css/information.css" />
	</head>

	<body class="bg-pale">
		<jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="" />
        </jsp:include>
		<div class="wrapper w1100 mt120 clear">
			<div class="match-wrapper shadow fl">
				<h2>2017希望之星英语风采大赛</h2>
				<!--未绑定编码-->
				<div class="code-wrapper">
					<div class="code-box">
						<input id="coding" type="text" placeholder="请输入验证码" value="" />
						<img id="verifyImg" src="" />
					</div>
					<div class="entryCode-box">
						<input type="text" id="code" placeholder="请输入参赛编码" />
						<button id="bind">绑定</button>
					</div>

				</div>

				<!--未配置比赛-->
				<div class="unconfigured-wrapper">
					<p>比赛还未配置，请耐心等待～</p>
				</div>
				<div class="spinner">
					<div class="double-bounce1"></div>
					<div class="double-bounce2"></div>
				</div>
				<!--配置比赛-未测评-->
				<div class="configured-wrapper">
					<ul>
						<li class="configured-bg"></li>
						<!--<li class="clear">
							<div class="configured-date fl">
								<sup>2017.01.07</sup><sub>2017.03.31</sub>
							</div>
							<div class="configured-match fl clear">
								<div class="configured-info clear">
									<span class="fl">初赛</span>
								</div>
								<p>SOOPT测评：<a href="#" class="btn btn-start">开始测评</a></p>
							</div>
						</li>-->
					</ul>
				</div>

				<!--配置比赛-已测评-->
				<!--<div class="configured-wrapper">
					<ul>
						<li class="configured-bg"></li>
						<li class="clear">
							<div class="configured-date fl">
								<sup>2017.01.07</sup><sub>2017.03.31</sub>
							</div>
							<div class="configured-match fl clear">
								<div class="configured-info clear">
									<span class="fl">初赛</span>
									<span class="fl">已晋级</span>
								</div>
								<p>SOOPT测评：<span>87</span></p>
								<p>面试得分：<span>87</span></p>
								<a href="#" class="btn">查看测评报告</a>
							</div>
						</li>
						<li class="clear">
							<div class="configured-date fl">
								<sup>2017.01.07</sup><sub>2017.03.31</sub>
							</div>
							<div class="configured-match fl">
								<div class="configured-info clear">
									<span class="fl">复赛</span>
									<span class="fl not-qualify">未晋级</span>
								</div>
								<p>总分：<span>87</span></p>
								<p>发音：<span>87</span></p>
								<p>风采：<span>87</span></p>
								<p>内容：<span>87</span></p>
							</div>
						</li>
					</ul>
				</div>-->
			</div>
			<div class="info-wrapper fr">
				<ul class="info shadow">
					<!--<li>
						<div class="info-portrait"><img src="../images/person.png" /></div>
					</li>
					<li>张楚楚</li>
					<li><span>男</span><span>汉族</span></li>
					<li>身份证号：<span>22018419901135897X</span></li>
					<li>北京－朝阳区</li>
					<li>主体赛－小学低年级组</li>-->
				</ul>
			</div>
		</div>
		<jsp:include page="copyright_common.jsp"></jsp:include>
		<script src="<%=basePath%>website/js/lib/jquery.min.1.7.js"></script>
		<script src="<%=basePath%>website/js/main/information.js"></script>
	</body>

</html>
