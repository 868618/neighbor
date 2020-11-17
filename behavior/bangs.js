
const { globalData } = getApp()
module.exports = Behavior({
    data: {
        xStyle: ''
    },
    attached (){
        const { isX } = globalData
        const xStyle = `padding-bottom: ${isX ? 68: 0}rpx;`
        this.setData({ xStyle })
    },
})