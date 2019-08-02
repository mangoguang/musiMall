const app = getApp()
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    status: false,
    hasPhoneStatus: true
  },
  onLoad: function () {
    this.init()
    this.mapCtx = wx.createMapContext('myMap')
  },
  onShow(){
    const status = !this.data.status
    this.handleHasPhoneStatus(app.globalData.hasPhone)
    this.setData({
      status
    })
  },
  //验证客户有没有授权
  init() {
    //判断有没有授权。已授权则直接获取信息。
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取个人信息的回调。
  getUserInfo(e) {
    console.log(e)
    if(e.detail.userInfo) {
      this.checkSession(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }else {
      wx.showToast({
        title: '获取个人信息失败',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    }
  },
  //先校验sessionkey有无过期
  checkSession(e) {
    wx.checkSession({
      success:() => {
        // console.log(e)
        this.decodeUserInfo(e)
      },
      fail:() => {
        wx.login({
          success: res => {
            this.getOpenId(res.code,e)
          }
        })
      }
    })
  },
  //重新获取sessionkey
  getOpenId(code,e) {

    indexModel.getOpenId(code).then(res => {
      if (res.status) {
        app.globalData.sessionKey = res.data.sessionKey
        this.decodeUserInfo(e)
      }
    })
  },
  //验证绑定
  decodeUserInfo(e) {

    let shareUserId = "";
    if (app.globalData.shareUserId) {
      shareUserId = app.globalData.shareUserId
    }
    let obj = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: app.globalData.sessionKey,
      openId: app.globalData.openId,
      shareUserId
    }
    indexModel.decodeUserInfo(obj).then(res => {
      console.log(res)
    })
  },

  //判断手机授权
  handleHasPhoneStatus(phone) {
    if(!phone) {
      this.setData({
        hasPhoneStatus: false
      })
    }else {
      this.setData({
        hasPhoneStatus: true
      })
    }
  },
  
  //手机授权
  getPhoneNumber(e) {
    if (e.detail.encryptedData) {
      this.checkSessionNumber(e)
    }else {
      wx.showToast({
        title: '获取手机失败',
        icon: "none",
        duration: 1500
      })
    }
  },
  //先校验sessionkey有无过期
  checkSessionNumber(e) {
    wx.checkSession({
      success: () => {
        // console.log(e)
        this.decodeUserInfoNumber(e)
      },
      fail: () => {
        wx.login({
          success: res => {
            this.getOpenIdNumber(res.code, e)
          }
        })
      }
    })
  },
  //重新获取sessionkey
  getOpenIdNumber(code, e) {
    indexModel.getOpenId(code).then(res => {
      if (res.status) {
        app.globalData.sessionKey = res.data.sessionKey
        this.decodeUserInfoNumber(e)
      }
    })
  },
  //验证绑定
  decodeUserInfoNumber(e) {
    let shareUserId = "";
    if (app.globalData.shareUserId) {
      shareUserId = app.globalData.shareUserId
    }
    let obj = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: app.globalData.sessionKey,
      openId: app.globalData.openId,
      shareUserId
    }
    indexModel.getPhoneNumber(obj).then(res => {
      if(res.status) {
        app.globalData.hasPhone = true
        app.globalData.phone = res.data.mobileNumber  
        this.setData({
          hasPhoneStatus: true
        })
      }
    })
  },
  //跳转优惠券
  toCoupon() {
    wx.navigateTo({
      url: "/pages/coupon/coupon"
    })
  }
})
