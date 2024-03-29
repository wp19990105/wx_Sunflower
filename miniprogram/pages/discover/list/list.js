// miniprogram/pages/discover/list/list.js
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
    this.loadList()
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
  loadList: function(e) {
    wx.cloud.callFunction({
      name: 'rankingList'
    }).then(res => {
      console.log(res)
      this.setData({
        list:res.result.data.data
      })
    }).catch(err => {

    })
  },
  personalpage(e){
    console.log(e)
    const id=e.currentTarget.id
    wx.navigateTo({
      url: '../othersPage/othersPage?id='+id,
    })
  }
})