package mybatisPro.mybatisService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.StationParam;
import mybatisPro.mybatisEntity.StationParamEntity;
import mybatisPro.mybatisService.impl.StationParamService;

/**
 * 平均降雨量测站系业务层实现类
 * @author si.yu
 * @date 2017/07/26
 * @version 1.0
 * */
@Service
public class StationParamServiceImpl implements StationParamService{
	
	private static final Logger logger=LoggerFactory.getLogger(StationParamServiceImpl.class);
	
	/**
	 * 根据测站ID查询该站的系数
	 * @param sta_id
	 * @return
	 * */
	@Override
	public Float getStationParamByStaId(Long sta_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationParam stationParamMapper = sqlsession.getMapper(StationParam.class);
				Float sta_param = stationParamMapper.getStationParamByStaId(sta_id);
				return sta_param;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("STATIONPARAM"));
		}
	}

	/**
	 * 根据区域ID查询参数列表
	 * @param area_id
	 * @return
	 * */
	@Override
	public boolean findParamByAreaId(Long area_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationParam stationParamMapper = sqlsession.getMapper(StationParam.class);
				List<StationParamEntity> paramEntities = stationParamMapper.findParamByAreaId(area_id);
				
				if(paramEntities.isEmpty()){
					return false;
				}else{
					return true;
				}
				
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMLIST"));
		}
	}

	/**
	 * 根据区域ID删除参数数据
	 * @param area_id
	 * @return
	 * */
	@Override
	public boolean deleteParamByAreaId(Long area_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationParam paramMapper = sqlsession.getMapper(StationParam.class);
				int deleteFlag = paramMapper.deleteParamByAreaId(area_id);
				sqlsession.commit();
				if(0 == deleteFlag){
					return false;
				}else{
					return true;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMLISTDEL"));
		}
	}

	/**
	 * 添加区域测站参数数据
	 * @param stationParamEntity
	 * @return
	 * */
	@Override
	public boolean addParam(List<StationParamEntity> paramList) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationParam paramMapper = sqlsession.getMapper(StationParam.class);
				int addFlag = paramMapper.addParam(paramList);
				sqlsession.commit();
				if(0 == addFlag){
					return false;
				}else{
					return true;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMLISTADD"));
		}
	}

	/**
	 * 修改区域系数算法系数值
	 * @param paramList
	 * @return
	 * */
	@Override
	public boolean updateParam(List<StationParamEntity> paramList) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationParam paramMapper = sqlsession.getMapper(StationParam.class);
				int updateFlag = paramMapper.updateParam(paramList);
				sqlsession.commit();
				if(0 == updateFlag){
					return false;
				}else{
					return true;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMLISTUPDATE"));
		}
	}

}
