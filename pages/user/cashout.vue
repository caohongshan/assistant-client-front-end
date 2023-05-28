<template>
	<view class="uni-container padding-22">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="balance" label="可用余额" labelWidth="80">
				<view class="ti-flex" style="line-height: 72rpx;">
					<text class="price">{{userInfo.balance/100}}</text>
					<text>元</text>
				</view>
			</uni-forms-item>
			<uni-forms-item name="amount" label="提现金额" labelWidth="80">
				<view class="ti-flex">
					<uni-easyinput placeholder="提现金额" type="digit" @confirm="submit" v-model="formData.amount"
						:inputBorder="false" />
					<text>元</text>
				</view>
			</uni-forms-item>
			<!-- #ifndef MP-WEIXIN -->
			<uni-forms-item name="mode" label="提现路径" labelWidth="80" v-if="items && items.length>1">
				<view class="padding-left-22">
					<picker mode="selector" :range="items" range-key="text" @change="onchange">
						<view class="ti-flex" style="line-height: 72rpx;">
							<text class="colorGray flex-1" v-if="formData.mode">{{mode.text}}</text>
							<text class="colorGray flex-1" v-else>请选择提现路径</text>
							<tian-icons type="xiangyou1" />
						</view>
					</picker>
					<view class="colorGray font-20">
						<text>请移步个人设置，绑定相应的提现路径，否则无法提现！</text>
					</view>
				</view>
			</uni-forms-item>
			<!-- #endif -->
			<view class="colorGray font-20" v-if="userInfo.cashoutLimit">
				<text>提现限制最低：</text>
				<text class="price">{{userInfo.cashoutLimit.min}}</text>
				<text>，最高：</text>
				<text class="price">{{userInfo.cashoutLimit.max}}</text>
			</view>
		</uni-forms>
		<view class="uni-button-group margin-top-60 margin-bottom-40 under-line padding-bottom-40">
			<button type="primary" class="uni-button" @click="submit">申请提现</button>
		</view>
<!-- 		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,hasMore}" collection="tian-user-cashouts"
			@load="loadData" field="amount,balance,status,service,mode,create_time" where="user_id==$cloudEnv_uid"
			orderby="create_time desc"> -->
			<tian-empty v-if="!loading && data.length == 0" text="暂无提现数据" marginTop="300" />
			<view class="goods-list " v-else>
				<view v-for="(item,index) in data" :key="index" class="under-line goods bg-white ">
					<view class="goods-content">
						<view class="title ti-flex">
							<view class="flex-1">
								<text>提现金额：</text>
								<text class="jifen" :class="{xiaofei:item.status==1}">{{item.amount/100}}</text>
								<view class="margin-top-6">
									<text>提现路径：{{formOptions.mode_valuetotext[item.mode]}}</text>
								</view>
							</view>
							<view class="text-right">
								<view class="font-24">
									<text>{{formOptions.status_valuetotext[item.status]}}</text>
								</view>
								<text v-if="item.service > 0" class="font-24">手续费:{{item.service/100}}</text>
								<text v-else class="font-24">免手续费</text>
							</view>
						</view>
						<view class="ti-flex font-24 colorGray margin-top-12">
							<uni-dateformat class="font-20" :date="item.create_time" format="yyyy/MM/dd hh:mm"
								:threshold="[60000, 3600000]" />
							<view class="flex-1">

							</view>
							<text class="">余额:{{item.balance/100}}</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more v-if="loading || hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')" />
		<!-- </unicloud-db> -->
	</view>
</template>

<script>
	import { validator, enumConverter } from '../../js_sdk/validator/tian-user-cashouts.js';
	
	export default {
		data() {
			return {
				data: [],
				loading: false,
				hasMore: false,
				formData: {
					amount: "",
					mode: ""
				},
				mode: {},
				formOptions: enumConverter,
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			},
			items() {
				if (!this.userInfo.cashoutType) {
					return []
				}
				return this.userInfo.cashoutType
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			//微信小程序默认微信提现
			this.formData.mode = "wxpay"
			//#endif
			if (this.items.length > 0) {
				this.mode = this.items[0];
				this.formData.mode = this.items[0].value;
			}
		},
		onShow() {
			if (!this.userInfo.cashoutLimit) {
				console.log("没有最低限制")
				// uni.navigateBack({

				// })
			}
			this.loadData();
		},
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
			this.loadMore()
		},
		methods: {
			onchange(e) {
				console.log("onchange", e)
				this.mode = this.items[e.detail.value]
				this.formData.mode = this.mode.value;
			},
			onnodeclick(e) {
				this.formData.mode = e.value
				console.log("onnodeclick", e)
			},
			submit() {
				//判断金额和类型
				if (!this.formData.amount) {
					this.$message("请输入提现金额!")
					return;
				}
				if (this.formData.amount > this.userInfo.balance / 100) {
					this.$message("余额不足!")
					return;
				}
				//限制提现金额
				if (this.formData.amount < this.userInfo.cashoutLimit.min || this.formData.amount > this.userInfo
					.cashoutLimit.max) {
					this.$message("金额超出限制!")
					return;
				}
				if (!this.formData.mode) {
					this.$message("请选择提现路径!")
					return;
				}

				this.$request('user/info/cashout', this.formData, {
					loading: true
				}).then(res => {
					//设置成功,刷新用户信息
					uni.showModal({
						title: "申请成功",
						content: res.message || "您的提现申请已提交，等待系统处理",
						showCancel: false
					})
					this.$store.dispatch('user/getUserInfo');
					this.loadData({
						clear: true
					})
					this.formData.amount = ""
				});
			},
			loadData(data) {
				this.$request('app/clientDB', { collectionName: "tian-user-cashouts" }).then(res => {
					this.data = res
				})
			},
			loadMore() {
				
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
