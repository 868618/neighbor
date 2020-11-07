import Http from '../utils/http'

class Tool extends Http{
    upload (data) {
        return this.request({
            url: '/file/upload',
            data
        })
    }
}

export default new Tool()