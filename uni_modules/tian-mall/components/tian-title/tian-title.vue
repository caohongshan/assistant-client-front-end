<template>
	<view class="uni-section-header" :class="{'under-line':options.underLine}" v-if="!isAppVerify">
		<view class="uni-section__head">
			<view class="uni-section__head-tag line"></view>
		</view>
		<view class="uni-section__content">
			<view class="uni-section__content-title distraction">
				<text>{{options.title}}</text>
			</view>
			<view class="" style="flex:1">

			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tian-title",
		data() {
			return {
				options: {
					title: "",
					underLine: false
				}
			};
		},
		props: {
			configs: {
				type: Object,
				default: () => {
					return {}
				}
			},
			title: {
				type: String,
				default: ""
			},
			underLine: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.options = Object.assign(this.options, {
				...this.configs
			})
			if (this.title) {
				this.options.title = this.title;
			}
			if (this.underLine) {
				this.options.underLine = this.underLine;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.uni-section-header {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 12px 10px;
		font-weight: 400;

		.uni-section__head {
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-right: 10px;

			.line {
				height: 12px;
				background-color: #fd3648;
				border-radius: 10px;
				width: 4px;
			}
		}

		.uni-section__content {
			display: flex;
			align-items: center;
			flex: 1;
			color: #333;
			font-size: 32rpx;
			font-weight: 600;

			.distraction {
				flex-direction: row;
				align-items: center;
			}
		}
	}
</style>
