package mybatisPro.mybatisService.impl;
import java.util.List;
import mybatisPro.mybatisEntity.StationParamEntity;

/**
 * 平均降雨量测站系业务层接口
 * @author si.yu
 * @date 2017/07/26
 * @version 1.0
 * */
public interface StationParamService {

	/**
	 * 根据测站ID查询该站的系数
	 * @param sta_id
	 * @return
	 * */
	public Float getStationParamByStaId(Long sta_id);
	
	/**
	 * 根据区域ID查询参数列表
	 * @param area_id
	 * @return
	 * */
	public boolean findParamByAreaId(Long area_id);
	
	/**
	 * 根据区域ID删除参数数据
	 * @param area_id
	 * @return
	 * */
	public boolean deleteParamByAreaId(Long area_id);
	
	/**
	 * 添加区域测站参数数据
	 * @param stationParamEntity
	 * @return
	 * */
	public boolean addParam(List<StationParamEntity> paramList);
	
	/**
	 * 修改区域系数算法系数值
	 * @param paramList
	 * @return
	 * */
	public boolean updateParam(List<StationParamEntity> paramList);
}
