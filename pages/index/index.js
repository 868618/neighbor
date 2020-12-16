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
    // this.locationUpdated()
    this.data.upDated && this.locationUpdated()
  },
  toDetail (e) {
    const { orderid: orderId } = e.currentTarget.dataset
    const url = `/pages/helpDetail/index?orderId=${orderId}`
    // wx.navigateTo({ url })
    if (isLogin()) {
      wx.navigateTo({ url })
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
  upDate () {
    this.setData({
      upDated: true
    }, this.locationUpdated)
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
  // 下拉刷新

  async onPullDownRefresh () {
    // wx.startPullDownRefresh()
    await this.locationUpdated()
    wx.stopPullDownRefresh()
  },

  onShareAppMessage () {
    return {
      title: '远亲不如近邻，伸出你的小手帮邻居一个小忙吧~',
      path: '/pages/index/index',
      imageUrl: this.data.orderList.length ? null : '/images/login/logo.png'
    }
  },
  toSinglePage () {
    wx.navigateTo({ url: '/pages/single/index' })
  }
})
