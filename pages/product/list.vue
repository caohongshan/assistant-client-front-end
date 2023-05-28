<template>
	<view class="bg-white" :style="pageStyle">
		<tian-search-bar :configs="{openUrl:'/pages/search/search?text=1',searchBackground:'#f9f9f9',disabled:1,back:1,fixed:1,isFirst:1}"
			:placeholder="searchText" />
		<view class="list">
			<tian-goods-list v-if="where" ref="tianGoodsList" :condition="where" :withSku="false" @click="openSku"
				:configs="{loadmore:true,page_size:10,scrollY:false,hasCart: true}" :loadmore="loadmore" />
		</view>
		<tian-goods-sku ref="tianSkuPop" :value="goods" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid: "",
				shop_id: "",
				goods: {},
				searchText: '',
				formData: {
					waterfall: false, // 布局方向切换
					status: 'loading', // 加载状态
				},
				loadmore: 0,
				where: '',
				tipShow: false // 是否显示顶部提示框
			};
		},
		watch: {
			searchText(value) {
				this.search(value);
			}
		},
		computed: {
			listTitle() {
				return this.searchText === '' ? '最热商品' : '搜索结果'
			},
			pageStyle() {
				let { top } = this.systemInfo.custom;
				if (!top) {
					top = 0;
				}
				return `padding-top:${top+12}px;`
			}
		},
		onLoad(options) {
			if (options.cid) {
				this.cid = options.cid;
			}
			if (options.shop_id) {
				this.shop_id = options.shop_id;
				this.search();
			}
			if (options.keywords) {
				getApp().globalData.searchText = options.keywords;
			}
			if (options.name) {
				getApp().globalData.searchText = options.name;
			}
		},
		onShow(options) {
			this.searchText = getApp().globalData.searchText;
		},
		methods: {
			/**
			 * 列表上打开sku
			 * @param {Object} e
			 */
			openSku(e) {
				console.log("openSku", e)
				this.goods = e;
				this.$refs.tianSkuPop.open();
			},
			/**
			 * 切换商品列表布局方向
			 */
			select() {
				this.formData.waterfall = !this.formData.waterfall;
			},
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				/* this.tipShow = true
				this.formData.status = 'more'
				this.$refs.udb.loadData({
					clear: true
				}, () => {
					this.tipShow = false
					uni.stopPullDownRefresh()
				}) */
			},
			/**
			 * 上拉加载回调函数
			 */
			onReachBottom() {
				console.log("onReachBottom")
				this.loadmore = Date.now()
				// this.$refs.udb.loadMore()
				// this.$refs.tianGoodsList.loadMore()
			},
			load(data, ended) {
				if (ended) {
					this.formData.status = 'noMore'
				}
			},
			search(text = '') {
				let conditions = []
				if (text) {
					conditions.push(`name:${new RegExp(text, 'gi')}`)
				}
				if (this.cid) {
					conditions.push(`category_id=="${this.cid}"`)
				}
				if (this.shop_id) {
					conditions.push(`shop_id=="${this.shop_id}"`)
				}
				console.log("search conditions", conditions)
				this.where = conditions.join(" && ")
				// this.where = text ?  : '';
			},
			clear() {
				getApp().globalData.searchText = '';
			},
			searchClick() {
				uni.hideKeyboard();
				uni.navigateTo({
					url: '/pages/search/search',
					animationType: 'fade-in'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #FFFFFF;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.shop {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.shop-picture {
		width: 110px;
		height: 110px;
	}

	.shop-picture-column {
		width: 100%;
		height: 170px;
		margin-bottom: 10px;
	}

	.shop-price {
		margin-top: 5px;
		font-size: 12px;
		color: #ff5a5f;
	}

	.shop-price-text {
		font-size: 16px;
	}

	.hot-tag {
		background: #ff5a5f;
		border: none;
		color: #fff;
	}

	.button-box {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		background: #007AFF;
		color: #fff;
	}

	.uni-link {
		flex-shrink: 0;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}


	// 默认加入 scoped ，所以外面加一层提升权重
	.list {
		padding: 0 $uni-spacing-row-base;

		.uni-list--waterfall {

			/* #ifndef H5 || APP-VUE */
			// 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
			/deep/ .uni-list {
				/* #endif */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 5px;
				box-sizing: border-box;

				/* #ifdef H5 || APP-VUE */
				// h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
				/deep/
				/* #endif */
				.uni-list-item--waterfall {
					width: 50%;
					box-sizing: border-box;

					.uni-list-item__container {
						padding: 5px;
						flex-direction: column;
					}
				}

				/* #ifndef H5 || APP-VUE */
			}

			/* #endif */
		}
	}

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

	/* #ifndef APP-NVUE */
	/deep/
	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE */
	/deep/
	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.list-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #808080;
		margin-top: 20rpx;
	}
</style>
