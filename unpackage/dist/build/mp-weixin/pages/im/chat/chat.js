(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/im/chat/chat"],{"116b":function(t,e,n){"use strict";n.r(e);var i=n("a7f4"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"25cf":function(t,e,n){"use strict";var i=n("a8ea"),o=n.n(i);o.a},"265d":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uniImMsgList:function(){return n.e("components/uni-im-msg-list/uni-im-msg-list").then(n.bind(null,"f93e"))},uniImIcons:function(){return n.e("components/uni-im-icons/uni-im-icons").then(n.bind(null,"31f0"))},uniImSound:function(){return n.e("components/uni-im-sound/uni-im-sound").then(n.bind(null,"3035"))},uniImControl:function(){return n.e("components/uni-im-control/uni-im-control").then(n.bind(null,"2cdc"))}},o=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.isCodeText=e.detail.value},t.e1=function(e){t.isFocus=!1})},r=[]},"4b94":function(t,e,n){},"649a":function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("3f59"),n("a9ff");i(n("66fd"));var o=i(n("e120"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},a7f4:function(t,e,n){"use strict";(function(t,i){var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("2eee")),s=o(n("c973")),a=o(n("9523")),u=n("58c5"),c=n("26cb"),d=o(n("8a41")),h=o(n("49c1")),f=o(n("bc82"));function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){(0,a.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m={data:function(){return{conversation_id:!1,textareaHeight:26,loadMoreIng:!0,hasNews:!1,isWidescreen:!1,hasMore:!0,systemInfo:{safeAreaInsets:{bottom:0}},isCodeText:!1,menuIsShow:!1,emojiIsShow:!1,soundIsShow:!1,menuList:[{title:"图片",iconCode:"e7be"},{title:"视频",iconCode:"e690"},{title:"文件",iconCode:"e69e"}],keyboardHeight:0,keyboardMaxHeight:260,emojiCodes:f.default,isFocus:!1,msgListMoveX:0}},computed:g(g(g({},(0,c.mapState)({currentConversationId:function(t){return t.uniIm.currentConversationId}})),(0,c.mapGetters)({conversation:"uniIm/conversation",unread_count:"uniIm/unread_count"})),{},{currentConversation:function(){var t=this.conversation_id;return this.conversation(t)||{}},isSafariPc:function(){return"safari"==this.systemInfo.browserName&&this.isWidescreen},msgList:function(){return this.currentConversation.msgList||[]},msg:function(){var t=this.conversation_id;if(t){var e=getApp().globalData.uniIm.msgManagers,n=e[t];return n||(e[t]=new d.default(this.currentConversation)),e[t]}return{}},chatText:{get:function(){var t;return null===(t=this.currentConversation)||void 0===t?void 0:t.chatText},set:function(t){this.updateConversation([this.conversation_id,{chatText:t}])}},current_uid:function(){return u.store.userInfo._id},imPlaceholderheight:function(){var t=32+this.textareaHeight;return(this.keyboardHeight||this.menuIsShow||this.emojiIsShow)&&(t+=this.keyboardMaxHeight),this.keyboardHeight||(t+=this.systemInfo.safeAreaInsets.bottom/2),t},mpIsFocus:function(){return this.isFocus}}),watch:{"currentConversation.group_member":function(e,n){if(n&&e&&Object.keys(e).length!=Object.keys(n).length){var i=this.currentConversation.title;this.currentConversation.group_id&&(i+="（"+Object.keys(this.currentConversation.group_member).length+"人）"),t.setNavigationBarTitle({title:i})}}},created:function(){var e=this;this.systemInfo=t.getSystemInfoSync(),t.onKeyboardHeightChange((function(t){var n=t.height;e.keyboardHeight=n,n?e.keyboardMaxHeight=n:e.msgListMoveX=0,e.showLast(0)}))},mounted:function(){},onShow:function(){if(this.currentConversation.id){this.setCurrentConversationId(this.currentConversation.id);var e=this.currentConversation,n=e.title,i=e.group_id,o=e.group_member;i&&(n+="（"+Object.keys(o).length+"人）"),t.setNavigationBarTitle({title:n,complete:function(t){}})}},onUnload:function(){this.setCurrentConversationId(!1),getApp().globalData.uniIm.audioContext.stop()},beforeDestroy:function(){this.setCurrentConversationId(!1),getApp().globalData.uniIm.audioContext.stop()},onHide:function(){getApp().globalData.uniIm.audioContext.stop()},onLoad:function(t){var e=this;return(0,s.default)(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log("onLoad",t,t.conversation_id,e.msgList.length),t.conversation_id||!t.user_id){n.next=6;break}if(t.conversation_id=h.default.getConversationId(t.user_id),e.conversation(t.conversation_id)){n.next=6;break}return n.next=6,e.getConversation({friend_uid:t.user_id});case 6:return n.next=8,e.load(t.conversation_id);case 8:case"end":return n.stop()}}),n)})))()},methods:g(g(g({},(0,c.mapMutations)("uniIm",["setMsgList"])),{},{load:function(e){var n=this;return(0,s.default)(r.default.mark((function i(){var o;return r.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(n.setCurrentConversationId(e),n.conversation_id=e,n.currentConversation.id){i.next=7;break}return i.next=5,n.loadConversation(e);case 5:if(i.sent){i.next=7;break}return i.abrupt("return",t.showToast({title:"无效的conversation_id",icon:"none"}));case 7:o=n.currentConversation.title,n.currentConversation.group_id&&(o+="（"+Object.keys(n.currentConversation.group_member).length+"人）"),t.setNavigationBarTitle({title:o}),n.$nextTick((function(){n.$refs["msg-list"].init()})),n.currentConversation.unread_count&&n.clearUnreadCount(n.conversation_id);case 12:case"end":return i.stop()}}),i)})))()},onChatInputFocus:function(){var t=this;this.isFocus=!0,this.$nextTick((function(){t.menuIsShow=!1,t.emojiIsShow=!1}))},changeSoundIsShow:function(){var e=this;this.soundIsShow=!this.soundIsShow,this.soundIsShow?t.hideKeyboard():this.isFocus=!0,t.$emit("changeSoundIsShow"),this.$nextTick((function(){e.menuIsShow=!1,e.emojiIsShow=!1}))},changeMenuIsShow:function(e){var n=this;this.keyboardHeight?(this.menuIsShow=!0,t.hideKeyboard()):this.menuIsShow=!this.menuIsShow,this.emojiIsShow=!1,this.$nextTick((function(){n.showLast(0)})),e.stopPropagation()},changeEmojiIsShow:function(e){var n=this;this.soundIsShow=!1,this.keyboardHeight?(this.emojiIsShow=!0,t.hideKeyboard()):this.emojiIsShow=!this.emojiIsShow,this.menuIsShow=!1,this.$nextTick((function(){n.showLast(0)})),e.stopPropagation()},chooseAndUploadFile:function(e){var n=this;return(0,s.default)(r.default.mark((function o(){return r.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:i.chooseAndUploadFile({type:e,count:9,sizeType:["compressed"],success:function(t){t.tempFiles.forEach((function(t){var i=t.url,o=t.name,r=t.size;e=t.type.split("/")[0],["image","video"].includes(e)||(e="file");var s={};s[e]={url:i,size:r,name:o},n.beforeSendMsg(s)}))},fail:function(t){console.error(t)},complete:function(){t.hideLoading()}});case 1:case"end":return o.stop()}}),o)})))()},hideKeyboard:function(){var e=this;t.hideKeyboard(),this.$nextTick((function(){e.menuIsShow=!1,e.emojiIsShow=!1,e.isFocus=!1}))},input:function(){var e=this;if("android"!=this.systemInfo.platform&&this.chatText.indexOf("\n")>=0){this.chatText=this.chatText.substring(0,this.chatText.length-1),!function(t){return t=t.replace(/<\/?.+?>/g,""),t=t.replace(/[\r\n]/g,""),t}(this.chatText).length?(t.showToast({title:"不能发送空消息",icon:"none"}),this.chatText="",this.$nextTick((function(){e.chatText="",e.textareaHeight=26}))):this.beforeSendMsg()}},sendSound:function(t){this.beforeSendMsg({sound:t})},beforeSendMsg:function(){var e=arguments,n=this;return(0,s.default)(r.default.mark((function i(){var o,s,a;return r.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:for(a in o=e.length>0&&void 0!==e[0]?e[0]:{},s={type:"text"},o)o[a]&&(s.type=a,s.text=o[a]);if("text"!=s.type){i.next=9;break}if(s.text=n.chatText.trim(),s.text.length){i.next=7;break}return i.abrupt("return",t.showToast({title:"不能发送空消息",icon:"none"}));case 7:setTimeout((function(t){n.chatText=""}),0),n.isCodeText&&(s.type="code");case 9:s=Object.assign(s,{to_uid:n.currentConversation.friend_uid,conversation_id:n.currentConversation.id,group_id:n.currentConversation.group_id,client_create_time:Date.now(),from_uid:n.current_uid,self:!0}),n.setMsgList(s),setTimeout((function(){n.textareaHeight=26}),100),n.showLast();case 13:case"end":return i.stop()}}),i)})))()},retriesSendMsg:function(e){t.showLoading({mask:!0}),e.isRetries=!0,this.sendMsg(e,(function(e){t.hideLoading()}))},showLast:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:300;this.$refs["msg-list"].showLast(t),this.hasNews=!1},linechange:function(t){var e=t.detail,n=e.height,i=e.lineCount;1===i?this.textareaHeight=26:n<=100&&(this.textareaHeight=n-2)},showControl:function(t){var e=this;return(0,s.default)(r.default.mark((function n(){var i,o,s,a,u,c,d;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:i=t.index,o=t.msgContentDomInfo,console.log("index",i,e.msgList,e.msgList[i]),s=e.msgList[i].from_uid==e.current_uid,a={msg:e.msgList[i],msgIndex:i,isInTop:!1},u=o.top,c=o.bottom,o.left,o.right,d=o.width,o.height,a.width=d,s?(a.right=d/3+"px",a.left=""):(a.left=d/3+"px",a.right=""),a.top=u<60?c+8+"px":u-65+"px",a.isInTop=u>60,e.$refs["uni-im-control"].show(a);case 10:case"end":return n.stop()}}),n)})))()},clickMenu:function(t,e){t<2&&this.chooseAndUploadFile(0===t?"image":"video"),2===t&&this.chooseAndUploadFile("all"),e.stopPropagation()},clickEmojiItem:function(t,e){this.chatText+=t,e.stopPropagation()},tapUnreadCount:function(){this.isWidescreen||t.navigateBack()},getkey:function(t,e){return e}},(0,c.mapActions)({getConversation:"uniIm/getConversation",clearUnreadCount:"uniIm/clearUnreadCount",getMsgManager:"uniIm/getMsgManager",loadConversation:"uniIm/loadMoreConversation"})),(0,c.mapMutations)({setCurrentConversationId:"uniIm/setCurrentConversationId",updateConversation:"uniIm/updateConversation",updateMsgManager:"uniIm/updateMsgManager",addMsgManager:"uniIm/addMsgManager"})),onNavigationBarButtonTap:function(e){0===e.index&&(this.currentConversation.group_id?t.navigateTo({url:"/pages/uni-im/group/info?conversation_id="+this.currentConversation.id}):t.navigateTo({url:"/pages/uni-im/chat/info?user_id="+this.currentConversation.friend_uid}))}};e.default=m}).call(this,n("543d")["default"],n("a9ff")["default"])},a8ea:function(t,e,n){},ad33:function(t,e,n){"use strict";var i=n("4b94"),o=n.n(i);o.a},e120:function(t,e,n){"use strict";n.r(e);var i=n("265d"),o=n("116b");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("25cf"),n("ad33");var s=n("f0c5"),a=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"b9b79bc8",null,!1,i["a"],void 0);e["default"]=a.exports}},[["649a","common/runtime","common/vendor"]]]);