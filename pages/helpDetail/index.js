const { showToast, getNavbarInfo } = getApp()
import { helpDetail } from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmp: 'http://oss.cogo.club/a34dd613-2323-427b-803d-ccacf498de35.png',
    status: null,
    type: null,
    masks: {
      isShowHelpOther: false,
      isShowWriteAnswer: false,
      isShowTextArea: false,
      navBarType: 'location'
    },
    placeHolderStyle: 'font-size: 32rpx;font-weight: 400;color: rgba(0, 0, 0, 0.25);',
    answer: '',
    time: null,
    address: '',
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { orderId } = options
    this.setData({ orderId })
    this.getDetailInfo({ orderId })
  },
  accept () {
    showToast('接受本次应助的接口')
  },

  hideHelpOtherMask () {
    this.setData({
      'masks.isShowHelpOther': false,
      'masks.navBarType': 'location',
    })
  },

  toHelpOther () {
    this.setData({
      'masks.isShowHelpOther': true,
      'masks.navBarType': 'custom',
    })
  },

  async getDetailInfo (data) {
    wx.showLoading()
    const { code, body: detail } = await helpDetail.getDetail(data)
    wx.hideLoading()
    if (code == 0) {
      this.setData({ detail })
    }
  },

  openWriteAnswerMask () {
    this.selectComponent('#mask').show(() => {
      this.setData({ 'masks.isShowTextArea': true })
    })
  },

  // 写回答
  async writeAnswer () {
    let { answer } = this.data
    answer = answer.trim()
    if (answer == ''){
      showToast('请输入回答内容')
      this.setData({ answer })
      return
    }
    const { orderId } = this.data
    const params = { answer, orderId: Number(orderId) }
    const { code } = await helpDetail.answer(params)
    if (code == 0) {
      wx.showToast({
        title: '帮助成功',
        icon: 'success',
        duration: 2000
      })
      this.cancelWriteAnswerMask()
    }
  },
  cancelWriteAnswerMask () {
    this.selectComponent('#mask').hide(this.setData.bind(this, { 'masks.isShowTextArea': false }))
  },


  previewImage (e) {
    console.log(e)
    const { image } = e.currentTarget.dataset
    const urls = [image]
    wx.previewImage({ urls })
  },
  save (e) {
    console.log('--------------', this.data)
    this.setData({
      'masks.isShowHelpOther': false
    })
  }
})