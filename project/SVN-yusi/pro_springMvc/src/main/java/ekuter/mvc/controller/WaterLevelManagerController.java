package ekuter.mvc.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import ekuter.mvc.util.ResultMessageUtil;
import mybatisPro.mybatisEntity.ReservoirWaterLevelEntity;
import mybatisPro.mybatisEntity.RiverWaterLevelEntity;
import mybatisPro.mybatisService.impl.StationService;
import mybatisPro.mybatisService.impl.WaterLevelService;

/**
 * 水位管理类（水库水位，河道水位）
 * @author si.yu
 * @date 2017/8/8
 * @version 1.0
 * */
@RestController
@RequestMapping("waterLevel")
public class WaterLevelManagerController {
	
	private static final Logger logger = LoggerFactory.getLogger(WaterLevelManagerController.class);

	@Autowired
	private StationService stationService;
	@Autowired
	private WaterLevelService waterLevelService;
	
	/**
	 * 水库水位信息查询
	 * @param begin_time
	 * @param ent_time
	 * @return
	 * */
	@RequestMapping("getWaterLevelInfo")
	public ResultMessageUtil searchReservoirWaterInfo(String begin_time,String end_time){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != begin_time || null != end_time){
			List<Long> waterLevelStaList = new ArrayList<Long>(); 
			//根据测站类型查询水库水位站ID列表
			List<Long> staIdList_W = stationService.getStationIdByTypeId(Constants.WATER_LEVEL_STATION);
			//根据测站类型查询水库水文站ID列表
			List<Long> StaIdList_R = stationService.getStationIdByTypeId(Constants.WATER_RAINFALL_STATION);
			
			if(null != staIdList_W || null != StaIdList_R){
				
				waterLevelStaList.addAll(staIdList_W);
				waterLevelStaList.addAll(StaIdList_R);
				
				if(!waterLevelStaList.isEmpty()){
					
					List<Map<String, Object>> waterLevelList = new ArrayList<Map<String,Object>>();
					//遍历水库水位站列表，根据ID查询水位数据
					for(Long staId : waterLevelStaList){
						
						Map<String, Object> waterLevelInfo = 
								waterLevelService.getWaterLevelInfo(begin_time, end_time, staId);
						
						if(null != waterLevelInfo){
							waterLevelList.add(waterLevelInfo);
						}else{
							//当该站在选择的时间段内没有水位数据时，只返回测站信息
							Map<String, Object> waterLevelStaInfo = new HashMap<String, Object>();
							
							Map<String, Object> sEntity = stationService.getStationInfoById(staId);
							if(null != sEntity){
								waterLevelStaInfo.put("id", sEntity.get("id"));
								waterLevelStaInfo.put("sys_code", sEntity.get("sys_code"));
								waterLevelStaInfo.put("station_name", sEntity.get("station_name"));
								waterLevelStaInfo.put("station_location", sEntity.get("station_location"));
								waterLevelStaInfo.put("station_type", sEntity.get("station_type"));
								waterLevelStaInfo.put("x", sEntity.get("x"));
								waterLevelStaInfo.put("y", sEntity.get("y"));
								waterLevelList.add(waterLevelStaInfo);
							}else{
								logger.info(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
								throw new BusinessException(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
							}
						}
 					}
					resultMsg.setData(waterLevelList);
					resultMsg.setStatus(0);
					return resultMsg;
					
				}else{
					resultMsg.setMsg("该水库未布置水库水位站！");
					resultMsg.setStatus(0);
					return resultMsg;
				}
				
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("WATERIDLIST"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("WATERIDLIST"));
			}
			
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	
	/**
	 * 河道水位信息查询
	 * @param begin_time
	 * @param ent_time
	 * @return
	 * */
	@RequestMapping("getRiverWaterLevelInfo")
	public ResultMessageUtil searchRiverWaterInfo(String begin_time,String end_time){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != begin_time || null != end_time){
			List<Long> waterLevelStaList = new ArrayList<Long>(); 
			//根据测站类型查询河道水位站ID列表
			List<Long> staIdList_R = stationService.getStationIdByTypeId(Constants.SOIL_MOISTURE_STATION);
			//根据测站类型查询河道水文站ID列表
			List<Long> staIdList_S = stationService.getStationIdByTypeId(Constants.SOIL_RAINFALL_STATION);
			
			if(null != staIdList_R || null != staIdList_S){
				
				waterLevelStaList.addAll(staIdList_R);
				waterLevelStaList.addAll(staIdList_S);
				
				if(!waterLevelStaList.isEmpty()){
					
					List<Map<String, Object>> waterLevelList = new ArrayList<Map<String,Object>>();
					//遍历河道水位站列表，根据ID查询水位数据
					for(Long staId : waterLevelStaList){
						
						Map<String, Object> waterLevelInfo = 
								waterLevelService.getSoilWaterLevelInfo(begin_time, end_time, staId);
						
						if(null != waterLevelInfo){
							waterLevelList.add(waterLevelInfo);
						}else{
							//当该站在选择的时间段内没有水位数据时，只返回测站信息
							Map<String, Object> waterLevelStaInfo = new HashMap<String, Object>();
							
							Map<String, Object> sEntity = stationService.getStationInfoById(staId);
							if(null != sEntity){
								waterLevelStaInfo.put("id", sEntity.get("id"));
								waterLevelStaInfo.put("sys_code", sEntity.get("sys_code"));
								waterLevelStaInfo.put("station_name", sEntity.get("station_name"));
								waterLevelStaInfo.put("station_location", sEntity.get("station_location"));
								waterLevelStaInfo.put("station_type", sEntity.get("station_type"));
								waterLevelStaInfo.put("x", sEntity.get("x"));
								waterLevelStaInfo.put("y", sEntity.get("y"));
								waterLevelList.add(waterLevelStaInfo);
							}else{
								logger.info(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
								throw new BusinessException(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
							}
						}
 					}
					resultMsg.setData(waterLevelList);
					resultMsg.setStatus(0);
					return resultMsg;
					
				}else{
					resultMsg.setMsg("该水库未布置河道水位站！");
					resultMsg.setStatus(0); 
					return resultMsg;
				}
				
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("WATERIDLIST"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("WATERIDLIST"));
			}
			
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	
	/**
	 * 查询时间段内水库水位数据列表
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 * @return
	 * */
	@RequestMapping("getResvoirDataList")
	public ResultMessageUtil getResvoirWaterLevelList(String begin_time,String end_time,Long sta_id){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != sta_id ||null != begin_time || null != end_time){
			//查询列表数据
			List<ReservoirWaterLevelEntity> reservoirWaterLevelEntities = 
					waterLevelService.getResWaterLevelInfoList(begin_time, end_time, sta_id);
			
			if(null != reservoirWaterLevelEntities){
				
				resultMsg.setData(reservoirWaterLevelEntities);
				resultMsg.setStatus(0);
				return resultMsg;
			}else{
				resultMsg.setStatus(0);
				resultMsg.setMsg("该站当前时间段内无上报数据");
				return resultMsg;
			}
			
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	/**
	 * 查询时间段内河道水位数据列表
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 * @return
	 * */
	@RequestMapping("getRiverDataList")
	public ResultMessageUtil getRiverWaterLevelList(String begin_time,String end_time,Long sta_id){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != sta_id ||null != begin_time || null != end_time){
			//查询数据
			List<RiverWaterLevelEntity> riverWaterLevelEntities = 
					waterLevelService.getRiverWaterLevelInfoList(begin_time, end_time, sta_id);
			
			if(null != riverWaterLevelEntities){
				resultMsg.setData(riverWaterLevelEntities);
				resultMsg.setStatus(0);
				return resultMsg;
			}else{
				resultMsg.setStatus(0);
				resultMsg.setMsg("该站在当前选定时间段内无数据");
				return resultMsg;
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	
	/**
	 * 根据测站类型查询测站列表
	 * @param typeFlag 
	 * 		"0":代表水库水位站查询 
	 * 		"1":代表河道水位站查询
	 * 		"2":代表雨量站查询
	 * @return
	 * */
	@RequestMapping("getStationNameList")
	public ResultMessageUtil getStationListByType(String typeFlag){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		List<Map<String, Object>> staionList = new ArrayList<Map<String, Object>>();
		
		if(typeFlag.equals(Constants.RESVOIR_STATION)){
			//测站类型查询所有水库水位站
			List<Map<String, Object>> staionList_w = 
					stationService.getStationInfoByTypeId(Constants.WATER_LEVEL_STATION);
			//测站类型查询所有水库水文站
			List<Map<String, Object>> staionList_r = 
					stationService.getStationInfoByTypeId(Constants.WATER_RAINFALL_STATION);
			
			if(null != staionList_w || null != staionList_r){
				
				staionList.addAll(staionList_w);
				staionList.addAll(staionList_r);
				if(!staionList.isEmpty()){
					resultMsg.setData(staionList);
					resultMsg.setStatus(0);
					return resultMsg;
				}else{
					resultMsg.setStatus(0);
					resultMsg.setMsg("该水库未部署水库水位检测站");
					return resultMsg;
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
			}
			
		}else if(typeFlag.equals(Constants.RIVER_STATION)){
			//测站类型查询所有河道水位站
			List<Map<String, Object>> staionList_w = 
					stationService.getStationInfoByTypeId(Constants.SOIL_MOISTURE_STATION);
			//测站类型查询所有河道水文站
			List<Map<String, Object>> staionList_r = 
					stationService.getStationInfoByTypeId(Constants.SOIL_RAINFALL_STATION);
			if(null != staionList_w || null != staionList_r){
				
				staionList.addAll(staionList_w);
				staionList.addAll(staionList_r);
				if(!staionList.isEmpty()){
					resultMsg.setData(staionList);
					resultMsg.setStatus(0);
					return resultMsg;
				}else{
					resultMsg.setStatus(0);
					resultMsg.setMsg("该水库未部署河道水位检测站");
					return resultMsg;
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
			}
		}else if(typeFlag.equals(Constants.RAIN_STATION)){
			//测站类型查询所有雨量站
			List<Map<String, Object>> staionList_rain = 
					stationService.getStationInfoByTypeId(Constants.RAINFALL_STATION);
			//测站类型查询所有水库水文站
			List<Map<String, Object>> staionList_rainW = 
					stationService.getStationInfoByTypeId(Constants.WATER_RAINFALL_STATION);
			//测站类型查询所有河道水文站
			List<Map<String, Object>> staionList_rainS = 
					stationService.getStationInfoByTypeId(Constants.SOIL_RAINFALL_STATION);
			if(null != staionList_rain || null != staionList_rainS || null != staionList_rainW){
				
				staionList.addAll(staionList_rain);
				staionList.addAll(staionList_rainW);
				staionList.addAll(staionList_rainS);
				if(!staionList.isEmpty()){
					resultMsg.setData(staionList);
					resultMsg.setStatus(0);
					return resultMsg;
				}else{
					resultMsg.setStatus(0);
					resultMsg.setMsg("该水库未部署雨量检测站");
					return resultMsg;
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STAID_LIST"));
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	
	/**
	 * 水库水位Echarts图数据返回
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 * @return
	 * */
	@RequestMapping("getResvoirDataForEcharts")
	public ResultMessageUtil getResvoirDataForEcharts(String begin_time,String end_time,Long sta_id){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != sta_id ||null != begin_time || null != end_time){
			//查询列表数据
			List<ReservoirWaterLevelEntity> reservoirWaterLevelEntities = 
					waterLevelService.getResWaterLevelInfoList(begin_time, end_time, sta_id);
			
			List<List<Float>> echartsData = new ArrayList<List<Float>>();
			
			if(null != reservoirWaterLevelEntities){
				//水位数据列表
				List<Float> waterLeval = new ArrayList<Float>();
				//库容数据列表
				List<Float> storageCapacity = new ArrayList<Float>();
				//数据上报时间列表
				List<String> dataTime = new ArrayList<String>();
				
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
				for(ReservoirWaterLevelEntity rEntity : reservoirWaterLevelEntities){
					
					waterLeval.add(rEntity.getWaterLevel());
					storageCapacity.add(rEntity.getStorageCapacity());
					
					Date time = rEntity.getTime();
					String timeString = formatter.format(time);
					dataTime.add(timeString);
				}
				echartsData.add(waterLeval);
				echartsData.add(storageCapacity);
				
				resultMsg.setStatus(0);
				resultMsg.setDataSub(dataTime);
				resultMsg.setData(echartsData);
				return resultMsg;
			}else{
				resultMsg.setStatus(0);
				resultMsg.setMsg("该站当前时间段内无上报数据");
				return resultMsg;
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	
	/**
	 * 河道水位Echarts图数据返回
	 * @param begin_time
	 * @param end_time
	 * @param sta_id
	 * @return
	 * */
	@RequestMapping("getRiverDataForEcharts")
	public ResultMessageUtil getRiverDataForEcharts(String begin_time,String end_time,Long sta_id){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != sta_id ||null != begin_time || null != end_time){
			//查询列表数据
			List<RiverWaterLevelEntity> riverWaterLevelEntities = 
					waterLevelService.getRiverWaterLevelInfoList(begin_time, end_time, sta_id);
			
			List<List<Float>> echartsData = new ArrayList<List<Float>>();
			
			if(null != riverWaterLevelEntities){
				//水位数据列表
				List<Float> waterLeval = new ArrayList<Float>();
				//流量数据列表
				List<Float> rateOfFlow = new ArrayList<Float>();
				//数据上报时间列表
				List<String> dataTime = new ArrayList<String>();
				
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
				for(RiverWaterLevelEntity rEntity : riverWaterLevelEntities){
					
					waterLeval.add(rEntity.getWaterLevel());
					rateOfFlow.add(rEntity.getRateOfFlow());
					
					Date time = rEntity.getTime();
					String timeString = formatter.format(time);
					dataTime.add(timeString);
				}
				echartsData.add(waterLeval);
				echartsData.add(rateOfFlow);
				
				resultMsg.setStatus(0);
				resultMsg.setDataSub(dataTime);
				resultMsg.setData(echartsData);
				return resultMsg;
			}else{
				resultMsg.setStatus(0);
				resultMsg.setMsg("该站当前时间段内无上报数据");
				return resultMsg;
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
}
