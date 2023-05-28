import uniImStorage from '@/common/uni-im-storage.js'

import utils from '@/common/utils.js'

// const db = uniCloud.database();

//获取会话数据的页码
let getConversationDatasPage = 0

function current_uid() {
	return uniCloud.getCurrentUserInfo().uid
}

export default {
	namespaced: true,
	state: {
		YOUR_API_KEY : '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',
		conversationDatas: {} || uni.getStorageSync('uni-im-conversation' + '_uid:' + current_uid()),
		currentConversationId: false,
		heartbeat: '',
		friendList: false,
		groupList: false,
		systemNoticeDatas: false,
		usersInfo:{} ,//存储用户信息，包括群好友信息
		isWidescreen:false ,//是否为pc宽屏
		systemInfo: {} ,//系统信息
		msgList: [
			// {
			// 	text: "看看",
			// 	client_msg_id: "1681724885625__75274101",
			// 	conversation_id: "single_385c77b73bd2e2ab2e78e08d04251fc5",
			// 	create_time: 1681723626089,
			// 	from_uid: "643ceff028064a03b7746848",
			// 	id: "uni-im-msg:single_385c77b73bd2e2ab2e78e08d04251fc5-1681723626089-0",
			// 	is_read: false,
			// 	type: "text",
			// 	_id: "643d10edf43e603fbec53d2f",
			// },
		]
	},
	getters: {
		systemNoticeDatas: (state, getters) => ({
			type,
			excludeType
		} = {}) => {
			let systemNoticeDatas = state.systemNoticeDatas || []
			return systemNoticeDatas.reduce((sum, item) => {
				if (type) {
					//兼容字符串和数组
					typeof type == 'string' ? type = [type] : ''
					if (type.includes(item.payload.subType)) {
						sum.push(item)
					}
				} else if (excludeType) {
					//兼容字符串和数组
					typeof excludeType == 'string' ? excludeType = [excludeType] : ''
					if (!excludeType.includes(item.payload.subType)) {
						sum.push(item)
					}
				} else {
					sum.push(item)
				}
				return sum
			}, [])
		},
		systemNoticeUnreadCount: (state, getters) => (param = {}) => {
			let systemNoticeDatas = getters.systemNoticeDatas(param)
			systemNoticeDatas = JSON.parse(JSON.stringify(systemNoticeDatas))
			let n = systemNoticeDatas.reduce((sum, item, index, array) => {
				if (!item.is_read) {
					sum++
				}
				return sum
			}, 0)
			if (n) {
				return n + ''
			} else {
				return ''
			}
		},
		unread_count(state, getters) {
			return getters.conversationList.reduce((sum, item, index, array) => sum + item.unread_count, 0)
		},
		conversationList(state) {
			const { conversationDatas } = state
			uni.setStorage({
				key: 'uni-im-conversation' + '_uid:' + current_uid(),
				data: conversationDatas
			})
			let conversationList = []
			for (let key in conversationDatas) {
				let item = JSON.parse(JSON.stringify(conversationDatas[key]))
				// console.log('item-----------',item);
				let msg = item.msgList && item.msgList[item.msgList.length - 1]
				if (item.chatText && state.currentConversationId != key) {
					msg = {
						body: "[uni-im-draft]" + item.chatText,
						type: 'text',
						create_time: Date.now()
					}
				}
				if (msg) {
					let last_msg_note = '[多媒体]'
					if (msg.type == 'text') {
						last_msg_note = msg.body.toString()
						last_msg_note = last_msg_note.replace(/[\r\n]/g, "");
						last_msg_note = last_msg_note.slice(0, 30)
					}
					item.last_msg_note = last_msg_note
					if (msg.create_time) {
						item.update_time = msg.create_time
					}
					// console.log('item.update_time',item.update_time);
				} else {
					// console.log(12121212122121,item);
				}
	
				if (item.chatText && state.currentConversationId == key) {
					item.update_time = Date.now()
				}

				if (item.group_info) {
					let {
						name,
						avatar_file
					} = item.group_info
					item.title = name
					item.avatar_file = avatar_file
				} else if (item.user_info) {
					let {
						nickname,
						avatar_file
					} = item.user_info
					item.title = nickname
					item.avatar_file = avatar_file
				}
				conversationList.push(item)
			}
			conversationList = conversationList.sort(function(a, b) {
				// if(b.id == state.currentConversationId){
				// 	return false
				// }
				return b.update_time - a.update_time
			})
			return conversationList
		},
		conversation: (state) => (id) => {
			return state.conversationDatas[id]
		},
		userInfo: (state) => (_id) => {
			return state.usersInfo[_id]
		}
	},
	mutations: {
		updateHeartbeat(state) {
			state.heartbeat = Date.now()
		},
		setCurrentConversationId(state, id) {
			state.currentConversationId = id
			// console.log('state.currentConversationId',state.currentConversationId);
		},
		mergeConversationDatas(state, val) {
			state.conversationDatas = Object.assign({}, state.conversationDatas, val)
		},
		clearConversationDatas(state) {
			state.conversationDatas = {}
		},
		removeConversation(state, id) {
			let conversationDatas = state.conversationDatas
			delete conversationDatas[id]
			if(state.currentConversationId == id){
				state.currentConversationId = Object.keys(conversationDatas)[0] || false
			}
			state.conversationDatas = Object.assign({}, conversationDatas)
		},
		removeGroup(state, {group_id}){
			let groupList = state.groupList || []
			for (let i = 0; i < groupList.length; i++) {
				if( groupList[i].group_info._id == group_id ){
					groupList.splice(i,1)
					break;
				}
			}
		},
		removeFriend(state, {friend_uid}){
			let friendList = state.friendList || []
			for (let i = 0; i < friendList.length; i++) {
				if( friendList[i]._id == friend_uid ){
					friendList.splice(i,1)
					break;
				}
			}
		},
		updateConversation(state, [id, data, cover = false]) {
			let conversationDatas = state.conversationDatas
			let conversation = conversationDatas[id] || {}
			conversationDatas[id] = Object.assign(cover ? {} : conversation, data)
			state.conversationDatas = Object.assign({}, conversationDatas)
			// console.log(787,state.conversationDatas);
		},
		mergeUsersInfo(state, val) {
			state.usersInfo = Object.assign({}, state.usersInfo, val)
		},
		setSystemNoticeDatas(state, val) {
			// state.systemNoticeDatas = val
			let obj = {},
				systemNoticeDatas = val ? val.reverse() : []
			for (var i = 0; i < systemNoticeDatas.length; i++) {
				let item = systemNoticeDatas[i]
				// 去重操作
				let {
					subType,
					unique
				} = item.payload
				obj[unique ? (subType + "_" + unique) : crypto.randomUUID()] = item
				obj[unique ? (subType + "_" + unique) : (Date.now() + '__' + Math.floor(Math.random() * 99999999)) ] = item
			}
			let data = []
			for (let key in obj) {
				let item = obj[key]
				data.push(item)
			}
			systemNoticeDatas = data.sort((a, b) => b.create_time - a.create_time)
			state.systemNoticeDatas = systemNoticeDatas

			let unread_conunt = systemNoticeDatas.reduce((sum, item, index, array) => {
				!item.is_read && sum++
				return sum
			}, 0)
			// console.log('最新的未读数:', unread_conunt, data);
			// 注意：在非tabbar页面无法设置 badge
			try{
				if (unread_conunt === 0) {
					uni.removeTabBarBadge({
						index: 2,
						complete: (e) => {
							// console.log(e)
						}
					})
				} else {
					uni.setTabBarBadge({
						index: 2,
						text: unread_conunt + '',
						complete: (e) => {
							// console.log(e)
						}
					})
				}
			} catch(e){
				//TODO handle the exception
			}
		},
		setGroupList(state, val) {
			state.groupList = val
		},
		addGroup(state, val){
			if(!state.groupList){
				state.groupList = []
			}
			state.groupList.push(...val)
		},
		setFriendList(state, val) {
			state.friendList = val
		},
		addFriend(state, val){
			if(!state.friendList){
				state.friendList = []
			}
			state.friendList.push(...val)
		},
		setMsgList(state, val) {			
		 	state.msgList.push(val)	
			// 拼接消息 需确认是否必要 
			const allChatData = state.msgList.reduce((prev, {text})=> prev + text, '')  
			
			const obj = uni.getStorageSync('msgNum')
			const num = obj ? obj.count : 0;
			
			function reply() {
				state.msgList.push({
					...val,
					self: false
				})
				
				// uni.request({ 
				// 	url: 'https://psyche-zhangxin-dbphvpvtju.us-west-1.fcapp.run',
				// 	method: 'POST',
				// 	data: {
				// 		// GPT-3 模型。详细介绍请参考：https://platform.openai.com/docs/models/overview  
				// 		model: "text-davinci-003",  
				// 		prompt: `input:${val.text}?output:`,
				// 		max_tokens: 300,  
				// 		temperature: .6,  
				// 		stop: ['output:']
				// 	},  
				// 	header: {
				// 	   Authorization: `Bearer ${state.YOUR_API_KEY}` 
				// 	},
				// 	timeout: 10000,  
				// 	contentType: 'json', // 指定以application/json发送data内的数据  
				// 	dataType: 'json' // 指定返回值为json格式，自动进行parse  
				// }).then(res => {		
				// 	state.msgList.push({
				// 		...val,
				// 		text: res[1].data.data.choices[0].text,
				// 		self: false
				// 	})
				// })	
			}
			
			function normalreply() {
				if (!obj || obj.day !== new Date().getDate()) { // 重置
					uni.setStorage({
						key: "msgNum",
						data: {
							day: new Date().getDate(),
							count: 0
						}
					})
				} else {
					uni.setStorage({
						key: "msgNum",
						data: {
							day: obj.day,
							count: obj.count++
						}
					})
				}
				if(num < 15) {
					reply();
				} else {
					state.msgList.push({
						text: "您已无使用测试，请联系管理员：微信：itbang",
						client_msg_id: "1681724885625__75274101",
						conversation_id: "single_385c77b73bd2e2ab2e78e08d04251fc5",
						create_time: 1681723626089,
						from_uid: "643ceff028064a03b7746848",
						id: "uni-im-msg:single_385c77b73bd2e2ab2e78e08d04251fc5-1681723626089-0",
						is_read: false,
						type: "text",
						_id: "643d10edf43e603fbec53d2f",
						self: false
					})
				}
			}

			if(!this.state.user.userInfo.period) {
				normalreply()
			} else if(new Date().getTime() < this.state.user.userInfo.period) {
				reply();
			} else {
				normalreply()
			}
		}
	},
	actions: {
		async setMsgList(context, {
			conversation_id,
			action = 'set',
			data,
			id,
			save
		}) {
			try {
				// 拿到会话对象
				let conversationData = context.getters.conversation(conversation_id)
				if (!conversationData) {
					conversationData = await context.dispatch('getConversation', {
						friend_uid: data.from_uid
					})
				}
				console.log("conversationData==", conversationData)

				// 统一改成 数组模式
				if (!Array.isArray(data)) {
					data = [data]
				}
				if (save && ['push','unshift'].includes(action)) {
					if (data.length > 1) {
						throw Error('save 不能保存数组')
					}
					data = [uniImStorage.insert([...data],action == 'unshift')]
					// console.log(7897897987,data,data[0].client_msg_id);
				}
				
				// 拷贝会话对象中的聊天数据
				msgList = context.state.msgList
				
				switch (action) {
					case 'set':
						msgList = data
						break;
					case 'push':
						msgList.push(...data)
						break;
					case 'unshift':
						msgList.unshift(...data)
						break;
					case 'update':
						// let index = msgList.findIndex(msg => msg.id == data[0].id)
						let index = msgList.findIndex(i=>i.client_msg_id == data[0].client_msg_id)
						// console.error('index---',index,data[0])
						if(index == -1){
							console.error(JSON.stringify(msgList),data.client_msg_id);
						}
						msgList[index] = Object.assign(msgList[index], data[0])
						uniImStorage.update(data[0].id,msgList[index])
						break;
					default:
						break;
				}
				
				let val = {
					msgList
				}
				if (action == 'push' && context.state.currentConversationId != conversationData.id) {
					val.unread_count = conversationData.unread_count + 1
				}
				
				context.commit('updateConversation', [conversation_id, val])
				if (save) {
					return data[0]
				}
			} catch(e) {
				console.error('store setMsgList-error',e)
				//TODO handle the exception
			}
			// console.log('setMsgList',{conversation_id,action,data,id},this);
			
			return data
		},
		async clearUnreadCount(context, conversation_id) {
			context.commit('updateConversation', [conversation_id, {
				unread_count: 0
			}])
			// 触发器会触发消息表的 is_read = true
			uniCloud.database()
				.collection('uni-im-conversation')
				.where({
					user_id: current_uid(),
					id: conversation_id
				})
				.update({
					"unread_count": 0
				}).then(e => {
					console.log('设置为已读', e.result.updated);
				})
		},
		async initSystemNoticeDatas(context) {
			await context.commit('setSystemNoticeDatas', false)
			let res = await db.collection('uni-push-message')
					.aggregate()
					.match('"payload.type" == "SystemNotice" && "user_id" == $cloudEnv_uid')
					.sort({
						create_time: -1
					})
					.end()
			await context.commit('setSystemNoticeDatas', res.result.data)
		},
		async initConversationData(context) {
			getConversationDatasPage = 0
			getApp().globalData.uniIm.msgManagers = {}
			await context.commit('clearConversationDatas')
			await context.dispatch('loadMoreConversation')
		},
		async loadMoreConversation(context, conversation_id) {
			const uniImCo = uniCloud.importObject("uni-im-co", {
				customUI: true
			})
			// let res = await uniImCo.getConversationList({
			// 	page: conversation_id ? 0 : getConversationDatasPage,
			// 	limit: 30,
			// 	conversation_id
			// })
			let res = [];
			// console.log('loadMoreConversation', {
			// 	conversation_id,
			// 	res
			// });
			if (res.data && res.data.length) {
				if (!conversation_id) {
					getConversationDatasPage++
				}
				//查到会话列表数据后转化格式
				let datas = {} // this.datas
				res.data.forEach(item => {
					const {
						user_info: [user_info],
						group_info: [group_info],
						group_member
					} = item
					//避免用户被删除后引起的报错阻塞
					// console.log('user_info-------',user_info);
					if (user_info || group_info) {

						if (user_info) {
							let usersInfo = {}
							usersInfo[user_info._id] = user_info
							context.commit('mergeUsersInfo', usersInfo)
							// delete item.user_info
							item.title = user_info.nickname
							item.avatar_file = user_info.avatar_file
							item.group_info = false
							item.user_info = user_info
						} else if (group_info) {
							let usersInfo = group_member.reduce((sum, current) => {
								sum[current.user_id] = current.user_info[0]
								return sum
							}, {})
							item.group_member = usersInfo

							item.group_info = item.group_info[0]
							context.commit('mergeUsersInfo', usersInfo)

							item.title = group_info.name
							item.avatar_file = group_info.avatar_file

							item.user_info = false
						}

						// item.msgList = [] //这条会导致，lastMsg无法正常显示，先注释待观察 bug-bug
						item.chatText = ''
						item.isInit = false
						datas[item.id] = item
					} else {
						console.error('会话列表失效，疑似关联用户/群被删除（请改为软删除避免系统异常）：', item);
					}
				})
				// console.log('datas',datas);
				context.commit('mergeConversationDatas', datas)
			}
			return res.data && res.data.length != 0
		},
		async loadMoreFriendData(context, {friend_uid}={}) {
			let whereString = '"user_id" == $cloudEnv_uid'
			if(friend_uid){
				whereString += `&& "friend_uid" == "${friend_uid}"`
				// console.log('whereString',whereString);
			}
			let res = await db.collection(
				db.collection('uni-im-friend').where(whereString).field('friend_uid,mark,class_name').getTemp(),
				db.collection('uni-id-users').field('_id,nickname,avatar_file').getTemp()
			).get()
			let data = res.result.data
			// console.log('data',JSON.stringify(data));
			data.forEach((item, index) => {
				data[index] = item.friend_uid[0]
				if(!context.getters.userInfo(data[index]) ){
					let usersInfo = {}
					usersInfo[item.friend_uid[0]._id] = item.friend_uid[0]
					context.commit('mergeUsersInfo', usersInfo)
				}
			})
			await context.commit('addFriend', data)
		},
		async loadMoreGroupData(context, {group_id}={}) {
			let whereString = '"user_id" == $cloudEnv_uid'
			if(group_id){
				whereString += `&& "group_id" == "${group_id}"`
				// console.log('whereString',whereString);
			}
			let res = await db.collection(
				db.collection('uni-im-group-member')
					.where(whereString)
					.getTemp(),
				db.collection('uni-im-group').getTemp()
			).get()
			res.result.data.map(item=>{
				item.group_info = item.group_id[0]
				delete item.group_id
				return item
			})
			// console.log(res.result.data);
			// console.log('loadMoreGroupData', res.result.data);
			await context.commit('addGroup', res.result.data)
		},		
		async getConversation(context, {
			from_uid,
			to_uid,
			group_id,
			conversation_id,
			type,
			body,
			friend_uid,
			user_info,
			user_id
		}) {
			if(user_id){
				friend_uid = user_id
				console.warn('store.getConversation 的user_id字段已过期，请改用friend_uid');
			}

			if (!friend_uid) {
				friend_uid = (from_uid == current_uid() ? to_uid : from_uid)
			}

			if (!conversation_id) {
				conversation_id = utils.getConversationId(friend_uid)
				if (friend_uid == 'uni-im-system') {
					conversation_id = 'uni-im-system'
				}
			}
			let conversation = context.getters.conversation(conversation_id)
			if (conversation) {
				// console.log('已经有了直接返回', conversation);
				// console.log('conversation.msg.msgList',conversation.msg.msgList);
				return conversation
			}
			if (!user_info) {
				let res = await uniCloud.database()
										.collection('uni-id-users')
										.doc(friend_uid)
										.field('_id,nickname,avatar_file')
										.get()
				user_info = res.result.data[0]
				// console.log('user_info', user_info);
				if (!user_info) {
					uni.showModal({
						content: '用户id错误',
						showCancel: false
					});
					throw ('用户id错误')
				}
			}
			const conversationData = {
				id: conversation_id,
				title: user_info.nickname,
				avatar_file: user_info.avatar_file,
				user_id: current_uid(),
				total_num: 0,
				unread_count: 0,
				friend_uid,
				group_id,
				msgList: [],
				update_time: Date.now(),
				chatText: '',
				isInit: false
			}
			context.commit('updateConversation', [conversation_id, conversationData, true])
			return conversationData
		}
	}
}
