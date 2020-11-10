import { addOrder, globalData } from '../../api/index'
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
    },
    moneybox: {
      title: '',
      defPrice: 0,
      type: 1
    }
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
    this.setData({ btns, 'formData.forHelpType': forHelpType })
  },
  cancel () {
    this.setData({
      isShowPayBox: false
    })
  },
  selectChange (e) {
    console.log('e', e)
    console.log('this.data.moneybox', this.data.moneybox)
    const { type } = this.data.moneybox
    const { activeMoney } = e.detail
    this.setData({
      [type == 1 ? 'formData.rewardMoney': 'formData.urgentMoney']: activeMoney,
      // ['formData.forHelpType']: type,
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
  // 酬金
  monetaryReward () {
    this.setData({
      moneybox: {
        type: 1,
        defPrice: 1
      },
      isShowPayBox: true
    })
  },
  // 加急
  expedited () {
    this.setData({
      moneybox: {
        type: 2,
        defPrice: 0
      },
      isShowPayBox: true
    })
  },
  // 支付并发布
  async payAndPost () {
    const { rewardMoney, urgentMoney } = this.data.formData
    const res = await addOrder.forHelpSubmit({ ...this.data.formData,rewardMoney: rewardMoney * 100, urgentMoney: urgentMoney * 100  })
    console.log('forHelpSubmit', res)
  }
})
