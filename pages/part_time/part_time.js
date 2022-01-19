// pages/part_time/part_time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    part_timeObj: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getPartTime();
  },
  // 获取兼职信息
  getPartTime() {
    wx.cloud.database().collection("part_time").get().then(res => {
      // console.log(res);
      this.setData({
        part_timeObj: res.data
      })
    })
  },
  // 点击前往兼职详情
  gotoPartTimeDetail(e) {
    console.log(e.currentTarget.dataset.item.part_id);
    wx.navigateTo({
      url: '/pages/part_time_detail/part_time_detail?id=' + e.currentTarget.dataset.item.part_id,
      success: (result) => {

      },
    });
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
    return {
      title: "广油周边的兼职都在这",
      // desc:"什么是内容？",
      path: "",
      imageUrl: ""
    }
  }
})