import './polyfill'
const { surface, globalData, getToken, getHeaders } = getApp()
import config from "../config.js"

class Http {
    async request ({ url, data = {  }, method = "POST" } = {}) {
        const _token = getToken()
        const options = {
            timeout: 10000,
            url: config.baseUrl + url,
            data: Object.assign({ ...globalData.systemInfo }, data),
            method,
            header: {
                "content-type": "application/json",
                _token: _token || ''
            }
        }
        return surface(wx.request, options).then(res => {
            const { statusCode, data } = res
            if (data.code == -101) {
                wx.navigateTo({
                    url: '/pages/login/index',
                    events: {
                        onSucc () {
                            wx.navigateBack()
                        }
                    }
                })
                return res
            }
            return statusCode == 200 ? data : res
        })
    }
}

export default Http
