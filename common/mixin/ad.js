//#ifdef APP-PLUS
import AD from "@/common/js/ad.js";
//#endif
//#ifdef MP-WEIXIN
import AD from "@/common/js/ad-mp-weixin.js";
//#endif

export default {
	data() {
		return {
			loaded: false,
			adTimer: null
		}
	},
	watch: {
		barTitle(newVal) {
			uni.setNavigationBarTitle({
				title: newVal
			});
		},
		adConfig() {
			this.loadVideoAd();
		},
	},
	computed: {
		videoAdWaittingTime() {
			//视频广告完成后，需要等待时长
			return this.$store.state.app.customer.videoAdWaittingTime;
		}
	},
	onLoad() {
		//预加载签到视频广告
		// this.loadVideoAd();
	},
	onUnload() {
		clearTimeout(this.adTimer)
	},
	onShow() {
		console.log("ad onShow")
		//#ifdef MP-WEIXIN
		AD.destory()
		//#endif
	},
	methods: {
		loadVideoAd() {
			//#ifdef APP-PLUS
			// console.log("预加载广告开始")
			if (this.adConfig) {
				//签到广告
				if (this.adConfig.signin) {
					AD.load({
						adpid: this.adConfig.signin,
						adType: "RewardedVideo"
					})
				}
				//全屏视频广告
				if (this.adConfig.video) {
					AD.load({
						adpid: this.adConfig.video,
						adType: "FullScreenVideo"
					})
				}
				//插屏广告
				if (this.adConfig.interstitial) {
					AD.load({
						adpid: this.adConfig.interstitial,
						adType: "Interstitial"
					})
				}
			}
			//#endif
		},
		loadVideoAdByConfig(config) {
			//#ifndef MP-WEIXIN
			AD.load({
				...config
			})
			//#endif
		},
		/**
		 * 签到赚积分，弹出签到广告
		 * @param {Object} task
		 */
		signin(task) {
			console.log("签到赚积分")
			//#ifdef MP-WEIXIN || APP-PLUS
			return this.showRewardedVideoAd(task, "signin");
			//#endif
			// this.finishTask(task, "signin", {})
		},
		articleRead(task) {
			console.log("阅读文章赚积分")
			return this.finishTask(task, "finish", {}, false)
		},
		view_aritcle() {
			uni.switchTab({
				url: "/pages/index/index"
			})
		},
		getDoubleScore(task, module) {
			console.log("阅读文章看广告赚积分")
			//#ifdef MP-WEIXIN || APP-PLUS
			this.showRewardedVideoAd(task, "getdouble", {
				module
			}) || this.showFullScreenVideoAd(task, "getdouble", {
				module
			});
			//#endif
			/* this.finishTask(task, "getdouble", {
				module
			}) */
		},
		shareToFriend(task) {
			let data = this.$stringFormat(task.data, {
				my_invite_code: this.userInfo.my_invite_code
			});
			console.log("分享app获得积分", data)

			uni.share({
				provider: "weixin",
				scene: "WXSceneSession",
				type: 0,
				...JSON.parse(data),
				success: (res) => {
					this.finishTask(task, "share", {}, false)
					console.log("success:" + JSON.stringify(res));
				},
				fail: (err) => {
					console.log("fail:" + JSON.stringify(err));
				}
			});
		},
		showRewardedVideoAd(task, type = "signin", data = {}) {
			if (!task.adpid && !this.adConfig.signin) {
				this.$message("获取广告失败")
			}
			let config = {
				adpid: task.adpid || this.adConfig.signin, // HBuilder 基座测试广告位
				adType: "RewardedVideo"
			}
			// 调用后会显示 loading 界面
			AD.show(config, (res) => {
				this.loadVideoAdByConfig(config)
				// 用户点击了【关闭广告】按钮，后台允许中途退出
				if (res && res.isEnded || task.middle_getout) {
					// 正常播放结束
					this.finishTask(task, type, data)
					console.log("onClose " + res.isEnded);
				} else {
					// 播放中途退出
					console.log("中途退出onClose " + res.isEnded);
					uni.showToast({
						title: "中途退出，无奖励",
						icon: "none"
					})
				}
			}, (err) => {
				// 广告加载错误
				console.log(err)
				if (err.errMsg && err.errMsg.indexOf("广告加载失败") != -1) {
					console.log("广告出错了，切换为视频广告")
					this.showFullScreenVideoAd(task, type, data);
				} else {
					uni.showToast({
						title: err.errMsg || "加载广告失败",
						icon: "none"
					})
				}
			})
			return true;
		},
		showFullScreenVideoAd(task, type = "finish", data = {}) {
			if (!task.adpid && !this.adConfig.video) {
				this.$message("获取广告失败")
				return false;
			}
			let config = {
				adpid: task.adpid || this.adConfig.video, // HBuilder 基座测试广告位
				adType: "FullScreenVideo"
			};
			// 调用后会显示 loading 界面
			AD.show(config, (res) => {
				this.loadVideoAdByConfig(config)
				// 用户点击了【关闭广告】按钮，后台允许中途退出
				if (res && res.isEnded || task.middle_getout) {
					// 正常播放结束
					this.finishTask(task, type, data)
					console.log("onClose " + res.isEnded);
				} else {
					// 播放中途退出
					console.log("中途退出onClose " + res.isEnded);
					uni.showToast({
						title: "中途退出，无奖励",
						icon: "none"
					})
				}
			}, (err) => {
				// 广告加载错误
				console.log(err)
				uni.showToast({
					title: err.errMsg || "加载广告失败",
					icon: "none"
				})
			})
			return true;
		},
		showInterstitialAd() {
			if (!this.adConfig || !this.adConfig.interstitial) {
				// this.$message("获取广告失败")
				return false;
			}
			let config = {
				adpid: this.adConfig.interstitial, //this.adConfig.interstitial, // HBuilder 基座测试广告位1111111113
				adType: "Interstitial"
			};
			AD.show(config, (res) => {
				this.loadVideoAdByConfig(config)
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束
					console.log("onClose " + res.isEnded);
				} else {
					// 播放中途退出
					console.log("onClose " + res.isEnded);
				}
			}, (err) => {
				// 广告加载错误
				console.log(err)
			})
			return true;
		},
		finishTask(task, type = "finish", data = {}, isVideo = true) {
			let task_log_id = "";
			if (task.log && task.log._id) {
				task_log_id = task.log._id;
			}
			this.$request('user/task/' + type, {
				data: task.data,
				...data,
				task_log_id,
				task_id: task._id
			}, {
				loading: true
			}).then(res => {
				console.log("finishTask", res)
				//更新任务日志amount,result
				this.$store.commit('user/UPDATE_TASK_LOG', res)
				//重新加载广告
				// this.loadVideoAd();
				this.showWaitAdTime(res, isVideo ? this.videoAdWaittingTime : 0);
			}, err => {
				uni.hideLoading();
			});
		},
		showWaitAdTime(res, number) {
			this.loaded = false;
			if (number > 0) {
				uni.showLoading({
					mask: true,
					title: `${number}秒冷却时间`
				})
				this.adTimer = setTimeout(() => {
					this.showWaitAdTime(res, number - 1);
				}, 1000)
			} else {
				uni.hideLoading();
				this.loaded = true;
				this.finishTaskResult(res)
				this.buildTaskResult(res);
			}
		},
		/**
		 * 提示消息,页面可以单独自定义
		 * @param {Object} res
		 */
		finishTaskResult(res) {
			if (res.getDouble) {
				this.$message(`获得翻倍奖励 +${res.task.bounty}`)
			} else if (res.getScore) {
				this.$message(`获得奖励 +${res.task.bounty}`)
			} else if (res.needMore) {
				this.$message(`已完成${res.amount}次`)
			} else if (res.result) {
				this.$message("已完成")
			} else {
				uni.hideLoading();
			}
		},
		buildTaskResult(log) {}
	},
}
