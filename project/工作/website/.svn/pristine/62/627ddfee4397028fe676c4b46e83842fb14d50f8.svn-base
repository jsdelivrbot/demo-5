<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>希望之星</title>
<link rel="stylesheet" href="<%=basePath%>website/css/star.css">
<script>
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "https://hm.baidu.com/hm.js?6c381bc743ab01d56f8e2217c1c5198c";
	  var s = document.getElementsByTagName("script")[0];
	  s.parentNode.insertBefore(hm, s);
	})();
	var basePath = '<%=basePath%>';
</script>

<script>

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?7bbdb5ad1a0889de49e14415f9cc9bec";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</head>

<body>
    <div class="whole">
        <div class="bar">
            <div class="barCont">
                <div class="barPhoneNum">
                    <div class="bg phoneIco"></div>
                    <span class="phoneNumTxt">全国咨询热线：</span>
                    <span class="phoneNumTxt">400-9665-550</span>
                </div>
                <div class="loginCont">
                
                   <div class="header-login">
                    <a href="javascript:;" id="loginSpan">登录</a> 
                    |<a href="javascript:;" id="registerSpan">注册</a>
                     </div> 
                    <div class="header-logged hide">
                    <%-- <img id="userImg" src="<%=basePath %>website/images/person.png" /> --%>
                    <a href="#" class="head"><img id="userImg" src=""></a>
                   
                    <span id="realNameSpan"></span>
                    <a href="javascript:;" id="logoutSpan">退出</a>
                    </div>
                </div>
                <div class="logoCont">
                    <div class="logo"><img src="<%=basePath%>website/images/xw_header_image_logo.png"></div>
                </div>
            </div>
        </div>
        <jsp:include page="/website/static/banner.jsp" />
<%--         <div class="focus">
            <div class="focusLB">
            <c:forEach items="${carousePicList }" var="pic">
                <a href="${pic.href }"><img src="${pic.picUrl }?x-oss-process=image/resize,m_fill,w_1887,h_855,limit_0/auto-orient,0/sharpen,156/quality,q_100" /></a>
            </c:forEach>
            </div>
        </div> --%>
        <div class="navCont">
            <div class="nav">
                <a href="#">
                    <div class="houseIco"></div>
                    <span>OUTLOOK首页</span>
                </a>
                <div class="secNavA">
                    <div class="sjCont">
                        <div class="sjTxt">希望之星</div>
                        <div class="sj"></div>
                    </div>
                    <div class="secNav">
                        <a href="<%=basePath%>match/theme">主体赛</a>
                        <a href="<%=basePath%>match/dramaMatch">戏剧赛</a>
                        <a href="<%=basePath%>match/musicMatch">歌曲赛</a>
                    </div>
                </div>
                <a href="<%=basePath%>tour/info/tourIndex">星游学</a>
                <a href="<%=basePath%>aboutus/timeline">关于我们</a>
                <a href="<%=basePath%>contactus">联系我们</a>
            </div>
        </div>
        <div class="category">
            <div class="title">STAR OF OUTLOOK</div>
            <div class="sTitle">希望之星</div>
            <div class="type">
                <a href="<%=basePath%>match/theme">
                	<div class="bg"></div>
                    <div class="typeTitle">主体赛</div>
                    <div class="typeInfo">“希望之星”英语风采大赛已经成功举办17届，以培养兴趣、增强信心、展示风采、树立榜样为目的，旨在为全国英语爱好者搭建一个激励英语学习、培养思辨能力、展现综合风采的舞台，为中西文化架起一座促进文化沟通、增强国际交流的桥梁。</div>
                </a>
                <a href="<%=basePath%>match/dramaMatch">
                	<div class="bg"></div>
                    <div class="typeTitle">戏剧赛</div>
                    <div class="typeInfo">希望之星”英语戏剧大赛是以英语对话、剧情演绎、肢体表现等形式展现的表演艺术。目的在于给更多的“希望之星”选手打造一个实现演艺梦想、展现英语风采的舞台，学生通过戏剧表演能够以英语表演戏剧，在戏剧中更深层次地学习和运用语言，进而更充分地了解英语戏剧中的艺术性、文学性以及不同的文化。</div>
                </a>
                <a href="<%=basePath%>match/musicMatch">
                	<div class="bg"></div>
                    <div class="typeTitle">歌曲赛</div>
                    <div class="typeInfo">“希望之星”英语歌曲大赛以英文歌曲比赛的舞台形式展现我国青少年学生的文艺风采，以富于青春活力的旋律、精彩激烈的比赛形式激发青少年学生的英语学习热情及艺术才华，发掘优秀原创歌曲，培养优秀音乐人才，为所有怀揣音乐才华、梦想的青少年提供展示自我、交流及娱乐的全新综合性平台。</div>
                </a>
                <a href="<%=basePath%>tour/info/tourIndex">
                	<div class="bg"></div>
                    <div class="typeTitle">星游学</div>
                    <div class="typeInfo">“希望之星”星游学是专业从事跨文化国际教育交流，专注于通过各类形式的营会教育方式提高青少年的语言、生活和思维创造能力，锻炼学生的意志，让青少年增进不同国家文化间的理解与融合，在与当地知名学校的交流中，为学生创造更多机会了解国外的教育体制，增强自身能力的同时为将来的学习和生活做好准备！</div>
                </a>
            </div>
        </div>
        <jsp:include page="/website/static/index_video.jsp" />
