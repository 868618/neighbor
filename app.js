//app.js
import '/utils/polyfill';
import utils from '/utils/util';
// import 'umtrack-wx';
App({
  // umengConfig: {
  //   appKey: '5fb61f431e29ca3d7bde3900', //由友盟分配的APP_KEY
  //   // 使用Openid进行统计，此项为false时将使用友盟+uuid进行用户统计。
  //   // 使用Openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用Openid。
  //   useOpenid: true,
  //   // 使用openid进行统计时，是否授权友盟自动获取Openid，
  //   // 如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
  //   autoGetOpenid: false,
  //   debug: true, //是否打开调试模式
  //   uploadUserInfo: true // 自动上传用户信息，设为false取消上传，默认为false
  // },
  onLaunch: async function () {
    console.log('onLaunch--------------')
    const that = this;
    // 检测新版本
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      that
          .showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
          })
          .then(() => {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          });
    });
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        if (networkType === 'none') {
          that.globalData.isConnected = false;
          that.showToast({ title: '当前无网络', icon: 'loading' });
        }
      },
    });

    /**
     * 初次加载拿到系统部分信息
     */

    const { platform: gw_platform, system: gw_platVersion } = utils.getSystemInfo()
    const accountInfo = utils.getAccountInfo()
    const { version: gw_version } = accountInfo.miniProgram
    that.globalData.systemInfo = { gw_platform, gw_version: gw_version || '1.0.0', gw_platVersion, gw_deviceId: '123456' }
    that.globalData.navbarInfo = utils.getNavbarInfo()

    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    // wx.onNetworkStatusChange((res) => (that.globalData.isConnected = Boolean(res.isConnected)));
    wx.onNetworkStatusChange(res => {
      console.log('onNetworkStatusChange', res)
      that.globalData.isConnected = Boolean(res.isConnected)
    })

    // 判断是否是刘海机
    const isX = utils.checkIsX()
    that.globalData.isX = isX

    // utils.initLocation()
  },
  globalData: {
    isConnected: true, //网络状态,
    isX: false,
    birthPlace: null,
    currAddress: ''
  },
  ...utils,
})
