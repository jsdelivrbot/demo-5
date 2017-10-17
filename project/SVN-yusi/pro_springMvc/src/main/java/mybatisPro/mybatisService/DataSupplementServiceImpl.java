package mybatisPro.mybatisService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.DataSupplementMapper;
import mybatisPro.myBatisDao.ManMadeStationMapper;
import mybatisPro.mybatisEntity.RainfallEntity;
import mybatisPro.mybatisEntity.ReservoirWaterLevelEntity;
import mybatisPro.mybatisEntity.RiverWaterLevelEntity;
import mybatisPro.mybatisService.impl.DataHistoryReor;
import mybatisPro.mybatisService.impl.DataSupplementService;
import mybatisPro.mybatisService.impl.WaterLevelService;

/**
 * 自动站数据增补业务层实现
 * @author si.yu
 * @date 2017/09/01
 * @version 1.0
 * */
@Service
public class DataSupplementServiceImpl implements DataSupplementService{
	
	private static final Logger logger=LoggerFactory.getLogger(DataSupplementServiceImpl.class); 
	
	private WaterLevelService waterLevelService = new WaterLevelServiceImpl();
	
	private DataHistoryReor historyReor = new DataHistoryReoImpl(); 

	/**
	 * 查询雨量测站数据
	 * @param sta_id
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	@Override
	public List<Map<String, Object>> getRainfallStationData(Long sta_id, String begin_time, String end_time) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				DataSupplementMapper supplementMapper = sqlsession.getMapper(DataSupplementMapper.class);
				List<Map<String,Object>> rainfallStationData = 
						supplementMapper.getRainfallStationData(sta_id, begin_time, end_time);
				
				if(null != rainfallStationData){
					return rainfallStationData;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_RAIN_DATA"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RAIN_DATA"));
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RAIN_DATA"));
		}
	}

	/**
	 * 查询水库水位站测站数据
	 * @param sta_id
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	@Override
	public List<Map<String, Object>> getResvoirStationData(Long sta_id, String begin_time, String end_time) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				DataSupplementMapper supplementMapper = sqlsession.getMapper(DataSupplementMapper.class);
				List<Map<String,Object>> reserviorStationData = 
						supplementMapper.getResvoirStationData(sta_id, begin_time, end_time);
				if(null != reserviorStationData){
					return reserviorStationData;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_DATA"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_DATA"));
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_DATA"));
		}
	}

	/**
	 * 查询河道水位站测站数据
	 * @param sta_id
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	@Override
	public List<Map<String, Object>> getRiverStationData(Long sta_id, String begin_time, String end_time) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				DataSupplementMapper supplementMapper = sqlsession.getMapper(DataSupplementMapper.class);
				List<Map<String,Object>> riverStationData = 
						supplementMapper.getRiverStationData(sta_id, begin_time, end_time);
				if(null != riverStationData){
					return riverStationData;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_RIVER_DATA"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RIVER_DATA"));
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RIVER_DATA"));
		}
	}

	/**
	 * 增补数据
	 * @param typeFlag
	 * @param sta_id
	 * @param time
	 * @param monitorData
	 * @return
	 * */
	@Override
	public boolean insertDataSupplement(String typeFlag, Long sta_id, String time, Float monitorData) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				
				ManMadeStationMapper manMadeMapper = sqlsession.getMapper(ManMadeStationMapper.class);
				
				int count = 0;
				
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date dateTime = null;
				try {
					dateTime = format.parse(time);
				} catch (Exception e) {
					
					e.printStackTrace();
				}
				
