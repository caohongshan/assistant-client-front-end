<template>
	<view class="">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,hasMore}" collection="uni-id-scores"
			@load="loadData" field="score,type,balance,comment,create_date" where="user_id==$cloudEnv_uid"
			orderby="create_date desc">
			<tian-empty v-if="!loading && data.length == 0" text="暂无数据" marginTop="300"></tian-empty>
			<view class="goods-list " v-else>
				<view v-for="(item,index) in data" :key="index" class="under-line goods bg-white ">
					<view class="goods-content">
						<view class="title ti-flex">
							<text>{{item.comment}}</text>
							<view class="flex-1">

							</view>
							<text class="jifen" :class="{xiaofei:item.type==2}">{{item.score}}</text>
						</view>
						<view class="ti-flex font-24 colorGray margin-top-12">
							<uni-dateformat class="font-20" :date="item.create_date" format="yyyy/MM/dd hh:mm"
								:threshold="[60000, 3600000]"></uni-dateformat>
							<view class="flex-1">

							</view>
							<text class="">剩余:{{item.balance}}</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more v-if="loading || hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')">
			</uni-load-more>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onReachBottom() {
			this.$refs.udb.loadMore();
		},
		methods: {
			loadData(data) {
				data.forEach(item => {
					item.score = item.score.toFixed(2)
					item.balance = item.balance.toFixed(2)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.goods-list {
		height: 100%;

		.goods {
			padding: 20rpx;
			display: flex;
		}

		.goods-image {
			display: inline-block;
			width: 168rpx;
			height: 168rpx;
			border-radius: 12rpx;
		}

		.goods-content {
			flex: 1;
			margin-left: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.jifen {
			font-size: 32rpx;
			color: $uni-color-success;

			&.xiaofei {
				color: $uni-red;
			}
		}

		.title {
			font-size: 28rpx;
		}
	}
</style>
