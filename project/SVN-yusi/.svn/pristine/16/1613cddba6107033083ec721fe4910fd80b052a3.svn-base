package mybatisPro.mybatisEntity;

import java.io.Serializable;
import java.util.Date;

/**
 * 测站实体类
 * @author si.yu
 * @date 2017/7/14
 * @version 1.0
 * */
public class StationEntity implements Serializable{

	private static final long serialVersionUID = 1L;

	
	private Long id;//测站ID
	private String sys_code;//测站系统编码
	private String stcd;//国家标准码
	private String station_name;//测站名称
	private Float x;//地图横坐标
	private Float y;//地图纵坐标
	private Float latitude;//纬度
	private Float longitude;//经度
	private String station_location;//站址
	private Integer station_type;//区分测站（人工站/自动站）
	private Long station_type_id;//测站类型
	private Long area_id;//行程区划码
	private Integer time_off;//拍报字段（默认为1 （可选：1，2，4，6）每天报几条数据）
	private String contract;//联系人（人工站）
	private String telephone;//联系电话（人工站）
	private String comments;//备注
	private Date modify_time = new Date();
	
	
	
	@Override
	public String toString(){
		return "StationEntity[id="+id+",sys_code="+sys_code+",stcd="+stcd+",x="+x+",y="+y
				+",station_name="+station_name+",latitude="+latitude+",longitude="+longitude
				+",station_location="+station_location+",station_type="+station_type
				+",station_type_id="+station_type_id+",contract="+contract+",telephone="+telephone
				+",area_id="+area_id+",comments="+comments+",modify_time"+modify_time
				+"]";
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getSys_code() {
		return sys_code; 
	}
	public void setSys_code(String sys_code) {
		this.sys_code = sys_code;
	}
	
	public String getStcd() {
		return stcd;
	}
	public void setStcd(String stcd) {
		this.stcd = stcd;
	}
	
	public String getStation_name() {
		return station_name;
	}
	public void setStation_name(String station_name) {
		this.station_name = station_name;
	}
	
	public Float getX() {
		return x;
	}
	public void setX(Float x) {
		this.x = x;
	}

	public Float getY() {
		return y;
	}
	public void setY(Float y) {
		this.y = y;
	}

	public Float getLatitude() {
		return latitude;
	}
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}
	
	public Float getLongitude() {
		return longitude;
	}
	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	
	public String getStation_location() {
		return station_location;
	}
	public void setStation_location(String station_location) {
		this.station_location = station_location;
	}

	public Long getStation_type_id() {
		return station_type_id;
	}
	public void setStation_type_id(Long station_type_id) {
		this.station_type_id = station_type_id;
	}

	public Long getArea_id() {
		return area_id;
	}
	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}
	
	public Integer getTime_off() {
		return time_off;
	}

	public void setTime_off(Integer time_off) {
		this.time_off = time_off;
	}

	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	
	public Date getModify_time() {
		return modify_time;
	}
	public void setModify_time(Date modify_time) {
		this.modify_time = modify_time;
	}

	public Integer getStation_type() {
		return station_type;
	}

	public void setStation_type(Integer station_type) {
		this.station_type = station_type;
	}

	public String getContract() {
		return contract;
	}

	public void setContract(String contract) {
		this.contract = contract;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
}
