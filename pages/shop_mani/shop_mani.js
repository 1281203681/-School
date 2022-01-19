// pages/shop_mani/shop_mani.js
let openid = ""
let content = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherShop: false,
    activity: false,
    modal_statue: true,
    shopType: "",
    fileID: "",
    id: "",
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
    this.getOpenId();
  },
  // 获取用户openid
  getOpenId() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        // console.log(res.result.openid);
        openid = res.result.openid
        wx.cloud.database().collection("goods_list").get().then(res => {
          // console.log("查询成功",res);
          console.log(res.data);
          let dataLength = res.data.length
          for (let i = 0; i < dataLength; i++) {
            if (res.data[i].openid == openid) {
              this.setData({
                weatherShop: true
              })
              break
            }
          }
          // 查询店铺类型
          wx.cloud.database().collection("goods_list").where({ openid: openid }).get().then(res => {
            console.log(res);
            this.setData({
              shopType: res.data[0].shop_type,
              goodsObj: res.data[0]
            })
          })
        })
      }
    })
  },
  // 点击创建店铺
  creatShop() {
    this.setData({
      activity: true
    })
  },
  // 选择打印店
  // printShop() {
  //   wx.showLoading({
  //     title: "创建中，请稍后",
  //     mask: true,
  //     success: (result) => {

  //     },
  //   });
  //   wx.cloud.database().collection("goods_list").add({
  //     data: {
  //       openid: openid,
  //       shop_id: 2021081101
  //     }
  //   }).then(res => {
  //     wx.hideLoading();
  //     wx.cloud.database().collection("user_info").where({user_openid:openid}).update({
  //       data:{
  //         shopType:1
  //       }
  //     }).then(res=>{
  //       wx.showModal({
  //         title: '提示',
  //         content: '创建成功，请退出页面重新进入',
  //         showCancel: false,
  //         cancelText: '取消',
  //         cancelColor: '#000000',
  //         confirmText: '确定',
  //         confirmColor: '#3CC51F',
  //         success: (result) => {
  //           if (result.confirm) {
  //             wx.navigateBack({
  //               delta: 1
  //             });
  //           }
  //         },
  //       });
  //     })
      
  //   })
  // },
  // 选择宿舍小卖铺
  // dormShop() {
  //   wx.cloud.database().collection("goods_list_2").add({
  //     data:{
  //       openid:openid,
  //       shop_id:2021081102
  //     }
  //   }).then(res=>{
  //     wx.cloud.database.collection("user_info").where({user_openid:openid}).update({
  //       data:{
  //         shopType:2
  //       }
  //     }).then(res=>{
  //       wx.redirectTo({
  //         url: '/pages/dorm_shop/dorm_shop',
  //         success: (result) => {
  //         },
  //       });
  //     })
  //   })
  // },
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
  changeImg() {
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
            wx.cloud.database().collection("goods_list").where({ openid: openid }).update({
              data: {
                goods_img: fileID
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
  // 该名称
  changeName(e) {
    this.setData({
      modal_statue: false,
      id: e.currentTarget.id
    })
  },
  // 修改内容
  changeConent(e) {
    content = e.detail.value
  },
  // 确定上传
  confirm(e) {
    let id = this.data.id
    if (id == 1) {
      wx.cloud.database().collection("goods_list").where({ openid: openid }).update({
        data: {
          goods_name: content
        }
      }).then(res => {
        this.setData({
          modal_statue: true
        })
        wx.showToast({
          title: '修改成功',
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
    else if (id == 2) {
      wx.cloud.database().collection("goods_list").where({ openid: openid }).update({
        data: {
          goods_detail: content
        }
      }).then(res => {
        this.setData({
          modal_statue: true
        })
        wx.showToast({
          title: '修改成功',
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
    else if (id == 3) {
      wx.cloud.database().collection("goods_list").where({ openid: openid }).update({
        data: {
          goods_phone: content
        }
      }).then(res => {
        this.setData({
          modal_statue: true
        })
        wx.showToast({
          title: '修改成功',
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
    else if (id == 4) {
      wx.cloud.database().collection("goods_list").where({ openid: openid }).update({
        data: {
          goods_price: content
        }
      }).then(res => {
        this.setData({
          modal_statue: true
        })
        wx.showToast({
          title: '修改成功',
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
  cancel() {
    this.setData({
      modal_statue: true
    })
  },
  // 上下限管理
  checkStatue() {
    wx.cloud.database().collection("goods_list").where({ openid: openid }).get().then(res => {
      // console.log(res.data[0].shop_or);
      let shop_or = res.data[0].shop_or
      if (shop_or == true) {
        shop_or = false
      }
      else {
        shop_or = true
      }
      wx.cloud.database().collection("goods_list").where({ openid: openid }).update({
        data: {
          shop_or: shop_or
        }
      }).then(res => {
        this.onShow()
      })
    })
  }
})