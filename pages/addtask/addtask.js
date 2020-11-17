import { addOrder } from '../../api/index'
const { showToast, globalData } = getApp()
const bangs = require('../../behavior/bangs')
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
      defPrice: 0,
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
    tempFilePaths: []
  },
  input (e) {
    const { value: title } = e.detail
    this.setData({
      'formData.title': title
    })
  },
  changeBtn (e) {
    console.log('e.currentTarget.dataset', e.currentTarget.dataset)
    const { forhelptype: forHelpType, index } = e.currentTarget.dataset
    console.log('index', index)
    const btns = this.data.btns.map((item, idx) => Object.assign(item, { type: index == idx ? 'active' : 'default'}))
    const title = [ 10 ].includes(forHelpType) ? '求助': '需求'
    const describe = [ 10 ].includes(forHelpType) ? '问题': '求助'
    const isShowCamera = [ 20 ].includes(forHelpType)
    const placeholders = new Map()
    placeholders
      .set(10, '请将问题进行详细的描述，有助于正确理解您的意思')
      .set(20, '要借什么东西，具体的描述，最好传一张图片')
      .set(30, '求转让什么东西，具体的要求，最好传一张图片')
      .set(40, '想吃什么，具体的要求，可以说明这是哪个地区的饭菜')
      .set(50, '需要邻居捎什么给你，希望从哪里买，具体的要求')
      .set(60, '请将您的求助描述清楚，有助于正确理解您的意思')
    const asks = new Map()
    asks
        .set(10, '您要问什么')
        .set(20, '您要借什么')
        .set(30, '希望转让什么给您')
        .set(40, '您要吃什么')
        .set(50, '您要捎什么')
        .set(60, '您要求助什么')
    const placeholder = placeholders.get(forHelpType)
    const isShowTimeInput = [20].includes(forHelpType)
    const ask = asks.get(forHelpType)
    this.setData({
      btns,
      'formData.forHelpType': forHelpType,
      keywordMaps: {
        title,
        describe,
        isShowCamera,
        placeholder,
        isShowTimeInput,
        ask
      }
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
    const defPrice = type == 1 ? rewardMoney : urgentMoney
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

    if (!image) {
      showToast('请先上传图片')
      return false
    }

    if (forHelpType == 20 && !returnTime) {
      showToast('请输入归还时间')
      return false
    }
    return true
  },
  // 支付并发布
  async payAndPost () {
    const { formData, returnTime } = this.data
    const { rewardMoney, urgentMoney, forHelpType } = formData

    if (!this.checkFormData()) return


    const addressCode = wx.getStorageSync('id')

    const params = { ...formData, rewardMoney: rewardMoney * 100, urgentMoney: urgentMoney * 100, addressCode }
    wx.showLoading()
    const res = await addOrder.forHelpSubmit( Object.assign(params, forHelpType == 20 ? { returnTime } : null) )
    wx.hideLoading()
    console.log('forHelpSubmit', res)
    if (res.code == 0) {
      console.log(res.body)
      const { payMoney } = res.body
      if (!payMoney) {
        showToast('提交成功')
        // this.selectComponent('#navbar').getNewAddress()
        console.log('getCurrentPages()', getCurrentPages())
        getCurrentPages()[0].locationUpdated()
        wx.navigateBack()
      } else {
        res.body.package = `prepay_id=${res.body.prepay_id}`
        wx.requestPayment({
          ...res.body,
          timestamp: res.body.timeStamp,
          success(res) {
            console.log(res)
          },
          fail(err) {
            console.log('err', err)
          }
        })
      }
    } else {
      showToast('提交失败')
    }
  },

  pickerChange (e) {
    const { value: returnTime } = e.detail
    this.setData({ returnTime })
  }
})
