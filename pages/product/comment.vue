<template>
	<view>
		<view class="" v-if="item.comment_count">
			<view v-for="(comment,index) in dataList" :key="index" class="margin-bottom-22 under-line padding-22">
				<view class="ti-flex">
					<image :src="comment.user.avatar" mode="aspectFill" class="user-avatar"></image>
					<view class="margin-left-12 flex-1">
						<view class="">
							<text>{{comment.user.nickname}}</text>
						</view>
						<uni-rate size="12" :value="comment.rate" readonly class=""></uni-rate>
					</view>
					<uni-dateformat :date="comment.create_date" format="yyyy-MM-dd" class="font-24 colorGray" />
				</view>
				<view class="font-24 margin-top-6 padding-lr-10">
					<text>{{comment.content}}</text>
				</view>
				<view class="font-24 margin-top-6 padding-lr-10" v-if="comment.reply">
					<text>{{comment.reply}}</text>
				</view>
			</view>
		</view>
		<view v-else class="text-center padding-24">
			<text>暂无评价</text>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()

	export default {
		data() {
			return {
				_id: "",
				page: 0,
				limit: 20,
				item: {},
				dataList: []
			};
		},
		onLoad(e) {
			this.item = this.getItemData()
			this._id = e.id;
			this.dataList = this.item.comments;
			//分页查询评论
			this.loadData()
		},
		onReachBottom() {
			console.log("加载下一页")
			this.loadmore = Date.now();

			this.loadData()
		},
		methods: {
			loadData(clear) {
				if (clear) {
					this.page = 0;
				}
				this.page++;
				db.collection("opendb-mall-comments").where(`goods_id=="${this._id}"`).skip((this.page - 1) * this.limit)
					.limit(this.limit).get().then(({
						result
					}) => {
						if (this.page == 1) {
							this.dataList = []
						}
						this.dataList = this.dataList.concat(result.data)
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}
</style>
