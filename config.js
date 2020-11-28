import './utils/polyfill'
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();

console.log('envVersion', envVersion)

const maps = new Map()
maps.set('develop', 'https://linjubang.imrookie.cn')
maps.set('trial', 'https://linjubang.imrookie.cn')
maps.set('release', 'https://linjubang.imrookie.cn')

const config = {
    baseUrl: maps.get(envVersion)
}

export default config

