<template>
	<view class="root">
		<uni-im-list v-if="msgList.length" class="uni-im-list" @scroll="onScroll" :scroll-top="scrollTop"
			:scroll-into-view="scrollIntoView" :paddingBottom="paddingBottom" ref="uni-im-list">
			<uni-im-list-item v-for="(msg,index) in msgList" :key="msg._id" ref="uni-im-list-item">
				<view class="item" :id="'item-'+index">
					<view v-if="index === 0" class="data-state-tip-box" @appear="loadMore">
						<template v-if="isSafariPc">
							<button v-if="hasMore" class="loadMore-btn" @click="loadMore">点击加载更多</button>
							<text v-else class="data-state-tip-text">没有更多历史消息</text>
						</template>
						<template v-else>
							<!-- vue2下小程序端 加载状态如果使用组件会有 滚动锚定问题 其他端可以使用 uni-load-more -->
							<uni-icons v-if="hasMore" size="25px" color="#ccc" type="spinner-cycle"
								class="data-state-tip-icon" />
							<text class="data-state-tip-text">{{hasMore ? '正在加载历史消息' : '没有更多历史消息' }}</text>
						</template>
					</view>
					<view v-if="msg.type == 'system'" class="system-msg-box">
						<text class="system-msg">{{msg.text}}</text>
					</view>
					<template v-else>
						<uni-im-format-time :index="index" :msgList="msgList" />
						<uni-im-msg :msg="msg" :self="msg.self" :index="index"
							@showControl="showControl" @retriesSendMsg="retriesSendMsg"
							:avatar_file="currentConversation.avatar_file" ref="uni-im-msg" class="uni-im-msg">
						</uni-im-msg>
					</template>
				</view>
			</uni-im-list-item>
		</uni-im-list>
		<uni-load-more v-if="currentConversationId && msgList.length == 0" :status="hasMore?'loading':'noMore'"
			class="mg-15" :contentText='{"contentrefresh": "加载中","contentnomore": "- 没有聊天记录 -"}' />
		<!-- <view style="position: fixed;top: 100px;width: 400rpx;">
			paddingBottom：{{paddingBottom}}
			scrollTop：{{scrollTop}}
			msgList.length:{{msgList.length}}
			this.loadMore.lock：{{loadMore.lock}}
			scrollIntoView:{{scrollIntoView}}
			<button @click="showLast">showLast</button>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex';

	import { store as uniIdStore } from '@/uni_modules/uni-id-pages/common/store';

	import MsgManager from '@/common/msgManager.js';

	import uniImList from './components/uni-im-list/uni-im-list';
	import uniImListItem from './components/uni-im-list-item/uni-im-list-item';

	// #ifdef APP-NVUE
	const nativePluginDom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		components: {
			uniImList,
			uniImListItem
		},
		computed: {
			...mapState({
				currentConversationId: state => state.uniIm.currentConversationId,
				systemInfo: state => state.uniIm.systemInfo,
				isWidescreen: state => state.uniIm.isWidescreen,
				msgList: state => state.uniIm.msgList
			}),
			...mapGetters({
				conversation: 'uniIm/conversation',
			}),
			loadState() {
				return this.hasMore ? '正在加载历史消息' : '没有更多历史消息'
			},
			//当前用户自己的uid
			current_uid() {
				return uniIdStore.userInfo._id;
			},
			currentConversation() {
				return this.conversation(this.currentConversationId) || {};
			},
			msgManagers() {
				const msgManagers = getApp().globalData.uniIm.msgManagers;
				let msgManager = msgManagers[this.currentConversationId];
				if (!msgManager) {
					msgManagers[this.currentConversationId] = new MsgManager(this.currentConversation);
				}
				return msgManagers[this.currentConversationId] || {}
			},
			isSafariPc() {
				// #ifdef H5
				return this.systemInfo.browserName == 'safari' && this.isWidescreen
				// #endif
				return false
			}
		},
		// watch: {
		// 	"currentConversation.msgList"(data) {
		// 		this.msgList = data
		// 	}
		// },
		props: {
			paddingBottom: {
				default: ''
			}
		},
		data() {
			return {
				scrollIntoView: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				hasMore: false,
				tasksList: []
			}
		},
		async mounted() {
			// for (var i = 0; i < 10; i++) {
			// 	this.msgList.unshift({
			// 		t:i
			// 	})
			// }
		},
		methods: {
			...mapActions({
				// 加载更多会话数据
				getConversation: 'uniIm/getConversation',
				clearUnreadCount: 'uniIm/clearUnreadCount',
				setMsgList: 'uniIm/setMsgList',
				getMsgManager: 'uniIm/getMsgManager',
				loadConversation: 'uniIm/loadMoreConversation',
			}),
			...mapMutations({
				setCurrentConversationId: 'uniIm/setCurrentConversationId',
				updateConversation: 'uniIm/updateConversation',
				updateMsgManager: 'uniIm/updateMsgManager',
				addMsgManager: 'uniIm/addMsgManager'
			}),
			async init() {
				// init data --start
				this.scrollIntoView = ''
				this.scrollTop = 0
				this.old.scrollTop = 0
				this.hasMore = true
				this.tasksList = []
				this.loadMore.lock = false
				// init data --end
				if (!this.msgList) {
					await this.loadMore()
					this.tasksList.push(async () => {
						this.showLast(300)
						this.updateConversation([this.currentConversationId, {
							isInit: true
						}]);
					})
					this.doTasksListBefore()
				} else {
					if (this.msgList.length < this.msgManagers.pageLimit) {
						// 加载过且少于一页 说明没有更多历史数据，否则先假设有滚动到最后一条，用户再次滚动到顶时会根据接口响应数据重新设定
						this.hasMore = false
					}
					// #ifdef H5
					this.showLast(300)
					// #endif
				}
			},
			async loadMore() {
				if (this.loadMore.lock || !this.hasMore) {
					// console.log('this.loadMore.lock，!this.hasMore', this.loadMore.lock,!this.hasMore);
					return []
				}
				this.loadMore.lock = true
				let data = await this.msgManagers.getMore()
				// console.log('加载到数据：', data);
				this.hasMore = (data.length != 0)

				// 添加到任务列再执行，解决滚动锚定的问题
				this.tasksList.push(() => {
					this.setMsgList({
						conversation_id: this.currentConversationId,
						action: this.currentConversation.isInit ? 'unshift' : 'set',
						data
					});
					this.$nextTick(async() => {
						this.loadMore.lock = false
						if (this.msgList.length < this.msgManagers.pageLimit && this.hasMore) {
							// 不满一页再拉取一遍
							this.loadMore.lock = false
							await this.loadMore()
						}
					})
					// console.log('this.loadMore.lock-----',this.loadMore.lock);
				})
				this.doTasksListBefore()

				return data
			},
			doTasksListBefore() {
				// console.log('doTasksListBefore');
				
				if (this.tasksList.length) {
					// 非APP端有滚动锚定问题，需要先滚动为非0高度再加载
					
					// #ifndef APP-NVUE
					if (this.old.scrollTop < 1 && !this.isSafariPc) {
						// console.log('小于1111');
						this.scrollTop = this.old.scrollTop
						return this.$nextTick(() => {
							this.scrollTop = 1
							this.old.scrollTop = 1
							setTimeout(() => {
								this.doTasksList()
							}, 300);
						})
					}
					// #endif
					
					this.doTasksList()
				}
			},
			doTasksList() {
				// console.log('doTasksList', this.tasksList.length);
				this.tasksList.forEach(fun => fun())
				this.tasksList = []
			},
			showLast(duration = 300) {
				this.$nextTick(() => {
					// #ifndef APP-NVUE
					this.scrollIntoView = 'uni-im-list-last-item'
					this.$nextTick(() => {
						this.scrollIntoView = ''
					})
					// #endif

					// #ifdef APP-NVUE
					if (this.msgList.length) {
						let target = this.$refs['uni-im-list'].$refs['uni-im-list-last-item'];
						console.log('滚动到最后一个', duration, target);
						nativePluginDom.scrollToElement(target, {
							animated: duration != 0,
							offset: 999
						});
					} else {
						console.log('没有任何元素');
					}
					// #endif
				})
			},
			onScroll(e) {
				// #ifdef H5
				// pc 端 safari浏览器有滚动锚定问题走点击加载
				if (this.isSafariPc) {
					return
				}
				// #endif

				this.old.scrollTop = e.detail.scrollTop
				if (e.detail.scrollTop < 300) {
					this.loadMore()
				}
				debounce(()=>{
					this.doTasksListBefore
					setTimeout(()=>{
						if (e.detail.scrollTop < 300) {
							this.loadMore()
						}
					}, 1500);
				})()
			},
			showControl(e) {
				this.$emit('showControl', e)
			},
			retriesSendMsg(e) {
				this.$emit('retriesSendMsg', e)
			}
		}
	}

	let timers = []

	function debounce(fn, delay) {
		return function() {
			if (timers.length) {
				timers.forEach(timer => clearTimeout(timer))
			}
			let timer = setTimeout(fn, delay);
			timers.push(timer)
		}
	}
</script>

<style lang="scss" scoped>
	.root,
	.uni-im-list {
		flex: 1;
		background-color: transparent;
	}

	.item {
		margin: 15px 0;
		// border: solid 1px #f40000;
	}

	.mg-15 {
		margin: 15px;
	}

	.data-state-tip-box {
		// height: 35px;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		color: #999999;
	}

	/* #ifndef APP-NVUE */
	.data-state-tip-icon {
		justify-content: center;
		align-items: center;
		display: flex;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* #endif */

	.data-state-tip-text {
		height: 36px;
		line-height: 36px;
		font-size: 12px;
		margin: 0 5px;
		color: #999999;
	}

	/* #ifdef H5 */
	.loadMore-btn {
		font-size: 14px;
		color: #666666;
	}

	.loadMore-btn::after {
		display: none;
	}

	/* #endif */

	.system-msg-box {
		margin-bottom: 10px;
		align-items: center;
	}
	.system-msg {
		background-color: #f2f2f2;
		color: #9d9e9d;
		font-size: 14px;
		height: 30px;
		line-height: 30px;
		padding: 0 15rpx;
		border-radius: 8px;
	}
</style>
