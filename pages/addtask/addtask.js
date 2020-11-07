// pages/addtask/addtask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btns: [
      {
        text: '问个问题',
        type: 'active'
      },
      {
        text: '借个东西',
        type: 'default'
      },
      {
        text: '转让了',
        type: 'default'
      },
      {
        text: '我馋了',
        type: 'default'
      },
      {
        text: '捎点东西',
        type: 'default'
      },
      {
        text: '其它求助',
        type: 'default'
      }
    ],
    isShowPayBox: false,
    statementType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeBtn (e) {
    const { index } = e.currentTarget.dataset
    console.log('index', index)
    const btns = this.data.btns.map((item, idx) => Object.assign(item, { type: index == idx ? 'active' : 'default'}))
    this.setData({ btns, statementType: index + 1 })
  },
  cancel () {
    this.setData({
      isShowPayBox: false
    })
  },
  selectChange (e) {
    console.log('selectChange', e)
    this.cancel()
  },
  showPayBox () {
    this.setData({
      isShowPayBox: true
    })
  },
  addHelpDescription () {

  }
})
