// pages/dorm_goods/dorm_goods.js
let openid = ""
let shop_id = ""
let content = ""//分类内容
let goods_name = ""
let goods_detail = ""
let goods_price = ""
let tempFile = ""
let cloudPath = ""
let fileID = ""
let goods_type_index = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modal_statue: true,
    add_goods_active: false,
    index: 0,
    goods_type_obj: "",
    goods_obj: "",
    type_obj: "",
    tempTip:"",
    goods_id:""
  },
  // 初始化全局变量方法
  refresh() {
    content = ""
    goods_name = ""
    goods_detail = ""
    goods_price = ""
    tempFile = ""
    cloudPath = ""
    fileID = ""
    goods_type_index = 0
  },
  pickerChange(e) {
    // console.log(e);
    // console.log(e.detail.value);
    // this.setData
    goods_type_index = e.detail.value
    this.setData({
      index: goods_type_index
    })
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
  getOpenId() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        openid = res.result.openid
        this.getGoodsType()
        this.getGoods()
        // 获取shop_id
        wx.cloud.database().collection("goods_list_2").get().then(res => {
          // console.log(res.data[0].shop_id);
          shop_id = res.data[0].shop_id
        })
      }
    })
  },
  // 商品展示
  getGoods() {
    wx.cloud.database().collection("dorm_goods").where({ openid: openid }).get().then(res => {
      // console.log(res.data);
      this.setData({
        goods_obj: res.data
      })
    })
  },
  // 添加分类
  add_type() {
    this.setData({
      modal_statue: false
    })

  },
  // 分类内容
  addContent(e) {
    content = e.detail.value
  },
  // 点击添加
  confirm() {
    wx.showLoading({
      title: "请稍后",
      mask: true,
      success: (result) => {

      },
    });
    let _ = wx.cloud.database().command
    wx.cloud.database().collection("goods_list_2").where({ openid: openid }).update({
      data: {
        goods_type: _.push(content)
      }
    }).then(res => {
      wx.hideLoading();
      this.setData({
        modal_statue: true
      })
      this.onShow()
    })
  },
  // 点击取消
  cancel() {
    this.setData({
      modal_statue: true
    })
  },
  // 添加商品
  add_goods() {
    this.setData({
      add_goods_active: true
    })
  },
  goods_name(e) {
    goods_name = e.detail.value
  },
  goods_detail(e) {
    goods_detail = e.detail.value
  },
  goods_price(e) {
    goods_price = e.detail.value
  },
  // 获取商品分类
  getGoodsType() {
    wx.cloud.database().collection("goods_list_2").where({ openid: openid }).get().then(res => {
      // console.log(res.data[0].goods_type);
      this.setData({
        goods_type_obj: res.data[0].goods_type
      })
    })
  },
  // 上传商品图片
  uploadImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res);
        tempFile = res.tempFilePaths[0]
        cloudPath = openid + Date.now()
        wx.cloud.uploadFile({
          cloudPath, //云存储的路径
          filePath: tempFile,  //本地图片路径
          success: res => {
            // console.log("");
            fileID = res.fileID
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: false,
            });
          }
        })
      },
    });
  },
  // 点击提交
  submit() {
    if (!fileID || !goods_name || !goods_detail || !goods_price) {
      wx.showModal({
        title: '警告',
        content: '请完善所有信息后提交！',
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
    else if(this.data.tempTip==1){
      wx.cloud.database().collection("dorm_goods").where({goods_id:this.data.goods_id}).update({
        data:{
          goods_img:fileID,
          goods_name: goods_name,
          goods_detail: goods_detail,
          goods_price: goods_price,
          goods_type: this.data.goods_type_obj[goods_type_index]
        }
      }).then(res=>{
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          image: '',
          duration: 1500,
          mask: false,
          success: (result)=>{
            this.onShow()
            this.setData({
              add_goods_active:false
            })
          },
        });
      })
    }
    else {
      let goods_id = new Date().getTime()
      wx.cloud.database().collection("dorm_goods").add({
        data: {
          // goods_obj: _.push({fileID})
          openid: openid,
          goods_id: goods_id,
          goods_img: fileID,
          goods_name: goods_name,
          goods_detail: goods_detail,
          goods_price: goods_price,
          goods_num: 0,
          shop_id: shop_id,
          goods_type: this.data.goods_type_obj[goods_type_index]
          // shop_id:
        }
      }).then(res => {
        wx.showToast({
          title: '商品发布成功！',
          icon: 'success',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {
            this.setData({
              add_goods_active: false
            })
            this.onShow()
            this.refresh()
          },
        });
      })
    }
  },
  // 删除商品
  deletGoods(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.item.goods_id);
    wx.showModal({
      title: '提示',
      content: '您确定要删除该商品吗，删除后无法回复，需要自行重新上架',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          let goods_id = e.currentTarget.dataset.item.goods_id
          wx.cloud.database().collection("dorm_goods").where({ goods_id: goods_id }).remove().then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                this.onShow()
              },
            });
          })
        }
      },
      fail: () => { },
      complete: () => { }
    });

  },
  // 编辑商品
  changeGoods(e){
    // console.log(e);
    // console.log(e.currentTarget.dataset.name.goods_id);
    this.setData({
      add_goods_active:true,
      tempTip:1,
      goods_id:e.currentTarget.dataset.name.goods_id
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