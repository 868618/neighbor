const { globalData, initLocation } = getApp()

Component({
  properties: {
    background: {
      type: String,
      value: 'rgba(255, 255, 255, 1)',
    },
    // 是否沉浸式
    isImmersive: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: '#031c24',
    },
    title: {
      type: String,
      value: '',
    },
    back: {
      type: Boolean,
      value: true,
    },
    delta: {
      type: Number,
      value: 1,
    },
    logo: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'goBack'
    }
  },
  data: {
    statusBarHeight: '',
    titleBarHeight: '',
    showGoHome: false,
    isHome: false,
    sectionStyle: '',
    bastardStyle: '',
    _type: null,
    menuButtonHeight: null,
    isTabbbar: false,
    currAddress: null,
    _mark: null
  },
  lifetimes: {
    async attached() {
      this.makeMenuButton()
      this.makeType()
    }
  },
  pageLifetimes: {
    show() {
      const currAddress = wx.getStorageSync('currAddress')
      currAddress ? this.getNewAddress() : initLocation().then(() => this.getNewAddress())
    }
  },
  methods: {
    makeType () {
      const [{ is }] = getCurrentPages().reverse()
      console.log('is', is)
      const tabbar = [
          'pages/index/index',
          'pages/mine/mine'
      ]
      this.setData({
        isHome: is == 'pages/index/index',
        isTabbar: tabbar.some(item => item == is)
      })
    },
    makeMenuButton () {
      const { allHeight, height, left } = globalData.navbarInfo
      const menuButtonHeight = height

      const { isImmersive } = this.properties
      const background = !isImmersive ? '#FFF' : 'rgba(0, 0, 0, 0)'

      const bastardStyle = `width: 100vw;height: ${allHeight}px;`

      const sectionStyle = `height: ${allHeight}px;padding-left: ${left}px; background: ${background};`
      this.setData({ bastardStyle, sectionStyle, menuButtonHeight })
    },
    tapHandle () {
      this.triggerEvent('tapHandle')
    },
    goBack () {
      wx.navigateBack()
    },
    custom (){
      this.triggerEvent('custom')
    },
    toLocation () {
      wx.navigateTo({
        url: '/pages/location/index'
      })
    },
    getNewAddress () {
      const currAddress = wx.getStorageSync('currAddress')
      const _mark = JSON.stringify(currAddress)
      if (this.data._mark !== _mark) {
        this.setData({
          currAddress,
          _mark
        })
        const { nearest } = currAddress
        this.triggerEvent('update', nearest)
        console.log('定位更新了')
      }
    }
  }
});
