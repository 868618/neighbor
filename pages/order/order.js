import { mine } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test',
        src: '/page/weui/cell/icon_del.svg', // icon的路径
    }],
    tabs: [],
    scrollViewStyle: null,
    type: 1,
    currList: [],
    src: 'http://oss.cogo.club/71766970-92a0-4182-ba59-971f2f41d0c7.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const titles = ['进行中', '已完成', '全部']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs}, this.getList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   this.makeScrollViewStyle()
  },
  slideButtonTap () {
    console.log(123456)
  },
  toDetail () {
    wx.navigateTo({ url: '/pages/helpDetail/index' })
  },
  makeScrollViewStyle () {
    const sysInfo = wx.getSystemInfoSync()
    const query = wx.createSelectorQuery()
    query.select('#firstScroll').boundingClientRect(rect => {
      const height = sysInfo.windowHeight - rect.top
      const scrollViewStyle = `height: ${height}px;overflow: hidden;`
      this.setData({ scrollViewStyle })
    }).exec()
  },

  async getList () {
    const { type } = this.data
    const res = await mine.getNeedHelpList({ type })
    console.log('res', res)
    const { body, code } = res
    if (code == 0) {
      this.setData({ currList: body })
    }
  },
  tabChange (e) {
    const { index } = e.detail
    const type = index + 1
    this.setData({ type }, this.getList)
  }
})