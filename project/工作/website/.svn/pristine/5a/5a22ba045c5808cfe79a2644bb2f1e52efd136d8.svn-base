<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div class="category game">
    <div class="title">WONDERFUL GAME</div>
    <div class="sTitle">精彩赛况</div>
    <div class="videotitle"></div>
    <div class="videoFocus focus">
        <div class="videoLB focusLB">
        <#list videoList as video>
            <a name="${video.videoUrl }" title="${video.name }"><img src="${video.picUrl }?x-oss-process=image/resize,m_fill,w_1000,h_540,limit_0/auto-orient,0/sharpen,156/quality,q_100"></a>
        </#list>
        </div>
    </div>
    <a href="${basePath}/video/videos" class="more">查看更多</a>
</div>