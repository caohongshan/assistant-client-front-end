<template>
	<view class="" @click="bgClick">
		<tian-title v-if="configs.withTitle" :title="configs.headerTitle" :underLine="configs.headerUnderLine" />
		<view :style="bgStyle">
			<scroll-view :scroll-y="!!configs.scrollY" style="height: 100%;" @scrolltolower="scrolltolower">
				<view class="goods-list-container" :class="[options.style, options.bgClassName]">
					<view class="goods-list waterfall" v-if="options.waterfall" :class="[options.style]">
						<view class="left">
							<!-- 第一页的前2张图片高度要高一些 ，就能形成错位效果-->
							<view v-for="(item, index) in dataList" :key="index" class="under-line goods"
								:class="options.itemClassName" v-if="index % 2 == 0">
								<tian-goods-image-cover :item="item"></tian-goods-image-cover>
								<image :src="item.banner_path" mode="aspectFill" class="image-width-168 goods-image"
									:style="item.style" :class="options.imageClassName" @click="navToDetail(index)">
								</image>
								<view class="goods-content">
									<view class="title text-2" @click="navToDetail(index)">
										<text>{{ item.name }}</text>
									</view>
									<view class="desc colorGray font-24 text-2 padding-top-8" v-if="item.goods_summary">
										<text>{{ item.goods_summary }}</text>
									</view>
									<tian-goods-price :hasCart="item.hasCart" :hasSaleCount="item.hasSaleCount"
										:value="item" @click="openSku(index)" :showWholesale="configs.wholesale" />
								</view>
							</view>
						</view>
						<view class="right">
							<view v-for="(item, index) in dataList" :key="index" class="under-line goods"
								:class="options.itemClassName" v-if="index % 2 != 0">
								<tian-goods-image-cover :item="item"></tian-goods-image-cover>
								<image :src="item.banner_path" mode="aspectFill" class="image-width-168 goods-image"
									:style="item.style" :class="options.imageClassName" @click="navToDetail(index)">
								</image>
								<view class="goods-content">
									<view class="title text-2" @click="navToDetail(index)">
										<text>{{ item.name }}</text>
									</view>
									<view class="desc colorGray font-24 text-2 padding-top-8" v-if="item.goods_summary">
										<text>{{ item.goods_summary }}</text>
									</view>
									<tian-goods-price :hasCart="item.hasCart" :hasSaleCount="item.hasSaleCount"
										:value="item" @click="openSku(index)" :showWholesale="configs.wholesale" />
								</view>
							</view>
						</view>
					</view>
					<view v-else class="goods-list" :class="[options.style]">
						<view v-for="(item, index) in dataList" :key="index" class="under-line goods"
							:class="options.itemClassName">
							<tian-goods-image-cover :item="item"></tian-goods-image-cover>
							<image :src="item.banner_path" mode="aspectFill" class="image-width-168 goods-image"
								:style="item.style" :class="options.imageClassName" @click="navToDetail(index)"></image>
							<view class="goods-content">
								<view class="title" @click="navToDetail(index)">
									<text class="text-2">{{ item.name }}</text>
								</view>
								<view class="desc colorGray font-24 text-2 padding-top-8" v-if="item.goods_summary">
									<text>{{ item.goods_summary }}</text>
								</view>
								<view class="miaosha-process ti-flex"
									v-if="options.showMiaosha && item.miaosha && item.miaosha.is_begin">
									<progress activeColor="#ff3b00" :active="true" class="progress-box"
										:percent="item.miaosha.progress"></progress>
									<text class="colorGray margin-left-30 font-24">已售{{ item.miaosha.progress }}%</text>
								</view>
								<tian-goods-price :hasCart="item.hasCart" :showListMiaosha="options.showMiaosha"
									:hasSaleCount="item.hasSaleCount" :value="item" @click="openSku(index)"
									:showWholesale="configs.wholesale" />
							</view>
						</view>
					</view>
				</view>
				<tian-empty v-if="!loading && dataList.length == 0" text="暂无数据" marginTop="200" />
				<uni-load-more v-else-if="options.loading" status="loading" />
				<uni-load-more v-else-if="options.loadmore" :status="loading ? 'loading' : hasMore ? 'more' : 'noMore'" />
				<tian-goods-sku v-if="withSku" :value="goods" ref="tianSkuPop" />
			</scroll-view>
		</view>
	</view>
</template>

