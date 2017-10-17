package mybatisPro.myBatisDao;

import java.util.List;

import mybatisPro.mybatisEntity.StationTypeEntity;

/**
 * 测站类型管理数据层接口
 * @author si.yu
 * @date 2017/7/24
 * @version 1.0
 * */
public interface StationTypeMapper {

	/**
	 * 查询测站类型列表
	 * */
	public List<StationTypeEntity> getListOfStationType();
}
