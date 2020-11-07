// pages/location/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.selectComponent('#mask').show()
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