// pages/second_buy/second_buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:""
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
    this.getInfo()
  },
  getInfo(){
    wx.cloud.database().collection("user_send").where({sendType:"二手"}).get().then(res=>{
      // console.log("获取成功",res);
      this.setData({
        goodsObj:res.data
      })
    })
  },
  // 前往详情页
  gotoDetail(e){
    // console.log(e);
    // console.log(e.currentTarget.dataset.item.mesId);
    wx.navigateTo({
      url: '/pages/school_detail/school_detail?id='+e.currentTarget.dataset.item.mesId,
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
      title: "校内二手好物都在这！",
      // desc:"什么是内容？",
      path: "",
      imageUrl: ""
    }
  }
})