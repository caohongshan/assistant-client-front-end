<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast" class="has_under_line"
			labelWidth="100">
			<uni-forms-item name="name" label="收货人" required>
				<uni-easyinput placeholder="收货人" v-model="formData.name" :inputBorder="false" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="alias" label="地址别名">
				<uni-easyinput placeholder="例如：家、公司、学校" v-model="formData.alias" :inputBorder="false" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="mobile" label="手机号" required>
				<uni-easyinput placeholder="手机号码" v-model="formData.mobile" :inputBorder="false" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="area_code" label="省市区" required>
				<uni-data-picker self-field="code" parent-field="parent_code" :border="false"
					v-model="formData.area_code" collection="opendb-city-china" orderby="value asc"
					field="code as value, name as text, eq(type, 2) as isleaf" @change="changeAddress">
				</uni-data-picker>
			</uni-forms-item>
			<uni-forms-item name="address" label="详细住址" required>
				<uni-easyinput placeholder="街道小区房间号" v-model="formData.address" :inputBorder="false" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="is_default" label="默认地址">
				<switch @change="binddata('is_default', $event.detail.value)" :checked="formData.is_default" />
			</uni-forms-item>
		</uni-forms>
		<view class="uni-button-group">
			<button type="primary" class="uni-button" @click="submit">保存</button>
			<button type="warn" class="uni-button margin-left-20" @click="handleDelete">删除</button>
		</view>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/uni-id-address.js';

	const db = uniCloud.database();
	const dbCollectionName = 'uni-id-address';

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
		data() {
			return {
				formData: {
					"user_id": "",
					"name": "",
					"alias": "",
					"mobile": "",
					"mobile_area_code": "",
					"province_code": "",
					"city_code": "",
					"area_code": "",
					"address": "",
					"formatted_address": "",
					"zip_code": "",
					"email": "",
					"is_default": false
				},
				formOtherData: {},
				formOptions: {},
				rules: {
					...getValidator(["user_id", "name", "alias", "mobile", "mobile_area_code", "province_code",
						"city_code", "area_code", "address", "formatted_address", "zip_code", "email", "is_default"
					])
				}
			}
		},
		onLoad(e) {
			const id = e.id
			this.formDataId = id
			this.getDetail(id)
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					//省市县冗余字段
					if (this.formOtherData.formatted_address) {
						//合并字段
						res = Object.assign({}, {
							...this.formOtherData,
							...res
						})
					}
					res.update_date = Date.now();
					console.log(res, this.formData)
					this.submitForm(res)
				}).catch((errors) => {
					uni.hideLoading()
				})
			},
			changeAddress(e) {
				console.log("changeAddress", e)
				let [province_code, city_code, area_code] = e.detail.value.map(addr => addr.value);
				this.formOtherData = {
					province_code,
					city_code,
					formatted_address: e.detail.value.map(addr => addr.text).join("")
				}
			},
			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).doc(id).field(
					'user_id,name,alias,mobile,mobile_area_code,province_code,city_code,area_code,address,formatted_address,zip_code,email,is_default'
				).get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleDelete() {
				this.confirmAction(() => {
					db.collection(dbCollectionName).doc(this.formDataId).remove().then(res => {
						uni.showToast({
							icon: 'none',
							title: '删除成功'
						})
						this.getOpenerEventChannel().emit('refreshData')
						setTimeout(() => uni.navigateBack(), 500)
					})
				}, "是否确定删除？")
			}
		}
	}
</script>

<style lang="scss">
	.uni-container {
		padding: 15px;
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
		position: fixed;
		bottom: calc(var(--window-bottom) + 40rpx);
		left: 70rpx;
		right: 70rpx;
		display: flex;
	
		.uni-button {
			flex: 1;
		}
	}

</style>
