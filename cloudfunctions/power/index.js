// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const type = event.type

  const userid = event.userid

  //阳光值：助力数*2
  var sun = 2
  

  const user = await db.collection('userInfo').doc(userid).update({
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