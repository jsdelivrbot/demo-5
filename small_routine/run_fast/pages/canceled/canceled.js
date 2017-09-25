var util = require('../../utils/util.js');
//获取应用实例
var app = getApp();
var host = app.globalData.host;
var session_id = app.globalData.session3rd;

Page({
  data: {
    /** 
     * 页面配置 
     */
    winWidth: 0,
    winHeight: 0,
    obj: {},
    addtime:''
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    that.getOrderInfo(options.order_id);
  },
  onReady: function () {
  },
  getOrderInfo: function (order_id) {
    var that = this;

    var data = {
      session3rd: 'test',
      order_id: order_id
    };

    wx.request({
      url: host + '/Run/orderInfo',
      type: 'post',
      dataType: 'json',
      data: data,
      success: function (res) {
        //console.log(res.data);
        var code = res.data.code;
        var data = res.data.data;
        if (code == 0) {
          
          that.setData({
            obj: data,
            addtime: util.formatTime(new Date(parseInt(data.addtime)))
          });
          // console.log(that.data.addtime);
        } else if (code == 1) {

        } else if (code == 2) {

        }
      }
    })
  }
})
