<template>
	<view class="container bg-white">
		<view class="icons colorGray">
			<view class="options margin-top-40">
				<view class="ti-flex flex-column" @click="tel()">
					<tian-icons type="kefu" size="60" color="#999999" />
					<text class="margin-top-40">客服电话:{{customer.telephone}}</text>
				</view>
			</view>
			<text>{{customer.serviceTime}}</text>
			<view class="opt-item padding-20 ti-flex margin-top-40">
				<button type="default" size="mini" class="chat" @click="tel()">
					<text>拨打电话</text>
				</button>
				<!-- #ifdef MP -->
				<button type="default" size="mini" class="chat margin-left-20" open-type="contact">
					<text>在线客服</text>
				</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: "serviceShopInfo",
				dataList: []
			};
		},
		computed: {
			customer() {
				return this.$store.state.app.customer;
			}
		},
		methods: {
			tel() {
				if (this.customer.telephone != "") {
					uni.makePhoneCall({
						phoneNumber: this.customer.telephone
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.container {}

	.icons {
		text-align: center;
		margin: 0 30rpx 30rpx;
	}

	.options {
		display: flex;
		align-items: center;
		justify-content: center;

		.opt-item {
			margin: 0 40rpx 10rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.chat {
			background: none;
			border: none;

			&:after {
				border: none;
			}
		}
	}

	.header {
		padding: 20rpx;
	}

	.item {
		position: relative;
		padding: 20rpx 30rpx;

		&:after {
			left: 20rpx;
		}
	}
</style>
