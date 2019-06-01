const db = wx.cloud.database()
const userinfo = db.collection('userInfo')
Page({
  data: {
    user:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.getUserinfo()
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
    const that=this
    try {
      var motto = wx.getStorageSync('motto')
      if (motto) {
        that.setData({
          'user.motto':motto
        })
      }
    } catch (e) {
      // Do something when catch error
    }
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
  getUserinfo: function() {
    const openid = wx.getStorageSync('openid')
    userinfo.where({
        _openid: openid
      })
      .get().then(res => {
        this.setData({
          user: res.data[0]
        })
        console.log(res)
      })
  },
  updata: function(e) {
    const id = this.data.user._id
    wx.navigateTo({
      url: 'motto/motto?id=' + id,
    })
  },
  userview: function(e) {
    wx.navigateTo({
      url: 'userview/userview',
    })
  },
  introduce(e) {
    wx.navigateTo({
      url: 'introduce/introduce',
    })
  },
})