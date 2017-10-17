package mybatisPro.myBatisDao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.RpPptnEntity;

/**
 * 实时数据管理
 * 
 * @author feng.gao
 * @date 2017年8月23日
 * @version 1.0
 */
public interface RpPptnMapper {

	/**
	 * 插入实时数据
	 * 
	 * @param data_info
	 * @return
	 */
	public int insertDataInfo(@Param("data_info") List<RpPptnEntity> data_info);

	/**
	 * 查询最大collecttime
	 * 
	 * @param sta_id
	 * @return
	 */
	public Long getMaxCollectTime(@Param("sta_id") Long sta_id);

}
