<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div class="company-history w1000">
	<h2>CCTV希望之星英语风采大赛<span>发展史</span></h2>
	<div class="company-history-box">
		<ul>
			<#list timelineList as timeline>
				<li>
					<span class="history-time">${timeline.date }</span>
					<div class="company-history-text">
						<h3>${timeline.title }</h3>
						<p>${timeline.text }</p>
					</div>
				</li>
			</#list>
	    </ul>
	</div>
</div>