// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database();
const universal = require("./utils/universal");
const conversationTable = db.collection('uni-im-conversation')
const msgTable = db.collection('uni-im-msg')
const groupMemberTable = db.collection('uni-im-group-member')

const usersTable = db.collection('uni-id-users')
const uniIdCommon = require('uni-id-common')
const dbCmd = db.command
const $ = dbCmd.aggregate
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const createConfig = require("uni-config-center");
const { error } = require("console");
const uniImConfig = createConfig({
	pluginId: 'uni-im', // 插件id
})


const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:3000');


module.exports = {
	async _before() {
		// 适配url化后获取 clientInfo
		universal.call(this)
		this.clientInfo = this.getUniversalClientInfo()

		this.uniIdCommon = uniIdCommon.createInstance({
			clientInfo: this.clientInfo
		})
		// console.log(this.clientInfo);
		// 指定需要验证用户token信息的方法名 'sendMsg',
		const needLoginMethodName = [
			'getConversationList', 'getJoinGroupList',
			'addFriendInvite', 'chooseUserIntoGroup'
		]
		if (needLoginMethodName.includes(this.getMethodName())) {
			let res = await this.uniIdCommon.checkToken(this.clientInfo.uniIdToken)
			// console.log('checkToken', JSON.stringify(res));
			if(this.getMethodName() === 'sendMsg' && this.getClientInfo().source === 'function'){} // 新增
			else if (res.errCode) {
				throw new Error(res.errCode)
			}
			this.uid = res.uid
		}

		this.sendPushMsg = async (param, appId) => {
			let pushParam = {
				check_token: true,
				settings: {
					//-1表示不设离线，因为离线后重新打开数据统一从数据库中拉取。否则会重复
					ttl: -1
				},
				// 离线推送厂商信息设置
				channel: {
					"HW": "NORMAL",
					"XM": "high_system"
				}
			}
			if (!appId) {
				appId = this.clientInfo.appId
				if (!appId) {
					throw new Error('appid is not definded')
				}
			}
			pushParam = Object.assign(pushParam, param)

			if (param.payload.type == "SystemNotice") {
				pushParam.save_msg = true
			}
			
			
			// const uniPush = uniCloud.getPushManager({ appId })
			

			// let res = await uniPush.sendMessage(pushParam)
			
			console.log('尝试一下哈')
			
			 ws.on('open', function open() {
			    console.log('WebSocket connected!');
			    ws.send('Hello from cloud function!');
			  });
			  
			  ws.on('message', function incoming(data) {
			    console.log(`Received message: ${data}`);
			    // do something with the data
			  });
			
			
			let res = await uniCloud.httpclient.request('https://127.0.0.1:3000/notice', {
			   method: 'POST',
			   data: pushParam
			})  
			
			console.log("res==", res);
			
			
			if (res.errCode) {
				if (res.errCode == "uni-push-user-invalid") {
					//可能因为用户长时间没有登录导致的cid过期而发送失败，但是此时已将离线数据写入数据库，登录后可获取。客户端不需要进入 catch
					res = {
						data: {
							"uni-push-err-res": res
						},
						errCode: 0
					}
				} else {
					console.log(res.errCode);
					throw new Error(res.errMsg)
				}
			}
			return res
		}
	},
	async getConversationList({
		limit = 500,
		page = 0,
		conversation_id = false
	}) {
		let res = await conversationTable.aggregate()
			.sort({
				update_time: -1
			})
			.match({
				"user_id": this.uid,
				// "group_id": dbCmd.exists(false), //是否查询群聊会话
				"id": conversation_id || dbCmd.neq(null)
			})
			.skip(page * limit)
			.limit(limit)
			.lookup({
				from: "uni-im-msg",
				let: {
					id: '$id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$conversation_id', '$$id']))
					)
					.sort({
						create_time: -1
					})
					.limit(1)
					.project({
						_id: 1,
						type: 1,
						body: 1,
						to_uid: 1,
						is_read: 1,
						from_uid: 1,
						create_time: 1,
						conversation_id: 1
					})
					.done(),
				as: 'msgList'
			})
			.lookup({
				from: "uni-im-group",
				let: {
					group_id: '$group_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$_id', '$$group_id']))
					)
					.project({
						user_id: 1,
						name: 1,
						introduction: 1,
						notification: 1,
						avatar_file: 1,
						join_option: 1
					})
					.done(),
				as: 'group_info'
			})
			.lookup({
				from: "uni-im-group-member",
				let: {
					group_id: '$group_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$group_id', '$$group_id']))
					)
					.project({
						user_id: 1
					})
					.done(),
				as: 'group_member'
			})
			.end()
		// console.log('res.data',res.data);

		// let user_info = []
		let user_ids = []
		res.data.forEach(item => {
			if (item.friend_uid) {
				user_ids.push(item.friend_uid)
			}
			if (item.group_member && item.group_member.length) {
				item.group_member.forEach((group_member, index) => {
					user_ids.push(group_member.user_id)
				})
			}
		})

		// console.log('*-***--*--**--**-*--user_idsuser_idsuser_idsuser_ids',user_ids)
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.clientInfo
		})
		let {
			data: userList
		} = await dbJQL.collection('uni-id-users')
			.where(`"_id" in ${JSON.stringify(user_ids)}`)
			.field('_id,nickname,avatar_file')
			.limit(500)
			.get()
		// console.log('*-***--*--**--**-dbJQL.collection(uni-id-users)*--*-***--*--**--**-*--11111',userList)
		let userListObj = {}
		userList = userList.forEach((item) => {
			userListObj[item._id] = item
		})

		// console.log('*-***--*--**--**-*--*-***--*--**--**-*--2222',userListObj)

		res.data.forEach(item => {
			item.user_info = item.friend_uid ? [userListObj[item.friend_uid]] : []
			if (item.group_member && item.group_member.length) {
				item.group_member.forEach((group_member, index) => {
					item.group_member[index].user_info = [userListObj[group_member.user_id]]
				})
			}
		})
		return {
			data: res.data,
			errCode: 0
		}
	},
	async sendMsg(params, context) {
		const {
			to_uid,
			group_id,
			body,
			type,
			isRetries,
			appId,
			original_from_uid // 新增
		} = params
		//发送者身份id  
		const from_uid = this.uid || original_from_uid || '643ceff028064a03b7746848'; // 修改

		let check_param = {
			"required": ["body", "type", "appId"],
			"type": {
				to_uid: ["String"],
				group_id: ["String"],
				body: ["String", "Object"],
				type: ["String"],
				isRetries: ["Boolean"],
				appId: ["String"]
			}
		}

		check_param.required.forEach(item => {
			if (!params[item]) {
				throw new Error('错误，参数：' + item + "的值不能为空")
			}
		})
		
		for (let key in check_param.type) {
			if (key in check_param.type) {
				let val = params[key],
					type = check_param.type[key]
				if (val && !type.includes(getType(val))) {
					throw new Error('错误，参数：' + key + '的数据类型必须为：' + check_param.type[key].join('或'))
				}
			}
		}

		function getType(data) {
			return Object.prototype.toString.call(data).replace(/[\[\]]/g, '').split(' ')[1]
		}

		// if (!to_uid && !group_id) {
		// 	throw new Error('非法请求')
		// }

		// 校验是否可以发消息
		let conversation_grade = uniImConfig.config('conversation_grade')
		/*
		  	0	-	任何人可以发起会话
			100	-	客服 or 好友或者群成员
			200	-	必须是好友或者群成员
		*/

		async function chatToAdmin() {
			// 可以和客服发起会话
			// 客服模式下，如果配置的客服id。则只能向客服发起会话
			let admin_uid = uniImConfig.config('admin_uid')
			if (admin_uid) {
				if (typeof admin_uid == 'string') {
					admin_uid = [admin_uid]
				}
				if (
					!(admin_uid.includes(from_uid) || admin_uid.includes(to_uid))
				) {
					throw new Error('非法通讯，会话双方用户id，均不属于uni-im-co中配置的admin_uid')
				}
			}
			return true
		}
		async function chatToFriendOrGroupMember() {
			// 只能是好友关系，或者群成员才能发送
			if (group_id) {
				let {
					data: [has]
				} = await db.collection('uni-im-group-member')
					.where({
						group_id,
						user_id: this.uid
					})
					.get()
				if (!has) {
					throw new Error('非群成员不能发起会话')
				}
			}
			if (to_uid) {
				let {
					data: [has]
				} = await db.collection('uni-im-friend')
					.where({
						friend_uid: to_uid,
						user_id: this.uid
					})
					.get()
				if (!has) {
					throw new Error('非好友不能发起会话')
				}
			}
			return true
		}

		switch (conversation_grade) {
			case 0:
				//任何人可以发起会话
				break;
			case 100:
				// 客服 or 好友或者群成员
				try {
					await chatToAdmin()
				} catch (error) {
					console.log(error)
					await chatToFriendOrGroupMember()
				}
				break;
			case 200:
				// 必须是好友或者群成员
				await chatToFriendOrGroupMember()
				break;
			default:
				break;
		}

		// 生成会话id
		const conversation_id = group_id ? 'group_' + group_id : getConversationId([from_uid, to_uid])
		// 构建基本消息内容
		const msgData = {
			body,
			type,
			from_uid,
			to_uid,
			//默认已读为false
			is_read: false,
			//创建时间
			create_time: Date.now(),
			conversation_id,
			group_id
		}

		let last_msg_note = '[多媒体]'
		if (type == 'text') {
			last_msg_note = body.toString()
			last_msg_note = last_msg_note.replace(/[\r\n]/g, "");
			last_msg_note = last_msg_note.slice(0, 30)
		}
		last_msg_note = {
			"image": "[图片]",
			"sound": "语音",
			"video": "[视频]",
			"file": "文件",
			"location": "位置"
		} [type]

		// 会话表
		// let { data: [conversation] } = await conversationTable.where({
		// 	id: conversation_id
		// }).get()

		let conversation =  {
			"id": "single_6f6e5f36136858cbcd0d5fee3ab13fe2",
			"type": 1,
			"user_id": "643ceff028064a03b7746848",
			"friend_uid": "643ceff028064a03b7746848",
			"unread_count": 9746,
			"update_time": 1681792349124
		}

		if (!conversation) {
			// 如果没有需要，创建会话记录
			// 1.消息接收者 会话数据
			let data1 = {
				id: conversation_id,
				type: msgData.group_id ? 2 : 1, //
				user_id: msgData.to_uid,
				friend_uid: msgData.from_uid,
				group_id: msgData.group_id,
				unread_count: 1,
				last_msg_note,
				update_time: msgData.create_time
			}
			// 2.消息发送者 会话数据
			let data2 = {
				...data1,
				unread_count: 0,
				user_id: msgData.from_uid,
				friend_uid: msgData.to_uid
			}
			// console.log(123231123,data,[data1,data2]);
			// let res = await conversationTable.add([data1, data2])
			// console.log(res);
		} else {
			// 对方的会话表更新，并且未读数+1
			let res = await conversationTable.where({
				id: conversation_id,
				user_id: to_uid
			}).update({
				unread_count: dbCmd.inc(1),
				last_msg_note,
				update_time: msgData.create_time
			})
			//自己的会话表更新。仅更新最后一条消息的时间和内容
			res = await conversationTable.where({
				id: conversation_id,
				user_id: from_uid
			}).update({
				// unread_count: dbCmd.inc(1),
				last_msg_note,
				update_time: msgData.create_time
			})
		}
		// console.log({
		// 	...msgData,
		// 	conversation_id
		// });
		// 将消息内容存到数据库，点击重发按钮的除外
		if (!isRetries) {
			let res = await msgTable.add({
				...msgData,
				conversation_id
			})
			msgData._id = res.id

			if (msgData.body.length > 250) {
				msgData.body = msgData.body.slice(0, 50)
				// 是长文本，客户端收到消息后会再从数据库中查一遍
				msgData.LongMsg = true
			}
			console.log('msgTable msgData:', res);
		}
		
		// 请求公共模块中的ChatGPT _uid常量  
		const isChatGPT = uniImConfig.config('ChatGPT_uid')  
		if(isChatGPT === to_uid){  
		    try {
		        // 请求chatGPT云函数  
		        const { result: { data: openAIResp }} = await uniCloud.callFunction({  
		            name:'ChatGPT',  
		            data:{ body }
		        })
		        // 拼接消息  
		        const allChatData = openAIResp.reduce((prev, {text})=> prev + text, '')  
		        // 因为这一步要模拟ChatGPT给用户发消息，所以调换一下发送人和接受人的uid。  

				const tempParams = { 
					...params, 
		            from_uid: to_uid,  
		            to_uid: from_uid,  
		            body: allChatData,  
		            client_create_time: +new Date,  
		            original_from_uid: to_uid // 这个字段用来递归调用时区分当前发送者uid  
				};  
		        // 递归调用云对象中的sendMsg方法  
		        uniCloud.importObject('uni-im-co').sendMsg(tempParams, context);  
		    } catch (error){  
		        console.log('error boredape:>>>>>>>>>>>> ', error);  
		    }  
		}
		
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.clientInfo
		})
		// let res = await dbJQL.collection('uni-id-users')
		// 	.doc(from_uid)
		// 	.field('_id,nickname,avatar_file')
		// 	.get()
			
		// let { nickname, avatar_file } = res.data[0]
		
		const nickname = "ChatGPT"
		const avatar_file = ""
		
		let title = nickname.slice(0, 20)
		let content = msgData.type == 'text' ? msgData.body : '[多媒体]'

		// 定义推送参数
		let pushParam = {
			"user_id": msgData.to_uid,
			"payload": {
				type: "uni-im",
				data: msgData,
				title, // "收到im消息，在线时显示的标题",
				content, // "在线时显示的副标题",
				avatar_file, //头像文件对象,
				device_id: this.clientInfo.deviceId // 发送消息的设备（客户端）id，阻止当前用户收到自己发的消息
			},
			title: title.slice(0, 20), // "收到im消息，离线时显示的标题",
			content: content.slice(0, 50) //"离线时显示的内容"
		}

		console.log({pushParam},msgData);
		if (msgData.to_uid) {
			// 单聊
			pushParam.user_id = msgData.to_uid
		} else if (msgData.group_id) {
			uniCloud.importObject('uni-im-co').sendMsgToGroup({
				pushParam,
				appId
			})
			// 等待500毫秒，给一个请求发出去的时间
			return await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						data: {
							create_time: msgData.create_time
						},
						errCode: 0,
						errMsg: ''
					})
				}, 500)
			})
			// return {
			// 	errCode: 1000,
			// 	errMsg: '群聊功能正在开发中',
			// 	errSubject: "uni-im"
			// }
			console.log('pushParam====', pushParam);
		} else {
			// throw new Error('接受者id不能为空')
		}
		res = await this.sendPushMsg(pushParam, appId)
		// console.log('sendMessage', JSON.stringify(res))
		/*
		//判断是否已经有客户端接收到消息，注意：收到不等于已读
		console.log('sendMessage res', res);
		let taskData = res.data[Object.keys(res.data)]
		let state = false;
		for (let key in taskData) {
			if (taskData[key] == 'successed_online') {
				state = true
				break
			}
		}
		console.log('state : ============> ' + state);*/
		if (!res.data) {
			res.data = {
				create_time: '642fa0eae766bb29755dd9de',
				_id: '642fa0eae766bb29755dd9de'
			}
		}
		res.data.create_time = msgData.create_time
		res.data._id = msgData._id
		return res
	},
	async loginWithJWT(sign) {
		let jwtSecret = uniImConfig.config('jwtSecret')
		if (!jwtSecret) {
			return {
				errCode: 4000,
				errMsg: 'jwtSecret的值不能为空'
			}
		}
		if (jwtSecret == 'jwtSecretDemo') {
			console.error('[warn]: 不要使用默认的：jwtSecret的值');
			return {
				errCode: 4100,
				errMsg: '不要使用默认的：jwtSecret的值'
			}
		}
		let userInfo;
		try {
			let decoded = jwt.verify(sign, jwtSecret);
			if (decoded.exp && decoded.exp < Date.now()) {
				throw new Error('签名数据过期')
			}
			userInfo = decoded.userInfo
			if (!userInfo.openid) {
				return {
					errCode: 2,
					errMsg: 'userInfo.openid不能为空',
					errSubject: "uni-im"
				}
			}
		} catch (e) {
			console.error(e);
			return {
				errCode: 1,
				errMsg: '签名验证失败',
				errSubject: "uni-im"
			}
		}
		console.log(userInfo);
		let {
			openid
		} = userInfo
		let res = await usersTable.where({
			openid
		}).get()
		console.log(res);
		if (res.data.length) {
			res = await usersTable.where({
				openid
			}).updateAndReturn(userInfo)
		} else {
			res = await usersTable.add(userInfo)
		}
		console.log(res);
		let newToken = await this.uniIdCommon.createToken({
			uid: res.id || res.doc._id
		})
		return {
			errCode: 0,
			newToken
		}
	},
	//群主查看申请加群的用户
	async getJoinGroupList() {
		// 查询所有我作为管理员的群的加入申请表
		let res = await db.collection('uni-im-group-member')
			.aggregate()
			.match({
				user_id: this.uid,
				role: 'admin'
			})
			.lookup({
				from: "uni-im-group-join",
				let: {
					group_id: '$group_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$group_id', '$$group_id']))
					)
					.project({
						group_id: 1,
						user_id: 1,
						message: 1,
						creat_time: 1,
						state: 1
					})
					.lookup({
						from: "uni-im-group",
						let: {
							group_id: '$group_id'
						},
						pipeline: $.pipeline()
							.match(
								dbCmd.expr($.eq(['$_id', '$$group_id']))
							)
							.project({
								name: 1
							})
							.done(),
						as: 'group_info',
					})
					.lookup({
						from: "uni-id-users",
						let: {
							user_id: '$user_id'
						},
						pipeline: $.pipeline()
							.match(
								dbCmd.expr($.eq(['$_id', '$$user_id']))
							)
							.project({
								nickname: 1,
							})
							.done(),
						as: 'user_info',
					})
					.done(),
				as: 'uni-im-group-join',
			})
			.end()

		return res.data.reduce((sum, current) => {
				sum.push(...current['uni-im-group-join'])
				return sum
			}, [])
			.reduce((sum, current) => {
				console.log(current);
				if (current.group_info[0]) {
					current.group_name = current.group_info[0].name
				}
				delete current.group_info
				current.user_info = current.user_info[0]
				sum.push(current)
				return sum
			}, [])
	},
	async sendPushMsg(pushParam, appId) {
		// 注意：这是用于在触发器中调用推送的方法。不是this.sendPushMsg调用的方法，this.sendPushMsg定义在before中
		if (this.getClientInfo().source != 'function') {
			return {
				errSubject: 'uni-im-co',
				errCode: 0,
				errMsg: '该方法仅支持云对象的方法，或者触发器调用'
			}
		}
		// console.log('pushParam', pushParam);
		return await this.sendPushMsg(pushParam, appId)
	},
	async sendMsgToGroup({
		pushParam,
		before_id,
		push_clientids = [],
		member = [],
		appId
	}) {
		// 注意：这是一个递归云对象，用递归的方式处理批量任务
		const limit = 500 //腾讯云收费版服务空间可以改成 1000
		if (this.getClientInfo().source != 'function') {
			return {
				errSubject: 'uni-im-co',
				errCode: 0,
				errMsg: '该方法仅支持云对象的方法，或者触发器调用'
			}
		}

		console.log('sendMsgToGroup=========', {
			pushParam,
			before_id,
			push_clientids
		});

		if (before_id || push_clientids) {
			console.log({
				before_id,
				push_clientids
			});
			// return 123
		}

		if (push_clientids.length === 0) {
			console.log('开始查库', push_clientids.length, push_clientids);
			let getMemberwhere = {
				group_id: pushParam.payload.data.group_id
			}
			if (before_id) {
				getMemberwhere._id = dbCmd.gt(before_id)
			}
			console.log({
				getMemberwhere
			});
			let res = await groupMemberTable
				.aggregate()
				.match(getMemberwhere)
				.sort({
					_id: 1
				})
				.limit(limit)
				.project({
					user_id: 1
				})
				.lookup({
					from: "uni-id-device",
					let: {
						user_id: '$user_id'
					},
					pipeline: $.pipeline()
						.match(
							dbCmd.expr(
								$.and([
									$.eq(['$user_id', '$$user_id']),
									$.gt(['$token_expired', Date.now()])
								])
							)
						).project({
							push_clientid: 1
						})
						.done(),
					as: 'push_clientids',
				})
				.end()
			member = res.data
			// console.error('符合条件的用户数', member, member.length);
			push_clientids = member.reduce((sum, item) => {
				sum.push(...item.push_clientids.map(i => i.push_clientid))
				return sum
			}, [])
			// console.error('查到需要接收消息的设备数：', push_clientids.length);
		} else {
			console.log('不需要查库，继续发送任务', push_clientids.length);
		}

		if (push_clientids.length === 0) {
			console.error('没有更多用户需要接收消息');
			return {
				errCode: 0,
				errMsg: ''
			}
		} else {
			console.log('push_clientids====>', push_clientids)
		}
		let next_push_clientids = push_clientids.slice(limit)
		push_clientids = push_clientids.slice(0, limit)
		pushParam.push_clientid = push_clientids
		console.log("pushParam", pushParam);

		let sendPushMsgRes = await this.sendPushMsg(pushParam, appId)
		// console.error(sendPushMsgRes)
		if (next_push_clientids.length !== 0) {
			uniCloud.importObject('uni-im-co').sendMsgToGroup({
				pushParam,
				push_clientids: next_push_clientids,
				member
			}, appId)
			// 等待500毫秒，给一个请求发出去的时间
			return await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						errCode: 0,
						errMsg: ''
					})
				}, 500)
			})
		} else if (member.length == limit) {
			console.log('member---*--*', member);
			before_id = member[member.length - limit]._id
			uniCloud.importObject('uni-im-co').sendMsgToGroup({
				pushParam,
				before_id
			}, appId)
			// 等待500毫秒，给一个请求发出去的时间
			return await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({
						errCode: 0,
						errMsg: ''
					})
				}, 500)
			})
		} else {
			return {
				errCode: 0,
				errMsg: ''
			}
		}
	},
	async addFriendInvite({
		to_uid,
		message
	}) {
		const from_uid = this.uid
		console.log('from_uid-----', from_uid);
		if (this.uid == to_uid) {
			throw new Error('不能加自己为好友')
		}

		let {
			data: [has]
		} = await db.collection('uni-im-friend').where({
			user_id: from_uid,
			friend_uid: to_uid
		}).get()

		if (has) {
			return {
				errSubject: 'uni-im-co',
				errCode: 1000,
				errMsg: '已经是好友'
			}
		}

		// 检查是不是黑名单
		//略		
		console.log("docId==", docId);
		let docId = md5(JSON.stringify([from_uid, to_uid]))
		
		console.log("docId==", docId);
		
		// let docId = 'sss'
		
		// 不存在就添加，存在就更新
		let res = await db.collection('uni-im-friend-invite').doc(docId)
			.set({
				from_uid,
				to_uid,
				message
			})

		console.log({
			res
		});
		/*const dbJQL = uniCloud.databaseForJQL({
			clientInfo
		})
		dbJQL.setUser({
			uid: from_uid, // 建议此处使用真实uid
			role: ['admin'], // 指定当前执行用户的角色为admin。如果只希望指定为admin身份，可以删除uid和permission节点
			permission: []
		})*/

		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.clientInfo
		})
		let {
			data: [userInfo]
		} = await dbJQL.collection('uni-id-users')
			.doc(this.uid)
			.field('_id,nickname,avatar_file')
			.get()
			console.log({ userInfo });
		let {
			nickname
		} = userInfo
		let title = nickname.slice(0, 20),
			content = message || "请求添加对方为好友"
		let pushParam = {
			user_id: to_uid,
			payload: {
				type: "SystemNotice", // 通知类型，必须设置为：系统通知
				subType: "uni-im-friend-invite", // 通知子类型（可选）
				avatar_file: userInfo.avatar_file, // 头像或图标的图片地址，支持Base64
				confirmText: "同意", // 确认按钮的文字（可选）
				// cancelText: "拒绝", // 取消按钮的文字（可选）
				state: false, // 是否已经处理过 false 未处理，confirm：已确认，cancel：已拒绝（可选）
				unique: from_uid, // 去重字段，比如同一个用户重复申请加好友，通知数据始终只显示一条，但是会通知多次（可选）
				data: { // 自定义的其他参数（可选）
					"_id": docId,
					from_uid
				},
				path: false
			},
			title, // "收到im消息，离线时显示的标题",
			content, //"离线时显示的内容"
			path: false
		}

		return await this.sendPushMsg(pushParam, this.clientInfo.appId)
	},
	async chooseUserIntoGroup({
		group_id,
		user_ids
	}) {
		if (typeof user_ids != 'object') {
			return {
				errSubject: 'uni-im',
				errCode: 1000,
				errMsg: 'user_ids必须是数组'
			}
		}else{
			if(user_ids.length > 499){
				return {
					errSubject: 'uni-im',
					errCode: 2000,
					errMsg: "拉人进群一次不能超过500人，请分多次操作"
				}
			}
		}

		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.clientInfo
		})

		if (!group_id) {
			user_ids.push(this.uid)
		}

		let {
			data: userList
		} = await dbJQL.collection('uni-id-users')
			.where(`"_id" in ${JSON.stringify(user_ids)}`)
			.field('_id,nickname,avatar_file')
			.limit(500)
			.get()

		//如果没有输入群id，就先创建群
		if (!group_id) {
			let groupName = userList.reduce((sum, {
				nickname
			}) => {
				sum += nickname + ' '
				return sum
			}, '群聊：')

			groupName = groupName.substring(0, 30)

			console.log({
				groupName
			});

			// JQL触发器会自动把，当前用户设置为群主
			let res = await dbJQL.collection('uni-im-group').add({
				name: groupName
			})
			// console.log(122121, res);

			// 把群主从用户列表中删除，因为他已经进群
			userList.splice(userList.findIndex(item => item._id == this.uid), 1)
			user_ids.pop()
			// console.error(123123121, userList);
			group_id = res.id
		} else {
			let res = await db.collection('uni-im-group').doc(group_id).get()
			// if (!res.data[0]) {
			// 	throw new Error('群id不存在')
			// }
		}

		// 1.成为群成员
		let groupMemberList = user_ids.map(user_id => {
			data = {
				group_id,
				user_id,
				role: [],
				create_time: Date.now()
			}
			return data
		})
		let res = await db.collection('uni-im-group-member').add(groupMemberList)
		console.log('uni-im-group-member-  res', res);
		// 2.会话表加上
		let conversationList = user_ids.map(user_id => {
			data = {
				group_id,
				id: 'group_' + group_id,
				user_id: user_id,
				type: 2,
				unread_count: 0,
				create_time: Date.now()
			}
			return data
		})
		res = await db.collection('uni-im-conversation').add(conversationList)

		console.log('uni-im-group-member-  res', res);
		// 通知用户
		let title = "新用户加群通知",
			content = "新用户加群通知",
			pushParam = {
				// user_id:[...user_ids,this.uid],
				payload: {
					"type": "uni-im-group-join",
					"data": {
						userList,
						group_id
					},
					title, // "收到im消息，在线时显示的标题",
					content, // "在线时显示的副标题",
				},
				title, // "收到im消息，离线时显示的标题",
				content //"离线时显示的内容"
			}
		const uniImCo = uniCloud.importObject("uni-im-co")
		let pushRes = await uniImCo.sendMsgToGroup({
			pushParam,
			appId: this.clientInfo.appId
		})
		return {
			errSubject: 'uni-im',
			errCode: 0,
			data: {
				pushRes,
				group_id
			},
			errMsg: ''
		}
	}
}

function getConversationId(param) {
	return 'single' + '_' + md5(param.sort().toString())
}

function hideEmailStr(email) {
	if (email == undefined) {
		return ''
	}
	const content = email.split("@")
	return content[0].substr(0, content[0].length - 2) + '**' + content[1]
}

function hideMobileStr(mobile) {
	return mobile.substr(0, 3) + '****' + mobile.substr(-1 * 4)
}
