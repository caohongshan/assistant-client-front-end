<template>
	<view class="padding-22">
		<view class="text-center">
			<text>我的排名</text>
			<text class="margin-left-10">{{level}}</text>
		</view>
		<view v-for="(item, index) in dataList" :key="index"
			class="ti-flex bg-white border-radius padding-22 margin-top-22">
			<text class="image-width-50">{{index+1}}</text>
			<image :src="item.avatar" mode="aspectFill" class="image-width-100 bg-white border-radius padding-2">
			</image>
			<view class="flex-1 margin-left-18">
				<text>{{ item.nickname }}</text>
			</view>
			<view class="text-right">
				<text>{{item.score.toFixed(1)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				level: "",
				limit: 100,
				dataList: []
			};
		},
		onLoad() {
			//只查询前100名
			this.loadData()
		},
		methods: {
			loadData() {
				let id = this.$store.state.user.userInfo._id;
				db.collection("uni-id-users").where("score>0").field("avatar,nickname,score").orderBy(
					"score desc,register_date asc").limit(
					this.limit).get().then(({
					result
				}) => {
					console.log(result.data)
					this.buildMember(result.data);
					result.data.forEach((e, index) => {
						//积分取整数
						e.score = parseInt(e.score);
						if (e._id == id) {
							this.level = `第${index + 1}名`
						}
					});
					if (!this.level) {
						this.level = `超过${this.limit}名`;
					}
					this.dataList = result.data;
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
