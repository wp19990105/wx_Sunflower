Page({
  data: {
    showModalStatus: false,
    animationData: ''
  },
  showModal: function () {
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