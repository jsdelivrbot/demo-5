package ekuter.mvc.controller;

import java.util.ArrayList;
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
import ekuter.mvc.util.StatusDataReturnUtil;
import mybatisPro.mybatisEntity.StationStatusEntity;
import mybatisPro.mybatisService.impl.StationService;
import mybatisPro.mybatisService.impl.StationStatusService;

/**
 * 测站状态统计控制类
 * @author si.yu
 * @date 2017/08/31
 * @version 1.0
 * */
@RestController
@RequestMapping("stationStatus")
public class StationStatusController {

	private static final Logger logger = LoggerFactory.getLogger(StationStatusController.class);
	
	@Autowired
	private StationStatusService statusService;
	
	@Autowired
	private StationService stationService;
	
	/**
	 * 测站状态查询（mouth）
	 * @param time
	 * @return 
	 * */
	@RequestMapping("getStatusInfoList")
	public ResultMessageUtil getStatusInfoList(String begin_time,String end_time){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != begin_time || null != end_time){
			
			//查询所有自动站测站列表信息
			List<Map<String, Object>> stationList = 
					stationService.getStationList(Constants.AUTOMATIC_STATION);
			
			List<StatusDataReturnUtil> statusDataReturnList = new ArrayList<StatusDataReturnUtil>();
			
			if(null != stationList){
				
				//遍历所有测站
				for(Map<String, Object> station : stationList){
					
					StatusDataReturnUtil statusDataReturn = new StatusDataReturnUtil();
					//获取测站ID
					Long sta_id = (Long) station.get("id");
					String sta_name = (String) station.get("station_name");
					//根据测站ID查询测站状态
					List<StationStatusEntity> statusEntities = 
							statusService.getStationStatusList(sta_id,begin_time, end_time);
					
					if(null != statusEntities){
						statusDataReturn.setSta_id(sta_id);
						statusDataReturn.setSta_name(sta_name);
						statusDataReturn.setStatusList(statusEntities);
					}
					statusDataReturnList.add(statusDataReturn);
				}
				resultMsg.setData(statusDataReturnList);
				resultMsg.setStatus(0);
				resultMsg.setMsg("search success!");
				return resultMsg;
				
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("GETSTATIONLIST"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("GETSTATIONLIST"));
			}
			
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
}
