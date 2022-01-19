// pages/dorm_shop_mani/dorm_shop_mani.js
let openid=""
let content=""
let id=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modal_statue:true,
    shopObj:""
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
  getOpenId(){
    wx.showLoading({
      title: "数据加载中",
      mask: true,
      success: (result)=>{
        wx.cloud.callFunction({
          name:"login",
          success:res=>{
            openid=res.result.openid
            wx.cloud.database().collection("goods_list_2").where({openid:openid}).get().then(res=>{
              this.setData({
                shopObj:res.data[0]
              })
            })
            wx.hideLoading();
          }
        })
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
  changeConent(e){
    content=e.detail.value
  },
  change(e){
    // console.log(e.currentTarget.id);
    id=e.currentTarget.id
    this.setData({
      modal_statue:false
    })
  },
  cancel(){
    this.setData({
      modal_statue:true
    })
  },
  confirm(){
    let db=wx.cloud.database().collection("goods_list_2").where({openid:openid})
    let end=wx.showToast({
      title: '修改成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        this.setData({
          modal_statue:true
        })
        this.onShow()
      },
    });
    if(id==1){
      db.update({
        data:{
          shop_name:content
        }
      }).then(res=>[
        end
      ])
    }
    else if(id==2){
      db.update({
        data:{
          shop_detail:content
        }
      }).then(res=>{
        end
      })
    }
    else if(id==3){
      db.update({
        data:{
          shop_contect:content
        }
      }).then(res=>{
        end
      })
    }
  },
  //上下限管理
  checkStatue(){
    wx.cloud.database().collection("goods_list_2").where({ openid: openid }).get().then(res => {
      let shop_or = res.data[0].shop_or
      if (shop_or == true) {
        shop_or = false
      }
      else {
        shop_or = true
      }
      wx.cloud.database().collection("goods_list_2").where({ openid: openid }).update({
        data: {
          shop_or: shop_or
        }
      }).then(res => {
        this.onShow()
      })
    })
  } 
})