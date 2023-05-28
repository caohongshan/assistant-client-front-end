<template>
	<view>
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="name" label="姓名" required>
				<uni-easyinput placeholder="请输入姓名" v-model="formData.name" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="number" label="账号" required>
				<uni-easyinput placeholder="请输入账号" v-model="formData.number" trim="both" />
			</uni-forms-item>
			<view class="uni-button-group">
				<view class="text-center colorRed padding-bottom-20">
					<text>请认真核对账号和姓名后，再提交保存，如果填写有误，将影响账户提现</text>
				</view>
				<button type="primary" class="uni-button" @click="submit">提交保存</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				formData: {
					name: "",
					number: "",
				}
			};
		},
		onLoad() {
			if (this.userInfo.alipayinfo) {
				this.formData = this.userInfo.alipayinfo;
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			},
		},
		methods: {
			submit() {
				this.confirmAction(() => {
					db.collection("uni-id-users").doc(this.userInfo._id).update({
						alipayinfo: this.formData
					}).then(res => {
						this.$success("修改成功")
						this.navTimeBack()
						this.$store.dispatch('user/getUserInfo');
					})
				}, "是否确定提交？");
			}
		}
	}
</script>

<style lang="scss">
	.uni-button-group {
		margin-top: 20px;
	}
</style>
