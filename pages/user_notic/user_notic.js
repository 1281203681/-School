// pages/user_notic/user_notic.js
let openid=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticObj:"",
    detailObj:"",
    active:false
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
    this.getOpenId()
  },
  // 获取用户openid
  getOpenId(){
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        // console.log(res.resule.openid);
        openid=res.result.openid
        wx.cloud.database().collection("boss_notic").get().then(res=>{
          // console.log("chengg ",res);
          this.setData({
            noticObj:res.data
          })
        })
      }
    })
  },
  // 前往详情页
  gotoDetail(e){
    // console.log(e);
    // console.log(e.currentTarget.dataset.item);
    this.setData({
      detailObj:e.currentTarget.dataset.item,
      active:true
    })
    let _ = wx.cloud.database().command
    wx.cloud.database().collection("boss_notic").where({mesId:e.currentTarget.dataset.item.mesId}).update({
      data:{
        okUser:_.push({openid})
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

  }
})