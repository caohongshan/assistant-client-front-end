(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/shop"],{1319:function(t,e,n){"use strict";n.r(e);var o=n("f65f"),a=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},"2adf":function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("3f59"),n("a9ff");o(n("66fd"));var a=o(n("c2b4"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},c2b4:function(t,e,n){"use strict";n.r(e);var o=n("f20d"),a=n("1319");for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("d492");var s=n("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=u.exports},d492:function(t,e,n){"use strict";var o=n("e51e"),a=n.n(o);a.a},e51e:function(t,e,n){},f20d:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={tianPages:function(){return n.e("uni_modules/tian-mall/components/tian-pages/tian-pages").then(n.bind(null,"dc5d"))},tianGoodsList:function(){return n.e("uni_modules/tian-mall/components/tian-goods-list/tian-goods-list").then(n.bind(null,"8d33"))},unicloudDb:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/@dcloudio/uni-cli-shared/components/unicloud-db")]).then(n.bind(null,"960d"))},tianEmpty:function(){return n.e("uni_modules/tian-mall/components/tian-empty/tian-empty").then(n.bind(null,"2fd8"))},tianGoodsSku:function(){return n.e("uni_modules/tian-mall/components/tian-goods-sku/tian-goods-sku").then(n.bind(null,"b631"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$hasSSP("b92be652-3")),o=n?!t.$getSSP("b92be652-3","default")["loading"]&&0==t.$getSSP("b92be652-3","default")["data"].length:null,a=n?t.$getSSP("b92be652-3","default"):null;t._isMounted||(t.e0=function(e,n){var o=arguments[arguments.length-1].currentTarget.dataset,a=o.eventParams||o["event-params"];n=a.child;return t.navTo("/pages/product/list?shop_id="+n.shop_id+"&cid="+n._id+"&name="+n.name)}),t.$mp.data=Object.assign({},{$root:{m0:n,m1:o,m2:a}})},i=[]},f65f:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t.database(),o={data:function(){return{index:0,id:"",pageConfigs:{parent_id:"61d6b6781b2236000133a3c6",shop_id:""},item:{},goods:{},refresh:0,loadmore:0,where:"",categoryWhere:""}},computed:{banner:function(){return this.item.banner?this.item.banner:"/static/images/banner.jpg"},bannerStyle:function(){}},onShow:function(){getApp().globalData.searchText=""},onLoad:function(t){this.id=t.id,this.where='shop_id=="'.concat(this.id,'"'),this.categoryWhere='shop_id=="'.concat(this.id,'" && status==true'),this.pageConfigs.shop_id=t.id,this.item=this.getItemData(),this.item.page_id&&(this.pageConfigs.parent_id=this.item.page_id),this.loadData()},methods:{loadCategoryData:function(t){console.log(t)},loadData:function(){var t=this;n.collection("tian-mall-shops").doc(this.id).field("id,name,src,banner,month_sell,focus,state,score,online,page_id").get({getOne:!0}).then((function(e){var n=e.result;t.item=t.setShopDefaultData(n.data),t.item.page_id&&(t.pageConfigs.parent_id=t.item.page_id),t.selectTab(1)}))},setShopDefaultData:function(t){return["focus","month_sell","score"].map((function(e){t[e]?t[e+"_text"]=t[e]:t[e+"_text"]=0,"score"==e&&t[e]>3?t[e+"_text"]=t[e]+" 高":t[e]>1e5&&(t[e+"_text"]=parseInt(t[e]/1e4)+"万")})),t},selectTab:function(t){this.index=t},openSku:function(t){console.log("openSku",t),this.goods=t,this.$refs.tianSkuPop.open()},onReachBottom:function(){console.log("onReachBottom"),this.loadmore=Date.now()}}};e.default=o}).call(this,n("a9ff")["default"])}},[["2adf","common/runtime","common/vendor"]]]);