// pages/cart_school/cart_school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolObj:""
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
    this.getCarSchool()
  },
  // 获取驾校信息
  getCarSchool(){
    wx.cloud.database().collection("car_school").get().then(res=>{
      console.log(res);
      this.setData({
        schoolObj:res.data
      })
    })
  },
  gotoDetail(e){
    // logger.debug(e)
    console.log(e.currentTarget.dataset.item.car_id);
    wx.navigateTo({
      url: '/pages/part_time_detail/part_time_detail?id='+e.currentTarget.dataset.item.car_id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
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
      title: "在广油学车的经历",
      // desc:"什么是内容？",
      path: "",
      imageUrl: ""
    }
  }
})