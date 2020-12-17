const { showToast, globalData } = getApp()
import { helpDetail } from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmp: 'http://oss.cogo.club/a34dd613-2323-427b-803d-ccacf498de35.png',
    status: '',
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
    detail: null,
    btns: [
      {
        text: '问个问题',
        type: 'active',
        forHelpType: 10
      },
      {
        text: '借个东西',
        type: 'default',
        forHelpType: 20
      },
      {
        text: '求转让',
        type: 'default',
        forHelpType: 30
      },
      {
        text: '我馋了',
        type: 'default',
        forHelpType: 40
      },
      {
        text: '捎点东西',
        type: 'default',
        forHelpType: 50
      },
      {
        text: '其它求助',
        type: 'default',
        forHelpType: 60
      }
    ],
    isShowDialog: false,
    isShared: false,
    phone: null,
    paymentCodeUrl: null,
    bottom: null,
    isShowFindOut: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.makeTargetLocation()
    this.getDetailInfo()
  },

  async makeTargetLocation () {
    const { currAddress, name } = this.options
    if (currAddress) {
      console.log('分享过来的地址')
      wx.setStorageSync('currAddress', JSON.parse(this.options.currAddress))
      wx.setStorageSync('name', name)
      this.setData({ isShared: true })
    }
  },
  async accept () {
    showToast('接受本次应助的接口')
    const { orderId } = this.options
    const { answerList: [{ answerId }] } = this.detail
    wx.showLoading()
    const res = await helpDetail.acceptHelp({ orderId, answerId })
    if (res.code == 0) {
      this.getDetailInfo()
    }
    wx.hideLoading()
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

  async getDetailInfo () {
    const { orderId } = this.options
    wx.showLoading()
    const { code, body: detail } = await helpDetail.getDetail({ orderId })
    console.log('detail--------------', Number(detail.price))
    wx.hideLoading()
    if (code == 0) {
      console.log('detail-----', detail)
      const statusMaps = new Map()
      statusMaps.set(20, '待帮助')
          .set(30, '帮助中')
          .set(40, '已完成')
          .set(60, 'yiyingzhu')
      const status = statusMaps.get(detail.status)


      detail.buttonList && detail.buttonList.reverse()
      this.setData({ detail, status }, () => {
        detail.buttonList && wx.nextTick(() => {
          this.createSelectorQuery().select('.bottons').boundingClientRect(rect => {
            this.setData({ bottom: rect.height + 20 })
          }).exec()
        })
      })
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
    const { orderId } = this.options
    const params = { answer, orderId: Number(orderId) }
    wx.showLoading()
    const { code } = await helpDetail.answer(params)
    wx.hideLoading()
    this.cancelWriteAnswerMask()
    if (code == 0) {
      wx.showToast({
        title: '帮助成功',
        icon: 'success',
        duration: 2000
      })
      this.getDetailInfo()
    } else {
      showToast("回答失败")
    }
  },

  // 取消写回答
  cancelWriteAnswerMask () {
    this.selectComponent('#mask').hide(this.setData.bind(this, { 'masks.isShowTextArea': false }))
  },

  // 图片预览
  previewImage (e) {
    console.log(e)
    const { image } = e.currentTarget.dataset
    const urls = [image]
    wx.previewImage({ urls })
  },

  // 提交
  async save (e) {
    console.log('e-----------------9', e)
    const { address } = e.detail
      this.hideHelpOtherMask()
      const { time: expectHelpTime, phone } = this.data
      if (address && expectHelpTime) {
        const { orderId } = this.options
        const params = { expectHelpTime, orderId, phone, answer: address }
        wx.showLoading()
        const res = await helpDetail.answer(params)
        wx.hideLoading()
        if (res.code == 0) {
          this.subscribeMessage()
        }
      }
  },

  subscribeMessage () {
    const _this = this
    wx.requestSubscribeMessage({
      tmplIds: ['pSNQEP8vPyt1NLa981wMEkuS-yHqWnXpfcoH90ahTDs'],
      success() {
        console.log('订阅成功')
      },
      fail () {
        console.log('订阅失败')
      },
      complete () {
        _this.getDetailInfo()
      }
    })
  },


  onShareAppMessage () {
    const currAddress = wx.getStorageSync('currAddress')
    const name = wx.getStorageSync('name')
    const { title, orderId } = this.data.detail
    const path = `/pages/helpDetail/index?orderId=${orderId}&currAddress=${JSON.stringify(currAddress)}&name=${name}`
    console.log('path', path)
    return {
      title,
      path,
    }
  },

  again () {
    this.setData({
      isShowDialog: true
    })
  },

  async onTap (e) {
    if (e.detail) {
      const { orderId } = this.options
      const res = await helpDetail.again({ orderId })
      console.log('res', res)
      this.getDetailInfo()
    }

    this.setData({
      isShowDialog: false
    })
  },

  toIndexPage () {
    wx.switchTab({ url: '/pages/index/index' })
  },

  upLoaded (e) {
    const { image:paymentCodeUrl } = e.detail
    // console.log('image', paymentCodeUrl)
    this.setData({ paymentCodeUrl })
    this.getDetailInfo()
  },

  async completeOrder () {
    const { orderId } = this.options
    wx.showLoading()
    const res = await helpDetail.completeOrder({ orderId })
    console.log('res', res)
    if (res.code == 0) {
      this.getDetailInfo()
    } else {
      showToast(res.info)
    }
    wx.hideLoading()
  },
  preview () {
    wx.previewImage({
      urls: [this.data.paymentCodeUrl || this.data.detail.paymentCodeUrl]
    })
  },

  findOut () {
    this.setData({ isShowFindOut: true })
  },
  iknow () {
    this.setData({ isShowFindOut: false })
  }
})