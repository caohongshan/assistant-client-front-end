<script>
	//#ifdef APP-PLUS
	import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update";
	//#endif
	import Vue from 'vue';
	import { mapActions, mapMutations } from 'vuex';
	import { getQueryString } from '@/common/js/util.js'

	let inviteCode = "";
	let channelCode = "";
	let netWorkChangeTime = 0;
	
	export default {
		onLaunch: function(options) {
			console.log('uniCloud', uniCloud)
			if (!options.query) {
				options.query = {}
			}			
			//微信普通二维码扫码进入
			if (options.query.q) {
				let url = decodeURIComponent(options.query.q);
				Object.assign(options.query, {
					...getQueryString(url)
				});
				delete options.query.q
				console.log("options.query", options.query)
			}
			if(options.query.scene){
				let url = decodeURIComponent(options.query.scene)
				Object.assign(options.query, {
					...getQueryString(url)
				});
				delete options.query.scene
				console.log("options.query", options.query)
			}
			//推广渠道id，后台存在渠道表
			if (options.query.channel) {
				channelCode = options.query.channel;
				this.setChannelCode(options.query.channel);
			}
			//邀请者
			if (options.query.u) {
				inviteCode = options.query.u;
				this.setInviteCode(options.query.u);
			} 
			//如果存在登录信息，自动登录
			this.autoLogin(options.query);
			//#ifdef APP-PLUS
			//检测更新
			checkUpdate().then(res => {
				console.log("检查更新结果", res)
			});
			this.initUniverify();

			//#endif
			this.initSize(uni.getSystemInfoSync());
			//如果首次没有联网，init会加载失败
			uni.onNetworkStatusChange((e) => {
				//避免出现网络断断续续，页面一直刷新
				if (e.isConnected && Date.now() - netWorkChangeTime > 10000) {
					console.log("isConnected")
					netWorkChangeTime = Date.now()
					this.autoLogin(options.query);
				}
			})
		},
		
		onShow: function() {
			//检测小程序版本升级https://uniapp.dcloud.net.cn/api/other/update.html
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					console.log("版本检测结果", res.hasUpdate);
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function(res) {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});

						updateManager.onUpdateFailed(function(res) {
							// 新的版本下载失败
						});
					}
				});
			}
		},
		methods: {
			...mapMutations({
				setInviteCode(commit, code) {
					//更新邀请码
					commit('user/SET_INVITECODE', code)
				},
				setChannelCode(commit, code) {
					commit('user/SET_CHANNELCODE', code)
				},
				setUniverifyInit(commit) {
					//APP初始化一键登录成功
					commit('user/UNIVERIFY_INIT')
				},
			}),
			...mapActions({
				initApp: 'app/init',
				mpLogin: 'user/mpLogin',
			}),
			/**
			 * 从上一次缓存，自动登录, store已经从缓存中读取上一次的token 
			 */
			async autoLogin(query) {
				//小程序每次都需要新登录，因为sessionKey有不确定的时间限制
				
				let res = {
					cloudID: "67_a0q4YuPdoRekMgKRxySGuCnHFRl4kXkiGks4jRrUMFwiN6RxuiO6kJDNLbA",
					encryptedData: "p8UJ6SqcCwemtD/dNLEalrjD1N41bMz/FxMuOedIvVQpnCOdM7cgAwiqxo69QuPY9iMMRQH0pz6rnBCMrbDUTvP2VfahK0LUCiHRFtm3614SpKXCB7obj7prp7M9Wj/bvgoFqh5Cx+EgMik4C2pjf2T30WlKcOc21sZmF6oVEvcfaCjE+7OSMYNo8heIFB3+jmHn6KthSm01zXF1f1ctA8UIugcQ2+WL9D6NesRWp+4rRJrGuJuPipdG/KLoKy5Eru1Hc5f9vFCFqoL+MwvHsPvQwLpQR/51ANSE6nKtsMAI4PMP/7AdggNUX332vFZ2a2YpXXdDxBvfKWS0NF3uBY35FTtsav8lT74GpxwebzuPM+4mEEs6cQY4grERyOCxO6PL4AsiIsz4BL5WZA13I4OY/aX8RoB2FhG3W7L5UjwlsiBarZC7q4adcUzXWiwp",
					errMsg: "getUserProfile:ok",
					iv: "LeGaxMZ7w1Xjc+wWpmncaw==",
					rawData: "{}",
					signature: "e3b2282a63afe958db96d14ee73dd2fc1e67b5b3", // 唯一的
					userInfo: {
						avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
						city: "",
						country: "",
						gender: 0,
						is_demote: true,
						language: "",
						nickname: "微信用户",
						province: "",
					}
				}
				
				// let res = {
				// 	cloudID: "67_a0q4YuPdoRekMgKRxySGuCnHFRl4kXkiGks4jRrUMFwiN6RxuiO6kJDNLbA",
				// 	encryptedData: "p8UJ6SqcCwemtD/dNLEalrjD1N41bMz/FxMuOedIvVQpnCOdM7cgAwiqxo69QuPY9iMMRQH0pz6rnBCMrbDUTvP2VfahK0LUCiHRFtm3614SpKXCB7obj7prp7M9Wj/bvgoFqh5Cx+EgMik4C2pjf2T30WlKcOc21sZmF6oVEvcfaCjE+7OSMYNo8heIFB3+jmHn6KthSm01zXF1f1ctA8UIugcQ2+WL9D6NesRWp+4rRJrGuJuPipdG/KLoKy5Eru1Hc5f9vFCFqoL+MwvHsPvQwLpQR/51ANSE6nKtsMAI4PMP/7AdggNUX332vFZ2a2YpXXdDxBvfKWS0NF3uBY35FTtsav8lT74GpxwebzuPM+4mEEs6cQY4grERyOCxO6PL4AsiIsz4BL5WZA13I4OY/aX8RoB2FhG3W7L5UjwlsiBarZC7q4adcUzXWiwp",
				// 	errMsg: "getUserProfile:ok",
				// 	iv: "LeGaxMZ7w1Xjc+wWpmncaw==",
				// 	rawData: "{}",
				// 	signature: "e3b2282a63afe958db96d14ee73dd2fc1e67b541", // 唯一的
				// 	userInfo: {
				// 		avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
				// 		city: "",
				// 		country: "",
				// 		gender: 0,
				// 		is_demote: true,
				// 		language: "",
				// 		nickname: "微信用户",
				// 		province: "",
				// 	}
				// }	
							
				//#ifdef MP
				uni.getUserInfo({
					provider: 'weixin',
					success: (loginRes) => {
						loginRes.nickname = loginRes.nickName;
						delete person.nickName;
						this.mpLogin(loginRes);
					},
					fail(err) {
						console.log("获取个人信息异常了", err)
					}
				});
				//#endif
				// #ifdef H5
				this.mpLogin(res);
				//#endif
				// this.initApp(query).then(res => {
				// 	// 只允许修改存在的key
				// 	Object.keys(this.$config).map(key => {
				// 		if (res[key]) {
				// 			//覆盖原来的配置
				// 			Object.assign(this.$config[key], res[key])
				// 		}
				// 	})
				// });
			},
			/**
			 * 初始化uni一键登录
			 */
			async initUniverify(index = 0) {
				let _this = this;
				// #ifdef APP-PLUS
				console.log("开始一键登录")
				/* const univerifyManager = uni.getUniverifyManager()
				univerifyManager.preLogin({
					provider: 'univerify',
					success() { //预登录成功
						// 显示一键登录选项
						console.log("一键登录初始化成功")
						// _this.setUniverifyInit();
					}
				}) */
				uni.preLogin({
					provider: 'univerify',
					success() { //预登录成功
						// 显示一键登录选项
						console.log("一键登录初始化成功")
						_this.setUniverifyInit();
					},
					fail(res) { // 预登录失败
						// 不显示一键登录选项（或置灰）
						// 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
						console.log(res.errCode)
						console.log(res.errMsg)
						//去掉多次检测
						if (index < 30) {
							//重试2次
							setTimeout(() => {
								_this.initUniverify(index + 1)
							}, index * index * 1000)
						}
					},
					complete() {
						console.log("一键登录complete")
					}
				})
				// #endif
			},
			/**
			 * 存储设备信息 参考colorUI
			 * @param {Object} 
			 */
			initSize(e) {
				const systemInfo = e;
				let navigationBarHeight;
				let custom = {};
				// #ifndef MP
				custom = {
					height: 36,
					width: 88
				};
				navigationBarHeight = 44;
				// #endif
				// #ifdef MP-WEIXIN
				custom = wx.getMenuButtonBoundingClientRect();
				navigationBarHeight = custom.bottom + custom.top - e.statusBarHeight * 2;
				// #endif	
				// #ifdef MP-TOUTIAO
				custom = tt.getMenuButtonBoundingClientRect();
				navigationBarHeight = custom.bottom + custom.top - e.statusBarHeight * 2;
				// #endif	
				systemInfo.custom = custom;
				systemInfo.navigationBarHeight = navigationBarHeight;
				systemInfo.development = process.env.NODE_ENV == "development";
				console.log(systemInfo);
				Vue.prototype.systemInfo = systemInfo;
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	@import "common/css/font_2479288_9cqg4e7ml9.css";
	@import "common/css/theme.scss";
	@import "common/css/style.scss";
	/* #endif */
</style>
