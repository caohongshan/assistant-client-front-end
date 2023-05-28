<template>
	<view class="ti-flex flex-column container">
		<view class="search">
			<tian-search-bar placeholder="搜索商品" bg_color="#f5f5f5" :disabled="true"
				@click="navTo('/pages/search/search')"></tian-search-bar>
		</view>
		<view class="main-category-panel-all under-line padding-top-22">
			<scroll-view class="scroll-view_H" scroll-x="true" :scroll-left="options.scrollLeft"
				:scroll-into-view="options.sv" :scroll-with-animation="true">
				<view v-for="(item, index) in categories" :key="index" @click="changeMainCategory(item)"
					class="scroll-view-item_H" :class="{ current: item._id == options.mainCurrentId }"
					:id="'sub_'+item._id">
					<image :src="item.icon" mode="aspectFill" class="image-width-80"></image>
					<view class="font-26 text">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="content flex-1 ti-flex">
			<view class="sub-category">
				<scroll-view scroll-y="true" :scroll-top="options.scrollTop" :scroll-with-animation="true">
					<view v-for="(item,index) in subCategories" :key="index" class="item"
						:class="{current:item._id == options.subCurrentId}" @click="changeSubCategory(item,index)">
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="goods-list-panel">
				<tian-goods-list v-if="options.subCurrentId" :withSku="false" :condition="goodsCondition"
					@click="openSku" :configs="{loadmore:true,page_size:22,scrollY:true}"></tian-goods-list>
			</view>
		</view>
		<tian-goods-sku :value="goods" ref="tianSkuPop"></tian-goods-sku>
	</view>
</template>

<script>
	const db = uniCloud.database();
	import tabbarMixin from './mixin/tabbar'
	export default {
		mixins: [tabbarMixin],
		data() {
			return {
				goods: {},
				categories: [],
				subCategories: [],
				subCateHeight: 100,
				options: {
					scrollLeft: 0,
					scrollTop: 0,
					sv: "",
					mainCurrentId: "",
					subCurrentId: ""
				}
			};
		},
		onLoad(e) {
			if (e.id) {
				this.options.mainCurrentId = e.id;
			}
			//选中主分类触发器
			uni.$on('changeMainCid', (e) => {
				//默认选中id,没有点击分类之前，是没有这个事件的
				this.changeMainCategory({
					_id: e
				})
			});
			this.loadData()
		},
		computed: {
			goodsCondition() {
				console.log("change goods condition")
				return `category_id=="${this.options.subCurrentId}"`
			}
		},
		onShow() {},
		onHide() {
			//防止弹窗隐藏了导航栏
			uni.showTabBar()
			setTimeout(() => {
				this.$refs.tianSkuPop.close();
			}, 500)
		},
		methods: {
			loadData() {
				db.collection("opendb-mall-categories").where("status==true").field("parent_id,name,icon,sort").orderBy(
					"sort asc").get({
					getTree: true
				}).then(({
					result
				}) => {
					result.data.forEach((item, mIndex) => {
						item.icon = this.$thumbImg(item.icon, '80x80');
						//默认第一个选中
						if (!this.options.mainCurrentId && mIndex == 0) {
							this.options.mainCurrentId = item._id;
							this.subCategories = item.children;
						} else if (this.options.mainCurrentId == item._id) {
							this.subCategories = item.children;
						}
						item.children.forEach((child, index) => {
							//默认第一个选中
							if (index == 0 && mIndex == 0) {
								console.log("默认选中", child._id)
								this.options.subCurrentId = child._id;
							}
						})
					})
					this.categories = result.data;
				})
			},
			changeMainCategory(item) {
				let index = this.categories.findIndex(e => e._id == item._id);
				if (index == -1) {
					//主分类id不在范围内
					console.log("主分类id不在范围内", item)
					return false;
				} else if (this.options.mainCurrentId == item._id) {
					console.log("重复点击无效", item)
					return false;
				}
				this.options.mainCurrentId = item._id
				console.log("item._id", index, item._id)
				this.subCategories = this.categories[index].children;
				// this.subCateHeight = this.subCategories.length * 40;
				if (this.subCategories.length > 0) {
					this.options.subCurrentId = this.subCategories[0]._id;
				} else {
					//没有子分类，默认查询主分类商品
					this.options.subCurrentId = this.options.mainCurrentId;
				}
				setTimeout(() => {
					this.options.scrollLeft = index * 60 - 50;
					//console.log("this.options.scrollLeft", this.options.scrollLeft)
				}, 300)
			},
			changeSubCategory(item, index) {
				this.options.subCurrentId = item._id;
				setTimeout(() => {
					this.options.scrollTop = index * 30 - 60;
					//console.log("this.options.scrollLeft", this.options.scrollTop)
				}, 300)
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
		}
	}
</script>

<style lang="scss">
	page {
		background: $uni-bg-color;
		height: 100%;
		width: 100%;
	}

	.container {
		height: 100%;
		width: 100%;
	}

	.container>view {
		width: 100%;
	}

	.scroll-view_H {
		// width: calc(100% - 22rpx);
		padding-bottom: $uni-spacing-col-base;
	}

	.scroll-view-item_H {
		padding-left: $uni-spacing-row-base;

		&:last-child {
			padding-right: $uni-spacing-row-base;
		}

		.text {
			margin-top: 8rpx;
			padding: 0rpx $uni-spacing-row-sm;
			line-height: 1.4;
		}

		&.current {
			.text {
				background: $uni-red;
				color: #FFFFFF;
				border-radius: 12rpx;
			}
		}
	}

	.content {
		height: 600rpx;
	}

	.sub-category {
		// border-top: 2rpx solid $uni-bg-color-grey;
		width: 150rpx;
		height: 100%;
		background: $uni-bg-color-grey;

		scroll-view {
			height: 100%;
		}

		.item {
			font-size: 22rpx;
			text-align: center;
			line-height: 80rpx;

			&.current {
				background: $uni-bg-color;
				color: $uni-red;
				font-weight: 600;
			}
		}
	}

	.goods-list-panel {
		width: 100%;
		height: 100%;
		flex: 1;
	}
</style>
