<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList"
			where="user_id==$cloudEnv_uid" orderby="id desc" action="refund"
			field="create_time,update_time,operater_log,id,order_id,type,reason,goods_status,shop_id,shop,describe,imgs,money,platform,state,user_id,goods">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data" class="padding-22">
				<view v-for="(item,index) in data" :key="index"
					class="bg-white margin-bottom-20 padding-22 border-radius">
					<view class="">
						<text>编号</text>
						<text class="font-32">{{item.id}}</text>
					</view>
					<view class="shop ti-flex margin-top-12">
						<image :src="item.shop.src" mode="aspectFill" class="image-width-46 border-radius">
						</image>
						<text class="flex-1 margin-left-12">{{item.shop.name}}</text>
						<text>{{item.state_text}}</text>
					</view>
					<view class="goods ti-flex margin-top-12">
						<image :src="item.goods.goods_thumb" mode="aspectFill" class="image-width-120 border-radius">
						</image>
						<view class="flex-1 font-24 margin-left-16">
							<view class="">
								<text>{{item.goods.name}}</text>
							</view>
							<view class="colorGray">
								<text>规格：{{item.goods.sku_name}}</text>
							</view>
							<view class="">
								<text>{{item.type_text}}：</text>
								<text class="price">{{item.money/100}}</text>
							</view>
						</view>
					</view>
					<view class="" v-if="item.address">
						<view class="margin-top-12">
							<text>商家邮寄地址：</text>
						</view>
						<view class="font-24 colorRed">
							<view class="">
								<text selectable>收件人：{{item.address.name}}</text>
							</view>
							<view class="">
								<text selectable>电话：{{item.address.phone}}</text>
							</view>
							<view class="">
								<text selectable>地址：{{item.address.address}}</text>
							</view>
							<view class="margin-top-12">
								<text>寄回的商品内请备注：售后编号({{item.id}})、购买账号信息。否则无法处理货款</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				collectionList: "tian-mall-order-refunds",
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				}
			}
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
		}
	}
</script>

<style>
</style>
