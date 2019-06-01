const db = wx.cloud.database()
const plan = db.collection('plan')
var timeDate = require("../../../utils/time.js");
Page({
  data: {
    lastSlideSender: null, //记录上一个左滑的计划
  },

  onLoad: function(e) {
    this.loadPlans()
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
  loadPlans() {
    //var date = timeDate.time_date(1556640000000)
    //console.log('日期为'+date)
    const openid = wx.getStorageSync('openid')
    //默认一个人的计划少于20条，暂不使用分页加载
    plan.where({
        _openid: openid
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
        var plans =[]
        for(let i=0;i<res.data.length;i++){
          var plansobj={}
          plansobj._id=res.data[i]._id
          plansobj.begin = timeDate.time_date(res.data[i].begin)
          plansobj.end = timeDate.time_date(res.data[i].end)
          plansobj.name = res.data[i].name
          if (time<res.data[i].begin){
            //plansobj.result='未开始'
            plansobj.result = -1
          } else if (time1 > res.data[i].end){
            //plansobj.result = '已结束'
            plansobj.result = 1
          }else{
            //plansobj.result = '进行中'
            plansobj.result = 0
          }
          plans.push(plansobj)
        }
        this.setData({
          plans:plans
        })
      })
  },



  //下面是左滑的函数
  /**
  * cell绑定事件,删除触发
  */
  deleteAction: function (e) {
    //拿到角标
    var row = e.detail.row;
    wx.showToast({
      icon: 'none',
      title: 'index=' + row,
    })
  },
  /**
   * cell绑定事件,滑动触发
   */
  slideAction: function (e) {
    //拿到角标
    console.log(e)
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
  },
  selectCellAction:function(e){
    console.log(e)
    const id=e.detail.row
    wx.navigateTo({
      url: 'planDetail/planDetail?id='+id,
    })
  }
})