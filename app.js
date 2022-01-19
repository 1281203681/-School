// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env:"yuanhe-5gbq4tqf522445bf"
    })
  },
  globalData: {
    userInfo: null
  }
})
