// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const type = event.type
  const planid=event.planid
  const userid=event.userid
  //阳光值：点赞数+收藏数*2+采纳数*5+助力数*2
  var sun=1
  if(type=='like'){
    sun=1
  }
  if (type == 'collect') {
    sun = 2
  }
  if (type == 'accept') {
    sun = 5
  }
  if (type == 'power') {
    sun = 2
  }
  const plan=await db.collection('plan').doc(planid).update({
    data: {
      [type]: _.inc(1)
    }
  })
  const user =await db.collection('userInfo').doc(userid).update({
    data: {
      [type]: _.inc(1),
      sun: _.inc(sun)
    }
  })
  return {
    event,
    plan,
    user
  }
}