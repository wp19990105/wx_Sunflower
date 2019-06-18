const db=wx.cloud.database()
var timeDate = require("../../../../utils/time.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false  //暂时隐藏修改功能
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    this.setData({
      id:e.id
    })
    this.loadplan(e.id)
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
  loadplan:function(e){
    db.collection('plan').doc(e)
    .get()
    .then(res=>{
      console.log(res)
      var data=res.data
      var time = Date.parse(new Date())
      //定义一个空对象，存储修改的plan
      var plan={}
      plan.name=data.name
      plan.like=data.like
      plan.collect=data.collect
      plan.accept=data.accept
      var spareday = Math.ceil((data.end - time) / 86400000 + 1) 
      if(spareday<0){
        var planSpareday='已结束'
      }else{
        var planSpareday='剩'+spareday+'天'
      }
      plan.planSpareday = planSpareday
      plan.beginDate = timeDate.time_date(data.beginTime[0])
      plan.endDate = timeDate.time_date(data.endTime[0])
      plan.day = (data.end - data.begin) / 86400000 + 1
      //构建事项数组
      var matters=[]

      var matterlength = data.matter.length
      for(let i=1;i<matterlength;i++){
        var matterobj={}
        matterobj.name=data.matter[i]
        matterobj.beginDate = timeDate.time_date(data.beginTime[i])
        matterobj.endDate = timeDate.time_date(data.endTime[i])
        if(time<data.beginTime[i]){
          var process=-1
        } else if (time > data.endTime[i] + 86400000){
          var process=1
        }else{
          var process=0
        }
        matterobj.process=process
        matters.push(matterobj)
      }
      plan.matters=matters
      plan.remarks=data.remarks
      plan.show=data.show
      this.setData({
        plan:plan
      })
    })
  },
  navigateedit(e){
    const that=this
    wx.navigateTo({
      url: 'updateplan/updateplan?id='+that.data.id,
    })
  }
})