package ekuter.mvc.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ekuter.mvc.constants.Constants;
import ekuter.mvc.exception.BusinessException;

/**
 * <P>
 * 时间操作工具类
 * 
 * @author feng.gao
 * @date 2017/01/04 16:36
 */
public class DateUtil {

	private static final Logger logger = LoggerFactory.getLogger(DateUtil.class);

	public static final String[] hour_info = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
			"14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "0" };

	public static final String[] year_info = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Octb",
			"Nov", "Dece", };

	/**
	 * 大月天数
	 */
	public static final String[] big_days_info = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
			"14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
			"31" };
	/**
	 * 小月天数
	 */
	public static final String[] small_days_info = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
			"13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
			"30" };
	/**
	 * 平年二月天数
	 */
	public static final String[] leap_info = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
			"14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28" };
	/**
	 * 闰年二月天数
	 */
	public static final String[] app_info = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14",
			"15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29" };

	/**
	 * 获取当前系统时间
	 * <p>
	 * 返回前N天日期
	 * 
	 * @return
	 */
	public String getFutureDates(String days) {

		SimpleDateFormat simpledate = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = simpledate.parse(days);
		} catch (ParseException e) {
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, +1);
		String times = simpledate.format(calendar.getTime()) + " " + "07:00:00";
		return times;
	}

	/**
	 * 获取前N天时间日期
	 * 
	 * @param days
	 * @return
	 */
	public static String getBeforeTime(int days) {
		SimpleDateFormat simpledate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -days);
		String day_time = simpledate.format(calendar.getTime());
		return day_time;
	}

	/**
	 * 获取月份天数
	 * 
	 * @param months_date
	 * @return
	 */
	public String[] checkMonthsInfo(String months_date) {
		SimpleDateFormat simpledate = new SimpleDateFormat("yyyy-MM");
		Date date = null;
		try {
			date = simpledate.parse(months_date);
		} catch (ParseException e) {
			logger.info(Constants.EXCEPTION_MAP.get("PARAMERROR"));
			throw new BusinessException(Constants.EXCEPTION_MAP.get("PARAMERROR"));
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		// 获取年份
		int year = calendar.get(Calendar.YEAR);
		// 获取月份
		int months = calendar.get(Calendar.MONTH) + 1;
		switch (months) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return big_days_info;
		case 4:
		case 6:
		case 9:
		case 11:
			return small_days_info;
		case 2:
			if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
				return app_info;
			} else {
				return leap_info;
			}
		}
		return null;
	}

	/**
	 * 判断日期格式和范围
	 * 
	 * @param days
	 * @return
	 */
	public boolean checkDate(String days) {

		String rexp = "(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)";
		Pattern pat = Pattern.compile(rexp);
		Matcher mat = pat.matcher(days);
		boolean dateType = mat.matches();
		return dateType;
	}

	/**
	 * 判断月期格式
	 * 
	 * @param months
	 * @return
	 */
	public boolean checkMonth(String months) {
		String rexp = "^[0-9]{4}-(0?[0-9]|1[0-2])$";
		Pattern pat = Pattern.compile(rexp);
		Matcher mat = pat.matcher(months);
		boolean dateType = mat.matches();
		return dateType;
	}

	/**
	 * 雨量历史数据整编时间校验
	 * 
	 * @param time
	 * @return
	 */
	public static boolean checkTime(String time) {
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat formats = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar cal = Calendar.getInstance();
			int hour = cal.get(Calendar.HOUR_OF_DAY);
			String today = format.format(cal.getTime()) + " " + hour + ":" + "00" + ":" + "00";
			Long today_date = formats.parse(today).getTime();
			Long time_date = formats.parse(time).getTime();
			if (time_date.longValue() < today_date.longValue()) {
				return true;
			}
		} catch (ParseException e) {
			logger.error(e.getMessage());
		}
		return false;
	}
}
