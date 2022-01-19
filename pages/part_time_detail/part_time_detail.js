// pages/part_time_detail/part_time_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messObj: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let part_id = Number(options.id)
    wx.cloud.database().collection("part_time").where({ part_id: part_id }).get().then(res => {
      if (res.data.length == 0) {
        wx.cloud.database().collection("car_school").where({ car_id: part_id }).get().then(res => {
          console.log(res);
          this.setData({
            messObj: res.data[0]
          })
        })
      }
      else {
        this.setData({
          messObj: res.data[0]
        })
      }
      // console.log(res);

    })
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

  }
})