<template>
	<view class="root">
		<view class="step" :style="style">
			<!-- 快递公司信息 -->
			<view class="headBox">
				<view class="infoBox">
					<view class="info">
						<view class="expIconBox">
							<!-- <uni-icons type="flag-filled" size="28" color="#FFFFFF"></uni-icons> -->
							<tian-icons type="zuobiao" size="28" color="#FFFFFF"></tian-icons>
						</view>
						<view class="moreBox">
							<text class="expName">{{express.company}}</text>
							<text class="expState">{{express.state}}</text>
						</view>
					</view>
					<text class="number">运单号：{{express.number}}</text>
				</view>
				<uni-icons v-if="closeBtn" @click="closeMe" class="closeIcon" type="close" size="28" color="#999999">
				</uni-icons>
			</view>

			<!-- 物流跟踪详情 -->
			<scroll-view v-if="logisticsTracking.length" scroll-y="true" class="scrollBox" :style="scrollStyle">
				<view class="stateBox" v-for="(item,index) in logisticsTracking" :key="index">
					<view class="lineBox">
						<tian-icons type="danxuan" size="15" color="#70b7fc"></tian-icons>
						<!-- <uni-icons type="smallcircle" size="15" color="#70b7fc"></uni-icons> -->
						<view class="line"></view>
					</view>
					<view class="remarkBox">
						<text class="remark">{{item.context}}</text>
						<text class="time">{{item.ftime}}</text>
					</view>
				</view>
			</scroll-view>
			<uni-load-more status="loading" v-else-if="!loaded"></uni-load-more>
			<view class="" style="text-align: center;" v-else>
				<text>暂无物流信息</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				loaded: false,
				key: "cloud_express_number",
				//物流信息
				"express": {
					"company": "",
					"code": "",
					"number": "",
					"state": ""
				},
				"logisticsTracking": [], //物流跟踪
			}
		},

		props: {
			value: {
				type: Object,
				default: () => {}
			},
			height: {
				type: [String, Number],
				default: 920
			},
			closeBtn: {
				type: Boolean,
				default: true
			},
			notice: {
				type: Boolean,
				default: true
			},
		},
		computed: {
			style() {
				if (parseInt(this.height) > 0) {
					return `height:${this.height}rpx`;
				}
				return `height:${this.height}`
			},
			scrollStyle() {
				if (parseInt(this.height) > 0) {
					return `height:${this.height-270}rpx`;
				}
				return `height:${this.height}`
			}
		},
		watch: {
			value(newVal) {
				console.log("watch value", newVal)
				this.express = newVal
				this.open()
			}
		},
		created() {
			this.express = this.value;
			if (this.value.number) {
				this.open()
			}
		},
		methods: {
			//关闭弹框
			closeMe() {
				// this.$refs.popup.close()
				this.$emit('canceled')
			},
			open() {
				this.logisticsTracking = []
				if (!this.express.company || !this.express.code || !this.express.number) {
					this.notice && uni.showToast({
						title: '暂无物流信息',
						icon: 'none'
					});
					return false
				}
				// this.$refs.popup.open() //打开弹框
				this.expressSearch() //查物流
			},
			//查物流
			expressSearch() {
				//由服务器缓存1天
				this.$request("mall/express/detail", {
					company: this.express.code,
					number: this.express.number,
				}, {
					functionName: "psyche"
				}).then(res => {
					this.loaded = true;
					if (res.status != "200") {
						this.notice && uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.logisticsTracking = []
						return false
					}
					this.notice && uni.showToast({
						title: "查询成功"
					})
					this.showContent(res)
				}, err => {
					this.notice && uni.showToast({
						title: "查询失败",
						icon: "none"
					})
				})
			},
			showContent(data) {
				this.logisticsTracking = data.data
				//对应物流状态
				switch (data.state / 1) {
					case 0:
						this.express.state = '在途';
						break;
					case 1:
						this.express.state = '揽收';
						break;
					case 2:
						this.express.state = '疑难';
						break;
					case 3:
						this.express.state = '签收';
						break;
					case 4:
						this.express.state = '退签';
						break;
					case 5:
						this.express.state = '派件';
						break;
					case 6:
						this.express.state = '退回';
						break;
					case 7:
						this.express.state = '转投';
						break;
					case 10:
						this.express.state = '待清关';
						break;
					case 11:
						this.express.state = '清关中';
						break;
					case 12:
						this.express.state = '已清关';
						break;
					case 13:
						this.express.state = '清关异常';
						break;
					case 14:
						this.express.state = '拒签';
						break;
					default:
						break;
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.step {
		// width: 750upx;
		height: 460px;
		flex-direction: column;
		padding: 20upx;
		background-color: #FFFFFF;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.headBox {
		flex-direction: column;
		align-items: center;
		height: 200rpx;
	}

	.infoBox {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		margin: 0 15upx;
		margin-top: 30rpx;
		border-style: solid;
		border-width: 1px;
		border-color: #EEEEEE;
		background-color: #FFFFFF;
		position: relative;
	}

	.closeIcon {
		top: 5px;
		right: 5px;
		position: absolute;
	}

	.info {
		display: flex;
		flex-direction: row;
		padding: 20upx;
		align-items: center;
	}

	.expIconBox {
		display: flex;
		width: 80rpx;
		height: 80rpx;
		border-radius: 500px;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to right, #91c0f9, #2b8ffd);
		;
	}

	.expIcon {
		width: 40rpx;
		height: 40rpx;
	}

	.moreBox {
		width: 550rpx;
		flex-direction: row;
		align-items: center;
		margin-left: 20upx;
	}

	.expName {
		font-size: 32upx;
		flex: 1;
	}

	.expState {
		font-size: 35upx;
		color: #007AFF;
	}

	.number {
		line-height: 50rpx;
		font-size: 26upx;
		color: #333333;
		height: 50rpx;
		background-color: #EEEEEE;
		padding: 0 15upx;
		bottom: -1px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.scrollBox {
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		height: 650rpx;
	}

	.stateBox {
		display: flex;
	}

	.lineBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 20upx;
	}

	.remarkBox {
		display: flex;
		flex-direction: column;
		margin: 0 15upx;
	}

	.line {
		display: flex;
		width: 2upx;
		flex-direction: column;
		flex: 1;
		background-color: #C0C0C0;
	}

	.title {
		font-size: 28upx;
		color: #007AFF;
	}

	.remark {
		font-size: 24upx;
		width: 550rpx;
		color: #333333;
		padding: 10upx 0;
	}

	.time {
		font-size: 24upx;
		color: #999999;
		padding-bottom: 30upx;
	}

	.btLine {
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eeeeee;
	}
</style>
