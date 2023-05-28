// 开发文档：https://uniapp.dcloud.io/uniCloud/clientdb?id=action
const db = uniCloud.database();
const cmd = db.command;
const articleCollection = db.collection("opendb-news-articles");
const visitCollection = db.collection("tian-mall-visit");
const favoriteCollection = db.collection("tian-mall-favorite");
const taskCollection = db.collection("uni-id-task");
module.exports = {
	before: async (state, event) => {

	},
	after: async (state, event, error, result) => {
		if (error) {
			throw error
		}
		const {
			uid
		} = state.auth;
		let read_ip = ""; //暂时获取不到
		let article_read_id = "";
		let normal = true;
		let getDouble = false;
		let article_id = result.data._id;
		let dayTime = getTodayTime(0, 1);
		if (uid) {
			result.data.dayTime = dayTime;
			//每个用户，每天只有一次
			let readResult = await visitCollection.where({
				id: article_id,
				type: "article",
				user_id: uid,
				// create_date: cmd.gt(dayTime)//存在唯一索引约束
			}).get();
			if (readResult.data.length == 0) {
				readResult = await visitCollection.add({
					id: article_id,
					title: result.data.title,
					avatar: result.data.avatar,
					description: result.data.excerpt ? result.data.excerpt.substr(0, 30) : "",
					type: "article",
					user_id: uid,
					read_ip,
					getdouble: false,
					create_date: Date.now()
				})
				article_read_id = readResult.id;
				getDouble = true;
			} else {
				normal = false;
				article_read_id = readResult.data[0]._id;
				//今天之前的日期
				if (readResult.data[0].create_date < dayTime) {
					//更新日期和状态
					await visitCollection.doc(article_read_id).update({
						title: result.data.title,
						avatar: result.data.avatar,
						description: result.data.excerpt ? result.data.excerpt.substr(0, 30) : "",
						getdouble: false,
						create_date: Date.now()
					})
					getDouble = true;
				} else {
					getDouble = !readResult.data[0].getdouble;
				}
			}
			if (getDouble) {
				//返回阅读任务，判断是否获得双倍
				let tastResult = await taskCollection.where({
					open_url: "::view_aritcle",
					enable: true
				}).orderBy("sort", "asc").limit(1).get();
				if (tastResult.data.length > 0) {
					result.data.task = {
						...tastResult.data[0],
						normal: normal,
						data: {
							article_id,
							article_read_id
						}
					};
				}
			}
			//检查是否已经收藏，前端页面不需要再次请求服务器
			const {
				data: favData
			} = await favoriteCollection.where({
				id: article_id,
				type: "article",
				user_id: uid
			}).get();
			result.data.isFav = favData.length > 0
		}
		if (result.data.content) {
			result.data.content = result.data.content.replace(/<\/?section>/g, '').replace(/<\/?section(.*)>/g,
					'').replace(/&ldquo;/g, '“')
				.replace(/&rdquo;/g, '”').replace(/&nbsp;/g, ' ').replace(/&amp;/g, "&").replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"");

			//可能存在多个视频
			let videos = result.data.content.match(/<source src=[\'\"]?([^\'\"]*).mp4[\'\"]?/gi);
			if (videos && videos.length > 0) {
				result.data.videos = videos.map(str => str.match(/<source src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1])
			}
			//删除video
			// result.data.content = result.data.content.replace(/<video(.*)/g, '')

		}
		//增加阅读量
		await articleCollection.doc(article_id).update({
			view_count: cmd.inc(1)
		});

		return result
	}
}
let timeZone = 8;

function getTodayTime(day = 0, check = false) {
	let time = new Date();
	time.setMinutes(0);
	time.setSeconds(0);
	time.setMilliseconds(0);
	if (check) {
		//由于时差问题，我们的0点，是utc的前一天16点
		time.setHours(time.getHours() + timeZone);
		time.setHours(timeZone * -1);
	} else {
		time.setHours(0);
	}
	if (day != 0) {
		time.setDate(time.getDate() + day);
	}
	return time.getTime();
}
