<template>
	<view class="">
		<view class="tab-header">
			<view class="ti-flex">
				<view v-for="(item,index) in tabList" :key="index" class="tabs flex-1 text-center"
					@click="changeTab(item)" :class="{current:item.checked}">
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<view class="tab-header-seize" />
		<view>
			无限了时间失效时间: {{validDate}}
		</view>
		<view ref="udb">
			<tian-empty v-if="!loading && data.length == 0" text="暂时还没有订单" marginTop="300" />
			<view class="padding-lr-20 " v-else>
				<view v-for="(item,index) in data" :key="index" class=" bg-white border-radius margin-top-22">
					<view class=" padding-22">
						<view class="ti-flex between">
							<tian-icons type="xiangyou1" v-if="customer.isMultiShop" align="left"
								@click="navTo('/pages/product/shop?id='+item.shop._id,item.shop)">
								<text>{{item.shop.name}}</text>
							</tian-icons>
							<uni-dateformat v-else :date="item.create_time" format="yyyy-MM-dd hh:mm" />
							<text :style="{color: item.state.color}">{{item.state.text}}</text>
						</view>
						<view @click="navTo('/pages/order/detail?id='+item._id, item)">
							<view v-for="(goods,index2) in item.goods" :key="index2" class="ti-flex margin-top-22 item">
								<image :src="goods.goods_thumb" mode="aspectFill" class="image border-radius" />
								<view class="flex-1 padding-left-12">
									<view class="text-2">
										<text>{{goods.name}}</text>
									</view>
									<view class="colorGray margin-top-12" v-if="goods.sku_name">
										<text class="font-24">颜色分类：{{goods.sku_name}}</text>
									</view>
								</view>
								<view class="text-right margin-left-20">
									<view class="">
										<text class="price font-32">{{goods.price/100}}</text>
										<text v-if="goods.use_score"
											class="font-20">+{{goods.use_score}}{{scoreName}}</text>
									</view>
									<text class="colorGray">x{{goods.amount}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-if="item.pickUpCode">
						<view class="ti-flex font-32 padding-lr-24 padding-top-10">
							<text class="flex-1">账号</text>
							<text class="flex-1">密码</text>
						</view>
						<view class="ti-flex font-32 padding-lr-24 padding-top-10 colorRed"
							v-for="(puc,index2) in item.pickUpCode" :key="index2">
							<text class="flex-1">{{puc.account}}</text>
							<text class="flex-1">{{puc.password}}</text>
							<text v-if="puc.isUse">已使用</text>
							<text v-else class="colorGreen">未使用</text>
						</view>
					</view>
					<view class="padding-lr-22 padding-bottom-12">
						<view class="margin-top-12" v-if="item.hasMoreGoods">
							<button type="primary" size="mini" @click="showMore(item,1)"
								v-if="item.showGoodsType==0">更多商品</button>
							<button type="default" size="mini" @click="showMore(item,0)"
								v-if="item.showGoodsType==1">收起商品</button>
						</view>
						<view class="font-24 text-right margin-top-12 total">
							<text>共{{item.cart_count}}件商品，合计：</text>
							<text class="price margin-right-0">{{item.total_fee/100}}</text>
							<block v-if="item.discount>0">
								<text>，优惠</text>
								<text class="price discount margin-right-0">{{item.discount/100}}</text>
							</block>
						</view>
						<view class="font-24 text-right margin-top-12 colorBlue" v-if="item.delivers">
							<view v-for="(deli,index2) in item.delivers" :key="index2" v-if="deli.company">
								<text>{{deli.company}}：</text>
								<text>{{deli.number}}</text>
							</view>
						</view>
					</view>
					<view class="under-line margin-top-10">

					</view>
					<view class="font-24 text-right padding-22">
						<button type="default" v-if="item.canCancel" size="mini" class="margin-right-16"
							@click="cancelOrder(item)">取消订单</button>
						<button type="default" size="mini" v-if="item.state.value == -1"
							@click="deleteOrder(item)">删除订单</button>
						<block v-if="item.state == 0">
							<button type="primary" size="mini" @click="payOrder(item)">去支付</button>
						</block>
						<block v-if="item.state == 2">
							<button type="primary" size="mini" @click="finishOrder(item)">确定收货</button>
						</block>
					</view>
				</view>
			</view>
			<uni-load-more v-if="loading || hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')" />
		</view>
		<tian-payment :value="order" ref="payment" @success="paymentSuccess" :confirm="false" />	
	</view>
</template>

<script>
	import { userInfo } from 'os';
	import { isNumber } from 'util';
	import { mapState } from "vuex";
	import user from '../../store/modules/user';
	
	export default {
		data() {
			return {
				_id: "",
				maxGoodsLength: 3,
				type: "all",
				where: "user_id==$cloudEnv_uid && is_delete==0",
				order: {},
				tabList: [],
				options: {},
				data: {},
				loading: false,
				hasMore: false,
				validDate: '暂无使用时长'
			};
		},
		onLoad(e) {
			this.type = e.type
			if (e.id) {
				this._id = e.id
			}
			this.initTabs();
			this.buildCondition();
		},
		onReady() {
			//只执行一次
			uni.$once("autoPayOrder", (item) => {
				this.payOrder(item)
			})
		},
		// 页面生命周期，下拉刷新后触发
		onPullDownRefresh() {
			this.loadData({ clear: true }, () => {
				// 停止下拉刷新
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			// this.loadMore();
		},
		computed: {
			...mapState("user", ['userInfo']),
			customer() {
				if (this.$store.state.app.customer) {
					return this.$store.state.app.customer
				}
				return {}
			},
			scoreName() {
				return this.$store.state.app.customer.scoreName;
			}
		},
		methods: {
			async loadData() {
				if(this.userInfo.period) {
					const _date = new Date(this.userInfo.period)
					let Y = _date.getFullYear(),
						m = _date.getMonth() + 1,
						d = _date.getDate(),
						H = _date.getHours(),
						i = _date.getMinutes(),
						s = _date.getSeconds();
					
					this.validDate = `${Y}-${m}-${d} ${H}:${i}:${s}`
				}
				let paymentOrder = false;
				const params = isNumber(this.where) ? { state : this.where } : {}
				const data = await this.$request("mall/order/orderList", params);
				data.forEach(item => {
					if (item.goods) {
						item.goods.forEach(goods => {
							goods.goods_thumb = this.$thumbImg(goods.goods_thumb, '120x120')
						})
						item.hasMoreGoods = false;
						if (item.goods.length > 3) {
							item.origin_goods = item.goods;
							item.goods = item.goods.filter((e, index) => index < this.maxGoodsLength);
							item.hasMoreGoods = true;
							item.showGoodsType = 0;
						}
					}
					if (item._id == this._id) {
						paymentOrder = item;
					}
				})
				if (paymentOrder) {
					setTimeout(() => {
						uni.$emit("autoPayOrder", paymentOrder)
					}, 1000)
				}
				this.data = data;
			},
			showMore(item, type) {
				if (type) {
					item.goods = item.origin_goods
				} else {
					item.goods = item.goods.filter((e, index) => index < this.maxGoodsLength);
				}
				item.showGoodsType = type;
			},
			buildCondition() {
				// let base = "user_id==$cloudEnv_uid && is_delete==0";
				let tab = this.tabList.filter(e => e.type == this.type);
				if (tab && tab.length > 0) {
					// base += " &&" + tab[0].condition;
					this.where = tab[0].condition;
				}
				// this.where = base;
				this.loadData()
			},
			changeTab(item) {
				this.type = item.type;
				this.tabList.forEach(e => {
					e.checked = e.type == item.type;
				})
				this.buildCondition();
			},
			initTabs() {
				let tabs = [{
					type: "all",
					text: "全部",
					condition: "",
				}, {
					type: "unpay",
					text: "待付款",
					condition: 0,
				}, {
					type: "undelivery",
					text: "待发货",
					condition: 1,
				}, {
					type: "unreceived",
					text: "待收货",
					condition: 2,
				}, {
					type: "finish",
					text: "已完成",
					condition: 3,
				}];
				this.tabList = tabs.map(e => {
					e.checked = e.type == this.type;
					return e;
				})
			},
			payOrder(item) {
				item.module = "mall";
				this.order = item;
				this.$refs.payment.open();
			},
			finishOrder(item) {
				this.confirmAction(() => {
					this.$request("mall/order/finish", {
						id: item._id
					}, {
						loading: true
					}).then(res => {
						this.$success("订单收货成功")
						this.reLoadData()
					})
				}, "是否确定收到货物？否则钱财两空。")
			},
			deleteOrder(item) {
				this.$refs.udb.remove(item._id, {
					action: "backup",
					success: (res) => { // 更新成功后的回调
						this.$success("订单删除成功")
						this.reLoadData()
					}
				})
			},
			cancelOrder(item) {
				this.confirmAction(() => {
					//取消订单，并返回上一页
					this.$request('payment/cancel', {
						id: item._id,
						module: "mall"
					}).then(res => {
						this.$message('取消成功');
						this.reLoadData()
					});
				}, "是否确定取消订单？")

			},
			paymentSuccess(item) {
				console.log("支付成功，刷新列表")
				this.loadData({ clear: true })
			},
			reLoadData() {
				setTimeout(() => {
					this.loadData({ clear: true })
				}, 2000)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.tab-header {
		background: $uni-bg-color;
		padding: $uni-spacing-row-base 10rpx 10rpx;
		position: fixed;
		top: var(--window-top);
		left: 0;
		right: 0;
		z-index: 9;

		.tabs {
			padding-bottom: 12rpx;
			font-size: 30rpx;
			position: relative;
			margin-left: 12rpx;
			align-self: baseline;
			overflow: visible;
			white-space: nowrap;
		}

		.current {
			color: $uni-red;
			font-weight: 600;
			position: relative;

			&::after {
				content: " ";
				border-bottom: 4rpx solid $uni-red;
				position: absolute;
				left: 50%;
				right: 4rpx;
				bottom: 0;
				width: 60rpx;
				margin-left: -30rpx;
			}
		}
	}

	.item {
		.image {
			background: #F1C3BF;
			width: 120rpx;
			height: 120rpx;
		}

		.price {
			color: #000;
		}
	}

	.total {
		color: #333;
		font-size: 24rpx;

		.price {
			font-size: 24rpx;
			color: #333;
		}

		.discount {
			color: #919191;
		}
	}

	.tab-header-seize {
		height: 80rpx;
	}
</style>
