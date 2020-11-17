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
        type: 10,
        info: [
            '你可以查看5个答案，酬金会由他们平分',
            '如果您非常着急,可以支付加急费,您的问题会置顶'
        ]
      },
      {
        type: 20,
        info: [
          '有邻居应助后，您会看到上门取货的地址',
          '如果您非常着急，可以支付加急费，您的问题会置顶'
        ]
      },
      {
        type: 30,
        info: [
          '有邻居应助后，您会看到上门取货的地址',
          '如果您非常着急，可以支付加急费，您的问题会置顶'
        ]
      },
      {
        type: 40,
        info: [
          '有邻居帮助后，您会看到上门取美食的时间和地点',
          '请自备饭盒等盛美食的东西',
          '做美食的材料由邻居自备，所以酬金应符合合理价位',
          '如果您非常着急，可以支付加急费，您的求助会置顶'
        ]
      },
      {
        type: 50,
        info: [
          '酬金不包含物品的费用,物品费用请另支付应助者',
          '如果您非常着急,可以支付加急费,您的问题会置顶'
        ]
      },
      {
        type: 60,
        info: [
          '涉及到私人财产,孩童看管等事情,请谨慎求助',
          '如果您非常着急,可以支付加急费,您的问题会置顶'
        ]
      },
      {
        type: 70,
        info: [
          '有邻居应助后，您会看到上门取货的地址 ',
          '有邻居应助后，您会看到上门取货的地址 '
        ]
      }
    ],
    list: []
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
