// components/Statement/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    statements: [
      {
        type: 1,
        info: [
            '有邻居应助后，您会看到上门取货的地址 ',
            '有邻居应助后，您会看到上门取货的地址 '
        ]
      },
      {
        type: 2,
        info: [
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 '
        ]
      },
      {
        type: 3,
        info: [
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 '
        ]
      },
      {
        type: 4,
        info: [
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 '
        ]
      },
      {
        type: 5,
        info: [
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 '
        ]
      },
      {
        type: 6,
        info: [
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 '
        ]
      },
      {
        type: 7,
        info: [
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 '
        ]
      }
    ],
    list: null
  },
  observers : {
    type (val) {
      console.log('val', val)
      this.getInfo()
    }
  },
  methods: {
    getInfo () {
      const { statements } = this.data
      const { type } = this.properties
      const { info: list } = statements.find(item => item.type == type)
      console.log('list', list)
      this.setData({ list })
    }
  }
})
