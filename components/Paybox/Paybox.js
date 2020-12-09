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
      const { defPrice, type } = this.properties
      console.log('type', type)
      // console.log('activeNum', activeNum)
      // const activeMoney = this.data.grids[activeNum]
      const title = type == 1 ? '酬金': '加急'
      const grids = type == 1 ? [1, 5, 10, 15, 25, '其它' ] : [2]

      const activeNum =grids.findIndex(item => item == defPrice)
      this.setData({
        activeNum,
        activeMoney: defPrice,
        title,
        grids
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ok () {
      const { type } = this.properties
      if (type == 1) {
        const { activeMoney, activeNum } = this.data
        this.triggerEvent('ok', { activeMoney, activeNum })
      } else {
        this.triggerEvent('ok', { activeMoney: 2, activeNum: 0 })
      }
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
