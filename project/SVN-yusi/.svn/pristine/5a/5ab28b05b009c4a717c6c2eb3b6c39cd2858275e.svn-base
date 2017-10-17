package ekuter.mvc.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ekuter.mvc.constants.Constants;

/**
 * <p>读取存储异常信息properties文件
 * @author si.yu
 * @date 2017/6/21
 * @version 1.0
 * */
public final class LoadExceProperties {

	private static Logger logger = LoggerFactory.getLogger(LoadExceProperties.class);
  
	/**
	 * @Description: 加载exception-conf.properties文件,
	 * 								并获取其中的内容(key-value) 
	 * @param properties_Path 
	 * */
	public static void loadExceptionFile(String properties_Path){
		
		String key = null;
		String value = null;  
		
		if (null == properties_Path || "".equals(properties_Path.trim())) {  
			logger.error("The file path is null,return");
      return;  
		} 
		
	// 获取资源文件  
    InputStream resourceFile = LoadExceProperties.class.getClassLoader()  
            .getResourceAsStream(properties_Path.trim());
    
    //属性列表  
    Properties prop = new Properties();
    
    try {  
      // 从输入流中读取属性列表  
      prop.load(new InputStreamReader(resourceFile, "utf-8"));  
    } catch (IOException e) {  
      logger.error("load file faile."+e);
      return;  
    } catch (Exception e) {  
    	logger.error("load file faile."+e);
      return;  
    }  
    
    // 返回Properties中包含的key-value的Set视图  
    Set<Entry<Object, Object>> set = prop.entrySet(); 
    
    // 返回在此Set中的元素上进行迭代的迭代器  
    Iterator<Map.Entry<Object, Object>> iter = set.iterator();
    
    while (iter.hasNext()) {  
      
      Entry<Object, Object> entry = iter.next();  

      key = String.valueOf(entry.getKey());  
      value = String.valueOf(entry.getValue());  

      key = key == null ? key : key.trim().toUpperCase();  
      value = value == null ? value : value.trim().toUpperCase();  
      // 将key-value放入map中  
      Constants.EXCEPTION_MAP.put(key, value); 
    }
	}
}
