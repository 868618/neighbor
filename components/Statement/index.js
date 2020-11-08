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
            '你可以查看5个答案，酬金会由他们平分',
            '如果您非常着急,可以支付加急费,您的问题会置顶'
        ]
      },
      {
        type: 2,
        info: [
          '有邻居应助后，您会看到上门取货的地址',
          '如果您非常着急，可以支付加急费，您的问题会置顶'
        ]
      },
      {
        type: 3,
        info: [
          '求转让的文案',
          '求转让的文案'
        ]
      },
      {
        type: 4,
        info: [
          '我馋了的文案',
          '我馋了的文案'
        ]
      },
      {
        type: 5,
        info: [
          '捎点东西的文案',
          '捎点东西的文案'
        ]
      },
      {
        type: 6,
        info: [
          '其他求助的文案',
          '其他求助的文案'
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
      this.getInfo()
    }
  },
  methods: {
    getInfo () {
      const { statements } = this.data
      const { type } = this.properties
      const { info: list } = statements.find(item => item.type == type)
      this.setData({ list })
    }
  }
})
