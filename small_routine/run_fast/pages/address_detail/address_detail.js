// pages/address_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

      noLocation: true,
      location: {
        latitude: '',
        longitude: '',
        name: '',
        extra_address:'',
        addresseeName:'',
        addresseetel: '',
        address: '请选择寄件人详细地址'
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  gotoMap:function(){
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        var location= {
          latitude: res.latitude,
          longitude: res.longitude,
          address:res.address||res.name
        };
        that.setData({
          location: location
        });
        console.log(that.data.location)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  gotoIndex:function(){
    wx.navigateBack();
  }
})