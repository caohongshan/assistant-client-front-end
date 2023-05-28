import store from '@/store'
import config from '@/config.js'

export function initInterceptor(Vue) {
	/**
	 * 登录信息过滤器
	 */
	uni.addInterceptor('navigateTo', {
		invoke(params) {
			let isAdminUrl = params.url.indexOf("pages/admin") != -1;
			//不是所有的地址都需要登录权限
			if ((params.url.indexOf("login=true") != -1 || isAdminUrl) && !store.getters['user/isTokenValid']) {
				/* uni.showModal({
					title: config.login.title,
					content: config.login.content,
					showCancel: false,
					success() {
						uni.navigateTo({
							url: config.login.url
						})
					}
				})
				return false; */
			} else if (isAdminUrl && !Vue.prototype.$hasPermission(params.url.split("pages/admin")[1])) {
				//需要管理权限
				console.error("没有权限")
				uni.showModal({
					title: "没有访问权限",
					content: "请联系客服解决",
					showCancel: false,
					success() {}
				})
				return false;
			}
		},
		fail: ({
			errMsg
		}) => {
			if (errMsg.indexOf('is not found') !== -1) { // 404
				uni.navigateTo({
					url: config.error.url + '?errMsg=' + errMsg
				})
			}
		}
	})
}
