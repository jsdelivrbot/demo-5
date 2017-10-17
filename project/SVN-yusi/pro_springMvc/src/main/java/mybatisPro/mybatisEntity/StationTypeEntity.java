package mybatisPro.mybatisEntity;

import java.io.Serializable;

/**
 * 测站类型实体类
 * @author si.yu
 * @date 2017/7/24
 * @version 1.0
 * */
public class StationTypeEntity implements Serializable{

	private static final long serialVersionUID = 1L;

	private Long sta_type_id;//测站类型ID
	private String station_type;//测站类型代码
	private String type_name;//测站类型名称
	
	@Override
	public String toString(){
		return "StationTypeEntity[sta_type_id="+sta_type_id+",station_type="+station_type+",type_name="+type_name+"]";
	}
	
	public Long getSta_type_id() {
		return sta_type_id;
	}
	public void setSta_type_id(Long sta_type_id) {
		this.sta_type_id = sta_type_id;
	}
	public String getStation_type() {
		return station_type;
	}
	public void setStation_type(String station_type) {
		this.station_type = station_type;
	}
	public String getType_name() {
		return type_name;
	}
	public void setType_name(String type_name) {
		this.type_name = type_name;
	}
	
	
}
