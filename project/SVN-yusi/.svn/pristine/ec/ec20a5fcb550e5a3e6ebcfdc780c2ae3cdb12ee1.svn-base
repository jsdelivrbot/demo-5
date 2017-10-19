package mybatisPro.mybatisService.impl;

import java.util.List;
import java.util.Map;
import mybatisPro.mybatisEntity.ReservoirWaterLevelEntity;
import mybatisPro.mybatisEntity.RiverWaterLevelEntity;

/**
 * 水位数据查询业务层接口
 * @author si.yu
 * @date 2017/08/08
 * @version 1.0
 * */
public interface WaterLevelService {

	/**
	 * 根据时间段查询水位测站数据
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 * */
	public Map<String, Object> getWaterLevelInfo(String begin_time,String end_time,Long sta_id);
	
	/**
	 *根据时间段查询河道水位测站数据 
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 **/
	public Map<String, Object> getSoilWaterLevelInfo(String begin_time,String end_time,Long sta_id);
	
	/**
	 * 查询时间段内水库水位数据列表
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 * @return
	 * */
	public List<ReservoirWaterLevelEntity> getResWaterLevelInfoList(String begin_time,String end_time,Long sta_id);
	
	/**
	 * 查询时间段内河道水位数据列表
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 * @return
	 * */
	public List<RiverWaterLevelEntity> getRiverWaterLevelInfoList(String begin_time,String end_time,Long sta_id );
	
	/**
	 * 根据水库水位数据查询对应库容数据
	 * @param waterLevel
	 * @return
	 * */
	public Float getStorageCapacityByWaterLevel(Float waterLevel);
}
