// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://oss.cogo.club/6d0c11dd-64c0-40bb-9851-409efa21f982.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toTaskList () {
    wx.navigateTo({ url: '/pages/order/order' })
  }
})
