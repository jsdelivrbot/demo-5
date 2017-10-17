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
		<title>注册-希望之星</title>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/website/css/base.css"/>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/website/css/register.css"/>
	</head>
	<body>
		<div class="skin-container"></div>
		<jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="" />
        </jsp:include>
		<div class="register-box-bg">
			<div class="register-box">
				<ul class="register-stepProcess clear">
					<li style="display: none;">手机验证</li>
					<li class="active">个人信息</li>
					<li>比赛信息</li>
				</ul>
				<div class="stepOne"  style="display: none;">
					<ul>
						<li>
							<input type="tel" id="register_phone" placeholder="手机号码" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
						</li>
						<div class="error-tip"></div>
						<li class="clear">
							<input type="tel" id="register_code" class="fl" style="width: 100px" placeholder="验证码" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
							<input type="button" class="btn-code fr" value="获取验证码">
						</li>
					</ul>
					<button class="btn btn-next btn-next-two" type="button" disabled="disabled">下一步</button>
				</div>
				<div class="stepTwo active">
					<ul>
						<li>
							<label for="register_name">姓名：</label>
							<input type="text" id="register_name">
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_nation">民族：</label>
							<select id="register_nation">
								<option value="">请选择</option>
							</select>
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_sex">性别：</label>
							<select id="register_sex">
								<option value="">请选择</option>
								<option value="1">男</option>
								<option value="0">女</option>
							</select>
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_cert">证件类型：</label>
							<select id="register_cert">
								<option value="">请选择</option>
								<option value="1">身份证</option>
								<option value="2">（港澳台）护照</option>
								<option value="3">港澳通行证</option>
								<option value="4">香港身份证</option>
								<option value="5">台胞证</option>
								<option value="6">护照</option>
							</select>
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_idNumber;">证件号码：</label>
							<input type="tel" id="register_idNumber" maxlength="18"/>
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_province">所在地区：</label>
							<select id="register_province" name="register_province">
								<option value="">请选择</option>
							</select>
							<select id="register_city" name="register_city">
								<option value="">请选择</option>
							</select>
							<select id="register_county" name="register_county">
								<option value="">请选择</option>
							</select>
							<span class="error-tip"></span>
						</li>
					</ul>
					<button class="btn btn-next btn-next-three" type="button">下一步</button>
				</div>
				<div class="stepThree">
					<ul>
						<li class="clear">
							<label class="fl" for="register_photo">证件照：</label>
							<div id="register_photo" class="uploader-list fl">
								<img src="<%=basePath%>/website/images/xw_login_image_photo.png"/>
							</div>
							<div class="photo-box">
								<div id="filePicker" class="btn-photo" type="button">浏览...</div><br />
								<span class="photo-tip">未选择文件</span>
							</div>
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_school">学校/机构：</label>
							<input type="text" id="register_school">
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_class">所属班级：</label>
							<input type="text" id="register_class">
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_mailbox">家长邮箱：</label>
							<input type="text" id="register_mailbox"/>
							<span class="error-tip"></span>
						</li>
						<li>
							<label for="register_match">项目组别：</label>
							<select id="register_match" name="register_match">
								<option value="">请选择</option>
							</select>
							<select id="register_group" name="register_group">
								<option value="">请选择</option>
							</select>
							<span class="error-tip"></span>
						</li>
					</ul>
					<button class="btn btn-submit" type="button">完成</button>
				</div>
			</div>
		</div>
		<jsp:include page="copyright_common.jsp"></jsp:include>
	    <script src="<%=basePath%>/website/js/lib/jquery.min.1.7.js" type="text/javascript" charset="utf-8"></script>
	    <script src="<%=basePath%>/website/js/lib/webuploader.js"></script>
	    <script src="<%=basePath%>/website/js/lib/areaData.js" type="text/javascript" charset="utf-8"></script>
	    <script src="<%=basePath%>/website/js/main/register.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>