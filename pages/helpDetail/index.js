// pages/helpDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmp: 'http://oss.cogo.club/a34dd613-2323-427b-803d-ccacf498de35.png',
    status: null,
    type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = 'write'
    const status = 'yibangzhu'
  },
  toLocation () {
    wx.navigateTo({ url: '/pages/location/index' })
  }
})