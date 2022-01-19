// pages/user_info/user_info.js
let userName = ""
let userPhone = ""
let userSchool = ""
let userAdd = ""
let userOpenId = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userSchool:""
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
      name: "login",
      success: res => {
        console.log("查询成功", res);
        userOpenId = res.result.openid
      }, fail: err => {
        console.log("查询失败", err);
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
  inputName(e) {
    userName = e.detail.value
  },
  inputPhone(e) {
    userPhone = e.detail.value
  },
  inputSchool(e) {
    userSchool = e.detail.value
  },
  inputAdd(e) {
    userAdd = e.detail.value
  },
  // 点击确认修改按钮  先保存信息到数据库，再返回上一页面
  certent() {
    // console.log();
    if (userPhone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位手机号',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {

          }
        },
      });
    }
    else if (userName == "" || userPhone == "" || userSchool == "" || userAdd == "") {
      wx.showModal({
        title: '提示',
        content: '请完善信息，防止配送错误！',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {

          }
        },
      });
    }
    else {
      wx.cloud.database().collection("user_info").where({ user_openid: userOpenId }).update({
        data: {
          userRealName: userName,
          userRealPhone: userPhone,
          userRealSchool: userSchool,
          userRealAdd: userAdd
        }
      }).then(res => {
        // console.log("更新成功");
        wx.showToast({
          title: '更新成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            wx.navigateBack({
              delta: 2
            });
          },
        });
      })
    }

  },
})