package ekuter.mvc.controller;


import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Response.Status;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.fasterxml.jackson.databind.ObjectMapper;
import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.ErrorsEntity;
import ekuter.mvc.exception.ExceptionEntity;
import mybatisPro.mybatisEntity.UserEntity;
import mybatisPro.mybatisService.impl.UserSer;

/**
 * 页面加载时需要调用该方法判断用户登录状态
 * 如果是登录状态则直接访问
 * 否则由该方法跳转到登陆页面
 * @author EKuter-si.yu
 * @date 2017/6/24
 * @version 1.0
 * */
@Controller
public class SignInStatusCheck {
	
	private Logger logger = LoggerFactory.getLogger(SignInStatusCheck.class);
	
	@Autowired
	private UserSer userService;

 /**
   * 页面加载时需要调用该方法判断用户登录状态
   * 如果是登录状态则直接访问
   * 否则由该方法跳转到登陆页面
   * @return
   */
  @RequestMapping(value = "/signIn", method = RequestMethod.GET)
  public String login(Model model,HttpServletRequest request){
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
		
		return "index";
  	}else{
  		
  		String ajaxRequest = request.getHeader("X-Requested-With");
  		
  		if(null != ajaxRequest){
  			//logger.info("////////////"+ajaxRequest);
  			//request.setAttribute("error302","登录信息已失效，请返回登录页面重新登录！");
  			//错误详细信息
  			
  			ErrorsEntity errors = new ErrorsEntity();
			errors.setCode(302);
			errors.setPointer(null);
			errors.setTitle("unlogin");
			errors.setDetail("登录信息失效");
			
			//异常信息
			ExceptionEntity entity = new ExceptionEntity();
			entity.setCode(Status.REQUEST_TIMEOUT.getStatusCode());
			entity.setVersion("v1");
			entity.setMsg("login.html");
			entity.setErrors(errors);
			
			String message ="";
			ObjectMapper mapper = new ObjectMapper();
			try {
				message=mapper.writeValueAsString(entity);
			} catch (Exception e) {
				logger.error(e.getMessage()); 
			}
			
			model.addAttribute("unlogin_json_exp",message.toString());
			return "unlogin";
  		}else{
  			return "redirect:login.html"; 
  		}
  	}
  }
  
//  /**
//   * 设置response的时候返回的消息头信息 
//   * @param response
//   * @attention 只需要传递竟来一个response就可以了
//   */
//  protected void setResponeInfo(HttpServletResponse response) {
//
//     //下面的表示以普通文本的方式解析
//
//     response.setContentType("text/plain;charset=UTF-8");
//
//     response.reset();
//
//     response.setHeader("error302", "false");
//  }
	
}







