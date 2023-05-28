import { request } from '@/js_sdk/mall/request.js';
// import { saveFile } from '@/common/js/util.js'
/**
 * https://uniapp.dcloud.io/api/ui/tabbar?id=settabbaritem
 */
export default {
	namespaced: true,
	state: {
		inited: false,
		selectCity: "", //获取城市信息
		mustUniverify: false,
		mustBindMobile: false,
		adConfig: {}, //广告配置
		pageConfig: {}, //自定义页面配置
		customer: {
			telephone: '17700626492'
		},
		share: {},
		navMenu: [], //底部导航，支持动态设置，settabbaritem
		cartIndex: 0, //购物车所在位置，需要显示数量
		appName: process.env.VUE_APP_NAME || '',
	},
	getters: {
		/**
		 * 判断登录信息是否有效
		 * @param {Object} state
		 */
		isMustUniverifyLogin(state) {
			return !!state.mustUniverify;
		}
	},
	mutations: {
		SET_APP_NAME: (state, appName) => {
			state.appName = appName
		},
		SET_APP_AD: (state, adConfig) => {
			state.adConfig = adConfig;
		},
		SET_APP_MUST_UNIVERIFY: (state, mustUniverify) => {
			state.mustUniverify = mustUniverify;
		},
		SET_NAV_MENU: (state, navMenu) => {
			state.inited = true
			state.navMenu = navMenu
		},
	},
	actions: {
		/**
		 * 初始化应用配置，应用名称，菜单
		 */
		async init({ state, commit }, payload) {
			if (!payload) {
				payload = {}
			}
			state.pageConfig = {}
			//读取上一次的缓存
			if (!payload.city) {
				//填写到state
				state.selectCity = uni.getStorageSync('user_select_city');
				//第一次可能是city_id
				if (payload.city_id) {
					payload.city = {
						code: payload.city_id
					}
				}
				if (state.selectCity) {
					payload.city = state.selectCity;
				}
			} else {
				state.selectCity = payload.city;
			}
						
			return request('app/init', payload)
				.then(res => {
					let {
						navMenu,
						appName,
						userInfo,
						share,
						customer,
						mustUniverify,
						mustBindMobile,
						pageConfig,
						adConfig
					} = res
					state.share = share;
					state.customer = customer;
					//是否必须绑定手机号
					state.mustBindMobile = !!mustBindMobile;
					commit('SET_APP_NAME', appName)
					commit('SET_APP_AD', adConfig)
					commit('SET_APP_MUST_UNIVERIFY', mustUniverify)
					console.log("app/init", res)
					if (userInfo) {
						//初始化的时候，可能存在用户信息
						commit('user/SET_USER_INFO', userInfo, {
							root: true
						})
					}
					state.pageConfig = pageConfig;
					//如果存在菜单配置，则下载图标
					if (navMenu && navMenu.length > 0) {
						//#ifdef APP-PLUS
						navMenu.map((nav, index) => {
							uni.setTabBarItem({
								pagePath: nav.pagePath,
								index: index,
								text: nav.text,
							})
							// console.log("开始下载图标",JSON.stringify(nav))
							//下载图标
							// saveFile(nav.iconPath, false, (iconLocalPath) => {
							// 	uni.setTabBarItem({
							// 		index: index,
							// 		iconPath: iconLocalPath,
							// 	})
							// })
							// saveFile(nav.selectedIconPath, false, (iconLocalPath) => {
							// 	uni.setTabBarItem({
							// 		index: index,
							// 		selectedIconPath: iconLocalPath
							// 	})
							// })
						})
						//#endif
						//#ifdef H5
						navMenu.map((nav, index) => {
							uni.setTabBarItem({
								index: index,
								text: nav.text,
								pagePath: nav.pagePath,
								iconPath: nav.iconPath,
								selectedIconPath: nav.selectedIconPath
							})
						})
						//#endif
						// commit('SET_NAV_MENU', navMenu)
					}
					return Promise.resolve(customer)
				})
		},
		setAppName({ commit }, appName) {
			commit('SET_APP_NAME', appName)
		},
	}
}
