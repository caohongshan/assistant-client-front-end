<template>
	<view>
		<view class="header">
			<view class="ti-flex" v-if="item.state">
				<tian-icons :type="item.state.icon" align="right" size="30" color="#ffffff"> </tian-icons>
				<view class="flex-1 margin-left-6">
					<text class="font-40">{{item.state.text}}</text>
					<view class="font-20 margin-top-12" v-if="item.state.content">
						<text>{{item.state.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="item address ti-flex" v-if="item.address">
			<tian-icons type="shouhuodizhi1" align="right" color="#eb4e38" size="30" />
			<view class="flex-1 margin-left-6">
				<view class="" @click="tel(item.address.mobile)">
					<text class="font-36">{{item.address.name}}</text>
					<text class="margin-left-10">{{item.address.mobile}}</text>
					<tian-icons type="dianhua" color="#eb4e38" class="margin-left-10" />
				</view>
				<view class="font-24 margin-top-12 colorGray">
					<text>{{item.address.formatted_address}}</text>
					<text>{{item.address.address}}</text>
				</view>
			</view>
		</view>
		<view class="address item" v-if="item.pickUpCode">
			<view class="ti-flex font-32 padding-lr-24 padding-top-10">
				<text class="flex-1">账号</text>
				<text class="flex-1">密码</text>
			</view>
			<view class="ti-flex font-32  padding-top-10 colorRed" v-for="(puc,index2) in item.pickUpCode"
				:key="index2">
				<text class="flex-1" selectable>{{puc.account}}</text>
				<text class="flex-1" selectable>{{puc.password}}</text>
				<text v-if="puc.isUse">已使用</text>
				<text v-else class="colorGreen">未使用</text>
			</view>
		</view>
		<view class="item">
			<view class="ti-flex">
				<view class="flex-1">
					<text>订单编号：</text>
					<text selectable>{{item.id}}</text>
				</view>
				<text class="colorRed margin-left-16" @click="copy(item.id)">复制</text>
			</view>
			<view class="margin-top-12">
				<text>下单时间：</text>
				<uni-dateformat class="font-20" :date="item.create_time" format="yyyy-MM-dd hh:mm:ss"
					:threshold="[0, 0]" />
			</view>
			<view class="margin-top-12" v-if="item.payInfo">
				<text>支付时间：</text>
				<uni-dateformat class="font-20" :date="item.payInfo.time" format="yyyy-MM-dd hh:mm:ss"
					:threshold="[0, 0]" />
			</view>
			<view class="margin-top-12" v-if="item.invoice" @click="copy(item.invoice)">
				<text>发票抬头：</text>
				<text>{{item.invoice}}</text>
			</view>
			<view class="margin-top-12" v-if="item.invoice_code" @click="copy(item.invoice_code)">
				<text>发票识别码：</text>
				<text>{{item.invoice_code}}</text>
			</view>
		</view>
		<view class="item">
			<view class="ti-flex">
				<view class="flex-1">
					<text>商品小计：</text>
				</view>
				<text class="price normal">{{item.goods_total_fee/100}}</text>
			</view>
			<view class="margin-top-12 ti-flex">
				<view class="flex-1">
					<text>商品运费：</text>
				</view>
				<text class="price normal">{{item.freight/100}}</text>
			</view>
			<view class="margin-top-12 ti-flex">
				<view class="flex-1">
					<text>积分兑换：</text>
				</view>
				<text class="margin-right-12">{{item.score}}</text>
			</view>
			<view class="margin-top-12 ti-flex">
				<view class="flex-1">
					<text>总优惠：</text>
				</view>
				<text>-</text>
				<text class="price normal">{{item.discount/100}}</text>
			</view>
			<view class="margin-top-12 ti-flex font-36">
				<view class="flex-1">
					<text>实付：</text>
				</view>
				<text class="price font-36">{{item.total_fee/100}}</text>
			</view>
		</view>
		<view class="padding-lr-20 bg-white padding-top-10 padding-bottom-20">
			<view v-for="(goods,index2) in item.goods" :key="index2" class="ti-flex margin-top-12 ">
				<image :src="goods.goods_thumb" mode="aspectFill" class="image-width-120 border-radius">
				</image>
				<view class="flex-1 padding-left-12">
					<view class="">
						<text selectable>{{goods.name}}</text>
					</view>
					<view class="">
						<text class="font-24">{{goods.sku_name}}</text>
					</view>
					<view class="ti-flex between">
						<view class="">
							<text class="price">{{goods.price/100}}</text>
							<text v-if="goods.use_score" class="font-20">+{{goods.use_score}}</text>
							<text class="margin-left-10">x{{goods.amount}}</text>
						</view>
						<view class="">
							<button type="default" size="mini" v-if="goods.canRefund" @click="refundGoods(item,goods)"
								class="margin-left-10">申请售后</button>
							<text v-if="goods.is_refunding" class="colorRed margin-right-12">售后处理中</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<block v-if="item.delivers && item.delivers.length > 1">
			<view class="font-24 ti-flex padding-24 tabs">
				<view v-for="(deli,index2) in item.delivers" :key="index2" class="delivers"
					@click="showExpress(deli,index2)" :class="{current:expressIndex==index2}">
					<text class="font-30">{{deli.company}}</text>
					<view class="">
						<text>{{deli.number}}</text>
					</view>
				</view>
			</view>
			<!-- //显示对于的商品 -->
			<view v-for="(goods,index3) in expressGoods" :key="index3" class="ti-flex  padding-20 bg-white">
				<image :src="goods.goods_thumb" mode="aspectFill" class="image-width-120 border-radius"></image>
				<view class="flex-1 padding-left-12">
					<view class="font-24">
						<text>{{goods.name}}</text>
					</view>
					<view class="">
						<text class="font-24">{{goods.sku_name}}</text>
					</view>
					<view class="ti-flex between">
						<text class="price">{{goods.price/100}}</text>
					</view>
				</view>
			</view>
		</block>
		<view class="bg-white" v-if="expressValue && expressValue.number">
			<tian-express-detail :notice="false" :closeBtn="!1" height="auto" @canceled="closeExpressDetailPopup"
				:value="expressValue" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				expressValue: {},
				expressGoods: [],
				expressIndex: 0,
				id: "",
				item: {}
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.item = this.getItemData();
			this.buildData();
			this.loadData();
			// this.getPreRefundInfo();
		},
		onReady() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#eb4e38',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				},
				success() {
					console.log("success")
				},
				fail(e) {
					console.log("fail", e)
				}
			})
		},
		methods: {
			getPreRefundInfo() {
				this.$request('mall/order/prerefund', {
					id: this.id,
				}).then(res => {
					uni.setStorage({
						key: "pre_refund_info",
						data: res
					})
				});
			},
			loadData() {
				this.$request("mall/order/checkOrder", {id:this.id}).then(result => {
					let item = result;
					if (item.goods) {
						item.goods.forEach(goods => {
							goods.goods_thumb = this.$thumbImg(goods.goods_thumb, '168x168')
						})
					}
					this.item = item;
					this.buildData();
				})
			},
			buildData() {
				if (this.item.delivers) {
					// this.expressValue = this.item.delivers[0]
					this.showExpress(this.item.delivers[0], 0);
				}
			},
			tel(phone) {
				if (phone != "") {
					uni.makePhoneCall({
						phoneNumber: phone
					})
				}
			},
			copy(text) {
				uni.setClipboardData({
					data: `${text}`,
					success: () => {
						this.$success("复制成功")
					}
				});
			},
			showExpress(item, index) {
				this.expressIndex = index;
				this.expressValue = item;
				console.log("this.item.goods", this.item.goods)
				this.expressGoods = this.item.goods.filter(e => e.goods_id == item.goods_id && e.sku_id == item.sku_id);
				console.log("expressValue", item, this.expressGoods)
			},
			closeExpressDetailPopup() {
				console.log("closeExpressPopup")
				this.$refs.expressDetailPopup.close()
			},
			cancelOrder(item) {
				this.confirmAction(() => {
					//取消订单，并返回上一页
					this.$request('payment/cancel', {
						id: item._id,
						module: "mall"
					}).then(res => {
						this.$message('取消成功');
						this.$prePage().reLoadData();
						this.navTimeBack()
					});
				}, "是否确定取消订单？")
			},
			refundGoods(item, goods) {
				this.navTo("/pages/order/refund?id=" + item._id, goods)
			}
		}
	}
</script>

<style lang="scss">
	.header {
		background: $uni-red;
		padding: 30rpx 40rpx 80rpx;
		color: #FFFFFF;
	}

	.item {
		margin: 20rpx;
		background: #FFFFFF;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;
	}

	.address {
		margin-top: -40rpx;
	}

	.tabs {
		.current {
			color: $uni-red;
		}

		.delivers+.delivers {
			margin-left: 20rpx;
		}
	}
</style>
