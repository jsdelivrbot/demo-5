<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>歌曲赛</title>
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
						<h2>歌曲赛导语</h2>
						<p>希望之星”英语歌曲大赛以英文歌曲比赛的舞台形式展现我国青少年学生的文艺风采，以富于青春活力的旋律、精彩激烈的比赛形式激发青少年学生的英语学习热情及艺术才华，发掘优秀原创歌曲，培养优秀音乐人才，为所有怀揣音乐才华、梦想的青少年提供展示自我、交流及娱乐的全新综合性平台。为更多的青少年提供展示机会、实现音乐梦想的原则，为创建和谐中国、文化中国做出努力。</p>
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

