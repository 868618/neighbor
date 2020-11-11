import { home } from '../../api/index'
//获取应用实例
// const { globalData, initLocation } = getApp()

Page({
  data: {
    avator: 'https://oss.guangmangapp.com/21ea3333-bf0a-405b-8d88-f479049ed8b7?x-oss-process=image/resize,s_370/format,jpg',
    title: '',
    orderList: []
  },
  async onLoad() {
    console.log(888)
  },
  toDetail () {
    wx.navigateTo({
      url: '/pages/helpDetail/index'
    })
  },
  async locationUpdated () {
    const { nearest } = wx.getStorageSync('currAddress')
    const { id: addressCode, location: { lat: gw_lat, lng: gw_lng } } = nearest
    const params = { addressCode, gw_lat, gw_lng }
    const { code, body } = await home.search(params)
    if (code == 0) {
      wx.showLoading()
      const orderList = body.orderList || []
      this.setData({ orderList })
      wx.hideLoading()
    }
  }
})
