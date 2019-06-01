const db = wx.cloud.database()
const plan = db.collection('plan')
const _ = db.command
Page({
  data: {
    openid: null,
    plans: [],
    lastSlideSender: null, //记录上一个左滑的事项
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    const that = this
    try {
      const value = wx.getStorageSync('openid')
      if (value) {
        console.log(value)
        wx.cloud.callFunction({
          name: 'todayplan',
        }).then(res => {
          console.log(res)
          that.setData({
            plans: res.result.planresult,
            planNumber: res.result.planresult.length
          })
        }).catch(err => {
          // handle error
        })

        that.setData({
          openid: value
        })
      }
    } catch (e) {
      console.log('读取错误')
    }

  },

  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //填写信息完成后，刷新页面
    this.authorize()

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
        wx.cloud.callFunction({
          name: 'todayplan',
        }).then(res => {
          console.log(res)
          that.setData({
            plans: res.result.planresult,
            planNumber: res.result.planresult.length,
            openid: value
          })
        }).catch(err => {
          // handle error
        })
      } else {
        console.log('2')
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







  //以下是左滑的函数
  /**
   * cell绑定事件,删除触发
   */
  deleteAction: function(e) {
    //拿到角标
    console.log(e)
    const that=this
    //获取计划的id与事项的id
    var id = e.detail.row;
    const planid = id.substr(0, 32)
    const matterid = id.substr(32)
    //console.log(planid)
    //console.log(matterid)

    //取出计划，并进行修改
    db.collection('plan').doc(planid).field({
        complete: true
      })
      .get().then(res => {
        console.log(res)
        var complete = res.data.complete
        complete.splice(matterid, 1, 1)
        console.log(complete)
        //更新到数据库
        db.collection('plan').doc(planid).update({
            data: {
              //complete:[0,0,0,1]
              complete: complete
            }
          })
          .then(res => {
            console.log(res)
            wx.cloud.callFunction({
              name: 'todayplan',
            }).then(res => {
              console.log(res)
              that.setData({
                plans: res.result.planresult,
                planNumber: res.result.planresult.length
              })
            }).catch(err => {
              // handle error
            })

          })
      })
  },
  /**
   * cell绑定事件,滑动触发
   */
  slideAction: function(e) {
    console.log(e)
    //拿到角标
    var row = e.detail.row;
    //获取角标cell
    var slideSender = this.selectComponent("#slideitem-" + row);
    //在data中定义lastSlideSender 属性,用户记录上一个打开的cell
    var lastSlideSender = this.data.lastSlideSender;
    //如果存在已经打开的cell则关闭
    if (lastSlideSender != null && lastSlideSender != slideSender) {
      lastSlideSender.restoreSalid();
    }
    this.setData({
      lastSlideSender: slideSender
    })
  }

})