<template>
	<view class="user-container">
		<view class="header border-radius padding-22">
			<view class="header-panel padding-bottom-22 ">
				<image :src="userInfo.avatar" mode="aspectFill" @click="navToUserInfo"
					class="image-width-120 bg-white border-radius padding-2"></image>
				<view class=" margin-left-30 colorWhite flex-1">
					<view class="padding-top-8" @click="navToUserInfo">
						<text>{{ userInfo.nickname }}</text>
					</view>
					<view class="font-24 padding-top-14" v-if="userInfo.my_invite_code">
						<text>邀请码：</text>
						<text>{{userInfo.my_invite_code}}</text>
					</view>
					<view class="font-24 " v-if="userInfo.mobile">
						<text>手机号：</text>
						<text>{{ userInfo.mobile }}</text>
					</view>
					<view class="font-20 member " v-if="userInfo.member">
						<text class="name">{{ userInfo.member.name }}</text>
					</view>
				</view>
				<tian-icons type="singin" v-if="hasSign" icolor="#ffffff" size="28" @click="navToSign">
					<text class="font-20 colorWhite">{{taskBtnText}}</text>
				</tian-icons>
			</view>
			<view class="ti-flex margin-top-40 colorWhite padding-bottom-22">
				<view class="ti-flex flex-column flex-1" @click="navTo('/pages/user/balances', {}, { login: 1 })">
					<text>{{ userInfo.balance / 100 }}</text>
					<text class="font-24">余额</text>
				</view>
				<view class="ti-flex flex-column flex-1 left-line"
					@click="navTo('/pages/user/scores', {}, { login: 1 })">
					<text>{{ userScore }}</text>
					<text class="font-24">{{scoreName}}</text>
				</view>
				<view class="flex-1 left-line">
					<button v-if="isLogin && !userInfo.hasMobile" open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber" class="unbutton">
						<view class="ti-flex flex-column colorWhite" style="font-weight:normal;">
							<text
								class="font-28 padding-bottom-8">{{ userInfo.statistics?userInfo.statistics.invite_all_total:0 }}</text>
							<text class="font-24">粉丝</text>
						</view>
					</button>
					<view class="ti-flex flex-column" v-else
						@click="navTo('/pages/user/team/member?level=0&title=我的粉丝', {}, { login: 1 })">
						<text>{{ userInfo.statistics?userInfo.statistics.invite_all_total:0 }}</text>
						<text class="font-24">粉丝</text>
					</view>
				</view>
				<view class="ti-flex flex-column flex-1 left-line"
					@click="navTo('/pages/user/coupons', {}, { login: 1 })">
					<text>{{ userInfo.coupon }}</text>
					<text class="font-24">优惠券</text>
				</view>
			</view>
		</view>
		<view class="content-body margin-22 padding-22 bg-white border-radius">
			<view class="title ti-flex between" @click="navTo('/pages/order/order?type=all', {}, { login: true })">
				<tian-icons type="dingdan" align="right" icolor="#ffad90">全部订单</tian-icons>
				<tian-icons type="xiangyou1" align="left" color="#c5c5c5"><text>查看</text></tian-icons>
			</view>

			<view class="ti-flex margin-top-60 padding-bottom-22 text-center">
				<tian-icons v-for="(op, index) in orderList" :key="index" :type="op.type" :icolor="op.color" size="30"
					class="flex-1" :badge="op.total" @click="navTo(op.open_url, {}, { login: op.checkLogin })">
					<text class="font-24 margin-top-12">{{ op.text }}</text>
				</tian-icons>
			</view>
		</view>
		<view class="content-body margin-22 padding-22 bg-white border-radius" v-if="adminShops && adminShops.length>0">
			<view class="title ti-flex between">
				<tian-icons type="dianpu" align="right" icolor="#ffad90">我的门店</tian-icons>
				<tian-icons type="xiangyou1" align="left" color="#c5c5c5"
					@click="navTo('/pages/enterprise/apply?mobile=true', {}, { login: true })"><text>申请入驻</text>
				</tian-icons>
			</view>

			<view class="">
				<view v-for="(item,index) in adminShops" :key="index"
					class="margin-top-20 ti-flex under-line padding-bottom-20" @click="navTo(item.page,item)">
					<image :src="$thumbImg(item.src,'80x80')" mode="aspectFill" class="image-width-80 border-radius">
					</image>
					<view class="flex-1 margin-left-12">
						<text class="font-32">{{item.name}}</text>
						<text v-if="item.id">({{item.id}})</text>
						<text v-if="item.stateText" class="margin-left-10 colorRed">{{item.stateText}}</text>
						<view class=" font-24 margin-top-8 colorRed" v-if="item.apply_result">
							<text>{{item.apply_result}}</text>
						</view>
						<view class=" font-24 colorGray margin-top-8" v-else-if="item.address">
							<text>{{item.address.address}}</text>
						</view>
					</view>
					<tian-icons type="xiangyou1" align="left" color="#c5c5c5">
					</tian-icons>
				</view>
			</view>
		</view>
		<view class="content-body margin-22 padding-22 bg-white border-radius">
			<view class="title ti-flex between">
				<tian-icons type="wode" align="right" icolor="#ffad90">个人管理</tian-icons>
				<tian-icons type="xiangyou1" align="left" color="#c5c5c5"
					@click="navTo('/pages/user/info', {}, { login: true })">查看</tian-icons>
			</view>

			<view class="ti-flex margin-top-60 padding-bottom-22 options">
				<view class="opt-item" v-for="(op, index) in optionDataList" :key="index"
					v-if="!op.mustLogin || isLogin">
					<button v-if="op.checkMobile && !userInfo.hasMobile" open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber" class="unbutton">
						<tian-icons :type="op.type" :icolor="op.color" size="26" class="">
							<text class="font-24 margin-top-12">{{ op.text }}</text>
						</tian-icons>
					</button>
					<tian-icons v-else :type="op.type" :icolor="op.color" size="26" class=""
						@click="navTo(op.open_url, {}, { login: op.checkLogin })">
						<text class="font-24 margin-top-12">{{ op.text }}</text>
					</tian-icons>
				</view>
			</view>
		</view>

		<uni-popup v-if="showTeamPopup" ref="teamPopup" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" title="加入团队提示" placeholder="请输入邀请者手机号/邀请码" :duration="2000"
				:before-close="true" @close="closeInvite" @confirm="confirmInvite"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import tabbarMixin from './mixin/tabbar';
	import adMixin from '@/common/mixin/ad';
	import { enumConverter } from '../../js_sdk/validator/tian-mall-shop-apply.js';
	
	const db = uniCloud.database();
	
	export default {
		mixins: [tabbarMixin, adMixin],
		data() {
			return {
				hasSign: false,
				isLocalLogin: false,
				adminShops: [],
				showTeamPopup: false, //兼容微信小程序，如果使用默认配置，界面上会弹出键盘
				taskBtnText: "",
				signTask: {},
				orderList: [],
				stateMap: {},
				optionDataList: [],
				options: {
					...enumConverter
				}
			};
		},
		computed: {
			isLogin() {
				return this.$store.getters['user/isTokenValid'];
			},
			userInfo() {
				return this.$store.state.user.userInfo;
			},
			userScore() {
				return parseInt(this.userInfo.score);
			},
			adConfig() {
				if (this.$store.state && this.$store.state.app.adConfig && this.$store.state.app.adConfig.tasks) {
					return this.$store.state.app.adConfig.tasks;
				}
				return {};
			},
			scoreName() {
				if (this.$store.state.app.customer.scoreName) {
					return this.$store.state.app.customer.scoreName;
				}
				return "积分";
			}
		},
		watch: {
			stateMap(newVal) {
				console.log('watch stateMap', newVal);
				this.initOrder();
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('用户刷新整页');
			this.getStatistics();
			uni.stopPullDownRefresh();
		},
		onLoad() {
			uni.hideLoading();
			this.initOrder();
			this.initOptions();
			// this.getStatistics();
		},
		onShow() {
			console.log("user onShow")
			//刷新用户统计信息，余额，积分，优惠券，订单数量
			// this.getStatistics();
			if (!this.isLocalLogin) {
				this.getStatistics()
			}
		},
		methods: {
			loadData() {
				this.getStatistics()
			},
			async getStatistics() {
				if (this.isLogin) {
					// this.isLocalLogin = true;
					this.$request('user/info/info').then(res => {
						console.log('user statitics', res);
						this.$store.commit('user/SET_USER_INFO', res);
						this.initOptions();
					}, err => {
						console.log("getStatistics err", err)
					});
					this.getSignTask();
					//查询退换货数量
					let stateMap = {};
					let {
						result: {
							total
						}
					} = await db.collection("tian-mall-order-refunds").where("user_id==$cloudEnv_uid").count();
					stateMap["refund"] = total
					//订单统计
					db.collection('tian-mall-orders')
						.where('user_id==$cloudEnv_uid && is_delete==0 && state>=0')
						.groupBy('state')
						.groupField('count(*) as total')
						.get()
						.then(({
							result
						}) => {
							// console.log('user statitics2', result.data);
							result.data.forEach(stat => {
								stateMap[stat.state] = stat.total;
							});
							this.stateMap = stateMap;
						});
					this.getShopAdmin();
				} else {
					this.isLocalLogin = false;
					this.stateMap = {};
					this.initOptions();
					this.adminShops = []
				}
			},
			async getShopAdmin() {
				//查询店铺信息
				let {
					result
				} = await db.collection('tian-mall-shops').where("uid==$cloudEnv_uid || employees==$cloudEnv_uid")
					.field(
						"name,id,src,online,address,phone,apply_id").limit(
						20).get();
				let applyIds = []
				result.data.forEach(e => {
					e.page = '/pages/enterprise/detail';
					if (e.apply_id) {
						applyIds.push(e.apply_id)
					}
				})
				let applyShops = await this.getShopApply(applyIds)
				this.adminShops = result.data.concat(applyShops);
				console.log("tian-mall-shops", result)
			},
			async getShopApply(applyIds) {
				//查询申请中的门店
				let {
					result
				} = await db.collection('tian-mall-shop-apply').where("uid==$cloudEnv_uid").field(
					"name,src,address,phone,id,state,apply_result").limit(
					200).get();
				return result.data.filter(e => applyIds.indexOf(e._id) == -1).map(e => {
					e.isApply = true;
					e.page = '/pages/enterprise/apply?id=' + e._id;
					e.stateText = this.options.state_valuetotext[e.state];
					if (e.state == 0) {
						e.apply_result = false;
					}
					return e;
				})
			},
			/**
			 * 签到任务
			 */
			getSignTask() {
				this.$request('user/info/sign_task', {}, {}).then(res => {
					this.buildSignTask(res);
				});
			},
			/**
			 * 获取签到任务
			 */
			buildSignTask(task) {
				if (!task) {
					return;
				}
				this.hasSign = true;
				this.taskBtnText = "签到"
				if (task.log && task.log.result) {
					this.taskBtnText = "已签到";
					task.open_url = false
				}
				this.signTask = task;
				console.log("this.signTask", this.signTask)
			},
			buildTaskResult(log) {
				delete log.task;
				this.signTask.log = log
				this.buildSignTask(this.signTask);
			},
			navToSign() {
				if (!this.signTask.open_url) {
					this.$message("今日已签到")
					return;
				}
				this.navTo(this.signTask.open_url, this.signTask)
			},
			logout() {
				this.confirmAction(() => {
					this.$request('user/login/logout').then(
						res => {
							console.log('退出成功', res);
							this.localLogout();
						},
						err => {
							console.log('退出失败', err);
							this.localLogout();
						}
					);
				}, '是否确定退出系统？');
			},
			localLogout() {
				//移除本地token
				this.$store.commit('user/REMOVE_TOKEN');
				//重置用户信息
				this.$store.commit('user/SET_USER_INFO', {});
				//清空购物车
				this.$store.commit('mall/UPDATE_CART_NUMBER', 0);
				this.stateMap = {};
			},
			checkTeam() {
				//检查是否存在上级邀请者inviter_uid
				// if (!this.userInfo.inviter_uid || this.userInfo.inviter_uid.length == 0) {
				// 	this.showTeamPopup = true;
				// 	this.$nextTick(() => {
				// 		this.$refs.teamPopup.open();
				// 	})
				// 	return;
				// }
				this.navTo('/pages/user/team/team');
			},
			closeInvite() {
				uni.showModal({
					title: '邀请提示',
					content: '是否确定放弃填写邀请人的权利？',
					confirmText: '放弃权利',
					cancelText: '暂时不填',
					success: res => {
						if (res.confirm) {
							this.$request(
								'user/info/jointeam', {
									mobile: 'none'
								}, {
									loading: true
								}
							).then(res => {
								console.log('jointeam', res);
								//设置成功,刷新用户信息
								this.$store.dispatch('user/getUserInfo');
								this.navTo('/pages/user/team');
							});
						} else {
							this.$refs.teamPopup.close()
						}
					}
				});
			},
			confirmInvite(value) {
				if (!value) {
					this.$message('请填写邀请码');
					return false;
				}
				//检查邀请码是否合理
				this.$request(
					'user/info/jointeam', {
						mobile: value
					}, {
						loading: true
					}
				).then(res => {
					console.log('jointeam', res);
					this.$success('邀请成功');
					//设置成功,刷新用户信息
					this.$store.dispatch('user/getUserInfo');
					this.$refs.teamPopup.close()
				});
			},
			initOptions() {
				let colom = 5,
					defColor = '#ec6535',
					color = '#ec6535';
				let optionDataList = [{
						type: 'gouwudai',
						text: '分销业绩',
						checkLogin: true,
						open_url: '/pages/user/achievement'
					}, {
						type: 'renwu',
						text: '每日任务',
						checkLogin: true,
						//#ifdef MP-WEIXIN
						checkMobile: false, //检查手机号是否存在
						//#endif
						open_url: '/pages/user/tasks'
					},
					{
						type: 'fenxiang',
						text: '分享好友',
						checkLogin: true,
						//#ifdef MP-WEIXIN
						checkMobile: false, //检查手机号是否存在
						//#endif
						open_url: '/pages/user/invite'
					},
					{
						type: 'shangji1',
						text: '申请渠道',
						checkLogin: true,
						//#ifdef MP-WEIXIN
						checkMobile: true, //检查手机号是否存在
						//#endif
						open_url: '/pages/user/channel?type=1'
					},
					{
						type: 'shoucang',
						text: '我的收藏',
						checkLogin: true,
						open_url: '/pages/user/favorite'
					},
					{
						type: 'liuyan',
						text: '我的消息',
						checkLogin: true,
						open_url: '/pages/index/chat'
					},
					{
						type: 'zuobiao',
						text: '收货地址',
						checkLogin: true,
						open_url: '/pages/address/list'
					},
					{
						type: 'tongji',
						text: this.scoreName + '排行',
						checkLogin: true,
						open_url: '/pages/user/score/ranking'
					},
					// {
					// 	type: 'xinyongqia',
					// 	text: '消费排行',
					// 	checkLogin: true,
					// 	open_url: '/pages/product/favorite'
					// },
					{
						type: 'gonglve',
						text: '余额明细',
						checkLogin: true,
						open_url: '/pages/user/balances'
					},
					{
						type: 'liebiaoxingshi',
						text: this.scoreName + '明细',
						checkLogin: true,
						open_url: '/pages/user/scores'
					},
					{
						type: 'zhengli',
						text: this.scoreName + '互转',
						checkLogin: true,
						open_url: '/pages/user/score/transfer'
					},
					{
						type: 'tuikuan',
						text: this.scoreName + '兑换',
						checkLogin: true,
						open_url: '/pages/user/score/cashout'
					},
					{
						type: 'hongbao',
						text: '余额提现',
						checkLogin: true,
						open_url: '/pages/user/cashout'
					},
					{
						type: 'shezhi',
						text: '个人设置',
						checkLogin: true,
						open_url: '::navToUserInfo'
					},
					{
						type: 'kefu',
						text: '联系客服',
						open_url: '/pages/app/contact'
					},
					// {
					// 	type: 'fankui',
					// 	text: '意见反馈',
					// 	open_url: '/pages/app/feedback'
					// },
					// {
					// 	type: 'bangzhuzhongxin',
					// 	text: '关于我们', //<!-- 服务协议、隐私政策、资质证照 -->
					// 	open_url: '/pages/app/about'
					// }
				];
				//#ifndef MP
				optionDataList.push({
					type: 'tuichu',
					text: '账户管理',
					mustLogin: true,
					open_url: '/pages/user/account'
				});
				/* optionDataList.push({
					type: 'tuichu',
					text: '退出登录',
					mustLogin: true,
					open_url: '::logout'
				}); */
				//#endif
				optionDataList.unshift({
					type: 'pengyou',
					text: '我的团队',
					checkLogin: true,
					//#ifdef MP-WEIXIN
					checkMobile: false, //检查手机号是否存在
					//#endif
					open_url: '::checkTeam'
				});
				// optionDataList.unshift({
				// 	type: 'dianpu',
				// 	text: '门店入驻',
				// 	checkLogin: true,
				// 	//#ifdef MP-WEIXIN
				// 	checkMobile: true, //检查手机号是否存在
				// 	//#endif
				// 	open_url: '/pages/enterprise/apply'
				// });
				if (this.userInfo && this.userInfo.role && this.userInfo.role.indexOf("admin") != -1) {
					optionDataList.push({
						type: 'danpin',
						text: '系统管理',
						mustLogin: true,
						open_url: '/pages/admin/admin'
					});
				}
				optionDataList.forEach((e, index) => {
					if (parseInt(index / colom) % 2 == 1) {
						e.color = color;
					} else {
						e.color = defColor;
					}
				});
				this.optionDataList = optionDataList;
			},
			initOrder() {
				let colom = 5,
					defColor = '#ec6535',
					color = '#51b2f9';
				let optionDataList = [{
						type: 'baoguofahuo-xianxing',
						text: '待付款',
						checkLogin: true,
						state: 0,
						open_url: '/pages/order/order?type=unpay'
					},
					{
						type: 'baoguofahuo',
						text: '待发货',
						checkLogin: true,
						state: 1,
						open_url: '/pages/order/order?type=undelivery'
					},
					{
						type: 'yunshuzhongwuliu',
						text: '待收货',
						checkLogin: true,
						state: 2,
						open_url: '/pages/order/order?type=unreceived'
					},
					{
						type: 'liuyanfill',
						text: '待评价',
						checkLogin: true,
						state: 3,
						// open_url: '/pages/order/order?type=finish'
						open_url: '/pages/order/comment'
					},
					{
						type: 'chaibaoguoqujian',
						text: '退换货',
						checkLogin: true,
						state: "refund",
						open_url: '/pages/order/service'
					}
				];
				optionDataList.forEach((e, index) => {
					if (this.stateMap[e.state]) {
						e.total = this.stateMap[e.state];
					} else {
						e.total = 0;
					}
					if (parseInt(index / colom) % 2 == 1) {
						e.color = color;
					} else {
						e.color = defColor;
					}
				});
				this.orderList = optionDataList;
			},
			/**
			 * 微信绑定手机号，可能会与之前的账号合并
			 * @param {Object} e
			 */
			getPhoneNumber(e) {
				console.log('getPhoneNumber', e);
				if (!e.detail.iv) {
					return;
				}
				this.$request('user/login/weixin_phone', {
					...e.detail,
					sessionKey: this.$store.state.user.sessionKey,
					uid: this.$store.state.user.userInfo._id,
					openid: this.$store.state.user.openid
				}, {
					loading: true
				}).then(res => {
					//设置成功,刷新用户信息
					console.log("getPhoneNumber", res)
					//刷新用户信息
					this.getStatistics();
				});
			},
			navToUserInfo() {
				this.navTo(
					'/pages/user/info', {}, {
						login: true
					}
				);
			},
			editData(data) {
				console.log('editData', data);
				this.$request('user/info/edit', data, {
					loading: true
				}).then(res => {
					//设置成功,刷新用户信息
					this.$store.dispatch('user/getUserInfo');
				});
			},
			changeAccount() {
				//多个商户切换
			}
		}
	};
</script>

<style lang="scss">
	.user-container {
		padding-top: $uni-spacing-row-base;

		.header {
			background: #ec6535;
			margin: 0 $uni-spacing-row-base;

			.header-panel {
				display: flex;
				align-items: center;
			}

			.username {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}

		.member {
			.name {
				font-size: 18rpx;
				margin-right: 12rpx;
				background: #000000;
				color: #ffffff;
				padding: 0 18rpx;
				border-radius: 50rpx;
			}
		}
	}

	.options {
		flex-wrap: wrap;

		.opt-item {
			width: 20%;
			margin-bottom: 40rpx;
			text-align: center;
		}
	}
</style>
