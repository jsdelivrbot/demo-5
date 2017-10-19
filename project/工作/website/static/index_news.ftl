<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div class="category">
            <div class="title">NEWS INFORMATION</div>
            <div class="sTitle">新闻资讯</div>
            <ul class="news">
            <#list newsList as contactus>
                <li> 
                    <a href="${basePath}/news/newsDetail?id=${contactus.id}">
                        <div class="num <#if contactus_index == 1>newsBg</#if>">${contactus_index+1}</div>
                        <div class="blackLine<#if contactus_index == 1>2</#if>" ></div>
                        <div class="infoTitle">${contactus.title } </div>
                    </a>
                    <div class="date">${contactus.gmtCreate?string("yyyy-MM-dd HH:mm:ss")}</div>
                </li>
        </#list>
                
            </ul>
            <a href="${basePath}/news/indexlist" class="more">查看更多</a>
        </div>