/**
 * 商城模块，管理购物车，大分类选择
 */
export default {
	namespaced: true,
	state: {
		cartCount: 0, //购物车总数量，显示在导航栏
		getCartTime: 0, //获取购物车最后时间
		mainCategory: {},
		articleRead: [] //已读文章列表，只用于新增的文章ID
	},
	mutations: {
		/**
		 * 切换主分类，在分类菜单，需要选中
		 */
		TOGGLE_CATEGORY_ACTIVE: (state, category) => {
			state.mainCategory = category
		},
		/**
		 * 设置购物车总数量
		 */
		UPDATE_CART_NUMBER: (state, number) => {
			state.cartCount = number;
		},
		/**
		 * 递增/递减购物车总数量
		 */
		INCREMENT_CART_NUMBER: (state, step) => {
			console.log("递增购物车数量", step)
			state.cartCount += step;
		},
		UPDATE_ARTICLE_READ(state, id) {
			//不用重复增加
			if (state.articleRead.indexOf(id) == -1) {
				state.articleRead.push(id);
			}
		}
	},
	actions: {
		async getCartTotal({
			state,
			commit
		}) {
			//取消购物车数量显示
			/* console.log("getCartTotal")
			const db = uniCloud.database();
			let isLogin = this.getters['user/isTokenValid'];
			if (isLogin) {
				let {
					result
				} = await db.collection('opendb-mall-cart').where("user_id==$cloudEnv_uid")
					.field(
						"amount,user_id")
					.groupBy(
						"user_id").groupField("sum(amount) as total").get({
						getOne: true
					});
				console.log("getCartTotal", result.data)
				if (result.data) {
					state.cartCount = +result.data.total;
				}
			} else {
				state.cartCount = 0;
			} */
		},
	}
}
