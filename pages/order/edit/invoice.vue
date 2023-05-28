<template>
	<view class="">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast" labelPosition="top"
			labelWidth="100">
			<uni-forms-item name="type" label="发票类型">
				<uni-data-checkbox :localdata="types" mode="tag" v-model="formData.type"></uni-data-checkbox>
			</uni-forms-item>
			<block v-if="formData.type=='company'">
				<uni-forms-item name="name" label="请输入发票抬头">
					<uni-easyinput placeholder="请输入公司名称" v-model="formData.name" trim="both" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item name="code" label="请输入纳税识别号">
					<uni-easyinput placeholder="请输入纳税识别号" v-model="formData.code" trim="both" :inputBorder="false" />
				</uni-forms-item>
			</block>
			<block v-else-if="formData.type=='personal'">
				<uni-forms-item name="name" label="请输入发票抬头">
					<uni-easyinput placeholder="请输入个人名称，例如：个人" v-model="formData.name" trim="both"
						:inputBorder="false" />
				</uni-forms-item>
			</block>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">保存</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					type: "none",
					name: "",
					code: "",
				},
				types: [{
					text: "不开发票",
					value: "none"
				}, {
					text: "公司",
					value: "company"
				}, {
					text: "个人",
					value: "personal"
				}, ]
			};
		},
		onLoad(e) {
			let item = this.getItemData()
			if (item.invoice) {
				this.formData.name = item.invoice
			}
			if (item.invoice_code) {
				this.formData.code = item.invoice_code
			}
			if (item.invoice_type) {
				this.formData.type = item.invoice_type
			}
		},
		methods: {
			submit() {
				console.log("this.formData", this.formData)
				this.getOpenerEventChannel().emit('addData', {
					invoice: this.formData.name,
					invoice_code: this.formData.code,
					invoice_type: this.formData.type,
				})
				setTimeout(() => uni.navigateBack(), 500)
			}
		}
	}
</script>

<style lang="scss">
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

	.uni-forms .uni-forms-item {
		padding: 6rpx;
		// padding-left: 22rpx;
	}
</style>
