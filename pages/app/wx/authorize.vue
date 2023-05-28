<template>
	<view>
		<text>loading</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: "",
				state: "",
			};
		},
		onLoad(e) {
			console.log("auth", e)
			//https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#0
			//code=001BJT000T9N7M1QO5200k8JTO2BJT04&state=123
			this.code = e.code;
			this.state = e.state;
			this.getOpenid();
		},
		methods: {
			getOpenid() {
				this.$request('user/info/weixin_h5', {
					code: this.code,
					state: this.state
				}, {
					loading: true
				}).then(res => {
					this.$success("操作成功", 1500, true)
					this.navTimeBack()
				}, err => {
					this.$message("操作失败")
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
