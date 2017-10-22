package mybatisPro.mybatisService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.ReservoirMapper;
import mybatisPro.mybatisEntity.ReservoirEntity;
import mybatisPro.mybatisService.impl.ReservoirManagerService;

/**
 * 水库信息管理业务层接口
 * @author si.yu
 * @date 2017/6/27
 * @version 1.0
 * */
@Service
public class ReservoirManagerServiceImpl implements ReservoirManagerService {

	private static final Logger logger=LoggerFactory.getLogger(ReservoirManagerServiceImpl.class);
	
	/**
	 * 创建水库信息
	 * @param reservoirEntity
	 * @return boolean
	 * */
	@Override
	public boolean createReservoir(ReservoirEntity reservoirEntity) {
		try{
			return SqlSessionHander.SqlExecute(sqlsession->{
				ReservoirMapper reservoirMapper = sqlsession.getMapper(ReservoirMapper.class);
				int createFlag = reservoirMapper.createReservoir(reservoirEntity);
				sqlsession.commit();
				if(createFlag == 1){
					return true;
				}else{
					return false;
				}
			});
		}catch(Exception e){
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_1"));
		}
	}

	
	/**
	 * 查找水库信息列表
	 * @return list
	 * */
	@Override
	public List<ReservoirEntity> findListOfReservoir() {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				ReservoirMapper reservoirMapper = sqlsession.getMapper(ReservoirMapper.class);
				List<ReservoirEntity> rEntities = reservoirMapper.findListOfReservoir();
				return rEntities;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_2"));
		}
	}

	/**
	 * 根据水库ID查询水库信息
	 * @param reservoirId
	 * @return reservoirEntity
	 * */
	@Override
	public ReservoirEntity findReservoirById(Long reservoirId) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				ReservoirMapper reservoirMapper = sqlsession.getMapper(ReservoirMapper.class);
				ReservoirEntity rEntity = reservoirMapper.findReservoirById(reservoirId);
				return rEntity;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_3"));
		}
	}

	/**
	 * 根据水库ID更新水库信息
	 * @param reservoirEntity
	 * @return boolean
	 * */
	@Override
	public boolean updateReservoirInfo(ReservoirEntity reservoirEntity) {
		try{
			return SqlSessionHander.SqlExecute(sqlsession->{
				ReservoirMapper reservoirMapper = sqlsession.getMapper(ReservoirMapper.class);
				int updateFlag = reservoirMapper.updateReservoirInfo(reservoirEntity);
				
				sqlsession.commit();
				
				if(updateFlag == 1){
					return true;
				}else{
					return false;
				}
			});
		}catch(Exception e){
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_4")); 
		}
	}

}
