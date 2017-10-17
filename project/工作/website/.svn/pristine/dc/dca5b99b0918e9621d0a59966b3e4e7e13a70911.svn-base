<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>成长记录详情</title>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/website/css/base.css"/>
    </head>
    <body class="bg-pale">
               <jsp:include page="/website/html/header1100.jsp" >
            <jsp:param name="activeMenu" value="tour" />
        </jsp:include>
        <ol class="breadcrumb w1100 mt120 clear">
            <span class="fl">当前位置：</span>
            <li><a href="starTour.html">星游学</a><i class="crumbIcon"></i></li>
            <li><a href="growthRecord.html">成长记录</a><i class="crumbIcon"></i></li>
            <li>成长记录详情</li>
        </ol>
 <!--        <div class="news-details w1100 clear">
            <img class="bg fr" src="../images/xw_home_match_image_star.png"/>
            <h2>在你最美的年华，一定要去趟温哥华！<span class="news-details-datetime">2017-01-18</span></h2>
            <div class="news-details-box">
                <p>“希望之星”星游学7人团于2017年1月22日安全抵达加拿大温哥华，他们在有“世界最宜居城市”著称的加拿大西海岸名城进行留学生活深度体验，领略自然人文风光，入住寄宿家庭，体验国际顶尖学府！</p>
                <img src="../images/video.png"/>
                <p>加西游学之旅寄宿家庭互动式体验，深入了解当地文化，并且让学生们在语言运用上得到迅速提升</p>
                <p>Pomona Catholic School——秉承终身学习的传统和信仰这所百年老校依旧传递着慷慨与信念，结合21世纪的先进教育理念，致力向社会输送能力与素质兼备的学生。作为大学录取率超过95%的高中，校方确保每一位学生在求学中收获最有效的学习信息，为学生的未来打下基础。希望每一位学生能成为自信独立，勇于迎接挑战的服务型社会精英。</p>
                <img src="../images/xw_match_bg_1.png"/>
                <p>穿越美国西海岸，仿佛穿越一个时空</p>
                <p>还有世界上最好的科技馆之一的旧金山探索博物馆、新奇感官刺激的好莱坞环球影城、引领世界科技潮流的芯片帝国——硅谷、世界名桥——金门大桥、仿古罗马废墟的建美国旧金山艺术宫、世界最弯曲的街道——九曲花街、在渔人码头振奋我们的精神……</p>
                <p class="align-center">精彩后续请持续关注星游学！</p>
            </div>
        </div> -->
                        <div class="news-details w1100 clear">
            <img class="bg fr" src="${pageContext.request.contextPath}/website/images/xw_home_match_image_star.png"/>
            <h2>${item.title }<span class="news-details-datetime"><fmt:formatDate value="${item.gmtCreate }" type="both" pattern="yyyy-MM-dd HH:mm:ss"/></span></h2>
            <div class="news-details-box">
              ${item.content }
            </div>
        </div> 
        <jsp:include page="copyright_common.jsp"></jsp:include>
    </body>
</html>
