import Http from '../utils/http'

class Mine extends Http{
    getAccountInfo (data) {
        return this.request({
            url: '/mine/getAccountInfo',
            data
        })
    }
    updateAccountInfo (data) {
        return this.request({
            url: '/mine/updateAccountInfo',
            data
        })
    }
}

export default new Mine()