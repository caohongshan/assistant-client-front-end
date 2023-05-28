import {
	throttle,
	dateFormat,
	getUnique,
	thumbImg,
	checkStrType,
	prePage,
	repairImageSize,
	stringFormat
} from '@/common/js/util.js'

function formatBytes(bytes) {
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
	if (bytes == 0) {
		return 'n/a'
	}
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
	if (i == 0) {
		return bytes + ' ' + sizes[i]
	}
	return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}
/**
 * 普通消息
 */
function message(title = '', duration = 1500, icon = 'none', mask = false) {
	uni.hideLoading()
	if (!title) return;
	uni.showToast({
		title,
		duration: duration,
		mask: mask,
		icon: icon
	});
}
/**
 * 操作成功消息
 */
function success(title = '', duration = 1500, mask) {
	message(title, duration, 'success', mask);
}

export function initUtil(Vue) {
	Vue.prototype.$dateFormat = dateFormat
	Vue.prototype.$formatBytes = formatBytes
	Vue.prototype.$message = message;
	Vue.prototype.$success = success;
	Vue.prototype.$throttle = throttle;
	Vue.prototype.$getUnique = getUnique;
	Vue.prototype.$thumbImg = thumbImg;
	Vue.prototype.$prePage = prePage;
	Vue.prototype.$repairImageSize = repairImageSize;
	Vue.prototype.$stringFormat = stringFormat;
}

export function getDeviceUUID() {
	let deviceId = uni.getStorageSync('uni_deviceId') ||
		uni.getSystemInfoSync().deviceId ||
		uni.getSystemInfoSync().system + '_' + Math.random().toString(36).substr(2);

	uni.setStorageSync('uni_deviceId', deviceId)
	return deviceId;
}
