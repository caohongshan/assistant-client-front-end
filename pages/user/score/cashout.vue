<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="balance" label="剩余">
				<view class="ti-flex" style="line-height: 72rpx;">
					<text class="font-32">{{userInfo.score}}</text>
					<text>{{scoreName}}</text>
				</view>
			</uni-forms-item>
			<uni-forms-item name="balance" label="已兑换">
				<view class="" style="">
					<text class="">{{score_cashout.amount}}{{scoreName}}</text>
				</view>
				<view class="" style="">
					<text>共计</text>
					<text class="price">{{score_cashout.money/100}}</text>
					<text>元</text>
				</view>
				<view class="colorGray font-20" v-if="score_cashout.day">
					<text>截止日期：</text>
					<uni-dateformat class="font-20" :date="score_cashout.day" format="yyyy-MM-dd" :threshold="[0, 0]">
					</uni-dateformat>
				</view>
			</uni-forms-item>
			<uni-forms-item name="balance" label="可兑换">
				<view class="">
					<text class="">{{score_cashout.enable?score_cashout.enable.amount:0}}{{scoreName}}</text>
				</view>
				<view class="">
					<text>共计</text>
					<text class="price">{{score_cashout.enable?score_cashout.enable.money/100:0}}</text>
					<text>元</text>
				</view>
			</uni-forms-item>
		</uni-forms>
		<view class="uni-button-group padding-22 margin-top-40 margin-bottom-40">
			<button type="primary" class="uni-button"
				:disabled="!score_cashout.enable || score_cashout.enable.amount==0" @click="submit">立即兑换</button>
		</view>
<!-- 		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,hasMore}"
			collection="uni-id-score-cashout" @load="loadedData" field="amount,balance,service,money,create_date"
			where="user_id==$cloudEnv_uid" orderby="create_date desc"> -->
			<tian-empty v-if="!loading && data.length == 0" text="暂无兑换数据" marginTop="300"></tian-empty>
			<view class="goods-list " v-else>
				<view v-for="(item,index) in data" :key="index" class="under-line goods bg-white ">
					<view class="goods-content">
						<view class="title ti-flex">
							<view class="flex-1">
								<text>兑换数量：</text>
								<text class="jifen" :class="{xiaofei:item.status==1}">{{item.amount}}</text>
								<view class="margin-top-6">
									<text>金额：</text>
									<text class="price">{{item.money/100}}</text>
								</view>
							</view>
							<text v-if="item.service > 0" class="font-24">手续费:{{item.service}}</text>
							<text v-else class="font-24">免手续费</text>
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
			<uni-load-more v-if="loading || hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')" />
		<!-- </unicloud-db> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					balance: 0,
					score: 0
				},
				formData: {
					amount: "",
					mode: ""
				},
				data: [],
				loading: false,
				hasMore: false
			};
		},
		computed: {
			scoreName() {
				if (this.$store.state.app.customer.scoreName) {
					return this.$store.state.app.customer.scoreName;
				}
				return "积分";
			},
			score_cashout() {
				if (this.userInfo.score_cashout) {
					return this.userInfo.score_cashout;
				}
				return {}
			}
		},
		onLoad() {
			this.userInfo = this.$store.state.user.userInfo;
			this.loadData()
		},
		methods: {
			loadData(data) {
				this.$request('user/score/cashout_info').then(res => {
					console.log('user cashout_info', res);
					this.userInfo = res;
				}, err => {
					console.log("getStatistics err", err)
				});
			},
			submit() {
				this.$request('user/score/cashout', {}, {
					loading: true
				}).then(res => {
					this.$success("兑换成功", 1500, true)
					this.navTimeBack()
				}, err => {
					this.$message("兑换失败")
				});
			},
			loadedData(data) {
				this.$request('app/clientDB', { collectionName: "uni-id-score-cashout" }).then(res => {
					console.log("res===", res);
				});
			}
		}
	}
</script>

<style lang="scss">
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
