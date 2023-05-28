<template>
	<view>
		<uni-list>
			<uni-list-item title="头像" :showArrow="true" :clickable="true" @click="changeAvatar">
				<template slot="footer">
					<image class="image-width-50 border-radius" :src="userInfo.avatar" mode="aspectFill" />
				</template>
			</uni-list-item>
			<uni-list-item title="昵称" :showArrow="true" :clickable="true" @click="navTo('/pages/user/edit/nickname')"
				:rightText="userInfo.nickname">
			</uni-list-item>
			<uni-list-item v-if="userInfo.channel_code" title="渠道" :rightText="userInfo.channel_code">
			</uni-list-item>
			<!-- #ifdef APP-PLUS -->
			<uni-list-item v-if="enableWxpay" title="微信" :showArrow="true" :clickable="true" @click="bindWeixin"
				:rightText="wxStatusText">
			</uni-list-item>
			<uni-list-item v-if="enableBank" title="绑定银行卡" :showArrow="true" :clickable="true"
				@click="navTo('/pages/user/bind/bankcard')" :rightText="bankStatusText">
			</uni-list-item>
			<uni-list-item v-if="enableAlipay" title="绑定支付宝" :showArrow="true" :clickable="true"
				@click="navTo('/pages/user/bind/alipay')" :rightText="alipayStatusText">
			</uni-list-item>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<uni-list-item v-if="enableWxpay" title="绑定微信" :showArrow="true" :clickable="true" @click="bindWeixinH5"
				:rightText="wxStatusText">
			</uni-list-item>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<uni-list-item title="绑定手机" :showArrow="true" :clickable="true" @click="navTo('/pages/login/bindmobile')"
				:rightText="mobileStatusText">
			</uni-list-item>
			<!-- #endif -->
			<uni-list-item title="注销账号" :showArrow="true" :clickable="true" @click="cancellation" rightText="注销后不能恢复">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import { cloudUploadFile } from "@/common/mixin/upload.js"
	export default {
		data() {
			return {
				cachekey: 'tiantian-accounts',
				isBindWx: false,
				info: {},
			};
		},
		onLoad() {
			uni.setStorage({
				key: "avatarField",
				data: "avatar"
			})

			console.log(this.cashoutTypes)
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			},
			cashoutTypes() {
				return this.userInfo.cashoutType
			},
			enableWxpay() {
				return this.cashoutTypes && this.cashoutTypes.filter(e => e.value == "wxpay").length > 0
			},
			enableBank() {
				return this.cashoutTypes && this.cashoutTypes.filter(e => e.value == "bank").length > 0
			},
			enableAlipay() {
				return this.cashoutTypes && this.cashoutTypes.filter(e => e.value == "alipay").length > 0
			},
			customer() {
				return this.$store.state.app.customer;
			},
			mobileStatusText() {
				if (this.userInfo.mobile) {
					return this.userInfo.mobile;
				}
				return "去绑定";
			},
			bankStatusText() {
				if (this.userInfo.bankinfo) {
					//银行名称
					return this.userInfo.bankinfo.title;
				}
				return "去绑定";
			},
			alipayStatusText() {
				if (this.userInfo.alipayinfo) {
					return this.userInfo.alipayinfo.name;
				}
				return "去绑定";
			},
			wxStatusText() {
				//#ifdef H5
				if (this.userInfo.wx_openid && this.userInfo.wx_openid["h5"]) {
					this.isBindWx = true;
					return "已绑定"
				}
				//#endif
				if (this.userInfo.wx_openid && this.userInfo.wx_openid["app-plus"]) {
					this.isBindWx = true;
					return "已绑定"
				}
				return "去绑定"
			}
		},
		methods: {
			cancellation() {
				this.confirmAction(() => {
					this.$request('user/info/cancellation', {}, {
						showModal: false,
						loading: true
					}).then(() => {
						this.$success("注销成功")
						this.localLogout();
					}, (err) => {
						uni.showModal({
							title: "注销失败",
							content: err.message + "\n请联系客服协助处理",
							cancelText: "放弃注销",
							confirmText: "找客服",
							success: (res) => {
								if (res.confirm) {
									uni.redirectTo({
										url: "/pages/app/contact"
									})
								}
							}
						})
					})
				}, "请确认您已经准备放弃本账户？若不满足自主注销条件请联系客服协助完成", "温馨提示")
			},
			localLogout() {
				let data = [];
				//移除accounts
				this.dataList = uni.getStorageSync(this.cachekey);
				if (this.dataList && this.dataList.length > 1) {
					data = this.dataList.filter(e => e._id != this.userInfo._id);
				}
				uni.setStorageSync(this.cachekey, data);
				if (data.length == 0) {
					//移除本地token
					this.$store.commit('user/REMOVE_TOKEN');
					//重置用户信息
					this.$store.commit('user/SET_USER_INFO', {});
					//清空购物车
					this.$store.commit('mall/UPDATE_CART_NUMBER', 0);
				} else {
					let item = data[0];
					//切换到第一个
					this.$store.commit('user/SET_TOKEN', {
						token: item.token,
						tokenExpired: item.tokenExpired,
						userInfo: item,
					})
				}
				uni.hideLoading();
				// #ifdef MP
				uni.exitMiniProgram()
				return;
				// #endif
				this.navTimeBack(false, 100);
			},
			bindWeixinH5() {
				//是否需要解绑微信
				if (this.isBindWx) {
					return false;
				}
				if (this.customer.wx_auth) {
					window.location.href = this.customer.wx_auth;
				}
			},
			bindWeixin() {
				//是否需要解绑微信
				if (this.isBindWx) {
					return false;
				}
				uni.login({
					provider: "weixin",
					success: (loginRes) => {
						console.log('授权code', loginRes);
						this.$request('user/info/bind_weixin', {
							...loginRes
						}, {
							loading: true
						}).then(res => {
							//设置成功,刷新用户信息
							console.log("bind_weixin", res)
							//刷新用户信息
							this.$store.dispatch('user/getUserInfo');
						});
					}
				});
			},
			bind(provider) {
				console.log("bind " + provider)
				uni.login({
					provider: provider,
					success: (loginRes) => {
						console.log('授权code', loginRes);
						this.$request('user/info/bind', {
							provider: provider,
							...loginRes
						}, {
							loading: true
						}).then(res => {
							//设置成功,刷新用户信息
							console.log("bind " + provider, res)
							//刷新用户信息
							this.$store.dispatch('user/getUserInfo');
						});
					},
					fail: (e) => {
						console.log(e)
						this.$message("授权失败")
					}
				});
			},
			changeNickname() {
				this.$refs.nicknamePopup.open()
			},
			confirmEditNickname(value) {
				this.editData({
					nickname: value
				})
			},
			changeAvatar() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					crop: {
						quality: 5,
						width: 200,
						height: 200
					},
					success: (res) => {
						if (res.tempFilePaths.length > 0) {
							uni.setStorage({
								key: 'avatar',
								data: res.tempFilePaths[0]
							});
							//#ifndef APP-PLUS
							uni.navigateTo({
								url: '/pages/user/avatar'
							});
							//#endif
							//#ifdef APP-PLUS
							//上传文件并保存
							cloudUploadFile(res.tempFilePaths[0]).then(url => {
								console.log("url", url)
								try {
									this.editData({
										avatar: url
									})
								} catch (e) {
									console.log("getOpenerEventChannel fail", e)
								}
								this.$success('修改成功');
							}, err => {
								this.isSubmit = false;
								uni.showModal({
									title: '修改失败',
									showCancel: false
								});
							})
							//#endif
						}
					}
				});
			},
			editData(data) {
				console.log("editData", data)
				this.$request("user/info/edit", data, {
					loading: true
				}).then(res => {
					//设置成功,刷新用户信息
					this.$store.dispatch('user/getUserInfo');
				})
				/* for (let key in data) {
					this.$set(this.info, key, data[key])
				} */
			}
		}
	}
</script>

<style lang="scss">

</style>
