// pages/goods_list/goods_list.js
let userOpenId = ""
let goods_num = ""
let goods_one_price = ""
let user_only_id = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: "",
    tip_show: false,
    goods_detail_obj: "",
    file_statue: true,
    total_price: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let shop_id = options.id;
    if (shop_id == 2021081101) {
      wx.cloud.database().collection("goods_list").where({ shop_id: shop_id }).get().then(res => {
        // console.log("查询成功", res);
        this.setData({
          goodsObj: res.data
        })
      })
    }
    else if (shop_id == 2021081102) {
      wx.cloud.database().collection("goods_list_2").get().then(res => {
        // console.log(res);
        this.setData({
          goodsObj_1: res.data
        })
      })
    }
  },
  goods_detail(e) {
    // console.log(e);
    console.log(e.currentTarget.dataset.item);
    goods_one_price = e.currentTarget.dataset.item.goods_price
    this.setData({
      tip_show: true,
      goods_detail_obj: e.currentTarget.dataset.item
    })
  },
  // 输入打印数量
  handleNum(e) {
    goods_num = e.detail.value
    let total_price = (goods_one_price * goods_num).toFixed(2)
    console.log(goods_one_price * goods_num);
    this.setData({
      total_price: total_price
    })
  },
  // 上传文件
  uploadFile() {
    if (goods_num == "") {
      wx.showModal({
        title: '提示',
        content: '请先输入打印张数',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    }
    else {
      let that = this
      wx.showModal({
        title: '提示',
        content: '请上传文件并输入打印页数后付款,每次下单只能上传1个文件！',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            wx.chooseMessageFile({
              count: 1,
              type: 'image',
              success(res) {
                let tempFilePaths = res.tempFiles[0].path
                // console.log("字符出纳？？？",res.tempFiles[0].name);
                let path = res.tempFiles[0].name + userOpenId
                wx.cloud.uploadFile({
                  cloudPath: '用户：' + path, // 上传至云端的路径
                  filePath: tempFilePaths, // 小程序临时文件路径
                  success: res => {
                    wx.showToast({
                      title: '上传成功',
                      icon: 'success',
                      image: '',
                      duration: 1500,
                      mask: false,
                      success: (result) => {
                        // user_only_id = new Date().getTime() + userOpenId
                        // wx.cloud.database().collection("user_order").add({
                        //   data: {
                        //     openid: userOpenId,
                        //     fileID: res.fileID,
                        //     user_only_id: user_only_id
                        //   }
                        // })
                        that.setData({
                          file_statue: false
                        })
                      },
                    });
                    // 返回文件 ID
                    // console.log("文件id",res.fileID)
                    // console.log("临时地址",path);
                  },
                  fail: console.error
                })
              }
            })
          }
        },
      });
    }

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
        // console.log(res);
        userOpenId = res.result.openid
      }
    })
  },
  // 宿舍小卖铺商品列表
  gotoList(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.item.shop_id);
    wx.navigateTo({
      url: '/pages/dorm_goods_list/dorm_goods_list?id=' + e.currentTarget.dataset.item.shop_id,
      success: (result) => {

      },
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

  },
  // 点击付款
  gotoPay() {
    if (goods_num == "" || this.data.file_statue == true) {
      wx.showModal({
        title: '提示',
        content: '请上传文件并输入打印数量',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    }
    else {
      // let order = "2021" + new Date().getTime() + "2001"
      let totalPrice = this.data.total_price
      wx.navigateTo({
        url: '/pages/pay/pay?totalPrice=' + totalPrice,
        success: (result) => {

        },
      });
      // wx.cloud.database().collection("user_order").where({ user_only_id: user_only_id }).update({
      //   data: {
      //     order: order,
      //     totalPrice: totalPrice
      //   }
      // }).then(res => {
      //   wx.navigateTo({
      //     url: '/pages/pay/pay?id=' + order + "&totalPrice=" + totalPrice,
      //     success: (result) => {

      //     },
      //   });
      // })
      //  wx.navigateTo({
      //    url: '/pages/pay/pay?id='+,
      //    success: (result)=>{

      //    },
      //  });
    }
  }
})