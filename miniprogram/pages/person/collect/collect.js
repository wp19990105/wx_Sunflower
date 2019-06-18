const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.onloadCollect()
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
  onloadCollect() {
    const that=this
    try {
      var openid = wx.getStorageSync('openid')
      if (openid) {
        //收藏少于20
        db.collection('userInfo')
          .where({
            _openid: openid
          })
          .field({
            collectplan: true
          })
          .get()
          .then(res => {
            //console.log(res)
            const plans = res.data[0].collectplan
            //获取各个计划
            if (plans.length != 0) {
              db.collection('plan').where({
                _id: _.in(plans)
              })
              .get()
              .then(res=>{
                console.log(res)
                that.setData({
                  plan:res.data
                })
              })
            }

          })
      }
    } catch (e) {
      console.log('openid获取错误')
    }
  }
})