var app = getApp();
var host = app.globalData.host;

Page({
  data: {
    isShowToast: false,
    type: 0,//0 寄件人 1 收件人
    send: {
      status: {
        hasAddressData: false,  //地址信息+联系人信息
        hasPerson: false  //联系人信息
      },
      info: {
        noAddress: '请完善寄件人详细地址',
        noContactPerson: '请完善寄件人信息',
      },
      location: {
        latitude: '',
        longitude: '',
        address: "",
        extraAddress: '',
        contactPerson: '',
        telephone: ""
      }
    },
    receive: {
      status: {
        hasAddressData: false,  //地址信息+联系人信息
        hasPerson: false  //联系人信息
      },
      info: {
        noAddress: '请完善收件人详细地址',
        noContactPerson: '请完善收件人信息',
      },
      location: {
        latitude: '',
        longitude: '',
        address: "",
        extraAddress: '',
        extraAddress: '',
        contactPerson: '',
        telephone: ""
      }
    }
  },
  onLoad: function (data) {
    //console.log(data)
    var that = this;

    if(this.data.type == 0){
      wx.setStorageSync('sendData', this.data.send);
      wx.getStorage({  //读取数据
        key: 'receiveData',
        success: function (res) {
          that.setData({
            'receive': res.data,
          })
        }
      });
    } else if (this.data.type == 1){
      wx.setStorageSync('receiveData', this.data.receive);
      wx.getStorage({  //读取数据
        key: 'sendData',
        success: function (res) {
          that.setData({
            'send': res.data,
          })
        }
      });
    }else{
      var sendData = {
        status: {
          hasAddressData: false,  //地址信息+联系人信息
          hasPerson: false  //联系人信息
        },
        info: {
          noAddress: '请完善寄件人详细地址',
          noContactPerson: '请完善寄件人信息',
        },
        location: {
          latitude: '',
          longitude: '',
          address: "",
          extraAddress: '',
          contactPerson: '',
          telephone: ""
        }
      }
      var receiveData = {
        status: {
          hasAddressData: false,  //地址信息+联系人信息
          hasPerson: false  //联系人信息
        },
        info: {
          noAddress: '请完善收件人详细地址',
          noContactPerson: '请完善收件人信息',
        },
        location: {
          latitude: '',
          longitude: '',
          address: "",
          extraAddress: '',
          extraAddress: '',
          contactPerson: '',
          telephone: ""
        }
      }
      
      wx.setStorageSync('sendData', sendData);
      wx.setStorageSync('receiveData', receiveData);
    }
    //console.log(this.data)
  },  
  gotoSendMap:function(e){
    
    var type = 0;  //0:寄件人; 1:收件人;
    // wx.setStorageSync('receiveData', this.data.receive);
    var sendLocation = this.data.send.location;
    // console.log("go1");
    // console.log({
    //   url: '../address_detail/address_detail?' + 'type=' + type + '&address=' + sendLocation.address + '&extraAddress=' + sendLocation.extraAddress + '&contactPerson=' + sendLocation.contactPerson + '&telephone=' + sendLocation.telephone
    // });
    wx.navigateTo({
      url: '../address_detail/address_detail?' + 'type=' + type + '&address=' + sendLocation.address + '&extraAddress=' + sendLocation.extraAddress+'&contactPerson='+sendLocation.contactPerson+'&telephone='+sendLocation.telephone
    });
  },
  gotoReceiveMap: function (e) {
    // console.log("go2")
    
    var type = 1;  //0:寄件人; 1:收件人;
    // wx.setStorageSync('sendData', this.data.send);
    var receiveLocation = this.data.receive.location;
    wx.navigateTo({
      url: '../address_detail/address_detail?' + 'type=' + type + '&address=' + receiveLocation.address + '&extraAddress=' + receiveLocation.extraAddress + '&contactPerson=' + receiveLocation.contactPerson + '&telephone=' + receiveLocation.telephone
    });
  },
  callExpress:function(){
    var that=this;
    console.log(that.data.send.location);
    console.log(that.data.receive.location);
    var sendLocation=that.data.send.location;
    var receiveLocation = that.data.receive.location;
    var data={
      session3rd: 'test',//用户个人标识
      start_phone: sendLocation.telephone,//寄件人手机
      start_name: sendLocation.contactPerson,//寄件人姓名
      start_address_id:'',//寄件人地址id，新建的地址不需要传
      end_phone: receiveLocation.telephone,//收件人手机
      end_name: receiveLocation.contactPerson,//收件人姓名
      end_address_id:'',//收件人地址id，新建的地址不需要传
      start_longitude: sendLocation.longitude,//寄件人地址经度
      start_latitude: sendLocation.latitude,//寄件人地址纬度
      start_address: sendLocation.address + sendLocation.extraAddress,//寄件人地址
      end_longitude: receiveLocation.longitude,//收件人地址经度
      end_latitude: receiveLocation.latitude,//收件人地址纬度
      end_address: receiveLocation.address + receiveLocation.extraAddress//收件人地址
    };
    var sendStatus = that.data.send.status;
    var receiveStatus = that.data.receive.status;
    if (sendStatus.hasAddressData && receiveStatus.hasAddressData && sendStatus.hasPerson && receiveStatus.hasPerson){
      wx.request({
        url: host + '/Run/createOrder',
        type: 'post',
        dataType: 'json',
        data: data,
        success: function (res) {
          console.log(res.data);
          var code = res.data.code;
          var order_id=res.data.order_id;
          if (code == 0) {
            wx.navigateTo({
              url: '../call/call?order_id=' + order_id +'&session3rd=test',
            });
          } else if (code == 1) {

          } else {

          }
        }
      });
    }else{
     
      that.setData({
        count: 1500,
        toastText: '还有未填写的信息'
      });
      that.showToast();  
    }  
  },
  gotoOrder:function() {
    wx.navigateTo({
      url: '../order/order',
    });
  },
  showToast: function () {
    var _this = this;
    // toast时间  
    _this.data.count = parseInt(_this.data.count) ? parseInt(_this.data.count) : 3000;
    // 显示toast  
    _this.setData({
      isShowToast: true,
    });
    // 定时器关闭  
    setTimeout(function () {
      _this.setData({
        isShowToast: false
      });
    }, _this.data.count);
  },  
 
});