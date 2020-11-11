import Http from '../utils/http'

class Home extends Http{
    search (data) {
        return this.request({
            url: '/index/search',
            data
        })
    }
}

export default new Home()