// components/TaskItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number
    },
    type: Boolean
  },
  externalClasses: ['custom-class'],

  /**
   * 组件的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'custom_btn'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    slideButtonTap(e) {
      console.log('删除')
      this.triggerEvent('slideButtonTap')
    }
  }
})
