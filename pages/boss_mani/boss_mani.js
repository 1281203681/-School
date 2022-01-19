// pages/boss_mani/boss_mani.js
// 兼职信息数据
let sendName = ""
let title = ""
let detail = ""
let price = ""
let tip = ""
let add = ""
let imgFile = ""
let cloudPath = ""
// 驾校数据
let sendName_1 = ""
let title_1 = ""
let detail_1 = ""
let price_1 = ""
let add_1 = ""
let list_1 = ""
let imgFile_1 = ""
let cloudPath_1 = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  // 上传图片
  uploadImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        imgFile = res.tempFilePaths[0]
        cloudPath = "2021" + Date.now()
        wx.showToast({
          title: '上传成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
        });
      }
    });
  },
  // 发布者名字
  sendName(e) {
    sendName = e.detail.value
  },
  // 标题
  title(e) {
    title = e.detail.value
  },
  // 介绍
  detail(e) {
    detail = e.detail.value
  },
  // 价格
  price(e) {
    price = e.detail.value
  },
  // 标签
  tip(e) {
    tip = e.detail.value
  },
  // 地址
  add(e) {
    add = e.detail.value
  },
  // 发布兼职信息
  sendPart() {
    // 分割标签
    let tip_arr = []
    tip_arr = tip.split(',')
    let db = wx.cloud.database().collection("part_time")
    let part_id = Date.now()
    db.add({
      data: {
        part_id: part_id
      }
    }).then(res => {
      wx.cloud.uploadFile({
        cloudPath: cloudPath, //云存储的路径
        filePath: imgFile,  //本地图片路径
        success: res => {
          let fileID = res.fileID
          db.where({ part_id: part_id }).update({
            data: {
              fileID: fileID,
              sendName: sendName,
              title: title,
              detail: detail,
              price: price,
              tip: tip_arr,
              add: add,
            }
          }).then(res => {
            wx.showToast({
              title: '发布成功',
              icon: 'none',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                wx.navigateBack({
                  delta: 1
                });
              },
            });
          })
        },
      })
    })

  },
  // 发布驾校信息合计
  uploadImg_1() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        imgFile_1 = res.tempFilePaths[0]
        cloudPath_1 = "2021" + Date.now()
        wx.showToast({
          title: '上传成功',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
          },
        });
      }
    });
  },
  title_1(e) {
    title_1 = e.detail.value
  },
  detail_1(e) {
    detail_1 = e.detail.value
  },
  price_1(e) {
    price_1 = e.detail.value
  },
  add_1(e) {
    add_1 = e.detail.value
  },
  list_1(e) {
    list_1 = e.detail.value
  },
  sendName_1(e) {
    sendName_1 = e.detail.value
  },
  sendCar() {
    let car_id = Date.now()
    let db = wx.cloud.database().collection("car_school")
    let list = []
    list = list_1.split(',')
    db.add({
      data: {
        car_id: car_id
      }
    }).then(res => {
      wx.cloud.uploadFile({
        cloudPath: cloudPath_1, //云存储的路径
        filePath: imgFile_1,  //本地图片路径
        success: res => {
          // console.log("上传成功",res);
          let fileID = res.fileID
          db.where({ car_id: car_id }).update({
            data: {
              sendName: sendName_1,
              fileID: fileID,
              title: title_1,
              detail: detail_1,
              price: price_1,
              add: add_1,
              list: list
            }
          }).then(res => {
            wx.showToast({
              title: '发布成功',
              icon: 'none',
              image: '',
              duration: 1000,
              mask: false,
              success: (result) => {
                wx.navigateBack({
                  delta: 1
                });
              },
            });
          })
        },
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

  }
})