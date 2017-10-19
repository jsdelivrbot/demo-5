package ekuter.mvc.controller;

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
import mybatisPro.mybatisService.impl.DataSupplementService;

/**
 * 自动站数据增补控制类
 * @author si.yu
 * @date 2017/09/01
 * @version 1.0
 * */
@RestController
@RequestMapping("dataSupplement")
public class DataSupplementController {

	private static final Logger logger=LoggerFactory.getLogger(DataSupplementController.class); 
	
	@Autowired
	private DataSupplementService supplementService;
	
	/**
	 * 根据测站ID，测站类型查询数据
	 * @param typeFlag
	 * @param sta_id
	 * @param begin_time
	 * @param end_time
	 * @return
	 * */
	@RequestMapping("getStationData")
	public ResultMessageUtil getStationData(Long sta_id,String typeFlag,String begin_time,String end_time){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != sta_id || null != typeFlag ||
				null != begin_time || null != end_time){
			
			if(typeFlag.equals(Constants.RESVOIR_STATION)){//水库水位
				
				List<Map<String, Object>> resvoirData = 
						supplementService.getResvoirStationData(sta_id, begin_time, end_time);
				if(null != resvoirData){
					resultMsg.setData(resvoirData);
					resultMsg.setStatus(0);
					return resultMsg;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_DATA"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_DATA"));
				}
				
			}else if(typeFlag.equals(Constants.RIVER_STATION)){//河道水位
				
				List<Map<String, Object>> riverData = 
						supplementService.getRiverStationData(sta_id, begin_time, end_time);
				if(null != riverData){
					resultMsg.setData(riverData);
					resultMsg.setStatus(0);
					return resultMsg;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_RIVER_DATA"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RIVER_DATA"));
				}
				
			}else if(typeFlag.equals(Constants.RAIN_STATION)){//雨量
				
				List<Map<String, Object>> rainfallData = 
						supplementService.getRainfallStationData(sta_id, begin_time, end_time);
				if(null != rainfallData){
					resultMsg.setData(rainfallData);
					resultMsg.setStatus(0);
					return resultMsg;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_RAIN_DATA"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RAIN_DATA"));
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
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
	@RequestMapping("addMonitorData")
	public ResultMessageUtil addMonitorData(String typeFlag,Long sta_id,String time,Float monitorData){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		String error = null;
		
		if(null == time){
			error  = "采集时间不能为空！";
		}else if(null == monitorData){
			error = "增补数据不能为空！";
		}
		
		if(null != error){
			
			resultMsg.setMsg(error);
			resultMsg.setStatus(1);
			return resultMsg;
		}else{
			
			if(null != typeFlag || null != sta_id){
				
				boolean insertFlag = 
						supplementService.insertDataSupplement(typeFlag, sta_id, time, monitorData);
				
				if(insertFlag){
					
					resultMsg.setStatus(0);
					resultMsg.setMsg("insert success!");
					return resultMsg;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_ADDDATASUPPLEMENT"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_ADDDATASUPPLEMENT"));
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			}
		}
	}
	
	
	/**
	 * 自动站修补数据
	 * @param typeFlag
	 * @param sta_id
	 * @param time
	 * @param monitorData
	 * @return 
	 * */
	@RequestMapping("updateMonitorData")
	public ResultMessageUtil updateMonitorData(String typeFlag,Long sta_id,Long data_id,String time,Float monitorData){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		String error = null;
		
		if(null == time){
			error  = "采集时间不能为空！";
		}else if(null == monitorData){
			error = "增补数据不能为空！";
		}
		
		if(null != error){
			
			resultMsg.setMsg(error);
			resultMsg.setStatus(1);
			return resultMsg;
		}else{
			
			if(null != typeFlag || null != data_id || null != sta_id){
				
				boolean updateFlag = 
						supplementService.updateDataSupplement(typeFlag,sta_id, data_id, time, monitorData);
				
				if(updateFlag){
					
					resultMsg.setStatus(0);
					resultMsg.setMsg("update success!");
					return resultMsg;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_UPDATEDATASUPPLEMENT"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_UPDATEDATASUPPLEMENT"));
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			}
		}
	}
}
