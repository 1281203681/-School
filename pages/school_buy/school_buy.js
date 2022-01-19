// pages/school_buy/school_buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopObj: ""
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
    this.getShopMes()
  },
  //获取商店信息
  getShopMes() {
    wx.cloud.database().collection("shop_list").get().then(res => {
      this.setData({
        shopObj: res.data
      })
    })
  },
  // 获取商店id
  gotoGoods(e) {
    wx.navigateTo({
      url: '/pages/goods_list/goods_list?id=' + e.currentTarget.dataset.item.shop_id,
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
      title: "躺在宿舍等零食咯",
      // desc:"什么是内容？",
      path: "",
      imageUrl: ""
    }
  }
})