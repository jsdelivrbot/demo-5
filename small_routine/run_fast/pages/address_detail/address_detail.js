// pages/address_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      noMap:true,//开关
      showView: true,//false 隐藏补充 true 显示补充
      status: {
        type: 1,//1 寄件人 2 收件人
      },
      location: {
        latitude: '',
        longitude: '',
        address: '',  //地址
        extraAddress:'',  // 补充地址
        contactPerson: '',  // 联系人
        telephone: ''  // 联系电话
      },
      info: {
        address: '',
        contactPerson: '',
        telephone: '',
        extraAddress: '请补充楼栋号,例1栋2单元4楼3号',
      },
      addressid:'',
      latitude:'',
      longitude:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (data) {
    console.log(data);
    if(data.type == 1){  // 寄件型
      this.setData({
        status: {
          type: 1
        },
        'location.address': data.address,
        addressid: data.address_id,
        'location.latitude': data.latitude,
        'location.longitude': data.longitude,
        noMap:false
      });
      console.log(this.data.location);
    
      this.setData({
        'location.status.type': '1',
        'location.address': data.address,
        'location.extraAddress': data.extraAddress,
        'location.contactPerson': data.contactPerson,
        'location.telephone': data.telephone,
        'info.address': '请选择寄件人详细地址',
        'info.contactPerson': '寄件人姓名',
        'info.telephone': '寄件人电话',
      });
    }else{
      this.setData({
        status: {
          type: 2
        }
      });
      this.setData({
        'location.address': data.address,
        'location.extraAddress': data.extraAddress,
        'location.contactPerson': data.contactPerson,
        'location.telephone': data.telephone,
        'info.address': '请选择收件人详细地址',
        'info.contactPerson': '收件人姓名',
        'info.telephone': '收件人电话',
      });
    }
    // console.log(this.data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  // 补充地址
  changeExtraAddress: function(e){
    this.setData({
      'location.extraAddress': e.detail.value
    })
  },
  // 联系人
  changeContactPerson: function(e){
    this.setData({
      'location.contactPerson': e.detail.value
    })
  },
  // 联系电话
  changeTelephone: function(e){
    this.setData({
      'location.telephone': e.detail.value
    })
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
    that.setData({
      showView:true
    });
   
    wx.chooseLocation({
      success: function (res) {
        // console.log(that);
        var data = that.data;
        console.log(res);
        that.setData({
          'location.latitude': res.latitude,
          'location.longitude': res.longitude,
          'location.address': res.name||res.address,
          noMap:false
        });
         console.log(that.data.location)
      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    })
  },
  history_address:function(){//历史地址
    var that=this;
    that.setData({
      showView:false
    });
    wx.navigateTo({
      url: '../history/history?type='+that.data.status.type,
    });
    
  },
  gotoIndex: function(){
  
    var status = this.data.status;
    var location = this.data.location;
    // console.log(status.type);

    // wx.navigateTo({ url: '../index/index?' + 'type=' + status.type + '&address=' + location.address + '&extraAddress= ' + location.extraAddress + '&contactPerson=' + location.contactPerson + '&telephone=' + location.telephone + '&latitude=' + location.latitude + '&longitude=' + location.longitude});
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面

    if(status.type==0){
      prevPage.setData({"type": 0});
      // 地址信息
      if (location.address != "") {
        // console.log(`0 address`);
        prevPage.setData({
          'send.status.hasAddressData': true,
          'send.location.address': location.address,
          'send.location.extraAddress': location.extraAddress,
          'send.location.latitude': location.latitude,
          'send.location.longitude': location.longitude,
        });
      } else {
        prevPage.setData({
          'send.status.hasAddressData': false,
        });
      }
      // 联系人信息
      if (location.contactPerson != "") {
        // console.log(`0 contactPerson`);
        prevPage.setData({
          'send.status.hasPerson': true,
          'send.location.contactPerson': location.contactPerson,
          'send.location.telephone': location.telephone,
        });
      } else {
        prevPage.setData({
          'send.status.hasPerson': false
        });
      }
    } else if (status.type == 1){
      prevPage.setData({ "type": 1 });      
      // 地址信息
      if (location.address != "") {
        // console.log(`1 address`);
        prevPage.setData({
          'receive.status.hasAddressData': true,
          'receive.location.address': location.address,
          'receive.location.extraAddress': location.extraAddress,
          'receive.location.latitude': location.latitude,
          'receive.location.longitude': location.longitude,
        });
      }
      // 联系人信息
      if (location.contactPerson != "") {
        console.log(`1 contactPerson`);
        prevPage.setData({
          'receive.status.hasPerson': true,
          'receive.location.contactPerson': location.contactPerson,
          'receive.location.telephone': location.telephone,
        });
      } else {
        prevPage.setData({
          'receive.status.hasPerson': false
        });
      }
    }else{
      prevPage.setData({
        'send.status.hasAddressData': false,
        'send.status.hasPerson': false,
        'receive.status.hasAddressData': false,
        'receive.status.hasPerson': false,
      });
    }
  
    wx.navigateBack();
  }
  
})