<template>
	<view class="cart-goods-list-container">
		<view class="cart-goods-list">
			<view v-for="(item,index) in dataList" :key="index" class="goods">
				<image :src="item.goods_thumb" mode="aspectFill" class="image-width-168 goods-image"></image>
				<view class="goods-content">
					<view class="title">
						<text>{{item.name}}</text>
					</view>
					<view>
						<text class="sub-title" v-if="item.sku_name">{{item.sku_name}}</text>
						<text class="sub-title colorRed margin-left-10" v-if="item.subTitle">{{item.subTitle}}</text>
					</view>
					<view class="ti-flex">
						<view class="flex-1">

						</view>
						<button type="primary" size="mini" @click="comment(item)">去评价</button>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :safe-area="false">
			<view class="bg-white border-radius">
				<view class="header text-center padding-22 font-32">
					<text>添加评论</text>
				</view>
				<view class="content padding-22">
					<view class="ti-flex">
						<text>商品评价</text>
						<uni-rate v-model="formData.rate" class="margin-left-18" @change="changeRate"></uni-rate>
						<text class="margin-left-18">{{rateString}}</text>
					</view>
					<view class="margin-top-18">
						<uni-easyinput v-model="formData.comment" type="textarea" placeholder="请输入您的评价" />
					</view>
					<view class="btns ti-flex margin-top-18">
						<button type="default" class="flex-1" @click="cancel">取消</button>
						<button type="primary" class="flex-1 margin-left-20" @click="submit">确定提交</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				dataList: [],
				formData: {
					rate: 5,
					comment: ""
				},
				rateResult: ["很差劲", "还好了", "一般般", "很好", "非常好"]
			};
		},
		onLoad() {
			this.loadData()
			if (this.$store.state.app.customer.commentLevel) {
				this.rateResult = this.$store.state.app.customer.commentLevel;
			}
		},
		computed: {
			rateString() {
				return this.rateResult[this.formData.rate - 1]
			}
		},
		methods: {
			changeRate(e) {
				console.log("changeRate", e)
			},
			loadData() {
				db.collection("tian-mall-orders").where('user_id==$cloudEnv_uid && is_delete==0 && state==3').orderBy(
					"create_time desc").field("goods,shop").get().then(({
					result
				}) => {
					console.log(result)
					this.dataList = [];
					result.data.map(e => {
						if (e.goods) {
							e.goods.forEach(g => {
								g.order_id = e._id;
							})
							this.dataList = this.dataList.concat(e.goods.filter(g => !g.comment))
						}
					})
				});
			},
			comment(item) {
				this.formData = {
					rate: 5,
					comment: "",
					goods_id: item.goods_id,
					sku_id: item.sku_id,
					id: item.order_id,
				}
				this.$refs.popup.open()
			},
			cancel() {
				this.$refs.popup.close()
			},
			submit() {
				//内容不能为空
				if (!this.formData.comment) {
					this.$message("请输入评价内容")
					return
				}
				this.$request("mall/order/comment", this.formData).then(data => {
					this.$success("评论成功")
					this.loadData()
				})
				this.cancel()
			},
		}
	}
</script>


<style lang="scss">
	page {
		height: 100%;
	}

	.cart-goods-list-container {
		height: 100%;

		.cart-options {
			position: fixed;
			bottom: var(--window-bottom);
			left: 0;
			right: 0;
			background: $uni-bg-color;
			display: flex;
			align-items: center;
			padding: $uni-spacing-row-base;
		}
	}

	.cart-goods-list {
		padding: 10rpx 26rpx 10rpx 16rpx;
		padding-bottom: calc(var(--window-bottom) + 120rpx);

		.goods {
			margin-top: 14rpx;
			background: $uni-bg-color;
			padding: 20rpx 12rpx 14rpx;
			display: flex;
			align-items: center;
			border-radius: $uni-border-radius-base;
		}

		.goods-image {
			display: inline-block;
			width: 138rpx;
			height: 138rpx;
			border-radius: 12rpx;
			margin-left: 22rpx;
		}

		.goods-content {
			flex: 1;
			margin-left: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.title {
			font-size: 28rpx;
		}

		.sub-title {
			font-size: 20rpx;
			padding: 6rpx 12rpx;
			border-radius: 6rpx;
			margin-top: 12rpx;
			background: $uni-bg-color-grey;
			display: inline-block;
		}
	}
</style>
