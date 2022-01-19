// pages/my_send/my_send.js
let openid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesObj: ""
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
    this.getUserOpen();
  },
  // 获取用户openid--登录
  getUserOpen() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        // console.log("获取成功",res);
        openid = res.result.openid
        this.getData()
      },
      fail: err => {
        console.log("获取失败", err);
      }
    })
  },
  // 通过用户openid查询数据
  getData() {
    wx.cloud.database().collection("user_send").where({ _openid: openid }).orderBy('time', 'desc').get().then(res => {
      // console.log(openid);
      // console.log("查询成功",res);
      this.setData({
        mesObj: res.data
      })
    }).catch(err => {
      console.log("查询失败", err);
    })
  },
  // 用户删除数据
  delet(e) {
    // console.log(e);
    let delNum = e.currentTarget.dataset.item.mesId
    // console.log(delNum);
    wx.showModal({
      title: '提示',
      content: '删除该条信息？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.cloud.database().collection("user_send").where({ mesId: delNum }).remove().then(res => {
            // console.log("删除成功",res);
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500,
              success: (result) => {
                this.onShow()
              },
            });
          })
        }
      },
    });
  },
  // 详情页
  gotoDetail(e){
    let mess_id=e.currentTarget.dataset.id.mesId
    wx.navigateTo({
      url: '/pages/school_detail/school_detail?id='+mess_id,
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

  }
})