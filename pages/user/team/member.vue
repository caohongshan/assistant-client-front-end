<template>
	<view class="padding-22">
		<tian-empty v-if="dataList.length == 0" text="暂无邀请记录" marginTop="280" mode="pengyou"></tian-empty>
		<block v-else>
			<view class="">
				<tian-icons type="taiyang" color="#eb4e38" size="20" align="left">{{ legend.todaySign }}:
				</tian-icons>
				<tian-icons type="yueliang" color="#0000ff" size="20" align="left" class="margin-left-32">
					{{ legend.monthSignRate }}:
				</tian-icons>
			</view>
			<view v-for="(item, index) in dataList" :key="index"
				class="ti-flex bg-white border-radius padding-22 margin-top-22">
				<image :src="item.avatar" mode="aspectFill" class="image-width-100 bg-white border-radius padding-2">
				</image>
				<view class="flex-1 margin-left-18">
					<text>{{ item.nickname }}</text>
					<view class="font-24">
						<tian-icons type="taiyang" :color="item.todaySignin ? '#eb4e38' : '#cccccc'" size="20">
						</tian-icons>
					</view>
					<view class="font-24">
						<tian-icons type="yueliang" :color="item.signinLength > 0 ? '#0000ff' : '#cccccc'" size="20"
							align="right">
							<text>{{ item.signinRate }}%</text>
						</tian-icons>
					</view>
				</view>
				<view class="text-right" @click="tel(item.mobile)">
					<tian-icons type="dianhua" class="margin-left-10" color="#eb4e38" size="20" align="left">
						{{ item.mobile }}
					</tian-icons>
					<view class="">
						<!-- <text class="font-26">{{item.invite_time}}</text> -->
						<uni-dateformat class="font-20 margin-left-20" :date="item.invite_time" format="yyyy/MM/dd"
							:threshold="[60000, 3600000]"></uni-dateformat>
					</view>
					<block v-if="item.statistics">
						<view class="font-20">
							<text>总邀请：{{ item.statistics.invite_all_total }}</text>
						</view>
						<view class="font-20">
							<text>直接邀请：{{ item.statistics.invite_total }}</text>
						</view>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level: 1,
				time: "",
				page: 0,
				limit: 20,
				legend: {
					todaySignRate: '今日签到率',
					todaySign: '今日签到',
					monthSignRate: '近30日签到率'
				},
				dataList: []
			};
		},
		onLoad(e) {
			this.level = e.level;
			this.time = e.time;
			if (e.title) {
				this.barTitle = e.title;
			}
			this.loadMemberData();
		},
		onReachBottom() {
			if (this.loadingType == 'more') {
				this.loadMemberData();
			}
		},
		methods: {
			loadMemberData() {
				this.loadingType = 'loading';
				this.page++;
				this.$request(
					'user/info/teammember', {
						level: this.level,
						time: this.time,
						page: this.page,
						limit: this.limit,
						my_invite_code: '21'
					}, {
						loading: true
					}
				).then(res => {
					console.log('loadMemberData', res);
					this.buildMember(res);
					if (this.page == 1) {
						this.dataList = res;
					} else {
						this.dataList = this.dataList.concat(res);
					}
					if (res.length < this.limit) {
						this.loadingType = 'noMore';
					} else {
						this.loadingType = 'more';
					}
				});
			},
			tel(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
