let tempUser = false
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    user_openid: "",
    tempUserInfo: ""
  },
  onShow() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        console.log("云函数内容", res);

        let user_openid = res.result.openid
        this.setData({
          user_openid: user_openid
        })

        wx.cloud.database().collection("user_info").get().then(res => {
          console.log("查询成功", res);
          let dataLength = res.data.length
          // console.log(dataLength);
          for (let i = 0; i < dataLength; i++) {
            if (res.data[i].user_openid == this.data.user_openid) {
              tempUser = true;
              break;
            }
          }
          if (tempUser == false) {
            wx.cloud.database().collection("user_info").add({
              data: {
                user_openid: user_openid,
                userName: "",
                userSex: "",
                userImg: "",
                weatherShop:false
              }
            })
          }
        })
      },
      fail: err => {
        console.log("云函数调用失败", err);
      }
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("获取的信息", res);
        wx.setStorage({
          key: 'userinfo',
          data: res.userInfo,
          success: (res) => {
            // console.log(res);
            let user_openid = this.data.user_openid
            wx.cloud.database().collection("user_info").where({ user_openid: user_openid }).update({
              data: {
                userName: this.data.userInfo.nickName,
                userSex: this.data.userInfo.gender,
                userImg: this.data.userInfo.avatarUrl
              }
            }).then(res => {
              console.log("成功", res);
              wx.navigateBack({
                delta: 1
              });
            }).catch(err => {
              console.log("失败", err);
            })

          },
          fail: (err) => {
            console.log("保存失败", err);
          },
        });

        // wx.cloud.database().collection("user_info").where({user_openid:user_openid}).get().then(res=>{
        //   console.log("ss",res);
        // })

      }
    })
  },
})