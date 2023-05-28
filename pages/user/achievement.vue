<template>
	<view class="container">
		<view class="tab-header ti-flex text-center bg-white">
			<view class="item flex-1 padding-12" :class="{current:current==0}" @click="changeTab(0)">
				<text>未结算</text>
				<!-- <text class="price font-20">52.5</text> -->
			</view>
			<view class="left-line">
				<text> </text>
			</view>
			<view class="item flex-1 padding-12 " :class="{current:current==1}" @click="changeTab(1)">
				<text>已结算</text>
				<!-- <text class="price font-20">52.5</text> -->
			</view>
			<view class="left-line">
				<text> </text>
			</view>
			<view class="item flex-1 padding-12 " :class="{current:current==2}" @click="changeTab(2)">
				<text>结算失败</text>
				<!-- <text class="price font-20">52.5</text> -->
			</view>
		</view>
		<view class="tab-empty">

		</view>
<!-- 		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,hasMore}" collection="tian-mall-orders"
			action="check_order" @load="loadData"
			field="state,goods,discount,freight,delivers,total_fee,cart_count,userInfo,rebates,group_buying,rebate_state,rebate_last_time,rebate_process_time,create_time,inviters"
			:where="where" :options="options" orderby="create_time desc"> -->
			<tian-empty v-if="!loading && list.length == 0" text="暂时还没有订单" marginTop="300" />
			<view class="padding-lr-20 " v-else>
				<view v-for="(item,index) in list" :key="index" class="bg-white border-radius margin-top-22">
					<tian-single-user :size="60" :value="item.userInfo" class="under-line padding-22">
						<view class="font-20">
							<view v-if="item.inviter.money">
								<text>佣金：</text>
								<text class="price font-26">{{item.inviter.money/100}}</text>
							</view>
							<view v-if="item.inviter.score">
								<text class="">{{scoreName}}：</text>
								<text class="font-26">{{item.inviter.score.toFixed(2)}}</text>
							</view>
							<view class="" v-if="item.inviter.title">
								<text>{{item.inviter.title}}</text>
							</view>
						</view>
					</tian-single-user>
					<view class="padding-22">
						<view class="ti-flex between">
							<uni-dateformat class="font-20" :date="item.create_time" format="yyyy/MM/dd hh:mm:ss"
								:threshold="[0, 0]" />
							<text :style="{color: item.state.color}">{{item.state.text}}</text>
						</view>
						<view v-for="(goods,index2) in item.goods" :key="index2" class="ti-flex margin-top-12">
							<image :src="goods.goods_thumb" mode="aspectFill" class="image-width-120 border-radius" />
							<view class="flex-1 padding-left-12">
								<view class="">
									<text>{{goods.name}}</text>
								</view>
								<view class="">
									<text class="font-24">{{goods.sku_name}}</text>
								</view>
								<view class="ti-flex between">
									<view class="">
										<text class="price">{{goods.price/100}}</text>
										<text v-if="goods.use_score"
											class="font-20">+{{goods.use_score}}{{scoreName}}</text>
									</view>
									<text class="">x{{goods.amount}}</text>
								</view>
							</view>
						</view>
						<view class="margin-top-12" v-if="item.hasMoreGoods">
							<button type="primary" size="mini" @click="showMore(item,1)"
								v-if="item.showGoodsType==0">更多商品</button>
							<button type="default" size="mini" @click="showMore(item,0)"
								v-if="item.showGoodsType==1">收起商品</button>
						</view>
						<view class="font-24 text-right margin-top-12">
							<text>共{{item.cart_count}}件商品，总金额</text>
							<text class="price font-32 margin-right-0">{{item.total_fee/100}}</text>
						</view>
						<view class="font-24 text-right margin-top-12" v-if="item.inviter">
							<view class="margin-top-12" v-if="item.rebate_state ==1">
								<text class="colorGray">预计到账：</text>
								<uni-dateformat class="font-20 colorGray" :date="item.rebate_last_time"
									format="yyyy/MM/dd" :threshold="[0, 0]" />
							</view>
							<view class="margin-top-12" v-if="item.rebate_state ==2">
								<text class="colorGray">到账时间：</text>
								<uni-dateformat class="font-20 colorGray" :date="item.rebate_process_time"
									format="yyyy/MM/dd hh:mm" :threshold="[0, 0]" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more v-if="loading || hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')" />
		<!-- </unicloud-db> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxGoodsLength: 3,
				current: 0,
				options: {},
				list: [],
				loading: false,
				hasMore: false
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			},
			where() {
				const params = {}
				let condition = ['rebates.id==$cloudEnv_uid']
				if (this.current == 1) {
					condition.push('rebate_state==2')
					params.rebate_state = 2;
				} else if (this.current == 2) {
					params.rebate_state = { $lt: 2 };
					params.state = { $lt: 0 };
					
					condition.push('rebate_state<2')
					condition.push('state<0')
				} else {
					params.rebate_state = { $lt: 2 };
					params.state = { $gt: 0 };					
					
					condition.push('rebate_state<2')
					condition.push('state>0')
				}
				// return condition.join(" && ")
				return params
			},
			scoreName() {
				if (this.$store.state.app.customer.scoreName) {
					return this.$store.state.app.customer.scoreName;
				}
				return "积分";
			}
		},
		async onLoad() {
			await this.loadData();
		},
		methods: {
			async loadData() {
				// const res = await this.$request('app/clientDB',{ collectionName: 'tian-mall-orders' })
				
				const res = await this.$request('mall/order/performance', { where: this.where })
				
				res.forEach(item => {
					item.inviter = {
						money: 0,
						score: 0,
						title: ""
					}
					if (item.rebates) {
						//可能出现多条，累加后，才是最后的返利，在确定收货后处理返利，也需要累加用户积分和金额
						item.rebates.filter(e => e.id == this.userInfo._id).map(e => {
							item.inviter.money += e.money;
							item.inviter.score += e.score;
							if (e.title) {
								item.inviter.title += (item.inviter.title ? "，" : "") + e.title;
							}
						});
					}
					if (item.goods) {
						item.goods.forEach(goods => {
							goods.goods_thumb = this.$thumbImg(goods.goods_thumb, '168x168')
						})
						item.hasMoreGoods = false;
						if (item.goods.length > 3) {
							item.origin_goods = item.goods;
							item.goods = item.goods.filter((e, index) => index < this.maxGoodsLength);
							item.hasMoreGoods = true;
							item.showGoodsType = 0;
						}
					}
				})
				this.list = res;
			},
			showMore(item, type) {
				if (type) {
					item.goods = item.origin_goods
				} else {
					item.goods = item.goods.filter((e, index) => index < this.maxGoodsLength);
				}
				item.showGoodsType = type;
			},
			changeTab(index) {
				this.current = index;
				this.loadData();
			}
		}
	}
</script>

<style lang="scss">
	.tab-header {
		position: fixed;
		width: 100%;
		height: 80rpx;
		top: var(--window-top);
		left: 0;
		z-index: 9999;

		.left-line {
			width: 5rpx;
			height: 60rpx;
		}

		.current {
			color: $uni-red;
			position: relative;

			&:after {
				content: " ";
				position: absolute;
				left: 50%;
				bottom: 0;
				height: 2rpx;
				width: 100rpx;
				border-bottom: 4rpx solid $uni-red;
				margin-left: -50rpx;
			}
		}
	}

	.tab-empty {
		height: 80rpx;
	}
</style>
