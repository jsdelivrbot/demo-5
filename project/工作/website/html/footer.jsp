<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

        <div class="company">
            <ul class="clear">
                <li>
                    <h2>主办单位：</h2>
                    <p>中央电视台中央新影集团</p>
                </li>
                <li>
                    <h2>承办单位：</h2>
                    <p>北京星路风采国际教育咨询有限公司</p>
                </li>
                <li>
                    <h2>支持单位：</h2>
                    <p>中学生频道、乐视儿童、乐视教育</p>
                    <p>有道词典、中国人民大学出版社</p>
                </li>
            </ul>
        </div>
        <div class="contact-us">
            <div class="w1000 clear">
                <div class="fl">
                    <ul>
                        <li>
                            <i class="conIcon conIcon-01 fl"></i>
                            <h2>全国组委会总部：</h2>
                            <p>北京星路风采国际教育咨询有限公司</p>
                        </li>
                        <li>
                            <i class="conIcon conIcon-02 fl"></i>
                            <h2>联系电话：</h2>
                            <p>4009665550</p>
                        </li>
                        <li>
                            <i class="conIcon conIcon-03 fl"></i>
                            <h2>详细地址：</h2>
                            <p>北京市朝阳区朝阳门外大街乙12号昆泰国际大厦1702室</p>
                        </li>
                        <div class="qr-code">
                            <div class="code" style="margin-right: 10px;">
                                <img src="${pageContext.request.contextPath}/website/images/xw_footer_image_code_public.png" />
                                <h3>公众号二维码</h3>
                            </div>
                            <div class="code">
                                <img src="${pageContext.request.contextPath}/website/images/xw_footer_image_code_app.png" />
                                <h3>APP下载</h3>
                            </div>
                        </div>
                    </ul>
                </div>
                <div class="location fr"><img src="${pageContext.request.contextPath}/website/images/xw_footer_image_map.png" /></div>
            </div>
        </div>
        <jsp:include page="copyright.jsp"></jsp:include>