export default {
	computed: {
		cartCount() {
			return this.$store.state.mall.cartCount;
		},
		isLogin() {
			return this.$store.getters['user/isTokenValid'];
		}
	},
	watch: {
		cartCount(count) {
			console.log("watch mixin cartCount")
			this.resetTabCartCount();
		}
	},
	onLoad() {
		// this.checkBindMobile();
	},
	onShow() {
		this.resetTabCartCount();
		// console.log("onShow mixin")
		setTimeout(() => {
			uni.hideLoading()
		}, 3000)

		setTimeout(() => {
			this.checkInviter();
		}, 2000)
	},
	methods: {
		checkInviter() {
			let info = this.$store.state.user.userInfo;
			console.log("checkInviter")
			//如果登录之后，用户没邀请者，必须填写邀请信息
			if (this.isLogin && this.$store.state.app.customer && this.$store.state.app
				.customer.mustSetInviter) {
				if (!info.inviter_uid || info.inviter_uid.length < 1) {
					//没有邀请者
					uni.reLaunch({
						url: "/pages/user/setinviter"
					})
				}
			}
		},
		resetTabCartCount() {
			/* let cartIndex = 2;
			// console.log("this.cartCount", this.cartCount)
			if (this.cartCount > 0) {
				uni.setTabBarBadge({
					index: cartIndex,
					text: '' + this.cartCount
				})
			} else {
				uni.removeTabBarBadge({
					index: cartIndex
				})
			} */
		},
	}
}
