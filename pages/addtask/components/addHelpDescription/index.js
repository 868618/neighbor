const { globalData, surface, getToken, showToast } = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String
    }
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
    tempFilePaths: [],
    _content: null
  },

  lifetimes: {
    attached() {
      const { allHeight: top } = globalData.navbarInfo
      const { content } = this.properties
      this.setData({ top, _content: content, isShowPlaceHolder: !content.length })
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
      const { isShowPlaceHolder } = this.data
      const newStatus = !Boolean(value.length)
      if ( isShowPlaceHolder !== newStatus ) {
        this.setData({ isShowPlaceHolder: newStatus })
      }
      this.setData({
        _content: value
      })
    },
    getFocus () {
      this.setData({ focus: true })
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
    },
    save () {
      const { tempFilePaths, _content } = this.data
      if (_content.length == 0) {
        showToast('请输入求助描述')
        return
      }
      this.triggerEvent('save' , { tempFilePaths, content: _content })
    }
  }
})
