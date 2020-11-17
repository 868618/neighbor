const bangs = require('../behavior/bangs')
const { surface, getHeaders, globalData } = getApp()
Component({
  behaviors: [bangs],
  /**
   * 组件的初始数据
   */
  data: {
    activeNum: 0,
    list: [
      {
        text: "首页",
        iconPath: "/images/tabbar/home.png",
        selectedIconPath: "/images/tabbar/home_active.png",
        pagePath: '/pages/index/index'
      },
      {
        iconPath: "/images/tabbar/light.png",
        selectedIconPath: "/images/tabbar/light.png",
        text: "求助",
        pagePath: '/pages/addtask/addtask'
      },
      {
        text: "我的",
        iconPath: "/images/tabbar/mine.png",
        selectedIconPath: "/images/tabbar/mine_active.png",
        pagePath: '/pages/mine/mine'
      }
    ],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change (e) {
      const { pagepath: url, index } = e.currentTarget.dataset
      const isLogin = Boolean(getHeaders())
      if (index === 0) {
        wx.switchTab({ url })
      }

      if (index === 1) {

        isLogin ? wx.navigateTo({ url }) : wx.navigateTo({
          url: '/pages/login/index',
          events: {
            onSucc () {
              wx.redirectTo({ url })
            }
          }
        })
      }

      if (index === 2) {
        if ( isLogin ) {
          wx.switchTab({ url })
        } else {
          wx.navigateTo({
            url: '/pages/login/index',
            events: {
              onSucc () {
                wx.switchTab({ url })
              }
            }
          })
        }
      }
    }
  }
})
