<template>
	<view class="payment-container">
		<uni-popup ref="payPopup" :animation="!0" :maskClick="false" type="bottom" @change="change" :safe-area="false">
			<view class="panel bg-white">
				<view class="text-center padding-40">
					<text>选择支付方式</text>
					<tian-icons type="guanbi2" size="24" class="icon-close" @click="close()" />
				</view>
				<view class="text-center">
					<text class="price font-40">{{order.total_fee/100}}</text>
				</view>
				<view class="" v-if="paymentList && paymentList.length>0">
					<view v-for="(item, index) in paymentList" :key="index" class="ti-flex padding-22 under-line "
						@click="choose(item)">
						<tian-icons :type="item.icon" :color="item.color" size="24" class="" />
						<view class="margin-left-20">
							<text>{{ item.name }}</text>
							<text class="font-24 colorInfo margin-left-10">{{ item.notice }}</text>
						</view>
					</view>
				</view>
				<view class="text-center padding-22" v-else-if="loaded">
					<text>无可用支付方式</text>
				</view>
				<view class="" v-else>
					<uni-load-more status="loading" />
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	/**
	 * 商品多规格
	 * @property {Boolean} confirm 是否二次确定
	 */
	export default {
		data() {
			return {
				balance: 0,
				type: '',
				order: {},
				loaded: false,
				paymentList: []
			};
		},
		props: {
			value: {
				type: Object,
				default: () => {
					return {};
				}
			},
			confirm: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			value(newVal) {
				console.log('watch value', newVal);
				this.order = newVal;
				this.loadData(newVal);
			}
		},
		methods: {
			loadData(data) {
				// if (!data._id) {
				// 	return;
				// }
				//查询支持的支付方式
				this.$request('payment/info', {
					...data,
					id: data._id,
					module: data.module
				}).then(res => {
					this.loaded = true;
					this.paymentList = res.paymentList;
					this.order = res.order;
					this.balance = res.balance || this.$store.state.user.userInfo.balance;
					//如果订单金额是0而且存在余额支付，则默认余额支付，
					if (this.order.total_fee == 0 && this.paymentList.filter(e => e.key == "balance").length > 0) {
						this.type = "balance";
						this.paymentProcess();
					}
				});
			},
			choose(item) {
				let beforeMethod = `${item.key}BeforePayment`;
				this.type = item.key;
				if (item.confirm) {
					uni.showModal({
						content: `确定使用${item.name}吗？`,
						success: res => {
							if (res.confirm) {
								//调用支付方式
								if (!this[beforeMethod] || this[beforeMethod]()) {
									this.paymentProcess();
								}
							}
						}
					});
					return;
				}
				//调用支付方式
				if (!this[beforeMethod] || this[beforeMethod]()) {
					this.paymentProcess();
				}
			},
			balanceBeforePayment() {
				//判断余额是否足够
				if (this.order.total_fee > this.balance) {
					this.$message('余额不足,请联系管理员重装,wx:itbang6');
					return false;
				}
				return true;
			},
			paymentProcess() {
				uni.showLoading({
					title: '支付中',
					mask: true
				});
							
				this.$request('payment/pay', {
					...this.order,
					// user_id: this.$store.state,
					id: this.order.id,
					module: this.order.module,
					type: this.type
				}).then(res => {
					uni.hideLoading();
					//支付成功了
					if (res.transaction_id) {
						this.paySuccess();
						return;
					}
					//有可能返回的是跳转支付
					if (res.mweb_url) {
						//h5支付重定向到网址
						window.location.replace(res.mweb_url)
						return;
					}
					if (res.redirect_url) {
						//h5支付重定向到网址
						window.location.replace(res.redirect_url)
						return;
					}
					uni.requestPayment({
						// #ifdef APP-PLUS
						provider: this.type, // App端此参数必填，可以通过uni.getProvider获取
						// #endif

						// #ifdef MP-WEIXIN
						...res,
						// #endif

						// #ifdef APP-PLUS || MP-ALIPAY
						orderInfo: res,
						// #endif

						//微信、支付宝订单数据
						success: res => {
							this.paySuccess();
						},
						fail: res => {
							this.payFailed();
						}
					});
				}, err => {
					// this.navTimeBack()
					this.$refs.payPopup.close();
				});
			},
			//支付成功
			paySuccess() {
				console.log('支付成功', this.confirm);
				this.$success('支付成功');
				//支付成功
				this.$emit('success', this.value);
				this.$refs.payPopup.close();
				//重定向订单详情页
				this.$emit("successed", this.order)
				
				//刷新用户信息
				this.$store.dispatch('user/getUserInfo');
									
				if (this.confirm) {
					this.navTimeBack()
				}
			},
			//支付失败，可以另外选择支付方式
			payFailed() {
				this.$message('支付失败');
			},
			close() {
				this.$refs.payPopup.close();
				if (this.confirm) {
					uni.showModal({
						content: '确定取消订单吗？',
						confirmText: '去意已决',
						cancelText: '我再想想',
						success: res => {
							if (res.confirm) {
								uni.showLoading({
									title: '正在取消订单',
									mask: true
								});
								//取消订单，并返回上一页
								this.$request('payment/cancel', {
									id: this.order.id,
									module: this.order.module
								}).then(res => {
									this.$message('取消成功');
									this.navTimeBack();
								});
							} else {
								this.$refs.payPopup.open();
							}
						}
					});
					return;
				}
				// console.log("close")
			},
			open() {
				this.$refs.payPopup.open();
			},
			change({ show }) {
				if (!show) {
					this.$emit('close');
				}
			}
		}
	};
</script>

<style lang="scss">
	.payment-container {
		.panel {
			background: #ffffff;
			border-radius: $uni-border-radius-lg $uni-border-radius-lg 0 0;
			padding: 0 0 120rpx;
			position: relative;
		}

		.colorInfo {
			color: $uni-red;
		}

		.icon-close {
			position: absolute;
			right: 30rpx;
		}
	}
</style>
