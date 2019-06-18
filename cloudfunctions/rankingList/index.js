// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  // var time = Date.parse(new Date())
  // var previousTime = time - 7 * 86400000
  // var data = await db.collection('plan').where({
  //   //结束时间在本周内
  //   end: _.gte(previousTime).and(_.lte(time))
  // })
  // .get()


  //接下来是模拟排行榜
  var data = await db.collection('userInfo')
    .orderBy('sun', 'desc')
    .where({
      sun: _.neq(0)
    })
    .field({
      avatarUrl:true,
      nickName:true,
      sun:true,
      _id:true
    })
    .get()
  return {
    data
  }
}