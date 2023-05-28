import uniImStorage from '@/common/uni-im-storage.js'

export default class Message {
	constructor(currentConversation) {
		
		this.currentConversation = currentConversation
		//console.log('this.currentConversation',this.currentConversation);
		
		this.conversation_id = this.currentConversation.id
		// this.msgList = this.currentConversation.msgList
		// this.isInit = this.currentConversation.isInit
		Object.defineProperty(this, 'msgList', {
			get() {
				return this.currentConversation.msgList
			}
		})
		Object.defineProperty(this, 'isInit', {
			get() {
				return this.currentConversation.isInit
			}
		})
	}
	isInit = false
	msgList = []
	pageLimit = uniImStorage.pageLimit
	storage = uniImStorage
	async getMore() {
		const that = this
		let res = {
			data: []
		}
		//未加载过数据，先将storage中的第一页取出
		//console.lerror('this.isInit',this.isInit,this.currentConversation.isInit);
		if (this.isInit === false) {
			let {
				data
			} = await this.storageMsg.get()
			//console.log('首次加载从本地存储中获取到：',data);
			if (data.length) {
				res.data = [...data]
				// that.msgList = data
				//console.log(that.msgList);
				this.storageMsg.maxTime = data[data.length - 1].create_time
			} else {
				this.storageMsg.maxTime = 0
			}
			//console.log('init storageMsg res', res);
		}
		// return res.data
		//加载比storage时间更大的数据
		if (this.afterStorageMsg.hasMore) {
			let {
				data
			} = await this.afterStorageMsg.get()
			//console.log('加载到 比storage时间更大的数据',data);
			if (data.length) {
				if(this.isInit === false){
					res.data = []
				}
				//console.log('1await this.afterStorageMsg.get()', data);
				res.data.unshift(...data)
				return res.data
			}
			//console.log('1await this.afterStorageMsg.get()',data);
		} else {
			//console.lerror('this.afterStorageMsg.hasMore',this.afterStorageMsg.hasMore)
		}

		// 加载storage中的数据
		if (this.storageMsg.hasMore) {
			//console.lerror('this.storageMsg.hasMore',this.storageMsg.hasMore)
			//console.log('resresresresres',res);
			let {
				data
			} = await this.storageMsg.get(res)
			if (data.length) {
				//console.log('2await this.storageMsg.get()', data);
				res.data.unshift(...data)
				return res.data
			}
		} else {
			//console.lerror('this.storageMsg.hasMore',this.storageMsg.hasMore)
		}

		//加载比storage时间更早的数据
		if (this.beforeStorageMsg.hasMore) {
				//console.lerror('this.beforeStorageMsg.hasMore',this.beforeStorageMsg.hasMore)
			let {
				data
			} = await this.beforeStorageMsg.get(res)
			if (data.length) {
				//console.log('3await this.beforeStorageMsg.get()', data);
				res.data.push(...data)
				return res.data
			}
		} else {
				//console.lerror('this.beforeStorageMsg.hasMore',this.beforeStorageMsg.hasMore)
		}
		
		return res.data
	}
	async getCloudMsg({
		minTime,
		maxTime,
		limit = this.pageLimit
	}) {
		const db = uniCloud.database();
		const dbCmd = db.command
		//console.log('this',this);
		// let where = `"conversation_id" == "${this.conversation_id}"`
		let where = {"conversation_id":this.conversation_id}
		if (minTime && maxTime) {
			where.create_time = dbCmd.and([
				dbCmd.gt(minTime),
				dbCmd.lt(maxTime)
			])
		}else{
			if (minTime) {
				// where += `&& "create_time" > ${minTime}`
				where.create_time =  dbCmd.gt(minTime)
			}
			if (maxTime) {
				// where += `&& "create_time" < ${maxTime}`
				where.create_time =  dbCmd.lt(maxTime)
			}
		}
		
		const msgTable = db.collection('uni-im-msg')
		let data;
		try{
			let res = await msgTable.where(where)
						.orderBy('create_time', 'desc')
						.limit(limit)
						.get()
			data = res.result.data.reverse()
			//console.lerror('where', where,data);
		}catch(e){
			data = []
			//TODO handle the exception
		}
		//存到本地
		//console.lerror(996666699955,[...data], minTime != 0);
		uniImStorage.insert([...data], minTime != 0)
		return {
			data
		}
	}
	async getStorageMsg(param = {}) {
		let res = uniImStorage.getData({
			conversation_id: (param.conversationId || this.conversation_id),
			page: param.page || 0,
			maxTime: param.maxTime
		})
		return {
			data: res,
			hasMore: 0
		}
	}
	storageMsg = {
		get: async (param) => {
			let maxTime = Date.now()
			//console.log('maxTime:'+maxTime,param);
			let data = this.isInit? this.msgList : []
			if(param && param.data && data.length == 0 ){
				data = param.data
			}
			if(data.length){
				//console.log(data);
				const {
					create_time,
					client_create_time
				} = data[0]
				maxTime = create_time || client_create_time
				//console.log('maxTime',maxTime,);
			}
			let res = await this.getStorageMsg({
				maxTime
			});
			//console.log('storageMsg.get',maxTime,res);
			this.storageMsg.hasMore = res.data.length != 0
			return res
		},
		hasMore: true,
		maxTime: false
	}
	afterStorageMsg = {
		//时间大于storage中最大时间的服务端数据
		get: async () => {
			let where = {
				minTime : this.storageMsg.maxTime
			}
			if (this.isInit && this.msgList && this.msgList.length) {
				where.maxTime = this.msgList[0].create_time
			}
			let res = await this.getCloudMsg(where)
			//console.log('afterStorageMsg.get where:',where,res);
			const dataLength = res.data.length
			if (dataLength) {
				//因为本地存储了新数据，所以本地最大时间戳需要变更
				// this.storageMsg.maxTime = res.data[0].create_time
			}
			this.afterStorageMsg.hasMore = dataLength != 0
			return res
		},
		hasMore: true
	}
	beforeStorageMsg = {
		get: async (param) => {
			let maxTime = Date.now()
			let data = this.msgList
			if(param && param.data && ( !this.isInit || data.length == 0 )){
				data = param.data
			}
			if (data.length) {
				maxTime = data[0].create_time
			}
			//console.log('maxTime',maxTime);
			let res = await this.getCloudMsg({
				minTime: 0,
				maxTime
			})
			this.beforeStorageMsg.hasMore = res.data.length != 0
			return res
		},
		hasMore: true
	}
}
