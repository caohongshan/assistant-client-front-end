<template>
	<view class="login-container">			
		<!-- #ifdef MP-WEIXIN -->
		<view class="padding-top-100">
			<button open-type="getPhoneNumber" type="primary" @getphonenumber="getPhoneNumber">
				一键获取手机号
			</button>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<uni-forms :value="formData" ref="form">
			<uni-forms-item required name="mobile">
				<view class=" ">
					<uni-easyinput type="number" @confirm="login" maxlength="11" v-model="formData.mobile"
						:inputBorder="false" placeholder="输入手机号码" />
				</view>
			</uni-forms-item>
			<uni-forms-item required name="code">
				<view class="ti-flex">
					<uni-easyinput type="number" @confirm="login" maxlength="6" v-model="formData.code"
						:inputBorder="false" placeholder="输入验证码" />
					<button @click="sendSmsCode" type="default"
						size="mini">{{codeDuration ? codeDuration + 's' : '获取验证码' }}</button>
				</view>
			</uni-forms-item>
			<checkbox-group @change="changeRead">
				<view class="colorGray font-26 margin-top-40">
					<label>
						<!-- 如提供主动勾选按钮或点击“同意”按钮 -->
						<checkbox value="check" checked="true"></checkbox>
						<text>我已认真阅读并同意</text>
					</label>
					<text @click="navTo('/pages/app/web',appConfig.fwxy)">《服务协议》</text>、
					<text @click="navTo('/pages/app/web',appConfig.yszc)">《隐私政策》</text>
				</view>
			</checkbox-group>

			<view class="margin-top-40">
				<button @click="login" type="primary" :disabled="!read">绑定手机号</button>
			</view>
		</uni-forms>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					mobile: "",
					code: "",
				},
				codeDuration: 0,
				codeInterVal: null,
				read: true,
				providerList: []
			};
		},
		onLoad() {
			uni.hideLoading()
			console.log("this.inviteCode", this.inviteCode, this.$store.state.user.openid)
		},
		computed: {
			appConfig() {
				return this.$config.app;
			},
			inviteCode() {
				return this.$store.state.user.inviteCode;
			}
		},
		methods: {
			changeRead(e) {
				this.read = e.detail.value.length > 0
			},
			sendSmsCode() {
				if (this.codeDuration) {
					this.$message(`请在${this.codeDuration}秒后重试`)
					return
				}
				if (!/^1\d{10}$/.test(this.formData.mobile)) {
					this.$message(`手机号码填写错误`)
					return
				}
				uni.showLoading({
					title: "请等待"
				})
				this.$request("user/login/sendSms", {
					mobile: this.formData.mobile
				}).then(res => {
					this.codeDuration = 60;
					this.codeInterVal = setInterval(() => {
						this.codeDuration--
						if (this.codeDuration === 0) {
							if (this.codeInterVal) {
								clearInterval(this.codeInterVal)
								this.codeInterVal = null
							}
						}
					}, 1000)
					this.$success("验证码发送成功")
				}, err => {
					this.$message(`验证码发送失败`)
				})
			},
			login() {
				if (this.isSubmit) {
					return false;
				}
				if (!/^1\d{10}$/.test(this.formData.mobile)) {
					this.$message(`手机号码填写错误`)
					return
				}
				if (!/^\d{6}$/.test(this.formData.code)) {
					this.$message(`验证码填写错误`)
					return
				}
				this.isSubmit = true;
				uni.showLoading({
					title: "请等待"
				})
				//这里只是修改当前用户的手机号
				this.$request("user/info/bind_mobile", {
					inviteCode: this.inviteCode,
					channelCode: this.$store.state.user.channelCode,
					mobile: this.formData.mobile,
					code: this.formData.code,
					uid: this.$store.state.user.userInfo._id,
					openid: this.$store.state.user.openid
				}).then(res => {
					this.loginSuccess(res);
				}, err => {
					this.isSubmit = false;
					this.$message(`绑定失败`)
				})
			},
			loginSuccess(res) {
				this.$success("绑定成功")
				this.$store.dispatch('mall/getCartTotal');
				//刷新用户信息
				this.$store.dispatch('user/getUserInfo');
				this.navTimeBack()
			},
			/**
			 * 微信绑定手机号，可能会与之前的账号合并，相当于用短信登录
			 * @param {Object} e
			 */
			getPhoneNumber(e) {
				console.log('getPhoneNumber', e);
				if (!e.detail.iv) {
					return;
				}
				this.$request('user/login/weixin_phone', {
					...e.detail,
					sessionKey: this.$store.state.user.sessionKey,
					uid: this.$store.state.user.userInfo._id,
					openid: this.$store.state.user.openid
				}, {
					loading: true
				}).then(res => {
					//设置成功,刷新用户信息
					console.log("getPhoneNumber", res)
					this.loginSuccess(res);
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
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
					background: #FFFFFF;
					font-size: 24rpx;
				}

				&::after {
					content: " ";
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
