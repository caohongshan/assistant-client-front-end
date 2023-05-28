<template>
	<view style="height: 100%;">
		<tian-goods-join-list ref="tgjl" condition="user_id==$cloudEnv_uid" collection="opendb-mall-goods-visite"
			field="_id as visite_id,dateToString(timestampToDate(update_date),'%Y-%m-%d') as updated_date"
			:configs="{withDel:false,style:'style-padding'}" :withGroupTime="true">
		</tian-goods-join-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('刷新整页');
			uni.stopPullDownRefresh();
			this.$refs.tgjl.refresh();
		},
		onReachBottom() {
			console.log('下一页');
			this.$refs.tgjl.loadMore();
		},
		methods: {

		}
	}
</script>

<style>

</style>
