<template>
	<view class="container">
		<rich-text v-if="content" :nodes="content"></rich-text>
		<!-- #ifndef APP-PLUS -->
		<web-view v-else-if="src" :src="src"></web-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getQueryString
	} from '@/common/js/util.js'
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				content: "",
				src: "",
			}
		},
		onLoad(options) {
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
			}
			let data = this.getItemData();
			if (data.indexOf("http") != 0 && data.indexOf("//") != 0) {
				//富文本内容
				this.content = data;
			} else {
				this.src = data;
				//如果地址栏存在title,则给页面设置标题
				let title = getQueryString(this.src, "title")
				if (title) {
					uni.setNavigationBarTitle({
						title: title
					})
				}
				this.loadData();
			}
		},
		async onNavigationBarButtonTap({
			index
		}) {
			//非app，需要使用此方法来返回顶层，这是没有办法的办法
			let pages = getCurrentPages();
			let urls = pages.map(e => `/${e.route}`)
			//最后一个不要
			urls.pop()
			this.goHome(urls)
		},
		methods: {
			goHome(urls) {
				let url = urls.pop();
				if (url) {
					uni.switchTab({
						url: url,
						fail: () => {
							this.goHome(urls)
						}
					})
				}
			},
			async loadData() {
				// #ifdef APP-PLUS
				uni.showLoading({
					mask: true,
					title: "加载中"
				})
				let systemInfo = uni.getSystemInfoSync()
				//比如不希望远程网页使用plus的API，不管是因为安全原因还是因为back监听冲突
				wv = plus.webview.create("", "custom-webview", {
					plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
					'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
					// height: systemInfo.safeArea.height,
					height: systemInfo.screenHeight - (systemInfo.statusBarHeight + 44),
					top: systemInfo.statusBarHeight + 44
					//放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
				})
				wv.loadURL(this.src)
				var currentWebview = this.$scope
					.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
				currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
				setTimeout(() => {
					uni.hideLoading()
				}, 2000)
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
</style>
