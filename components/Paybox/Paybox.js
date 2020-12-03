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
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    grids: [1, 5, 10, 15, 25, '其它'],
    activeNum: 1,
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
      console.log('e-----', e)
      const { index:activeNum, item: activeMoney } = e.currentTarget.dataset
      console.log('activeNum', activeNum)
      this.setData({ activeNum, activeMoney })
    },
    selectOther () {
      console.log('其他金额')
      this.setData({ activeNum: -1, activeMoney: -1 })
    }
  }
})
