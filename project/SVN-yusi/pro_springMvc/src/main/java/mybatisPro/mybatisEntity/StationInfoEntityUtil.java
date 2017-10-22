package mybatisPro.mybatisEntity;

import java.io.Serializable;

/**
 * 测站雨量信息工具实体类
 * @author si.yu
 * @date 2017/07/25
 * @version 1.0
 * */
public class StationInfoEntityUtil implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;//测站ID
	private String station_name;//测站名称
	private Float rainfall;//降雨量
	
	@Override
	public String toString(){
		return "StationInfoEntityUtil[id="+id+",station_name="+station_name+",rainfall="+rainfall+"]";
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStation_name() {
		return station_name;
	}
	public void setStation_name(String station_name) {
		this.station_name = station_name;
	}
	public Float getRainfall() {
		return rainfall;
	}
	public void setRainfall(Float rainfall) {
		this.rainfall = rainfall;
	}
	
	
}
