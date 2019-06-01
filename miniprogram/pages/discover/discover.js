const db = wx.cloud.database()
const banners = db.collection('banners')
Page({
  data: {
    banners: [],
    plan:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadBanners();
    this.recommendPlan()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loadBanners: function () {
    banners.where({
      type: 'discover-top'
    })
      .field({
        url: true
      })
      .get()
      .then(res => {
        console.log(res)
        this.setData({
          banners: res.data
        })
      })
  },
  navigate:function(e){
    console.log(e)
    const id=e.target.id
    if(id==0){
      wx.navigateTo({
        url: 'plan/plan'
      })
    }
    if (id == 1) {
      wx.navigateTo({
        url: 'list/list'
      })
    }
  },
  recommendPlan(){
    //这是一个个性化推荐的云函数(模拟)
    wx.cloud.callFunction({
      name: 'recommendPlan',
    }).then(res => {
      console.log(res)
      this.setData({
        plan:res.result.recommendPlan
      })
    }).catch(err => {

    })
  },
  navigatePersonal:function(e){
    console.log(e)
    const id = e.target.id
    wx.navigateTo({
      url: 'othersPage/othersPage?id=' + id,
    })
  },
  navigatePlan: function (e) {
    console.log(e)
    const id=e.target.id
    wx.navigateTo({
      url: 'recommendPlan/recommendPlan?id='+id,
    })
  },
  search:function(e){
    console.log(e)
    wx.navigateTo({
      url: 'search/search',
    })
  }
})