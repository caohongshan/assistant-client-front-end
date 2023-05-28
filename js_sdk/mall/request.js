import store from '@/store'
import config from '@/config.js'

// const db = uniCloud.database()

// db.on('refreshToken', function({
// 	token,
// 	tokenExpired
// }) {
// 	store.commit('user/SET_TOKEN', {
// 		token,
// 		tokenExpired
// 	})
// })

export function request(action, data = {}, {
	showModal = true,
	loading = false,
	checkAuthInvalid = false,
	tryTimes = 1,
} = {}) {
	
	if (loading) {
		uni.showLoading({
			title: "加载中",
			mask: true
		})
	}
		
	return uni.request({
				url: `http://127.0.0.1:5000/${action}`,
				method: "POST", 
				data: {
					...data,
					user_id: store.state.user.userInfo.my_invite_code
				}
			}).then(res => {
				console.log("我是请求获取的数据", res)
				const result = res[0]
				const data = res[1]?.data
				
				uni.hideLoading()
				if (!result) {
					return Promise.resolve(data)
				}
				//返回值code为统一过滤
				if (result.code) {
					let message = result.message;
					if (typeof result.code === 'string') {
						if (result.code.indexOf('InternalServerError') === 0) {
							message = "系统繁忙";
						} else if (result.code.indexOf('TOKEN_INVALID') === 0) {
							message = "登录状态已过期，请重新登录";
							/* uni.reLaunch({
								url: config.login.url
							}) */
						}
					}
					// const err = new Error(result.message)
					// err.code = result.code
					const err = {
						...result,
						message
					}
					return Promise.reject(err)
				}
				const {
					type,
					uid,
					userInfo
				} = data;
				if (type && type == "register") {
					userInfo._id = uid;
				}

				return Promise.resolve(data)
	}).catch(err => {
		let msg = err.message;
		if (msg.indexOf("403") != -1) {
			msg = "运营商流量限制,请稍后再试"
		} else if (msg.indexOf("request:fail") != -1) {
			msg = "联网失败,请检查网络"
		} else if ((msg.indexOf("超时") != -1 || msg.indexOf("timed out") != -1 || err.code ==
				"FUNCTIONS_TIME_LIMIT_EXCEEDED") && tryTimes <
			config.tryTimes) {
			console.error("云函数超时请求" + msg + action, tryTimes)
			return request(action, data, {
				showModal,
				loading,
				checkAuthInvalid,
				tryTimes: tryTimes + 1
			});
		}
		uni.hideLoading()
		showModal && uni.showModal({
			content: msg || '请求服务失败',
			showCancel: false,
		})
		return Promise.reject(err)
	})
}

export function initRequest(Vue) {
	Vue.prototype.$request = request;
	Vue.prototype.$config = config;
}
