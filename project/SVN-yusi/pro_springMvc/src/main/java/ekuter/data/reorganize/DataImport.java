package ekuter.data.reorganize;

import java.util.List;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import mybatisPro.dataBase.GetSqlSessionFactory;
import mybatisPro.dataBase.SqlSerSessionHander;
import mybatisPro.myBatisDao.AllDataCMapper;
import mybatisPro.mybatisEntity.AllDataCEntity;

/**
 * 数据导入
 * 
 * @author feng.gao
 * @date 2017年8月24日
 * @version 1.0
 */
public class DataImport {

	private static final Logger logger = LoggerFactory.getLogger(DataImport.class);

	/**
	 * 获取数据信息
	 * 
	 * @return
	 */
	public static List<AllDataCEntity> getDataInfo() {
		// 记录collecttime最大值
		// DataUtil.changeRainInfo();
		try {
			return SqlSerSessionHander.SqlExecute(sqlsession -> {
				AllDataCMapper mapper = sqlsession.getMapper(AllDataCMapper.class);
				// 获取上次记录最大ID值
				Long max_id_value = DataUtil.getMaxId();
				List<AllDataCEntity> data_info = null;
				if (null != max_id_value) {
					data_info = mapper.getAllDateInfo(max_id_value.toString());
				} else {
					data_info = mapper.getAllDateInfo(null);
				}
				// if (!data_info.isEmpty() && null != data_info) {
				// DataUtil.updateMaxFlag();
				// }
				return data_info;
			});
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	/**
	 * 数据导入
	 */
	public static boolean importData() {
		List<AllDataCEntity> data_info = getDataInfo();
		if (data_info != null && !data_info.isEmpty()) {
			SqlSession sqlsession = null;
			try {
				sqlsession = GetSqlSessionFactory.getInstance().openSession(ExecutorType.BATCH);
				AllDataCMapper mapper = sqlsession.getMapper(AllDataCMapper.class);
				// 每批commit个数
				int batchCount = 1000;
				// 每批最后一个下标
				int batchLastIndex = batchCount;
				for (int index = 0; index < data_info.size();) {
					if (batchLastIndex >= data_info.size()) {
						batchLastIndex = data_info.size();
						mapper.insertAllDateInfo(data_info.subList(index, batchLastIndex));
						sqlsession.commit();
						break;
					} else {
						mapper.insertAllDateInfo(data_info.subList(index, batchLastIndex));
						sqlsession.commit();
						// 清理缓存，防止溢出
						sqlsession.clearCache();
						index = batchLastIndex;
						batchLastIndex = index + (batchCount - 1);
					}
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
