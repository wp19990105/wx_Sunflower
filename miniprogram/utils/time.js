function time_date(timestamp) {
  var date = new Date(timestamp);
  // var year = date.getFullYear();
  // var month = date.getMonth() + 1;
  // var day = date.getDate();

  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var second = date.getSeconds();

  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate() )+ ' ';
  
  var currentdate = Y + M + D
  return currentdate
}

module.exports.time_date = time_date