const banges = require('../../behavior/bangs')
Component({
  externalClasses: ['custom-class', 'custom-class1', 'custom-class2'],
  options: {
    // styleIsolation: 'isolated'
  },

  behaviors: [banges],

  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
})
