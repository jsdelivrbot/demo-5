package ekuter.data.reorganize;

import java.util.Map;

public class DataTag {

	/**
	 * 最大ID值
	 */
	public static final String MAX_ID = "max_id";

	/**
	 * 最新时间
	 */
	public static final String NEW_TIME = "new_time";

	/**
	 * 河道
	 */
	public static final Integer WZ_RIVER = 3;

	/**
	 * 水库
	 */
	public static final Integer WZ_RSVE = 2;

	/**
	 * 雨量key前缀
	 */
	public static final String RAIN_KEY = "rain_key_";

	/**
	 * 采集时间
	 */
	public static final String COLLECT_TIME = "collect_time";

	/**
	 * 雨量值
	 */
	public static final String PARA_VALUE = "para_value";

	/**
	 * 水位最大值
	 */
	public static final Float MAX_STO_CAP = 85.00F;

	/**
	 * 水位最小值
	 */
	public static final Float MIN_STO_CAP = 44.00F;

	/**
	 * 雨量信息
	 */
	public static Map<String, Map<String, Object>> rain_info_map;

	/**
	 * 小时
	 */
	public static final String HOUR = "hour";

	/**
	 * 天
	 */
	public static final String DAY = "day";

	/**
	 * 月
	 */
	public static final String MONTHS = "months";

}
