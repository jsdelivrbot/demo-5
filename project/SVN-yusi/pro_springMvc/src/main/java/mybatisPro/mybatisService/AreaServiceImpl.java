package mybatisPro.mybatisService;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.AreaMapper;
import mybatisPro.mybatisEntity.AreaEntity;
import mybatisPro.mybatisEntity.StationInfoEntityUtil;
import mybatisPro.mybatisService.impl.AreaService;

/**
 * 区域管理业务层实现类
 * @author si.yu
 * @date 2017/7/19
 * @version 1.0
 * */
@Service
public class AreaServiceImpl implements AreaService{
	
	private static final Logger logger=LoggerFactory.getLogger(AreaServiceImpl.class);
	
	/**
	 * 查询区域列表
	 * @return
	 * */
	@Override
	public List<AreaEntity> findListOfArea() {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				List<AreaEntity> areaEntities = areaMapper.findListOfArea();
				return areaEntities;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_1"));
		}
	}

	/**
	 * 查询区域详情信息
	 * @param area_id
	 * @return
	 * */
	@Override
	public AreaEntity getAreaInfoDetail(Long area_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				AreaEntity aEntity = areaMapper.getAreaInfoDetail(area_id);
				return aEntity;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_2"));
		}
	}

	/**
	 * 修改区域信息
	 * @param area_id
	 * @return
	 * */
	@Override
	public boolean updateAreaInfo(AreaEntity areaEntity) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				int updateFlag = areaMapper.updateAreaInfo(areaEntity);
				sqlsession.commit();
				if(updateFlag == 1){
					return true;
				}else{
					return false;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_3"));
		}
	}

	/**
	 * 创建区域
	 * @param areaEntity
	 * @return
	 * */
	@Override
	public boolean createArea(AreaEntity areaEntity) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				int createFlag = areaMapper.createArea(areaEntity);
				sqlsession.commit();
				if(createFlag == 1){
					return true;
				}else{
					return false;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_4"));
		}
	}

	/**
	 * 查询区域对应的测站
	 * @param sta_type_id 
	 * @return
	 * */
	@Override
	public List<Map<String,Object>> findAreaStationsInfo(Long sta_type_id,String begin_time,String end_time) {

		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				List<Map<String,Object>> map = areaMapper.findAreaStationsInfo(sta_type_id,begin_time,end_time);
				return map;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_5"));
		}
	}

	/**
	 * 根据区域ID查询区域测站信息列表(时间条件)
	 * @param sta_type_id 
	 * @param begin_time  
	 * @param end_time 
	 * @param area_id 
	 * @return
	 * */
	@Override
	public StationInfoEntityUtil getAreaStationsInfoByAreaId(Long sta_id, String begin_time
			, String end_time) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				StationInfoEntityUtil stationUtil = 
						areaMapper.getAreaStationsInfoByAreaId(sta_id, begin_time, end_time);
				return stationUtil;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_5"));
		}
	}
	

	/**
	 * 根据区域名称查询区域信息
	 * @param area_name
	 * @return
	 * */
	@Override
	public boolean findAreaInfoByName(String area_name) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				AreaEntity areaEntity = areaMapper.findAreaInfoByName(area_name);
				if(null != areaEntity){
					return true;
				}else{
					return false;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_6"));
		}
	}

	/**
	 * 根据区域ID查询测站系数列表
	 * @param area_id
	 * @return
	 * */
	@Override
	public List<Map<String, Object>> getStationsParamByAreaId(Long sta_type_id, Long area_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				List<Map<String,Object>> sta_paramList = areaMapper.getStationsParamByAreaId(sta_type_id, area_id);
				return sta_paramList;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_7"));
		}
	}

	/**
	 * 根据区域ID和测站类型查询测站id 列表
	 * @param area_id
	 * @param type_id
	 * @return
	 * */
	@Override
	public List<Long> getStaIdsByAreaId(Long sta_type_id, Long area_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				AreaMapper areaMapper = sqlsession.getMapper(AreaMapper.class);
				List<Long> staIds = areaMapper.getStaIdsByAreaId(sta_type_id, area_id);
				return staIds;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_8"));
		}
	}

}
