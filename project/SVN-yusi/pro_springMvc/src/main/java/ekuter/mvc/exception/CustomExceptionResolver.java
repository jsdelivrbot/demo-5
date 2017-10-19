package ekuter.mvc.exception;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
/**
 * 平台异常信息跳转、解析 
 * @author EKuter-si.yu
 * @date 2017/6/19
 * @version 1.0
 * */
public class CustomExceptionResolver implements HandlerExceptionResolver{

	private Logger logger = LoggerFactory.getLogger(CustomExceptionResolver.class);
	
	/**
	 * 异常处理方法
	 * @param request
	 * @param response
	 * @param handler
	 * @param ex
	 * @return
	 * */
	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {		
		response.setCharacterEncoding("UTF-8");
		// 获取堆栈信息
		StackTraceElement[] arr = ex.getStackTrace();
	    StackTraceElement a = arr[0];
	    
	    //错误详细信息
	  	ErrorsEntity errors = new ErrorsEntity();
	  	if(ex instanceof BusinessException){
			try {
				String codes = ((BusinessException) ex).getCode();
				if (null != codes || 0 != codes.length()) {
					int code = Integer.parseInt(((BusinessException) ex).getCode());
					errors.setCode(code);
				}
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		errors.setPointer(null);
		String titile = ex.getMessage();
//		try { 
//			titile = new String(titile.getBytes("utf-8"),"gbk");
//		} catch (UnsupportedEncodingException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
		errors.setTitle(titile);
		errors.setDetail(null);
		//异常信息
		ExceptionEntity entity = new ExceptionEntity();
		entity.setCode(Status.INTERNAL_SERVER_ERROR.getStatusCode());
		entity.setVersion("v1");
		entity.setMsg(a.toString());
		entity.setErrors(errors);
		
		String message ="";
		ObjectMapper mapper = new ObjectMapper();
		try {
			message=mapper.writeValueAsString(entity);
			//System.out.println(":::::======>"+message);
			response.getWriter().write(message);
		} catch (Exception e) {
			logger.error(e.getMessage()); 
		}
		if(!(ex instanceof BusinessException)){
			logger.debug(getTrace(ex));  
		}
		Map<String,String> map=new HashMap<String,String>();
		map.put("exception", message);
		ModelAndView mv=new ModelAndView("exception/error-business",map,HttpStatus.INTERNAL_SERVER_ERROR);
		//System.out.println(">>>>"+message);
		//mv.addObject("exception", message);
		return mv;
	}
	
	public static String getTrace(Throwable t) {  
    StringWriter stringWriter= new StringWriter();  
    PrintWriter writer= new PrintWriter(stringWriter);  
    t.printStackTrace(writer);  
    StringBuffer buffer= stringWriter.getBuffer();  
    return buffer.toString();  
	}
}


