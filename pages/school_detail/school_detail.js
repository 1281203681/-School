// pages/school_detail/school_detail.js
let mesId = ""
let writContent = ""
let openid=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: "",
    userWriteObj: "",
    hid:true,
    price:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("接收的参数", options.id);
    mesId = options.id

  },
  // 查询数据的方法
  getMes() {
    wx.cloud.database().collection("user_send").where({ mesId: mesId }).get().then(res => {
      // console.log("获取成功",res);
      this.setData({
        detailObj: res.data[0],
        userWriteObj: res.data[0].user_write,
        price:res.data[0].price
      })
      // console.log(rese);
      if(res.data[0].sendType=="二手"){
        this.setData({
          hid:false
        })
      }
    }).catch(err => {
      // console.log("获取失败",err);
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
    this.getMes()
    this.getOpenid()
  },
  // 获取用户openid
  getOpenid(){
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        // console.log("查询成功",res);
        openid=res.result.openid
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
    return {
      title: "油校新鲜事！快来看！",
      // desc:"什么是内容？",
      path: "",
      imageUrl: ""
    }
  },
  // 评论内容
  handleInput(e) {
    // console.log(e.detail.value);
    writContent = e.detail.value
  },
  // 发送评论
  sendMess() {
    let login = wx.getStorageSync("userinfo");
    if (login == "") {
      wx.showModal({
        title: '提示',
        content: '请登录后评论',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            });
          }
        },
      });
    }
    else if (writContent.length == 0) {
      wx.showToast({
        title: '不能发表空评论！',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
    }
    else {
      let _ = wx.cloud.database().command
      wx.cloud.database().collection("user_send").where({ mesId: mesId }).update({
        data: {
          user_write: _.push({ writContent,openid })
        }
      }).then(res => {
        wx.showLoading({
          title: "发送中",
          mask: true,
          success: (result) => {
            wx.showToast({
              title: '发送成功',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                this.onShow()
              },
            });
          },
        });
      }).catch(err => {
        console.log("评论失败", err);
      })
    }
  },
  gotoPay(){
    wx.navigateTo({
      url: '/pages/pay/pay?totalPrice='+this.data.price,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})