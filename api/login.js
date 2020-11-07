import Http from '../utils/http'

class Login extends Http{
    login (data) {
        return this.request({
            url: '/login/login4mini',
            data
        })
    }
}

export default new Login()
