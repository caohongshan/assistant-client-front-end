(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/achievement"],{"0d3d":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var o={tianEmpty:function(){return n.e("uni_modules/tian-mall/components/tian-empty/tian-empty").then(n.bind(null,"2fd8"))},tianSingleUser:function(){return n.e("uni_modules/tian-mall/components/tian-single-user/tian-single-user").then(n.bind(null,"86f5"))},uniDateformat:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(n.bind(null,"23e3"))},uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"345c"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,!e.loading&&0==e.list.length),o=n?null:e.__map(e.list,(function(t,n){var o=e.__get_orig(t),r=t.inviter.score?t.inviter.score.toFixed(2):null;return{$orig:o,g1:r}}));e.$mp.data=Object.assign({},{$root:{g0:n,l0:o}})},i=[]},1223:function(e,t,n){"use strict";var o=n("cb25"),r=n.n(o);r.a},"22d9":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("3f59"),n("a9ff");o(n("66fd"));var r=o(n("7379"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"23ac":function(e,t,n){"use strict";n.r(t);var o=n("66f0"),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},"66f0":function(e,t,n){"use strict";var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("2eee")),i=o(n("c973")),a={data:function(){return{maxGoodsLength:3,current:0,options:{},list:[]}},computed:{userInfo:function(){return this.$store.state.user.userInfo},where:function(){var e=["rebates.id==$cloudEnv_uid"];return 1==this.current?e.push("rebate_state==2"):2==this.current?(e.push("rebate_state<2"),e.push("state<0")):(e.push("rebate_state<2"),e.push("state>0")),e.join(" && ")},scoreName:function(){return this.$store.state.app.customer.scoreName?this.$store.state.app.customer.scoreName:"积分"}},onLoad:function(){var e=this;return(0,i.default)(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.loadData();case 2:case"end":return t.stop()}}),t)})))()},methods:{loadData:function(){var e=this;return(0,i.default)(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$request("app/clientDB",{collectionName:"tian-mall-orders"});case 2:n=t.sent,console.log("res==",n),n[0].data.forEach((function(t){t.inviter={money:0,score:0,title:""},t.rebates&&t.rebates.filter((function(t){return t.id==e.userInfo._id})).map((function(e){t.inviter.money+=e.money,t.inviter.score+=e.score,e.title&&(t.inviter.title+=(t.inviter.title?"，":"")+e.title)})),t.goods&&(t.goods.forEach((function(t){t.goods_thumb=e.$thumbImg(t.goods_thumb,"168x168")})),t.hasMoreGoods=!1,t.goods.length>3&&(t.origin_goods=t.goods,t.goods=t.goods.filter((function(t,n){return n<e.maxGoodsLength})),t.hasMoreGoods=!0,t.showGoodsType=0))}));case 5:case"end":return t.stop()}}),t)})))()},showMore:function(e,t){var n=this;e.goods=t?e.origin_goods:e.goods.filter((function(e,t){return t<n.maxGoodsLength})),e.showGoodsType=t},changeTab:function(e){this.current=e,this.loadData()}}};t.default=a},7379:function(e,t,n){"use strict";n.r(t);var o=n("0d3d"),r=n("23ac");for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("1223");var a=n("f0c5"),u=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=u.exports},cb25:function(e,t,n){}},[["22d9","common/runtime","common/vendor"]]]);