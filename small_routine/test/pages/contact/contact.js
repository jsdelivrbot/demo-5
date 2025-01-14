Page({
  data: {
    clickNum: 0,
    isDialogShow: false,
    isFold: false,
    isScroll: true,
    dialogData: [],
    totalPic: [],
    pictures: [],
    picturesOther: [
      'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
      'https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg'

    ],
  },
  //事件处理函数
  onLoad: function (options) {
    var that = this;
    that.setData({
      pictures: ['https://p0.meituan.net/movie/ea4ac75173a8273f3956e514a4c78018253143.jpeg',
        'https://p0.meituan.net/movie/5d4fa35c6d1215b5689257307c461dd2541448.jpeg',
        'https://p0.meituan.net/movie/0c49f98a93881b65b58c349eed219dba290900.jpg'],
      dialogData: [{
        name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室'
      }, {
        name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室'
      }, {
        name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室'
      }, {
        name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室'
      }, {
        name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室'
      }, {
        name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室'
      }, { name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室' }, { name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室' }, { name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室' }, { name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室' }, { name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室' }, { name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室' }, { name: '衣贝洁(四通路店)', address: '吉林省长春市二道区四通路与威海路交汇南行50米荷香居2楼1201室' }]
    })
  },
  onReady: function () {

  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
  },
  /**
   * 显示、关闭弹窗
   */
  showDialog: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    console.log('currentStatu:', currentStatu);
    //关闭  
    if (currentStatu == "close") {
      this.setData({
        isDialogShow: false,
        isScroll: true
      });
    }
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        isDialogShow: true,
        isScroll: false
      });
    }
  },
  previewImage: function (e) {
    var that = this,

      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = this.data.pictures;

    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
    })
  },
  flodFn: function () {
    var that = this;
    if (that.data.clickNum == 0) {
      var clickNum = that.data.clickNum = 1;
      console.log(that.data.picturesOther);
      var mewPics = that.data.pictures.concat(that.data.picturesOther);
      this.setData({
        clickNum: clickNum,
        totalPic: mewPics,
        pictures: mewPics,
        isFold: !this.isFold
      });
    }

  }
})