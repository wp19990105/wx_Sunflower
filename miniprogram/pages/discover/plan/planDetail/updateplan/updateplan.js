const db = wx.cloud.database()
const plan = db.collection('plan')
Page({
  data: {
    beginDate: [],
    endDate: [],
    beginTime: [],
    endTime: [],
    showModalStatus: false,
    animationData: '',
    matterNumber: [],
    calendarid: '0',
    number: 1, //日历id
    matter: [],
    //以下是accept的内容
    acceptname: '',
    acceptmatter: [],
    acceptremarks: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    const that = this
    if (JSON.stringify(e) == '{}') {
      console.log('空')
    } else {
      console.log(e)
      const planid = e.id
      db.collection('plan').doc(planid)
        .field({
          name: true,
          matter: true,
          remarks: true
        })
        .get()
        .then(res => {
          console.log(res.data)
          for (let i = 1; i < res.data.matter.length - 1; i++) {
            that.data.matterNumber.push('accept' + i)
          }
          that.setData({
            acceptname: res.data.name,
            acceptmatter: res.data.matter,
            acceptremarks: res.data.remarks,
            matterNumber: that.data.matterNumber,
            matter: res.data.matter
          })
        })
    }

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
  add: function (e) {
    const number = this.data.matterNumber.length + 2
    this.data.matterNumber.push(number)
    var matterNumber = this.data.matterNumber
    this.setData({
      matterNumber: matterNumber,
      number: number
    })

    console.log(matterNumber)
  },
  //表单提交
  formSubmit(e) {
    console.log(e)
    const that = this

    //判断事项中是否存在空值
    var matternull = false
    if (that.data.matter.length == 0) {
      matternull = true
    }
    for (let i = 1; i < that.data.matter.length; i++) {
      if (that.data.matter[i] == null) {
        matternull == true
      }
    }

    //判断日期中是否存在空值
    var datenull = false
    if (that.data.beginTime.length == 1) {
      datenull = true
    }
    for (let i = 1; i < that.data.beginTime.length; i++) {
      if (that.data.beginTime[i] == null) {
        datenull == true
      }
    }

    if (e.detail.value.planName.length == 0) {
      wx.showLoading({
        title: '请填写计划名字',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else if (that.data.beginDate[0] == null) {
      wx.showLoading({
        title: '请选择计划时段',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else if (matternull) {
      wx.showLoading({
        title: '请填写事项名称',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else if (datenull) {
      wx.showLoading({
        title: '请选择事项时间',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    } else {
      wx.showModal({
        title: '提示',
        content: '是否确定创建计划',
        confirmText: '是',
        cancelText: '否',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '正在上传中',
              mask: 'true',
            })

            //接下来是写入数据库
            const beginDate = that.data.beginDate[0]
            const endDate = that.data.endDate[0]
            const beginTime = that.data.beginTime[0]
            const endTime = that.data.endTime[0]
            //完成情况空数组
            const complete = []
            for (let i = 0; i < that.data.beginTime.length; i++) {
              complete[i] = 0
            }
            plan.add({

              data: {
                name: e.detail.value.planName,
                beginDate: that.data.beginDate,
                endDate: that.data.endDate,
                begin: beginTime,
                end: endTime,
                beginTime: that.data.beginTime,
                endTime: that.data.endTime,
                matter: that.data.matter,
                remarks: e.detail.value.remarks,
                show: e.detail.value.show,
                complete: complete,
                planComplete: '0',
                like: 0,
                accept: 0,
                collection: 0
              }
            })
              .then(res => {
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '上传成功',
                  success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../today'
                      })
                    } else if (res.cancel) {
                      wx.switchTab({
                        url: '../today'
                      })
                    }
                  }
                })
                console.log(res)
              })
          } else if (res.cancel) {

          }
        }
      })
    }



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
      showModalStatus: true,
      calendarid: e.target.id
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  //日历点击确定
  calendarConfirm(e) {
    console.log(e)
    const id = e.target.id
    const beginName = 'beginDate[' + id + ']'
    const endName = 'endDate[' + id + ']'
    const beginTime = 'beginTime[' + id + ']'
    const endTime = 'endTime[' + id + ']'
    this.setData({
      showModalStatus: false,
      [beginName]: e.detail.begin.text,
      [endName]: e.detail.over.text,
      [beginTime]: e.detail.begin.time,
      [endTime]: e.detail.over.time,
    });
  },

  //日历组件点击取消
  calendarCancel() {
    this.setData({
      showModalStatus: false,
    });
  },
  getValue(e) {
    console.log(e)
    const id = e.target.id
    const key = 'matter[' + id + ']'
    this.setData({
      [key]: e.detail.value,
    })
  }
})