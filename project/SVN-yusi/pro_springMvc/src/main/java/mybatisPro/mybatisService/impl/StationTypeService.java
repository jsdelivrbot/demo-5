package mybatisPro.mybatisService.impl;

import java.util.List;

import mybatisPro.mybatisEntity.StationTypeEntity;

/**
 * 测站类型业务层接口
 * @author si.yu
 * @date 2017/7/24
 * @version 1.0
 * */
public interface StationTypeService {

	/**
	 * 查询测站类型列表
	 * */
	public List<StationTypeEntity> getStationTypeList();
}
