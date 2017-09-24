//获取应用实例
var app = getApp()

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');

Page({
  data: {
    minutes: "0",
    seconds: "01",
  },
  onLoad: function (options) {
    var that = this;
    console.log(options.session3rd);
    console.log(options.order_id);
    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 200, 200);
      ctx.draw();
      var x = 100, y = 100, radius = 96;
      ctx.setLineWidth(5);
      ctx.setStrokeStyle('#d81e06');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke()
      ctx.draw()
    }
    function calcTime(allSeconds) {
      var seconds = allSeconds % 60;
      seconds = (seconds < 10) ? ("0" + seconds) : seconds;
      var minutes = parseInt(allSeconds / 60);
      that.setData({
        'seconds': seconds,
        'minutes': minutes
      });
    }
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 100, n = 60;
    var m=0;
    var animation = function () {
      // if (step <= n) {
        endAngle = step * 0.1 * 2 * Math.PI / n + 1.5 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;

      // } else {
      //   clearInterval(varName);
      // }
        
        calcTime(parseInt(step/10));
        m++;
  
        if(m==10){
          m=0;
          that.call(options.session3rd, options.order_id);
          that.waitStaff(options.session3rd, options.order_id);
        }
    };
    varName = setInterval(animation, animation_interval);
  },
  
  onReady: function () {
    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(100, 100, 96, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  onHide:function(){
    clearInterval(varName);
  },

  cancelOrder:function(){
    wx.showModal({
      title: '提示',
      content: '您确认取消订单吗?',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack();
        } else {
          console.log('用户点击取消')
        }
      }
    }) 
  },
  call: function (session3rd,order_id){//ajax
    var data={
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
      
        if (code == 0) {
          console.log('等待司机接单');
        }else if(code==1){
         
        }else{

        }
      }
  })
 },
  waitStaff: function (session3rd, order_id){
    var data = {
      session3rd: session3rd,
      order_id: order_id
    };
    wx.request({
      url: host + '/Run/waitStaff',
      type: 'post',
      dataType: 'json',
      data: data,
      success: function (res) {
        console.log(res.data);

        if (code == 0) {
          console.log('有司机接单了');
        } else if (code == 3) {
          console.log('正在等待司机接单');
        }
      }
    })
  }
});