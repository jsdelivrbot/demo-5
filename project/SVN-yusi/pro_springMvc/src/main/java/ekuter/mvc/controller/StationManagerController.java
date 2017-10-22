package ekuter.mvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import ekuter.mvc.util.CreateStationParamDataUtil;
import ekuter.mvc.util.ResultMessageUtil;
import mybatisPro.mybatisEntity.ParamCodeEntity;
import mybatisPro.mybatisEntity.StationEntity;
import mybatisPro.mybatisService.impl.StationService;

/**
 * 测站信息管理
 * @author si.yu
 * @date 2017/7/17
 * @version 1.0
 * */
@RestController
@RequestMapping("station")
public class StationManagerController {
	
	private static final Logger logger=LoggerFactory.getLogger(StationManagerController.class);
	
	@Autowired
	private StationService stationService;
	
	/**
	 * 创建测站
	 * @param stationEntity
	 * @return
	 * */
	@RequestMapping("createStation")
	@ResponseBody
	public ResultMessageUtil createStation(@RequestBody CreateStationParamDataUtil stationParamData){
		
		StationEntity stationEntity = stationParamData.getStationEntity();
		
		List<ParamCodeEntity> codeEntities = stationParamData.getCodeEntities();
		
		if(null != stationEntity || null != codeEntities){
			stationEntity.setTime_off(1);
			//测站区分(人工站/自动站)
			Integer station_category = stationEntity.getStation_type();
			
			if(null == station_category){
				logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			}else if(Constants.MAN_MADE_STATION.intValue() != station_category.intValue() && 
					Constants.AUTOMATIC_STATION.intValue() != station_category.intValue()){
				logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			}
			
			ResultMessageUtil resultMsg = new ResultMessageUtil();
			
			String error = null;
			
			error = checkStationForm(stationEntity);
			
			if(null != error){ 
				resultMsg.setStatus(1);
				resultMsg.setMsg(error);
				return resultMsg;
			}else{
				if(Constants.MAN_MADE_STATION.intValue() != station_category.intValue()){
					Long  sta_type = stationEntity.getStation_type_id();
					String sys_code = null;
					if(Constants.RAINFALL_STATION.longValue() == sta_type.longValue() || 
							Constants.WATER_LEVEL_STATION.longValue() == sta_type.longValue() || 
							Constants.SOIL_MOISTURE_STATION.longValue() == sta_type.longValue()){
						
						
						for(ParamCodeEntity codeEntity : codeEntities){
							String paramCode = codeEntity.getParam_id();
							if(null != paramCode && 14 == paramCode.length()){
								sys_code = paramCode.substring(0, 4);
							}else{
								resultMsg.setStatus(1);
								resultMsg.setMsg("参数编码格式有误（请输入14位标准参数编码）");
								return resultMsg;
							}
							
						}
						stationEntity.setSys_code(sys_code); 
					}else if(Constants.WATER_RAINFALL_STATION.longValue() == sta_type.longValue() || 
							Constants.SOIL_RAINFALL_STATION.longValue() == sta_type.longValue()){
						List<String> sys_code_list = new ArrayList<String>();
						for(ParamCodeEntity codeEntity : codeEntities){
							String paramCode = codeEntity.getParam_id();
							
							if(paramCode.length() != 14 || null == paramCode){
								
								resultMsg.setStatus(1);
								resultMsg.setMsg("参数编码格式有误（请输入14位标准参数编码）");
								return resultMsg;
								
							}else{
								sys_code = paramCode.substring(0, 4);
								sys_code_list.add(sys_code);
							}
						}
						String paramId = sys_code_list.get(0);
						for(String sys_param : sys_code_list){
							if(paramId.equals(sys_param)){
								stationEntity.setSys_code(sys_param); 
							}else{
								resultMsg.setStatus(1);
								resultMsg.setMsg("参数编码中测站号不一致");
								return resultMsg;
							} 
						}
					}
					
					StationEntity sEntity = 
							stationService.findStationInfoBySysCode(sys_code);
					if(null != sEntity){
						resultMsg.setStatus(1);
						resultMsg.setMsg("测站号已存在");
						return resultMsg;
					}
				}
				
				String sta_name = stationEntity.getStation_name();
				boolean findByName = 
						stationService.findStationInfoByStaName(sta_name);
				if(findByName){
					resultMsg.setStatus(1);
					resultMsg.setMsg("测站名称已存在");
					return resultMsg;
				}else{
					boolean createFlag = 
							stationService.createStation(stationEntity,codeEntities);
					
					if(createFlag){ 
						resultMsg.setStatus(0);
						resultMsg.setMsg("Create success!");
						return resultMsg;
					}else{
						logger.info(Constants.EXCEPTION_MAP.get("CREATESTATIONFAIL"));
						throw new BusinessException(Constants.EXCEPTION_MAP.get("CREATESTATIONFAIL"));
					}
				}
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}



	/**
	 * 查询测站列表
	 * @param station_type(区分人工站和自动站查询)
	 * @return
	 * */
	@RequestMapping("getStationList")
	public ResultMessageUtil getStationList(Integer station_type){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		List<Map<String, Object>> stationEntities = 
				stationService.getStationList(station_type);
		
		if(null != stationEntities){
			resultMsg.setStatus(0);
			resultMsg.setData(stationEntities);
			return resultMsg;
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("GETSTATIONLIST"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("GETSTATIONLIST"));
		}
	}
	
	/**
	 * 查询测站信息详情
	 * @param stationId
	 * @return stationEntity
	 * */
	@RequestMapping("getStationInfoDetail")
	public ResultMessageUtil findStationInfoById(Long stationId){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != stationId){
			Map<String, Object> stationEntity = 
					stationService.getStationInfoById(stationId);
			List<ParamCodeEntity> paramCodeList = 
					stationService.getParamCodeListByStaId(stationId);
			if(null != stationEntity || null != paramCodeList){
				resultMsg.setStatus(0);
				resultMsg.setData(stationEntity);
				resultMsg.setDataSub(paramCodeList);
				return resultMsg;
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	/**
	 * 测站信息修改
	 * @param stationEntity
	 * @return
	 * */
	@RequestMapping("updateStationInfo")
	public ResultMessageUtil updateStationInfo(StationEntity stationEntity){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		//定义表单检测错误信息
		String error = null;
		//检测修改测站ID参数的合法性
		Long stationId = stationEntity.getId();
		
		if(null != stationId){
			
			error = checkStationForm(stationEntity);
			
			if(null == error){
				//提交修改测站信息请求
				boolean updateFlag = 
						stationService.updateStationInfo(stationEntity);
				
				if(updateFlag){
					resultMsg.setStatus(0);
					resultMsg.setMsg("update success!");
					return resultMsg;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("UPDATESTATIONINFO"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("UPDATESTATIONINFO"));
				}
			}else{
				resultMsg.setStatus(1);
				resultMsg.setMsg(error);
				return resultMsg;
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	/**
	 * 查询所有雨量测站的列表信息
	 * @param begin_time
	 * @param end_time
	 * @param type_id
	 * @return
	 * */
	@RequestMapping("rainfallStationList")
	public ResultMessageUtil getRainFallStationInfoList(String begin_time,String end_time){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != begin_time || null != end_time){
			
			List<Long> rainFallStaIdList = new ArrayList<Long>();
			//查询所有雨量站id List
			List<Long> rainIdList_rain = stationService.getStationIdByTypeId(Constants.RAINFALL_STATION);
			//查询所有河道水文站id List
			List<Long> rainIdList_soil = stationService.getStationIdByTypeId(Constants.SOIL_RAINFALL_STATION);
			//查询所有水库水文站id List
			List<Long> rainIdList_water = stationService.getStationIdByTypeId(Constants.WATER_RAINFALL_STATION);
			
			if(null != rainIdList_rain || null != rainIdList_soil || null != rainIdList_water){
				
				rainFallStaIdList.addAll(rainIdList_rain);
				rainFallStaIdList.addAll(rainIdList_soil);
				rainFallStaIdList.addAll(rainIdList_water);
				
				if(!rainFallStaIdList.isEmpty()){
					
					List<Map<String, Object>> rainFallList = new ArrayList<Map<String, Object>>();
					//循环遍历雨量站ID列表，查询各站雨量信息
					for(Long staId : rainFallStaIdList){
						//根据测站ID查询该站在该时间段内的雨量总计
						Map<String, Object> rainFall =
								stationService.getRainfallStationList(begin_time, end_time, staId);
						
						if(null != rainFall){
							rainFallList.add(rainFall);
						}else{
							//若该站在当前时间段内没有统计数据，则只返回测站数据
							Map<String, Object> rainFallStaInfo = new HashMap<String, Object>();
							//根据测站ID查询测站信息
							Map<String, Object> sEntity = 
									stationService.getStationInfoById(staId);
							if(null != sEntity){
								rainFallStaInfo.put("id", sEntity.get("id"));
								rainFallStaInfo.put("sys_code", sEntity.get("sys_code"));
								rainFallStaInfo.put("station_name", sEntity.get("station_name"));
								rainFallStaInfo.put("station_location", sEntity.get("station_location"));
								rainFallStaInfo.put("station_type", sEntity.get("station_type"));
								rainFallStaInfo.put("x", sEntity.get("x"));
								rainFallStaInfo.put("y", sEntity.get("y"));
								rainFallStaInfo.put("typeName", sEntity.get("type_name"));
								rainFallList.add(rainFallStaInfo);
							}else{
								logger.info(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
								throw new BusinessException(Constants.EXCEPTION_MAP.get("STATIONINFODETAIL"));
							}
						}
					}
					resultMsg.setData(rainFallList);
					resultMsg.setStatus(0);
					return resultMsg;
					
				}else{
					resultMsg.setMsg("该水库未布置雨量站！");
					resultMsg.setStatus(0); 
					return resultMsg;
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("RAINIDLIST"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("RAINIDLIST"));
			}
			
//			List<Map<String, Object>> infoList = new ArrayList<Map<String, Object>>();
//			//查询所有雨量站信息
//			List<Map<String, Object>> infoList_rainSta = new ArrayList<Map<String, Object>>();
//			infoList_rainSta = stationService.getRainfallStationList(begin_time,end_time, Constants.RAINFALL_STATION);
//			//如果所有
//			if(infoList_rainSta.isEmpty()){
//				infoList_rainSta = stationService.getStationInfoByTypeId(Constants.RAINFALL_STATION);
//			}
//			//查询所有河道水文站的测试雨量数据
//			List<Map<String, Object>> infoList_soilSta = 
//					stationService.getRainfallStationList(begin_time,end_time, Constants.SOIL_RAINFALL_STATION);
//			//查询所有水库水文站的测试雨量数据
//			List<Map<String, Object>> infoList_waterSta = 
//					stationService.getRainfallStationList(begin_time,end_time, Constants.WATER_RAINFALL_STATION);
//			
//			if(null != infoList_rainSta || null != infoList_soilSta || null != infoList_waterSta){
//				infoList.addAll(infoList_rainSta);
//				infoList.addAll(infoList_soilSta);
//				infoList.addAll(infoList_waterSta);
//				
//				resultMsg.setData(infoList);
//				resultMsg.setStatus(0);
//				return resultMsg;
//			}else {
//				logger.info(Constants.EXCEPTION_MAP.get("RAINFALLSTATION"));
//				throw new BusinessException(Constants.EXCEPTION_MAP.get("RAINFALLSTATION"));
//			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	
	/**
	 * 删除测站
	 * @param sta_id 测站ID
	 * @return
	 * */
	@RequestMapping("deleteStation")
	public ResultMessageUtil deleteStationInfo(Long sta_id){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != sta_id){
			//根据测站ID查询测站信息
			Map<String, Object> stationEntity = 
					stationService.getStationInfoById(sta_id);
			
			if(null != stationEntity){
				//获取测站类型id、测站区域、自动站/人工站区分
				Integer stationType = (Integer) stationEntity.get("station_type");
				Long area_id = (Long) stationEntity.get("area_id");
				Long sta_type_id = (Long) stationEntity.get("station_type_id");
				
				//区分测站为自动站、人工站
				if(Constants.MAN_MADE_STATION.intValue() == stationType.intValue()){
					
					boolean delFlag = 
							stationService.deleteManMadeStation(sta_id, sta_type_id);
					
					if(delFlag){
						resultMsg.setMsg("delete success!");
						resultMsg.setStatus(0);
						return resultMsg;
					}else{
						logger.info(Constants.EXCEPTION_MAP.get("DELETE_FAILED"));
						throw new BusinessException(Constants.EXCEPTION_MAP.get("DELETE_FAILED"));
					}
					
				}else if(Constants.AUTOMATIC_STATION.intValue() == stationType.intValue()){//删除自动站
					
					boolean delFlag = 
							stationService.deleteAutoStation(sta_id, sta_type_id, area_id);
					
					if(delFlag){
						resultMsg.setMsg("delete success!");
						resultMsg.setStatus(0);
						return resultMsg;
					}else{
						logger.info(Constants.EXCEPTION_MAP.get("DELETE_FAILED"));
						throw new BusinessException(Constants.EXCEPTION_MAP.get("DELETE_FAILED"));
					}
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("DATAERROR"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("DATAERROR"));
				}
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("EX_STATION_INFO"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATION_INFO"));
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}

	/**
	 * 测站信息表单验证
	 * @param stationEntity
	 * @return error
	 * */
	private String checkStationForm(StationEntity stationEntity) {
		
		String error = null;
		
		//国家标准码
		String stcd = stationEntity.getStcd();
		//测站名称
		String station_name = stationEntity.getStation_name();
		//横坐标
		Float x = stationEntity.getX();
		//纵坐标
		Float y = stationEntity.getY();
		//拍报段次
		Integer time_off = stationEntity.getTime_off();
		//测站类型
		Long stationType = stationEntity.getStation_type_id();
		//区域码
		Long area_id = stationEntity.getArea_id();
		
		if("".equals(station_name) || null == station_name){
			error = "请输入测站名称";
		}else if(stcd.length() > 8){
			error = "请输入8位国家标准码";
		}else if(null == x){
			error = "横坐标不能为空";
		}else if(null == y){
			error = "纵坐标不能为空";
		}else if(null == stationType){
			error = "请选择测站类型";
		}else if(null == area_id){
			error = "请选择区域";
		}else if(null == time_off){
			
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}else if(Constants.ONE_TIME.intValue() != time_off.intValue() && 
				Constants.TWO_TIME.intValue() != time_off.intValue() && 
				Constants.FOUR_TIME.intValue() != time_off.intValue() && 
				Constants.SIX_TIME.intValue() != time_off.intValue()){
			
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			
		}
		
		return error;
	} 
}
