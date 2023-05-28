<template>
	<view class="container">
		<view class="tabs under-line">
			<text class="tab" :class="{ current: current == 0 }" @click="selectCurrent(0)">可用</text>
			<text class="tab left-line" :class="{ current: current == 1 }" @click="selectCurrent(1)">不可用</text>
		</view>
		<view class="content">
			<tian-coupons v-if="current == 0" :value="coupons" type="choose" @close="closeCoupon"></tian-coupons>
			<tian-coupons v-if="current == 1" :value="couponsDisabled" type="disable"></tian-coupons>
		</view>
	</view>
</template>

<script>
/**
 * 根据结算的商品，计算可用/不可用的优惠券，预结算的时候，返回可用的优惠券id
 */
export default {
	data() {
		return {
			current: 0,
			coupons: [],
			couponsDisabled: []
		};
	},
	onLoad() {
		this.coupons = uni.getStorageSync('order_coupon');
		this.couponsDisabled = uni.getStorageSync('order_coupon_couponsDisabled');
	},
	methods: {
		selectCurrent(index) {
			this.current = index;
		},
		closeCoupon(item) {
			console.log('closeCoupon');
			uni.setStorageSync('order_select_coupon', item);
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.tabs {
	display: flex;
	background: #fff;
	.tab {
		flex: 1;
		text-align: center;
		padding: 20rpx;
		&.current {
			color: $uni-color-error;
		}
	}
}
.content {
	padding: 22rpx;
}
</style>
