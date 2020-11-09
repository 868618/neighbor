const { globalData } = getApp()
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
    menuButtonHeight: null
  },
  lifetimes: {
    attached() {
      this.makeMenuButton()
      this.makeType()
    }
  },
  methods: {
    makeType () {
      const [{ is }] = getCurrentPages().reverse()
      console.log('is', is)
      this.setData({
        isHome: is == 'pages/index/index'
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
    }
  }
});
