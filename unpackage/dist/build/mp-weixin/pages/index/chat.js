(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/chat"],{"0b3e":function(t,e,a){"use strict";a.r(e);var n=a("64b4"),o=a.n(n);for(var c in n)["default"].indexOf(c)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(c);e["default"]=o.a},1135:function(t,e,a){},"13de":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){}));var n=function(){var t=this.$createElement;this._self._c},o=[]},5542:function(t,e,a){"use strict";a.r(e);var n=a("13de"),o=a("0b3e");for(var c in o)["default"].indexOf(c)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(c);a("a469");var i=a("f0c5"),s=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=s.exports},"64b4":function(t,e,a){"use strict";(function(t){var n=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(a("2eee")),c=n(a("c973")),i={data:function(){return{cachePreKey:"message_pre_",dataList:[{type:"system",thumb:"/static/images/message/system.png",title:"系统消息",note:"",badge:0,url:""},{type:"platform",thumb:"/static/images/message/platform.png",title:"平台消息",note:"",badge:0,url:""},{type:"coupons",thumb:"/static/images/message/coupons.png",title:"优惠福利",note:"",badge:0,url:""},{type:"order",thumb:"/static/images/message/order.png",title:"订单动态",note:"",badge:0,url:""},{type:"charge",thumb:"/static/images/message/charge.png",title:"交易通知",note:"",badge:0,url:""}]}},onLoad:function(){this.loadData(),t.$on("readMsg",(function(t){console.log(t)}))},onShow:function(){this.loadLocalData()},computed:{isLogin:function(){return this.$store.getters["user/isTokenValid"]},userInfo:function(){return this.$store.state.user.userInfo}},watch:{userInfo:function(){this.loadLocalData(),this.loadData()}},methods:{updateBtnText:function(t){},loadLocalData:function(){var e=this;this.dataList.forEach((function(a){t.getStorage({key:"".concat(e.cachePreKey).concat(e.userInfo._id,"_").concat(a.type),success:function(t){var e=t.data;a.note=e.title,a.badge=e.badge,a.url="/pages/app/message?type=".concat(a.type,"&title=").concat(a.title)},fail:function(){a.note="暂无消息",a.badge=0}})}))},loadData:function(){var e=this;this.isLogin&&db.action("message").collection("tian-mall-message").where("user_id==$cloudEnv_uid&&read==false").orderBy("create_date desc").limit(500).get().then((function(a){var n=a.result;n.data&&e.dataList.forEach((function(a){if(n.data[a.type]){var o=n.data[a.type];a.note=o.title,a.badge=o.badge,a.url="/pages/app/message?type=".concat(a.type,"&title=").concat(a.title),t.setStorage({key:"".concat(e.cachePreKey).concat(e.userInfo._id,"_").concat(a.type),data:o})}}))}))}},onPullDownRefresh:function(){this.loadData(),t.stopPullDownRefresh()},onNavigationBarButtonTap:function(e){var a=this;return(0,c.default)(o.default.mark((function n(){var c;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(c=e.index,console.log(a.isLogin),a.isLogin){n.next=5;break}return a.navToLoginNotice(!1,!1),n.abrupt("return");case 5:console.log(c),t.showModal({title:"确认清空所有未读消息吗？",cancelText:"取消",confirmText:"确认",success:function(e){var n=e.cancel;if(n)return!1;a.dataList.forEach((function(e){e.badge=0;var n="".concat(a.cachePreKey).concat(a.userInfo._id,"_").concat(e.type);t.getStorage({key:n,success:function(e){var a=e.data;a&&(a.badge=0,a.read=!0,t.setStorageSync(n,a))}})}))}});case 7:case"end":return n.stop()}}),n)})))()}};e.default=i}).call(this,a("543d")["default"])},a469:function(t,e,a){"use strict";var n=a("1135"),o=a.n(n);o.a},f137:function(t,e,a){"use strict";(function(t,e){var n=a("4ea4");a("3f59"),a("a9ff");n(a("66fd"));var o=n(a("5542"));t.__webpack_require_UNI_MP_PLUGIN__=a,e(o.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])}},[["f137","common/runtime","common/vendor"]]]);