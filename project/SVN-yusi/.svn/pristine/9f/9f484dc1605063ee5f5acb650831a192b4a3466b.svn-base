package ekuter.mvc.exception;

import java.io.Serializable;

/**
 * 错误详细信息实体类
 */

public class ErrorsEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer code; //错误请求状态码
	private String pointer; //请求路径
	private String title; //错误标题
	private String detail; //错误信息

	@Override
	public String toString() {
		return "code=" + code + " pointer=" + pointer + " title=" + title 
				+ " detail=" + detail;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getPointer() {
		return pointer;
	}

	public void setPointer(String pointer) {
		this.pointer = pointer;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

}
