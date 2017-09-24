//app.js  
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据  
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    
  },
  onShow: function(){
    wx.login({
      success: function (res) {
        var code = res.code;
        // success  
        // 获取用户信息  
        wx.getUserInfo({
          success: function (data) {
            // console.log(data);
            // that.globalData.userInfo = data.userInfo
            // typeof cb == "function" && cb(that.globalData.userInfo)
            var rawData = data.rawData;
            var signature = data.signature;
            var encryptedData = data.encryptedData;
            var iv = data.iv;
            var sendData = {
              "js_code": code,
              "rawData": rawData,
              "signature": signature,
              "iv": iv,
              "encryptedData": encryptedData
            };
            //console.log(sendData);

            wx.request({
              url: "https://run.dev.xinduobang.cn/Run/checkLogin",
              data: sendData,
              method: 'get',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },  
              success: function (res) { 
               // console.log(res);
               // console.log(rawData);
              }
            })
          }
        })
      }
    })
    // console.log(222222);
    // wx.getUserInfo({
    //   'withCredentials': false,
    //   success: function(res){

    //     // console.log(res);
        
        
    //   }
    // });
  },
  getUserInfo: function (cb) {
    console.log(123);
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口  
      wx.login({
        success: function (res) {
          var code = res.code;
          // success  
          // 获取用户信息  
          wx.getUserInfo({
            success: function (data) {
              console.log(data);
              that.globalData.userInfo = data.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              var rawData = data.rawData;
              var signature = data.signature;
              var encryptedData = data.encryptedData;
              var iv = data.iv;
              wx.request({
                url: "https://run.dev.xinduobang.cn/Run/checkLogin",
                data: {
                  " js_code":code,
                  " rawData": rawData,
                  "signature": signature,
                  " iv": iv,
                  "encryptedData": encryptedData
                },
                method: 'POST',
                success: function (res) {
                  // success  
                  console.log(res);
                  console.log(rawData);
                }
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    host: 'https://run.dev.xinduobang.cn'
  },
});
