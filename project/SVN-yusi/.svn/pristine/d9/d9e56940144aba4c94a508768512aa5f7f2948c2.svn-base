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
import mybatisPro.mybatisEntity.AreaEntity;
import mybatisPro.mybatisService.impl.AreaService;

/**
 * 区域管理
 * @author si.yu
 * @date 2017/7/19
 * @version 1.0
 * */
@RestController
@RequestMapping("areaController")
public class AreaController {
	
	private static final Logger logger = LoggerFactory.getLogger(AreaController.class);
	
	@Autowired
	private AreaService areaService;

	/**
	 * 创建区域
	 * @param areaEntity
	 * @return
	 * */
	@RequestMapping("createArea")
	public ResultMessageUtil createArea(AreaEntity aEntity){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		String error = null;
		
		//创建区域时，区域平均降雨算法类型默认为算术平均算法（0）
		aEntity.setAlgorithmType(0);
		//检测提交区域表单信息
		error = checkAreaFrom(aEntity);
		
		if(null != error){
			resultMsg.setStatus(1);
			resultMsg.setMsg(error);
			return resultMsg;
		}else{
			//检测新建区域名称是否重复
			String area_name = aEntity.getArea_name();
			boolean nameFlag = areaService.findAreaInfoByName(area_name);
			
			if(nameFlag){
				resultMsg.setStatus(1);
				resultMsg.setMsg("区域名称已存在");
				return resultMsg;
			}else{
				boolean createFlag = 
						areaService.createArea(aEntity);
				if(createFlag){
					resultMsg.setStatus(0);
					resultMsg.setMsg("Create success!");
					return resultMsg;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("CREATEAREA"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("CREATEAREA"));
				}
			}
		}
	}
	
	/**
	 * 获取区域列表
	 * @return
	 * */
	@RequestMapping("getListOfArea")
	public ResultMessageUtil getListOfArea(){
		
		 ResultMessageUtil resultMsg = new ResultMessageUtil();
		 
		 List<AreaEntity> areaEntities = 
				 areaService.findListOfArea();
		 
		 if(null != areaEntities){
			 resultMsg.setData(areaEntities);
			 resultMsg.setStatus(0);
			 return resultMsg;
		 }else{
			 logger.info(Constants.EXCEPTION_MAP.get("GETLISTAREA"));
			 throw new BusinessException(Constants.EXCEPTION_MAP.get("GETLISTAREA"));
		 }
	}
	
	/**
	 * 查询区域信息详情
	 * @param areaId
	 * @return
	 * */
	@RequestMapping("getAreaDetailInfo")
	public ResultMessageUtil getDetailInfoOfArea(Long areaId){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		//检测前台传参
		if(null != areaId){
			
			AreaEntity aEntity = 
					areaService.getAreaInfoDetail(areaId);
			if(null != aEntity){
				resultMsg.setData(aEntity);
				resultMsg.setStatus(0);
				return resultMsg;
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("DETAILAREA"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("DETAILAREA"));
			}
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
	}
	
	/**
	 * 修改区域信息
	 * @param utilEntity
	 * @return
	 * */
	@RequestMapping("updateAreaInfo")
	public ResultMessageUtil updateAreaInfo(AreaEntity aEntity){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		String area_name = aEntity.getArea_name();
		if("".equals(area_name)|| null == area_name){
			resultMsg.setMsg("区域名称不可为空");
			resultMsg.setStatus(1);
			return resultMsg;
		}else{
			boolean updateFlag = 
					areaService.updateAreaInfo(aEntity);
			
			if(updateFlag){
				resultMsg.setMsg("update success!");
				resultMsg.setStatus(0);
				return resultMsg;
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("UPDATEAREAINFO"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("UPDATEAREAINFO"));
			}
		}
	}

	/**
	 * 检测创建/修改区域信息表单
	 * @param aEntity
	 * @return error
	 * */
	private String checkAreaFrom(AreaEntity aEntity) {
		
		String error = null;
		
		String area_name = aEntity.getArea_name();//获取区域名称
		Integer algorithmType = aEntity.getAlgorithmType();//获取区域平均雨量算法类型
		
		if("".equals(area_name) || null == area_name){
			error = "请填写区域名称";
		}else if(null == algorithmType){
			error = "算法类型不能为空";
		}
		return error;
	}
}
