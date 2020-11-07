// components/Mask/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ok: {
      type: String,
      value: '保存'
    },
    cancel: {
      type: String,
      value: '取消'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: null,
    isHiddenBg: true,
    isShow: false
  },
  lifetimes: {
    ready() {
      // this.show()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ok() {
      console.log('ok')
      // this.hide()
      this.triggerEvent('ok')
    },
    cancel () {
      console.log('cancel')
      // this.hide()
      this.triggerEvent('cancel')
    },
    show () {
      this.setData({
        isShow: true
      }, () => {
        const animation = wx.createAnimation()
        animation.translateY(0).step({
          duration: 200
        })
        this.setData({ animation: animation.export() })
      })
    },
    hide () {
      const animation = wx.createAnimation()
      animation.translateY('100%').step({
        duration: 200
      })
      this.setData({ animation: animation.export() })
    },
    transitionend () {
      console.log('transitionend')
      const { isHiddenBg } = this.data
      this.setData({ isHiddenBg: !isHiddenBg }, () => {
        !isHiddenBg && this.setData({ isShow: false })
      })
    }
  }
})
