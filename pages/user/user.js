// pages/user/user.js
let openid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    num: "",
    numHid: true,
    active: false
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
    this.getLogin();
    this.getOpenId();
    // this.noti_Ornot()
  },
  // 获取用户openid
  getOpenId() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        openid = res.result.openid
        // console.log(openid);
        this.noti_Ornot()
      }
    })
  },
  // 判断是否为商家，如果是则跳转
  gotoShop() {
    wx.cloud.database().collection("user_info").where({ user_openid: openid }).get().then(res => {
      let weatherShop = res.data[0].weatherShop
      if (weatherShop == undefined || weatherShop == false) {
        wx.showModal({
          title: '提示',
          content: '抱歉，您不是特约商家',
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
      // 如果是特约商家，判断商家类型
      // wx.cloud.database().collection("")
      else if (weatherShop == true) {
        wx.cloud.database().collection("user_info").where({ user_openid: openid }).get().then(res => {
          console.log(res.data[0].shopType);
          if (res.data[0].shopType == 1) {
            wx.navigateTo({
              url: '/pages/shop_mani/shop_mani',
              success: (result) => {
              },
              fail: () => { },
              complete: () => { }
            });
          }
          else if (res.data[0].shopType == 2) {
            wx.navigateTo({
              url: '/pages/dorm_shop/dorm_shop',
              success: (result) => {

              },
            });
          }
          else if (weatherShop == true && !res.data[0].shopType) {
            this.setData({
              active: true
            })
          }
        })
      }

      // else if(weatherShop==true){
      //   
      // }
    })
  },
  // 选择打印店
  printShop() {
    wx.showModal({
      title: '提示',
      content: '您已成为特约商家，您确定选择的类型是打印店吗',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.cloud.database().collection("user_info").where({ user_openid: openid }).update({
            data: {
              shopType: 1
            }
          }).then(res => {
            wx.navigateTo({
              url: '/pages/shop_mani/shop_mani',
              success: (result) => {
                this.setData({
                  active: false
                })
                wx.cloud.database().collection("goods_list").add({
                  data: {
                    openid: openid,
                    shop_id: 2021081101
                  }
                })
              },
            });
          })
        }
      },
    });
  },
  // 选择宿舍小卖铺
  dormShop() {
    wx.showModal({
      title: '提示',
      content: '您已成为特约商家，您确定选择的类型是宿舍小卖铺吗',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.cloud.database().collection("user_info").where({ user_openid: openid }).update({
            data: {
              shopType: 2
            }
          }).then(res => {
            wx.navigateTo({
              url: '/pages/dorm_shop/dorm_shop',
              success: (result) => {
                this.setData({
                  active: false
                })
                let shop_id=new Date().getTime()
                wx.cloud.database().collection("goods_list_2").add({
                  data: {
                    openid: openid,
                    shop_id: shop_id
                  }
                })
                // .then(res=>{
                //   wx.cloud.database().collection("dorm_goods").add({
                //     data:{
                //       openid:openid,
                //       shop_id:shop_id
                //     }
                //   })
                // })
              },
            });
          })
        }
      },
    });
  },
  // 判断用户是否已读通知
  noti_Ornot() {
    wx.cloud.database().collection("boss_notic").get().then(res => {
      let dataLength = res.data.length
      let sum = 0
      let num = 0
      for (let i = 0; i < dataLength; i++) {
        let userLength = res.data[i].okUser.length
        for (let j = 0; j < userLength; j++) {
          if (res.data[i].okUser[j].openid == openid) {
            sum++
          }
        }
        if (sum == 0) {
          num++
        }
      }
      if (num != 0) {
        this.setData({
          numHid: false
        })
      }
      else {
        this.setData({
          numHid: true
        })
      }
      this.setData({
        num: num
      })
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
  getLogin() {
    wx.getStorage({
      key: 'userinfo',
      success: (res) => {
        // console.log(res);
        this.setData({
          userInfo: res.data
        })
      },
    });
  },
})