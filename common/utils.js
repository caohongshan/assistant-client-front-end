import md5 from '@/common/md5'
import $store from '@/store/index.js'
import formatTime from '@/common/formatTime';
import appEvent from '@/common/appEvent.js';
import {mutations as uniIdMutations} from '@/uni_modules/uni-id-pages/common/store.js';

const uniIdCo = uniCloud.importObject("uni-id-co", {
	customUI: true
})
const db = uniCloud.database();
let appIsShow = true;
export default {
	init(){
		//监听im消息
		this.listenImMsg()
		//时间戳心跳（定时器）用于刷新：消息或会话与当前的时间差
		setInterval(()=>{
			$store.commit('uniIm/updateHeartbeat')
		},1000)
		
		setTimeout(()=>{
			// 初始化uniIm依赖的全局变量
			getApp().globalData.uniIm = {
				"msgManagers":{},
				audioContext:uni.createInnerAudioContext()
			}
		},0)
		
		function initData(){
			// 初始化uniIm依赖的全局变量
			getApp().globalData.uniIm = {
				"msgManagers":{},
				audioContext:uni.createInnerAudioContext()
			}

			$store.dispatch('uniIm/initSystemNoticeDatas')
			
			$store.commit("uniIm/setFriendList",false)
			$store.dispatch('uniIm/loadMoreFriendData')
			
			$store.commit("uniIm/setGroupList",false)
			$store.dispatch('uniIm/loadMoreGroupData')
		}
		// 如果已经登录就直接初始化数据
		if(uniCloud.getCurrentUserInfo().tokenExpired > Date.now()){
			setTimeout(initData,0)
		}
		// 登录成功后 初始化数据
		uni.$on('uni-id-pages-login-success', async () => {
			initData()
		})

		uni.onPushMessage(async res => {
			if(res.data.payload.type == 'SystemNotice'){
				console.log(2313213213131,'SystemNotice',res.data);
				res.data.create_time = Date.now()
				let data = JSON.parse(JSON.stringify($store.state.uniIm.systemNoticeDatas))
				data.unshift(res.data)
				$store.commit('uniIm/setSystemNoticeDatas',data)
			}
		});

		// 解决在非tabbar页面，无法设置TabBarBadge的问题
		['navigateTo','redirectTo','reLaunch','switchTab','navigateBack'].forEach((item)=>{
			uni.addInterceptor(item,{
				success:event=>{
					setTimeout(()=> {
						// console.log(getCurrentPages().length);
						if(getCurrentPages().length === 1){
							let unread_count = $store.getters['uniIm/systemNoticeUnreadCount']()
							// console.log({unread_count});
							if (unread_count == 0) {
								uni.removeTabBarBadge({
									index: 2,
									complete: (e) => {
										// console.log(e)
									}
								})
							} else {
								try{
									uni.setTabBarBadge({
										index: 2,
										text: unread_count + '',
										complete: (e) => {
											// console.log(e)
										}
									})
								}catch(e){
									//TODO handle the exception
								}
							}
							unread_count = $store.getters['uniIm/unread_count']
							// console.log({unread_count});
							if (unread_count == 0) {
								uni.removeTabBarBadge({
									index: 0,
									complete: (e) => {
										// console.log(e)
									}
								})
							} else {
								uni.setTabBarBadge({
									index: 0,
									text: unread_count + '',
									complete: (e) => {
										// console.log(e)
									}
								})
							}
							
						}
					},500);
				}
			})
		})
		
		// #ifdef H5
		uni.addInterceptor('switchTab',{
			invoke: (e) => {
				if(e.url.includes('/pages/uni-im/index/index')){
					const mediaQueryOb = uni.createMediaQueryObserver(this)
					mediaQueryOb.observe({
						minWidth: 960
					}, matches => {
						if(matches){
							let param = getUrlParam(e.url)
							// console.log('param----',param);
							uni.$emit('uni-im-toChat',param)
						}
					})
				}
			}
		})
		
		function getUrlParam(url){
		    let u = url.split("?");
		    if(typeof(u[1]) == "string"){
		        u = u[1].split("&");
		        let get = {};
		        for(let i in u){
		            let j = u[i].split("=");
		            get[j[0]] = j[1];
		        }
		        return get;
		    } else {
		        return {};
		    }
		};
		// #endif


		appEvent.onAppHide(async ()=>{
			appIsShow = false
		})
		appEvent.onAppShow(async ()=>{
			appIsShow = true
			// #ifdef APP
			//清理系统通知栏消息和app角标
			this.clearPushNotify()
			// #endif
			
			if(appEvent.appShowIndex > 1){
				// 获取切到后台后socket离线丢失的数据 1. 拿到所有未读消息 2.去掉该会话已经存在的
				console.log("死循环验证1。。。")
				console.log("uniCloud.getCurrentUserInfo()1。。。", uniCloud.getCurrentUserInfo())
				let res = await db.collection('uni-im-msg')
								.where({
									to_uid:uniCloud.getCurrentUserInfo().uid,
									is_read:false
								})
								.get()
				let data = {}
				res.result.data.forEach(item=>{
					console.log("死循环验证11。。。")
					if(data[item.conversation_id]){
						data[item.conversation_id].push(item)
					}else{
						data[item.conversation_id] = [item]
					}
				})
				for (let conversation_id in data) {
					let conversation = $store.getters['uniIm/conversation'](conversation_id)
					if(conversation){
						let unread_count = conversation.unread_count
						data[conversation_id] = data[conversation_id].slice(unread_count)
					}
					data[conversation_id].forEach(msg=>{
						$store.dispatch('uniIm/setMsgList',{
							save:true,
							conversation_id,
							action:'push',
							data:msg
						})
					})
				}
				// console.log('res',data);
			}
			
		})
	},
	getConversationId(id, type = 'single') { //single,group
		if (type == 'single') {
			let current_uid = uniCloud.getCurrentUserInfo().uid
			if (!current_uid) {
				console.error('错误current_uid不能为空', current_uid);
			}
			let param = [id, current_uid]
			return 'single_' + md5(param.sort().toString())
		} else {
			return 'group_' + id
		}
	},
	listenImMsg(){
		uni.onPushMessage(async res => {
			console.log('收到消息',res);
			const {currentConversationId} = $store.state.uniIm
			// console.log('收到消息 onPushMessage===================',res.type, res.data,currentConversationId );
			const {payload} = res.data
			if (payload.type == "uni-im") {
				const msg = payload.data
				// console.log({msg});
				// 超长文本传输时的id
				if(msg.LongMsg){
					const db = uniCloud.database();
					let res = await db.collection('uni-im-msg')
										.where({
											"_id":msg._id,
											"conversation_id":msg.conversation_id // conversation_id 必传否则会被触发器拦截
										})
										.get()
					// console.log(res);
					if(res.result.code == 0){
						payload.data.body = res.result.data[0].body
					} else {
						console.error('超长文本类型消息查库失败',msg._id);
					}
				}
				console.log('payload------',payload.device_id,uni.getSystemInfoSync().deviceId);
				if(payload.device_id == uni.getSystemInfoSync().deviceId){
					return console.log('当前设备发的消息，不用接收；已阻止');
				}
				
				if(res.type =='receive'){
					// console.log(777);
					const {conversation_id,group_id} = msg
					// console.log('msgmsgmsgmsgmsg.msg',msg);
					// #ifdef APP
					let currentPages = getCurrentPages()
					let topViewRoute = currentPages[currentPages.length-1].route
					// console.log('topViewRoute',topViewRoute);
					if( !appIsShow || !['uni_modules/pages/uni-im/index/index','pages/im/chat/chat'].includes(topViewRoute) ){
						// console.log('payload',payload);
						let {content,data,title,avatar_file} = payload
						let url = avatar_file?avatar_file.url: ''
						let icon = '_www/uni-im/static/avatarUrl.png'
						//安卓才有头像功能，再执行下载
						if (uni.getSystemInfoSync().platform == "android") {
							if(avatar_file){
								let downloadFileRes = await uni.downloadFile({url:avatar_file.url});
								icon = downloadFileRes[1]?.tempFilePath
							}
						}
						plus.push.createMessage(content,payload,{title,icon})
					} else if(conversation_id != currentConversationId){
						// uni.showToast({
						// 	title: '收到新消息请注意查看',
						// 	icon: 'none'
						// });
					}
					// #endif
					$store.dispatch('uniIm/setMsgList',{
						save:true,
						conversation_id,
						action:'push',
						data:msg
					})
					// console.log({
					// 	conversation_id,
					// 	action:'push',
					// 	data:msg
					// });
				} else {
					let currentPages = getCurrentPages()
					let topViewRoute = currentPages[currentPages.length-1].route
					// console.log('topViewRoute',topViewRoute);
					if(topViewRoute == 'uni_modules/pages/uni-im/chat/chat'){
						uni.redirectTo({
							url: '/pages/uni-im/chat/chat?conversation_id=' + msg.conversation_id,
							complete(e) {
								console.log(e);
							}
						})
					} else {
						uni.navigateTo({
							url: '/pages/uni-im/chat/chat?conversation_id=' + msg.conversation_id,
							complete(e) {
								console.log(e);
							}
						})
					}
				}
			}
			else if(payload.type == "uni-im-group-join"){
				// 新增群成员 有新用户入群
				let group_id = payload.data.group_id
				let conversation_id = 'group_'+ group_id,
					{userInfo,userList} = payload.data
				let noticeBody = formatTime(Date.now()) + " ";
				if(userList && userList.length){
					noticeBody += userList.reduce((sum, {
						nickname
					}) => {
						sum += nickname + " "
						return sum
					}, '') 
				}else{
					noticeBody += userInfo.nickname + " "
				}
				noticeBody += "加入群聊。"
				// console.log(988989,noticeBody);
				
				let data = $store.getters['uniIm/conversation'](conversation_id)
				if(data){
					data = JSON.parse(JSON.stringify(data))
					if(userInfo){
						data.group_member[userInfo._id] = userInfo
					}
					if(userList && userList.length){
						for (let i = 0; i < userList.length; i++) {
							data.group_member[userList[i]._id] = userList[i]
						}
					}
					// 将新用户 加入本地用户数据库
					$store.commit('uniIm/mergeUsersInfo', data.group_member)
					
					// 更新群信息，中的用户数据
					await $store.commit('uniIm/updateConversation',[conversation_id, data])
				}else{
					await $store.dispatch('uniIm/loadMoreConversation',conversation_id)
					await $store.dispatch('uniIm/loadMoreGroupData',{group_id})
				}

				// 群聊天记录加上 xxx 入群
				$store.dispatch('uniIm/setMsgList',{
					conversation_id,
					action:'push',
					save:true,
					data:{
						conversation_id,
						group_id,
						client_create_time: Date.now(),
						create_time: Date.now(),
						type: 'system',
						body: noticeBody
					}
				})
			}else if(payload.type == "uni-im-group-exit" || payload.type == "uni-im-group-expel" || payload.subType == 'uni-im-group-expel'){
				// 用户退群
				// 群聊天记录加上 xxx 退群
				let {timestamp,group_id} = payload.data
				let conversation_id = 'group_'+group_id
				
				let noticeBody = formatTime(Date.now(timestamp)) + ' ' + res.data.content 
				$store.dispatch('uniIm/setMsgList',{
					conversation_id,
					action:'push',
					save:true,
					data:{
						conversation_id,
						group_id,
						client_create_time: Date.now(),
						create_time: Date.now(),
						type: 'system',
						body: noticeBody
					}
				})
				
				// 如果是当前用户退群，就将群会话从列表移除
				if(payload.data.user_id == uniCloud.getCurrentUserInfo().uid){
					
					//如果已经打开此群聊
					if(currentConversationId == ('group_' + payload.data.group_id)){
						uni.navigateBack({
							delta:2
						})
					}
					setTimeout(()=>{
						$store.commit('uniIm/removeConversation',conversation_id)
						$store.commit('uniIm/removeGroup',{group_id:payload.data.group_id})
					}, 1000);
				}else{
					let data = $store.getters['uniIm/conversation'](conversation_id)
					data = JSON.parse(JSON.stringify(data))
					
					// console.error(11111,data)
					
					delete data.group_member[payload.data.user_id]
					// 更新群信息，中的用户数据
					await $store.commit('uniIm/updateConversation',[conversation_id, data])
				}
			}else if(payload.type == "uni-im-group-join-request"){
				uni.showToast({
					title: '有用户申请加入群聊',
					icon: 'none'
				});
			}else if(payload.type == "SystemNotice" && payload.subType == 'uni-im-group-cancellation'){
				let {group_id} = payload.data
				let conversationId = 'group_'+group_id
				//如果已经打开此群聊
				if(currentConversationId == conversationId){
					uni.navigateBack({
						delta:2
					})
				}
				setTimeout(()=>{
					$store.commit('uniIm/removeConversation',conversationId)
					$store.commit('uniIm/removeGroup',{group_id})
				}, 1000);
			} else if(payload.type == "SystemNotice" && payload.subType == "uni-im-friend-add"){
				// console.log('加好友的申请通过');
				let {from_uid,to_uid} = payload.data;
				let friend_uid = from_uid == uniCloud.getCurrentUserInfo().uid ? to_uid :from_uid
				$store.dispatch('uniIm/getConversation',{friend_uid})
				$store.dispatch('uniIm/loadMoreFriendData',{friend_uid})
				
			} else if(payload.type == "SystemNotice" && payload.subType == "uni-im-friend-delete"){
				let {from_uid,to_uid} = payload.data;
				let friend_uid = from_uid == uniCloud.getCurrentUserInfo().uid ? to_uid :from_uid
				$store.commit('uniIm/removeConversation',payload.data.conversationId)
				$store.commit('uniIm/removeFriend',{friend_uid})
			}
		})
	},
	formatTime(timestamp){
		timestamp +
			// 加上一个*0的数,用于刷新视图中的时间 （超过5小时的直接显示具体年月日）
			(timestamp - Date.now() < 3600 * 5 * 1000 ? $store.state.uniIm.heartbeat * 0 : 0);
		if (!timestamp) {
			return '';
		}
		return formatTime(timestamp)
	},
	// #ifdef APP
	clearPushNotify(){
		plus.push.clear()
		plus.runtime.setBadgeNumber(0)
	},
	// #endif
	async login({token,tokenExpired}){
		uni.setStorage({
			key:"uni_id_token_expired",
			data:tokenExpired
		})
		uni.setStorage({
			key:"uni_id_token",
			data:token
		})

		uni.getPushClientId({
			success: async function(e) {
				// console.log(e)
				let pushClientId = e.cid
				// console.log(pushClientId);
				let res = await uniIdCo.setPushCid({
					pushClientId
				})
				console.log('getPushClientId', res);
			},
			fail(e) {
				console.log(e)
			}
		})
		await uniIdMutations.updateUserInfo()
		uni.$emit('uni-id-pages-login-success')
	}
}