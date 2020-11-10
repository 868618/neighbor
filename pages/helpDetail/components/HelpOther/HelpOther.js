const { showToast, getNavbarInfo } = getApp()
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
    }
  },
  lifetimes: {
    attached() {
      const { allHeight: navbarHeight } = getNavbarInfo()
      const { address: _address, time: _time } = this.properties
      this.setData({ navbarHeight, _address, _time })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navbarHeight: null,
    _address: '',
    _value: '',
    test: '888'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update () {
      const { _address: address, _value: value } = this.data
      this.setData({
        address,
        value
      })
    },
    save () {
      const { _address, _time } = this.data
      console.log('_address', _address)
      if (_address == '') {
        showToast('请输入地址')
        return
      }

      if (_time == '') {
        showToast('请输入时间')
        return
      }
      this.triggerEvent('save', { _address, _time })
    }
  }
})
