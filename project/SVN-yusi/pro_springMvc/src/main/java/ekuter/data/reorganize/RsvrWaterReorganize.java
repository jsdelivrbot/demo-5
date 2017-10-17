package ekuter.data.reorganize;

import java.io.IOException;
import java.util.List;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import mybatisPro.dataBase.GetSqlSessionFactory;
import mybatisPro.dataBase.SqlSessionHander;
import mybatisPro.myBatisDao.AllDataCMapper;
import mybatisPro.myBatisDao.WaterStorRelaMapper;
import mybatisPro.myBatisDao.WzRiverRsvrMapper;
import mybatisPro.mybatisEntity.WzRiverRsvrEntity;

/**
 * 水库水位数据整编
 * 
 * @author feng.gao
 * @date 2017年8月25日
 * @version 1.0
 */
public class RsvrWaterReorganize {

	private static final Logger logger = LoggerFactory.getLogger(RiverWaterReorganize.class);

	/**
	 * 获取水库水位信息
	 * 
	 * @return
	 */
	public static List<WzRiverRsvrEntity> getRsvrInfo() {
		try {
			return SqlSessionHander.SqlExecute(sqlsession -> {
				AllDataCMapper mapper = sqlsession.getMapper(AllDataCMapper.class);
				WaterStorRelaMapper water_mapper = sqlsession.getMapper(WaterStorRelaMapper.class);
				List<WzRiverRsvrEntity> rsvr_info = mapper.getRsvDataInfo(DataTag.WZ_RSVE);
				rsvr_info.forEach(entity -> {
					// 设置库容
					Float waterLevel = entity.getWaterLevel();
					if (waterLevel.floatValue() > DataTag.MAX_STO_CAP) {
						entity.setStorageCapacity(null);
					} else if (waterLevel.floatValue() < DataTag.MIN_STO_CAP) {
						entity.setStorageCapacity(0.0f);
					} else {
						Float storage_capa = water_mapper.getStorageCapacity(waterLevel);
						entity.setStorageCapacity(storage_capa);
					}
				});
				return rsvr_info;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 水库水位数据导入
	 * 
	 * @return
	 */
	public static boolean importRsvrInfo() {
		List<WzRiverRsvrEntity> list_info = getRsvrInfo();
		if (list_info != null && !list_info.isEmpty()) {
			SqlSession sqlsession = null;
			try {
				sqlsession = GetSqlSessionFactory.getInstance().openSession(ExecutorType.BATCH);
				WzRiverRsvrMapper mapper = sqlsession.getMapper(WzRiverRsvrMapper.class);
				AllDataCMapper data_mapper = sqlsession.getMapper(AllDataCMapper.class);
				// 每批commit个数
				int batchCount = 1000;
				// 每批最后一个下标
				int batchLastIndex = batchCount;
				for (int index = 0; index < list_info.size();) {
					if (batchLastIndex >= list_info.size()) {
						batchLastIndex = list_info.size();
						mapper.impRsvDataInfo(list_info.subList(index, batchLastIndex));
						sqlsession.commit();
						break;
					} else {
						mapper.impRsvDataInfo(list_info.subList(index, batchLastIndex));
						sqlsession.commit();
						// 清理缓存，防止溢出
						sqlsession.clearCache();
						index = batchLastIndex;
						batchLastIndex = index + (batchCount - 1);
					}
				}
				// 更新处理状态
				List<Long> rsvr_id = data_mapper.getRiverRsvrDataId(DataTag.WZ_RSVE);
				if (null != rsvr_id && !rsvr_id.isEmpty()) {
					data_mapper.updateUndistincInfo(rsvr_id);
				}
				sqlsession.commit();
				return true;
			} catch (Exception e) {
				sqlsession.rollback();
				logger.error(e.getMessage());
			} finally {
				sqlsession.close();
			}
		}
		return false;

	}
}
