import './polyfill'
const { surface } = getApp()
import config from "../config.js"

class Http {
    async request ({ url, data = {}, method = "POST" } = {}) {
        const options = {
            timeout: 10000,
            url: config.baseUrl + url,
            data,
            method,
            header: {
                "content-type": "application/json"
            }
        }
        return surface(wx.request, options).then(res => {
            const { statusCode, data } = res
            return statusCode == 200 ? data : res
        })
    }
}

export default Http
