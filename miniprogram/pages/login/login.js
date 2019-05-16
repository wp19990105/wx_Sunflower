const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
Page({
  data: {},
  onLoad: function(e) {

  },
  getUserInfo: function(e) {
    console.log(e);
    //检查用户是否授权获取公开信息
    wx.getSetting({
      success(res) {
        //console.log(res)
        //未授权
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '提示',
            content: '登陆失败',
            showCancel: false,
            success(res) {
              if (res.confirm) {}
            }
          })
        }
        //已授权
        if (res.authSetting['scope.userInfo']) {
          wx.cloud.callFunction({
            name: 'login',
            complete: res => {
              //console.log(res)
              wx.setStorage({
                key: 'openid',
                data: res.result.openid,
              })
              userInfo.where({
                _openid: res.result.openid,
              }).count().then(res => {
                console.log(res.total)
                if (res.total == 0) {
                  userInfo.add({
                    data: e.detail.userInfo
                  }).then(res => {
                    //console.log(res)
                    wx.switchTab({
                      url: '../today/today'
                    })
                  }).catch(err => {
                    console.log(err)
                  })
                } else {
                  wx.switchTab({
                    url: '../today/today'
                  })
                }
              });
            }
          })
        }
      }
    })

  }
})