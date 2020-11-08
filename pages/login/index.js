// pages/login/index.js
const { surface, globalData, isLogin } = getApp()
import { login } from '../../api/index'
import { mine } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '/images/login/logo.png'
  },

  async goLogin (e) {
    const detail = e.detail
    const { errMsg, userInfo } = detail
    if (errMsg.endsWith('ok')) {
      // 清除掉本地的缓存数据
      wx.clearStorageSync()
      const res = await surface(wx.login)
      const { code, errMsg } = res
      if (errMsg.endsWith('ok')) {
        wx.showLoading()
        const result = await login.login({ code })
        wx.hideLoading()
        if (result.info == '成功' && result.code == 0) {
          console.log('result---', result)
          const { token, loginSuccess } = result.body
          if (loginSuccess) {
            globalData.headers = { _token: token }
          }
          wx.setStorageSync('headers', result.body)

          const { body } = await mine.getAccountInfo()
          console.log('个人信息', body)
          const { avatarUrl: avatar, nickName: nick, gender: sex } = userInfo
          if (body.headerUrl === '') {
            const updateAccountInfo = await mine.updateAccountInfo({
              avatar,
              nick,
              sex
            })
          }
          wx.setStorageSync('userInfo', { avatar, nick, sex })
          // 预加载图片
          wx.getImageInfo({ src: body.headerUrl })
          const eventChannel = this.getOpenerEventChannel()
          eventChannel.emit('onSucc', result)
        } else {
          showToast('请求失败')
        }
      }
    }


  }
})
