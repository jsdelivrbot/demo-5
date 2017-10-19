package mybatisPro.mybatisService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.StationTypeMapper;
import mybatisPro.mybatisEntity.StationTypeEntity;
import mybatisPro.mybatisService.impl.StationTypeService;

/**
 * 测站类型业务层实现类
 * @author si.yu
 * @date 2017/7/24
 * @version 1.0
 * */
@Service
public class StationTypeServiceImpl implements StationTypeService{

	private static final Logger logger=LoggerFactory.getLogger(StationTypeServiceImpl.class);
	
	/**
	 * 查询测站类型列表
	 * @return
	 * */
	@Override
	public List<StationTypeEntity> getStationTypeList() {
		try {
			return SqlSessionHander.SqlExecute(sqlsession->{
				StationTypeMapper typeMapper = sqlsession.getMapper(StationTypeMapper.class);
				List<StationTypeEntity> typeEntities = typeMapper.getListOfStationType();
				return typeEntities;
			});
		} catch (Exception e) {
			logger.info(e.getMessage());
			throw new BusinessException(Constants.EXCEPTION_MAP.get("EX_TYPESTATION_1"));
		}
	}

}
