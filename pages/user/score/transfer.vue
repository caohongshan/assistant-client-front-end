<template>
	<view class="login-container ">
		<view class="padding-22 bg-white">
			<text>可用{{scoreName}}：{{score}}</text>
		</view>
		<uni-forms :value="formData" ref="form">
			<uni-forms-item required name="integral" label="数量">
				<uni-easyinput type="number" maxlength="11" v-model="formData.integral" :inputBorder="false"
					placeholder="请输入转账的数量" />
			</uni-forms-item>
			<uni-forms-item required name="mobile" label="手机">
				<uni-easyinput type="number" maxlength="11" v-model="formData.mobile" :inputBorder="false"
					placeholder="输入对方手机号码" />
			</uni-forms-item>

			<view class="margin-top-40 ti-flex">
				<button @click="submit" type="primary" :disabled="isSubmit" class="flex-1">确定转账</button>
			</view>
		</uni-forms>
		<view class="padding-22">
			<view class="margin-top-20 colorBlue">
				<text v-if="scoreRate">本次转账收取{{scoreRate}}%{{scoreName}}手续费</text>
				<text v-else>本次转账免除{{scoreName}}手续费</text>
			</view>
			<view class="margin-top-20 font-36">
				<text>转账记录</text>
			</view>
		</view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,hasMore}"
			collection="uni-id-score-transfer" @load="loadData" field="amount,balance,service,mobile,create_date"
			where="user_id==$cloudEnv_uid" orderby="create_date desc">
			<tian-empty v-if="!loading && data.length == 0" text="暂无转账数据" marginTop="300"></tian-empty>
			<view class="goods-list " v-else>
				<view v-for="(item,index) in data" :key="index" class="under-line goods bg-white ">
					<view class="goods-content">
						<view class="title ti-flex">
							<view class="flex-1">
								<text>转账数量：</text>
								<text class="jifen" :class="{xiaofei:item.status==1}">{{item.amount}}</text>
								<view class="margin-top-6">
									<text>接收手机：{{item.mobile}}</text>
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
			<uni-load-more v-if="loading || hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')">
			</uni-load-more>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: 0,
				formData: {
					point: "",
					mobile: ""
				}
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			},
			score() {
				return this.balance;
			},
			scoreRate() {
				return this.userInfo.score_charge_rate ? (this.userInfo.score_charge_rate * 100) : 0;
			},
			scoreName() {
				return this.$store.state.app.customer.scoreName;
			}
		},
		onLoad() {
			if (this.userInfo.score) {
				this.balance = parseInt(this.userInfo.score);
			}
		},
		// 页面生命周期，下拉刷新后触发
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				// 停止下拉刷新
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			console.log("加载下一页")
			this.$refs.udb.loadMore()
		},
		methods: {
			loadData(data) {
				data.forEach(item => {
					item.statusText = "审核中";
					if (item.status == 1) {
						item.statusText = "成功";
					} else if (item.status == 2) {
						item.statusText = "拒绝";
					}
				})
			},
			submit() {
				//必须是整数
				let integral = parseInt(this.formData.integral);
				if (!integral) {
					this.$message('积分不能为空');
					return false;
				}
				if (!this.formData.mobile) {
					this.$message('手机号不能为空');
					return false;
				}
				if (this.balance < integral) {
					this.$message('积分不足');
					return false;
				}
				if (this.isSubmit) {
					return false;
				}
				this.confirmAction(() => {
					this.isSubmit = true;
					uni.showLoading({
						title: '请等待'
					});
					this.$request(
						'user/score/transfer', {
							integral: integral,
							mobile: this.formData.mobile,
						}, {
							loading: true
						}
					).then(res => {
						this.isSubmit = false;
						console.log('jointeam', res);
						if (res.code == 0) {
							this.balance = res.balance;
							this.$success('转账成功');
						}
						this.formData.integral = ""
						this.formData.mobile = ""
						this.$refs.udb.loadData({
							clear: true
						})
					}, err => {
						this.isSubmit = false;
					});
				}, "本次操作不可撤销！是否确定转账？")
			},
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
