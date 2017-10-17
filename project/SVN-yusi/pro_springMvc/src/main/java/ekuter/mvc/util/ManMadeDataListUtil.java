package ekuter.mvc.util;

import java.util.List;

/**
 * 人工报讯参数接收工具类
 * @author si.yu
 * @date 2017/08/18
 * @version 1.0
 * */
public class ManMadeDataListUtil {

	private String reportTime;//上报时间
	
	private List<ManMadeStationDataUtil> manMadeData;

	
	public String getReportTime() {
		return reportTime;
	}

	public void setReportTime(String reportTime) {
		this.reportTime = reportTime;
	}

	public List<ManMadeStationDataUtil> getManMadeData() {
		return manMadeData;
	}

	public void setManMadeData(List<ManMadeStationDataUtil> manMadeData) {
		this.manMadeData = manMadeData;
	}
	
	
}
