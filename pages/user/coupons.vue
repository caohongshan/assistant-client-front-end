<template>
	<view class="container"><tian-coupons :value="coupons" type="goto"></tian-coupons></view>
</template>

<script>
const db = uniCloud.database();
export default {
	data() {
		return {
			coupons: []
		};
	},
	onLoad() {
		this.loadData();
	},
	methods: {
		loadData() {
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			let t = Date.now();
			db.collection('tian-mall-coupon-users')
				.where(`user_id==$cloudEnv_uid && state==1 && begin_time<${t} && end_time>${t}`)
				.limit(500)
				.get()
				.then(
					({ result }) => {
						this.coupons = result.data;
						uni.hideLoading();
					},
					err => {
						uni.hideLoading();
					}
				);
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.container {
	padding: 22rpx;
}
</style>
