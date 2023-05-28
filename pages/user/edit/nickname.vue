<template>
	<view class="">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="name" label="昵称">
				<uni-easyinput placeholder="请输入昵称" v-model="formData.name" trim="both" :inputBorder="false" />
			</uni-forms-item>
			<view class=" colorGray padding-bottom-20">
				<text>设置后，其他人将看到你的昵称。</text>
			</view>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交保存</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					name: "",
				}
			};
		},
		onLoad() {
			if (this.userInfo.hasNickName) {
				this.formData.name = this.userInfo.nickname;
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
					this.$request('user/info/edit', {
						_id: this.userInfo._id,
						nickname: this.formData.name
					}, {
						loading: true
					}).then(res => {
						//设置成功,刷新用户信息
						this.$success("修改成功")
						this.$store.dispatch('user/getUserInfo');
						this.navTimeBack()
						// 	this.userInfo.nickname = this.formData.name
					});
					
				}, "是否确定修改？");
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
		background: #fff;
		padding: 6rpx;
		padding-left: 22rpx;
	}
</style>
