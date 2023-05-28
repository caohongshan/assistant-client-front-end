<template>
	<view class="miaosha-container">
		<view class="miaosha-container2">
			<view class="header">
				<view class="title-bg">
				</view>
				<view class="timer ti-flex" v-if="miaosha && miaosha.isBegin">
					<text>据本场结束</text>
					<text class="margin-left-18 number">{{miaoshaTimeOut.hour}}</text>
					<text>:</text>
					<text class="number">{{miaoshaTimeOut.minute}}</text>
					<text>:</text>
					<text class="number">{{miaoshaTimeOut.second}}</text>
				</view>
				<view class="timer ti-flex" v-if="miaosha && !miaosha.isBegin">
					<text>据本场开始</text>
					<text class="margin-left-18 number">{{miaoshaTimeOut.hour}}</text>
					<text>:</text>
					<text class="number">{{miaoshaTimeOut.minute}}</text>
					<text>:</text>
					<text class="number">{{miaoshaTimeOut.second}}</text>
				</view>
				<view class="shiduan ti-flex">
					<view class="ti-flex flex-column flex-1 shiduan-item">
						<text class="title">热卖中</text>
						<text class="sub">不能错过</text>
					</view>
					<view v-for="(item,index) in shiduan" :key="index" @click="changeTab(index)"
						class="ti-flex flex-column flex-1 shiduan-item" :class="{current:item.selected}">
						<text>{{item.name}}</text>
						<text class="sub begin" v-if="item.isBegin">秒杀中</text>
						<text class="sub" v-else>即将开始</text>
					</view>
				</view>
			</view>
			<view class="goods-panel">
				<tian-goods-list ref="tianGoodsList" v-if="condition" :loadmore="loadmore" :condition="condition"
					:configs="configs">
				</tian-goods-list>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				loadmore: 0,
				miaoshaTimeOut: {
					hour: "00",
					minute: "00",
					second: "00",
				},
				miaosha_id: "",
				configs: {
					itemClassName: "margin-bottom-20 padding-bottom-20 ",
					image_size: "190x190",
					showMiaosha: true,
					page_size: 10,
					loadmore: true,
					order: "miaosha.limit_stock desc"
				},
				miaosha: {},
				shiduan: []
			};
		},
		onLoad(e) {
			if (e.id) {
				this.miaosha_id = e.id;
			}
			this.getShiduan()
		},
		onReachBottom() {
			console.log("加载下一页")
			this.loadmore = Date.now();
		},
		computed: {
			condition() {
				if (this.miaosha_id) {
					return `miaosha.miaosha_id=="${this.miaosha_id}" && miaosha.limit_stock >= 0 && miaosha.enable==true && miaosha.end_time>$cloudEnv_now`
				}
				return ""
			}
		},
		beforeDestroy() {
			if (this.miaoshaTimerId) {
				clearTimeout(this.miaoshaTimerId)
			}
		},
		methods: {
			getShiduan() {
				db.action("check_miaosha").collection("tian-mall-hour-miaosha").where("state==1").get().then(({
					result
				}) => {
					let hour = (new Date()).getHours();
					this.shiduan = result.data.map((e, index) => {
						return {
							...e,
							selected: index == 0,
							isBegin: e.hour <= hour,
							name: (e.hour < 10 ? "0" + e.hour : e.hour) + ":00"
						}
					});
					if (this.shiduan.length > 0) {
						//默认选中第一个
						this.miaosha = this.shiduan[0]
						this.miaosha_id = this.miaosha._id;
						this.beginMiaoshaTimer()
					}
				})
			},
			changeTab(index) {
				this.shiduan.forEach((e, i) => {
					e.selected = i == index
					if (e.selected) {
						this.miaosha_id = e._id;
					}
				})
			},
			beginMiaoshaTimer() {
				//暂时结束时间为2小时 @todo 查询下一时段的开始时间
				let miaoshaTimeOut = parseInt((this.miaosha.end_time - Date.now()) / 1000);
				if (this.miaosha.isBegin) {
					if (miaoshaTimeOut < 1) {
						//切换秒杀，已过期的秒杀不再显示
						this.getShiduan()
						return;
					}
				} else {
					// console.log("this.miaosha",this.miaosha)
					//未开始
					miaoshaTimeOut = parseInt((this.miaosha.begin_time - Date.now()) / 1000);
					if (miaoshaTimeOut < 1) {
						//从未开始转到了一开始，商品信息需要重新更新
						this.miaosha.isBegin = true
						this.$refs.tianGoodsList.reloadData()
					}
				}
				//转化为时分秒
				// this.miaoshaTimeOut = parseInt((this.item.miaosha.end_time - Date.now()) / 1000)
				this.getTimeString(miaoshaTimeOut)

				// console.log("计算秒杀")
				this.miaoshaTimerId = setTimeout(() => {
					this.beginMiaoshaTimer();
				}, 1000)
			},
			getTimeString(miaoshaTimeOut) {
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
				this.miaoshaTimeOut = {
					hour,
					minute,
					second
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #0D008A;
	}

	.miaosha-container {
		padding: 22rpx $uni-spacing-row-lg;

		.miaosha-container2 {
			background: #1c4ae0;
			border-radius: 12rpx 12rpx 0rpx 0rpx;
			overflow: hidden;
		}

		.header {
			color: #fff;
			position: relative;
			padding: 34rpx 0 0 0;
			overflow: hidden;

			.title-bg {
				width: 200rpx;
				height: 200rpx;
				position: absolute;
				left: -44rpx;
				top: -64rpx;
				width: 500rpx;
				height: 284rpx;
				background: rgba(100, 76, 255, 0.74);
				filter: blur(25px);
				z-index: 1;
			}

			.timer {
				position: relative;
				z-index: 2;
				padding: 0 30px;
			}

			.number {
				width: 38rpx;
				height: 38rpx;
				background: #FFFFFF;
				border-radius: 8rpx;
				display: inline-block;
				color: #0D008A;
				font-size: 24rpx;
				text-align: center;
				line-height: 38rpx;
				font-weight: 400;
				margin: 0 10rpx;
			}

			.shiduan {
				margin-top: 40rpx;
				position: relative;
				padding-right: 12rpx;
				z-index: 3;

				.shiduan-item {
					font-weight: 500;
					line-height: 48rpx;
					font-size: 34rpx;
					border-radius: 10rpx 10rpx 0rpx 0rpx;
					padding-bottom: 28rpx;
					padding-top: 12rpx;
					font-weight: 500;

					.sub {
						font-size: 20rpx;
						line-height: 1;
						padding: 6rpx 12rpx;
						margin-top: 10rpx;
						font-weight: 400;
					}

					.title {
						font-size: 30rpx;
						font-weight: 500;
					}

					&.current {
						background: #fff;
						color: #0D008A;

					}


					.begin {
						background: #ed1d4a;
						border-radius: 20rpx;
						color: #fff;
					}

				}
			}
		}

		.goods-panel {
			background: #FFFFFF;
			border-radius: 12rpx;
			padding: 32rpx 12rpx;
			min-height: 800rpx;
		}
	}
</style>
