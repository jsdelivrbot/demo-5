package ekuter.mvc.util;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import ekuter.data.reorganize.DataHistoryReo;
import ekuter.data.reorganize.DataImport;
import ekuter.data.reorganize.RainReorganize;
import ekuter.data.reorganize.RiverWaterReorganize;
import ekuter.data.reorganize.RsvrWaterReorganize;
import mybatisPro.mybatisEntity.RpPptnEntity;

/**
 * 数据整编
 * 
 * @author feng.gao
 * @date 2017年9月1日
 * @version 1.0
 */
@Component("data_reorganize")
public class DataReorganize {

	private static final Logger logger = LoggerFactory.getLogger(DataReorganize.class);

	/**
	 * 数据整编
	 */
	@Async
	public void dataReorganize() {
		// 数据导入
		boolean import_flag = DataImport.importData();
		if (import_flag) {
			// 河道水位数据整编
			boolean river_flag = RiverWaterReorganize.importRiverInfo();
			// 水库水位数据整编
			boolean rsvr_flag = RsvrWaterReorganize.importRsvrInfo();
			// 雨量数据整编
			boolean rain_flag = RainReorganize.importData();
		}
	}

	/**
	 * 增补数据
	 */
	public void dataHisReo() {
		DataHistoryReo history_reo = new DataHistoryReo();
		try {
			// 获取测站ID
			List<Long> get_sta_id = RainReorganize.getStaID();
			if (null != get_sta_id && !get_sta_id.isEmpty()) {
				get_sta_id.forEach(sta_id -> {
					String max_time = history_reo.getMaxTime(sta_id);
					if (null == max_time || max_time.isEmpty()) {
						return;
					}
					// 校验是否有增补数据
					List<String> history_info = history_reo.checkAddition(sta_id, max_time);
					if (null == history_info && history_info.isEmpty()) {
						return;
					}
					history_info.forEach(his_time -> {
						if (null == his_time || his_time.isEmpty()) {
							return;
						}
						// 校验该增补时间是否可整编
						boolean mark = DateUtil.checkTime(his_time);
						if (mark) {
							List<RpPptnEntity> history_data = history_reo.getAdditionData(his_time, sta_id);
							// 数据处理
							history_reo.updateHistoryData(history_data, sta_id, his_time);
						}
					});

				});
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
}
