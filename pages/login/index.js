// pages/login/index.js
const { surface, globalData, isLogin } = getApp()
import { login, show } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '/images/login/logo.png'
  },

  async goLogin (e) {
    const detail = e.detail
    const { errMsg } = detail
    if (errMsg.endsWith('ok')) {
      console.log('detail--------', detail)
      // 清除掉本地的缓存数据
      wx.clearStorageSync()
      wx.showLoading()
      const res = await surface(wx.login)
      wx.hideLoading()
      const { code, errMsg } = res
      if (errMsg.endsWith('ok')) {
        wx.setStorageSync('userInfo', {
          test: 'test'
        })
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('onSucc', {})
        // const result = await login.login({ code })
        // if (result.info == '成功' && result.code == 0) {
        //   console.log('result', result)
        //   wx.setStorageSync('userInfo', result)
        //   const eventChannel = this.getOpenerEventChannel()
        //   eventChannel.emit('onSucc', result)
        // } else {
        //   showToast('请求失败')
        // }
      }
    }


  }
})
