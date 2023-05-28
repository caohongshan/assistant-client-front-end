<template>
	<view class="invite-container">
		<image src="/static/images/invite.jpg" class="img" mode="widthFix"
			@click="showPop()" />
		<view class="code">
			<text>我的邀请码:{{ userInfo.my_invite_code }}</text>
		</view>
		<!-- #ifdef MP -->
		<button class="unbutton" open-type="share" />
		<!-- #endif -->
		<!-- #ifndef MP -->
		<uni-popup ref="popup">
			<view class="dialog">
				<view class="padding-40 padding-top-100">
					<button type="default" style="background: #fe9a04;color: #FFFFFF;" @click="btnFace()">
						<tian-icons type="saoma" size="18" color="#ffffff" />
						<text class="margin-left-20">面对面邀请</text>
					</button>
				</view>
				<view class="padding-40">
					<button type="default" open-type="share" @click="shareToFriend()">
						<tian-icons type="fenxiang" size="18" color="#fe9a04" />
						<text class="margin-left-20">链接邀请</text>
					</button>
				</view>
				<view class="text-center padding-20" @click="closePop('popup')">
					<tian-icons type="guanbi2" size="40" color="#ffffff" />
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="codePopup">
			<view class="codeDialog">
				<image class="codeDialogBg"
					src="/static/images/qrcode_bg.png" mode="widthFix">
				</image>
				<view class="info">
					<image :src="userInfo.avatar" mode="aspectFill"
						class="image-width-120 bg-white border-radius user-avatar"></image>
					<view class="">
						<text>{{ userInfo.nickName }}</text>
					</view>
					<view class="font-24 colorGray"><text>邀请您加入一起赚钱</text></view>
					<view class="margin-top-60"><text>邀请码</text></view>
					<view class="font-bold">
						<text>{{ userInfo.my_invite_code }}</text>
					</view>
					<view class="margin-top-12">邀请二维码</view>
					<canvas class="canvas-hide" canvas-id="qrcode"
						style="width: 140px;height: 140px;margin:0 auto;" />
					<image :src="qrcodeSrc" mode="aspectFill" style="width: 140px;height: 140px;margin:0 auto;"></image>
					<view class="text-center padding-10" @click="closePop('codePopup')">
						<tian-icons type="guanbi2" size="40" />
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- #endif -->
	</view>
</template>

<script>
	import uQRCode from '@/common/js/uqrcode.js';
	import mpShareMixin from '@/common/mixin/share/mp'
	
	export default {
		mixins: [mpShareMixin],
		data() {
			return {
				qrcodeSrc: '',
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			}
		},
		onLoad() {
			this.setGlobalShareContent()
			console.log("this.share.href", this.share.href)
		},
		methods: {
			btnFace() {
				this.closePop('popup');
				this.$refs.codePopup.open();
				this.genQrCode();
			},
			genQrCode() {
				let qr_code_data = this.share.href;
				console.log("qrcode res 开始：", qr_code_data)
				uQRCode.make({
						canvasId: 'qrcode',
						componentInstance: this,
						text: qr_code_data,
						size: 140,
						margin: 14,
						backgroundColor: '#ffffff',
						foregroundColor: '#000000',
						fileType: 'jpg',
						errorCorrectLevel: uQRCode.errorCorrectLevel.H
					}).then(res => {
						this.qrcodeSrc = res;
						console.log("qrcode res 完成")
					}, err => {
						console.log("生成二维码失败")
						this.$message("生成二维码失败，请重新打开")
					})
					.finally(() => {
						console.log("生成二维码完成")
						uni.hideLoading();
					});
			},
			shareToFriend() {
				// #ifdef MP
				return;
				// #endif
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 0,
					...this.share,
					success: res => {},
					fail: err => {}
				});
			},
			showPop() {
				//#ifndef MP
				this.$refs.popup.open();
				//#endif
			},
			closePop(name) {
				this.$refs[name].close();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.invite-container {
		.unbutton {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
		}

		.img {
			width: 750rpx;
			display: block;
		}

		.dialog {
			background: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a9b22f02-2885-453d-8784-8be0b8a11698/920eb4b3-5674-4cc0-8e37-68109bef80f3.png') no-repeat;
			background-size: 100%;
			width: 654rpx;
		}

		button {
			color: #fe9a04;
			line-height: 2.4;
		}

		.code {
			position: absolute;
			top: 830rpx;
			text-align: center;
			left: 0;
			right: 0;
		}

		.codeDialog {
			position: relative;

			.info {
				position: absolute;
				top: 50rpx;
				left: 0;
				right: 0;
				text-align: center;

				.user-avatar {
					border-radius: 10rpx;
				}
			}
		}

		.codeDialogBg {
			width: 630rpx;
		}

		.canvas-hide {
			/* 1 */
			position: fixed;
			right: 100vw;
			bottom: 100vh;
			/* 2 */
			z-index: -9999;
			/* 3 */
			opacity: 0;
		}
	}
</style>
