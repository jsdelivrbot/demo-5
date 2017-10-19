<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <title>希望之星星游学</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/website/css/base.css" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/website/css/swiper.min.css" />
        <link rel="stylesheet" href="${pageContext.request.contextPath}/website/css/starTour.css" />
        <script type="text/javascript" src="${pageContext.request.contextPath}/website/js/lib/jquery.min.1.7.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/website/js/lib/modernizr.2.5.3.min.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/website/js/lib/turn.js"></script>
    </head>

    <body>
        <jsp:include page="/website/html/header.jsp" >
			<jsp:param name="activeMenu" value="tour" />
		</jsp:include>
        <div class="banner">
            <div class="banner-wrapper w1000">
                <div class="banner-img fl"><img src="${pageContext.request.contextPath}/website/images/campinfo.jpg" alt="" /></div>
                <div class="banner-content fr">
                    <h1 class="banner-list-title">星游学简介</h1>
                    <p>“希望之星”星游学是专业从事跨文化国际教育交流，专注于通过各类形式的营会教育方式提高青少年的语言、生活和思维创造能力，锻炼学生的意志，让青少年增进不同国家文化间的理解与融合，在与当地知名学校的交流中，为学生创造更多机会了解国外的教育体制，增强自身能力的同时为将来的学习和生活做好准备！
                    </p>
                </div>
            </div>
        </div>
        <div class="route">
            <div class="route-wrapper w1000 clear">

                <div class="route-nav fl">
                    <div class="nav-img"><img src="${pageContext.request.contextPath}/website/images/xw_startour_image_line.png" /></div>
                    <ul>
                        <li><span>中国</span><span>CHINA</span></li>
                        <li><span>美国</span><span>AMERICA</span></li>
                        <li><span>加拿大</span><span>CANADA</span></li>
                        <li><span>英国</span><span>ENGLAND</span></li>
                        <li><span>澳大利亚</span><span>AUSTRALIA</span></li>
                    </ul>
                </div>
                <ul class="route-content fl clear">
                
                <c:forEach items="${listTour }" var="item">
                    <li>
                        <a href="${pageContext.request.contextPath}/tour/info/ow/detail?id=${item.id}">
                            <div class="list-img"><img src="${item.indexImg}?x-oss-process=image/resize,m_fill,w_356,h_231,limit_0/auto-orient,0/sharpen,156/quality,q_100" alt="" /></div>
                            <div class="list-title"><span>${item.name}</span><span class="fr"><i class="ef6002">${item.price }</i>/人</span></div>
                        </a>
                    </li>
                
                </c:forEach>
                    
                </ul>
                <a class="more fr" href="${pageContext.request.contextPath}/tour/info/ow/travelroute">全部路线</a>
            </div>
        </div>
        <div class="review">
            <ul class="review-wrapper w1000 clear">
                <li>
                    <a  onclick=showVideo('${listVideo[0].videoUrl}')   >
                        <div class="list-img"><img  src="${listVideo[0].picUrl }?x-oss-process=image/resize,m_fill,w_600,h_400,limit_0/auto-orient,0/sharpen,156/quality,q_100" alt="" /></div>
                        <div class="list-title">${listVideo[0].name }</div>
                    </a>
                </li>
                <ul class="review-list1 fl clear">
                    <li>
                        <a href="${pageContext.request.contextPath}/video/videos">
                            <p>往期回顾</p>
                            <a class="more" href="${pageContext.request.contextPath}/video/videos">查看更多</a>
                        </a>
                    </li>
                    <li>
                        <a onclick="showVideo('${listVideo[1].videoUrl}')">
                            <div class="list-img"><img src="${listVideo[1].picUrl }?x-oss-process=image/resize,m_fill,w_200,h_200,limit_0/auto-orient,0/sharpen,156/quality,q_100" alt="" /></div>
                            <div class="list-title">${listVideo[1].name }</div>
                        </a>
                    </li>
                 </ul>
                <ul class="review-list2 fl clear">
                    <li>
                        <a onclick=showVideo('${listVideo[2].videoUrl}') >
                            <div class="list-img"><img src="${listVideo[2].picUrl }?x-oss-process=image/resize,m_fill,w_200,h_170,limit_0/auto-orient,0/sharpen,156/quality,q_100" alt="" /></div>
                            <div class="list-title">${listVideo[2].name }</div>
                        </a>
                    </li>
                    <li>
                        <a onclick=showVideo('${listVideo[3].videoUrl}') >
                            <div class="list-img"><img src="${listVideo[3].picUrl }?x-oss-process=image/resize,m_fill,w_200,h_200,limit_0/auto-orient,0/sharpen,156/quality,q_100" alt="" /></div>
                            <div class="list-title"><span>${listVideo[3].name }</span></div>
                        </a>
                    </li>
                </ul>
            </ul>
        </div>
        <div class="record">
            <div class="record-wrapper">
                <div class="magazine-viewport">
                    <div class="magazine">
                        <div></div>
                        <div class="page" style="background:url(${pageContext.request.contextPath}/website/images/xw_startour_image_bg_left.png) center top no-repeat;background-size:100%">
                            <h2>成长记录</h2>
                        </div>
                        
                        <c:forEach items="${listNews}" var="item" varStatus="vstatus">
                        	<c:choose>
				                <c:when test="${vstatus.index%2==0}">
				                	<div style="background:url(${pageContext.request.contextPath}/website/images/xw_startour_image_bg_right.png) center top no-repeat;background-size:100%">
				                	<h3 class="record-title" style="background: url(${pageContext.request.contextPath}/website/images/xw_startour_image_growup_right.png) no-repeat;">${item.title }</h3>
				                </c:when>
				                <c:otherwise>
				                	<div style="background:url(${pageContext.request.contextPath}/website/images/xw_startour_image_bg_left.png) center top no-repeat;background-size:100%">
				                	<h3 class="record-title" style="background: url(${pageContext.request.contextPath}/website/images/xw_startour_image_growup_left.png) no-repeat 28px;">${item.title }</h3>
				                </c:otherwise>
				            </c:choose>
                            <div class="record-img"><img src="${item.newsPic }" /></div>
                            <div class="record-content">
                                <div class="record-text">
                                    <p>${item.content }</p>
                                </div>
                                <a href="${pageContext.request.contextPath}/news/newsDetail?id=${item.id}" class="more fl">查看更多内容>></a>
                            </div>
                        </div>
          				</c:forEach>

                    </div>
                    <i class="conIcon previous-button"></i>
                    <i class="conIcon next-button"></i>
                </div>
            </div>
            <a class="more" href="${pageContext.request.contextPath}/news/growthRecord">查看更多</a>
        </div>


