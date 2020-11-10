const { showToast, getNavbarInfo } = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmp: 'http://oss.cogo.club/a34dd613-2323-427b-803d-ccacf498de35.png',
    status: null,
    type: null,
    isShowHelpOther: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = 'write'
    const status = 'yibangzhu'
    const { allHeight } = getNavbarInfo()
    console.log('allHeight', allHeight)
  },
  accept () {
    showToast('接受本次应助的接口')
  },
  toHelpOther () {

  },
  save () {
    this.setData({
      isShowHelpOther: true
    })
  }
})