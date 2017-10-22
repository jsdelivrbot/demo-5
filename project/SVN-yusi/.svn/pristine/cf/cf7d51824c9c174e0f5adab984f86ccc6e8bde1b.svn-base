package pro_mybatis;

import org.junit.Before;
import org.junit.Test;

import mybatisPro.mybatisService.RainfallStatisticsImpl;
import mybatisPro.mybatisService.impl.RainfallStatisticsService;

public class RainStatisticsTest {

	private RainfallStatisticsService rainService;

	@Before
	public void setUp() {
		rainService = new RainfallStatisticsImpl();
	}

	@Test
	public void rainInfoByYear() {
		System.out.println(rainService.statisticsByYear("2017", 6));
	}

	@Test
	public void rainInfoByHour() {
		System.out.println("=====>>>" + rainService.statisticsByDay("2017-08-16"));
	}

	@Test
	public void rainInfoByMonth() {
		System.out.println("=====>>>" + rainService.statisticsByMonth("2017-08", 6));
	}
}
