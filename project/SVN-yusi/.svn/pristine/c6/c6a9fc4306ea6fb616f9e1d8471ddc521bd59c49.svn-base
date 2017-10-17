package mybatisPro.myBatisDao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.WzRiverRsvrEntity;

/**
 * 水位数据管理
 * 
 * @author feng.gao
 * @date 2017年8月25日
 * @version 1.0
 */
public interface WzRiverRsvrMapper {

	/**
	 * 水库水位数据导入
	 * 
	 * @param data_info
	 * @return
	 */
	public int impRsvDataInfo(@Param("data_info") List<WzRiverRsvrEntity> data_info);

	/**
	 * 河道水位数据导入
	 * 
	 * @param data_info
	 * @return
	 */
	public int impRiverDataInfo(@Param("data_info") List<WzRiverRsvrEntity> data_info);

}
