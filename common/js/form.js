/**
 * 表单类型的验证
 */
// 判断类型集合
export const checkStrType = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^([a-zA-Z0-9_]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
				/^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}

//检查字段是否为空
export const checkFields = (data, fields) => {
	for (let fie in fields) {
		if (typeof data[fie] == 'undefined' || data[fie] == '') {
			this.$util.msg(fields[fie] + '不能为空');
			return false;
		} else if (typeof data[fie] == 'array' && data[fie].length == 0) {
			this.$util.msg(fields[fie] + '必选');
			return false;
		}
	}
	return true;
}
/**
 * 比较上一个字段与下一个自动的大小
 * @param {Object} data
 * @param {Object} fields
 */
export const checkTimeFields = (data, fields) => {
	let prev = 0;
	let prevField = "";
	for (let fie in fields) {
		if (prev > data[fie]) {
			this.$api.msg(`${fields[prevField]}必须大于或等于${fields[fie]}`);
			return false;
		}
		prev = data[fie];
		prevField = fie;
	}
	return true;
}
/**
 * 输入字段自动填充data
 * @param {Object} val
 * @param {Object} field
 */
export const changeField = (val, field) => {
	console.log(val, field)
	let fs = field.split(".");
	if (fs.length == 1) {
		this[field] = val;
	} else if (fs.length == 2) {
		if (!this[fs[0]]) {
			this[fs[0]] = {};
		}
		this[fs[0]][fs[1]] = val;
	}
}
export const getObjectProperty = (obj, fields) => {
	if (!fields) {
		return {}
	}
	let out = {}
	for (let key of fields) {
		out[key] = obj[key]
	}
	return out;
}
