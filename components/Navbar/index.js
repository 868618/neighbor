const { globalData, initLocation } = getApp()
const chooseLocation = requirePlugin('chooseLocation')
import { tool } from '../../api/index'

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
        console.log(123)
        const { latitude, longitude, name } = selectedLocationInfo
        const location = { latitude, longitude }
        const currAddress = await initLocation(location)
        wx.setStorageSync('name', name)
        await this.upDateId()
        this.setData({ currAddress, name }, () => {
          this.getNewAddress()
        })
      } else {
        console.log(456)
        const currAddress = wx.getStorageSync('currAddress')
        currAddress ? this.getNewAddress() : initLocation().then(async () => {
          await this.upDateId()
          this.getNewAddress()
        })
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
      const name = wx.getStorageSync('name')
      const _mark = JSON.stringify(currAddress)
      if (this.data._mark !== _mark) {
        this.setData({
          currAddress,
          _mark,
          name
        })
        this.triggerEvent('update')
      }
    },
    makeGetIdParams (currAddress) {
      const name = wx.getStorageSync('name') || currAddress.address
      const { lat: latitude, lng: longitude } = currAddress.location
      const { province: provinceName, city: cityName, district: districtName } = currAddress.address_component

      const systemInfo = globalData.systemInfo
      const nearbyAddressList = currAddress.pois.map(item => {
        // console.log('item', item)
        const { province, city, district } = item.ad_info
        const { lat, lng } = item.location
        return { provinceName: province, cityName: city, districtName: district, latitude: lat, longitude: lng, name: item.title, ...systemInfo }
      })

      return {
        provinceName,
        cityName,
        districtName,
        latitude,
        longitude,
        name,
        nearbyAddressList
      }
    },
    async upDateId () {
      console.log('upDateId')
      const currAddress = wx.getStorageSync('currAddress')
      const options = this.makeGetIdParams(currAddress)
      const res = await tool.getIdByCurrAddress(options)
      console.log('getIdByCurrAddress---', res)
      if (res.code == 0) {
        wx.setStorageSync('id', res.body.id)
      }
    }
  }
});
