<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div class="ad-box w1000">
	<ul>
		<#list contactusList as contactus>
			<li>
				<p>${contactus.name }</p>
				<p>${contactus.contactPhone }</p>
			</li>
		</#list>
	</ul>
</div>

<div class="division-contact">
	<div class="contact-choice w1000">
        <span>各省市赛区联系方式查询：</span>
        <select name="zoneSearchName" id="matchZoneId">
            <option value="">请选择赛区</option>
            <#list matchZoneList as matchZone>
				<option value="${matchZone.id }">${matchZone.zoneName }</option>
			</#list>
        </select>
        <input type="button" value="查询" id="btnSearch" onclick="reqMatchZoneList(1);" class="MyPointBt02">
    </div>
</div>