				if(typeFlag.equals(Constants.RAIN_STATION)){//雨量
					
					RainfallEntity rainfallEntity = new RainfallEntity();
					
					rainfallEntity.setSta_id(sta_id);
					rainfallEntity.setTime(dateTime);
					rainfallEntity.setTime_rainfall(monitorData);
					
					int insertRainData = 
							manMadeMapper.insertIntoRainFallData(rainfallEntity);
					
//					datetime 
					boolean reorFlag = 
							historyReor.updateHistoryInfo(time, monitorData, sta_id);
					
					if(0 != insertRainData && reorFlag){
						count++;
					}else{
						return false;
					}
					
				}else if(typeFlag.equals(Constants.RESVOIR_STATION)){//水库水位
					
					ReservoirWaterLevelEntity reservoirEntity = new ReservoirWaterLevelEntity();
					
					reservoirEntity.setSta_id(sta_id);
					reservoirEntity.setTime(dateTime);
					reservoirEntity.setWaterLevel(monitorData);
					
					//根据水位查询计算出库容值
					if(null == monitorData){
						
						reservoirEntity.setStorageCapacity(null);
					}else if(monitorData<44.00){
						reservoirEntity.setStorageCapacity(0.0f);
					}else if(monitorData > 85.00){
						reservoirEntity.setStorageCapacity(null);
					}else{
						Float storageData = 
								waterLevelService.getStorageCapacityByWaterLevel(monitorData);
						if(null != storageData){
							reservoirEntity.setStorageCapacity(storageData);
						}else{
							logger.info(Constants.EXCEPTION_MAP.get("EX_WATERLEVEL_5")); 
							throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_WATERLEVEL_5"));
						}
					}
					
					int insertResvoirData = 
							manMadeMapper.insertResvoirData(reservoirEntity);
					
					if(0 != insertResvoirData){
						count++;
					}else{
						return false;
					}
					
				}else if(typeFlag.equals(Constants.RIVER_STATION)){//河道水位
					
					RiverWaterLevelEntity riverEntity = new RiverWaterLevelEntity();
					
					riverEntity.setSta_id(sta_id);
					riverEntity.setTime(dateTime);
					riverEntity.setWaterLevel(monitorData);
					
					int insertRiverData = 
							manMadeMapper.insertRiverData(riverEntity);
					
					if(0 != insertRiverData){
						count++;
					}else{
						return false;
					}
					
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				}
				
				if(0 != count){
					sqlsession.commit();
					return true;
				}else{
					return false;
				}
						
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_ADDDATASUPPLEMENT"));
		}
	}

	
	/**
	 * 自动站修改数据
	 * @param typeFlag
	 * @param sta_id
	 * @param time
	 * @param monitorData
	 * @return
	 * */
	@Override
	public boolean updateDataSupplement(String typeFlag, Long sta_id, Long data_id, String time, Float monitorData) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				
				ManMadeStationMapper manMadeMapper = sqlsession.getMapper(ManMadeStationMapper.class);
				
				int count = 0;
				
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Date dateTime = null;
				try {
					dateTime = format.parse(time);
				} catch (Exception e) {
					
					e.printStackTrace();
				}
				
				if(typeFlag.equals(Constants.RAIN_STATION)){//水库水位
					
					RainfallEntity rainfallEntity = new RainfallEntity();
					
					rainfallEntity.setId(data_id);
					rainfallEntity.setTime(dateTime);
					rainfallEntity.setTime_rainfall(monitorData);
					
					int updateRainData = 
							manMadeMapper.updateRainFallData(rainfallEntity);
					
					boolean reorFlag = 
							historyReor.updateHistoryInfo(time, monitorData, sta_id);
					
					if(0 != updateRainData && reorFlag){
						count++;
					}else{
						return false;
					}
					
				}else if(typeFlag.equals(Constants.RESVOIR_STATION)){//河道水位
					
					ReservoirWaterLevelEntity reservoirEntity = new ReservoirWaterLevelEntity();
					
					reservoirEntity.setId(data_id);
					reservoirEntity.setTime(dateTime);
					reservoirEntity.setWaterLevel(monitorData);
					
					//根据水位查询计算出库容值
					if(null == monitorData){
						
						reservoirEntity.setStorageCapacity(null);
					}else if(monitorData<44.00){
						reservoirEntity.setStorageCapacity(0.0f);
					}else if(monitorData > 85.00){
						reservoirEntity.setStorageCapacity(null);
					}else{
						Float storageData = 
								waterLevelService.getStorageCapacityByWaterLevel(monitorData);
						if(null != storageData){
							reservoirEntity.setStorageCapacity(storageData);
						}else{
							logger.info(Constants.EXCEPTION_MAP.get("EX_WATERLEVEL_5")); 
							throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_WATERLEVEL_5"));
						}
					}
					
					int updateResvoirData = 
							manMadeMapper.updateResvoirData(reservoirEntity);
					
					if(0 != updateResvoirData){
						count++;
					}else{
						return false;
					}
					
				}else if(typeFlag.equals(Constants.RIVER_STATION)){//雨量
					
					RiverWaterLevelEntity riverEntity = new RiverWaterLevelEntity();
					
					riverEntity.setId(data_id);
					riverEntity.setTime(dateTime);
					riverEntity.setWaterLevel(monitorData);
					
					int updateRiverData = 
							manMadeMapper.updateRiverData(riverEntity);
					
					if(0 != updateRiverData){
						count++;
					}else{
						return false;
					}
					
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				}
				
				if(0 != count){
					sqlsession.commit();
					return true;
				}else{
					return false;
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_UPDATEDATASUPPLEMENT"));
		}
	}

}
