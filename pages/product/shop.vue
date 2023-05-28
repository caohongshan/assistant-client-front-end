<template>
	<page-meta>
		<navigation-bar :title="item.name" front-color="#000000" background-color="#ffffff"
			color-animation-timing-func="easeIn" />
	</page-meta>
	<view class="container">
		<!-- #ifndef MP -->
		<view class="banner" :style="bannerStyle">
			<image :src="banner" mode="aspectFill" class="image"></image>
		</view>
		<!-- #endif -->
		<view class="ti-flex padding-22 header">
			<image :src="item.src" mode="aspectFill" class="image-width-120 border-radius"></image>
			<view class="flex-1 margin-left-16">
				<view class="font-32">
					<text class="">{{item.name}}</text>
				</view>
				<view class="font-24 margin-top-10">
					<text>评分</text>
					<text class="colorRed margin-left-4">{{item.score_text}}</text>
					<text class="margin-left-10">月售</text>
					<text class="colorRed margin-left-4">{{item.month_sell_text}}</text>
					<!-- <text class="margin-left-10">关注</text>
					<text class="colorRed margin-left-4">{{item.focus_text}}</text>
					<text class="margin-left-4">人</text> -->
				</view>
			</view>
		</view>
		<view class="tabs ti-flex">
			<view class="tab flex-1" :class="{current:index==1}" @click="selectTab(1)">
				<text>店铺首页</text>
			</view>
			<view class="tab flex-1" :class="{current:index==2}" @click="selectTab(2)">
				<text>全部商品</text>
			</view>
			<view class="tab flex-1" :class="{current:index==3}" @click="selectTab(3)">
				<text>分类查看</text>
			</view>
		</view>
		<view class="home padding-top-20" v-if="index==1">
			<tian-pages :configs="pageConfigs" :condition="where" :refresh="refresh" :loadmore="loadmore">
			</tian-pages>
		</view>
		<view class="tab-content padding-22" v-else-if="index==2">
			<tian-goods-list ref="tianGoodsList" :condition="where" :withSku="false" @click="openSku"
				:configs="{loadmore:true,page_size:10,scrollY:false,order:'remain_count desc,total_sell_count desc'}"
				:loadmore="loadmore">
			</tian-goods-list>
		</view>
		<view class="tab-content" v-else-if="index==3">
			<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,hasMore}"
				collection="opendb-mall-categories" @load="loadCategoryData" field="shop_id,name,sort"
				:where="categoryWhere" :page-size="500" orderby="sort asc" :gettree="true">
				<tian-empty v-if="!loading && data.length == 0" text="暂无分类数据" marginTop="200"></tian-empty>
				<view class="category-list">
					<view v-for="(item,index) in data" :key="index" class="under-line padding-22">
						<view class="font-30 ti-flex">
							<text class="title-icon"></text>
							<text>{{item.name}}</text>
						</view>
						<view class="children">
							<view v-for="(child,index1) in item.children" :key="index1" class="item"
								@click="navTo('/pages/product/list?shop_id='+child.shop_id+'&cid='+child._id+'&name='+child.name)">
								<text>{{child.name}}</text>
							</view>
						</view>
					</view>
				</view>
			</unicloud-db>
		</view>
		<tian-goods-sku :value="goods" ref="tianSkuPop"></tian-goods-sku>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				index: 0,
				id: "",
				pageConfigs: {
					parent_id: "61d6b6781b2236000133a3c6",
					shop_id: ""
				},
				item: {},
				goods: {},
				refresh: 0,
				loadmore: 0,
				where: "",
				categoryWhere: "",
			};
		},
		computed: {
			banner() {
				if (this.item.banner) {
					return this.item.banner;
				}
				return "/static/images/banner.jpg"
			},
			bannerStyle() {
				// return `padding-top:${this.systemInfo.navigationBarHeight}px;`
			}
		},
		onShow() {
			getApp().globalData.searchText = ""
		},
		onLoad(e) {
			this.id = e.id;
			this.where = `shop_id=="${this.id}"`;
			this.categoryWhere = `shop_id=="${this.id}" && status==true`;
			this.pageConfigs.shop_id = e.id;
			this.item = this.getItemData();
			//店铺自定义装修
			if (this.item.page_id) {
				this.pageConfigs.parent_id = this.item.page_id;
			}
			this.loadData()
		},
		methods: {
			loadCategoryData(data) {
				console.log(data)
			},
			loadData() {
				//查询店铺信息
				db.collection("tian-mall-shops").doc(this.id).field(
						"id,name,src,banner,month_sell,focus,state,score,online,page_id")
					.get({
						getOne: true
					}).then(({
						result
					}) => {
						this.item = this.setShopDefaultData(result.data);
						//店铺自定义装修
						if (this.item.page_id) {
							this.pageConfigs.parent_id = this.item.page_id;
						}
						this.selectTab(1);
					})
			},
			setShopDefaultData(data) {
				let fields = ["focus", "month_sell", "score"]
				fields.map(key => {
					if (!data[key]) {
						data[key + "_text"] = 0
					} else {
						data[key + "_text"] = data[key]
					}
					if (key == "score" && data[key] > 3) {
						data[key + "_text"] = data[key] + " 高"
					} else if (data[key] > 100000) {
						data[key + "_text"] = parseInt(data[key] / 10000) + "万"
					}
				})
				return data;
			},
			selectTab(index) {
				this.index = index;
				//商品查询条件
				if (index == 1) {} else if (index == 2) {} else if (index == 3) {
					//显示分类
				}
			},
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
			 * 上拉加载回调函数
			 */
			onReachBottom() {
				console.log("onReachBottom")
				this.loadmore = Date.now()
			},
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
	}

	.banner {
		background: #FFFFFF;
		height: calc(var(--status-bar-height) + 180rpx);
		overflow: hidden;

		.image {
			width: 750rpx;
			height: 260rpx;
		}
	}

	.header {
		margin: 0 auto;
		width: 90%;
		margin-top: 20rpx;
		// #ifndef MP
		margin-top: -80rpx;
		// #endif
		background: #FFFFFF;
		position: relative;
		z-index: 9;
		border-radius: 12rpx;

	}

	.tabs {
		position: sticky;
		top: calc(var(--status-bar-height) + 80rpx);
		z-index: 9;
		text-align: center;
		padding: 20rpx 60rpx 20rpx;
		background: #fff;
		margin-top: 20rpx;

		.current {
			color: $uni-color-error;
		}
	}

	.tab-content {
		margin: 22rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background: #FFFFFF;

		.title-icon {
			background: $uni-color-error;
			width: 6rpx;
			height: 28rpx;
			display: inline-block;
			margin-right: 12rpx;
			border-radius: 4rpx;
		}

		.children {
			display: flex;
			flex-wrap: wrap;

			.item {
				margin-right: 12rpx;
				width: 282rpx;
				background: $uni-bg-color-grey;
				margin-top: 16rpx;
				padding: 12rpx 18rpx;
				border-radius: 8rpx;
			}
		}
	}
</style>
