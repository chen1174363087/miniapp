import { baseUrlApi, requestApi, initTokenApi, getOpenIdApi } from "../../utils/util.js"
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    token: '',
    openId:'',
    hasUserInfo: false
    //canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad(){
    
  },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },

  onShow(){
    getOpenIdApi()
    // if (!app.globalData.userInfo){
    //   this.login();
    // }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  login(){
    //获取token
    requestApi(baseUrlApi() + '/initToken?openId=' + wx.getStorageSync('openId'), '', '', 'GET').then(res => {
      //wx.setStorageSync('SESSION_ID', res.data.session_id)
      console.log('token:'+res.data.token)
      this.setData({
        token: res.data.token
      })
      //获取用户信息
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          //登陆
          //存到数据库
          const method = 'POST'
          let url = baseUrlApi() + '/user/login/' + wx.getStorageSync("openId")
          const data = this.data.userInfo
        
          let header = {
            'Content-Type': 'application/json',
            'token': this.data.token
          }
          console.log('login' + this.data.token)
          //request(url, data, header, method)
          requestApi(url, data, header, method).then(res => {
            //console.log('save session_id' + wx.getStorageSync('SESSION_ID'))
            //200: 服务端业务处理正常结束
          })
        }
      })
    })
  },
})
