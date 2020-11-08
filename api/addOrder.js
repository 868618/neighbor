import Http from '../utils/http'

class AddOrder extends Http{
    forHelpSubmit (data) {
        return this.request({
            url: '/order/forHelpSubmit',
            data
        })
    }
}

export default new AddOrder()