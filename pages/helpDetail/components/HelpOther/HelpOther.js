const chooseLocation = requirePlugin('chooseLocation')
const { showToast, getNavbarInfo, globalData, getMapSdk } = getApp()
import { tool } from '../../../../api/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: {
      type: String,
      value: ''
    },
    time: {
      type: String,
      value: ''
    },
    phone: {
      type: String,
      value: ''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: null,
    id: 0
  },

  lifetimes: {
    attached() {
      const { allHeight: navbarHeight } = getNavbarInfo()
      this.setData({ navbarHeight})
    },
  },

  pageLifetimes: {
    async show() {
      const selectedLocationInfo = chooseLocation.getLocation()
      if (globalData.isChooseAnswerAddress && selectedLocationInfo) {
        globalData.isChooseAnswerAddress = false
        wx.showLoading()
        const { latitude, longitude, city: cityName, district:districtName, name,  } = selectedLocationInfo
        const result = await this.reverseGeocoder({ latitude, longitude })
        const params = this.makeGetIdParams(result, name)
        const { code, body } = await tool.getIdByCurrAddress(params)
        if (code == 0) {
          console.log('body9999', body)
          this.setData({
            id: body.id,
            address: name
          })
        }
        wx.hideLoading()
        globalData.isChooseAnswerAddress = false
        chooseLocation.setLocation(null)
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    save () {
      const { address, time, phone } = this.properties
      const { id } = this.data
      if (phone == '') {
        showToast('请输入手机号')
        return
      }
      if (address == '') {
        showToast('请输入地址')
        return
      }

      if (time == '') {
        showToast('请输入时间')
        return
      }
      this.triggerEvent('save', { id, address })
    },

    chooseAddress () {
      globalData.isChooseAnswerAddress = true
      const currAddress = wx.getStorageSync('currAddress')
      const { lat:latitude, lng: longitude } = currAddress.location

      const key = '2VFBZ-WVLWR-VX7WP-WVDQR-2W263-WFBT5'; //使用在腾讯位置服务申请的key
      const referer = '邻居帮'; //调用插件的app的名称
      const location = JSON.stringify({
        latitude,
        longitude
      });
      const category = '房产小区,公司企业,购物';

      wx.navigateTo({
        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
      })
    },
    reverseGeocoder (location) {
      return new Promise((resolve, reject) => {
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
    },
    makeGetIdParams (currAddress, name) {
      const { lat: latitude, lng: longitude } = currAddress.location
      const { province: provinceName, city: cityName, district: districtName } = currAddress.address_component

      const systemInfo = globalData.systemInfo
      const nearbyAddressList = currAddress.pois.map(item => {
        // console.log('item', item)
        const { province, city, district } = item.ad_info
        const { lat, lng } = item.location
        return { provinceName: province, cityName: city, districtName: district, latitude: lat, longitude: lng, name: item.title, ...systemInfo }
      })

      return {
        provinceName,
        cityName,
        districtName,
        latitude,
        longitude,
        name,
        nearbyAddressList
      }
    },
  }
})
