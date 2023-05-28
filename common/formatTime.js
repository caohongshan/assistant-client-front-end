export default function(timestamp){
	let anchorParams = getAnchorParams(new Date())
	return getWxTimeMemo(new Date(timestamp),anchorParams) 
}

// 需计算的时间
// let currentTime = strToDate('2022-09-08 23:09:15')
// 包含一个主方法和3个附属方法
// 得到微信时间描述
function getWxTimeMemo(date, anchorParams) {
  let pointParams = parseTimeAllParams(date)
  let anchorTimestamp = anchorParams.timestamp
  let pointTimestamp = pointParams.timestamp
  let anchorYear = anchorParams.y
  let pointYear = pointParams.y

  // 仿微信消息时间描述 按条件顺序进行判定，满足条件即返回
  // 今天 / 昨天 [凌晨（0-5）/ 上午 （6-11） / 下午 （12 - 23）] 6:00
  // 7天内 星期几 星期一
  // 今年 x月xx号
  // 更早 xxxx年 x月xx日
  let condition = [
	{ timestamp: anchorTimestamp + 3600 * 1000 * 12, format: '下午{h}:{i}' }, // 今天下午
	{ timestamp: anchorTimestamp + 3600 * 1000 * 6, format: '上午{h}:{i}' }, // 今天上午
	{ timestamp: anchorTimestamp, format: '凌晨{h}:{i}' }, // 今天凌晨
	{ timestamp: anchorTimestamp - 3600 * 1000 * 12, format: '昨天 下午{h}:{i}' }, // 昨天下午
	{ timestamp: anchorTimestamp - 3600 * 1000 * 18, format: '昨天 上午{h}:{i}' }, // 昨天上午
	{ timestamp: anchorTimestamp - 3600 * 1000 * 24, format: '昨天 凌晨{h}:{i}' }, // 昨天凌晨
	{ timestamp: anchorTimestamp - 3600 * 1000 * 24 * 6, format: '星期{a} {h}:{i}' }, // 7天内
	{ timestamp: pointYear - anchorYear === 0, format: '{m}月{d}日 {h}:{i}' }, // 今年(为0时表示今年)
	{ timestamp: pointYear - anchorYear < 0, format: '{y}年{m}月{d}日 {h}:{i}' } // 更早
  ]
  for (let i = 0; i < condition.length; i++) {
	if (typeof condition[i].timestamp === 'number') {
	  if (pointTimestamp >= condition[i].timestamp) {
		return parseTimeAllParams(pointParams.time, condition[i].format).strTime
	  }
	} else {
	  if (condition[i].timestamp) {
		return parseTimeAllParams(pointParams.time, condition[i].format).strTime
	  }
	}
  }
  return parseTimeAllParams(pointParams.time, '{y}年{m}月{d}日').strTime
}

function parseTimeAllParams(time, cFormat) {
  if (arguments.length === 0 || !time) {
	return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
	date = time
  } else {
	if ((typeof time === 'string')) {
	  if ((/^[0-9]+$/.test(time))) {
		// support "1548221490638"
		time = parseInt(time)
	  } else {
		// support safari
		time = time.replace(new RegExp(/-/gm), '/')
	  }
	}

	if ((typeof time === 'number') && (time.toString().length === 10)) {
	  time = time * 1000
	}
	date = new Date(time)
  }
  const formatObj = {
	y: date.getFullYear(),
	m: date.getMonth() + 1,
	d: date.getDate(),
	h: date.getHours(),
	i: date.getMinutes(),
	s: date.getSeconds(),
	a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
	const value = formatObj[key]
	// Note: getDay() returns 0 on Sunday
	if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
	return value.toString().padStart(2, '0')
  })
  return {
	strTime: time_str, ...formatObj, a: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()], timestamp: time.getTime(), time: date
  }
}
function strToDate(str, pattern = 'yyyy-MM-dd hh:mm:ss') {
  if (str && typeof str === 'string') {
	let formatIndex = [
	  /[y]+/.exec(pattern),
	  /[M]+/.exec(pattern),
	  /[d]+/.exec(pattern),
	  /[h]+/.exec(pattern),
	  /[m]+/.exec(pattern),
	  /[s]+/.exec(pattern)
	]
	let datePart = [0, 1, 1, 0, 0, 0]
	let isRun = true
	formatIndex.forEach((conf, index) =>{
	  let s = conf ? str.substr(conf.index, conf[0].length) : ''
	  if (s && isRun) {
		datePart[index] = parseInt(s)
	  } else {
		isRun = false
	  }
	});
	datePart[1] -= 1
	return new Date(...datePart)
  } else {
	return ''
  }
}


function getAnchorParams (date) {
  return parseTimeAllParams(strToDate(parseTimeAllParams(date).strTime, 'yyyy-MM-dd'))
}