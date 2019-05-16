const db = wx.cloud.database()
const plan = db.collection('plan')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.authorize()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  authorize: function(e) {
    const that = this
    try {
      const value = wx.getStorageSync('openid')
      if (value) {
        console.log(value)
        plan.where({
          _openid: value
        }).get().then(res => {
          console.log(res)
        })
        that.setData({
          openid: value
        })
      } else {
        //console.log('2')
        wx.showModal({
          title: '提示',
          content: '请使用微信登陆',
          showCancel: false,
          confirmText: '去登陆',
          success(res) {
            console.log(res)
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login'
              })
            }
          }
        })
      }
    } catch (e) {
      console.log('读取错误')
    }
  },
})