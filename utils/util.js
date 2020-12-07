
const QQMapWX = require('../libs/qqmap-wx-jssdk')
/**
 * 处理数据千分位  4545.56 ==>  ¥4,545.56
 * @param num
 * @returns {string|*}
 */
function formatThousands(num) {
    if (num || num === 0) {
        const temporaryValue =
            typeof num === 'number'
                ? num.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
                : num;
        return `¥${temporaryValue}`;
    }
    return '--';
}

/**
 * 封装了微信的wx.showToast
 * @param params
 * @returns {Promise<unknown>}
 */

const showToast = (params = {}) =>
    surface(wx.showToast, {
        title: '似乎已经断开了与互联网的连接',
        icon: 'none',
        duration: 2000,
        mask: false,
        ...(params.constructor === Object ? params : { title: params }),
    });

/**
 * 封装了微信的wx.showModal
 * @param params
 * @returns {Promise<unknown>}
 */

const showModal = (params = {}) =>
    new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            success: ({ confirm }) => resolve(confirm),
            ...(params.constructor === Object ? params : { title: params }),
        });
    });

/**
 * 正则验证手机号
 * @param tel
 * @returns {boolean}
 */
const verifyTel = (tel) => /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(tel);

/**
 * 订单倒计时计算
 * @param time
 * @returns {string|boolean}
 */
const formatCountDown = (time) => {
    let lefttime = Number(time) * 1000;
    let leftm = Math.floor((lefttime / (1000 * 60)) % 60); //计算分钟数
    let lefts = Math.floor((lefttime / 1000) % 60); //计算秒数
    if (lefttime > 0) {
        return `订单将在 ${leftm}分${lefts}秒 后自动关闭，请尽快完成支付`;
    } else {
        return false;
    }
};

/**
 * 时间戳转可视化时间
 * @param date
 * @param isSecond
 * @returns {string}
 */
const formatTime = (date, isSecond = false) => {
    var date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    if (isSecond) {
        return (
            [year, month, day].map(formatNumber).join('-') +
            ' ' +
            [hour, minute, second].map(formatNumber).join(':')
        );
    } else {
        return (
            [year, month, day].map(formatNumber).join('-') +
            ' ' +
            [hour, minute].map(formatNumber).join(':')
        );
    }
};

const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};

const chooseAddress = () => surface(wx.chooseAddress);

function getWechatAddress() {
    return new Promise((resolve) => {
        wx.getSetting({
            success(res) {
                // 1 如果 res.authSetting 对象为空，说明小程序还没有向用户请求过权限
                if (res.authSetting['scope.address'] === undefined) {
                    resolve(chooseAddress());
                    // 此时，应该向用户请求 通讯地址 权限
                } else if (res.authSetting['scope.address'] === true) {
                    // 说明用户已经授权过了，此时，只需要再次打开收获地址界面，让用户选择收获地址即可
                    resolve(chooseAddress());
                } else if (res.authSetting['scope.address'] === false) {
                    // 说明小程序已经向用户请求过授权了，但是，用户拒绝了
                    // 当用户第二次点击按钮的时候，就会执行这个逻辑
                    showModal({
                        title: '温馨提示',
                        content: '您需要授权后，才能使用收获地址功能，是否重新授权',
                        confirmColor: '#ff2d4a',
                    }).then((res) => {
                        // 如果用户点了确定，就打开 设置 界面
                        res &&
                        wx.openSetting({
                            success(res) {
                                // 不管是否开启授权，都执行success
                                // 应该根据 res['scope.address'] 是 true 或 false 来确定用户是否同意授权
                                console.log('设置success：', res.authSetting);
                                if (res.authSetting['scope.address'] === true) {
                                    // 直接打开收获地址选择界面，让用户选择收获地址
                                    resolve(chooseAddress());
                                }
                            },
                            fail(err) {
                                console.log('设置fail:', err);
                            },
                        });
                    });
                }
            },
            fail(err) {
                console.log('err--------', err)
            }
        });
    });
}


// 自定义nextTick 原生有时候会提前执行
const nextTick = (fn) => fn && setTimeout(fn, 17);

// 复制功能
const copy = (data = '') => surface(wx.setClipboardData, { data });

// 简化微信原生方法调用
const surface = (fn, options = {}) =>
    new Promise((resolve, reject) =>
        fn({
            ...options,
            success: resolve,
            fail: reject,
        })
    );

