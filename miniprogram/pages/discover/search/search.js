const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plans: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  search: function(e) {
    const that = this
    console.log(e)
    const wrod = e.detail.value
    if (e.detail.cursor!= 0) {
      db.collection('plan').where({
          show: true,
          name: db.RegExp({
            regexp: wrod,
            options: 'i',
          })
        })
        .get()
        .then(res => {
          //console.log(res)
          that.setData({
            plans: res.data
          })
        })
    }
  }
})