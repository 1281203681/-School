// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotDataObj:[],
    naviObj:""
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
    this.getNa()
    this.getData();
    this.tipLogin()
  },
  //获取导航栏信息
  getNa(){
    wx.cloud.database().collection("user_napicture").get().then(res=>{
      // console.log("获取成功",res);
      this.setData({
        naviObj:res.data
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
    return {
      title: "广油新鲜事都在这啦",
      // desc:"什么是内容？",
      path: "",
      imageUrl: ""
    }
  },
  // 获取数据库内容
  getData(){
    wx.cloud.callFunction({
      name:"getHot",
      success:res=>{
        // console.log(res);
        let dataLength=res.result.data.length
        let hotDataObj=[]
        for(let i=0;i<dataLength;i++){
          if(res.result.data[i].weatherHot==true){
            hotDataObj.push(res.result.data[i])
          }
        }
        this.setData({
          hotDataObj:hotDataObj
        })
      }
    })
    // wx.cloud.database().collection("user_send").orderBy('time', 'desc').get().then(res=>{
    //   console.log(res);
    //   let dataLength=res.data.length;
    //   let hotDataObj=[]
    //   for(var i=0;i<dataLength;i++){
    //     if(res.data[i].weatherHot==true){
    //       hotDataObj.push(res.data[i])
    //     }
    //   }
    //   this.setData({
    //     hotDataObj:hotDataObj
    //   })
    // })
  },
  // 跳转页面
  gotoDetail(e){
    // console.log(e);
    // console.log(e.currentTarget.dataset.item.mesId);
    wx.navigateTo({
      url: '/pages/school_detail/school_detail?id='+e.currentTarget.dataset.item.mesId,
      success: (result)=>{
        
      },
    });
  },
  //提醒登录
  tipLogin(){
    let statue=wx.getStorageSync("userinfo");
    if(statue==""){
      wx.showModal({
        title: '提示',
        content: '您还未登录，请登录后使用',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            });
          }
        },
      });
    }
  }
})