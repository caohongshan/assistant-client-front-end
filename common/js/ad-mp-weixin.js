//https://uniapp.dcloud.net.cn/api/a-d/rewarded-video
//https://developers.weixin.qq.com/minigame/dev/guide/open-ability/ad/rewarded-video-ad.html

class AdHelper {

	constructor() {
		console.log("AdHelper constructor")
		this.videoAd = null
	}

	load(options, onload, onerror) {}

	show(options, onsuccess, onerror) {
		let {
			adpid
		} = options

		if (!adpid) {
			return
		}
		this.onClose = onsuccess;
		this.onError = onerror;
		// 在页面onLoad回调事件中创建激励视频广告实例
		if (!this.videoAd && wx.createRewardedVideoAd) {
			this.videoAd = wx.createRewardedVideoAd({
				multiton: true,
				adUnitId: adpid
			})
			this.videoAd.onLoad(() => {
				console.log("onLoad")
			})
			this.videoAd.onError((err) => {
				console.log("onError", err)
				// this.onError(err);
			})
			this.videoAd.onClose((res) => {
				console.log("onClose", res)
				this.onClose(res);
			})
		}

		// 用户触发广告后，显示激励视频广告
		if (this.videoAd) {
			this.videoAd.show().catch((err) => {
				console.log("show error", err)
				// 失败重试
				this.videoAd.load()
					.then(() => {
						this.videoAd.show()
					})
					.catch(err => {
						console.log('激励视频 广告显示失败', err)
						this.onError(err);
					})
			})
		}
	}
	destory() {
		/* this.videoAd.destory(); */
		this.videoAd = null;
	}
}


export default new AdHelper()
