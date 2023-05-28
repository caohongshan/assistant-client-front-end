<template>
	<view style="height: 100%;">
		<tian-goods-join-list ref="tgjl" condition="user_id==$cloudEnv_uid" collection="opendb-mall-goods-favorite"
			field="_id as favorite_id,dateToString(timestampToDate(update_date),'%Y-%m-%d') as updated_date"
			:configs="{withDel:true,style:'style-padding'}" @deleteItem="delItem">
		</tian-goods-join-list>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {}
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('刷新整页');
			uni.stopPullDownRefresh();
			this.$refs.tgjl.refresh();
		},
		methods: {
			delItem(item) {
				// 删除收藏
				this.confirmAction(() => {
					db.collection("opendb-mall-goods-favorite").where({
						_id: item.favorite_id,
						user_id: db.env.uid
					}).remove().then(res => {
						this.$success("删除成功")
						this.$refs.tgjl.refresh();
					});
				}, "是否确定删除收藏？")
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
</style>
