<template>
	<view class="login-container">
		<uni-forms :value="formData" ref="form">
			<view class="">
				<text>本系统采用邀请制注册，请准确填写邀请者手机号，避免邀请关系设置失败</text>
			</view>
			<view class="">
				<text @click="navTo('/pages/app/contact')" class="colorBlue">如有疑问，请联系客服</text>
			</view>
			<uni-forms-item required name="mobile">
				<view class="margin-top-60 ">
					<uni-easyinput type="number" maxlength="11" v-model="formData.mobile" :inputBorder="false"
						placeholder="输入邀请者手机号码/邀请码" />
				</view>
			</uni-forms-item>

			<view class="margin-top-40 ti-flex">
				<button @click="submit" type="primary" :disabled="isSubmit" class="flex-1">确定邀请</button>
				<button @click="navTo('/pages/user/account')" type="warn" :disabled="isSubmit"
					class="flex-1 margin-left-16">退出登录</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					mobile: '',
					code: ''
				},
				codeDuration: 0,
				codeInterVal: null,
				read: true,
				inviteCode: '',
				providerList: []
			};
		},
		computed: {
			isLogin() {
				return this.$store.getters['user/isTokenValid'];
			}
		},
		onShow() {
			setTimeout(() => {
				this.checkInviter();
			}, 1000)
		},
		methods: {
			checkInviter() {
				console.log("checkInviter inner")
				if (!this.isLogin) {
					uni.reLaunch({
						url: '/pages/index/index'
					});
				} else if (this.$store.state.app.customer && this.$store.state.app
					.customer.mustSetInviter) {
					//如果登录之后，用户没邀请者，必须填写邀请信息
					let info = this.$store.state.user.userInfo;
					if (info.inviter_uid && info.inviter_uid.length > 0) {
						//存在邀请者
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}
				}
			},
			submit() {
				if (this.isSubmit) {
					return false;
				}
				this.isSubmit = true;
				uni.showLoading({
					title: '请等待'
				});
				this.$request(
					'user/info/jointeam', {
						mobile: this.formData.mobile
					}, {
						loading: true
					}
				).then(res => {
					this.isSubmit = false;
					console.log('jointeam', res);
					if (res.code == 0) {
						this.$success('邀请成功');
						//设置成功,刷新用户信息
						this.$store.dispatch('user/getUserInfo');
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}, 2000);
					}
				}, err => {
					this.isSubmit = false;
				});
			},
		}
	};
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}

	.login-container {
		padding: 50rpx;

		.others {
			position: fixed;
			bottom: 120rpx;
			text-align: center;
			width: 100%;
			left: 0;
			font-size: $uni-font-size-base;

			.title {
				position: relative;

				.txt {
					position: relative;
					z-index: 5;
					padding: 0 20rpx;
					background: #ffffff;
					font-size: 24rpx;
				}

				&::after {
					content: ' ';
					left: 80rpx;
					right: 80rpx;
					top: 50%;
					position: absolute;
					border-bottom: 2rpx solid $uni-border-color;
				}
			}

			.ti-flex {
				align-items: center;
				justify-content: center;
				width: 80%;
				margin: 40rpx auto 0;
			}
		}
	}
</style>
