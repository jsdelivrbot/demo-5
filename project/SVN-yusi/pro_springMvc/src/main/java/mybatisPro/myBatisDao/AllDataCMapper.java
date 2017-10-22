package mybatisPro.myBatisDao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.AllDataCEntity;
import mybatisPro.mybatisEntity.RpPptnEntity;
import mybatisPro.mybatisEntity.WzRiverRsvrEntity;

public interface AllDataCMapper {

	/**
	 * 获取所有待整编数据
	 * 
	 * @return
	 */
	public List<AllDataCEntity> getAllDateInfo(@Param("max_id") String max_id);

	/**
	 * 获取最大ID值
	 * 
	 * @return
	 */
	public Long getMaxId();

	/**
	 * 数据导入
	 * 
	 * @param entity
	 * @return
	 */
	public int insertAllDateInfo(@Param("data_info") List<AllDataCEntity> entity);

	// public int insertAllDateInfos(AllDataCEntity entity);

	/**
	 * 获取去重后数据
	 * 
	 * @param max_id
	 * @return
	 */
	public List<Long> getDistinctId(@Param("max_id") String max_id);

	/**
	 * 重复数据处理状态（已处理）
	 * 
	 * @param max_id
	 * @param id_info
	 * @return
	 */
	public int updateUndistincInfo(@Param("id_info") List<Long> id_info);

	/**
	 * 更新处理状态
	 * 
	 * @param id_info
	 * @return
	 */
	public int updateUndistincInfos(@Param("max_id") String max_id);

	public int updateMaxFlag(@Param("id") Long id);

	public int updateMaxFlagFalse(@Param("id_info") List<Long> id_info);

	/**
	 * 获取水位信息
	 * 
	 * @param type
	 *            水库 河道
	 * @return
	 */
	public List<WzRiverRsvrEntity> getRsvDataInfo(@Param("type") Integer type);

	/**
	 * 获取雨量数据信息
	 * 
	 * @return
	 */
	public List<RpPptnEntity> getRainDataInfo(@Param("sta_id") Long sta_id, @Param("collecttime") String collecttime);

	/**
	 * 获取雨量站ID
	 * 
	 * @return
	 */
	public List<Long> getStaId();

	/**
	 * 获取水位实时数据ID
	 * 
	 * @return
	 */
	public List<Long> getRiverRsvrDataId(@Param("type") Integer type);

	/**
	 * 获取雨量实时数据ID
	 * 
	 * @param sta_id
	 * @param collecttime
	 * @return
	 */
	public List<Long> getRainDataId(@Param("sta_id") Long sta_id, @Param("collecttime") String collecttime);

	/**
	 * 获取各个雨量站最大collecttime
	 * 
	 * @param sta_id
	 * @return
	 */
	public Map<String, Object> getMaxRainCollectTime(@Param("sta_id") Long sta_id);

	public List<Long> getMaxCollectTimeId();

}
