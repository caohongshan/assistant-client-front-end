<template>
	<view>
		<view class="ti-flex flex-column padding-top-80 padding-bottom-80">
			<image src="/static/logo.png" class="image-width-100"></image>
			<view class="padding-top-20 colorGray">
				<text>{{name}}</text>
				<text class="padding-left-12">V{{version}}</text>
			</view>
		</view>

		<uni-list>
			<uni-list-item title="服务协议" :showArrow="true" :clickable="true" v-if="appConfig.fwxy"
				@click="navTo('/pages/app/web',appConfig.fwxy)">
			</uni-list-item>
			<uni-list-item title="隐私政策" :showArrow="true" :clickable="true" v-if="appConfig.yszc"
				@click="navTo('/pages/app/web',appConfig.yszc)">
			</uni-list-item>
			<uni-list-item title="资质证照" :showArrow="true" :clickable="true" v-if="appConfig.zz"
				@click="navTo('/pages/app/web',appConfig.zz)">
			</uni-list-item>
			<!-- #ifdef APP-PLUS -->
			<uni-list-item title="检查更新" :clickable="true" :rightText="version" @click="checkVersion">
			</uni-list-item>
			<!-- #endif -->
		</uni-list>
	</view>
</template>

<script>
	//#ifdef APP-PLUS
	import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update";
	//#endif
	export default {
		data() {
			return {
				name: "永福市场",
				version: "1.0.0"
			};
		},
		computed: {
			appConfig() {
				return this.$config.app;
			},
		},
		onLoad() {
			this.name = this.systemInfo.appName
			this.version = this.systemInfo.appVersion
		},
		methods: {
			checkVersion() {
				console.log("开始检查更新")
				checkUpdate().then(res => {
					console.log("result", res)
				}, err => {
					uni.showToast({
						icon: "none",
						title: err.message || "暂无新版"
					})
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
