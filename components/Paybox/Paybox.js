// components/Paybox/Paybox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    grids: [0, 1, 2, 3, 4, 5],
    activeNum: 0,
    activeMoney: null
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
      console.log(activeNum, activeMoney)
      this.setData({ activeNum, activeMoney })
    },
    selectOther () {
      console.log('其他金额')
      this.setData({ activeNum: -1, activeMoney: -1 })
    }
  }
})
