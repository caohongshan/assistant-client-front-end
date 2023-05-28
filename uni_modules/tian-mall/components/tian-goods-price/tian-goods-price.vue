<template>
	<view class="goods-price-container" :class="[size]">
		<view class="" v-if="item.is_vip">
			<view class="">
				<text class="price">{{item.price/100}}</text>
			</view>
			<view class="member" v-if="item.member">
				<text class="price small">{{item.member.price/100}}</text>
				<text class="name">{{item.member.name}}</text>
			</view>
		</view>
		<view class="ti-flex flex-1 miaosha"
			v-else-if="showMiaosha && item.miaosha && item.miaosha.is_show && item.miaosha.is_begin">
			<!-- 秒杀价格 -->
			<text class="price">{{item.price/100}}</text>
			<view class="flex-1">

			</view>
			<view class="ti-flex flex-column">
				<text class="font-bold">秒杀特价</text>
				<view class="font-20 margin-top-10">
					<text class="">还剩</text>
					<text class="margin-left-6" style="letter-spacing: 2rpx;">{{miaoshaTimeOut}}</text>
				</view>
			</view>
		</view>
		<view class="" v-else-if="showListMiaosha && item.miaosha">
			<!-- 秒杀普通价格 -->
			<view class="" v-if="item.use_score">
				<view class="">
					<text class="font-28">秒杀价:</text>
				</view>
				<view class="ti-flex">
					<text class="price">{{item.miaosha.price/100}}</text>
				</view>
			</view>
			<view class="" v-else>
				<text class="font-28">秒杀价:</text>
				<text class="price">{{item.miaosha.price/100}}</text>
			</view>
			<view class="delprice margin-top-6" v-if="item.miaosha.market_price > item.miaosha.price">
				<text class="font-24">原价:</text>
				<text class="price del">{{item.miaosha.market_price/100}}</text>
			</view>
		</view>
		<view class="" v-else>
			<!-- 普通价格 -->
			<text class="price">{{item.price/100}}</text>
			<text class="price del margin-left-10"
				v-if="item.market_price > item.price">{{item.market_price/100}}</text>
		</view>
		<!-- 商品详情页需要隐藏 -->
		<view class="font-24" style="flex: 1;" v-if="!showMiaosha">
			<view class="colorGray" v-if="hasSaleCount">
				<text>月销量 {{item.month_sell_count}}</text>
			</view>
		</view>
		<view class="btnCart" v-if="showListMiaosha" @click="openSku()">
			<text>加入购物车</text>
		</view>
		<tian-icons v-else-if="hasCart" type="jiahao2fill" color="#ed1d4a" @click="openSku()" size="26" />
		<uni-number-box v-else-if="hasAmount" :min="1" :max="99999" :step="1" v-model="amount" @change="changeAmount()" />
		<view class="" v-else-if="readAmount">
			<text>{{amount}}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * 商品价格
	 */
	export default {
		data() {
			return {
				timerId: null,
				miaoshaTimerId: null,
				miaoshaTimeOut: "",
				amount: 1,
				item: {}
			}
		},
		props: {
			value: {
				type: Object,
				default: () => {
					return {
						price: 0,
						market_price: 0,
						member: {},
					}
				}
			},
			hasCart: {
				type: Boolean,
				default: true
			},
			hasAmount: {
				type: Boolean,
				default: false
			},
			hasSaleCount: {
				type: Boolean,
				default: false
			},
			showMiaosha: {
				type: Boolean,
				default: false
			},
			showListMiaosha: {
				type: Boolean,
				default: false
			},
			readAmount: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				default: ""
			}
		},
		watch: {
			value(newVal) {
				// console.error("商品价格变动", newVal)
				this.buildPrice(newVal);
			}
		},
		computed: {
			scoreName() {
				return this.$store.state.app.customer.scoreName;
			}
		},
		created() {
			this.buildPrice(this.value);
		},
		beforeDestroy() {
			if (this.miaoshaTimerId) {
				clearTimeout(this.miaoshaTimerId)
			}
		},
		methods: {
			buildPrice(val) {
				this.item = {
					...val,
					// member: {}//默认member，在结算的时候，会有问题
				}
				this.amount = +this.item.amount;
				if (val.is_vip && val.member && val.member.rate) {
					this.item.member = {
						...val.member
					}
					//会员价
					this.item.member.price = parseInt(val.price * parseInt(val.member.rate * 100) / 100)
				}
				if (this.showMiaosha && val.miaosha && (!val.miaosha.sku_id || val.miaosha.sku_id == val.sku_id)) {
					//启动计时器
					this.item.miaosha.is_show = true;
					this.beginMiaoshaTimer()
				} else {
					if (this.showMiaosha && this.item.miaosha) {
						this.item.miaosha.is_show = false;
					}
					if (this.miaoshaTimerId) {
						clearTimeout(this.miaoshaTimerId)
					}
				}
			},
			beginMiaoshaTimer() {
				let miaoshaTimeOut = parseInt((this.item.miaosha.end_time - Date.now()) / 1000)
				if (!this.item.miaosha.is_begin) {
					miaoshaTimeOut = parseInt((this.item.miaosha.begin_time - Date.now()) / 1000)
				}
				if (miaoshaTimeOut < 1) {
					//刷新商品信息
					this.$emit("refresh", this.item)
					return;
				}
				//转化为时分秒
				// this.miaoshaTimeOut = parseInt((this.item.miaosha.end_time - Date.now()) / 1000)
				let hour = parseInt(miaoshaTimeOut / 3600)
				let minute = parseInt((miaoshaTimeOut - hour * 3600) / 60)
				let second = miaoshaTimeOut - hour * 3600 - minute * 60
				if (hour < 10) {
					hour = "0" + hour
				}
				if (minute < 10) {
					minute = "0" + minute
				}
				if (second < 10) {
					second = "0" + second
				}
				this.miaoshaTimeOut = [hour, minute, second].join(":")
				// console.log("计算秒杀")
				this.miaoshaTimerId = setTimeout(() => {
					this.beginMiaoshaTimer();
				}, 1000)
			},
			openSku() {
				//uni.$emit('openSku',this.item); 
				this.$emit("click")
			},
			changeAmount() {
				clearTimeout(this.timerId);
				this.timerId = setTimeout(() => {
					// console.log("amount", this.amount);
					this.$emit("change", {
						_id: this.item._id,
						amount: this.amount
					})
				}, 500)
			},
		}
	}
</script>

<style lang="scss">
	.goods-price-container {
		display: flex;
		align-items: center;
		line-height: 1.2;
		min-height: 62rpx;

		.member {
			.name {
				font-size: 18rpx;
				margin-right: 12rpx;
				background: #468d4e;
				color: #FFFFFF;
				padding: 0 12rpx;
				border-radius: 8rpx;
			}

			.price {
				color: #468d4e;
				font-size: 22rpx;
			}
		}

		&.big {
			.price {
				font-size: 38rpx;
			}

			.del {
				font-size: 20rpx;
			}
		}

		.miaosha {
			background: #ff0000;
			color: #fff;
			padding: 22rpx;
			border-radius: 22rpx 22rpx 0 0;

			.price {
				color: #fff;
			}
		}

		.delprice {
			text-decoration: line-through;
			color: #858585;
		}

		.btnCart {
			background: #ed1d4a;
			color: #fff;
			padding: 12rpx 30rpx;
			border-radius: 30rpx;
			font-size: 24rpx;
		}
	}
</style>
