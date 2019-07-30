// components/lotteryCmp/lotteryBox/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  properties: {
    allScore: Number
  },
  data: {
    optionsList:[
      {
        text: "399元代金券",
        imgUrl: "../../../images/lottery/399.png"
      },
      {
        text: "500元代金券",
        imgUrl: "../../../images/lottery/500.png"
      },
      {
        text: "时尚释压枕",
        imgUrl: "../../../images/lottery/bed.png"
      },
      {
        text: "篮球世界杯决赛VIP门票一张",
        imgUrl: "../../../images/lottery/ticket.png"
      },
      {
        text: "每次消耗50积分",
        imgUrl: "../../../images/lottery/start.png"
      },
      {
        text: "篮球世界杯排位赛门票一张",
        imgUrl: "../../../images/lottery/ticket.png"
      },
      {
        text: "眼精灵按摩眼罩",
        imgUrl: "../../../images/lottery/eye.png"
      },
      {
        text: "助眠四季精油礼盒套装",
        imgUrl: "../../../images/lottery/box.png"
      },
      {
        text: "谢谢参与",
        imgUrl: "../../../images/lottery/thank.png"
      },
      
    ],
    tipsData: {
      title: "",
      imgUrl:"",
      text:"",
      remark: "",
      type: 0
    },
    tipsStatus: false,
    awardTipsStatus: false,
    awardData: {
      imgUrl: '/images/lottery/bed.png',
      name: "时尚释压枕"
    },
    awardAnimation:[],
    key: true,
    prizeList: [],

    awardType: ""
  },
  ready() {
    this.getSize()
    this.getPrizeList()
  },
  methods: {
    //获取宽高
    getSize() {
      wx.getSystemInfo({
        success: res => {
          let rpx = 1 * (res.windowWidth * res.pixelRatio) / (750 * res.pixelRatio);
          this.setData({
            rpx: rpx//添加到小程序全局data里面
          })
          this.setAnimationSize()
        }
      })
    },
    //px转成rpx
    setAnimationSize() {
      const aniSize =  [
        {
            animate: {x: 101, y:0},
            id: 2
          }, {
            animate: {x: 202, y:0},
            id: 3
          }, {
            animate: {x: 202, y:94},
            id: 6
          }, {
            animate: {x: 202, y:187},
            id: 9
          }, {
            animate: {x: 101, y:187},
            id: 8
          }, {
            animate: {x: 0, y:187},
            id: 7
          }, {
            animate: {x: 0, y:94},
            id: 4
          },
          {
            animate: {x: 0, y:0},
            id: 1
          }, 
        ]
        for(const key of aniSize) {
          let x = key.animate.x
          let y = key.animate.y
          key.animate.x = this.data.rpx*x*2
          key.animate.y = this.data.rpx*y*2
        }
        this.setData({
          awardAnimation: aniSize
        })
    },
      //获取九宫格奖项
    getPrizeList() {
      const userId = app.globalData.userId
      indexModel.getPrizeList(userId).then(res => {
        if(res.status) {
          let data = res.data
          data.splice(4,0,{
            title: "每次消耗50积分",
          })
          this.setData({
            prizeList: data
          })
        }
      })
    },
    //抽奖
    _luckDraw() {
      const userId = app.globalData.userId
      indexModel.luckDraw(userId).then(res => {
        if(res.data) {
          this.triggerEvent("startLottery", true)
          const time = this._setAnimationTime(res.data.id)
          this._setAnimation(time)

          console.log(time)
          var timer = setTimeout(() => {
            this._setAwardTipsType(res.data.title,res.data.id)

            this._handleTipsBox(this.data.awardType)
            clearTimeout(timer)
          }, time*3);
        }
      })
    },
    //九宫格顺序
    _changeId(id) {
      if(id === 4) {
        return 7
      }else if(id === 5) {
        return 3
      }else if(id === 7) {
        return 5
      }else if(id === 8) {
        return 4
      }else if(id === 1) {
        return 8
      }else if(id === 2) {
        return 1
      }else if(id === 3) {
        return 2
      }
      else {
        return id
      }
    },
    //设置动画时间
    _setAnimationTime(id) {
      const myId = this._changeId(id)
      return 1600 + 40*myId
    },
    //设置中奖类型
    _setAwardTipsType(title,id) {
      if(title.indexOf('代金卷') !== -1 || id === 8) {
        this.setData({
          awardType: "tipsStatus"
        })
      }else {
        this.setData({
          awardType: "awardTipsStatus"
        })
      }
    },
    //开始抽奖
    handleStart() {
      if(this.data.allScore >= 50) {
        if(this.data.key) {
          this.setData({
            key: false
          })
          this._luckDraw()
        }
      }else {
        this.setData({
          tipsStatus: true
        })
      }
     
    },
    _setAnimation(time) {
      let animation = wx.createAnimation({
        duration: 20,
        timingFunction: 'ease',
        delay: 0
      });
      // var time = 1600 + 40*3 //奖品
      const ani = this.data.awardAnimation
      for(let i = 0; i < ani.length + 1; i ++) {
        time -= 40
        if(time > 800) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 25})
        }else if(time >200 && time <= 800) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 50,delay:50})
        }
        else if(time >20 && time <= 200) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 250,delay:100})
        }
        else if(time >=0 && time <= 20) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 500,delay:500})
        }
        else {
          console.log('time',i)
          this.setData({
            ani: animation.export()
          })
          return 
        }
      }
    },
    //关闭提示
    closeTipsBox() {
      const tipsName = this.data.awardType
      this.setData({
        key: true
      })
      this._handleTipsBox(tipsName,false)
    },
    //提示的内容
    setActiveStatus() {
      
    },

    _handleTipsBox(tipsName,status=true) {
      this.triggerEvent('sexFixStatus',{type:true,status})    //打开蒙层的时候底部固定
      this.setData({
        [tipsName]: status
      })
    }
  }
})
