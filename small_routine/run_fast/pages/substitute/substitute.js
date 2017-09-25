//index.js 
//获取应用实例 
var app = getApp();
var host = app.globalData.host;
var session_id = app.globalData.session3rd;
var util = require('../../utils/util.js');

Page({
  data: {
    /** 
      * 页面配置 
      */
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    obj:{},
    order_id:'',//订单id
    addtime:'',//订单创建时间
    userPayMoney:'',//用户输入金额
    avatar: '',
    latitude: 0,//纬度  司机
    longitude: 0,//经度 司机
    speed: 0,//速度 
    accuracy: 16,//位置精准度 
    markers: [],//气泡
    covers: [] //司机icon
  },
  onLoad: function (options) {
    var that = this;
    //console.log(options);

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
    that.setData({
      order_id: options.order_id
    });
    that.getOrderInfo(options.order_id);
    console.log(util.globalData.session3rd);
  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  getOrderInfo: function (order_id){
    var that=this;
    
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
        var data=res.data.data;
        if (code == 0) {
         console.log(data);
         that.setData({
           obj: data,
           addtime: util.formatTime(new Date(parseInt(data.addtime))),
           longitude: data.newSite.longitude,
           latitude: data.newSite.latitude,
           avatar: data.newSite.avatar
         });
         that.getlocation();
        } else if (code == 1) {

        } else if (code == 2) {

        }
      }
    })
  },
  user_payNum:function(e){
    var that=this;
    that.setData({
      userPayMoney: e.detail.value
    });
    console.log(that.data.userPayMoney);
  },
  getlocation: function () {
    var that = this;
    console.log('获取司机位置');
    var markers = [{
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      // name: '天安门广场',
      desc: '司机位置'
    }]
    var covers = [{
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      iconPath: '../../imgs/courier.png',
      rotate: 0
    }]
    console.log(that.data.longitude, that.data.latitude);
    this.setData({
      longitude: that.data.longitude,
      latitude: that.data.latitude,
      markers: markers,
      covers: covers,
    })
  },
  pay_now: function () {
    var that = this;
    
    var order_id = that.data.order_id
    var data = {
      session3rd: 'test',
      order_id: order_id,
      total_fee: that.data.userPayMoney
    }
    wx.request({
      url: 'https://run.dev.xinduobang.cn/Pay/wxPay',
      data: data,
      type: 'POST',
      dataType: 'json',
      success: function (res) {
        var code = res.data.code;
        if (code == 1) {
          console.log('success');
          that.pay(res.data.data);
        } else if (code == 2) {
          console.log('error');
        } else if (code == 3) {
          console.log('重新登录');
        }
      }

    })
  },

  pay: function (param) {
    var that = this;
    wx.requestPayment({
      'timeStamp': param.timeStamp,
      'nonceStr': param.nonceStr,
      'package': param.package,
      'signType': param.signType,
      'paySign': param.paySign,
      success: function (res) {
        // success
        console.log(res);
        that.showInfo('支付成功');
      },
      fail: function (res) {
        // fail
        console.log(res);
        var strMsg = res.errMsg;
        if (res.err_desc) {
          strMsg += ', ' + res.err_desc;
        }
        console.log(strMsg);
      },
      complete: function () {
        // complete
        console.log("支付完成");
      }
    });
  },

}) 