package ekuter.mvc.constants;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * <p>绑定当前登录的用户</p>
 * <p>不同于@ModelAttribute</p>
 * <p>在Controller的方法参数中使用此注解，该方法在映射时会注入当前登录的User对象<p>
 *
 *@author EKuter-si.yu
 *@date 2016/8/15
 *@version 1.0
 */
@Target({ElementType.PARAMETER})// 只能用在方法的参数上
@Retention(RetentionPolicy.RUNTIME)// 运行时有效
@Documented
public @interface CurrentUser {

	/**
   * 当前用户在request中的名字
   *
   * @return
   */
  String value() default Constants.CURRENT_USER;
}
