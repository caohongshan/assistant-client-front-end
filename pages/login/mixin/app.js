let weixinAuthService;
export default {
	// #ifdef APP-PLUS
	data() {
		return {
			hasWeixinAuth: false,
			hasAppleLogin: false,
			hasQQLogin: false,
			hasWeiboLogin: false,
			hasUniverifyLogin: false,
			hasProvider: false,
		}
	},
	onLoad() {
		plus.oauth.getServices((services) => {
			weixinAuthService = services.find((service) => {
				return service.id === 'weixin'
			})
			if (weixinAuthService) {
				this.hasWeixinAuth = true
			}
		});
		this.initProvider();
	},
	methods: {
		initProvider() {
			const filters = ['apple', 'weixin', 'qq', 'sinaweibo', 'univerify'];
			uni.getProvider({
				service: 'oauth',
				success: (res) => {
					console.log("res.provider", res.provider)
					if (res.provider && res.provider.length) {
						if (res.provider.indexOf('apple') !== -1) {
							this.hasAppleLogin = true;
						}
						if (res.provider.indexOf('qq') !== -1) {
							this.hasQQLogin = true;
						}
						if (res.provider.indexOf('sinaweibo') !== -1) {
							this.hasWeiboLogin = true;
						}
						//预登录成功
						if (res.provider.indexOf('univerify') !== -1 && this.$store.state.user
							.univerifyInit) {
							this.hasUniverifyLogin = true;
						}
						this.hasProvider = true;
					}
				},
				fail: (err) => {
					console.error('获取服务供应商失败：' + JSON.stringify(err));
				}
			});
		},
		qqLogin() {
			uni.login({
				provider: "qq",
				success: (loginRes) => {
					console.log('qqLogin loginRes', loginRes);
					console.log('inviteCode', this.inviteCode);
					this.$request("user/login/qq", {
						inviteCode: this.inviteCode,
						channelCode: this.$store.state.user.channelCode,
						...loginRes.authResult
					}).then(res2 => {
						this.loginSuccess(res2);
					}, err => {
						//更新失败
					})
				}
			});
		},
		/**
		 * 微博授权登录
		 */
		weiboLogin() {
			uni.login({
				provider: "sinaweibo",
				success: (loginRes) => {
					console.log('sinaweiboLogin loginRes', loginRes);
					console.log('inviteCode', this.inviteCode);
					this.$request("user/login/sinaweibo", {
						inviteCode: this.inviteCode,
						channelCode: this.$store.state.user.channelCode,
						...loginRes.authResult
					}).then(res2 => {
						this.loginSuccess(res2);
					}, err => {
						//更新失败
					})
				}
			});
		},
		/**
		 * 微信授权登录
		 */
		async wxLogin() {
			weixinAuthService.authorize((res) => {
				console.log('wxLogin loginRes', res);
				this.$request("user/login/weixin", {
					inviteCode: this.inviteCode,
					channelCode: this.$store.state.user.channelCode,
					code: res.code,
				}).then(res2 => {
					this.loginSuccess(res2);
				}, err => {
					//更新失败
				})
			}, (err) => {
				console.log(err)
				this.$message(err.message || "企业必须认证才有登录能力")
			});
		},
		//APP一键登录
		univerify() {
			this.navToLoginNotice((res) => {
				console.log("login", res)
				this.loginSuccess(res);
			}, false, false)
		},
	}
	// #endif
}
