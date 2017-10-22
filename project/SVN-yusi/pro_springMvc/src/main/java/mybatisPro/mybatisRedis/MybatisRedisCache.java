package mybatisPro.mybatisRedis;

import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.apache.ibatis.cache.Cache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
//import redis.clients.jedis.JedisPoolConfig;

public class MybatisRedisCache implements Cache{

	private static Logger logger = LoggerFactory.getLogger(MybatisRedisCache.class);  
//    private Jedis redisClient=createReids(); 
    
    /** The ReadWriteLock. */    
    private final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();   
      
    private String id;  
    
    private static JedisPool pool;
    
    public MybatisRedisCache(final String id) {    
        if (id == null) {  
            throw new IllegalArgumentException("Cache instances require an ID");  
        }  
        logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>MybatisRedisCache:id="+id);  
        this.id = id;  
        
        RedisConfig redisConfig = RedisConfigurationBuilder.getInstance().parseConfiguration();
    	pool = new JedisPool(redisConfig, redisConfig.getHost(), redisConfig.getPort(),
    			redisConfig.getConnectionTimeout(), redisConfig.getSoTimeout(), redisConfig.getPassword(),
    			redisConfig.getDatabase(), redisConfig.getClientName());
    } 
    
    private Object execute(RedisCallback callback) {
        Jedis jedis = pool.getResource();
        try {
          return callback.doWithRedis(jedis);
        } finally {
          jedis.close();
        }
      }
    
	@Override
	public String getId() {
		
		return this.id;  
	}

	@Override
	public void putObject(Object key, Object value) {
		
		logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>putObject:"+key+"="+value);  
//		redisConfig.set(SerializeUtil.serialize(key.toString()), SerializeUtil.serialize(value));  
		execute(new RedisCallback() {
		      @Override
		      public Object doWithRedis(Jedis jedis) {
		        jedis.hset(id.toString().getBytes(), key.toString().getBytes(), SerializeUtil.serialize(value));
		        return null;
		      }
		    });	
	}

	@Override
	public Object getObject(Object key) {
//		Object value = SerializeUtil.unserialize(redisClient.get(SerializeUtil.serialize(key.toString())));  
		return execute(new RedisCallback() {
		      @Override
		      public Object doWithRedis(Jedis jedis) {
		        Object value = SerializeUtil.unserialize(jedis.hget(id.toString().getBytes(), key.toString().getBytes()));
		        logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>getObject:"+key+"="+value); 
		        return value;
		      }
		    });
//        return value;  
	}

	@Override
	public Object removeObject(Object key) {
//		return redisClient.expire(SerializeUtil.serialize(key.toString()),0);  
		return execute(new RedisCallback() {
		      @Override
		      public Object doWithRedis(Jedis jedis) {
		        return jedis.hdel(id.toString(), key.toString());
		      }
		    });
	}

	@Override
	public void clear() {
		execute(new RedisCallback() {
		      @Override
		      public Object doWithRedis(Jedis jedis) {
		        jedis.del(id.toString());
		        return null;
		      }
		    });
	}

	@Override
	public int getSize() {
//		return Integer.valueOf(redisClient.dbSize().toString()); 
		return (Integer) execute(new RedisCallback() {
		      @Override
		      public Object doWithRedis(Jedis jedis) {
		        Map<byte[], byte[]> result = jedis.hgetAll(id.toString().getBytes());
		        return result.size();
		      }
		    });
	}

	@Override
	public ReadWriteLock getReadWriteLock() {
		return readWriteLock;  
	}

//	protected  static Jedis createReids(){  
//		try {
//	        pool = new JedisPool(new JedisPoolConfig(), "192.168.1.200");  
//	        return pool.getResource();  
//		} catch (Exception e) {
//            e.printStackTrace();
//        }
//		throw new RuntimeException("初始化连接池错误");
//    }  
}
