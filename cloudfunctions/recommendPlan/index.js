// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const openid = event.userInfo.openId

  var plans = await db.collection('plan').where({
      _openid: _.neq(openid),
      show:true
    })
    .get()
  const plansNumber = plans.data.length
  //提取用户头像名称、计划名称、点赞数
  var recommendPlan = []
  for (let i = 0; i < plansNumber; i++) {
    var plan = {}
    //plans.data[i]
    var planName = plans.data[i].name
    var like = plans.data[i].like
    var plan_id = plans.data[i]._id
    const planopenid = plans.data[i]._openid
    var userinfo = await db.collection('userInfo').where({
        _openid: planopenid
      })
      .get()
    
    plan.planName = planName
    plan.like = like
    plan.plan_id = plan_id
    plan.avatarUrl = userinfo.data[0].avatarUrl
    plan.nickName = userinfo.data[0].nickName
    //plan.userinfo=userinfo
    plan.user_id = userinfo.data[0]._id
    recommendPlan.push(plan)
  }

  return {
    //plans,
    recommendPlan
  }
}