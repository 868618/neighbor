
import config from "../../../../config.js"
const { globalData, surface, getToken, showToast } = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
    placeholder: String,
    tempFilePaths: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    top: null,
    isShowPlaceHolder: true,
    src: 'http://oss.cogo.club/066c0cad-0b90-41f8-986f-65599c8f57e0.jpg',
    _tempFilePaths: [],
    _content: null
  },

  lifetimes: {
    attached() {
      const { allHeight: top } = globalData.navbarInfo
      const { content: _content, tempFilePaths: _tempFilePaths } = this.properties
      const isShowPlaceHolder = !_content.length
      this.setData({ top, _content, isShowPlaceHolder, _tempFilePaths })
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
    async chooseAndUpDateImage () {
      try {
        const { tempFilePaths } = await surface(wx.chooseImage)
        const [ filePath ] = tempFilePaths
        const upLoadRes = await this.upLoadFile(filePath)
        const { body, code } = upLoadRes
        if (code == 0) {
          const _tempFilePaths = this.data._tempFilePaths.concat([body])
          this.setData({ _tempFilePaths })
        }
      } catch (e) {
        console.log(e)
      }

    },
    input (e){
      const { value: _content } = e.detail
      const isShowPlaceHolder = !Boolean(_content.length)
      const item = this.data.isShowPlaceHolder !== isShowPlaceHolder ? { isShowPlaceHolder }: null
      this.setData(Object.assign({_content }, item))
    },
    async upLoadFile (filePath) {
      const _token = getToken()
      const url = `${ config.baseUrl }/file/upload`
      wx.showLoading()
      const upLoadRes = await surface(wx.uploadFile, {
        url,
        filePath,
        name: 'file',
        header: {
          "content-type": "multipart/form-data",
          _token
        },
      })
      wx.hideLoading()
      const { statusCode, data } = upLoadRes
      const json = JSON.parse(data)
      const { code } = json
      if (code == -101) {
        wx.navigateTo({
          url: '/pages/login/index',
          events: {
            onSucc () {
              wx.navigateBack()
            }
          }
        })
        return
      }
      return statusCode == 200 ? json : upLoadRes
    },
    save () {
      const { _tempFilePaths, _content } = this.data
      if (_content.length == 0) {
        showToast('请输入求助描述')
        return
      }
      this.triggerEvent('save' , { tempFilePaths: _tempFilePaths, content: _content })
    }
  }
})
