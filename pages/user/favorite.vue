<template>
	<view class="container">
		<view class="tabs">
			<uni-segmented-control :current="current" :values="navItems" @clickItem="onClickItem" styleType="text"
				activeColor="#dd524d"></uni-segmented-control>
		</view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,hasMore}" collection="tian-mall-favorite"
			@load="loadData" :where="where" :options="configs" orderby="create_date desc" :page-size="20" manual>
			<tian-empty v-if="!loading && data.length == 0" text="暂无数据" marginTop="300"></tian-empty>
			<view class="goods-list" :class="[options.style]">
				<view v-for="(item,index) in data" :key="index" @click="navToDetail(item)">
					<view class="goods" v-if="item.isGoods" :class="{has_description:item.hasDescription}">
						<image :src="item.avatar" mode="aspectFill" class="image-width-80 goods-image"></image>
						<view class="goods-content">
							<view class="title">
								<text>{{item.title}}</text>
							</view>
							<view class=" desc">
								<text>{{item.description}}</text>
							</view>
						</view>
					</view>
					<view class="goods" v-else-if="item.isVideo">
						<view class="flex-1">
							<view class="">
								<view class="title">
									<text>{{item.title}}</text>
								</view>
							</view>
							<view class="margin-top-20 border-radius video">
								<image :src="item.avatar" mode="aspectFill" class="video-image"></image>
								<view class="cover"> </view>
								<image class="video-image-icon" src="/static/play.png" mode="widthFix"></image>
								<!-- <j-video url="item.video" width="660rpx"></j-video> -->
								<!-- <video :src="item.video" class="video"></video> -->
							</view>
						</view>
					</view>
					<view class="goods article" v-else-if="item.isArticle"
						:class="{has_description:item.hasDescription}">
						<image :src="item.avatar" mode="aspectFill" class="image-width-80 goods-image"></image>
						<view class="goods-content">
							<view class="title">
								<text>{{item.title}}</text>
							</view>
							<view class=" desc">
								<text>{{item.description}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more v-if="loading || hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')">
			</uni-load-more>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				configs: {},
				current: -1,
				where: "user_id==$cloudEnv_uid",
				types: [{
						text: "商品",
						value: "goods"
					},
					{
						text: "视频",
						value: "video"
					}, {
						text: "文章",
						value: "article"
					}
				]
			};
		},
		computed: {
			navItems() {
				return this.types.map(e => e.text)
			}
		},
		onLoad() {
			this.onClickItem({
				currentIndex: 0
			})
		},
		onReady() {
			this.$refs.udb.loadData()
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = Number(e.currentIndex);
					//切换内容
					let item = this.types[this.current]
					console.log(item)
					this.where = `user_id==$cloudEnv_uid && type=="${item.value}"`
					// this.$refs.udb.loadData({
					// 	clear: true
					// })
				}
			},
			loadData(data) {
				//处理图片尺寸 | thumbImg('80x80')
				let time = "";
				data.forEach(item => {
					item.isGoods = item.type.indexOf("goods") != -1
					item.isVideo = item.type.indexOf("video") != -1
					item.isArticle = item.type.indexOf("article") != -1
					let create_date = this.$dateFormat("Y-m-d", item.create_date)
					if (create_date != time) {
						item.groupTime = time = create_date
					}
					//最多30个字
					item.title = item.title ? item.title.substr(0, 30) : "";
					if (item.isVideo) {
						item.avatar = this.$thumbImg(item.avatar, '668x400')
					} else {
						item.avatar = this.$thumbImg(item.avatar, '260x260')
					}
					if (item.description) {
						item.description = item.description.replace(/\r\n/g, "")
						item.hasDescription = true;
					}
				})
				console.log("goods loadData", data)
			},
			navToDetail(item) {
				console.log("item", item)
				if (item.isGoods) {
					//商品详情
					this.navTo("/pages/product/detail?id=" + item.id)
				} else if (item.isArticle) {
					//文章详情
					this.navTo("/uni_modules/tian-article/pages/article/detail?id=" + item.id)
				}
			}
		}
	}
</script>


<style lang="scss">
	page {}

	.container {
		position: relative;
	}

	.tabs {
		position: sticky;
		z-index: 2;
		top: var(--window-top);
		background: #fff;
		padding-bottom: 6rpx;
	}

	.goods-list-container {
		background: $uni-bg-color;

		&.style-padding {
			background: none;
		}

		&.style-gride {
			background: none;
		}
	}

	.video {
		height: 400rpx;
		overflow: hidden;
		background: #999999;
		position: relative;

		.cover {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: #0000004a;
		}

		.video-image {
			height: 400rpx;
			width: 668rpx;
			position: absolute;
			border-radius: 12rpx;
		}

		.video-image-icon {
			position: absolute;
			top: 30%;
			left: 40%;
			width: 120rpx;
			height: 120rpx;
		}
	}

	.goods-list {
		margin-top: 12rpx;
		padding: 10rpx 26rpx 10rpx 16rpx;

		.goods {
			background: #fff;
			border-radius: 12rpx;
			padding: 20rpx;
			display: flex;
			position: relative;
			margin-bottom: 20rpx;
			align-items: center;
		}

		.has_description {
			align-items: inherit;
		}

		.miaosha-cover {
			position: absolute;
			left: 0;
			top: 0;
			width: 100rpx;
			z-index: 2;
		}

		.goods-image {
			display: inline-block;
			width: 90rpx;
			height: 90rpx;
			border-radius: 12rpx;
		}

		.goods-content {
			flex: 1;
			margin-left: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.desc {
			color: #999999;
			font-size: 24rpx;
		}

		.title {
			font-size: 28rpx;
		}

		&.style-padding {
			background: none;
			margin: $uni-spacing-row-base;
			padding: 0;

			.goods {
				background: $uni-bg-color;
				margin-bottom: $uni-spacing-row-base;
				padding: $uni-spacing-row-base;
				border-radius: $uni-border-radius-base;
			}
		}

		&.style-gride {
			display: flex;
			flex-wrap: wrap;
			padding: 0 $uni-spacing-row-base;
			margin-top: $uni-spacing-row-base;

			.goods {
				background: $uni-bg-color;
				width: calc(50% - 14rpx);
				padding: 0 0 $uni-spacing-row-base;
				display: block;
				overflow: hidden;
				border-radius: $uni-border-radius-lg;
				margin-bottom: $uni-spacing-row-base;

				.goods-content {
					margin: 0 $uni-spacing-row-base;
				}

				.goods-image {
					width: 100%;
					height: 350rpx;
				}

				&:nth-child(2n) {
					margin-left: 24rpx;
				}
			}
		}
	}
</style>
