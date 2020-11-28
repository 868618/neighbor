const { showToast, getCurrLocation, globalData } = getApp()
const chooseLocation = requirePlugin('chooseLocation')
import { helpDetail } from '../../api/index'
const qs = require('qs')

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
    isShared: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { location, name } = options
    if (location) {
      const currAddress = await getCurrLocation(qs.parse(location))
      wx.setStorageSync('currAddress', currAddress)
      wx.setStorageSync('name', name)
      this.setData({ isShared: true })
    }
    // const { orderId } = options
    // this.setData({ orderId })
  },
  onShow () {
    // wx.nextTick(this.getDetailInfo)
    this.getDetailInfo()
  },
  accept () {
    showToast('接受本次应助的接口')
    const { orderId } = this.options
    const { answerList: [{ answerId }] } = this.detail
    wx.showLoading()
    helpDetail.acceptHelp({
      orderId,
      answerId
    }).then(res => {
      if (res.code == 0) {
        this.getDetailInfo()
      }
    }).finally(() => {
      wx.hideLoading()
    })
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
    // const { orderId } = this.data
    const { orderId } = this.options
    wx.showLoading()
    const { code, body: detail } = await helpDetail.getDetail({ orderId })
    wx.hideLoading()
    if (code == 0) {
      console.log('detail-----', detail)
      const statusMaps = new Map()
      statusMaps.set(20, 'daiyingzhu')
          .set(30, 'daiyingzhu')
          .set(40, 'yiyingzhu')
          .set(60, 'yiyingzhu')
      const status = statusMaps.get(detail.status)
      console.log('detail.status&&&&&&&&', detail.status)
      console.log('status------', status)
      this.setData({ detail, status })
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
  cancelWriteAnswerMask () {
    this.selectComponent('#mask').hide(this.setData.bind(this, { 'masks.isShowTextArea': false }))
  },


  previewImage (e) {
    console.log(e)
    const { image } = e.currentTarget.dataset
    const urls = [image]
    wx.previewImage({ urls })
  },

  async save (e) {
    console.log('出发发发发发生', e)
    const { id: gw_addressId } = e.detail
      this.setData({ 'masks.isShowHelpOther': false })
      const { time: expectHelpTime } = this.data
      if (gw_addressId && expectHelpTime) {
        const params = { gw_addressId, expectHelpTime, answer: ''}
        wx.showLoading()
        const res = await helpDetail.answer(params)
        wx.hideLoading()
        console.log('res-------------------------------', res)
      }
  },
  onShareAppMessage () {
    const currAddress = wx.getStorageSync('currAddress')
    const name = wx.getStorageSync('name')
    const { title, orderId } = this.data.detail
    return {
      title,
      path: `/pages/helpDetail/index?orderId=${orderId}&currAddress=${qs.stringify(currAddress)}&name=${name}`,
    }
  },

  again () {
    this.setData({
      isShowDialog: true
    })
  },

  async onTap (e) {
    console.log('e', e.detail)
    if (e.detail) {
      const { orderId } = this.options
      const res = await helpDetail.again({ orderId })
      console.log('res', res)
      this.getDetailInfo()
    }

    this.setData({
      isShowDialog: false
    })
  }
})