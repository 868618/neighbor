const { globalData, initLocation } = getApp()
const chooseLocation = requirePlugin('chooseLocation')
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
    _mark: null,
    menuHeightstyle: ""
  },
  lifetimes: {
    async attached() {
      this.makeMenuButton()
      this.makeType()
    }
  },

  pageLifetimes: {
    async show() {
      const selectedLocationInfo = chooseLocation.getLocation()
      if (selectedLocationInfo) {
        const { latitude, longitude, name } = selectedLocationInfo
        const location = { latitude, longitude }
        const currAddress = await initLocation(location)
        wx.setStorageSync('name', name)
        this.setData({ currAddress, name }, this.getNewAddress)
      } else {
        const currAddress = wx.getStorageSync('currAddress')
        currAddress ? this.getNewAddress() : initLocation().then(() => this.getNewAddress())
      }


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
      const menuHeightstyle = `height: ${ menuButtonHeight }px;`
      this.setData({ bastardStyle, sectionStyle, menuButtonHeight, menuHeightstyle })
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
      // wx.navigateTo({
      //   url: '/pages/location/index'
      // })

      const currAddress = wx.getStorageSync('currAddress')
      const { lat:latitude, lng: longitude } = currAddress.location

      const key = '2VFBZ-WVLWR-VX7WP-WVDQR-2W263-WFBT5'; //使用在腾讯位置服务申请的key
      const referer = '邻居帮'; //调用插件的app的名称
      const location = JSON.stringify({
        latitude,
        longitude
      });
      const category = '房产小区,公司企业,购物';

      wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
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
      }
    }
  }
});