<script>
	/**
	 * 商品列表，
	 * 左图右文字，两图，一大图
	 * @param {String} category_id 分类id
	 */
	export default {
		data() {
			return {
				isItemClick: false,
				bgStyle: '',
				page_no: 0,
				loading: true,
				hasMore: true,
				goods: {},
				dataList: []
			};
		},
		props: {
			configs: {
				type: Object,
				default: () => {
					return {
						condition: '',
						checkLocation: true,
						loadmore: false,
						loading: false,
						withTitle: false,
						headerUnderLine: false,
						hasCart: true,
						headerTitle: '',
						waterfall: false, //2022-04-28是否瀑布流展示
						bgClassName: 'none',
						itemClassName: 'none',
						imageClassName: 'none',
						style: '', //style-gride,style-padding
						image_size: '260x260',
						page_size: 20,
						scrollY: false,
						showMiaosha: false
					};
				}
			},
			condition: {
				type: [String, Object],
				default: ''
			},
			withSku: {
				type: Boolean,
				default: true
			},
			refresh: {
				type: Number,
				default: 0
			},
			loadmore: {
				type: Number,
				default: 0
			},
			detailUrl: {
				type: String,
				default: '/pages/product/detail'
			}
		},
		computed: {
			where() {
				let conditions = ['is_on_sale==true'];
				if (this.configs && this.configs.condition) {
					conditions.push(`(${this.configs.condition})`);
				}
				console.log('where computed');
				if (this.condition) {
					if (typeof this.condition == 'object') {
						return {
							...this.condition,
							is_on_sale: true
						};
					} else {
						conditions.push(`(${this.condition})`);
					}
				}
				return conditions.join(' && ');
			},
			options() {
				return {
					...this.configs
				};
			},
			orderby() {
				if (this.configs && this.configs.order) {
					return this.configs.order;
				}
				return 'last_modify_date desc';
			}
		},
		watch: {
			loadmore() {
				this.scrolltolower();
			},
			configs(newVal) {
				// console.log('goods list configs', newVal);
			},
			condition(newVal) {
				// console.log('goods list condition', newVal);
				this.page_no = 0
				this.loadMoreData();
				console.log("重新加载商品列表数据")
			}
		},
		created() {
			this.loadMoreData();
		},
		methods: {
			bgClick() {
				if (!this.isItemClick && this.configs.top_url) {
					console.log('bg click');
					this.navTo(this.configs.top_url);
				}
			},
			loadData(data, ended, pagination) {
				console.log('goods list', data, ended, pagination);
				//处理图片尺寸 | thumbImg('80x80')
				data.forEach((item, index) => {
					item.style = '';
					item.hasCart = this.configs.hasCart && !!item.is_real;
					item.hasSaleCount = false;
					let imageSize = this.configs.image_size || '260x260';
					if (this.configs.waterfall && index / 2 < 2 && index % 2 == 0 && pagination.current == 1) {
						//第一页的前2张图片高度要高一些 ，就能形成错位效果
						let [width, height] = imageSize.split('x');
						imageSize = [width, height * 1 + 40].join('x');
					}
					item.banner_path = this.$thumbImg(item.goods_thumb, imageSize);
					if (this.configs.style == 'style-big-image') {
						if (item.goods_banner && item.goods_banner.path) {
							let banner = item.goods_banner;
							if (imageSize) {
								let [width] = imageSize.split('x');
								//等宽缩放
								let height = parseInt((banner.image.height * width) / banner.image.width);
								item.style = `width:${width}rpx;height:${height}rpx;`;
								item.banner_path = this.$thumbImg(banner.path, `${width}x${height}`);
							} else {
								//不做裁剪
								item.banner_path = banner.path;
								item.style = `width:${banner.image.width}rpx;height:${banner.image.height}rpx;`;
							}
						}
						if (!item.is_real) {
							item.hasSaleCount = true;
						}
					} else {
						//最多30个字
						let [width, height] = imageSize.split('x');
						item.style = `width:${width}rpx;height:${height}rpx;`;
						item.name = item.name ? item.name.substr(0, 30) : '';
					}
					item.imageSize = imageSize;
				});

				// console.log("goods loadData", data)
				if (this.configs.background_img) {
					// console.log("this.configs.background_img", this.configs.background_img)
					this.bgStyle =
						`background-image:url(${this.configs.background_img}) ; background-repeat: no-repeat;    background-size: 100%;`;
				}
				if (pagination.current == 1) {
					this.dataList = [];
				}
				//最终的数据列表
				this.dataList = this.dataList.concat(data);
				//2列显示
				// if (this.configs.waterfall) {
				// 	let left = [],
				// 		right = []
				// 	data.map((e, index) => {
				// 		if (index % 2 == 0) {
				// 			left.push(e)
				// 		} else {
				// 			right.push(e)
				// 		}
				// 	})
				// 	data[0] = left;
				// 	data[1] = right;
				// 	console.log("goods loadData", data)
				// }
			},
			scrolltolower() {
				console.log('goods scrolltolower');
				//查询下一页
				if (this.configs.loadmore) {
					// this.$refs.udb.loadMore();
					this.loadMoreData();
				}
			},
			loadMoreData() {
				this.page_no++;
				let page_size = this.configs.page_size ? this.configs.page_size : 20;
				this.loading = true;
				console.log('goods loadmore');
				// this.$refs.udb.loadMore();
				const whereArr = this.where.split(" && ");
				console.log("whereArr==", whereArr)
				this.$request('mall/goods/goodsList', {
					where: {
						is_on_sale: whereArr[0].split("==")[1] == 'true',
						// name: whereArr[1].replace(/^\(|\)$/g, "").split(":")[1]
					},
					orderby: this.orderby,
					page_no: this.page_no,
					page_size
				}).then(result => {
						console.log(result);
						this.loadData(result, result.length != page_size, {
							current: this.page_no,
							size: page_size
						});
						this.loading = false;
						this.hasMore = result.length == page_size;
					});
			},
			navToDetail(index) {
				let item = this.dataList[index];
				this.navTo(this.detailUrl + '?id=' + item._id, item);
			},
			openSku(index) {
				let item = this.dataList[index];
				if (this.withSku) {
					this.goods = item;
					this.$refs.tianSkuPop.open();
				} else {
					this.$emit('click', item);
				}
				this.isItemClick = true;
				setTimeout(() => {
					this.isItemClick = false;
				}, 2000);
				return false;
			}
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.goods-list-container {
		background: $uni-bg-color;
		height: 100%;
		// margin-left: $uni-spacing-row-base;//2022-08-25电商首页左右不对称
		// padding-top: 8rpx;
		border-radius: $uni-border-radius-base;

		&.style-padding {
			background: none;
		}

		&.style-gride {
			background: none;
		}

		&.full {
			margin: 0;
			border-radius: 0;
		}

		.goods-list {
			// padding: 10rpx 26rpx 10rpx 16rpx;

			.desc {
				// display: none;
			}

			.under-line:nth-last-child(1)::after {
				display: none;
			}

			.goods {
				margin-bottom: 12rpx;
				padding: 0 0 14rpx;
				display: flex;
				position: relative;
			}

			.goods-image {
				display: inline-block;
				width: 168rpx;
				height: 168rpx;
				border-radius: 12rpx;
			}

			.goods-content {
				flex: 1;
				margin-left: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.miaosha-process {
				.progress-box {
					width: 200rpx;
				}
			}

			&.style-padding {
				background: none;
				margin: $uni-spacing-row-base;
				margin-top: 0;
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
				// padding: 0 $uni-spacing-row-base;
				// margin-top: $uni-spacing-row-base;

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
						border-radius: 12rpx 12rpx 0 0;
					}

					&:nth-child(2n) {
						margin-left: 24rpx;
					}
				}
			}

			&.style-big-image {
				padding: 0;

				.desc {
					display: block;
				}

				.goods {
					padding: 0;
					display: block;
					background: #ffffff;
					margin-bottom: 22rpx;
					border-radius: 22rpx;
					padding-bottom: 16rpx;

					.title {
						font-size: 34rpx;
						font-weight: 500;
					}

					.goods-image {
						width: 100%;
						height: 300rpx;
						margin: 0 auto;
						display: block;
						border-radius: 22rpx 22rpx 0 0;
					}

					.goods-content {
						margin-top: 16rpx;
						margin-right: 24rpx;
					}
				}
			}

			&.waterfall {
				display: flex;

				.left {
					width: calc(50% - 8px);
				}

				.right {
					width: calc(50% - 8px);
					margin-left: 24rpx;
				}

				.goods-image {
					width: 100% !important;
				}

				.under-line::after {
					display: none;
				}

				.goods {
					width: 100%;

					&:nth-child(2n) {
						margin-left: 0rpx;
					}
				}
			}
		}
	}
</style>
