package ekuter.mvc.util;

import java.util.List;

import mybatisPro.mybatisEntity.StationParamEntity;

public class ParamListUtil {

	private Long area_id;//区域ID
	private Integer analysis_type;//算法类型
	private List<StationParamEntity> paramList;//系数
	
	
	@Override
	public String toString(){
		return "ParamListUtil[area_id="+area_id+",analysis_type="+analysis_type+",paramList="+paramList+"]";
	}


	public Long getArea_id() {
		return area_id;
	}


	public void setArea_id(Long area_id) {
		this.area_id = area_id;
	}


	public Integer getAnalysis_type() {
		return analysis_type;
	}


	public void setAnalysis_type(Integer analysis_type) {
		this.analysis_type = analysis_type;
	}


	public List<StationParamEntity> getParamList() {
		return paramList;
	}


	public void setParamList(List<StationParamEntity> paramList) {
		this.paramList = paramList;
	}
	

	
	
}
