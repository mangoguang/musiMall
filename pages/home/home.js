// pages/home/home.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({
  data: {
    activeList: [
      {
        activeName: "慕思篮球王全国挑战赛报名",
        linkTo: "basketSignUp",
        id:1,
        type:'page',
        active: "我要报名",
        bannerImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/icon/1.png",
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/basketball.png"
      },
      
      {
        activeName: "2019篮球世界杯门票大抽奖",
        linkTo: "lottery",
        id:2,
        active: "点击抽奖",
        bannerImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/icon/2.png",
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/choujiang.png"

      },
      {
        activeName: "慕思产品超低价秒杀",
        linkTo: "activity",
        id:3,
        active: "立即抢购",
        bannerImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/icon/3.png",
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/miaosha.png"

      },
      {
        activeName: "慕思全民篮球王小游戏",
        linkTo: "game",
        id:4,
        active: "开始游戏",
        bannerImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/icon/4.png",
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/game.png"

      },
      // {
      //   activeName: "慕思满额抽奖",
      //   linkTo: "check",
      //   activeIconName: "查看中奖名单",
      //   id:5,
      //   activeImage: "https://mobiletest.derucci.net/web/musiMall/images/newHome/choujiang.png"

      // }
    ],
    phoneStatus: false,
    btnStatus: false
  },
  onLoad () {
    // this.test()

     wx.showLoading({
        title: '加载中',
        mask: true
      })
    //判断onLaunch是否执行完毕
    if (app.globalData.userId) {
      wx.hideLoading()
      this.handlePhoneStatus(app.globalData.phone)
      this.scoreStatus(app.globalData.integralStatus)
    } else {
      app.checkLoginReadyCallback = res => {
        wx.hideLoading()
        this.handlePhoneStatus(res.data.mobileNumber)
        this.scoreStatus(res.data.integralStatus)
      };
    }
  },
  test() {
    wx.request({
      url: "https://qiang.derucci.com/oauth/token",
      // url: "https://op.derucci.com/oauth/token",
      method:'post',
      data: {
        grant_type: 'client_credentials',
        client_id: '20190425670723',
        client_secret: '5964cf66364926afa2bf8523730465g8'
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      responseType: 'text',
      success: res => {
        console.log(222,res)
      },
      fail: err => {
        reject(err)
      }

    })
  },
  //是否已经领取积分
  scoreStatus(status) {
    const btnStatus = status? false : true
    this.setData({
      btnStatus
    })
  },

  //手机授权
  handlePhoneStatus(phone) {
    if(phone) {
      this.setData({
        phoneStatus: true
      })
    }
  },
  setPhoneStatus(e) {
    if (e.detail) {
      this.setData({
        phoneStatus: true
      })
    }
  },
  handleBtnStatus(e) {
    this.setData({
      btnStatus: false
    })
  }
})