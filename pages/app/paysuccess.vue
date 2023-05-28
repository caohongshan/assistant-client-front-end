<template>
	<view class="pay-container">
		<view class="money">
			<text>{{money}}</text>
		</view>
		<view class="bottom">
			<tian-banner :configs="configs" />
			<view class="padding-60">
				<button type="warn" @click="goHome">去{{appName}}消费</button>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				id: "",
				money: 0,
				configs: {
					category_id: "6184e4c6808fdd0001acdf3f",
					width: 690,
					height: 180,
				}
			};
		},
		computed: {
			appName() {
				return this.$store.state.app.appName;
			}
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id;
			this.loadData()
		},
		methods: {
			loadData() {
				db.collection("tian-payment-qrcodes").where({
					id: parseInt(this.id)
				}).limit(1).get({
					getOne: true
				}).then(({
					result
				}) => {
					this.money = result.data.rebate;
					console.log("result", result)
				})
			},
			goHome() {
				uni.reLaunch({
					url: "/pages/index/index"
				})
				/* uni.navigateBack({
					delta: 10
				}) */
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.pay-container {
		background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0d39ea55-a36c-49d7-87a4-474efa3a98ab/4827f6a5-898a-450c-b410-6d3efd2bc368.jpg") no-repeat;
		background-size: 100%;

		.money {
			line-height: 700rpx;
			text-align: center;
			font-size: 60rpx;
			color: #bd271b;
		}

		.bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}
</style>
