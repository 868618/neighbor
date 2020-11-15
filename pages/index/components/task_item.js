// pages/index/components/task_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    avator: 'https://oss.guangmangapp.com/21ea3333-bf0a-405b-8d88-f479049ed8b7?x-oss-process=image/resize,s_370/format,jpg'
  },

  lifetimes: {
    attached() {
      console.log('this.properties.detail', this.properties.detail)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
