import Http from '../utils/http'

class Tool extends Http{
    upload (data) {
        return this.request({
            url: '/file/upload',
            data
        })
    }
    getIdByCurrAddress (data) {
        return this.request({
            url: '/address/position',
            data
        })
    }
}

export default new Tool()