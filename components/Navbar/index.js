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
  },
  lifetimes: {
    attached() {
      this.makeMenuButton()
    }
  },
  methods: {
    makeMenuButton () {
      // 右侧胶囊位置信息
      const menuRect = wx.getMenuButtonBoundingClientRect()
      const { height, top, right } = menuRect
      console.log('胶囊信息', menuRect)
      // 系统信息
      const { windowWidth } =  wx.getSystemInfoSync()
      // 导航区域总高度
      const sectionHeight = height + top
      // 导航区域内边距
      const sectionPaddingLeft = windowWidth - right

      const { isImmersive } = this.properties
      const background = !isImmersive ? '#FFF' : 'rgba(0, 0, 0, 0)'

      const bastardStyle = `width: 100vw;height: ${sectionHeight}px;`

      const sectionStyle = `height: ${sectionHeight}px;padding-left: ${sectionPaddingLeft}px; background: ${background};`
      this.setData({ sectionStyle, bastardStyle })
    },
    tapHandle () {
      this.triggerEvent('tapHandle')
    },
    goBack () {
      wx.navigateBack()
    }
  }
});
