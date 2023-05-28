import moment from 'moment';

// 获取当天开始结束时间
export const getCurrDays = () => {
	let date = []
	date.push(moment().format('YYYY-MM-DD'))
	date.push(moment().format('YYYY-MM-DD'))
	// 获取当天的开始结束时间，精确到时分秒
	// moment().startOf('days').format('YYYY-MM-DD HH:mm:ss')
	// moment().endOf('days').format('YYYY-MM-DD HH:mm:ss')
	return date
}

// 获取昨天的开始结束时间
export const getYesterday = () => {
	let date = []
	date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
	date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
	// 获取昨天的开始结束时间，精确到时分秒
	// moment().subtract('days',1).startOf('days').format('YYYY-MM-DD HH:mm:ss')
	// moment().subtract('days',1).endOf('days').format('YYYY-MM-DD HH:mm:ss')
	return date
}
// 获取明天的开始结束时间
export const getTomorrow = () => {
	let date = []
	date.push(moment().add('days', 1).format('YYYY-MM-DD'))
	date.push(moment().add('days', 1).format('YYYY-MM-DD'))
	return date
}
// 获取最近七天的开始结束时间
export const getLast7Days = () => {
	let date = []
	// 不包含当天
	date.push(moment().subtract('days', 7).format('YYYY-MM-DD'))
	date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
	// 包含当天
	// date.push(moment().subtract('days',6).format('YYYY-MM-DD'))
	// date.push(moment().format('YYYY-MM-DD'))
	return date
}
// 获取最近30天的开始结束时间
export const getLast30Days = () => {
	let date = []
	date.push(moment().subtract('days', 30).format('YYYY-MM-DD'))
	date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
	return date
}
// 获取当前周的开始结束时间，周日到周六
export const getCurrWeekDays = () => {
	let date = []
	let start = moment().startOf('week').format('YYYY-MM-DD')
	let end = moment().endOf('week').format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}
// 获取上一周的开始结束时间，周日到周六
export const getLastWeekDays = () => {
	let date = []
	let start = moment().week(moment().week() - 1).startOf('week').format('YYYY-MM-DD')
	let end = moment().week(moment().week() - 1).endOf('week').format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}
// 获取下一周的开始结束时间，周日到周六
export const getNextWeekDays = () => {
	let date = []
	let start = moment().week(moment().week() + 1).startOf('week').format('YYYY-MM-DD')
	let end = moment().week(moment().week() + 1).endOf('week').format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}
// 获取当前月的开始结束时间
export const getCurrMonthDays = () => {
	let date = []
	let start = moment().startOf('month').format('YYYY-MM-DD')
	let end = moment().endOf('month').format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}
// 获取上一月的开始结束时间
export const getLastMonthDays = () => {
	let date = []
	let start = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
	let end = moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}
// 当前季度
export const getCurrQuarter = () => {
	let date = []
	let start = moment().startOf('quarter').format('YYYY-MM-DD')
	let end = moment().endOf('quarter').format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}
// 上个季度
export const getLastQuarter = () => {
	let date = []
	let start = moment().quarter(moment().quarter() - 1).startOf('quarter').format('YYYY-MM-DD')
	let end = moment().quarter(moment().quarter() - 1).endOf('quarter').format('YYYY-MM-DD')
	date.push(start)
	date.push(end)
	return date
}
