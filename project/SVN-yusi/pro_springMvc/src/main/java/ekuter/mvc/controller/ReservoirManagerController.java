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
import mybatisPro.mybatisEntity.ReservoirEntity;
import mybatisPro.mybatisService.impl.ReservoirManagerService;

/**
 * 水库信息管理类
 * @author si.yu
 * @date 2017/6/27
 * @version 1.0
 * */
@RestController
@RequestMapping("reservoir")
public class ReservoirManagerController {
	
	private static final Logger logger=LoggerFactory.getLogger(ReservoirManagerController.class);
	
	@Autowired
	private ReservoirManagerService reservoirService;

	/**
	 * 创建水库信息
	 * @param reservoirEntity
	 * @return
	 * */
	@RequestMapping("createReservoir")
	public ResultMessageUtil createReservoir(ReservoirEntity reservoirEntity){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		//检测表单数据
		String error  = checkFormData(reservoirEntity);
		
		if(null != error){
			resultMsg.setStatus(0);
			resultMsg.setMsg(error);
			return resultMsg;
		}else{
			//调用业务层接口创建水库信息
			boolean createFlag = 
					reservoirService.createReservoir(reservoirEntity);
			if(createFlag){
				resultMsg.setStatus(1);
				resultMsg.setMsg("Create success!");
				return resultMsg;
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("CREATERESERVOIRFAIL"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("CREATERESERVOIRFAIL"));
			}
		}
	}
	
	/**
	 * 获取水库列表数据
	 * @return
	 * */
	@RequestMapping("loadListOfReservoir")
	public ResultMessageUtil loadListOfReservoir(){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		List<ReservoirEntity> rEntities = 
				reservoirService.findListOfReservoir();
		
		resultMsg.setData(rEntities);
		
		return resultMsg;
	}

	/**
	 * 根据水库ID查询水库信息
	 * @param reservoirId
	 * @return reservoirEntity
	 * */
	@RequestMapping("loadReservoirInfoById")
	public ResultMessageUtil loadReservoirInfoById(Long reservoirId){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		if(null != reservoirId){
			
			ReservoirEntity rEntity = 
					reservoirService.findReservoirById(reservoirId);
			resultMsg.setData(rEntity);
			
			return resultMsg;
			
		}else{
			logger.info(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_PARAM"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_PARAM"));
		}
	}
	
	/**
	 * 根据水库ID更新水库信息
	 * @param reservoirEntity
	 * @return boolean
	 * */
	@RequestMapping("updateReservoirInfo")
	public ResultMessageUtil updateReservoirInfo(ReservoirEntity rEntity){
		
		ResultMessageUtil resultMsg = new ResultMessageUtil();
		
		//检测表单数据
		String error  = checkFormData(rEntity);
		
		if(null != error){
			resultMsg.setStatus(0);
			resultMsg.setMsg(error);
			return resultMsg;
		}else{
			
			boolean updateFlag = 
					reservoirService.updateReservoirInfo(rEntity);
			
			if(updateFlag){
				resultMsg.setStatus(1);
				resultMsg.setMsg("Create success!");
				return resultMsg;
			}else{
				logger.info(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_4"));
				throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_RESERVOIR_4"));
			}
		}
	}
	
	/**
	 * 检测表单数据
	 * @param reservoirEntity
	 * @return error
	 * */
	private String checkFormData(ReservoirEntity reservoirEntity) {
		
		String error = null;
		//获取表单需要验证数据
		String reservoirCode = reservoirEntity.getCnnmcd();//获取水库代码
		String reservoirName = reservoirEntity.getResnm();//获取水库名称
		String reservoirType = reservoirEntity.getRestp();//获取水库类型
		
		if(null == reservoirCode){
			return error = "请输入水库代码"; 
		}else if(reservoirCode.length() != 11){
			return error = "请输入正确水库代码";
		}else if(null == reservoirName){
			return error = "请输入水库名称";
		}else if(null == reservoirType){
			return error = "请选择水库类型";
		}else{
			return error;
		}
	}
}
