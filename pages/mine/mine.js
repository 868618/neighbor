// pages/mine/mine.js
import { mine } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://oss.cogo.club/6d0c11dd-64c0-40bb-9851-409efa21f982.jpg',
    userInfo: {}
  },
  onShow () {
    typeof this.getTabBar === 'function' && this.getTabBar().setData({ activeNum: 2 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })
  },
  toTaskList () {
    wx.navigateTo({ url: '/pages/order/order' })
  }
})
