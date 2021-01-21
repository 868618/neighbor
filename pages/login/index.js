// pages/login/index.js
const { surface, globalData, getNavbarInfo } = getApp()
import { login, mine } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '/images/login/logo.png',
    styleHeight: ''
  },

  onLoad () {
    this.init()
  },

  init () {
    const { allHeight } = getNavbarInfo()
    const styleHeight = `height: calc( 100vh - ${allHeight}px )`
    this.setData({ styleHeight })
    // 清除掉本地的缓存数据
    wx.removeStorageSync('headers')
  },

  async goLogin (e) {
    const detail = e.detail
    const { errMsg, userInfo } = detail
    if (errMsg.endsWith('ok')) {
      const res = await surface(wx.login)
      const { code } = res
      wx.showLoading()
      const result = await login.login({ code })
      wx.hideLoading()
      if (result.code == 0) {
        const { token, loginSuccess } = result.body
        if (loginSuccess) {
          globalData.headers = { _token: token }
        }
        wx.setStorageSync('headers', result.body)
        userInfo.nickName = userInfo.nickName.replace(/(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g, '')
        const { body } = await mine.getAccountInfo()
        const { avatarUrl: avatar, nickName: nick, gender: sex } = userInfo
        if (body.headerUrl === '') await mine.updateAccountInfo({ avatar, nick, sex })
        wx.setStorageSync('userInfo', { avatar, nick, sex })
        // 预加载头像图片
        wx.getImageInfo({ src: body.headerUrl })
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('onSucc', result)
      } else {
        showToast('请求失败')
      }
    }


  }
})
