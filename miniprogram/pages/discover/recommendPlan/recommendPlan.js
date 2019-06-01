const db = wx.cloud.database()
var timeDate = require("../../../utils/time.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan: {},
    user: {},
    likesrc: '../../../images/icon/like.png',
    likenumber: 0, //点赞次数
    acceptsrc:'../../../images/icon/accept.png',
    acceptnumber:0,  //采纳次数
    collectsrc:'../../../images/icon/collect0.png',
    collectnumber:0,  //收藏次数
    planid:null,  //计划的id
    userid:null   //计划主人的个人信息id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    console.log(e)
    this.setData({
      planid:e.id
    })
    this.loadplan(e.id)
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
  loadplan: function(e) {
    const that = this
    db.collection('plan').doc(e)
      .get()
      .then(res => {
        console.log(res)
        db.collection('userInfo').where({
            _openid: res.data._openid
          })
          .field({
            avatarUrl: true,
            nickName: true
          })
          .get()
          .then(res => {
            console.log(res)
            that.setData({
              user: res.data[0],
              userid: res.data[0]._id
            })
          })

        var data = res.data
        var time = Date.parse(new Date())
        //定义一个空对象，存储修改的plan
        var plan = {}
        plan.name = data.name
        plan.like = data.like
        plan.collect = data.collect
        plan.accept = data.accept
        plan.beginDate = timeDate.time_date(data.beginTime[0])
        plan.endDate = timeDate.time_date(data.endTime[0])
        plan.day = (data.end - data.begin) / 86400000 + 1
        //构建事项数组
        var matters = []

        var matterlength = data.matter.length
        for (let i = 1; i < matterlength; i++) {
          var matterobj = {}
          matterobj.name = data.matter[i]
          matterobj.beginDate = timeDate.time_date(data.beginTime[i])
          matterobj.endDate = timeDate.time_date(data.endTime[i])
          matterobj.day = (data.endTime[i] - data.beginTime[i]) / 86400000 + 1
          matters.push(matterobj)
        }
        plan.matters = matters
        plan.remarks = data.remarks
        this.setData({
          plan: plan
        })
      })
  },
  like(e) {
    console.log(e)
    const that = this
    if (that.data.likenumber == 0) {
      that.setData({
        likesrc: '../../../images/icon/like1.png',
        'plan.like': that.data.plan.like + 1,
        likenumber: 1
      })

      //调用云函数修改多个数据库集合
      //暂时不考虑并发，多操作使用一个函数
      wx.cloud.callFunction({
        name: 'addlikes',
        data: {
          type:'like',
          planid:that.data.planid,
          userid:that.data.userid
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        // handle error
      })
    }
  },
  accept(e) {
    console.log(e)
    const that = this
    if (that.data.acceptnumber == 0) {
      that.setData({
        acceptsrc: '../../../images/icon/accept1.png',
        'plan.accept': that.data.plan.accept + 1,
        acceptnumber: 1
      })
      //调用云函数修改多个数据库集合
      //暂时不考虑并发，多操作使用一个函数
      wx.cloud.callFunction({
        name: 'addlikes',
        data: {
          type: 'accept',
          planid: that.data.planid,
          userid: that.data.userid
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        // handle error
      })
    }
    wx.navigateTo({
      url: 'acceptplan/acceptplan?id='+that.data.planid,
    })
  },
  collect(e) {
    console.log(e)
    const that = this
    if (that.data.collectnumber == 0) {
      that.setData({
        collectsrc: '../../../images/icon/collect1.png',
        'plan.collect': that.data.plan.collect + 1,
        collectnumber: 1
      })
      //调用云函数修改多个数据库集合
      //暂时不考虑并发，多操作使用一个函数
      wx.cloud.callFunction({
        name: 'addlikes',
        data: {
          type: 'collect',
          planid: that.data.planid,
          userid: that.data.userid
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        // handle error
      })
    }
  }
})