<%--         <div class="category game">
            <div class="title">WONDERFUL GAME</div>
            <div class="sTitle">精彩赛况</div>
            <div class="videotitle"></div>
            <div class="videoFocus focus">
                <div class="videoLB focusLB">
                <c:forEach items="${videoList }" var="video">
                    <a name="${video.videoUrl }" title="${video.name }"><img src="${video.picUrl }?x-oss-process=image/resize,m_fill,w_1000,h_540,limit_0/auto-orient,0/sharpen,156/quality,q_100"></a>
                        </c:forEach>
                    
                </div>
            </div>
            <a href="<%=basePath%>video/videos" class="more">查看更多</a>
        </div> --%>

        <!-- 游学html -->
                <jsp:include page="/website/static/index_tour.jsp" />
        <!-- news html -->
                <jsp:include page="/website/static/index_news.jsp" />
        <div class="company">
            <ul class="partner">
                <li>
                    <h3 class="companyName">主办单位：</h3>
                    <div class="companyName">中央电视台中央新影集团</div>
                </li>
                <li>
                    <h3 class="companyName">承办单位：</h3>
                    <div class="companyName">北京星路风采国际教育咨询有限公司</div>
                </li>
                <li>
                    <h3 class="companyName">支持单位：</h3>
                    <div class="companyName">中学生频道、乐视儿童、乐视教育</div>
                    <div class="companyName">有道词典、中国人民大学出版社</div>
                </li>
            </ul>
        </div>
        <div class="contactCont">
            <div class="contact">
                <ul class="contactList">
                    <li>
                        <div class="conIco conPersonIco"></div>
                        <div class="contTxtCont">
                            <div class="contxt1">全国组委会总部：</div>
                            <div class="contxt2">北京星路风采国际教育咨询有限公司</div>
                        </div>
                    </li>
                    <li>
                        <div class="conIco conPhoneIco"></div>
                        <div class="contTxtCont">
                            <div class="contxt1">联系电话：</div>
                            <div class="contxt2">4009665550</div>
                        </div>
                    </li>
                    <li>
                        <div class="conIco conaddIco"></div>
                        <div class="contTxtCont">
                            <div class="contxt1">详细地址：</div>
                            <div class="contxt2">北京市朝阳区朝阳门外大街乙12号昆泰国际大厦1702室</div>
                        </div>
                    </li>
                    <li>
                        <div class="wenxin">
                            <div class="code">
                                <img src="<%=basePath%>website/images/xw_footer_image_code_public.png">
                                <div class="codeTxt">公众号二维码</div>
                            </div>
                            <div class="code">
                                <img src="<%=basePath%>website/images/xw_footer_image_code_app.png">
                                <div class="codeTxt">APP下载</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="map"></div>
            </div>
        </div>
        <div class="footer">
            <p>此网站隶属于北京星路风采国际教育咨询有限公司</p>
            <p>Copyright © 2017 Beijing Star of Outlook Int’l Education Consultant Co., Ltd All Rights Reserved. 京ICP备16005203号-1</p>
        </div>
    </div>
    <div class="videoView">
        <video class="video" src="" width="1000" height="540" controls ></video>
    </div>
    <div class="videoViewBg"></div>
</body>
</html>
<script src="<%=basePath%>website/js/lib/jquery.min.1.7.js"></script>
<script src="<%=basePath%>website/js/main/star.js"></script>
<script src="<%=basePath%>website/js/main/header.js"></script>