import { home } from '../../api/index'
//获取应用实例
// const { globalData, initLocation } = getApp()
const { isLogin, surface, getNavbarInfo } = getApp()

Page({
  data: {
    orderList: [],
    allHeight: 0,
    isLoaded: false
  },
  onLoad () {
    const { allHeight } = getNavbarInfo()
    this.setData({ allHeight })
  },
  onShow () {
    typeof this.getTabBar === 'function' && this.getTabBar().setData({ activeNum: 0 })
  },
  toDetail (e) {
    const { orderid: orderId } = e.currentTarget.dataset
    const url = `/pages/helpDetail/index?orderId=${orderId}`
    if (isLogin()) {
      wx.navigateTo({
        url
      })
    } else {
      surface(wx.navigateTo, {
        url: '/pages/login/index',
        events: {
          onSucc () {
            surface(wx.redirectTo, { url })
          }
        }
      })
    }
  },
  async locationUpdated () {
    console.log('更新一把首页接口')
    const addressCode = wx.getStorageSync('id')
    const params = { addressCode }
    wx.showLoading({ mask: true })
    const { code, body } = await home.search(params)
    this.setData({ isLoaded: true })
    wx.hideLoading()
    if (code == 0) {
      const orderList = body.orderList || []
      this.setData({ orderList })
    }
  },
})
