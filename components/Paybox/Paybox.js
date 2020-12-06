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
    grids: [0, 1, 5, 10, 15, '其它' ],
    activeNum: 1,
    activeMoney: null,
    title: null,
    isShowDialog: false,
    inputNum: null
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
      console.log('activeMoney', activeMoney)
      if (activeMoney == "其它") {
        this.setData({ activeNum, isShowDialog: true })
        return
      }
      this.setData({ activeNum, activeMoney })
    },
    closeBg () {
      this.triggerEvent('cancel')
    },
    onDialogTap (e) {
      console.log(e.detail)
      const isOk = e.detail
      console.log('isOk', isOk)
      if (isOk) {
        this.setData({ activeMoney: this.data.inputNum })
        this.ok()
      }
      this.setData({ isShowDialog: false })
    }
  }
})
