// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const planid = event.planid
  const userid = event.userid
  const userselfid = event.userselfid
  const plan = await db.collection('plan').doc(planid).update({
    data: {
      collect: _.inc(-1)
    }
  })
  const user = await db.collection('userInfo').doc(userid).update({
    data: {
      collect: _.inc(-1),
    }
  })
  var result = await db.collection('userInfo')
    .doc(userselfid)
    .field({
      collectplan:true
    })
    .get()
  var collectplan=result.data.collectplan
  //获取该记录的索引
  var index
  for(let i=0;i<collectplan.length;i++){
    if(collectplan[i]==planid){
      const index=i
    }
  }
  collectplan.splice(index, 1)
  const userself = await db.collection('userInfo').doc(userselfid).update({
    data: {
      collectplan: collectplan
    }
  })
  return {
    event,
    plan,
    user,
    collectplan
  }
}