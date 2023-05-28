<template>
	<view class="container">
		<view class="markdown-body" v-html="content"></view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	import marked from '@/common/js/marked.js';
	export default {
		data() {
			return {
				id: false,
				content: ""
			};
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id;
			}
			this.loadData();
		},
		methods: {
			async loadData() {
				db.collection("opendb-news-articles").doc(this.id).field("title,content").get({
					getOne: true
				}).then(({
					result
				}) => {
					uni.setNavigationBarTitle({
						title: result.data.title
					});
					this.content = marked(result.data.content)
				})
				/* getDocContent({
					id: this.id,
					shopid: this.shopId,
					type: this.type
				}, this.action).then(res => {
					uni.setNavigationBarTitle({
						title: res.title
					})
					this.content = marked(res.content);
				}, err => {
					this.content = err.message;
				}); */
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/github-markdown.css';

	page {
		background: #FFFFFF;
	}

	.container {}

	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}
	/deep/ img{
		width: 100%;
		height: auto;
		display: block;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>