<template>
	<view class="uni-im-control-mark" v-if="isShow" @touchstart="closeMe">
		<view class="control" :style="{top:data.top,left:data.left,right:data.right}">
			<view class="control-item" @click="copyText">
				<uni-icons custom-prefix="uni-im-font" type="uni-im-copy" size="16" color="#FFF"></uni-icons>
				<text class="control-item-text" v-if="data.msg.type == 'text'">复制</text>
			</view>
			<view class="control-item" @click="other">
				<uni-icons custom-prefix="uni-im-font" type="uni-im-delete" size="16" color="#FFF"></uni-icons>
				<text class="control-item-text">删除</text>
			</view>
			<view class="control-item" @click="other">
				<uni-icons custom-prefix="uni-im-font" type="uni-im-share" size="16" color="#FFF"></uni-icons>
				<text class="control-item-text">转发</text>
			</view>
		</view>
		<view class="icon-box" :class="{isInTop:data.isInTop}" :style="{top:data.top}">
			<view class="icon" :style="{right:1*parseInt(data.right)*3/2+50+'px',left:1*parseInt(data.left)*3/2+55+'px'}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		// #ifdef APP-NVUE
		beforeCreate() {
			// const domModule = uni.requireNativePlugin('dom')
			// domModule.addRule('fontFace', {
			// 	'fontFamily': "uni-im-font",
			// 	'src': "url('https://at.alicdn.com/t/c/font_3726059_lz2adc1jfve.ttf')"
			// });
		},
		// #endif
		data(){
			return {
				isShow:false,
				data: {
					type: Object,
					default: {
						top:'',
						left:'',
						right:'',
						width:'',
						msg:{},
						isInTop:false
					}
				}
			}
		},
		mounted() {
		},
		methods:{
			show(data){
				this.data = data
				this.isShow = true
			},
			copyText(){
				// console.log('setClipboardData');
				console.log('this.data',this.data);
				uni.setClipboardData({
					data:this.data.msg.body,
					complete:(e)=> {
						console.log(e);
						this.isShow = false
					}
				})
			},
			other(){
				uni.showToast({
					title: '暂不支持',
					icon: 'none',
					complete: () => {
						this.isShow = false
					}
				});
			},
			closeMe(){
				// console.log('closeMe');
				setTimeout(()=>{
					this.isShow = false
				},300)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
	/* #endif */
	.control{
		background-color:#252a30;
		height: 55px;
		width: 375rpx;
		position:fixed;
		top:0;
		border-radius: 5px;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		/* #ifndef APP-NVUE */
		z-index: 999;
		/* #endif */
	}
	.control-item{
		justify-content: center;
		align-items: center;
	}
	.control-item-text{
		font-size: 12px;
		color:#FFFFFF;
		margin-top: 1px;
	}
	.uni-im-control-mark{
		position: fixed;
		top: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		height: 100vh;
		z-index: 99;
		/* #endif */
		width: 750rpx;
	}
	.icon-box{
		width: 750rpx;
		height: 20px;
		position: fixed;
		transform:translate(0,-10px);
		justify-content: center;
		align-items: center;
	}
	.icon{
		position: absolute;
		background-color: #252a30;
		width: 10px;
		height: 10px;
		transform: rotate(45deg);
	}
	.isInTop{
		transform:translate(0,45px);
	}
</style>