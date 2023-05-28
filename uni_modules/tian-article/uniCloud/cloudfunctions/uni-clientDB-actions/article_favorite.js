// 开发文档：https://uniapp.dcloud.io/uniCloud/clientdb?id=action
const db = uniCloud.database();
const cmd = db.command;
const articleCollection = db.collection("opendb-news-articles");
const favoriteCollection = db.collection("opendb-news-favorite");
const tianFavoriteCollection = db.collection("tian-mall-favorite");
module.exports = {
	before: async (state, event) => {
		// console.log("article favorite", state)
		//@@@@@@@@@@@@@@@@@@@本方法弃用@@@@@@@@@@@@@@@@@@@
		//2022-09-20，新增操作，不执行after方法，所以放到before
		const {
			uid
		} = state.auth;
		if (state.type == "create" && state.newData.article_id && uid) {
			console.log("添加收藏")
			let {
				data: articleData
			} = await articleCollection.doc(state.newData.article_id).get();
			if (articleData.length > 0) {
				let article = articleData[0]
				await tianFavoriteCollection.add({
					id: article._id,
					title: article.title,
					avatar: article.avatar,
					description: article.excerpt,
					type: "article",
					user_id: uid,
					create_date: Date.now()
				});
				console.log("添加收藏完成")
				//增加收藏量
				await articleCollection.doc(state.newData.article_id).update({
					like_count: cmd.inc(1)
				});
			}
		}
	},
	after: async (state, event, error, result) => {
		if (error) {
			console.log("error", error)
			// throw error
		}
		const {
			uid
		} = state.auth;
		let where = state.command.getParam({
			name: 'where',
			index: 0
		});
		let article_id = where[0].article_id;
		console.log("article_id", article_id)
		console.log("uid", uid, state.type)
		if (!uid) {
			console.log("未登录", uid)
			result.data = "未登录"
			return result;
		}
		// 操作类型，可能的值'read'、'create'、'update'、'delete'
		let type = state.type;
		if (type == "delete") {
			console.log("移除收藏")
			//移除收藏
			await tianFavoriteCollection.where({
				user_id: uid,
				type: "article",
				id: article_id
			}).remove()
			//减少收藏量
			await articleCollection.doc(article_id).update({
				like_count: cmd.inc(-1)
			});
		}
		return result
	}
}
