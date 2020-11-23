// pages/index/components/task_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: Object
  },
  data : {
    _price: ''
  },
  lifetimes: {
    attached() {
      const { detail: { price } } = this.properties
      const _price = Number(price) ? `有劳了￥${price}元` : `爱心帮帮忙`
      this.setData({ _price })
    }
  }
})