const indexMapOrderStatus = (num) => {
    const status = {
        0: -1,
        1: 1,
        2: 2,
        3: 5,
        4: 6,
    };
    return status[num];
};

const orderStatusMapFun = (num) => {
    // 1:待支付，2:待发货，3:已取消，4:异常，5:待收货，6:交易成功
    const status = {
        0: '未确认',
        1: '待支付',
        2: '待发货',
        3: '已取消',
        4: '异常',
        5: '待收货',
        6: '交易成功',
    };
    return status[num];
};

// 获取本地缓存的用户信息, 如果没有登陆返回‘’
const getUserInfo = (key = 'userInfo') => wx.getStorageSync(key);

/**
 * 获取用户的uid
 */
const uid = () => getUserInfo() && getUserInfo().uid;

/**
 * 判断是否登陆
 */
const isLogin = () => Boolean(getUserInfo());

const getDetetailAddress = (data) => {
    let result = data.provinceName;
    if (data.cityName) {
        result += data.cityName.trim();
    }
    if (data.countyName) {
        result += data.countyName;
    }
    return result;
};

/**
 * 获取页面栈中的某个页面信息
 * @param url 页面路由
 * @returns {WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>}
 */
const getPageInformation = (url = '') => {
    return getCurrentPages().find(({ route }) => route === url);
};

const checkConnected = async (hideToast) => {
    if (!getApp().globalData.isConnected) {
        if (!hideToast) showToast('似乎已经断开了与互联网的连接');
        throw new Error();
    }
};
// 获取机型
const checkIsX = () => {
    const res = wx.getSystemInfoSync()
    const { model } = res
    const xArr = ['X', 'iPhone 11', 'iPhone13']
    const isX = xArr.some(item => model.includes(item)) ? model : null
    return isX
}

/**
 获取系统相关信息
 **/
const getSystemInfo = () => wx.getSystemInfoSync()
const getAccountInfo = () => wx.getAccountInfoSync()

const getNavbarInfo = () => {
    // 右侧胶囊位置信息
    const menuRect = wx.getMenuButtonBoundingClientRect()
    const { windowWidth } =  wx.getSystemInfoSync()
    const { height, top, right } = menuRect
    // 导航区域总高度
    const allHeight = height + top
    // 导航区域内边距
    const left = windowWidth - right
    return { allHeight, height, left }
}

const getToken = (key = 'headers') => wx.getStorageSync(key).token;
const getHeaders = (key = 'headers') => wx.getStorageSync(key);


// 生成腾讯位置服务实例
const getMapSdk = () => new QQMapWX({
    key: '2VFBZ-WVLWR-VX7WP-WVDQR-2W263-WFBT5',
})
// 定位当前位置
const getCurrLocation = locationInfo => new Promise(async (resolve, reject) => {
    console.log('locationInfo-----------------------', locationInfo)
    let location
    if (locationInfo) {
        location = locationInfo
    } else {
        // 去拿微信当前的定位
        console.log('去拿微信当前的定位')
        const { latitude, longitude } = await surface(wx.getLocation, { isHighAccuracy: true })
        location = { latitude, longitude }
    }
    const qqmapsdk = getMapSdk()
    qqmapsdk.reverseGeocoder({
        location,
        get_poi: 1,
        address_format: 'short',
        category: '小区,建筑,公司',
        policy: 2,
        success (res) {
            const { status, result } = res
            if (status == 0) {
                resolve(result)
            }
        },
        fail: reject
    })
})

const initLocation = (locationInfo) => new Promise(async (resolve, reject) => {
    console.log('尝试去初始化一下')
    const currAddress = wx.getStorageSync('currAddress') || await getCurrLocation(locationInfo)
    wx.setStorageSync('currAddress', currAddress)
    resolve(currAddress)
})
module.exports = {
    formatThousands,
    getWechatAddress,
    showToast,
    verifyTel,
    showModal,
    formatCountDown,
    formatTime,
    nextTick,
    surface,
    indexMapOrderStatus,
    copy,
    getUserInfo,
    getPageInformation,
    uid,
    isLogin,
    getDetetailAddress,
    orderStatusMapFun,
    checkConnected,
    checkIsX,
    getSystemInfo,
    getAccountInfo,
    getNavbarInfo,
    getToken,
    getHeaders,
    getCurrLocation,
    getMapSdk,
    initLocation
};
