import Http from '../utils/http'

class HelpDetail extends Http{
    getDetail (data) {
        return this.request({
            url: '/order/detail',
            data
        })
    }
    answer (data) {
        return this.request({
            url: '/order/answer',
            data
        })
    }
    again (data) {
        return this.request({
            url: '/order/againForHelp',
            data
        })
    }
    acceptHelp (data) {
        return this.request({
            url: '/order/acceptHelp',
            data
        })
    }
    completeOrder (data) {
        return this.request({
            data,
            url: '/order/completeOrder'
        })
    }
    savePaymentCode (data) {
        return this.request({
            data,
            url: '/mine/savePaymentCode'
        })
    }
}

export default new HelpDetail()