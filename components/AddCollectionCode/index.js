import { tool } from '../../api/index'
import config from "../../config";
import { helpDetail } from '../../api/index'
const { surface, getToken } = getApp()
Component({
    properties: {},
    methods: {
        async addImage () {
            const { tempFilePaths } = await surface(wx.chooseImage)
            const [ filePath ] = tempFilePaths
            const upLoadRes = await this.upLoadFile(filePath)
            console.log('upLoadRes---', upLoadRes)
            const { body, code } = upLoadRes
            if (code == 0) {
                const result = await helpDetail.savePaymentCode({ paymentCodeUrl: body })
                if (result.code == 0) this.triggerEvent('upLoaded', { image: body })
            }
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
    }
});
