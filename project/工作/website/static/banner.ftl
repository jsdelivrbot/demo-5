<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div class="focus">
    <div class="focusLB">
    <#list carousePicList as pic>
    	<a href="${pic.href }">
    		<img src="${pic.picUrl }?x-oss-process=image/resize,m_fill,w_1887,h_855,limit_0/auto-orient,0/sharpen,156/quality,q_100" />
    	</a>
    </#list>
    </div>
</div>