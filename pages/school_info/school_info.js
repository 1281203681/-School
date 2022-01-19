// pages/school_info/school_info.js
let userOpenId=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRealInfo:""
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
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        // console.log("查询成功",res);
        userOpenId=res.result.openid
        wx.cloud.database().collection("user_info").where({user_openid:userOpenId}).get().then(res=>{
          // console.log("查询成功",res);
          this.setData({
            userRealInfo:res.data[0]
          })
        })
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotoUserInfo(){
    wx.navigateTo({
      url: '/pages/user_info/user_info',
    });
  }
})