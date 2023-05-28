import Vue from 'vue'
import {
	dateFormat,
	thumbImg
} from '@/common/js/util'

/**
 * 格式化日期，微信小程序中，层级太深，写法无效
 */
Vue.filter('dateFormat', (timeStamp, format = 'Y-m-d H:i') => {
	if (!timeStamp) return '';
	return dateFormat(format, timeStamp);
})

/**
 * 处理距离
 */
Vue.filter('formatDistance', (value) => {
	if (!value) {
		return "0m";
	}
	if (value < 1000) {
		return value.toFixed(2) + "米"
	}
	return (value / 1000).toFixed(2) + "千米";
});
/**
 * 处理距离到达时间
 */
Vue.filter('formatDistanceTime', (value) => {
	if (!value) {
		return "0m";
	}
	if (value < 10) {
		return "5分钟"
	}
	if (value < 100) {
		return "15分钟"
	}
	if (value < 1000) {
		return "30分钟"
	}
	let str = "";
	let minute = parseInt((value / 1000) * 30);
	if (minute / 60 > 1) {
		str += parseInt(minute / 60) + "小时"
	}
	str += (minute % 60) + "分钟"
	return str;
});

/**
 * 格式化价格
 */
Vue.filter('price', (price, fixed = 0) => {
	if (!price || isNaN(price)) {
		return 0
	}
	return fixed > 0 ? parseFloat(price).toFixed(fixed) : +parseFloat(price).toFixed(2);
})

Vue.filter('substr', (value, length = 20) => {
	if (!value) {
		return "";
	} else if (value.length > length) {
		return value.substr(0, length) + "...";
	}
	return value;
});
/**
 * 性别默认头像
 */
Vue.filter('genderAvatar', (e) => {
	if (e == 1) {
		return '/static/img/default-head-female.jpg';
	} else {
		return '/static/img/default-head-male.jpg'
	}
})
/**
 * 性别文字
 */
Vue.filter('genderValue', (e) => {
	if (e == 1) {
		return '女';
	} else if (e == 2) {
		return '男';
	} else {
		return '未知'
	}
})

/**
 * 动态处理缩略图，居中短边裁剪
 * @param {Object} value
 * @param {Object} fmt 宽x高 200x200
 */
Vue.filter('thumbImg', (value, fmt) => {
	return thumbImg(value, fmt);
});
