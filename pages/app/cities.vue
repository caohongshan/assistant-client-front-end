<template>
	<view>
		<uni-indexed-list :options="dataList" :showSelect="false" @click="chooseCity"></uni-indexed-list>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				localCity: {},
				limit: 500,
				save: false, //是否保存到用户信息里面
				codeList: {},
				dataList: [],
				hotLetter: "热门",
				zhixiashi: {
					"北京市": "110000",
					"天津市": "120000",
					"重庆市": "500000",
					"上海市": "310000",
					"北京": "110000",
					"天津": "120000",
					"重庆": "500000",
					"上海": "310000",
				}
			};
		},
		onLoad(e) {
			if (e.save) {
				this.save = e.save;
			}
			this.loadData();
		},
		computed: {
			isLogin() {
				return this.$store.getters['user/isTokenValid'];
			}
		},
		methods: {
			/**
			 * 一次性查询所有城市，可以本地缓存一下
			 */
			loadData() {
				db.collection("opendb-city-china").where("(type==1) || (type==2 && is_recommend==true)").field(
					"code,name,first_letter,is_recommend").orderBy(
					"first_letter asc,name asc").limit(this.limit).get().then(({
					result
				}) => {
					console.log(result)
					let letter = "";
					let data = [];
					let extNames = ["省直辖县级行政区划", "自治区直辖县级行政区划", "县"];
					let recommend = [];
					result.data.map(item => {
						if (item.first_letter != letter) {
							if (letter) {
								//插入到原数组里面
								this.dataList.push({
									letter: letter,
									data: data
								})
							}
							//新起一个数组
							letter = item.first_letter;
							data = [];
						}
						//暂且认为城市名称不重复，这几条要排除在外:省直辖县级行政区划、自治区直辖县级行政区划、县
						if (extNames.indexOf(item.name) == -1) {
							data.push(item.name)
							if (item.is_recommend) {
								recommend.push(item.name)
							}
							//判断直辖市
							if (this.zhixiashi[item.name]) {
								this.codeList[item.name] = this.zhixiashi[item.name];
							} else {
								this.codeList[item.name] = item.code;
							}
						}
					})
					//推荐列表
					if (recommend.length > 0) {
						this.dataList.unshift({
							letter: this.hotLetter,
							data: recommend
						})
					}
					//最后一个数组
					this.dataList.push({
						letter: letter,
						data: data
					})
					//获取当前定位城市
					this.getLocation();
				})
			},
			getLocationCallback(e) {
				console.log("getLocation", e)
				//根据经纬度，获得城市
				this.$request("utils/getLocationAddress", {
					fromLatlng: [e.latitude, e.longitude].join()
				}).then(data => {
					console.log("data", data)
					if (data.ad_info) {
						//需要处理直辖市
						if (this.codeList[data.ad_info.district]) {
							//区县
							this.localCity = {
								name: data.ad_info.district + "（当前定位）",
								realName: data.ad_info.district,
								code: this.codeList[data.ad_info.district]
							}
						} else if (this.zhixiashi[data.ad_info.province]) {
							this.localCity = {
								name: data.ad_info.province + "（当前定位城市）",
								realName: data.ad_info.province,
								code: this.zhixiashi[data.ad_info.province]
							}
						} else {
							//普通城市
							this.localCity = {
								name: data.ad_info.city + "（当前定位城市）",
								realName: data.ad_info.city,
								code: this.codeList[data.ad_info.city]
							}
						}
						console.log("this.localCity", this.localCity)
						//判断是否存在热门
						let hot = this.dataList[0].letter == this.hotLetter;
						this.codeList[this.localCity.name] = this.localCity.code;
						if (hot) {
							let localIndex = this.dataList[0].data.findIndex(e => this
								.localCity.name
								.indexOf(e) == 0);
							if (localIndex != -1) {
								this.dataList[0].data.splice(localIndex, 1)
							}
							this.dataList[0].data.unshift(this.localCity.name)
						} else {
							this.dataList.unshift({
								letter: this.hotLetter,
								data: [
									this.localCity.name
								]
							})
						}
					}
				})
			},
			getLocation() {
				// #ifdef MP-WEIXIN
				wx.getFuzzyLocation({
					type: 'wgs84',
					success: (e) => {
						this.getLocationCallback(e)
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.getLocation({
					success: (e) => {
						this.getLocationCallback(e)
					}
				})
				// #endif
			},
			async chooseCity(e) {
				console.log("chooseCity", e, this.codeList[e.item.name])
				let city = {
					code: this.codeList[e.item.name],
					name: e.item.name
				}
				//判断选择的城市是否为定位城市
				if (this.localCity && this.localCity.code == city.code) {
					city.name = this.localCity.realName;
				}
				uni.setStorage({
					key: "user_select_city",
					data: city
				});
				if (this.save && this.isLogin) {
					await db.collection("uni-id-users").where("_id==$cloudEnv_uid").update({
						select_city: city
					});
					//刷新用户信息
					this.$store.dispatch('user/getUserInfo');
				}
				this.$success("设置成功");
				//城市更新事件
				uni.$emit("updateGlobelCity", city)
				this.navTimeBack(true, 1500, () => {
					//重新加载首页
					this.$store.dispatch('app/init', {
						city
					});
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
