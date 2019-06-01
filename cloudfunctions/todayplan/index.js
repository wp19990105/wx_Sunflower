// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const plan = db.collection('plan')
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {

  console.log(event)
  const openid = event.userInfo.openId
  var time = Date.parse(new Date())
  const time1 = time - 86400000
  console.log('时间戳' + time)
  console.log(time1)
  //获取符合条件的计划
  var plans = await plan.where({
    _openid: openid,
    begin: _.lte(time),
    end: _.gte(time1),
    planComplete:'0'
  }).get()

  const number = plans.data.length

  //定义要返回的数组
  var planresult = []

  //筛选符合条件的事项
  for (let i = 0; i < number; i++) {
    const planName=plans.data[i].name
    var planid = plans.data[i]._id
    var beginTime = plans.data[i].beginTime
    var endTime = plans.data[i].endTime
    var matter = plans.data[i].matter
    var complete = plans.data[i].complete
    const matterNumber = plans.data[i].beginTime.length
    //定义空数组，存储符合条件的事项
    var mattersArr = []
    //计划对象
    var planobj={}
    for (let j = 1; j < matterNumber; j++) {
      //定义空对象，存储符合条件的事项
      var matters = {}
      if (beginTime[j] < time && endTime[j] > time1 && complete[j]==0) {
        //保留事件名、计算最后天数
        matters.name = matter[j]
        var day = Math.ceil((endTime[j] - time1) / 86400000)
        matters.day = day
        matters.planid=planid
        matters.matterid = j
        mattersArr.push(matters)
      }
    }
    planobj.planName=planName
    planobj.planid = planid
    planobj.mattersArr = mattersArr
    planresult.push(planobj)
  }



  return {
    time,
    time1,
    //plans,
    planresult
  }
}