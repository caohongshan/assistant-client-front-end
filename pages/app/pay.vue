<template>
	<view class="pay-container" :style="bgStyle">
		<view class="padding-20">
			<view class=" ti-flex ">
				<view class="flex-1">

				</view>
				<image v-if="order.src" :src="order.src" mode="aspectFill" class="image-width-100 border-radius">
				</image>
				<view class="flex-1">

				</view>
			</view>
			<view class="text-center font-20 colorGray margin-top-8" v-if="order.body">
				<text>{{order.body}}</text>
			</view>
		</view>
		<view class="">
			<view class="ti-flex font-38 " style="padding: 30rpx 20rpx;font-weight: 500;">
				<text class="padding-left-10">付款金额</text>
				<view class="flex-1 text-right">
					<text>{{showMoney}}</text>
				</view>
				<text class="margin-left-10 guangbiao" :class="{active:active}">|</text>
				<text class="margin-left-10">元</text>
			</view>
			<!-- <view class=" font-30 padding-20  colorGray">
				<text class="padding-left-10">备注</text>
				<uni-easyinput @focus="focus" @blur="blur" v-model="formData.remarks" :inputBorder="false"
					placeholder="备注信息，15个字符以内" />
			</view> -->
			<!-- <view class="ti-flex font-32" style="padding: 30rpx 20rpx;">
				<view class="flex-1">

				</view>
				<text class="">实付金额</text>
				<text class="colorRed margin-left-10 margin-right-10">{{payMoney}}</text>
				<text>元</text>
			</view> -->
		</view>
		<view class="jianpan text-center" v-if="showKeyboard">
			<view class="under-line">

			</view>
			<view class="ti-flex under-line">
				<button type="default" class="flex-1 unbutton" @click="btn(1)">1</button>
				<view class="flex-1 left-line">
					<button type="default" class=" unbutton " @click="btn(2)">2</button>
				</view>
				<view class="flex-1 left-line">
					<button type="default" class=" unbutton " @click="btn(3)">3</button>
				</view>
				<view class="flex-1 left-line" @click="del()">
					<image src="/static/del.jpg" mode="aspectFill" style="width: 70rpx;height: 50rpx;"></image>
				</view>
			</view>
			<view class="ti-flex" style="align-items: inherit;">
				<view class="flex-3">
					<view class="ti-flex under-line ">
						<button type="default" class="flex-1 unbutton" @click="btn(4)">4</button>
						<view class="flex-1 left-line">
							<button type="default" class=" unbutton " @click="btn(5)">5</button>
						</view>
						<view class="flex-1 left-line">
							<button type="default" class=" unbutton " @click="btn(6)">6</button>
						</view>
					</view>
					<view class="ti-flex under-line">
						<button type="default" class="flex-1 unbutton" @click="btn(7)">7</button>
						<view class="flex-1 left-line">
							<button type="default" class=" unbutton " @click="btn(8)">8</button>
						</view>
						<view class="flex-1 left-line">
							<button type="default" class=" unbutton " @click="btn(9)">9</button>
						</view>
					</view>
					<view class="ti-flex">
						<button type="default" class="flex-2 unbutton" @click="btn('0')">0</button>
						<view class="flex-1 left-line">
							<button type="default" class=" unbutton " @click="btn('.',1)">.</button>
						</view>
					</view>
				</view>
				<view class="flex-1" style="background: #26a2f8;">
					<view class="">
						<button type="default" class=" unbutton " style="color: rgb(255, 255, 255);line-height: 172px;"
							@click="paymentProcess">支付</button>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import {
		getQueryString
	} from '@/common/js/util.js'
	const db = uniCloud.database();
	export default {
		data() {
			return {
				query: {},
				active: false,
				showKeyboard: false,
				chars: [],
				decimals: 2,
				maxLength: 8,
				dot: ".",
				formData: {
					remarks: ""
				},
				type: "",
				id: "61c9ae37b804f80001267d23",
				order: {}
			};
		},
		onLoad(e) {
			if (e.q) {
				let url = decodeURIComponent(e.q);
				Object.assign(e, {
					...getQueryString(url),
					q: url
				});
			}
			if (e.id) {
				this.id = e.id;
			} else {
				e.id = this.id;
			}
			if (!e.module) {
				e.module = "shopqr"
			}
			console.log("onLoad", e)
			this.query = e;
			this.loadData(e)
			this.setGuangbiao();
			//#ifdef MP
			uni.hideHomeButton()
			//#endif
		},
		computed: {
			showMoney() {
				return this.chars.join("")
			},
			payMoney() {
				let moneyStr = 0
				if (this.chars.length != 0) {
					if (this.chars.indexOf(this.dot) == -1) {
						//没有小数
						moneyStr = parseInt(this.chars.join(""))
					} else {
						if (this.chars[0] == this.dot) {
							//小数点开头
							moneyStr = parseFloat("0" + this.chars.filter((e, index) => index <= this.decimals).join(""))
						} else {
							//小数点在中间
							moneyStr = parseFloat(this.chars.join(""))
						}
					}
				}
				return moneyStr.toFixed(this.decimals)
			},
			bgStyle() {
				if (this.order.background) {
					return `background: url(${this.order.background});background-size: 100%;background-repeat: no-repeat;`
				}
				return "background:#ffffff"
			}
		},
		methods: {
			focus() {
				this.showKeyboard = false
			},
			blur() {
				this.showKeyboard = true
			},
			del() {
				//减少字符
				if (this.chars.length > 0) {
					this.chars.pop()
				}
			},
			btn(number, check) {
				if (!check) {
					let dotIndex = this.chars.indexOf(this.dot);
					if (dotIndex == -1 && this.chars.length >= this.maxLength) {
						//没有小数
						return;
					} else
					if (dotIndex == 0) {
						dotIndex == 1;
					} else if (dotIndex > this.maxLength) {
						//带小数的超过总位数
						return;
					}
					//普通数字，保留2位小数
					if (this.chars.indexOf(this.dot) == -1 || this.chars.length - dotIndex <= this
						.decimals) {
						//判断位数是否超过
						this.chars.push(number)
					}
				} else if (this.chars.indexOf(number) == -1) {
					//没有小数点，直接添加
					this.chars.push(number)
				}
				// console.log("this.chars", this.chars)
			},
			loadData(data) {
				this.$request('payment/info', data).then(res => {
					console.log(res)
					this.order = res.order;
					this.showKeyboard = true
				})
				uni.getProvider({
					service: "payment",
					success: (res) => {
						//这里返回支付宝或者微信
						this.type = res.provider[0];
						console.log("this.type", this.type)
					}
				})
			},
			setGuangbiao() {
				this.active = true;
				setTimeout(() => {
					this.active = false;
					setTimeout(() => {
						this.setGuangbiao()
					}, 1000)
				}, 1000)
			},
			paymentProcess() {
				if (!this.type) {
					return;
				}
				uni.showLoading({
					title: '支付中',
					mask: true
				});
				this.$request('payment/pay', {
					money: this.payMoney,
					type: this.type,
					...this.formData,
					...this.query,
					...this.order
				}).then(res => {
					uni.hideLoading();
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
					this.payFailed();
				});
			},
			//支付成功
			paySuccess(e) {
				console.log('支付成功', e);
				this.$success('支付成功');
				setTimeout(() => {
					uni.redirectTo({
						url: `/pages/app/paysuccess?id=${this.order.id}`
					})
				}, 2000)
			},
			//支付失败，可以另外选择支付方式
			payFailed() {
				this.$message('支付失败');
				this.loadData(this.query)
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pay-container {
		height: 100%;
	}

	.jianpan {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		font-size: 36rpx;
		line-height: 3.2;
		font-weight: 500;

		.unbutton {
			line-height: 3.2;
			border-radius: 0;
			background: none;
		}

	}

	.guangbiao {
		transition: 0.5s;
		color: #000000;

		&.active {
			color: #C0C0C0;
		}
	}
</style>
