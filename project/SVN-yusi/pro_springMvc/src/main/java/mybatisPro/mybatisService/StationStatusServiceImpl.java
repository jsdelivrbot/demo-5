package mybatisPro.mybatisService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.StationStatusMapper;
import mybatisPro.mybatisEntity.StationStatusEntity;
import mybatisPro.mybatisService.impl.StationStatusService;

/**
 * 测站状态统计业务层实现类
 * @author si.yu
 * @date 2017/08/31
 * @version 1.0
 * */
@Service
public class StationStatusServiceImpl implements StationStatusService{

	private static final Logger logger=LoggerFactory.getLogger(StationStatusServiceImpl.class);
	
	
	/**
	 * 测站状态查询（mouth）
	 * @param begin_time
	 * @param end_time
	 * @return 
	 * */
	@Override
	public List<StationStatusEntity> getStationStatusList(Long sta_id, String begin_time, String end_time) {
		try {
			return SqlSessionHander.SqlExecute(sqlsession ->{
				
				StationStatusMapper stationStatusMapper = sqlsession.getMapper(StationStatusMapper.class);
				List<StationStatusEntity> statusEntities = 
						stationStatusMapper.getStationStatusList(sta_id,begin_time, end_time);
				if(null != statusEntities){
					return statusEntities;
				}else{
					logger.info(Constants.EXCEPTION_MAP.get("EX_STATIONSTATUS"));
					throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATIONSTATUS"));
				}
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_STATIONSTATUS"));
		}
	}

}
