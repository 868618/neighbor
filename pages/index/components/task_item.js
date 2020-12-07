// pages/index/components/task_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: Object
  },
  data : {
    _price: '',
    isJiaJi: false
  },
  lifetimes: {
    attached() {
      const { detail: { price } } = this.properties
      const _price = Number(price) ? `${price}元` : ``
      this.setData({ _price, isJiaJi: Number(price) })
    }
  }
})
