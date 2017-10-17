package mybatisPro.mybatisEntity;

import java.io.Serializable;
import java.util.Date;

/**
 * 实时雨量数据实体类
 * @author si.yu
 * @date 2017/08/18
 * @version 1.0
 * */
public class RainfallEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long sta_id;//测站ID
	private Date time;//采集时间
	private Float time_rainfall;//雨量
	private String time_interval;//时段长
	private Date createtime = new Date();//创建时间
	
	
	@Override
	public String toString(){
		return "RainfallEntity[id="+id+",sta_id="+sta_id+",time="+time
				+",time_rainfall="+time_rainfall+",time_interval="+time_interval+",createtime="+createtime+"]";
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

}
