package mybatisPro.mybatisEntity;

import java.util.Date;

/**
 * 水位实体信息
 * 
 * @author feng.gao
 * @date 2017年8月25日
 * @version 1.0
 */
public class WzRiverRsvrEntity {

	private Long id;
	private Long sta_id;
	private Date time;
	private Float waterLevel;

	private Float rateOfFlow;

	private Float storageCapacity;
	private Date createtime = new Date();

	// 实时数据ID
	private Long data_id;

	@Override
	public String toString() {
		return "WzRsvrEntity [id=" + id + ", sta_id=" + sta_id + ", time=" + time + ", waterLevel=" + waterLevel
				+ ", storageCapacity=" + storageCapacity + ", createtime=" + createtime + ", data_id=" + data_id + "]";
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

	public Float getWaterLevel() {
		return waterLevel;
	}

	public void setWaterLevel(Float waterLevel) {
		this.waterLevel = waterLevel;
	}

	public Float getStorageCapacity() {
		return storageCapacity;
	}

	public void setStorageCapacity(Float storageCapacity) {
		this.storageCapacity = storageCapacity;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Long getData_id() {
		return data_id;
	}

	public void setData_id(Long data_id) {
		this.data_id = data_id;
	}

}
