<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>主体赛</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/css/base.css"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/css/themeMatch.css"/>
    </head>
    <body>
        <jsp:include page="/website/html/header.jsp" >
            <jsp:param name="activeMenu" value="match" />
        </jsp:include>
        <div class="banner"></div>
        <div class="match-lead">
            <div class="w1000 clear">
                <div class="fr">
                	<div class="reImg"><img src="${pageContext.request.contextPath}/website/images/xw_match_img_1.jpg"/></div>
					<div class="match-lead-text">
						<h2>主体赛导语</h2>
						<p>2017年度“希望之星”英语风采大赛(以下简称大赛)。大赛以培养兴趣、增强信心、展示风采、树立榜样为目的，旨在为全国英语爱好者搭建一个激励英语学习、培养思辨能力、展现综合风采的舞台，为中西文化架起一座促进文化沟通、增强国际交流的桥梁。大赛组织者希望能够通过比赛，让世界听到中国的声音，了解中国的文化传统与民族精神;推动我国外语教学与学习的发展，展示我国英语教学的现状;培养和发现新时期国家发展所需要的高素质外语人才;为我国的经济、文化建设创造良好的语言环境。</p>
					</div>
				</div>
            </div>
        </div>
        <div class="event-info">
            <div class="w1000 clear">
                <div class="event-news fl">
                    <h2>赛务信息 </h2>
                    <ul>
                    <c:forEach items="${matchs.list }" var="item">
                        <li><a href="${pageContext.request.contextPath}/news/newsDetail?id=${item.id}">${item.title }</a></li>
                    </c:forEach>
                    </ul>
                    <a class="event-info-more" href="${pageContext.request.contextPath}/news/matchThemelist">查看更多&gt;&gt;</a>
                </div>
                <div class="event-outs fl">
                    <ul>
                        <li class="event-outs-text">精彩赛况</li>
                        <c:forEach items="${matchVideos }" var="item">
                        <li><a  class="swiper-slide"><img src="${item.picUrl }?x-oss-process=image/resize,m_fill,w_145,h_116,limit_0/auto-orient,0/quality,q_100" videourl="${item.videoUrl}" /><h3><span>${item.name }</span></h3></a></li>
                    </c:forEach>
                        <li class="event-outs-more"><a href="${pageContext.request.contextPath}/video/videos">查看更多<i class="eventIcon-02 fr">&gt;</i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="guest-judges">
            <h2><span>嘉宾评委</span></h2>
            <ul class="w1000 clear">
                    <c:forEach items="${guests}" var="item">
                		<li><a href="${pageContext.request.contextPath}/judgestguest/${item.recommendId }"><img src="${item.picUrl }?x-oss-process=image/resize,m_fill,w_333,h_320,limit_0/auto-orient,0/quality,q_100"/></a></li>
                    </c:forEach>
            </ul>
            <a class="guest-judges-more" href="${pageContext.request.contextPath}/judgestguest/ow/viewlist">查看更多</a>
        </div>
        <div class="star-player">
            <h2><span>明星选手</span></h2>
            <ul class="w1000 clear">
            <c:forEach items="${players }" var="item">
                <li><a href="${pageContext.request.contextPath}/starPlayer/${item.recommendId }"><img src="${item.picUrl }?x-oss-process=image/resize,m_fill,w_333,h_330,limit_0/auto-orient,0/quality,q_100"/></a></li>
            </c:forEach>
            </ul>
            <a class="star-player-more" href="${pageContext.request.contextPath}/starPlayer/players">查看更多</a>
        </div>
        <jsp:include page="footer.jsp"></jsp:include>
        <div class="view">
            <div class="view-bg"></div>
            <div class="view-wrapper">
                <video id="gameVideo" width="900" controls="controls" src="" type="video/mp4">
                    	当前浏览器不支持 video直接播放
                </video>
            </div>
        </div>
        <script type="text/javascript">
            $(".event-outs ul li img").click(function() {
                $("#gameVideo").attr("src",$(this).attr("videourl"));
                $(".view").fadeIn();
                var gameVideo = document.getElementById("gameVideo");
                gameVideo.play();
                $(".view-bg").click(function() {
                    $(".view").fadeOut();
                    gameVideo.pause();
                });
            });
            $(".event-news li").each(function(i){
			    var divH = $(this).height();
			    var $p = $("a", $(this)).eq(0);
			    while ($p.outerHeight() > divH) {
			        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
			    };
			});
			$(".event-outs li h3").each(function(i){
			    var divH = $(this).height();
			    var $p = $("span", $(this)).eq(0);
			    while ($p.outerHeight() > divH) {
			        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
			    };
			});
        </script>
        
    </body>
</html>
