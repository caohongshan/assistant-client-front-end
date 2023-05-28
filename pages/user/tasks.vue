<template>
	<view>
		<view v-for="(task, index) in dataList" :key="index"
			class="ti-flex bg-white margin-22 padding-22 border-radius">
			<tian-icons :type="task.icon" size="32"></tian-icons>
			<view class="flex-1 margin-left-16">
				<view class="">
					<text>{{ task.name }}</text>
				</view>
				<view class="font-24 colorGray margin-top-8">
					<text>{{ task.note }}</text>
				</view>
				<view class="progress margin-top-8 ti-flex" v-if="task.per_amount > 1">
					<progress class="flex-1 margin-right-8" color="#eb4e38" :percent="task.percent"></progress>
					<text>{{ task.finishAmount }}/{{ task.per_amount }}</text>
				</view>
			</view>
			<view class="margin-left-30">
				<button type="warn" :disabled="task.disabled" size="mini"
					@click="navTo(task.open_url, task)">{{ task.finish }}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import adMixin from '@/common/mixin/ad';
	export default {
		mixins: [adMixin],
		data() {
			return {
				resultKey: '',
				dataList: []
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo;
			},
			tasks() {
				return this.$store.state.user.tasks;
			},
			adConfig() {
				if (this.$store.state && this.$store.state.app.adConfig && this.$store.state.app.adConfig.tasks) {
					return this.$store.state.app.adConfig.tasks;
				}
				return {};
			}
		},
		onLoad() {
			this.buildTaskResult();
			// this.loadData();
			// this.loadTaskLog();
			this.resultKey = 'user_task_done_' + this.userInfo._id + this.$dateFormat('Y_m_d');
			setTimeout(() => {
				//#ifdef APP-PLUS
				// this.showInterstitialAd()
				//#endif
			}, 500)
		},
		methods: {
			buildTaskResult() {
				this.$request('user/task/all', {}, {}).then(res => {
					let tasks = [...res];
					tasks.forEach(task => {
						// let hour = new Date().getHours();
						let hour = task.hour;
						//已完成进度
						task.finishAmount = 0;
						task.disabled = false;
						//是否已完成
						task.finish = '待完成';
						task.note = `可获得${task.max_get_amount}积分`;
						let dayLimit = task.max_per_day;
						let hourLimit = task.max_per_hour;
						if (task.log) {
							//剩余数量
							dayLimit = task.max_per_day - task.log.amount;

							if (task.log.hour_times && task.log.hour_times[hour]) {
								hourLimit = task.max_per_hour - task.log.hour_times[hour];
							}
						}
						//取最小
						if (dayLimit > hourLimit) {
							dayLimit = hourLimit;
						}
						task.dayLimit = dayLimit;
						if (task.log && task.log.amount > 0) {
							task.finishAmount = task.log.amount;
							if (task.log.result) {
								task.note += `，已获得${task.log.bounty}积分`;
								// task.finish = "已完成";
								task.disabled = task.per_amount > 1;
								if (task.isLimited || task.disabled) {
									task.finish = '已完成';
								} else {
									//剩余次数
									task.finish = `剩余${task.dayLimit}次`;
								}
							}
						}
						task.percent = (task.finishAmount / task.per_amount) * 100;
					});
					console.log(tasks);
					this.dataList = tasks;
				});
			}
		}
	};
</script>