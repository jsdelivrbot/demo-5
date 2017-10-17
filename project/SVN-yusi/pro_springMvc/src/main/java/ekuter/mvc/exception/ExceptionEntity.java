package ekuter.mvc.exception;

import java.io.Serializable;

/**
 * 异常信息处理实体类
 */

public class ExceptionEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String version; //版本号
	private ErrorsEntity errors; //错误详细信息
	private Integer code; //http状态码
	private String msg; //错误信息

	@Override
	public String toString() {
		return "version=" + version + "  errors=" + errors + " code=" 
				+ code + " msg=" + msg;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public ErrorsEntity getErrors() {
		return errors;
	}

	public void setErrors(ErrorsEntity errors) {
		this.errors = errors;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
