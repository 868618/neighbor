import './utils/polyfill'
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();

console.log('envVersion', envVersion)

const maps = new Map()
maps.set('develop', 'http://www.juelie.net:8082')
maps.set('trial', 'http://www.juelie.net:8082')
maps.set('release', 'http://www.juelie.net:8082')

const config = {
    baseUrl: maps.get(envVersion)
}

export default config

