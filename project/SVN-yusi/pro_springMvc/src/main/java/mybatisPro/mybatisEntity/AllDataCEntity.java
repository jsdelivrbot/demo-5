package mybatisPro.mybatisEntity;

import java.util.Date;

/**
 * 整编数据实体信息
 * 
 * @author feng.gao
 * @date 2017年8月21日
 * @version 1.0
 */
public class AllDataCEntity {

	private Integer id;
	private String paraid;
	private Float paravalue;
	private Float change;
	private Date collecttime;
	private Date systemtime;
	private Integer channelnum;
	private Integer flag;

	@Override
	public String toString() {
		return "AllDataCEntity [id=" + id + ", paraid=" + paraid + ", paravalue=" + paravalue + ", change=" + change
				+ ", collecttime=" + collecttime + ", systemtime=" + systemtime + ", channelnum=" + channelnum
				+ ", flag=" + flag + "]";
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getParaid() {
		return paraid;
	}

	public void setParaid(String paraid) {
		this.paraid = paraid;
	}

	public Float getParavalue() {
		return paravalue;
	}

	public void setParavalue(Float paravalue) {
		this.paravalue = paravalue;
	}

	public Float getChange() {
		return change;
	}

	public void setChange(Float change) {
		this.change = change;
	}

	public Date getCollecttime() {
		return collecttime;
	}

	public void setCollecttime(Date collecttime) {
		this.collecttime = collecttime;
	}

	public Date getSystemtime() {
		return systemtime;
	}

	public void setSystemtime(Date systemtime) {
		this.systemtime = systemtime;
	}

	public Integer getChannelnum() {
		return channelnum;
	}

	public void setChannelnum(Integer channelnum) {
		this.channelnum = channelnum;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

}
