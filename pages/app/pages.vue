<template>
	<view>
		<tian-tab-pages v-if="type=='tian-tab-pages'" :configs="configs" :refresh="refresh" :loadmore="loadmore">
		</tian-tab-pages>
		<tian-pages v-else-if="type=='tian-pages'" :configs="configs" :refresh="refresh" :loadmore="loadmore">
		</tian-pages>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "",
				loadmore: 0,
				refresh: 0,
				configs: {}
			};
		},
		onLoad(e) {
			this.type = e.type;
			this.configs = {
				...e,
				parent_id: e.id
			};
			if (e.title) {
				this.barTitle = e.title;
			}
		}, //下拉刷新
		onPullDownRefresh() {
			console.log('刷新整页');
			uni.stopPullDownRefresh();
			this.refresh = Date.now();
		},
		onReachBottom() {
			console.log("加载下一页")
			this.loadmore = Date.now();
		},

	}
</script>

<style lang="scss">

</style>
