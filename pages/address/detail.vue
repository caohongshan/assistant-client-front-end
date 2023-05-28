<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options"
			collection="uni-id-address,opendb-city-china"
			field="user_id,name,alias,mobile,mobile_area_code,province_code,city_code,area_code{name},address,formatted_address,zip_code,email,is_default"
			:where="queryWhere" :getone="true" :manual="true">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
			</view>
			<view v-else-if="data">
				<view>
					<text>user_id:</text>
					<text>{{data.user_id}}</text>
				</view>
				<view>
					<text>收货人:</text>
					<text>{{data.name}}</text>
				</view>
				<view>
					<text>地址别名:</text>
					<text>{{data.alias}}</text>
				</view>
				<view>
					<text>手机号:</text>
					<text>{{data.mobile}}</text>
				</view>
				<view>
					<text>国际区号:</text>
					<text>{{data.mobile_area_code}}</text>
				</view>
				<view>
					<text>省:</text>
					<text>{{data.province_code}}</text>
				</view>
				<view>
					<text>市:</text>
					<text>{{data.city_code}}</text>
				</view>
				<view>
					<text>省市区:</text>
					<text>{{data.area_code[0].name}}</text>
				</view>
				<view>
					<text>详细住址:</text>
					<text>{{data.address}}</text>
				</view>
				<view>
					<text>formatted_address:</text>
					<text>{{data.formatted_address}}</text>
				</view>
				<view>
					<text>邮编:</text>
					<text>{{data.zip_code}}</text>
				</view>
				<view>
					<text>邮箱:</text>
					<uni-link :href="'mailto:'+data.email" :text="data.email"></uni-link>
				</view>
				<view>
					<text>默认地址:</text>
					<text>{{data.is_default == true ? '✅' : '❌'}}</text>
				</view>

			</view>
		</unicloud-db>
		<view class="btns">
			<button type="primary" @click="handleUpdate">修改</button>
			<button type="warn" class="btn-delete" @click="handleDelete">删除</button>
		</view>
	</view>
</template>

<script>
	// 由schema2code生成，包含校验规则和enum静态数据
	import { enumConverter } from '../../js_sdk/validator/uni-id-address.js';

	export default {
		data() {
			return {
				queryWhere: '',
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				options: {
					// 将scheme enum 属性静态数据中的value转成text
					...enumConverter
				}
			}
		},
		onLoad(e) {
			this._id = e.id
		},
		onReady() {
			if (this._id) {
				this.queryWhere = '_id=="' + this._id + '"'
			}
		},
		methods: {
			handleUpdate() {
				// 打开修改页面
				uni.navigateTo({
					url: './edit?id=' + this._id,
					events: {
						// 监听修改页面成功修改数据后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			},
			handleDelete() {
				this.$refs.udb.remove(this._id, {
					success: (res) => {
						// 删除数据成功后跳转到list页面
						uni.navigateTo({
							url: './list'
						})
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 10px;
	}

	.btns {
		margin-top: 10px;
		display: flex;
		flex-direction: row;
	}

	.btns button {
		flex: 1;
	}

	.btn-delete {
		margin-left: 10px;
	}
</style>
