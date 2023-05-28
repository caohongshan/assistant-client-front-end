<template>
	<view>
		<view class="" v-if="value && value.length > 0">
			<view v-for="(coupon, index1) in value" :key="index1" class="ti-flex margin-bottom-22 under-line padding-bottom-22">
				<text class="price font-40 " v-if="coupon.style == 'manjine' || coupon.style == 'manshuliang'">{{ coupon.price / 100 }}</text>
				<text class="price font-40 " v-else-if="coupon.style == 'manjinedazhe' || coupon.style == 'manshuliangdazhe'">打{{ coupon.rate / 10 }}折</text>
				<view class="flex-1 margin-left-10">
					<view class="">
						<text>满</text>
						<text v-if="coupon.style == 'manjine'">{{ coupon.condition / 100 }}元</text>
						<text v-if="coupon.style == 'manshuliang'">{{ coupon.condition }}件</text>
						<text v-if="coupon.style == 'manjinedazhe'">{{ coupon.condition / 100 }}元</text>
						<text v-if="coupon.style == 'manshuliangdazhe'">{{ coupon.condition }}件</text>
						<text>可用</text>

						<text v-if="coupon.type == 1" class="font-24 colorGreen margin-left-10">部分商品可用</text>
						<text v-else-if="coupon.type == 2" class="font-24 colorGreen margin-left-10">部分类别可用</text>
					</view>
					<view class="font-24">
						<uni-dateformat :date="coupon.begin_time" format="yyyy-MM-dd" />
						<text class="margin-left-10 margin-right-10">~</text>
						<uni-dateformat :date="coupon.end_time" format="yyyy-MM-dd" />
					</view>
				</view>
				<button type="primary" v-if="type == 'get'" size="mini" @click="getCoupon(coupon)">领取</button>
				<button type="primary" v-else-if="type == 'choose'" size="mini" @click="chooseCoupon(coupon)">选择</button>
				<button type="primary" v-else-if="type == 'disable'" size="mini" disabled>不可用</button>
				<button type="primary" v-else-if="type == 'goto'" size="mini" @click="navToDetail(coupon)">去使用</button>
			</view>
		</view>
		<view class="" v-else><tian-empty text="暂无优惠券"></tian-empty></view>
	</view>
</template>

<script>
export default {
	name: 'tian-coupons',
	data() {
		return {};
	},
	props: {
		value: {
			type: Array,
			default: () => {
				return [];
			}
		},
		type: {
			type: String,
			default: 'get'
		}
	},
	computed: {
		isLogin() {
			return this.$store.getters['user/isTokenValid'];
		}
	},
	methods: {
		getCoupon(item) {
			//判断是否登录
			if (!this.isLogin) {
				return this.navToLogin();
			}
			this.$request(
				'mall/coupon/takeit',
				{
					id: item._id,
					shop_id: item.shop_id
				},
				{
					loading: true
				}
			).then(
				() => {
					uni.showModal({
						content: '领取成功',
						showCancel: false,
						success: () => {
							this.$emit('close');
						}
					});
				},
				err => {
					uni.showModal({
						content: err.message || '领取失败',
						showCancel: false,
						success: () => {
							this.$emit('close');
						}
					});
				}
			);
		},
		chooseCoupon(item) {
			this.$emit('close', item);
		},
		navToDetail(item) {
			if (item.type == 1) {
				//指定商品
				let url = `/pages/product/list?coupon_id=${item._id}&shop_id=${this.appShopId}&title=使用优惠券`;
				uni.setStorageSync('coupon_goods_ids_' + item._id, item.goods_ids);
				uni.navigateTo({
					url
				});
			} else if (item.type == 2) {
				//指定分类
				let url = `/pages/product/list?cid=${item.category_id}&shop_id=${this.appShopId}&title=使用优惠券`;
				uni.navigateTo({
					url
				});
			} else {
				//返回首页
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
};
</script>

<style lang="scss"></style>
