<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" collection="uni-id-address"
			where="user_id==$cloudEnv_uid"
			field="user_id,name,alias,mobile,mobile_area_code,province_code,city_code,area_code,address,formatted_address,zip_code,email,is_default"
			orderby="update_date desc" @load="loaded">
			<tian-empty v-if="!loading && data.length == 0" text="暂无收货地址" marginTop="200"></tian-empty>
			<view v-else-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<uni-list :border="false">
					<uni-list-item v-for="(item, index) in data" :key="index" showArrow :clickable="true"
						@click="navToEdit(item)" class="">
						<view slot="body">
							<view class="">
								<text>{{item.name}}</text>
								<text class="margin-left-20 font-28">{{item.mobile}}</text>
								<uni-tag text="默认" class="margin-left-20 " size="mini" type="warning"
									v-if="item.is_default"></uni-tag>
							</view>
							<view class="font-24 colorGray margin-top-8">
								<text>{{item.formatted_address}}</text>
								<text>{{item.address}}</text>
							</view>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<uni-load-more v-if="hasMore" :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>

		<view class="uni-button-group">
			<button type="primary" class="uni-button" @click="fabClick">新增地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source: "", //来源，settlement，
				autoRedirect: true,
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				}
			}
		},
		onLoad(e) {
			if (e.source) {
				this.source = e.source;
			}
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
			loaded(data) {
				if ((!data || data.length == 0) && this.autoRedirect) {
					//自动跳转新增
					this.navTo('./add')
				}
			},
			loadData() {
				this.autoRedirect = false;
				this.$refs.udb.loadData({
					clear: true
				})
			},
			navToEdit(item) {
				if (this.source == "settlement") {
					//选中地址，
					this.getOpenerEventChannel().emit('addData', {
						address: item,
						address_id: item._id
					})
					setTimeout(() => uni.navigateBack(), 500)
				} else {
					this.navTo('./edit?id=' + item._id, item);
				}
			},
			fabClick() {
				this.navTo('./add')
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: $uni-spacing-row-base;
		padding-bottom: calc(var(--window-bottom) + 120rpx);
	}

	.uni-button-group {
		position: fixed;
		bottom: calc(var(--window-bottom) + 40rpx);
		left: 70rpx;
		right: 70rpx;
		display: flex;

		.uni-button {
			flex: 1;
		}
	}
</style>
