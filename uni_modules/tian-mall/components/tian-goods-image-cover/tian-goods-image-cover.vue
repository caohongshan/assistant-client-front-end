<template>
	<view class="">
		<image src="../../../../static/images/miaosha_cover.png" mode="widthFix" class="miaosha-cover"
			v-if="item.miaosha && item.miaosha.is_begin" :style="coverStyle"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			item: {
				type: Object,
				default: () => {
					//静态显示
					return {}
				}
			}
		},
		computed: {
			coverStyle() {
				if (!this.item.imageSize) {
					return ""
				}
				let [width, height] = this.item.imageSize.split("x");
				if (width / 5 * 2 < 100) {
					return `width:${width/5*2}rpx;`;
				}
				return ""
			}
		}
	}
</script>

<style>
	.miaosha-cover {
		position: absolute;
		left: 0;
		top: 0;
		width: 100rpx;
		z-index: 2;
	}
</style>
