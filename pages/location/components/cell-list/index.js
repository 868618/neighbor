// pages/location/components/cell_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    src: 'http://oss.cogo.club/71766970-92a0-4182-ba59-971f2f41d0c7.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addLocation () {
      this.triggerEvent('addLocation')
    }
  }
})
