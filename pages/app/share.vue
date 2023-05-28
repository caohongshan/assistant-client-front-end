<template>
	<view class="login-container">
		<view class="text-center">
			<image :src="parentUserInfo.avatar" mode="aspectFill" class="image-width-120 bg-white border-radius ">
			</image>
			<view class="">
				<text>{{ parentUserInfo.nickname }}</text>
			</view>
			<view class="">
				<text>{{ parentUserInfo.mobile }}</text>
			</view>
			<view class="font-24 colorGray margin-top-18"><text>邀请您加入一起赚钱</text></view>
		</view>
		<view class="" v-if="!isValid" class="margin-top-100 padding-left-50 padding-right-50 padding-top-60"
			style="height: 400rpx;font-size: 36rpx;">
			<view class="text-center">
				<text>邀请码{{inviteCode}}无效</text>
			</view>
			<view class="text-center" style="margin-top: 30rpx;">
				<text>请重新获取</text>
			</view>
		</view>
		<view v-else-if="isCopy" class="margin-top-100 padding-left-50 padding-right-50 padding-top-60">
			<!-- #ifdef MP -->
			<view class="text-center margin-top-100">
				<text>邀请码（{{inviteCode}}）已生效</text>
			</view>
			<view class="margin-top-60">
				<button @click="goHome" type="primary">进入小程序首页</button>
			</view>
			<!-- #endif -->

			<!-- #ifndef MP -->
			<view class="text-center">
				<text>邀请码（{{inviteCode}}）已生效</text>
			</view>
			<view class="text-center padding-top-20">
				<text>请下载最新APP登录</text>
			</view>
			<view class="margin-top-60" v-if="customer.downloadUrl">
				<button @click="download" type="primary">下载APP</button>
			</view>
			<view class="margin-top-120 text-center" v-else>
				<!-- 没有下载地址 -->
				<text>暂未发布下载地址</text>
			</view>
			<view class="margin-top-40 padding-bottom-36">
				<button @click="copyInviteCode(1)" type="default">获取邀请码</button>
			</view>
			<!-- #endif -->
		</view>
		<view v-else-if="userInfo && userInfo._id" class="margin-top-100 padding-left-50 padding-right-50">
			<view class="text-center">
				<text>邀请成功，我的登录账号如下：</text>
			</view>
			<view class="ti-flex margin-top-18">
				<image :src="userInfo.avatar" mode="aspectFill"
					class="image-width-80 bg-white border-radius user-avatar">
				</image>
				<view class="margin-left-18">
					<view class="">
						<text>{{ userInfo.nickname }}</text>
					</view>
					<view class="">
						<text>{{ userInfo.mobile }}</text>
					</view>
				</view>
			</view>
			<view class="margin-top-60" v-if="customer.downloadUrl">
				<button @click="download" type="primary">下载APP</button>
			</view>
			<view class="margin-top-120 text-center" v-else>
				<!-- 没有下载地址 -->
				<text>暂未发布下载地址</text>
			</view>
			<view class="margin-top-60 padding-bottom-100">
				<button @click="homepage" type="default">进入首页</button>
			</view>
		</view>
		<uni-forms v-else :value="formData" ref="form" class="margin-top-100" style="background: none;">
			<uni-forms-item required name="mobile">
				<view class="">
					<uni-easyinput type="number" maxlength="11" v-model="formData.mobile" :inputBorder="false"
						placeholder="输入手机号码" />
				</view>
			</uni-forms-item>
			<uni-forms-item name="code">
				<view class="  ti-flex">
					<uni-easyinput type="number" maxlength="6" v-model="formData.code" :inputBorder="false"
						placeholder="输入验证码" />
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
				<button @click="login" type="primary" :disabled="!read">接受邀请</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				isCopy: false,
				isValid: true,
				isLoading: true,
				parentUserInfo: {
					avatar: "/static/missing-face.png",
					nickname: "正在获取",
					mobile: "***********"
				}, //邀请者信息
				formData: {
					mobile: "",
					code: "",
				},
				codeDuration: 0,
				codeInterVal: null,
				read: true,
				inviteCode: "",
				providerList: []
			};
		},
		onLoad(e) {
			console.log("share", e)
			this.inviteCode = e.u;
			if (this.globalInviteCode) {
				this.inviteCode = this.globalInviteCode
			}
			uni.hideLoading()
			this.getInviterInfo();
			//#ifdef MP
			this.isCopy = true;
			return;
			//#endif
			setTimeout(() => {
				this.copyInviteCode()
			}, 2000)
			console.log("this.inviteCode", this.inviteCode)
		},
		computed: {
			customer() {
				return this.$store.state.app.customer;
			},
			userInfo() {
				return this.buildUserInfo(this.$store.state.user.userInfo);
			},
			appConfig() {
				return this.$config.app;
			},
			globalInviteCode() {
				return this.$store.state.user.inviteCode;
			}
		},
		methods: {
			/**
			 * 复制邀请码，方便用户打开APP的时候，获取
			 */
			copyInviteCode(notice) {
				uni.setClipboardData({
					data: this.inviteCode,
					success: () => {
						console.log('copyInviteCode success');
						this.isCopy = true;
						if (notice) {
							this.$success("操作成功")
						}
					}
				});
			},
			getInviterInfo() {
				if (!this.inviteCode) {
					return;
				}
				db.action("mobile").collection("uni-id-users").where(`my_invite_code=="${this.inviteCode}"`).field(
					"avatar,nickname,mobile").limit(
					1).get().then(({
					result
				}) => {
					console.log("getInviterInfo", result)
					if (result.data.length == 0) {
						//邀请码无效
						this.isValid = false;
						return;
					}
					this.buildMember(result.data);
					this.parentUserInfo = result.data[0]
					//#ifdef MP-ALIPAY
					//更新邀请码，支付宝不能获得全局参数，只能从页面获得
					this.$request("user/info/invite", {
						inviteCode: this.inviteCode
					})
					//#endif
					this.isLoading = false;
				})
			},
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
				this.$request("user/login/mobile", {
					inviteCode: this.inviteCode,
					channelCode: this.$store.state.user.channelCode,
					mobile: this.formData.mobile,
					code: this.formData.code,
				}).then(res => {
					this.$success("邀请成功");
					this.goHome()
				}, err => {
					this.isSubmit = false;
					this.$message(`登录失败`)
				})
			},
			homepage() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			},
			download() {
				//#ifdef H5
				window.location.href = this.customer.downloadUrl;
				//#endif
				//#ifndef H5
				this.navTo("/pages/app/web", this.customer.downloadUrl)
				//#endif
			},
			goHome() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-image: linear-gradient(#fe5819, #f9883a);
		height: 100%;
		padding-top: 100rpx;
	}

	.login-container {
		padding: 100rpx 80rpx 600rpx;
		background: url(https://www.cqsort.com/static/images/qrcode_bg.png) no-repeat;
		background-size: 100%;
		background-position-y: 70rpx;
	}
</style>
