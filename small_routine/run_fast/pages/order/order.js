var app = getApp();
var host = app.globalData.host;
var session_id = app.globalData.session3rd;

Page({
  data: {
    all: {subData: [],page: 1},
    substitude: {subData: [],page: 1},
    delivering: {subData: [],page: 1},
    completed: {subData: [],page: 1},
    candeled: {subData: [],page: 1},

    scrolltop: 0,
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0, 
  },
  onLoad: function (options) {
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight*4
        });
        // console.log(that.data.winHeight);
      }
    });
    this.getOrderList(0);  // 获取全部订单数据
  },
  // 获取订单数据  0全部 1待揽件 2配送中 3已取消 4已送达
  getOrderList: function (type, pageNum){
    var that = this;
    if(pageNum==""||pageNum==undefined){
      pageNum = 1;
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    wx.request({
      url: host + '/Run/OrderList',
      type: 'post',
      dataType: 'json',
      data: {
        session3rd: 'test',  //用户个人标识
        pageNum: pageNum,  //分页页码 不传默认为1
        status: type,  //0全部 1待取件 2配送中 3已取消 4已送达
      },
      success: function (res) {
        
        var resData = res.data;
        if (resData.code === 0) {// 成功
          resData.data.forEach((val, i) => {
            if (val.status == 1) {
              val.statusName = "待取件";
            } else if (val.status == 2) {
              val.statusName = "配送中";
            } else if (val.status == 3) {
              val.statusName = "已取消";
            } else if (val.status == 4) {
              val.statusName = "已完成";
            }
          });

          if(type==0){
            that.setData({
              'all.data': resData.data,
            });
          }else if(type==1){
            that.setData({
              'substitude.data': resData.data,
            });
          } else if (type == 2) {
            that.setData({
              'delivering.data': resData.data,
            });
          } else if (type == 3) {
            that.setData({
              'candeled.data': resData.data,
            });
          } else if (type == 4) {
            that.setData({
              'completed.data': resData.data,
            });
          }
          
        } else if (resData.code === 1) {


        } else {  //重新登录

        }

        //console.log(that.data);
      }

    });
  },
  scrollHandle: function (e) { //滚动事件
    console.log(e.detail)
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
    console.log(e.target.dataset.code);
    this.getOrderList(e.target.dataset.code,1);  // 获取全部订单数据
  },
  onPullDownRefresh: function () {
    if (this.currentTab==0){
      this.setData({
        'all.data': [],
      });
      this.getOrderList(0);
    } else if (this.currentTab == 1){
      this.setData({
        'substitude.data': [],
      });
      this.getOrderList(1);
    }else if(this.currentTab == 2){
      this.setData({
        'delivering.data': [],
      });
      this.getOrderList(2);
    }else if(this.currentTab == 3){
      this.setData({
        'completed.data': [],
      });
      this.getOrderList(4);
    } else if (this.currentTab == 4){
      this.setData({
        'candeled.data': [],
      });
      this.getOrderList(3);
    }
    
  },
  scrollLoading: function(){
    if (this.data== 3) {
      wx.showToast({
        title: '已经到最后一页了',
        icon: ''
      })
      return;
    }
    this.fetchTestData();
  },
  substitute:function(e){//代取件
    var that=this;
    
    var order_id=e.target.dataset.orderid;
    //console.log(order_id);
    wx.navigateTo({
      url: '../substitute/substitute?order_id='+order_id,
    });
  },
  delivering: function () {//配送中
    wx.navigateTo({
      url: '../delivering/delivering',
    });
  }, 
  completed: function () {//已完成
    wx.navigateTo({
      url: '../completed/completed',
    });
  },
  canceled:function(){//已取消
    wx.navigateTo({
      url: '../canceled/canceled',
    });
  }

})