// components/lotteryCmp/tipsBox/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tipsData:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBtn() {
      this.triggerEvent("closeTipsBox",true)
    }
  }
})
