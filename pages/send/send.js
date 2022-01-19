// pages/send/send.js
var util = require ( '../../utils/util.js' );
let userSchool=""
let price=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_openid:"",
    fileID:"",
    content:"",
    userName:"",
    userImg:"",
    arr:["表白","吐槽","卖室友","其它","二手"],
    index:0,
    statue:false,
    priceInput:true,
    total:""
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
    //获取用户的openid
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        // console.log("调用云函数成功",res);
        this.setData({
          user_openid:res.result.openid
        })
      },
      fail:err=>{
        console.log("调用云函数失败",err);
      }
    })
    // 获取用户头像和名字
    wx.getStorage({
      key: 'userinfo',
      success: (res)=>{
        let userName=res.data.nickName;
        let userImg=res.data.avatarUrl;
        this.setData({
          userName:userName,
          userImg:userImg
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
  // 选择器
  swich(e){
    // console.log(e);
    // console.log(e.detail.value);
    if(this.data.priceInput==false){
      wx.showToast({
        title: '二手信息不能匿名发布！',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          this.setData({
            statue:false
          })
        },
      });
    }
    this.setData({
      statue:e.detail.value
    })
  },
  // 输入内容
  handleContent(e){
    // console.log(e.detail.value);
    let content=e.detail.value
    this.setData({
      content:content
    })
  },
  // 上传图片
  upImg(){
    // 判断是否已经上传图片
    if(this.data.fileID!=""){
      wx.showToast({
        title: '最多只能上传一张图片！',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
      return
    }
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res)=>{
        // console.log("图片大小",res.tempFiles[0].size);
        console.log(res);
        let imgSize=res.tempFiles[0].size
        let imgFile=res.tempFilePaths[0]
        let openid=this.data.user_openid
        //图片大小不可超过5M
        if(imgSize>=1024*1024*5){
          //超过提示
          wx.showModal({
            title: '提示',
            content: '图片大小不可超过5M',
            showCancel: false,
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
          });
          //提示结束
        }
        //判断结束
        //上传图片开始
        //文件名字
        let cloudPath=openid+Date.now()
        wx.cloud.uploadFile({
          cloudPath, //云存储的路径
          filePath:imgFile,  //本地图片路径
          success:res=>{
            // console.log("上传成功",res);
            let fileID=res.fileID
            this.setData({
              fileID:fileID
            })
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000,
              mask: false,
            });
          },
          fail:err=>{
            console.log("上传失败",err);
            wx.showToast({
              title: '上传失败，请稍后再试',
              icon: 'fail',
              image: '',
              duration: 1000,
              mask: false,
            });
          }
        })
      },
      fail: (err)=>{
        console.log("选择失败",err);
      },
    });
  },
  // 点击确定发送
  bt_send(){
    wx.cloud.database().collection("user_info").where({user_openid:this.data.user_openid}).get().then(res=>{
      console.log("成功",res);
      userSchool=res.data[0].userRealSchool
    })
    wx.showModal({
      title: '提示',
      content: '确定要发送吗',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          wx.showLoading({
            title: "发送中，请稍后",
            mask: true,
            success: (result)=>{
              let openid=this.data.user_openid
              let imgId=this.data.fileID
              let content=this.data.content
              let userName=this.data.userName
              let userImg=this.data.userImg
              let sendType=this.data.index
              let statue=this.data.statue
              let time = util .formatTime ( new Date ());
              let mesId="2021"+new Date().getTime()+"2022"
              if(sendType==0){
                sendType="表白"
              }
              else if(sendType==1){
                sendType="吐槽"
              }
              else if(sendType==2){
                sendType="卖室友"
              }
              else if(sendType==3){
                sendType="其它"
              }
              else{
                sendType="二手"
              }
              wx.cloud.database().collection("user_send").add({
                data:{
                  openid:openid,
                  imgId:imgId,
                  content:content,
                  userName:userName,
                  userImg:userImg,
                  sendType:sendType,
                  statue:statue,//是否匿名发布  如果true则匿名
                  time:time,
                  userSchool:userSchool,
                  mesId:mesId,//信息的id
                  price:this.data.total
                }
              })
              wx.navigateBack({
                delta: 1
              });
            },
          });
        }
      },
    });
  },
  pickerChange(e){
    // console.log("选择类型",e);
    console.log(e.detail.value);
    if(e.detail.value==4){
      this.setData({
        priceInput:false,
        statue:false
      })
    }
    else{
      this.setData({
        priceInput:true
      })
    }
    this.setData({
      index:e.detail.value
    })
  },
  // 输入价格
  handlePrice(e){
    price=e.detail.value
    // let totalPrice=price.toFix(2)
    let temp=parseFloat(price)
    let total=temp.toFixed(2)
    // console.log(total);
    this.setData({
      total:total
    })
    // let totalPrice=temp.toFix(2)
  },
  tip(){
    if(this.data.index!=4){
      wx.showModal({
        title: '提示',
        content: '非二手信息不需要输入价格!',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  }
})