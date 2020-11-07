const { globalData, surface, getToken } = getApp()
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
    isShow: false,
    top: null,
    isShowPlaceHolder: true,
    focus: false,
    src: 'http://oss.cogo.club/066c0cad-0b90-41f8-986f-65599c8f57e0.jpg',
    tempFilePaths: []
  },

  lifetimes: {
    attached() {
      const { allHeight: top } = globalData.navbarInfo
      this.setData({ top })
    }
  },

  observers: {
    testtempFiles(val) {
      console.log(val)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show () {
      this.setData({ isShow: true })
    },
    hide () {
      this.setData({ isShow: false })
    },
    async chooseImage () {
      const _tempFilePaths = this.data.tempFilePaths
      const { tempFilePaths } = await surface(wx.chooseImage)
      console.log('tempFilePaths-----', tempFilePaths)
      const [ filePath ] = tempFilePaths

      const upLoadRes = await this.upLoadFile(filePath)
      const { body } = JSON.parse(upLoadRes)
      console.log('body***', body)

      this.setData({
        tempFilePaths: _tempFilePaths.concat([body])
      })
    },
    input (e){
      const { value } = e.detail
      console.log(value)
      const { isShowPlaceHolder } = this.data
      const newStatus = !Boolean(value.length)
      if ( isShowPlaceHolder !== newStatus ) {
        this.setData({ isShowPlaceHolder: newStatus })
      }
    },
    getFocus () {
      this.setData({
        focus: true
      })
    },
    async upLoadFile (filePath) {
      const _token = getToken()
      const upLoadRes = await surface(wx.uploadFile, {
        url: 'http://118.89.109.203/file/upload',
        filePath,
        name: 'file',
        header: {
          "content-type": "multipart/form-data",
          _token
        },
      })
      const { statusCode, data, } = upLoadRes
      return statusCode == 200 ? data : upLoadRes
    }
  }
})
