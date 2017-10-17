package mybatisPro.mybatisService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.StationMapper;
import mybatisPro.myBatisDao.StationParam;
import mybatisPro.mybatisEntity.AreaEntity;
import mybatisPro.mybatisEntity.ParamCodeEntity;
import mybatisPro.mybatisEntity.StationEntity;
import mybatisPro.mybatisEntity.StationParamEntity;
import mybatisPro.mybatisService.impl.AreaService;
import mybatisPro.mybatisService.impl.StationService;

/**
 * 测站信息业务层实现类
 * @author si.yu
 * @date 2017/7/14
 * @version 1.0
 * */
@Service
public class StationServiceImpl implements StationService{

	private static final Logger logger=LoggerFactory.getLogger(StationServiceImpl.class);
	
	private AreaService areaService = new AreaServiceImpl();
	
	/**
	 * 创建测站信息
	 * @param stationEntity
	 * @return
	 * */
	@Override
	public boolean createStation(StationEntity stationEntity,List<ParamCodeEntity> codeEntities) {
		
		try{
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				
				StationParam paramMapper = sqlsession.getMapper(StationParam.class);
				
				//测站区分(人工站/自动站)
				Integer station_category = stationEntity.getStation_type();
				
				if(Constants.MAN_MADE_STATION != station_category){
					
					int createFlag = stationMapper.createStation(stationEntity);
					Long sta_id = stationEntity.getId();
					for(ParamCodeEntity codeEntity : codeEntities){
						codeEntity.setSta_id(sta_id);
					}
					int insertFlag = stationMapper.insertParamCodeData(codeEntities);
					
					
					boolean paramInsert = insertNewStationParam(paramMapper,stationEntity,sta_id);
					
					
					sqlsession.commit();
					if(0 != createFlag && 0 != insertFlag && paramInsert){
						return true;
					}else{
						return false;
					}
					
				}else{
					int createFlag = stationMapper.createStation(stationEntity);
					Long sta_id = stationEntity.getId();
					boolean paramInsert = insertNewStationParam(paramMapper,stationEntity,sta_id);
					sqlsession.commit();
					
					if(createFlag == 1 && paramInsert){
						return true;
					}else{
						return false;
					}
				}
				
			});
			
		}catch(Exception e){
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATION_CREATE"));
		}
	}
	
	/**
	 * 检测测站是否为雨量站
	 * 所属区域雨量平均算法是否为系数算法
	 * 如果是，系数表中添加系数数据
	 * @param paramMapper
	 * @param stationEntity
	 * @param sta_id
	 * */
	private boolean insertNewStationParam(StationParam paramMapper,StationEntity stationEntity,Long sta_id){
		//获取新建测站的区域
		Long area_id = stationEntity.getArea_id();
		Long stationType = stationEntity.getStation_type_id();
		
		if(null != area_id && null != stationType){
			if(Constants.RAINFALL_STATION.longValue() == stationType.longValue() || 
					Constants.SOIL_RAINFALL_STATION.longValue() == stationType.longValue() || 
					Constants.WATER_RAINFALL_STATION.longValue() == stationType.longValue()){
				AreaEntity areaEntity = areaService.getAreaInfoDetail(area_id);
				if(1 == areaEntity.getAlgorithmType()){
					List<StationParamEntity> paramEntities = new ArrayList<StationParamEntity>();
					StationParamEntity paramEntity = new StationParamEntity();
					paramEntity.setArea_id(area_id);
					paramEntity.setParam(0.0f);
					paramEntity.setSta_id(sta_id);
					paramEntities.add(paramEntity);
					
					int insertFlag = paramMapper.addParam(paramEntities);
					if(0 != insertFlag){
						return true;
					}else{
						return false;
					}
				}
			}
			
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
		return true;
	}

	
	/**
	 * 查询测站列表
	 * @param station_type(区分人工站和自动站)
	 * @return
	 * */
	@Override
	public List<Map<String, Object>> getStationList(Integer station_type) {

		try{
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				List<Map<String, Object>> sEntities = stationMapper.getStationList(station_type);
				return sEntities;
			});
		}catch(Exception e){
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATION_LIST"));
		}
	}

	
	/**
	 * 根据测站ID查询测站详细信息
	 * @param stationId
	 * @return
	 * */
	@Override
	public Map<String, Object> getStationInfoById(Long stationId) {

		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				Map<String, Object> sEntity = stationMapper.getStationInfoById(stationId);
				return sEntity;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATION_INFO"));
		}
	}


	/**
	 * 修改测站信息
	 * @param stationEntity
	 * @return boolean
	 * */
	@Override
	public boolean updateStationInfo(StationEntity stationEntity) {

		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				int updateFlag = stationMapper.updateStationInfo(stationEntity);
				sqlsession.commit();
				
				if(updateFlag == 1){
					return true;
				}else{
					return false;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATION_UPDATE"));
		}
	}


	/**
	 * 根据测站名称查询测站信息
	 * @param sta_name
	 * @return stationEntity
	 * */
	@Override
	public boolean findStationInfoByStaName(String sta_name) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				StationEntity sEntity = stationMapper.findStationInfoByStaName(sta_name);
				if(null != sEntity){
					return true;
				}else{
					return false;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATION_NAME"));
		}
	}


	/**
	 * 查询所有雨量测站的列表信息
	 * @param begin_time
	 * @param end_time
	 * @param type_id
	 * @return
	 * */
	@Override
	public Map<String, Object> getRainfallStationList(String begin_time, String end_time, Long sta_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				Map<String, Object> staInfo = 
						stationMapper.getRainfallStationList(begin_time, end_time ,sta_id);
				return staInfo;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STARAINFALL_LIST"));
		}
	}


	/**
	 * 根据测站类型查询测站ID
	 * @param type_id
	 * @return
	 * */
	@Override
	public List<Long> getStationIdByTypeId(Long type_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				List<Long> stationIdList = stationMapper.getStationIdByTypeId(type_id);
				return stationIdList;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
		}
	}


	/**
	 * 根据测站类型查询测站部分信息
	 * @param type_id
	 * @return
	 * */
	@Override
	public List<Map<String, Object>> getStationInfoByTypeId(Long type_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				List<Map<String,Object>> staInfoList = stationMapper.getStationInfoByTypeId(type_id);
				return staInfoList;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
		}
	}


	/**
	 * 区分人工站和自动站查询测站IDs
	 * @param type_id
	 * @param sta_type
	 * @return
	 * */
	@Override
	public List<Long> getTypeOfStationIds(Integer sta_type) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				List<Long> idsList = stationMapper.getTypeOfStationIds(sta_type);
				return idsList;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
		}
	}


	/**
	 * 插入参数编码数据
	 * @param paramCodeEntity
	 * @return
	 * */
	@Override
	public boolean insertParamCode(ParamCodeEntity codeEntity) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				int insertFlag = 
						stationMapper.insertParamCode(codeEntity);
				
				if(0 == insertFlag){
					return false;
				}else{
					return true;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_PARAM_CODE"));
		}
	}

	
	/**
	 * 根据测站唯一编码查询测站信息
	 * @param sys_code
	 * @return
	 * */
	@Override
	public StationEntity findStationInfoBySysCode(String sys_code) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				StationEntity stationEntity = 
						stationMapper.findStationInfoBySysCode(sys_code);
				return stationEntity;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_SYS_CODE"));
		}
	}

	/**
	 * 根据测站ID查询参数编码列表数据
	 * @param sta_id
	 * @return
	 * */
	@Override
	public List<ParamCodeEntity> getParamCodeListByStaId(Long sta_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession ->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				List<ParamCodeEntity> paramCodeList = 
						stationMapper.getParamCodeListByStaId(sta_id);
				if(null != paramCodeList){
					return paramCodeList;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_PARAM_CODE"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_PARAM_CODE"));
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_PARAM_CODE"));
		}
	}

	
	/**
	 * 自动站删除
	 * @param sta_id
	 * @param sta_type 测站类型
	 * @param area_id 区域ID
	 * @return
	 * */
	@Override
	public boolean deleteAutoStation(Long sta_id, Long sta_type, Long area_id) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				
				//根据区域ID查询测站区域算法
				AreaEntity areaEntity = 
						areaService.getAreaInfoDetail(area_id);
				if(null != areaEntity){
					Integer algorithmType = areaEntity.getAlgorithmType();
					
					//删除系数编码表中该站的数据
					boolean delParamCodeFlag = delParamCode(sta_id,stationMapper);
					//删除测站状态表中该站的数据
					boolean delStaStatusFlag = delStaStatus(sta_id,stationMapper);
					
					//删除该区域测站系数数据
					boolean delAvgParamFlag = delAvgParam(stationMapper,area_id,algorithmType);
					
					if(Constants.RAINFALL_STATION.longValue() == sta_type.longValue()){//雨量站
						//删除该站在各个雨量数据表中的数据
						boolean delRainfallFlag = 
								deleteRainfallData(stationMapper,sta_id);
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						
						if(delRainfallFlag && 0 != delStaInfo && 
								delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
						
					}else if(Constants.WATER_LEVEL_STATION.longValue() == sta_type.longValue()){//水库水位站
						//查询改水库水位站在水库水位数据表中是否有数据
						int resDataCount = 
								stationMapper.countResWaterLevel(sta_id);
						
						if(0 != resDataCount){
							//删除该站数据
							int delResData = stationMapper.deleteStaResWaterlevelData(sta_id);
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delResData && 0 != delStaInfo && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}else{
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delStaInfo && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}
						
					}else if(Constants.SOIL_MOISTURE_STATION.longValue() == sta_type.longValue()){//河道水位站
						//查询河道水位站在河道水位数据表中是否有数据
						int riverDataCount = 
								stationMapper.countRiverWaterLevel(sta_id);
						
						if(0 != riverDataCount){
							int delRiverFlag = stationMapper.deleteStaRiverWaterlevelData(sta_id);
							
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delRiverFlag && 0 != delStaInfo && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}else{
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delStaInfo && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}
						
					}else if(Constants.WATER_RAINFALL_STATION.longValue() == sta_type.longValue()){//水库水文站
						
						//删除该站在各个雨量数据表中的数据
						boolean delRainfallFlag = 
								deleteRainfallData(stationMapper,sta_id);
						//查询改水库水位站在水库水位数据表中是否有数据
						int resDataCount = 
								stationMapper.countResWaterLevel(sta_id);
						if(0 != resDataCount){
							//删除该站数据
							int delResData = stationMapper.deleteStaResWaterlevelData(sta_id);
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delResData && 0 != delStaInfo && delRainfallFlag && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}else{
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delStaInfo && delRainfallFlag && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}
						
						
					}else if(Constants.SOIL_RAINFALL_STATION.longValue() == sta_type.longValue()){//河道水文站
						//删除该站在各个雨量数据表中的数据
						boolean delRainfallFlag = 
								deleteRainfallData(stationMapper,sta_id);
						//查询河道水位站在河道水位数据表中是否有数据
						int riverDataCount = 
								stationMapper.countRiverWaterLevel(sta_id);
						
						if(0 != riverDataCount){
							int delRiverFlag = stationMapper.deleteStaRiverWaterlevelData(sta_id);
							
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delRiverFlag && 0 != delStaInfo && delRainfallFlag && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}else{
							//删除该站的测站信息
							int delStaInfo = 
									stationMapper.deleteStation(sta_id);
							if(0 != delStaInfo && delRainfallFlag && 
									delParamCodeFlag && delStaStatusFlag && delAvgParamFlag){
								sqlsession.commit();
								return true;
							}else{
								return false;
							}
						}
						
					}else{
						logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
						throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
					}
					

				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_AREA_2"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_AREA_2"));
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("DELETE_FAILED"));
		}
	}

	/**
	 * 删除测站状态表中该站的数据
	 * @param sta_id
	 * @return
	 * */
	private boolean delStaStatus(Long sta_id, StationMapper stationMapper) {
		//查询测站状态表中该站的数据
		int staStatusCount = stationMapper.countStaStatus(sta_id);
		if(0 != staStatusCount){
			//删除测站状态表中该站的数据
			int delStaStatus = stationMapper.deleteStaStatusData(sta_id);
			if(0 != delStaStatus){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}

	/**
	 * 删除系数编码表中该站的数据
	 * @param sta_id
	 * @return
	 * */
	private boolean delParamCode(Long sta_id, StationMapper stationMapper) {
		//查询系数编码表中是否有该站的数据
		int paramCodeCount = stationMapper.countParamCode(sta_id);
		if(0 != paramCodeCount){
			//删除系数编码表中该站的数据
			int delParamCode = stationMapper.deleteStaParamCodeData(sta_id);
			if(0 != delParamCode){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}

	/**
	 * 删除测站系数表中该区域所有测站系数数据
	 * @param area_id
	 * @param algorithmType
	 * */
	private boolean delAvgParam(StationMapper stationMapper, Long area_id, Integer algorithmType) {
		if(1 == algorithmType){//该区域为系数平均算法
			//查询测站系数表中是否有该区域的系数数据
			int avgParamCount = stationMapper.countStaAvgParamData(area_id);
			if(0 != avgParamCount){
				//删除测站系数表中该区域所有测站系数数据
				int delAvgParam = stationMapper.deleteStaAvgParamData(area_id);
				if(0 != delAvgParam){
					AreaEntity areaEntity = new AreaEntity();
					areaEntity.setArea_id(area_id);
					areaEntity.setAlgorithmType(0);
					boolean updateAlgorithmType = areaService.updateAreaInfo(areaEntity);
					if(updateAlgorithmType){
						return true;
					}else{
						return false;
					}
				}else{
					AreaEntity areaEntity = new AreaEntity();
					areaEntity.setAlgorithmType(0);
					boolean updateAlgorithmType = areaService.updateAreaInfo(areaEntity);
					if(updateAlgorithmType){
						return true;
					}else{
						return false;
					}
				}
			}else{
				return true;
			}
		}else{
			return true;
		}
	}

	/**
	 * 人工站删除
	 * @param sta_id
	 * @param sta_type
	 * @return 
	 * */
	@Override
	public boolean deleteManMadeStation(Long sta_id, Long sta_type) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationMapper stationMapper = sqlsession.getMapper(StationMapper.class);
				
				if(Constants.RAINFALL_STATION.longValue() == sta_type.longValue()){//雨量站
					//删除该站在各个雨量数据表中的数据
					boolean delRainfallFlag = 
							deleteRainfallData(stationMapper,sta_id);
					//删除该站的测站信息
					int delStaInfo = 
							stationMapper.deleteStation(sta_id);
					
					if(delRainfallFlag && 0 != delStaInfo){
						sqlsession.commit();
						return true;
					}else{
						return false;
					}
					
				}else if(Constants.WATER_LEVEL_STATION.longValue() == sta_type.longValue()){//水库水位站
					//查询改水库水位站在水库水位数据表中是否有数据
					int resDataCount = 
							stationMapper.countResWaterLevel(sta_id);
					
					if(0 != resDataCount){
						//删除该站数据
						int delResData = stationMapper.deleteStaResWaterlevelData(sta_id);
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delResData && 0 != delStaInfo){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}else{
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delStaInfo){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}
					
				}else if(Constants.SOIL_MOISTURE_STATION.longValue() == sta_type.longValue()){//河道水位站
					//查询河道水位站在河道水位数据表中是否有数据
					int riverDataCount = 
							stationMapper.countRiverWaterLevel(sta_id);
					
					if(0 != riverDataCount){
						int delRiverFlag = stationMapper.deleteStaRiverWaterlevelData(sta_id);
						
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delRiverFlag && 0 != delStaInfo){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}else{
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delStaInfo){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}
					
				}else if(Constants.WATER_RAINFALL_STATION.longValue() == sta_type.longValue()){//水库水文站
					
					//删除该站在各个雨量数据表中的数据
					boolean delRainfallFlag = 
							deleteRainfallData(stationMapper,sta_id);
					//查询改水库水位站在水库水位数据表中是否有数据
					int resDataCount = 
							stationMapper.countResWaterLevel(sta_id);
					if(0 != resDataCount){
						//删除该站数据
						int delResData = stationMapper.deleteStaResWaterlevelData(sta_id);
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delResData && 0 != delStaInfo && delRainfallFlag){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}else{
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delStaInfo && delRainfallFlag){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}
					
					
				}else if(Constants.SOIL_RAINFALL_STATION.longValue() == sta_type.longValue()){//河道水文站
					//删除该站在各个雨量数据表中的数据
					boolean delRainfallFlag = 
							deleteRainfallData(stationMapper,sta_id);
					//查询河道水位站在河道水位数据表中是否有数据
					int riverDataCount = 
							stationMapper.countRiverWaterLevel(sta_id);
					
					if(0 != riverDataCount){
						int delRiverFlag = stationMapper.deleteStaRiverWaterlevelData(sta_id);
						
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delRiverFlag && 0 != delStaInfo && delRainfallFlag){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}else{
						//删除该站的测站信息
						int delStaInfo = 
								stationMapper.deleteStation(sta_id);
						if(0 != delStaInfo && delRainfallFlag){
							sqlsession.commit();
							return true;
						}else{
							return false;
						}
					}
					
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("DELETE_FAILED"));
		}
	}

	/**
	 * 删除雨量数据表数据
	 * @param sta_id
	 * @return boolean
	 * */
	private boolean deleteRainfallData(StationMapper stationMapper, Long sta_id) {
		
		if(null != sta_id){
			
			int count = 0;
			int countSum = 0;
			
			//查询该站在数据表中是否有数据
			int countRain = stationMapper.countRainfall(sta_id);
			if(0 != countRain){
				countSum += countRain;
				int del_rainfall = stationMapper.deleteStaRainfallData(sta_id);
				if(0 != del_rainfall){
					count = 1;
				}else{
					return false;
				}
			}
			
			int countRainH = stationMapper.countRainfallH(sta_id);
			if(0 != countRainH){
				countSum += countRainH;
				int del_rainfallH = stationMapper.deleteStaRainfallDataH(sta_id);
				if(0 != del_rainfallH){
					count = 1;
				}else{
					return false;
				}
			}
			
			int countRainD = stationMapper.countRainfallD(sta_id);
			if(0 != countRainD){
				countSum += countRainD;
				int del_rainfallD = stationMapper.deleteStaRainfallDataD(sta_id);
				if(0 != del_rainfallD){
					count = 1;
				}else{
					return false;
				}
			}
			
			int countRainM = stationMapper.countRainfallM(sta_id);
			if(0 != countRainM){
				countSum += countRainM;
				int del_rainfallM = stationMapper.deleteStaRainfallDataM(sta_id);
				if(0 != del_rainfallM){
					count = 1;
				}else{
					return false;
				}
			}
			
			if(0 == countSum){
				return true;
			}else if(0 != count){
				return true;
			}
				
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
		return false;
	}
}
