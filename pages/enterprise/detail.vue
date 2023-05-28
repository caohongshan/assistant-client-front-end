<template>
	<view>
		<uni-list>
			<uni-list-item title="收款二维码" rightText="点击查看" @click="showQrcode" :clickable="true"></uni-list-item>
			<uni-list-item title="后台登录账号" rightText="点击查看" @click="showAccount" :clickable="true"></uni-list-item>
		</uni-list>
		<uni-popup ref="qrPopup">
			<view class="text-center bg-white padding-22 border-radius">
				<uqrcode ref="uqrcode"></uqrcode>
				<!-- <image :src="qrcode" mode="aspectFill" style="width: 500rpx;height: 500rpx;"></image> -->
			</view>
			<view class="margin-top-20 text-center colorWhite">
				<text>截图保存此收款二维码</text>
			</view>
		</uni-popup>
		<uni-popup ref="accountPopup">
			<view class="bg-white padding-42 border-radius">
				<view class="">
					<text>后台地址：</text>
					<text selectable>{{account.url}}</text>
				</view>
				<view class="margin-top-40">
					<text>登录账号：</text>
					<text selectable>{{account.account}}</text>
				</view>
				<view class="margin-top-40 ">
					<text>默认密码：</text>
					<text selectable>{{account.password}}</text>
				</view>
				<view class="margin-top-10 colorGray font-22">
					<text>登录后请立马修改默认密码，以免发生盗号风险</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrcode: "",
				item: {},
				account: {}
			};
		},
		onLoad() {
			this.item = this.getItemData();
		},
		computed: {
			customer() {
				return this.$store.state.app.customer;
			},
			userInfo() {
				return this.$store.state.user.userInfo;
			},
		},
		methods: {
			showAccount() {
				let url = this.customer.shopAdminUrl;
				if (!url) {
					this.$message("未配置收款二维码地址")
					return;
				}
				this.account = {
					url,
					account: this.userInfo.mobile,
					password: this.userInfo.mobile,
				};

				this.$refs.accountPopup.open()
			},
			showQrcode() {
				let code = this.customer.shopQrCode;
				if (!code) {
					this.$message("未配置收款二维码地址")
					return;
				}
				this.$refs.qrPopup.open()
				this.$nextTick(() => {
					let link = this.$stringFormat(code, {
						shop: this.item
					})
					this.$refs.uqrcode.make({
						size: 304,
						// mode: "canvas",
						text: link
					})
				})
				/* uniCloud.callFunction({
					name: "tiantian-qr-image",
					data: {
						url: encodeURIComponent("this.share.href")
					},
					success: ({
						result
					}) => {
						uni.hideLoading();
						this.qrcode = result.image
						console.log("qrcode", result.image)
					},
					fail: () => {
						uni.hideLoading();
					}
				}) */
			}
		}
	}
</script>

<style lang="scss">

</style>
