import './utils/polyfill'
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();

console.log('envVersion', envVersion)

const maps = new Map([
    ['develop', 'https://www.bgxm.top'],
    ['trial', 'https://www.bgxm.top'],
    ['release', 'https://www.bgxm.top'],
])

const config = {
    baseUrl: maps.get(envVersion)
}

export default config

