package mybatisPro.myBatisDao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.ParamCodeEntity;
import mybatisPro.mybatisEntity.StationEntity;

/**
 * 测站信息数据服务层接口
 * @author si.yu
 * @date 2017/7/14
 * @version 1.0
 * */
public interface StationMapper {

	/**
	 * 创建测站信息
	 * @param stationEntity
	 * @return
	 * */
	public int createStation(StationEntity stationEntity);
	
	/**
	 * 插入参数编码数据
	 * @param paramCodeEntity
	 * @return
	 * */
	public int insertParamCode(ParamCodeEntity codeEntity);
	
	/**
	 * 查询测站列表
	 * @param station_type(区分人工站和自动站)
	 * @return
	 * */
	public List<Map<String, Object>> getStationList(@Param("stationType")Integer station_type);
	
	/**
	 * 根据测站ID查询测站详细信息
	 * @param stationId
	 * @return
	 * */
	public Map<String, Object> getStationInfoById(Long stationId);
	
	/**
	 * 测站信息修改
	 * @param stationEntity
	 * @return
	 * */
	public int updateStationInfo(StationEntity stationEntity);
	
	/**
	 * 根据测站名称查询测站信息
	 * @param sta_name
	 * @return stationEntity
	 * */
	public StationEntity findStationInfoByStaName(@Param("staName")String sta_name);
	
	/**
	 * 查询所有雨量测站的列表信息
	 * @param begin_time
	 * @param end_time
	 * @param type_id
	 * @return
	 * */
	public Map<String, Object> getRainfallStationList(@Param("beginTime")String begin_time
			,@Param("endTime")String end_time,@Param("staId")Long sta_id);
	
	/**
	 * 区分人工站和自动站查询测站IDs
	 * @param sta_type
	 * @return
	 * */
	public List<Long> getTypeOfStationIds(@Param("staType")Integer sta_type);
	
	/**
	 * 根据测站类型查询测站ID
	 * @param type_id
	 * @return
	 * */
	public List<Long> getStationIdByTypeId(@Param("typeId")Long type_id);
	
	/**
	 * 根据测站类型查询测站部分信息
	 * @param type_id
	 * @return
	 * */
	public List<Map<String, Object>> getStationInfoByTypeId(@Param("typeId")Long type_id);
	
	/**
	 * 插入参数编码列表数据
	 * @codeEntities
	 * @return
	 * */
	public int insertParamCodeData(@Param("codeEntities")List<ParamCodeEntity> codeEntities);
	
	/**
	 * 根据测站唯一编码查询测站信息
	 * @param sys_code
	 * @return
	 * */
	public StationEntity findStationInfoBySysCode(@Param("sysCode")String sys_code);
	
	/**
	 * 根据测站ID查询参数编码列表数据
	 * @param sta_id
	 * @return
	 * */
	public List<ParamCodeEntity> getParamCodeListByStaId(@Param("staId")Long sta_id);
	
	/**
	 * 删除测站
	 * @param sta_id
	 * @return
	 * */
	public int deleteStation(@Param("staId")Long sta_id);
	
	/**
	 * 删除雨量数据(实时数据表)
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaRainfallData(@Param("staId")Long sta_id);
	
	/**
	 * 删除雨量数据(小时数据表)
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaRainfallDataH(@Param("staId")Long sta_id);
	
	/**
	 * 删除雨量数据(天数据表)
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaRainfallDataD(@Param("staId")Long sta_id);
	
	/**
	 * 删除雨量数据(月数据表)
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaRainfallDataM(@Param("staId")Long sta_id);
	
	/**
	 * 删除水库水位数据
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaResWaterlevelData(@Param("staId")Long sta_id);
	
	/**
	 * 删除河道水位数据
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaRiverWaterlevelData(@Param("staId")Long sta_id);
	
	/**
	 * 删除系数编码中该站数据
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaParamCodeData(@Param("staId")Long sta_id);
	
	/**
	 * 删除测站状态列表中该站数据
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaStatusData(@Param("staId")Long sta_id);
	
	/**
	 * 删除系数列表中该区域所有测站系数数据
	 * @param sta_id
	 * @return
	 * */
	public int deleteStaAvgParamData(@Param("areaId")Long area_id);
	
	//查询该站在雨量实时表有没有数据
	public int countRainfall(@Param("staId")Long sta_id);
	//查询该站在雨量小时表有没有数据
	public int countRainfallH(@Param("staId")Long sta_id);
	//查询该站在雨量天表有没有数据
	public int countRainfallD(@Param("staId")Long sta_id);
	//查询该站在雨量月表有没有数据
	public int countRainfallM(@Param("staId")Long sta_id);
	//查询该站在水库水位表有没有数据
	public int countResWaterLevel(@Param("staId")Long sta_id);
	//查询该站在河道水位表有没有数据
	public int countRiverWaterLevel(@Param("staId")Long sta_id);
	//查询该站在系数编码列表中有没有数据
	public int countParamCode(@Param("staId")Long sta_id);
	//查询该站在测站状态列表中有没有数据
	public int countStaStatus(@Param("staId")Long sta_id);
	//查询该区域下测站有没有系数数据
	public int countStaAvgParamData(@Param("areaId")Long area_id);
	
}
