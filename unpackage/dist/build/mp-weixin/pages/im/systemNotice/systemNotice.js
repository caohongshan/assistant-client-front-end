(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/im/systemNotice/systemNotice"],{"03bb":function(t,e,n){"use strict";n.r(e);var i=n("576c"),r=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},4685:function(t,e,n){"use strict";var i=n("df8e"),r=n.n(i);r.a},"576c":function(t,e,n){"use strict";(function(t,i){var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("2eee")),o=r(n("7037")),u=r(n("9523")),c=r(n("c973")),s=r(n("49c1")),f=r(n("01c0")),l=n("26cb");function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){(0,u.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var p=t.database(),b={data:function(){return{isWidescreen:!1,filterNotice:{},tips:""}},onLoad:function(t){var e=this;return(0,c.default)(a.default.mark((function n(){var i;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:i=t.param,i=JSON.parse(decodeURIComponent(i)),e.setParam(i);case 3:case"end":return n.stop()}}),n)})))()},mounted:function(){return(0,c.default)(a.default.mark((function t(){return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},computed:{systemNoticeDatas:function(){return this.$store.getters["uniIm/systemNoticeDatas"](this.filterNotice)},systemNoticeState:function(){return this.$store.state.uniIm.systemNoticeDatas}},methods:m(m({},(0,l.mapMutations)({setSystemNoticeDatas:"uniIm/setSystemNoticeDatas"})),{},{setParam:function(t){var e=t.filterNotice,n=t.title;"string"==typeof e&&(e=JSON.parse(decodeURIComponent(e))),this.filterNotice=e,i.setNavigationBarTitle({title:n}),"新朋友"!=n||this.isWidescreen||(this.tips="好友请求通知")},setItem:function(t,e){var n=this;return(0,c.default)(a.default.mark((function i(){var r,u,c,s,f;return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:f=function(){var t=arguments.length,e=arguments[0];s(e)||(e={});for(var n=1;n<t;n++){var i=arguments[n];if(s(i))for(var r in i)"__proto__"!==r&&e!==i[r]&&(s(i[r])?e[r]=f(e[r],i[r]):e[r]=i[r])}return e},s=function(t){return"object"===(0,o.default)(t)&&"[object Object]"===Object.prototype.toString.call(t)},r=t._id,u=JSON.parse(JSON.stringify(n.$store.state.uniIm.systemNoticeDatas)),c=0;case 5:if(!(c<u.length)){i.next=13;break}if(u[c]._id!=r){i.next=10;break}return u[c]=f(u[c],e),n.setSystemNoticeDatas(u),i.abrupt("break",13);case 10:c++,i.next=5;break;case 13:return i.next=15,p.collection("uni-push-message").where('"_id" == "'.concat(r,'" && "user_id" == $cloudEnv_uid')).get();case 15:return i.sent,i.next=18,p.collection("uni-push-message").where('"_id" == "'.concat(r,'" && "user_id" == $cloudEnv_uid')).update(e);case 18:i.sent;case 19:case"end":return i.stop()}}),i)})))()},clickHandle:function(t,e){var n=this;return(0,c.default)(a.default.mark((function t(){var r;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.is_read||n.setItem(e,{is_read:!0}),r=e.path||e.payload.path,r&&i.navigateTo({url:r,fail:function(t){console.log(t)}});case 3:case"end":return t.stop()}}),t)})))()},doAction:function(t,e){var n=this,i=this.systemNoticeDatas[t],r={subType:i.payload.subType,confirm:1===e,cancel:0===e,item:i};(0,f.default)(r,(function(t){n.setItem(i,{is_read:!0,payload:{state:1===e?"confirm":"cancel"}})}))},formatTime:function(t){return s.default.formatTime(t)},handleText:function(t){switch(t){case 0:return"同意";case 100:return"已同意";case-100:return"已拒绝";default:return"其他"}}})};e.default=b}).call(this,n("a9ff")["default"],n("543d")["default"])},"66df":function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("3f59"),n("a9ff");i(n("66fd"));var r=i(n("814b"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"814b":function(t,e,n){"use strict";n.r(e);var i=n("88c9"),r=n("03bb");for(var a in r)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("4685"),n("89bb");var o=n("f0c5"),u=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,"399e0714",null,!1,i["a"],void 0);e["default"]=u.exports},"88c9":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uniList:function(){return n.e("uni_modules/uni-list/components/uni-list/uni-list").then(n.bind(null,"7f52"))},uniListChat:function(){return n.e("uni_modules/uni-list/components/uni-list-chat/uni-list-chat").then(n.bind(null,"56c7"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"06f3"))},uniListItem:function(){return n.e("uni_modules/uni-list/components/uni-list-item/uni-list-item").then(n.bind(null,"a5e7"))},uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"345c"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.systemNoticeDatas&&t.systemNoticeDatas.length),i=n?t.__map(t.systemNoticeDatas,(function(e,n){var i=t.__get_orig(e),r=t.formatTime(e.create_time);return{$orig:i,m0:r}})):null;t.$mp.data=Object.assign({},{$root:{g0:n,l0:i}})},a=[]},"89bb":function(t,e,n){"use strict";var i=n("b118"),r=n.n(i);r.a},b118:function(t,e,n){},df8e:function(t,e,n){}},[["66df","common/runtime","common/vendor"]]]);