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
    addtime:'',
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
      // return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (this.data.currentTab == 1) {
      that.orderTrip();
    }
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
  getlocation: function () {
    var that = this;
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
    this.setData({
      longitude: that.data.longitude,
      latitude: that.data.latitude,
      markers: markers,
      covers: covers,
    })
  },
  orderTrip: function () {
    var that = this;

    var data = {
      session3rd: 'test',
      order_id: that.data.order_id
    };

    wx.request({
      url: host + '/Run/orderTrip',
      type: 'post',
      dataType: 'json',
      data: data,
      success: function (res) {
        //console.log(res.data);
        var code = res.data.code;
        var data = res.data.data;
        if (code == 0) {
          console.log('成功');
          var list = data.list;
          for (var i = 0; i < list.length; i++) {
            list[i].addtime = util.formatTime(new Date(parseInt(list[i].addtime)));
          }
          that.setData({
            // longitude: data.newsite.longitude,
            // latitude: data.newsite.latitude,
            // avatar: data.newsite.avatar,
            list: data.list,


          });
          console.log(that.data.list);
        } else if (code == 1) {
          console.log('失败');
        } else if (code == 2) {
          console.log('重新登录');
        }
      }
    })
  }
}) 