// pages/dorm_goods_list/dorm_goods_list.js
let openid = ""
let shop_id = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeObj: "",
    goodsObj: "",
    shop_info: "",
    shop_statue: true,
    num: 0,
    total_price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    let temp = options.id
    shop_id = Number(temp)
    // console.log(shop_id);
    wx.cloud.database().collection("dorm_goods").where({ shop_id: shop_id }).get().then(res => {
      // console.log(res);
      this.setData({
        goodsObj: res.data
      })
    })
    wx.cloud.database().collection("goods_list_2").where({ shop_id: shop_id }).get().then(res => {
      // console.log(res);
      this.setData({
        typeObj: res.data[0].goods_type,
        shop_info: res.data[0]
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 减去商品
  sub(e) {
    let index = e.currentTarget.dataset.index
    let goodsObj = this.data.goodsObj
    if (goodsObj[index].goods_num > 0) {
      goodsObj[index].goods_num--
      this.setData({
        goodsObj: goodsObj
      })
      let long = goodsObj.length
      let total_price = 0
      for (let i = 0; i < long; i++) {
        total_price += goodsObj[i].goods_num * goodsObj[i].goods_price
      }
      this.setData({
        total_price: total_price.toFixed(2)
      })
    }
  },
  // 增加商品
  add(e) {
    let index = e.currentTarget.dataset.index
    let goodsObj = this.data.goodsObj
    goodsObj[index].goods_num++
    this.setData({
      goodsObj: goodsObj
    })
    // this.totalPrice()
    let long = goodsObj.length
    let total_price = 0
    for (let i = 0; i < long; i++) {
      total_price += goodsObj[i].goods_num * goodsObj[i].goods_price
    }
    this.setData({
      total_price: total_price.toFixed(2)
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.judgeStatue()
  },
  // 判断是否在线
  judgeStatue() {
    wx.cloud.database().collection("goods_list_2").where({ shop_id: shop_id }).get().then(res => {
      // console.log(res);
      console.log(res.data[0].shop_or);
      this.setData({
        shop_statue: res.data[0].shop_or
      })
    })
  },
  getOpenId() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        openid = res.result.openid
      }
    })
  },
  // 跳转付款
  gotoPay() {
    if (this.data.total_price == 0) {
      wx.showModal({
        title: '提示',
        content: '请挑选商品后付款！',
        showCancel: false,
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
      let goodsObj=JSON.stringify(this.data.goodsObj)
      wx.navigateTo({
        url: '/pages/pay/pay?totalPrice=' + this.data.total_price+'&goodsObj='+goodsObj,
        success: (result) => {

        },
      });
    }

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