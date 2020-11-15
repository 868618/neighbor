import './utils/polyfill'
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();

console.log('envVersion', envVersion)

const maps = new Map()
maps.set('develop', 'https://www.juelie.net')
maps.set('trial', 'https://www.juelie.net')
maps.set('release', 'https://www.juelie.net')

const config = {
    baseUrl: maps.get(envVersion)
}

export default config

