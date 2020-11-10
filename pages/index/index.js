//index.js
//获取应用实例
const { globalData } = getApp()

Page({
  data: {
    avator: 'https://oss.guangmangapp.com/21ea3333-bf0a-405b-8d88-f479049ed8b7?x-oss-process=image/resize,s_370/format,jpg',
    title: ''
  },
  onLoad() {
    console.log('onLoad')
  },
  onShow () {
    this.setData({ title: globalData.currAddress })
  },
  toDetail () {
    wx.navigateTo({
      url: '/pages/helpDetail/index'
    })
  }
})
