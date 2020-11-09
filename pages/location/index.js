const { surface } = getApp()
const QQMapWX = require('../../libs/qqmap-wx-jssdk')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nearby: [],
    recommend: '',
    villageName: '',
    location: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // this.selectComponent('#mask').show()
    const { latitude, longitude } = await surface(wx.getLocation, { isHighAccuracy: true })
    // 当前坐标
    const location = { latitude, longitude }
    this.setData({ location })
    // 实例化腾讯地图
    this.qqmapsdk = new QQMapWX({
      key: '2VFBZ-WVLWR-VX7WP-WVDQR-2W263-WFBT5',
    })
    wx.showLoading()
    await this.getNearby(location)
    await this.getCurrentLocation(location)
    wx.hideLoading()
  },
  getCurrentLocation (location) {
    const _this = this
    this.qqmapsdk.reverseGeocoder({
      location,
      success (res) {
        // console.log('getCurrentLocation', res)
        const { status, result } = res
        if (status == 0) {
          console.log('result', result)
          const { formatted_addresses: { recommend } } = result
          _this.setData({ recommend })
        }
      },
      fail (err) {
        console.log('err', err)
      }
    })
  },
  goAndSearch () {
    const _this = this
    const { location, villageName: keyword } = this.data
    this.qqmapsdk.search({
      location,
      address_format: 'short',
      keyword,
      success (res) {
        // console.log('搜索附近的小区', res)
        const { status, data: nearby } = res
        if (status == 0) {
          // const { formatted_addresses: { recommend } } = nearby
          console.log('recommend', nearby)
        }
      },
      fail (err) {
        console.log('err', err)
      }
    })
  },
  getNearby (location, keyword = '小区') {
    const _this = this
    this.qqmapsdk.search({
      location,
      address_format: 'short',
      keyword,
      success (res) {
        console.log('搜索附近的小区', res)
        const { status, data: nearby } = res
        if (status == 0) {
          _this.setData({ nearby })
        }
      }
    })
  },
  addLocation () {
    console.log(123456)
    this.selectComponent('#mask').show()
  },
  ok () {
    console.log('ok888')
    this.selectComponent('#mask').hide()
  },
  cancel () {
    this.selectComponent('#mask').hide()
  }
})