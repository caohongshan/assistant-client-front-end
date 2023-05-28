<template>
	<view>
		<view class="padding-top-20">
			<view v-for="(item,index) in dataList" :key="index" class="ti-flex padding-22 bg-white under-line"
				@click="navTo(item.url)">
				<view class="img">
					<image :src="item.thumb" mode="aspectFill" class="image-width-90"></image>
					<uni-badge v-if="item.badge>0" size="small" type="error" :text="item.badge" class="badge" />
				</view>
				<view class="flex-1 margin-left-20  ">
					<view class="title font-32">
						<text>{{item.title}}</text>
					</view>
					<view class="colorGray font-24 margin-top-10">
						<text>{{item.note}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// const db = uniCloud.database();
	// let msgDb = db.collection("tian-mall-message");
	export default {
		data() {
			return {
				cachePreKey: "message_pre_",
				dataList: [{
					type: "system",
					thumb: "/static/images/message/system.png",
					title: "系统消息",
					note: "",
					badge: 0,
					url: ""
				}, {
					type: "platform",
					thumb: "/static/images/message/platform.png",
					title: "平台消息",
					note: "",
					badge: 0,
					url: ""
				}, {
					type: "coupons",
					thumb: "/static/images/message/coupons.png",
					title: "优惠福利",
					note: "",
					badge: 0,
					url: ""
				}, {
					type: "order",
					thumb: "/static/images/message/order.png",
					title: "订单动态",
					note: "",
					badge: 0,
					url: ""
				}, {
					type: "charge",
					thumb: "/static/images/message/charge.png",
					title: "交易通知",
					note: "",
					badge: 0,
					url: ""
				}]
			};
		},
		onLoad() {
			this.loadData()
			uni.$on('readMsg', e => {
				console.log(e);
			})
		},
		onShow() {
			this.loadLocalData()
		},
		computed: {
			isLogin() {
				return this.$store.getters['user/isTokenValid'];
			},
			userInfo() {
				return this.$store.state.user.userInfo;
			},
		},
		watch: {
			userInfo() {
				this.loadLocalData()
				this.loadData()
			}
		},
		methods: {
			loadLocalData() {
				this.dataList.forEach(item => {
					uni.getStorage({
						key: `${this.cachePreKey}${this.userInfo._id}_${item.type}`,
						success: ({
							data
						}) => {
							item.note = data.title
							item.badge = data.badge
							item.url = `/pages/app/message?type=${item.type}&title=${item.title}`
						},
						fail: () => {
							// console.log("没有缓存" + `${this.cachePreKey}${item.type}`)
							item.note = "暂无消息"
							item.badge = 0
						}
					})
				})
			},
			loadData() {
				if (this.isLogin) {
					//查询服务器未读消息，然后本地缓存
					db.action("message").collection("tian-mall-message").where("user_id==$cloudEnv_uid&&read==false")
						.orderBy("create_date desc")
						.limit(
							500).get().then(({
							result
						}) => {
							//统计各种消息的数量,只保留最后一条，最好在服务器过滤，返回对象结构
							if (result.data) {
								// console.log("messageList", result.data)
								this.dataList.forEach(item => {
									if (result.data[item.type]) {
										// console.log("result.data[item.type]", result.data[item.type])
										//缓存最后一条信息
										let msg = result.data[item.type]
										item.note = msg.title
										item.badge = msg.badge
										item.url = `/pages/app/message?type=${item.type}&title=${item.title}`
										uni.setStorage({
											key: `${this.cachePreKey}${this.userInfo._id}_${item.type}`,
											data: msg
										})
									}
								})
							}
						})
				}
			}
		},

		onPullDownRefresh() {
			this.loadData()
			uni.stopPullDownRefresh()
		},
		async onNavigationBarButtonTap({
			index
		}) {
			console.log(this.isLogin)
			if (!this.isLogin) {
				this.navToLoginNotice(false, false);
				return;
			}
			console.log(index);
			uni.showModal({
				title: '确认清空所有未读消息吗？',
				cancelText: '取消',
				confirmText: '确认',
				success: ({
					cancel
				}) => {
					if (cancel) return false
		/* 			msgDb.where("user_id==$cloudEnv_uid").update({
						read: true
					}).then(() => {
						this.$success("设置成功")
					}); */
					this.dataList.forEach(e => {
						e.badge = 0
						//清空缓存内的read
						let key = `${this.cachePreKey}${this.userInfo._id}_${e.type}`
						uni.getStorage({
							key,
							success: ({
								data
							}) => {
								if (data) {
									data.badge = 0;
									data.read = true;
									uni.setStorageSync(key, data)
								}
							},
						})
					})
				}
			});
		}
	}
</script>

<style lang="scss">
	.img {
		position: relative;
	}

	.badge {
		position: absolute;
		right: -6rpx;
		top: -6rpx;
	}

	.under-line::after {
		left: 130rpx;
	}

	.colorGray {
		color: #999999;
	}
</style>
