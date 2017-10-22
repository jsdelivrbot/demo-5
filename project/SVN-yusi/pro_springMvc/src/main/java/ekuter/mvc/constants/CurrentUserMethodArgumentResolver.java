package ekuter.mvc.constants;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
/**
 * <p>用于绑定@FormModel的方法参数解析器
 * <p>增加方法注入，将含有 @CurrentUser 注解的方法参数注入当前登录用户
 * @author EKuter-si.yu
 * @date 2016/8/30
 * @version 1.0
 */
public class CurrentUserMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		
		if (parameter.hasParameterAnnotation(CurrentUser.class)) {
      return true;
		}
		return false;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
	    NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		
		CurrentUser currentUserAnnotation = parameter.getParameterAnnotation(CurrentUser.class);
    return webRequest.getAttribute(currentUserAnnotation.value(), NativeWebRequest.SCOPE_REQUEST);
	}

}
