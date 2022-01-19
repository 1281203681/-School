// pages/dorm_shop/dorm_shop.js
let openid=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_img:""
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
  // 获取openid
  getOpenId(){
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        openid=res.result.openid
        this.getShopMess()
      }
    })
  },
  // 获取店铺信息
  getShopMess(){
    wx.cloud.database().collection("goods_list_2").where({openid:openid}).get().then(res=>{
      // console.log(res);
      this.setData({
        shop_img:res.data[0].shop_img
      })
      // console.log();
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
  // 换头像
  changeImg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res);
        let tempFile = res.tempFilePaths[0]
        let cloudPath = openid + Date.now()
        wx.cloud.uploadFile({
          cloudPath, //云存储的路径
          filePath: tempFile,  //本地图片路径
          success: res => {
            // console.log("");
            let fileID = res.fileID
            wx.cloud.database().collection("goods_list_2").where({ openid: openid }).update({
              data: {
                shop_img: fileID
              }
            }).then(res=>{
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                },
              });
            })
          }
        })
      },
    });
  },
})