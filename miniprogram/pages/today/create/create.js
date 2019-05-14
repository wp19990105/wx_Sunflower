// miniprogram/pages/today/create/create.js
Page({
  data: {
    beginDate: "",
    endDate: "",
    showModalStatus: false,
    animationData: '',
    matterNumber:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  
  //添加事项输入
  add:function(e){
    const number=this.data.matterNumber.length+2
    this.data.matterNumber.push(number)
    var matterNumber = this.data.matterNumber
    this.setData({
      matterNumber:matterNumber
    })
    
    console.log(matterNumber)
  },
  //表单提交
  formSubmit(e) {
    console.log(e)
  },
  showModal: function (e) {
    console.log(e)
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.animation = animation
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  //日历点击确定
  calendarConfirm({ detail: { begin: { text: begin }, over: { text: end } } }) {
    this.setData({
      beginDate: begin,
      endDate: end,
      showModalStatus: false,
    });
  },

  //日历组件点击取消
  calendarCancel() {
    this.setData({
      showModalStatus: false,
    });
  },
})