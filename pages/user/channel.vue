<template>
	<view class="uni-container">
		<view class="" v-if="!loaded">
			<uni-load-more :status="loadingType"> </uni-load-more>
		</view>
		<view class="share" v-else-if="formData.status==2">
			<view class="text-center">
				<view class="">
					<text>邀请二维码</text>
				</view>
				<view class="text-center padding-top-20">
					<uqrcode ref="uqrcode" style="margin: 0 auto;"></uqrcode>
				</view>
				<!-- <image :src="qrcode" mode="aspectFill" style="width: 500rpx;height: 500rpx;"></image> -->
			</view>
			<view class="ti-flex font-36 margin-top-22">
				<text class="flex-1">渠道编号</text><text>{{formData.id}}</text>
			</view>
			<view class="ti-flex font-36 margin-top-22">
				<text class="flex-1">渠道名称</text><text>{{formData.title}}</text>
			</view>
			<view class="ti-flex font-36 margin-top-22">
				<text class="flex-1">推广统计</text>
			</view>
			<view class="padding-20 font-30">
				<view class="ti-flex font-36">
					<text class="flex-1">日期</text>
					<text>总计 ({{formData.total}})</text>
				</view>
				<view v-for="(item,index) in dayTotal" :key="index" class="ti-flex margin-top-12">
					<text class="flex-1">{{item.day}}</text>
					<text>{{item.total}}</text>
				</view>
			</view>
			<view class="uni-button-group" v-if="type==2">
				<button type="primary" class="uni-button" @click="goHome">进入首页</button>
			</view>
		</view>
		<uni-forms v-else ref="form" :value="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="id" label="渠道号" v-if="formData.id">
				<uni-easyinput v-model="formData.id" disabled />
			</uni-forms-item>
			<uni-forms-item name="title" label="名称">
				<uni-easyinput v-model="formData.title" :disabled="!isEdit" placeholder="例如:张三、大润发超市" />
			</uni-forms-item>
			<uni-forms-item name="mobile" label="电话">
				<uni-easyinput type="number" v-model="formData.mobile" :disabled="!isEdit" placeholder="请输入联系电话" />
			</uni-forms-item>
			<uni-forms-item name="address" label="地址">
				<view class="ti-flex">
					<view class="form-item flex-1 ti-flex">
						<text class="colorGray" v-if="address && address.name">{{address.name}}</text>
						<text class="colorGray" v-else>请选择地址</text>
					</view>
					<button size="mini" v-if="isEdit" @click="chooseAddress" class="font-24" type="primary">请选择</button>
				</view>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" v-if="isEdit" @click="submit">提交</button>
				<button type="primary" class="uni-button" disabled v-else-if="formData.status==1">审核中</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/uni-id-channel.js';
	const db = uniCloud.database();
	import mpShareMixin from '@/common/mixin/share/mp'
	const dbCollectionName = "uni-id-channel"

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}
	export default {
		mixins: [mpShareMixin],
		data() {
			return {
				type: "2",
				loaded: false,
				qrcode: "",
				formDataId: "",
				address: {},
				formData: {
					status: 0,
					"title": "",
					"mobile": null,
				},
				dayTotal: [],
				formOptions: {},
				rules: {
					...getValidator(["title", "mobile", "status"])
				}
			};
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type;
			}
			this.loadData()
		},
		onReady() {
			if (this.$refs.form) {
				this.$refs.form.setRules(this.rules)
			}
		},
		watch: {
			userInfo() {
				this.loadData()
			}
		},
		computed: {
			isEdit() {
				return this.formData.status == 0 || this.formData.status == 3;
			},
			userInfo() {
				return this.$store.state.user.userInfo;
			}
		},
		methods: {
			chooseAddress() {
				uni.chooseLocation({
					success: (res) => {
						this.address = {
							name: res.name,
							address: res.address,
							longitude: res.longitude,
							latitude: res.latitude,
						}
					}
				})
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					if (!this.address.name) {
						this.$message("请选择地址")
						return;
					}
					//审核中
					res.status = 1;
					res.address = this.address;
					res.modified = Date.now()
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},

			submitForm(value) {
				if (!this.formDataId) {
					// 使用 clientDB 提交数据
					db.action("genStringId,channel_apply").collection(dbCollectionName).add(value).then((res) => {
						uni.showToast({
							icon: 'none',
							title: '申请成功'
						})
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					}).finally(() => {
						uni.hideLoading();
						this.loadData()
					})
				} else {
					// 使用 clientDB 提交数据
					db.action("channel_apply").collection(dbCollectionName).doc(this.formDataId).update(value).then((
						res) => {
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						})
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					}).finally(() => {
						uni.hideLoading();
						this.loadData()
					})
				}

			},
			loadData() {
				console.log("this.userInfo", this.userInfo)
				if (this.userInfo._id) {
					//查询申请
					db.collection(dbCollectionName).where("user_id==$cloudEnv_uid").get({
						getOne: true
					}).then(({
						result
					}) => {
						if (result.data) {
							this.address = result.data.address;
							this.formDataId = result.data._id;
							delete result.data._id;
							//审核通过
							if (result.data.status == 2) {
								result.data.total = result.data.total ? result.data.total : 0;
								if (result.data.day_total) {
									let dayTotal = [];
									//格式化日期
									for (let day in result.data.day_total) {
										dayTotal.push({
											time: day,
											day: this.$dateFormat("Y-m-d", day),
											total: result.data.day_total[day]
										})
									}
									dayTotal.sort(function(a, b) {
										return b.time - a.time;
									})
									this.dayTotal = dayTotal;
									console.log("this.dayTotal", this.dayTotal)
								}
								//全局分享变量
								this.setGlobalShareContent()
								console.log("this.share", this.share)
								setTimeout(() => {
									this.$refs.uqrcode.make({
										size: 355,
										// mode: "canvas",
										text: this.share.href
									})
								}, 1000)
								/* uniCloud.callFunction({
									name: "tiantian-qr-image",
									data: {
										url: encodeURIComponent(this.share.href)
									},
									success: ({
										result
									}) => {
										uni.hideLoading();
										this.qrcode = result.image
										// console.log("qrcode", result.image)
									},
									fail: () => {
										uni.hideLoading();
									}
								}) */
							}
							this.formData = result.data;
						}
						this.loaded = true;
						console.log("result", result)
					})
				}
			},
			goHome() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.form-item {
		height: 72rpx;
		padding-left: 20rpx;
	}

	.uni-container {
		padding: 10px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 100rpx;
		left: 0;
		right: 0;
	}

	.uni-button {
		width: 184px;
		padding: 12px 20px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 1;
		margin: 0;
	}
</style>
