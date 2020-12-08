import { addOrder } from '../../api/index'
const { showToast, throttle } = getApp()
const bangs = require('../../behavior/bangs')

const maps = new Map([
  [
    10,
    {
      placeholder: '请将问题进行详细的描述，有助于正确理解您的意思',
      ask: '您要问什么'
    }
  ],
  [
    20,
    {
      placeholder: '要借什么东西，具体的描述，最好传一张图片',
      ask: '您要借什么'
    }
  ],
  [
    30,
    {
      placeholder: '求转让什么东西，具体的要求，最好传一张图片',
      ask: '希望转让什么给您'
    }
  ],
  [
    40,
    {
      placeholder: '想吃什么，具体的要求，可以说明这是哪个地区的饭菜',
      ask: '您要吃什么'
    }
  ],
  [
    50,
    {
      placeholder: '需要邻居捎什么给你，希望从哪里买，具体的要求',
      ask: '您要捎什么'
    }
  ],
  [
    60,
    {
      placeholder: '请将您的求助描述清楚，有助于正确理解您的意思',
      ask: '您要求助什么'
    }
  ]
])
Page({
  behaviors: [bangs],
  /**
   * 页面的初始数据
   */
  data: {
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
    isShowPayBox: false,
    forHelpType: 1,
    isShowAddHelpDescription: false,
    formData: {
      title: '',
      content: null,
      image: '',
      forHelpType: 10,
      // 酬金
      rewardMoney: 1,
      // 加急费
      urgentMoney: 0,
      returnTime: ''
    },
    moneybox: {
      title: '',
      defPrice: 1,
      type: 1
    },
    keywordMaps: {
      title: '求助',
      describe: '问题',
      isShowCamera: false,
      placeholder: '请尽力描述你的问题吧，有助于…',
      isShowTimeInput: false,
      ask: '您要问什么'
    },
    returnTime: null,
    tempFilePaths: [],
    maxlength: 10,
    btnText: '马上发布'
  },
  input (e) {
    const { value: title } = e.detail
    const { maxlength } = this.data
    if (title.length == maxlength) showToast(`标题不超过${maxlength}个字`)
    this.setData({ 'formData.title': title })
  },
  changeBtn (e) {
    const { forhelptype: forHelpType, index } = e.currentTarget.dataset
    const btns = this.data.btns.map((item, idx) => ({ ...item, type: index == idx ? 'active' : 'default' }) )
    const title = [ 10 ].includes(forHelpType) ? '求助': '需求'
    const describe = [ 10 ].includes(forHelpType) ? '问题': '求助'
    const isShowCamera = [ 20 ].includes(forHelpType)

    const { placeholder } = maps.get(forHelpType)
    const isShowTimeInput = [20].includes(forHelpType)
    const { ask } = maps.get(forHelpType)
    const keywordMaps = { title, describe, isShowCamera, placeholder, isShowTimeInput, ask }
    this.setData({
      btns,
      btnText: forHelpType == 10 ? '马上发布' : '支付并发布',
      'formData.forHelpType': forHelpType,
      keywordMaps
    })
  },
  cancel () {
    this.setData({
      isShowPayBox: false
    })
  },
  selectChange (e) {
    const { type } = this.data.moneybox
    const { activeMoney } = e.detail
    const key = type == 1 ? 'formData.rewardMoney': 'formData.urgentMoney'
    this.setData({
      [ key ]: activeMoney
    }, this.cancel)
  },
  save(e) {
    console.log(e.detail)
    const { content, tempFilePaths } = e.detail
    const image = tempFilePaths.join(',')
    this.setData({
      isShowAddHelpDescription: false,
      'formData.content': content,
      'formData.image': image,
      tempFilePaths
    })
  },
  openAddHelpDescription () {
    this.setData({
      isShowAddHelpDescription: true
    })
  },
  customHandle () {
    const { isShowAddHelpDescription } = this.data
    isShowAddHelpDescription ? this.setData({ isShowAddHelpDescription: false }): wx.navigateBack()
  },

  pricePanel (e) {
    const { type } = e.currentTarget.dataset
    const { rewardMoney, urgentMoney } = this.data.formData
    const defPrice = type == 1 ? rewardMoney : urgentMoney || 0
    const moneybox = { type, defPrice }
    this.setData({ moneybox }, () => this.setData({ isShowPayBox: true }))
  },

  checkFormData () {
    const { formData, returnTime } = this.data
    const { forHelpType, title, content, image } = formData
    if (!title) {
      showToast('请输入标题')
      return false
    }

    if (!content) {
      showToast('请输入描述内容')
      return false
    }

    // if (!image) {
    //   showToast('请先上传图片')
    //   return false
    // }

    if (forHelpType == 20 && !returnTime) {
      showToast('请输入归还时间')
      return false
    }
    return true
  },
  // 支付并发布
  payAndPost: throttle(async function () {
    const { formData, returnTime } = this.data
    const { rewardMoney, urgentMoney, forHelpType } = formData
    if (!this.checkFormData()) return

    const addressCode = wx.getStorageSync('id')

    // const params = { ...formData, rewardMoney: rewardMoney * 100, urgentMoney: urgentMoney * 100, addressCode }
    const params = { ...formData, rewardMoney: forHelpType == 10 ? 0 : rewardMoney, urgentMoney: urgentMoney, addressCode }
    wx.showLoading()
    const res = await addOrder.forHelpSubmit( Object.assign(params, forHelpType == 20 ? { returnTime } : null) )
    wx.hideLoading()
    const { body: options, body: { payMoney, orderId }, code } = res

    if (code != 0) {
      showToast('提交失败')
      return
    }
    if (!payMoney) {
      showToast('提交成功')
      // this.refreshIndex()
      wx.navigateBack()
      return
    }
    const _this = this
    options.package = `prepay_id=${ options.prepay_id }`
    options.timestamp = options.timeStamp
    wx.requestPayment({
      ...options,
      success() {
        // _this.refreshIndex()
        _this.subscribeMessage(orderId)
      },
      fail(err) {
        console.log('err', err)
        showToast('支付失败，请重新支付')
      }
    })
  }, 2000),

  refreshIndex () {
    const [ indexPage ] = getCurrentPages()
    indexPage.locationUpdated && indexPage.locationUpdated()
  },

  pickerChange (e) {
    const { value: returnTime } = e.detail
    this.setData({ returnTime })
  },
  toDetail (orderId) {
    const url = `/pages/helpDetail/index?orderId=${orderId}`
    wx.redirectTo({ url })
  },

  subscribeMessage (orderId) {
    const _this = this
    wx.requestSubscribeMessage({
      tmplIds: ['txJftY7jelJ0aY2KqVcQSiyJxoqqKjnJ8dVGRmKcQ2Q'],
      success() {
        console.log('订阅成功')
      },
      fail () {
        console.log('订阅失败')
      },
      complete () {
        _this.toDetail(orderId)
      }
    })
  }
})
