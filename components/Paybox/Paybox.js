// components/Paybox/Paybox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type:Number,
      value: 1
    },
    defPrice: {
      type:Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    grids: [0, 1, 2, 3, 4, 5],
    activeNum: 0,
    activeMoney: null,
    title: null
  },

  lifetimes: {
    attached() {
      const { defPrice: activeNum, type } = this.properties
      const activeMoney = this.data.grids[activeNum]
      const title = type == 1 ? '酬金': '加急'
      this.setData({
        activeNum,
        activeMoney,
        title
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ok () {
      const { activeMoney, activeNum } = this.data
      this.triggerEvent('ok', { activeMoney, activeNum })
    },
    cancel () {
      this.triggerEvent('cancel')
    },
    selectChange (e) {
      const { index:activeNum, item: activeMoney } = e.currentTarget.dataset
      this.setData({ activeNum, activeMoney })
    },
    selectOther () {
      console.log('其他金额')
      this.setData({ activeNum: -1, activeMoney: -1 })
    }
  }
})
