var app = getApp();

Page({
  data: {
    noLocation:true,
    location: {
      latitude: '',
      longitude: '',
      name:'',
      address:'请选择寄件人详细地址'
    }
  },
  onLoad: function () {
    var self = this;
  
  },
      
  gotoMap:function(){
   
    var self = this;
    wx.navigateTo({
      url: '../address_detail/address_detail',
    });
  //   wx.chooseLocation({
  //     success: function (res) {
  //       self.setData({
  //         location: {
  //           latitude: res.latitude,
  //           longitude: res.longitude,
  //           name:res.name,
  //           address:res.address
  //         },
  //         noLocation: false,          
  //       });
  //       console.log(res.latitude);
  //       console.log(res.longitude);
  //       console.log(res.name);
  //     },
  //     fall: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       console.log(res);
  //     }
  //   });
   },

});