package ekuter.mvc.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import ekuter.mvc.util.ResultMessageUtil;
import mybatisPro.mybatisEntity.StationTypeEntity;
import mybatisPro.mybatisService.impl.StationTypeService;

/**
 * 测站类型管理
 * @author si.yu
 * @date 2017/7/24
 * @version 1.0
 * */
@RestController
@RequestMapping("stationType")
public class StationTypeController {

	private static final Logger logger = LoggerFactory.getLogger(StationTypeController.class);
	
	@Autowired
	private StationTypeService typeService;
	
	/**
	 * 查询测站类型列表
	 * @return
	 * */
	@RequestMapping("getTypeList")
	public ResultMessageUtil getListOfStationType(){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		List<StationTypeEntity> typeEntities = 
				typeService.getStationTypeList();
		
		if(null != typeEntities){
			resultMsg.setData(typeEntities);
			resultMsg.setStatus(0);
			return resultMsg;
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("GETTYPELIST"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("GETTYPELIST"));
		}
	}
}
