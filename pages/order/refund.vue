<template>
	<view class="padding-20">
		<view class=" bg-white padding-20 border-radius">
			<view class="font-bold margin-bottom-20"><text>退款商品</text></view>
			<view class="ti-flex">
				<image :src="goods.goods_thumb" mode="aspectFill" class="image-width-120 border-radius"></image>
				<view class="flex-1 padding-left-12">
					<view class="">
						<text>{{ goods.name }}</text>
					</view>
					<view class="">
						<text class="font-24">{{ goods.sku_name }}</text>
					</view>
					<view class=" between">
						<text class="price">{{ goods.price / 100 }}</text>
						<text v-if="goods.use_score" class="font-20">+{{ goods.use_score }}</text>
						<text class="margin-left-10">x{{ goods.amount }}</text>
					</view>
				</view>
			</view>
		</view>
		<block v-if="afterServiceType">
			<view class="bg-white border-radius margin-top-20 padding-bottom-10" v-if="afterServiceType.indexOf('refund') != -1">
				<view class="font-bold padding-20"><text>退款原因</text></view>
				<view class="padding-lr-20 padding-bottom-10">
					<view class="ti-flex margin-top-20" v-if="afterServiceType == 'refund'">
						<view class="flex-1"><text>货物状态</text></view>
						<view class="colorGray">
							<picker @change="changeGoodsStatus" :value="goodsStatusIndex" :range="goodsStatus">
								<view class="uni-input">{{ goodsStatus[goodsStatusIndex] }}</view>
							</picker>
						</view>
						<tian-icons type="xiangyou1"></tian-icons>
					</view>
					<view class="ti-flex margin-top-20">
						<view class="flex-1"><text>退款原因</text></view>
						<view class="colorGray">
							<picker @change="changeServiceReason" :value="afterServiceReasonIndex" :range="afterServiceReason">
								<view class="uni-input">{{ afterServiceReason[afterServiceReasonIndex] }}</view>
							</picker>
						</view>
						<tian-icons type="xiangyou1"></tian-icons>
					</view>
					<view class=" margin-top-20">
						<view class="ti-flex">
							<view class="flex-1"><text>退款金额</text></view>
							<uni-easyinput placeholder="退款金额" type="digit" v-model="formData.money" :inputBorder="false" class="text-right" @input="changeMoney" />
						</view>
						<view class="font-20 colorGray">
							<text>可修改，最多</text>
							<text class="price">{{ goods.canRefundMoney / 100 }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white border-radius margin-top-20 padding-bottom-10">
				<view class="font-bold padding-20"><text>补充描述和凭证</text></view>
				<view class=" padding-lr-20">
					<uni-easyinput placeholder="补充描述,有助于商家更好的处理售后问题" type="textarea" v-model="formData.describe" :inputBorder="false" class="text-right" />
				</view>
				<view class=" padding-lr-20"><cloud-image name="imgs" v-model="formData.imgs" :imageNumber="6"></cloud-image></view>
			</view>
			<view class="margin-top-40"><button type="primary" @click="submit">提交</button></view>
		</block>
		<view class="bg-white border-radius margin-top-20 padding-bottom-10" v-else="afterServiceType">
			<view class="font-bold padding-top-20 padding-lr-20"><text>选择服务类型</text></view>
			<uni-list :border="false">
				<uni-list-item
					v-for="(item, index) in afterServices"
					:key="index"
					:title="item.title"
					:showArrow="true"
					:note="item.notice"
					:clickable="true"
					@click="changeType(item.type)"
				></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			maxMoney: 0,
			formData: {
				money: 0,
				describe: '',
				imgs: []
			},
			afterServices: [''],
			afterServiceType: '',
			afterServiceReason: [''],
			afterServiceReasonIndex: 0,
			goodsStatus: ['未收到货', '已收到货'],
			goodsStatusIndex: 0,
			goods: {}
		};
	},
	onLoad(e) {
		this.id = e.id;
		this.goods = this.getItemData();
		//查询退货方式
		this.preRefund();
		this.maxMoney = this.formData.money = this.goods.canRefundMoney / 100;
	},
	methods: {
		preRefund() {
			this.$request('mall/order/prerefund', {
				id: this.id
			}).then(res => {
				let { afterServices, afterServiceReason } = res;
				this.afterServiceReason = afterServiceReason;
				console.log('afterServiceReason', afterServiceReason);
				this.afterServices = afterServices;
			});
		},
		changeGoodsStatus(e) {
			console.log('changeGoodsStatus', e);
			this.goodsStatusIndex = e.detail.value;
		},
		changeServiceReason(e) {
			console.log('changeServiceReason', e);
			this.afterServiceReasonIndex = e.detail.value;
		},
		changeType(type) {
			this.afterServiceType = type;
		},
		changeMoney(e) {},
		submit() {
			if (this.maxMoney < this.formData.money) {
				this.formData.money = this.maxMoney;
			}
			//原因，状态
			let data = this.formData;
			data.type = this.afterServiceType;
			if (this.afterServiceType.indexOf('refund') != -1) {
				data.reason = this.afterServiceReason[this.afterServiceReasonIndex];
				data.goods_status = this.goodsStatus[this.goodsStatusIndex];
			}
			console.log(data);
			this.confirmAction(() => {
				this.$request('mall/order/refund', {
					...data,
					money: this.formData.money * 100,
					id: this.id, //订单编号
					goods_id: this.goods.goods_id,
					sku_id: this.goods.sku_id
				}).then(res => {
					this.$message('申请成功');
					this.$prePage().loadData();
					this.navTimeBack();
				});
			}, '是否确定申请售后？');
		}
	}
};
</script>

<style lang="scss"></style>
