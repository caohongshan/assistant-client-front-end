export default {
	// #ifdef MP-WEIXIN
	data() {
		return {
			mpCodeTimer: 0,
			mpWxCode: '',
		}
	},
	onShow() {
		this.getMpWxCode();
		//#ifdef MP
		//如果首次没有登录成功，则再次自动登录
		this.wxLogin()
		//#endif
	},
	methods: {
		/**
		 * 微信授权登录
		 */
		async wxLogin() {
			uni.login({
				provider: "weixin",
				success: (loginRes) => {
					this.mpWxGetUserInfo()
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// })
				}
			});
		},
		//微信小程序登录，获得用户信息，更新到服务器，只存在一次
		mpWxGetUserInfo(userInfoData) {
			uni.getUserInfo({
				provider: "weixin",
				success: (res) => {
					this.$request("user/login/weixin", {
						code: this.mpWxCode,
						channelCode: this.$store.state.user.channelCode,
						encryptedData: res.encryptedData,
						iv: res.iv,
						userInfo: res.userInfo
					}).then(res2 => {
						console.log("res2===", res2)
					})
				}
			})
		},
		//获取code
		getMpWxCode() {
			uni.login({
				provider: 'weixin',
				success: res => {
					this.mpWxCode = res.code;
				}
			})
		},

	}
	// #endif
}
