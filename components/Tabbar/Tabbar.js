// components/Tabbar/Tabbar.js
const { surface, getHeaders } = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isIndex: true
  },
  pageLifetimes: {
    show () {
      const pages = getCurrentPages()
      const [{ is: currUrl }] = pages.reverse()
      const isIndex = currUrl == 'pages/index/index'
      this.setData({ isIndex })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPage (e) {
      const { type, url } = e.currentTarget.dataset
      const [ { is: currPage } ] = getCurrentPages().sort()
      console.log('url-----------', url)
      console.log('currPage-----------', currPage)
      if (url.includes(currPage)) return
      if (url != '/pages/index/index') {
        if (getHeaders()) {
          wx[type]({ url })
          return;
        }
        surface(wx.navigateTo, {
          url: '/pages/login/index',
          events: {
            onSucc (data) {
              wx[type]({ url })
            }
          }
        })
        return
      }

      wx[type]({ url })
    }
  }
})
