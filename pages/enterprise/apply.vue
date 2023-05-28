<template>
	<view class="uni-container">
		<view class="padding-lr-60 text-center font-36 padding-top-60">
			<text>填写经营信息</text>
		</view>
		<view class="padding-lr-60 text-center padding-top-20 padding-bottom-60">
			<text>根据国家法规，你需要完善以下经营信息。</text>
		</view>
		<view class="padding-22">

			<uni-forms ref="form" :value="formData" validate-trigger="submit" err-show-type="toast" label-width="100"
				label-position="top">
				<view class="colorRed" v-if="formData.state!=0 && formData.apply_result">
					<text>{{formData.apply_result}}</text>
				</view>
				<uni-forms-item name="name" label="店铺名称">
					<uni-easyinput v-model="formData.name" placeholder="请填写店铺名称 如 合川五金" :disabled="isDisable" />
				</uni-forms-item>
				<uni-forms-item name="phone" label="联系方式">
					<uni-easyinput v-model="formData.phone" placeholder="请输入店铺联系手机号码" :disabled="isDisable" />
				</uni-forms-item>
				<uni-forms-item name="src" label="店铺地址" labelPosition="top">
					<view class="ti-flex" @click="chooseLocation">
						<view class="flex-1" v-if="address.name">
							<view class="">
								<text>{{address.name}}</text>
							</view>
							<view class="font-24 colorGray">
								<text>{{address.address}}</text>
							</view>
						</view>
						<text class="flex-1 colorGray" v-else>请选择店铺地址</text>
						<tian-icons type="zuobiao" size="20" v-if="!isDisable"></tian-icons>
					</view>
				</uni-forms-item>
				<uni-forms-item name="src" label="店铺头像" labelPosition="top">
					<cloud-image name="src" v-model="formData.src" :value="formData.src" size="200x200"
						:disabled="isDisable" />
				</uni-forms-item>
				<uni-forms-item name="business_license" label="营业执照" labelPosition="top" labelWidth="200">
					<cloud-image name="business_license" v-model="formData.business_license" size="706x400"
						:disabled="isDisable" :value="formData.business_license" />
				</uni-forms-item>
				<uni-forms-item name="food_license" label="食品经营许可" labelPosition="top" labelWidth="200">
					<cloud-image name="food_license" v-model="formData.food_license" :value="formData.food_license"
						:disabled="isDisable" size="706x400" tips="餐饮/超市类型店铺必传,其他选填" />
				</uni-forms-item>
				<uni-forms-item name="legal_person_license" label="法人身份证人像面照片" labelPosition="top" labelWidth="200">
					<cloud-image name="legal_person_license" v-model="formData.legal_person_license"
						:disabled="isDisable" :value="formData.legal_person_license" size="706x400" />
				</uni-forms-item>
				<uni-forms-item name="legal_person_license_back" label="法人身份证国徽面照片" labelPosition="top"
					labelWidth="200">
					<cloud-image name="legal_person_license_back" v-model="formData.legal_person_license_back"
						:disabled="isDisable" :value="formData.legal_person_license_back" size="706x400" />
				</uni-forms-item>

				<uni-forms-item name="bank_card" label="收款银行卡" labelPosition="top" labelWidth="200">
					<cloud-image name="bank_card" v-model="formData.bank_card" size="706x400" :disabled="isDisable"
						tips="企业对公账户或者个体户法人银行卡" />
				</uni-forms-item>
				<uni-forms-item name="bank_no" label="收款银行卡号" labelPosition="top" labelWidth="200">
					<uni-easyinput v-model="formData.bank_no" placeholder="请输入收款银行卡号" :disabled="isDisable" />
					<view class="colorGray font-24">
						<text>企业对公账户或者个体户法人银行卡，如已上传收款银行卡，此项不用填写</text>
					</view>
				</uni-forms-item>
				<uni-forms-item name="bank_deposit" label="银行卡开户行" labelPosition="top" labelWidth="200">
					<uni-easyinput v-model="formData.bank_deposit" placeholder="请输入开户行,精确到支行" :disabled="isDisable" />
				</uni-forms-item>
				<uni-forms-item name="store_face" label="门店门脸照片" labelPosition="top" labelWidth="200">
					<cloud-image name="store_face" v-model="formData.store_face" :disabled="isDisable" size="706x400"
						tips="请上传真实的门店门脸照片,如不符合要求将无法通过认证,需要重新提交." />
				</uni-forms-item>
				<uni-forms-item name="store_imgs" label="门店内部照片" labelPosition="top" labelWidth="200">
					<cloud-image name="store_imgs" v-model="formData.store_imgs" :disabled="isDisable" size="706x400"
						tips="请上传真实的门店照片,如不符合要求将无法通过认证,需要重新提交." />
				</uni-forms-item>
				<uni-forms-item name="food_menu" label="菜单/食谱" labelPosition="top" labelWidth="200">
					<cloud-image name="food_menu" v-model="formData.food_menu" :disabled="isDisable" size="706x400"
						tips="餐饮菜单,方便一键开通商品功能" :imageNumber="10" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="uni-button-group">
			<button type="primary" class="uni-button" @click="submit" :disabled="isDisable">提交审核</button>
		</view>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/tian-mall-shop-apply.js';

	const db = uniCloud.database();
	const dbCollectionName = 'tian-mall-shop-apply';

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
				id: false,
				address: {},
				formData: {
					"id": null,
					"address": null,
					"name": "",
					"phone": "",
					"src": "",
					state: -1,
					"business_license": "",
					"food_license": "",
					"legal_person_license": "",
					"legal_person_license_back": "",
					"modified": null
				},
				formOptions: {},
				rules: {
					...getValidator(["id", "address", "name", "phone", "src", "business_license", "food_license",
						"legal_person_license", "legal_person_license_back", "modified"
					])
				}
			}
		},
		onLoad(e) {
			if (e && e.id) {
				this.id = e.id;
				this.setFormData(this.getItemData())
				this.loadData();
			}
		},
		computed: {
			isDisable() {
				return this.id && this.formData.state == 0;
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			setFormData(data) {
				this.address = data.address;
				delete data.address;
				this.formData = data;
			},
			loadData() {
				db.collection(dbCollectionName).doc(this.id).get({
					getOne: true
				}).then(({
					result
				}) => {
					this.setFormData(result.data)
				})
			},
			chooseLocation() {
				if (this.isDisable) {
					return;
				}
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this.address = {
							name: res.name,
							address: res.address,
							latitude: res.latitude,
							longitude: res.longitude,
						}
					}
				})
			},
			/**
			 * 触发表单提交
			 */
			submit() {
				//判断地址
				if (!this.address.name) {
					this.$message("店铺地址必填")
					return;
				}
				uni.showLoading({
					mask: true
				})
				this.$refs.form.submit().then((res) => {
					res.dcloud_appid = this.systemInfo.appId;
					res.address = this.address;
					if (this.id) {
						this.editForm(res)
					} else {
						this.submitForm(res)
					}
				}).catch((errors) => {
					uni.hideLoading()
				})
			},
			editForm(value) {
				delete value._id;
				db.action("shop_apply").collection(dbCollectionName).doc(this.id).update(value).then((res) => {
					uni.showToast({
						icon: 'success',
						title: '重新申请成功'
					})
					// this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 1500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			submitForm(value) {
				// 使用 clientDB 提交数据
				db.action("genId,shop_apply").collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						icon: 'success',
						title: '申请成功'
					})
					// this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 1500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 0;
		padding-bottom: 50px;
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
		display: flex;
		justify-content: center;
		padding: 10px 20px;
		position: fixed;
		left: 0;
		bottom: 0;
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
