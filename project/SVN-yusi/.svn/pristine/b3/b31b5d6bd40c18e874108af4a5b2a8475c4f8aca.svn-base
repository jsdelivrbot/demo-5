package ekuter.mvc.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.util.ResultMessageUtil;
import mybatisPro.mybatisEntity.UserEntity;
import mybatisPro.mybatisService.impl.UserSer;

/**
 * 登录操作
 * @author si.yu
 * @date 2017/6/20
 * @version 1.0
 * */
@RestController
@RequestMapping("loginController")
public class LoginController {
	
	@Autowired
	private UserSer userService;
	/**
	 * 登录验证
	 * @param request
	 * @param account 用户名
	 * @param password 密码
	 * @param rememberMe 自动登录标识
	 * @param captcha 验证码
	 * @return
	 * */
	@RequestMapping(value = "login",method = RequestMethod.POST)
	public ResultMessageUtil login(String account ,
			 String password ,boolean rememberMe ,Model model,HttpServletRequest request) {
		
		UsernamePasswordToken token = null;
		ResultMessageUtil resultMsg = new ResultMessageUtil();
//		String expected = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
		
		try{
			if("".equals(account)){
				
				resultMsg.setMsg("请输入用户名！");
				return resultMsg;
			}
			if("".equals(password)){
				
				resultMsg.setMsg("请输入密码！");
				return resultMsg;
			}
			if(account.length() > 10){
				
				resultMsg.setMsg("用户名输入错误！");
				return resultMsg;
			}
			if(password.length() > 20){
				
				resultMsg.setMsg("密码输入错误！");
				return resultMsg;
			}
			Subject subject = SecurityUtils.getSubject();
			//判断用户当前是否是记录登录信息未过期状态或者是当前未退出状态
		  	if(subject.isRemembered() || subject.isAuthenticated()){
		  		//从rememberMeCookie中获取用户名信息
		  		Object username = subject.getPrincipal();
		  		
		  		//根据当前用户名查询用户信息放入session，方便其他页面使用
				UserEntity userInfo = userService.getUserInfoByUsername(username.toString());
				
				if (null != userInfo){
					
					Session session = subject.getSession();
					session.setAttribute(Constants.USER_INFO, userInfo);
				}else{
					throw new UnknownAccountException();
				}
				resultMsg.setStatus(0);
				return resultMsg;
		  	}else{
		  		account = new String(account.getBytes("UTF8"),"ISO-8859-1");
		  		token = new UsernamePasswordToken(account,password);

					token.setRememberMe(rememberMe);
					subject.login(token);
					
					if(subject.isAuthenticated()){
						resultMsg.setMsg("LoginSuccess");
						resultMsg.setStatus(0);
						return resultMsg;
			  		}else{
						token.clear();
						resultMsg.setStatus(1);
						resultMsg.setMsg("用户名或密码不正确！");
						return resultMsg;
					}
		  	}
		}catch(UnknownAccountException uae){
			token.clear();
			resultMsg.setStatus(2);
			resultMsg.setMsg("账户不存在！");
			return resultMsg;
		}catch (IncorrectCredentialsException ice){
			token.clear();
			resultMsg.setStatus(3);
			resultMsg.setMsg("密码错误");
			return resultMsg;
			
		}catch (LockedAccountException e) {
			token.clear();
			resultMsg.setStatus(4);
			resultMsg.setMsg("您的账号已被锁定，请与管理员联系！");
			return resultMsg;
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
			token.clear();
			resultMsg.setStatus(5);
			resultMsg.setMsg("异常登录，请联系管理员！");
			return resultMsg;
		}
	}
}
