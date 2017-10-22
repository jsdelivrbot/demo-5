package mybatisPro.myBatisDao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.RpPptnEntity;

/**
 * 雨量历史数据（补漏）
 * 
 * @author feng.gao
 * @date 2017年9月8日
 * @version 1.0
 */
public interface DataHistoryMapper {

	/**
	 * 获取测站最大采集时间
	 * 
	 * @param sta_id
	 * @return
	 */
	public String getMaxTime(@Param("sta_id") Long sta_id);

	/**
	 * 校验是否有增补数据
	 * 
	 * @param sta_id
	 * @param collect_time
	 * @return
	 */
	public List<String> checkAddition(@Param("sta_id") Long sta_id, @Param("collect_time") String collect_time);

	/**
	 * 获取所有增补数据
	 * 
	 * @param sta_id
	 * @param collect_time
	 * @return
	 */
	public List<Long> getAddition(@Param("sta_id") Long sta_id, @Param("max_time") String max_time);

	/**
	 * 获取增补数据时间段内所有数据
	 * 
	 * @param hour
	 * @param day_time
	 * @param sta_id
	 * @return
	 */
	public List<RpPptnEntity> getAdditionData(@Param("collecttime") String collecttime, @Param("sta_id") Long sta_id);

	/**
	 * 获取
	 * 
	 * @param day_time
	 * @param sta_id
	 * @return
	 */
	public RpPptnEntity getLastDataInfo(@Param("day_time") String day_time, @Param("sta_id") Long sta_id);

}
