// pages/mine/mine.js
import { mine } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://oss.cogo.club/6d0c11dd-64c0-40bb-9851-409efa21f982.jpg',
    userInfo: {},
    icons: [
      {
        src: '/images/mine/ing.png',
        title: '进行中'
      },
      {
        src: '/images/mine/over.png',
        title: '已完成'
      },
      {
        src: '/images/mine/all.png',
        title: '全部'
      }
    ]
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
    console.log('wx.getSystemInfo()', wx.getSystemInfoSync())
  },
  toTaskList (e) {
    const { type } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/order/order?type=${type}&target=iHelpOther` })
  },

  toIHelpOtherList(e) {
    const { type } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/order/order?type=${type}&target=toIHelpOtherList` })
  }
})
