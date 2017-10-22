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
import mybatisPro.myBatisDao.WzRiverRsvrMapper;
import mybatisPro.mybatisEntity.WzRiverRsvrEntity;

/**
 * 河道水位数据整编
 * 
 * @author feng.gao
 * @date 2017年8月25日
 * @version 1.0
 */
public class RiverWaterReorganize {

	private static final Logger logger = LoggerFactory.getLogger(RiverWaterReorganize.class);

	/**
	 * 获取河道水位信息
	 * 
	 * @return
	 */
	public static List<WzRiverRsvrEntity> getRiverInfo() {
		try {
			return SqlSessionHander.SqlExecute(sqsession -> {
				AllDataCMapper mapper = sqsession.getMapper(AllDataCMapper.class);
				List<WzRiverRsvrEntity> rsvr_info = mapper.getRsvDataInfo(DataTag.WZ_RIVER);
				return rsvr_info;
			});
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 河道水位数据导入
	 * 
	 * @return
	 */
	public static boolean importRiverInfo() {
		List<WzRiverRsvrEntity> list_info = getRiverInfo();
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
						mapper.impRiverDataInfo(list_info.subList(index, batchLastIndex));
						sqlsession.commit();
						break;
					} else {
						mapper.impRiverDataInfo(list_info.subList(index, batchLastIndex));
						sqlsession.commit();
						// 清理缓存，防止溢出
						sqlsession.clearCache();
						index = batchLastIndex;
						batchLastIndex = index + (batchCount - 1);
					}
				}
				// 更新处理状态
				List<Long> rsvr_id = data_mapper.getRiverRsvrDataId(DataTag.WZ_RIVER);
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
