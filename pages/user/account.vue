<template>
	<view>
		<view class="">
			<view v-for="(item, index) in dataList" :key="index" class="ti-flex bg-white padding-22 margin-top-22"
				@click="changeAccount(item)">
				<image :src="item.avatar" mode="aspectFill" class="image-width-100 bg-white border-radius padding-2">
				</image>
				<view class="flex-1 margin-left-18">
					<text>{{ item.nickname }}</text>
					<view class="font-24">
						<text>{{ item.mobile }}</text>
					</view>
				</view>
				<view class="" v-if="item.checked">
					<tian-icons type="xuanze" color="#55aa00" size="20">
					</tian-icons>
				</view>
			</view>
			<view class="ti-flex bg-white padding-22 margin-top-22"
				v-if="!isMustUniverifyLogin && dataList && dataList.length<multipleAccount" @click="navToLogin">
				<tian-icons type="jiahao1" color="#0099ff" size="22">
				</tian-icons>
				<view class="flex-1 margin-left-18 colorBlue">
					<text>添加或注册账号</text>
				</view>
			</view>
		</view>
		<uni-list class="margin-top-22">
			<uni-list-item :clickable="true" @click="logout" class="">
				<view slot="body">
					<view class="">
						<text>退出当前账号</text>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
		<!-- 	<view class="uni-button-group padding-22">
			<button type="primary" class="uni-button" @click="logout">退出当前账号</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cachekey: 'tiantian-accounts',
				dataList: []
			};
		},
		onLoad() {},
		onShow() {
			this.loadData();
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			},
			isMustUniverifyLogin() {
				return this.$store.getters['app/isMustUniverifyLogin'];
			},
			multipleAccount() {
				return this.$store.state.app.customer.multipleAccount;
			}
		},
		methods: {
			loadData() {
				this.dataList = uni.getStorageSync(this.cachekey);
				if (!this.dataList) {
					this.dataList = []
				}
				this.dataList.forEach(item => {
					item.checked = this.userInfo._id == item._id;
				})
			},
			changeAccount(item) {
				if (item.checked) {
					return false;
				}
				this.confirmAction(() => {
					this.$store.commit('user/SET_TOKEN', {
						token: item.token,
						tokenExpired: item.tokenExpired,
						userInfo: item,
					})
					this.loadData();
					this.$success("切换成功")
					this.navTimeBack();
				}, '是否确定切换账户？');
			},
			logout() {
				this.confirmAction(() => {
					uni.showLoading({
						title: "正在退出"
					})
					this.$request('user/login/logout').then(
						res => {
							this.$success("退出成功")
							console.log('退出成功', res);
							this.localLogout();
						},
						err => {
							this.$success("退出成功")
							console.log('退出失败', err);
							this.localLogout();
						}
					);
				}, '是否确定退出系统？');
			},
			localLogout() {
				let data = [];
				//移除accounts
				if (this.dataList && this.dataList.length > 1) {
					data = this.dataList.filter(e => e._id != this.userInfo._id);
				}
				uni.setStorageSync(this.cachekey, data);
				if (data.length == 0) {
					//移除本地token
					this.$store.commit('user/REMOVE_TOKEN');
					//重置用户信息
					this.$store.commit('user/SET_USER_INFO', {});
					//清空购物车
					this.$store.commit('mall/UPDATE_CART_NUMBER', 0);
				} else {
					let item = data[0];
					//切换到第一个
					this.$store.commit('user/SET_TOKEN', {
						token: item.token,
						tokenExpired: item.tokenExpired,
						userInfo: item,
					})
				}
				uni.hideLoading();
				this.navTimeBack(true, 100);
			},
		}
	}
</script>

<style lang="scss">

</style>
