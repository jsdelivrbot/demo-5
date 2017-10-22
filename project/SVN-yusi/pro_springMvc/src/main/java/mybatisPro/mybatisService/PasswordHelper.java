package mybatisPro.mybatisService;

import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Service;

import mybatisPro.mybatisEntity.UserEntity;

/**
 * <p>用户创建密码加密的方法
 * @author EKuter-si.yu
 * @date 2017/6/26
 * @version 1.0
 * */
@Service
public class PasswordHelper {
	
	private RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();

//  @Value("${password.algorithmName}")
  private String algorithmName = "md5";
//  @Value("${password.hashIterations}")
  private int hashIterations = 2;

  public void setRandomNumberGenerator(RandomNumberGenerator randomNumberGenerator) {
      this.randomNumberGenerator = randomNumberGenerator;
  }

  public void setAlgorithmName(String algorithmName) {
      this.algorithmName = algorithmName;
  }

  public void setHashIterations(int hashIterations) {
      this.hashIterations = hashIterations;
  }

  /**
   * <p>密码加密方法
   * @param user
   * */
  public void encryptPassword(UserEntity user) {

      user.setSalt(randomNumberGenerator.nextBytes().toHex());

      String account = user.getUsername();
      String salt = user.getSalt();
      
      String newPassword = new SimpleHash(
              algorithmName,
              user.getPassword(),
              ByteSource.Util.bytes(account+salt),
              hashIterations).toHex();

      user.setPassword(newPassword);
  }
}
