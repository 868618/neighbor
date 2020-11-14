import './utils/polyfill'
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();

console.log('envVersion', envVersion)

const maps = new Map()
maps.set('develop', 'https://juelie.net/')
maps.set('trial', 'https://juelie.net/')
maps.set('release', 'https://juelie.net/')

const config = {
    baseUrl: maps.get(envVersion)
}

export default config

