<template>
	<view class="padding-22">
		<view class="border-radius bg-white font-20">
			<view class="text-center padding-22 ti-flex flex-column"
				@click="navTo('/pages/user/team/member?level=0&title=我的粉丝')">
				<text class="font-40 colorRed">{{statistics.invite_all_total}}</text>
				<text>我的粉丝</text>
			</view>
			<view class="ti-flex">
				<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column"
					@click="navTo('/pages/user/team/member?level=1&title=我的直推')">
					<text class="font-36 colorRed padding-6">{{statistics.invite_total}}</text>
					<text>我的直推</text>
				</view>
				<view class="text-center flex-1 padding-22 left-line padding-bottom-36 ti-flex flex-column"
					@click="navTo('/pages/user/team/member?level=2&title=我的社群')">
					<text
						class="font-36 colorRed padding-6">{{statistics.invite_all_total-statistics.invite_total}}</text>
					<text>我的社群</text>
				</view>
			</view>
		</view>
		<view class="padding-top-22">
			<text>签到情况</text>
		</view>
		<view class="ti-flex border-radius bg-white margin-top-12 font-20">
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column"
				@click="navTo('/pages/user/tasks')">
				<text class="font-28"
					:class="{colorRed:!todaySignin,colorGreen:todaySignin}">今日{{todaySignin?'已签到':'未签到'}}</text>
			</view>
			<view class="text-center flex-1 padding-22 left-line padding-bottom-36 ti-flex flex-column">
				<text class="font-36 colorRed padding-6">{{todayRate}}%</text>
				<text>今日签到率</text>
			</view>
			<view class="text-center flex-1 padding-22 left-line padding-bottom-36 ti-flex flex-column">
				<text class="font-36 colorRed padding-6">{{signinRate}}%</text>
				<text>近30日签到率</text>
			</view>
		</view>
		<view class="padding-top-22">
			<text>新增积分情况</text>
			<text class="font-20 margin-left-10 colorGray"></text>
		</view>
		<view class="ti-flex border-radius bg-white margin-top-12 font-20">
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column">
				<text class="font-36 colorRed padding-6">{{scores.today}}</text>
				<text>今日</text>
			</view>
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column">
				<text class="font-36 colorRed padding-6">{{scores.yestoday}}</text>
				<text>昨日</text>
			</view>
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column">
				<text class="font-36 colorRed padding-6">{{scores.week}}</text>
				<text>近7日</text>
			</view>
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column">
				<text class="font-36 colorRed padding-6">{{scores.month}}</text>
				<text>近30日</text>
			</view>
		</view>
		<view class="padding-top-22">
			<text>新增人员情况</text>
			<text class="font-20 margin-left-10 colorGray">(直推人数/总推荐人数，点击查看详情)</text>
		</view>
		<view class="ti-flex border-radius bg-white margin-top-12 font-20">
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column"
				@click="navTo('/pages/user/team/member?level=1&time=today&title=今日新增')">
				<text
					class="font-36 colorRed padding-6">{{statistics.today_zhi_total}}/{{statistics.today_total}}</text>
				<text>今日</text>
			</view>
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column"
				@click="navTo('/pages/user/team/member?level=1&time=yestoday&title=昨日新增')">
				<text
					class="font-36 colorRed padding-6">{{statistics.yestoday_zhi_total}}/{{statistics.yestoday_total}}</text>
				<text>昨日</text>
			</view>
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column"
				@click="navTo('/pages/user/team/member?level=1&time=week&title=近7日新增')">
				<text class="font-36 colorRed padding-6">{{statistics.week_zhi_total}}/{{statistics.week_total}}</text>
				<text>近7日</text>
			</view>
			<view class="text-center flex-1 padding-22 padding-bottom-36 ti-flex flex-column"
				@click="navTo('/pages/user/team/member?level=1&time=month&title=近30日新增')">
				<text
					class="font-36 colorRed padding-6">{{statistics.month_zhi_total}}/{{statistics.month_total}}</text>
				<text>近30日</text>
			</view>
		</view>
		<view class="padding-top-22" v-if="inviters">
			<text>我的推荐人</text>
		</view>
		<view v-if="inviters" v-for="(item, index) in inviters" :key="index"
			class="ti-flex bg-white border-radius padding-22 margin-top-12">
			<image :src="item.avatar" mode="aspectFill" class="image-width-100 bg-white border-radius padding-2">
			</image>
			<view class="flex-1 margin-left-18">
				<view class="">
					<text>{{ item.nickname }}</text>
				</view>
				<!-- <tian-icons type="dianhua" v-if="item.mobile" @click="tel(item.mobile)" class="" color="#eb4e38" size="20" align="left">
					{{ item.mobile }}
				</tian-icons> -->
				<view class="font-20 colorGray">
					<text>{{ item.callname }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zhijie: 0,
				total: 0,
				inviters: false,
				todaySignin: false,
				todayRate: "0.00",
				signinRate: "0.00",
				statistics: {
					invite_all_total: 0, //总的邀请人数
					invite_total: 0, //直推人数
					today_rate: 0, //今日签到率

					today_total: 0,
					month_total: 0,
					yestoday_total: 0,
					week_total: 0,

					today_zhi_total: 0,
					month_zhi_total: 0,
					yestoday_zhi_total: 0,
					week_zhi_total: 0,
				},
				legend: {
					todaySignRate: '今日签到率',
					todaySign: '今日签到',
					monthSignRate: '当月签到率'
				},
				scores: {
					today: 0,
					yestoday: 0,
					week: 0,
					month: 0,
				}
			};
		},
		onLoad() {
			this.loadData();
		},
		computed: {
			totalText() {
				return this.statistics.invite_total + '人';
			},
			fansTotalText() {
				return (this.total - this.zhijie) + '人';
			}
		},
		methods: {
			loadData() {
				this.$request(
					'user/info/team', {
						level: 1,
						my_invite_code: "21"
					}, {
						loading: true
					}
				).then(res => {
					console.log('team', res);
					this.setRootData(res)

					if (this.inviters) {
						this.buildMember(this.inviters);
					}
				});
			},
			buildMember(data) {
				let info = {
					balance: 0,
					score: 0,
					coupon: 0,
					avatar: '/static/missing-face.png',
					nickname: '匿名'
				};
				data.forEach(item => {
					for (let key in info) {
						if (!item[key]) {
							item[key] = info[key];
						}
					}
					//处理邀请时间
					// item.invite_time = this.$dateFormat("Y/m/d", item.invite_time)
				});
				console.log('loadMember', data);
			},
			tel(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile
				});
			}
		}
	};
</script>

<style lang="scss"></style>
