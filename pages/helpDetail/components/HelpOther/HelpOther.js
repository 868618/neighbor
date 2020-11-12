const { showToast, getNavbarInfo } = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: String,
      value: ''
    },
    time: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: null
  },

  lifetimes: {
    attached() {
      const { allHeight: navbarHeight } = getNavbarInfo()
      this.setData({ navbarHeight})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    save () {
      const { address, time } = this.properties
      // console.log('_address', _address)
      if (address == '') {
        showToast('请输入地址')
        return
      }

      if (time == '') {
        showToast('请输入时间')
        return
      }
      this.triggerEvent('save')
    }
  }
})
