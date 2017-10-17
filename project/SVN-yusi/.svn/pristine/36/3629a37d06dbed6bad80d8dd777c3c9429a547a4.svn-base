package mybatisPro.myBatisDao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.StationStatusEntity;

/**
 * 测站状态数据管理
 * 
 * @author feng.gao
 * @date 2017年8月18日
 * @version 1.0
 */
public interface StationStatusMapper {

	/**
	 * 测站状态数据整编
	 */
	public void dateStatistics(@Param("now_time") String now_time);

	/**
	 * 测站状态查询（mouth）
	 * 
	 * @param begin_time
	 * @param end_time
	 * @return
	 */
	public List<StationStatusEntity> getStationStatusList(@Param("staId") Long sta_id,
			@Param("beginTime") String begin_time,@Param("endTime") String end_time);

	/**
	 * 校验测站状态信息
	 * 
	 * @param now_time
	 * @return
	 */
	public int checkStatusInfo(@Param("now_time") String now_time);

	/**
	 * 删除测站状态信息
	 * 
	 * @param now_time
	 * @return
	 */
	public int deleteStatusInfo(@Param("now_time") String now_time);

}
