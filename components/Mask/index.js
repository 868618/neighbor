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
    save() {
      console.log('save')
      // this.hide()
      this.triggerEvent('ok')
    },
    cancel () {
      console.log('cancel')
      // this.hide()
      this.triggerEvent('cancel')
    },
    show (fn) {
      const animation = wx.createAnimation().translateY(0).step({ duration: 200 }).export()
      this.setData({
        isShow: true
      }, () => {
        this.setData({ animation }, fn || null)
      })
    },
    hide (fn) {
      const animation = wx.createAnimation().translateY('100%').step({ duration: 200 }).export()
      this.setData({ animation }, fn || null)
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
