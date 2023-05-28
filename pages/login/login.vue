<template>
	<view class="login-container">
		<uni-forms :value="formData" ref="form">
			<uni-forms-item required name="mobile">
				<view class=" ">
					<uni-easyinput type="number" @confirm="login" maxlength="11" v-model="formData.mobile"
						:inputBorder="false" placeholder="输入手机号码(新手机号自动注册)" />
				</view>
			</uni-forms-item>
			<uni-forms-item required name="code">
				<view class="  ti-flex">
					<uni-easyinput type="number" @confirm="login" maxlength="6" v-model="formData.code"
						:inputBorder="false" :clearable="false" placeholder="输入验证码" />
					<button @click="sendSmsCode" type="default"
						size="mini">{{codeDuration ? codeDuration + 's' : '获取验证码' }}</button>
				</view>
			</uni-forms-item>
<!-- 			<checkbox-group @change="changeRead">
				<view class="colorGray font-26 margin-top-40">
					<label>
						<checkbox value="check" :checked="read" />
						<text>我已认真阅读并同意</text>
					</label>
					《<text @click="navTo('/pages/app/web',appConfig.fwxy)"
						style="text-decoration: underline;">服务协议</text>》和《<text
						@click="navTo('/pages/app/web',appConfig.yszc)" style="text-decoration: underline;">隐私政策</text>》
				</view>
			</checkbox-group> -->

			<view class="margin-top-40">
				<button @click="login" type="primary">登录</button>
			</view>
		</uni-forms>
		<!-- #ifdef APP-PLUS -->
		<view class="others colorGray" v-if="hasProvider">
			<view class="title">
				<text class="txt">其他登录方式</text>
			</view>
			<view class="ti-flex margin-top-60">
				<tian-icons v-if="hasAppleLogin" type="pingguo" size="30" color="#111111" @click="appleLogin"
					class="flex-1"><text class="font-22">苹果登录</text></tian-icons>
				<tian-icons v-if="hasQQLogin" type="QQ" size="30" color="#00aaff" @click="qqLogin" class="flex-1"><text
						class="font-22">QQ登录</text></tian-icons>
				<tian-icons v-if="hasWeixinAuth" type="weixin" size="30" color="#62b66c" @click="wxLogin"
					class="flex-1"><text class="font-22">微信登录</text></tian-icons>
				<tian-icons v-if="hasWeiboLogin" type="weibo" size="30" color="#e83030" @click="weiboLogin"
					class="flex-1">
					<text class="font-22">微博登录</text>
				</tian-icons>
				<tian-icons v-if="hasUniverifyLogin" type="shouji" size="30" color="#e87f71" @click="univerify()"
					class="flex-1"><text class="font-22">一键登录</text></tian-icons>
			</view>
			<view class="margin-top-60">
				<text class="font-22 ">未注册过的用户将直接为您创建新账户</text>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import loginApp from './mixin/app.js'
	import loginMpWx from './mixin/mp-weixin.js'
	export default {
		mixins: [loginApp, loginMpWx],
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
			console.log("this.inviteCode", this.inviteCode)
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
				if (!this.read) {
					this.$message("请阅读并同意服务协议和隐私政策")
					return false;
				}
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
				uni.showLoading({ title: "请等待" })
				this.$request("user/login/mobile", {
					inviteCode: this.inviteCode,
					channelCode: this.$store.state.user.channelCode,
					mobile: this.formData.mobile,
					code: this.formData.code,
				}).then(res => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, err => {
					this.isSubmit = false;
					this.$message(`登录失败`)
				})
			},
			//APP一键登录
			univerify() {
				console.log("sss")
				this.navToLoginNotice((res) => {
					console.log("login", res)
					this.loginSuccess(res);
				}, false, false)
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
