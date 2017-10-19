package mybatisPro.mybatisService.impl;

import java.util.List;
import java.util.Map;
import mybatisPro.mybatisEntity.ParamCodeEntity;
import mybatisPro.mybatisEntity.StationEntity;

/**
 * 测站信息业务层接口
 * @author si.yu
 * @date 2017/7/14
 * @version 1.0
 * */
public interface StationService {

	/**
	 * 创建测站信息
	 * @param stationEntity
	 * @return
	 * */
	public boolean createStation(StationEntity stationEntity,List<ParamCodeEntity> codeEntities);
	
	/**
	 * 查询测站列表
	 * @param station_type(区分人工站和自动站)
	 * @return
	 * */
	public List<Map<String, Object>> getStationList(Integer station_type);
	
	/**
	 * 根据测站ID查询测站详细信息
	 * @param stationId
	 * @return
	 * */
	public Map<String, Object> getStationInfoById(Long stationId);
	
	/**
	 * 修改测站信息
	 * @param stationEntity
	 * @return boolean
	 * */
	public boolean updateStationInfo(StationEntity stationEntity);
	
	/**
	 * 根据测站名称查询测站信息
	 * @param sta_name
	 * @return stationEntity
	 * */
	public boolean findStationInfoByStaName(String sta_name);
	
	/**
	 * 查询所有雨量测站的列表信息
	 * @param begin_time
	 * @param end_time
	 * @param type_id
	 * @param sta_id
	 * @return
	 * */
	public Map<String, Object> getRainfallStationList(String begin_time
			,String end_time,Long sta_id);
	
	/**
	 * 根据测站类型查询测站ID
	 * @param type_id
	 * @return
	 * */
	public List<Long> getStationIdByTypeId(Long type_id);
	
	/**
	 * 区分人工站和自动站查询测站IDs
	 * @param sta_type
	 * @return
	 * */
	public List<Long> getTypeOfStationIds(Integer sta_type);
	
	/**
	 * 根据测站类型查询测站部分信息
	 * @param type_id
	 * @return
	 * */
	public List<Map<String, Object>> getStationInfoByTypeId(Long type_id);
	
	/**
	 * 插入参数编码数据
	 * @param paramCodeEntity
	 * @return
	 * */
	public boolean insertParamCode(ParamCodeEntity codeEntity);
	
	/**
	 * 根据测站唯一编码查询测站信息
	 * @param sys_code
	 * @return
	 * */
	public StationEntity findStationInfoBySysCode(String sys_code);
	
	/**
	 * 根据测站ID查询参数编码列表数据
	 * @param sta_id
	 * @return
	 * */
	public List<ParamCodeEntity> getParamCodeListByStaId(Long sta_id);
	
	/**
	 * 自动站删除
	 * @param sta_id
	 * @param sta_type 测站类型
	 * @param area_id 区域ID
	 * @return
	 * */
	public boolean deleteAutoStation(Long sta_id,Long sta_type,Long area_id);
	
	/**
	 * 人工站删除
	 * @param sta_id
	 * @param sta_type
	 * @return 
	 * */
	public boolean deleteManMadeStation(Long sta_id,Long sta_type);
}
