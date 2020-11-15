import { home } from '../../api/index'
//获取应用实例
// const { globalData, initLocation } = getApp()

Page({
  data: {
    avator: 'https://oss.guangmangapp.com/21ea3333-bf0a-405b-8d88-f479049ed8b7?x-oss-process=image/resize,s_370/format,jpg',
    title: '',
    orderList: [],
    list: [
      {
        "text": "对话",
        "iconPath": "/images/tabbar/home.png",
        "selectedIconPath": "/images/tabbar/home_active.png",
      },
      {
        "iconPath": "/images/tabbar/light.png",
        "selectedIconPath": "/images/tabbar/light.png",
        "text": "求助",
      },
      {
        "text": "我的",
        "iconPath": "/images/tabbar/mine.png",
        "selectedIconPath": "/images/tabbar/mine_active.png",
      }
    ]
  },
  onShow () {
    typeof this.getTabBar === 'function' && this.getTabBar().setData({ activeNum: 0 })
  },
  toDetail () {
    wx.navigateTo({
      url: '/pages/helpDetail/index'
    })
  },
  async locationUpdated () {
    console.log('更新一把首页接口')
    const addressCode = wx.getStorageSync('id')
    const params = { addressCode }


    // const { nearest } = wx.getStorageSync('currAddress')
    // const { id: addressCode, location: { lat: gw_lat, lng: gw_lng } } = nearest
    // const params = { addressCode, gw_lat, gw_lng }
    wx.showLoading({ mask: true })
    const { code, body } = await home.search(params)
    wx.hideLoading()
    if (code == 0) {
      const orderList = body.orderList || []
      this.setData({ orderList })
    }
  }
})
