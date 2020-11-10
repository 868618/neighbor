const { showToast, getNavbarInfo } = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    attached() {
      const { allHeight: navbarHeight } = getNavbarInfo()
      this.setData({ navbarHeight })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    save () {
      this.triggerEvent('save')
    }
  }
})
