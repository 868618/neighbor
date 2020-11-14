import { addOrder } from '../../api/index'
const { showToast } = getApp()
Page({

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
        text: '转让了',
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
    returnTime: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    placeholders.set(10, '请尽力描述你的问题吧，有助于…')
    placeholders.set(20, '请尽力填写您的描述，有助于…')
    placeholders.set(30, '请尽力描述您的求转让吧,有助于…')
    placeholders.set(40, '请尽力填写您的描述，有助于…')
    placeholders.set(50, '请尽力填写您想捎点什么吧，有助于…')
    placeholders.set(60, '请尽力描述您想求助什么吧,有助于…')
    const asks = new Map()
    asks.set(10, '您要问什么')
    asks.set(20, '您要借什么')
    asks.set(30, '您要转让什么')
    asks.set(40, '您要吃什么')
    asks.set(50, '您要捎什么')
    asks.set(60, '您要求助什么')
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
      'formData.image': image
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
    const { forHelpType, title, content } = formData
    if (!title) {
      showToast('请输入标题')
      return false
    }

    if (!content) {
      showToast('请输入描述内容')
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


    const currAddress = wx.getStorageSync('currAddress')

    console.log('currAddress', currAddress)
    return

    const { nearest: { id: addressCode } } = wx.getStorageSync('currAddress')

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
        wx.navigateBack()
      } else {
        res.body.package = `prepay_id=${res.body.prepay_id}`
        wx.requestPayment({
          ...res.body,
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
