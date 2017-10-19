package mybatisPro.myBatisDao;

import java.util.List;

import mybatisPro.mybatisEntity.ReservoirEntity;

/**
 * 水库信息管理数据服务层接口
 * @author si.yu
 * @date 2017/6/27
 * @version 1.0
 * */
public interface ReservoirMapper {

	/**
	 * 创建水库
	 * @param reservoirEntity
	 * @return boolean
	 * */
	public int createReservoir(ReservoirEntity reservoirEntity);
	
	/**
	 * 查找水库信息列表
	 * @return list
	 * */
	public List<ReservoirEntity> findListOfReservoir();
	
	/**
	 * 根据水库ID查询水库信息
	 * @param reservoirId
	 * @return reservoirEntity
	 * */
	public ReservoirEntity findReservoirById(Long reservoirId);
	
	/**
	 * 根据水库ID更新水库信息
	 * @param reservoirEntity
	 * @return 
	 * */
	public int updateReservoirInfo(ReservoirEntity reservoirEntity);
}
