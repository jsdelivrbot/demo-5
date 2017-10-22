package mybatisPro.mybatisEntity;

import java.util.Date;

/**
 * 实时信息实体
 * 
 * @author feng.gao
 * @date 2017年8月23日
 * @version 1.0
 */
public class RpPptnEntity {

	private Long id;
	private Long sta_id;
	private Date time;
	private Float time_rainfall;
	private String time_interval;
	private Date systemtime;
	private Date createtime = new Date();

	private Long data_id;
	private Float paravalue;
	private Date collecttime;

	@Override
	public String toString() {
		return "RpPptnEntity [id=" + id + ", sta_id=" + sta_id + ", time=" + time + ", time_rainfall=" + time_rainfall
				+ ", time_interval=" + time_interval + ", systemtime=" + systemtime + ", createtime=" + createtime
				+ ", data_id=" + data_id + ", paravalue=" + paravalue + ", collecttime=" + collecttime + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSta_id() {
		return sta_id;
	}

	public void setSta_id(Long sta_id) {
		this.sta_id = sta_id;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public Float getTime_rainfall() {
		return time_rainfall;
	}

	public void setTime_rainfall(Float time_rainfall) {
		this.time_rainfall = time_rainfall;
	}

	public String getTime_interval() {
		return time_interval;
	}

	public void setTime_interval(String time_interval) {
		this.time_interval = time_interval;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Date getSystemtime() {
		return systemtime;
	}

	public void setSystemtime(Date systemtime) {
		this.systemtime = systemtime;
	}

	public Long getData_id() {
		return data_id;
	}

	public void setData_id(Long data_id) {
		this.data_id = data_id;
	}

	public Float getParavalue() {
		return paravalue;
	}

	public void setParavalue(Float paravalue) {
		this.paravalue = paravalue;
	}

	public Date getCollecttime() {
		return collecttime;
	}

	public void setCollecttime(Date collecttime) {
		this.collecttime = collecttime;
	}

}
