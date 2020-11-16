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
}

export default new HelpDetail()