<jsp:include page="footer.jsp"></jsp:include>

        <script type="text/javascript">
        function showVideo(url) {
            $("#gameVideo").attr("src",url);
            $(".view").fadeIn();
            var gameVideo = document.getElementById("gameVideo");
            gameVideo.play();
            $(".view-bg").click(function() {
                $(".view").fadeOut();
                gameVideo.pause();
            });
        };
            function turnPage() {
                $('.magazine').turn({
                    width: 1000,
                    height: 640,
                    duration: 1000,
                    gradients: true,
                    autoCenter: true,
                    elevation: 50,
                    when: {
                        turning: function(event, page, view) {
                            disableControls(page);
                        },

                        turned: function(event, page, view) {
                            disableControls(page);
                        }
                    }
                });
                $('.magazine').turn('next');
                $(".previous-button").click(function() {
                    $('.magazine').turn('previous');
                });
                $(".next-button").click(function() {
                    $('.magazine').turn('next');
                });

            }
            yepnope({
                test: Modernizr.csstransforms,
                yep: ['${pageContext.request.contextPath}/website/js/lib/turn.js'],
                complete: turnPage
            });

            function disableControls(page) {
                if(page == 2 || page == 3) $('.previous-button').hide();
                else $('.previous-button').show();
                if(page == $('.magazine').turn('pages') - 1) $('.next-button').addClass("disabled");
                else $('.next-button').removeClass("disabled");
            }
            
            if($(".magazine>div").length%2==0){
		 		$(".magazine").append('<div style="background:url(${pageContext.request.contextPath}/website/images/xw_startour_image_bg_right.png) center top no-repeat;background-size:100%"></div>');
		 	}
        </script>
    </body>
 <div class="view">
            <div class="view-bg"></div>
            <div class="view-wrapper">
                <video id="gameVideo" width="900" controls="controls" src="" type="video/mp4">
                    当前浏览器不支持 video直接播放
                </video>
            </div>
        </div>
</html>