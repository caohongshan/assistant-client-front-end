// #ifdef MP-WEIXIN
//https://uniapp.dcloud.io/api/plugins/share?id=onshareappmessage
export default {
	onShareAppMessage(res) {
		if (res.target && res.target.dataset && res.target.dataset.title && Object.keys(res.target.dataset).length >
			0) {
			//被转换成了小写
			if (res.target.dataset["imageurl"]) {
				res.target.dataset["imageUrl"] = res.target.dataset["imageurl"];
			}
			return res.target.dataset;
		}
		if (this.share) {
			return this.share;
		}
		return {

		};
	},
	onShareTimeline(res) {
		if (this.share) {
			let queryArr = this.share.path.split("?")
			return {
				...this.share,
				query: queryArr.length > 1 ? queryArr[1] : ""
			};
		}
		return {

		};
	}
}
//#endif
