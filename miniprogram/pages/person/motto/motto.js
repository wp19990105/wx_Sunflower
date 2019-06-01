const db = wx.cloud.database()
const userinfo = db.collection('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      id: e.id
    })
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
  formSubmit: function(e) {
    const id = this.data.id
    console.log(e)
    wx.setStorage({
      key: "motto",
      data: e.detail.value.motto
    })
    userinfo.doc(id).update({
        data: {
          motto: e.detail.value.motto
        }
      })
      .then(res => {
        console.log(res)
        wx.switchTab({
          url: '../person',
        })
      })
      .catch(console.error)
  }
})