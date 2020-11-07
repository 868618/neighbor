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

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    const { info, body } = await mine.getAccountInfo()
    console.log('info', info)
    console.log('body', body)
    this.setData({
      userInfo: body
    })
  },
  toTaskList () {
    wx.navigateTo({ url: '/pages/order/order' })
  }
})
