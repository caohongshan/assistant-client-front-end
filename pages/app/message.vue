<template>
	<view>
		<view v-for="(item,index) in dataList" :key="index" class="padding-30" @click="readItem(item)">
			<view class="text-center font-20">
				<uni-dateformat :date="item.create_date" format="yyyy-MM-dd hh:mm"></uni-dateformat>
			</view>
			<view class=" bg-white border-radius padding-20 margin-top-22">
				<view class="title ti-flex">
					<text class="margin-right-10 font-32 font-bold">{{item.title}}</text>
					<uni-badge v-if="!item.read" text="1" size="small" :isDot="true" type="error" class="badge" />
				</view>
				<view class="font-24 colorGray margin-top-12">
					<text>{{item.note}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	let msgDb = db.collection("tian-mall-message");
	export default {
		data() {
			return {
				type: "",
				cachePreKey: "message_list_",
				dataList: []
			};
		},
		computed: {
			isLogin() {
				return this.$store.getters['user/isTokenValid'];
			},
			userInfo() {
				return this.$store.state.user.userInfo;
			},
		},
		onLoad(e) {
			if (e.title) {
				uni.setNavigationBarTitle({
					title: e.title
				})
			}
			this.type = e.type
			this.loadData()
		},
		methods: {
			loadData() {
				let key = `${this.cachePreKey}${this.userInfo._id}_${this.type}`;
				if (this.isLogin) {
					this.dataList = uni.getStorageSync(key)
					if (!this.dataList) {
						this.dataList = []
					}
					//查询服务器未读消息，然后本地缓存
					db.collection("tian-mall-message").where(`user_id==$cloudEnv_uid&&type=="${this.type}"`)
						.orderBy("create_date desc")
						.limit(500).get().then(({
							result
						}) => {
							console.log("messageList", result.data)
							this.dataList = result.data;
							//写入缓存，方便下次读取
							uni.setStorage({
								key,
								data: result.data
							})
						})
				}

			},
			readItem(item) {
				if (item.url) {
					//跳转到指定页面
					// this.navTo(item.url)
					//根据item.type跳转到指定页面
				}
				if (item.read) {
					return true;
				}
				item.read = true;
				//更新数据库
				db.collection("tian-mall-message").where(`user_id==$cloudEnv_uid && _id=="${item._id}"`).update({
					read: true
				})
				//更新缓存
				let key = `message_pre_${this.userInfo._id}_${item.type}`
				uni.getStorage({
					key,
					success: ({
						data
					}) => {
						if (data) {
							if (data.badge > 0) {
								data.badge = data.badge - 1;
							}
							if (data._id == item._id) {
								data.read = true;
							}
							uni.setStorageSync(key, data)
						}
					},
				})
				this.$success("消息已读")
			}
		}
	}
</script>

<style lang="scss">
	.title {
		color: #232323;
	}
</style>
