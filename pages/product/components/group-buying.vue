<template>
	<view class="group-buying">
		<!-- 显示2条拼单信息，定时滚动 -->
		<view v-for="(gb,index2) in groupBuying" :key="index2" @click="btnGroupBuying(gb)"
			class="ti-flex  under-line padding-22 font-22 padding-left-50">
			<view class="" style="white-space: nowrap;">
				<image v-for="(avt,index3) in gb.avatar" :key="index3" :src="avt" mode="aspectFill"
					class="image-width-60 bg-white user-avatar more-avatar" :style="'z-index:'+(20-index3)">
				</image>
			</view>
			<text class="margin-left-10 text-hide" v-for="(avt,index3) in gb.nickname" :key="index3">{{avt}}</text>
			<view class="flex-1"></view>
			<text style="white-space: nowrap;" class="margin-left-10" v-if="gb.amount<2">还差{{gb.amount}}人拼成</text>
			<view class="" style="width: 160rpx;">
				<button type="warn" size="mini" :disabled="!gb.enable" class="margin-left-10 radius">去拼单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			groupBuying: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		methods: {
			btnGroupBuying(item) {
				if (item.enable) {
					this.$emit("click", item.id)
				}
			}
		}
	}
</script>

<style lang="scss">
	.group-buying {
		min-width: 650rpx;
		.user-avatar {
			position: relative;
			z-index: 20;
		}

		.more-avatar {
			margin-left: -30rpx;
		}
	}
</style>
