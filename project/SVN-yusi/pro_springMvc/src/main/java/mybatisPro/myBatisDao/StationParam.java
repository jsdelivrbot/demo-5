package mybatisPro.myBatisDao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mybatisPro.mybatisEntity.StationParamEntity;

/**
 * 平均降雨量测站系数数据层接口
 * @author si.yu
 * @date 2017/07/26
 * @version 1.0
 * */
public interface StationParam {

	/**
	 * 根据测站ID查询该站的系数
	 * @param sta_id
	 * @return
	 * */
	public Float getStationParamByStaId(@Param("staId")Long sta_id);
	
	/**
	 * 根据区域ID查询参数列表
	 * @param area_id
	 * @return
	 * */
	public List<StationParamEntity> findParamByAreaId(@Param("areaId")Long area_id);
	
	/**
	 * 根据区域ID删除参数数据
	 * @param area_id
	 * @return
	 * */
	public int deleteParamByAreaId(@Param("areaId")Long area_id);
	
	/**
	 * 添加区域测站参数数据
	 * @param paramList
	 * @return
	 * */
	public int addParam(@Param("paramList")List<StationParamEntity> paramList);
	
	/**
	 * 修改区域系数算法系数值
	 * @param paramList
	 * @return
	 * */
	public int updateParam(@Param("paramList")List<StationParamEntity> paramList);
}
