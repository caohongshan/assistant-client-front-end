(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/list"],{"093c":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{source:"",autoRedirect:!0,loadMore:{contentdown:"",contentrefresh:"",contentnomore:""}}},onLoad:function(n){n.source&&(this.source=n.source)},onPullDownRefresh:function(){this.$refs.udb.loadData({clear:!0},(function(){n.stopPullDownRefresh()}))},onReachBottom:function(){this.$refs.udb.loadMore()},methods:{loaded:function(n){n&&0!=n.length||!this.autoRedirect||this.navTo("./add")},loadData:function(){this.autoRedirect=!1,this.$refs.udb.loadData({clear:!0})},navToEdit:function(t){"settlement"==this.source?(this.getOpenerEventChannel().emit("addData",{address:t,address_id:t._id}),setTimeout((function(){return n.navigateBack()}),500)):this.navTo("./edit?id="+t._id,t)},fabClick:function(){this.navTo("./add")}}};t.default=e}).call(this,e("543d")["default"])},"09e3":function(n,t,e){"use strict";var a=e("9faa"),u=e.n(a);u.a},"35fa":function(n,t,e){"use strict";(function(n,t){var a=e("4ea4");e("3f59"),e("a9ff");a(e("66fd"));var u=a(e("ac8a"));n.__webpack_require_UNI_MP_PLUGIN__=e,t(u.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},"6f65":function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return a}));var a={unicloudDb:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/@dcloudio/uni-cli-shared/components/unicloud-db")]).then(e.bind(null,"960d"))},tianEmpty:function(){return e.e("uni_modules/tian-mall/components/tian-empty/tian-empty").then(e.bind(null,"2fd8"))},uniList:function(){return e.e("uni_modules/uni-list/components/uni-list/uni-list").then(e.bind(null,"7f52"))},uniListItem:function(){return e.e("uni_modules/uni-list/components/uni-list-item/uni-list-item").then(e.bind(null,"a5e7"))},uniLoadMore:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(e.bind(null,"345c"))}},u=function(){var n=this,t=n.$createElement,e=(n._self._c,n.$hasSSP("43a30cf4-1")),a=e?!n.$getSSP("43a30cf4-1","default")["loading"]&&0==n.$getSSP("43a30cf4-1","default")["data"].length:null,u=e&&!a?n.$getSSP("43a30cf4-1","default"):null,o=e&&!a&&u["error"]?n.$getSSP("43a30cf4-1","default"):null,i=!e||a||u["error"]?null:n.$getSSP("43a30cf4-1","default"),l=e&&!a&&!u["error"]&&i["data"]?n.$getSSP("43a30cf4-1","default"):null,r=e?n.$getSSP("43a30cf4-1","default"):null,d=e&&r["hasMore"]?n.$getSSP("43a30cf4-1","default"):null,c=e&&r["hasMore"]&&!d["loading"]?n.$getSSP("43a30cf4-1","default"):null;n._isMounted||(n.e0=function(t,e){var a=arguments[arguments.length-1].currentTarget.dataset,u=a.eventParams||a["event-params"];e=u.item;return n.navToEdit(e)}),n.$mp.data=Object.assign({},{$root:{m0:e,m1:a,m2:u,m3:o,m4:i,m5:l,m6:r,m7:d,m8:c}})},o=[]},"9faa":function(n,t,e){},ac8a:function(n,t,e){"use strict";e.r(t);var a=e("6f65"),u=e("fb76");for(var o in u)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(o);e("09e3");var i=e("f0c5"),l=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=l.exports},fb76:function(n,t,e){"use strict";e.r(t);var a=e("093c"),u=e.n(a);for(var o in a)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return a[n]}))}(o);t["default"]=u.a}},[["35fa","common/runtime","common/vendor"]]]);