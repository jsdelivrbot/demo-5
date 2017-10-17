package ekuter.mvc.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.constants.CurrentUser;
import ekuter.mvc.util.LoadExceProperties;
import mybatisPro.mybatisEntity.UserEntity;

/**
 * <p>登录认证成功跳转系统首页
 * @author si.yu
 * @date 2017/6/21
 * @version 1.0
 * */
@Controller
@RequestMapping("index")
public class IndexController {

	//默认的异常配置文件路径
	public static final String EXCEPTION_CONF = "exception-conf.properties";
	//系统首页
	@RequestMapping()
	public String index(@CurrentUser UserEntity loginUser,Model model){
		
		//初始化异常信息配置
		readExceMessage();
		
		//将用户信息存入session中
		Subject subject = SecurityUtils.getSubject();
	    Session session = subject.getSession();
	    session.setAttribute(Constants.USER_INFO, loginUser);
	    return "redirect:proIndex.html";	
	}
	
	/**
	 * 读取异常配置文件
	 * @param key
	 * @return
	 * */
  public static void readExceMessage(){
  	String conf_path = EXCEPTION_CONF;
  	LoadExceProperties.loadExceptionFile(conf_path);
  }
}
