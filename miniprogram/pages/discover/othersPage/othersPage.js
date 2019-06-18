const db = wx.cloud.database()
var timeDate = require("../../../utils/time.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    powersrc:'../../../images/icon/power.png',
    powernumber: 0, //点赞情况
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    console.log(e)
    this.getUserinfo(e.id)
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
  getUserinfo: function(id) {
    const that = this
    db.collection('userInfo').doc(id)
      .get().then(res => {
        this.setData({
          user: res.data
        })
        console.log(res)
        that.loadPlans(res.data._openid)
      })
  },
  loadPlans(e) {
    //默认一个人的计划少于20条，暂不使用分页加载
    db.collection('plan').where({
        _openid: e
      })
      .field({
        name: true,
        begin: true,
        end: true
      })
      .get().then(res => {
        console.log(res)
        var time = Date.parse(new Date())
        const time1 = time - 86400000
        var plans = []
        for (let i = 0; i < res.data.length; i++) {
          var plansobj = {}
          plansobj._id = res.data[i]._id
          plansobj.begin = timeDate.time_date(res.data[i].begin)
          plansobj.end = timeDate.time_date(res.data[i].end)
          plansobj.name = res.data[i].name
          if (time < res.data[i].begin) {
            //plansobj.result='未开始'
            plansobj.result = -1
          } else if (time1 > res.data[i].end) {
            //plansobj.result = '已结束'
            plansobj.result = 1
          } else {
            //plansobj.result = '进行中'
            plansobj.result = 0
          }
          plans.push(plansobj)
        }
        this.setData({
          plans: plans
        })
      })
  },
  plandetail(e){
    console.log(e)
    const id=e.currentTarget.id
    wx.navigateTo({
      url: '../recommendPlan/recommendPlan?id='+id,
    })
  },
  power(e) {
    console.log(e)
    const that = this
    if (e.currentTarget.id == '0') {
      that.setData({
        powersrc: '../../../images/icon/power1.png',
        'user.power': that.data.user.power + 1,
        'user.sun': that.data.user.sun + 2,
        likenumber: 1
      })

      //调用云函数修改多个数据库集合
      //暂时不考虑并发，多操作使用一个函数
      wx.cloud.callFunction({
        name: 'power',
        data: {
          type: 'power',
          userid: that.data.user._id,
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        // handle error
      })
    }
  }
})