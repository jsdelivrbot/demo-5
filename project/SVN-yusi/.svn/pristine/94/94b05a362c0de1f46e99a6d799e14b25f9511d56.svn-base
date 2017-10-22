package mybatisPro.dataBase;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * 获取sqlserver sessionfactory
 * 
 * @author feng.gao
 * @date 2017年8月30日
 * @version 1.0
 */
public class GetSqlSerSesssionFactory {

	private static SqlSessionFactory sqlsessionfactory;

	private final static String SQLSERVER_ENVIRONMENT_ID = "sqlserver";

	private GetSqlSerSesssionFactory() {
	}

	public static synchronized SqlSessionFactory getInstance() throws IOException {
		if (null == sqlsessionfactory) {
			try {
				ClassLoader classloader = Thread.currentThread().getContextClassLoader();
				InputStream inputStream = classloader.getResourceAsStream("config.xml");
				sqlsessionfactory = new SqlSessionFactoryBuilder().build(inputStream, SQLSERVER_ENVIRONMENT_ID);
			} catch (Exception e) {
				// logger.error(e.getMessage());
				throw new IOException(e);
			}
		}
		return sqlsessionfactory;
	}

}
