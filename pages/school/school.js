// pages/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentObj: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getInfo();
    this.getLen()
  },
  // 获取数据库数据长度
  getLen() {
    wx.cloud.database().collection("user_send").orderBy('time', 'desc').get().then(res => {
      console.log("查询成功", res);
      this.setData({
        contentObj: res.data
      })
    }).catch(err => {
      console.log("查询失败", err);
    })
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
    this.getInfo()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "广油传话小铺更新啦！",
      // desc:"什么是内容？",
      path: "",
      imageUrl: ""
    }
  },
  // 获取数据库内容
  getInfo() {
    // wx.cloud.database().collection("user_send").orderBy('time', 'desc').get().then(res => {
    //   console.log("查询成功", res);
    //   this.setData({
    //     contentObj: res.data
    //   })
    // }).catch(err => {
    //   console.log("查询失败", err);
    // })
    wx.showLoading({
      title: '加载中',
    })
    let len = this.data.contentObj.length;
    wx.cloud.database().collection("user_send").orderBy('time', 'desc').skip(len).get().then(res => {
      this.setData({
        contentObj: this.data.contentObj.concat(res.data),
      })
      wx.hideLoading()
      wx.showToast({
        title: '加载完成',
      })
    })
  },
  //点击事件
  gotoDetail(e) {
    // console.log(e);
    console.log(e.currentTarget.dataset.item.mesId);
    wx.navigateTo({
      url: '/pages/school_detail/school_detail?id=' + e.currentTarget.dataset.item.mesId,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
})