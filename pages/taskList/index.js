// pages/taskList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test'
    }],
    src: 'http://oss.cogo.club/71766970-92a0-4182-ba59-971f2f41d0c7.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toDetail () {
    wx.navigateTo({ url: '/pages/helpDetail/index' })
  }
})