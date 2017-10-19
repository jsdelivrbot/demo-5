package mybatisPro.dataBase;

import java.io.IOException;
import org.apache.ibatis.session.SqlSession;

/**
 * <P>
 * sqlsession功能抽象（保证sqlsession执行完毕被关闭）
 * @author si.yu
 */
public class SqlSessionHander {

	@FunctionalInterface
	public interface Handler<RET> {
		RET handle(SqlSession sqlsession);
	}
	
	public static <RET> RET SqlExecute(Handler<RET> func) throws IOException {
		SqlSession sqlsession = GetSqlSessionFactory.getInstance().openSession();
		RET ret = func.handle(sqlsession);
		sqlsession.close();

		return ret;
	}
}
