<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
        <div class="category categoryBg">
            <div class="title">STUDY TOUR</div>
            <div class="sTitle">游学路线</div>
            <div class="mapCont">
                <div class="map"></div>
            </div>
            <div class="lrFocus">
                <div class="btnCont"><div class="btn LBtn" onselectstart='return false;'>&lt;</div></div>
                <div class="lrLBCont">
                    <div class="lrLB">
                    <#list tourList as tour>
                        <a href="${basePath}/tour/info/ow/detail?id=${tour.recommendId}">
                            <img src="${tour.picUrl }?x-oss-process=image/resize,m_fill,w_280,h_220,limit_0/auto-orient,0/sharpen,156/quality,q_100">
                            <div class="infoTitle">${tour.name }</div>    
                        </a>
        </#list>
                    </div>
                </div>
                <div class="btnCont"><div class="btn RBtn" onselectstart='return false;'>&gt;</div></div>
            </div>
            <a href="${basePath}/tour/info/ow/travelroute" class="more">查看更多</a>
        </div>