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
    type:'',
    address_list:[],//历史地址列表
    address:'',
    address_id:'',
    latitude:'',
    longitude:''

  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      type:options.type
    });
    that.getAddr(options.type);
  },
  getAddr: function (statusType) {
    var that = this;
    var data = {
      session3rd: 'test',
      type: statusType
    };
  
    wx.request({
      url: host + '/Run/getAddr',
      data: data,
      type: 'get',
      success: function (res) {
        console.log(res.data);
        var code = res.data.code;
        var data=res.data.data;
        if (code == 0) {
          console.log('成功');
          that.setData({
            address_list:data
          });   
        } else if (code == 1) {
          console.log('error');
        }else if(code==2){
          console.log('重新登录');
        }
      }
    })
  },
  call: function (session3rd, order_id) {//ajax
    var data = {
      session3rd: session3rd,
      order_id: order_id
    };
    wx.request({
      url: host + '/Run/callStaff',
      type: 'post',
      dataType: 'json',
      data: data,
      success: function (res) {
        console.log(res.data);
        var code = res.data.code;
        if (code == 0) {

        } else if (code == 1) {

        } else {

        }
      }

    })
  },
  chooseItem:function(e){
    var that=this;
    console.log(e.target.dataset);
    var dataset=e.target.dataset;
    that.setData({
      address: dataset.address,
      address_id: dataset.addressid,
      latitude: dataset.latitude,
      longitude: dataset.longitude
    });
    wx.navigateTo({
      url: '../address_detail/address_detail?address_id=' + that.data.address_id +"&address="+that.data.address+ "&latitude=" + that.data.latitude + "&longitude=" + that.data.longitude+"&type="+that.data.type,
    });
  }

}) 