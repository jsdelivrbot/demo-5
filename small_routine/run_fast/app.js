//app.js  
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据  
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    
  },
  onShow: function(){
    var that = this;
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
              
                that.globalData.session3rd=res.data.session3rd;
                console.log(that.globalData)
                // console.log(rawData);
              }
            })
          }
        });
        wx.request({
          url: "https://run.dev.xinduobang.cn/Run/checkOrder",
          data: {"session3rd":"test"},
          method: 'get',
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          success: function (res) {
          //登录时做检查订单操作，根据code 值做跳转
           var code=res.data.code;
           if (code==0){
              console.log('成功');
            }else if(code==1){
             console.log('失败');
            }else if(code==2){
            console.log('重新登录');
            }else if(code==3){
             console.log('正在寻找快递员中，需要跳转到寻找快递员的页面');
             wx.navigateTo({
               url: '../call/call',
             })
            }else if(code==4){
             console.log('快递员已经确认，正在揽件的路上');
             wx.navigateTo({
               url: '../order/order',
             })
            }
          }
        });
      }
    });
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
    session3rd:'',
    host: 'https://run.dev.xinduobang.cn'
  },
});
