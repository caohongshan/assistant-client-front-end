(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/category"],{4043:function(t,e,n){"use strict";var o=n("5ecc"),i=n.n(o);i.a},"58f4":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var o={tianGoodsSku:function(){return n.e("uni_modules/tian-mall/components/tian-goods-sku/tian-goods-sku").then(n.bind(null,"b631"))}},i=function(){var t=this.$createElement;this._self._c},a=[]},"5ecc":function(t,e,n){},7273:function(t,e,n){"use strict";n.r(e);var o=n("72e9"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"72e9":function(t,e,n){"use strict";(function(t){var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("2eee")),a=o(n("c973")),s=o(n("d067")),r={mixins:[s.default],data:function(){return{goods:{},mainCategory:{},categories:[],subCategories:[],subCateHeight:100,subCategoryLeft:0,subCategoryTop:0,mainCategoryTop:0,options:{scrollLeft:0,scrollTop:0,sv:"",mainCurrentId:"",subCurrentId:""}}},onLoad:function(t){t.id&&(this.options.mainCurrentId=t.id),this.loadData()},computed:{goodsCondition:function(){return console.log("change goods condition"),'category_id=="'.concat(this.options.subCurrentId,'"')},searchStyle:function(){return"padding-top:".concat(this.systemInfo.custom.top,"px;")}},onHide:function(){var e=this;t.showTabBar(),setTimeout((function(){e.$refs.tianSkuPop.close()}),500)},mounted:function(){},methods:{fastSelectSubcategory:function(t){this.subCategories.forEach((function(e){e.selected=t._id==e._id})),this.subCategoryTop=t.top},subCategoryScroll:function(t){var e=this;t.detail.scrollTop>0?this.subCategories.forEach((function(n){n.selected=!1,n.top<=t.detail.scrollTop&&n.bottom>t.detail.scrollTop&&(e.subCategoryLeft=n.left,n.selected=!0)})):this.subCategoryLeft=0},loadList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";getApp().globalData.searchText=e,t.navigateTo({url:"/pages/product/list"})},loadData:function(){var t=this;return(0,a.default)(i.default.mark((function e(){var n,o;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$request("mall/cart/categories");case 2:n=e.sent,o=!1,n.forEach((function(e,n){e.index=n,e.ad_banner?e.ad_banner=t.$thumbImg(e.ad_banner,"450x150"):e.ad_banner="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3fbab731-e993-47e6-882f-a74e444709a3/11b41427-1164-4254-a723-aacec29d1eb6.jpg",e.icon=t.$thumbImg(e.icon,"80x80"),t.options.mainCurrentId&&e._id==t.options.mainCurrentId&&(o=e),e.children.forEach((function(e,n){e.selected=0==n,e.children&&e.children.forEach((function(e){e.icon=t.$thumbImg(e.icon,"130x130")}))}))})),t.categories=n,o||(o=t.categories[0]),t.changeMainCategory(o);case 8:case"end":return e.stop()}}),e)})))()},adClick:function(){this.mainCategory.ad_open_url&&this.navTo(this.mainCategory.ad_open_url)},changeMainCategory:function(t){var e=this,n=-1;return this.subCategoryTop=0,this.subCategoryLeft=0,this.mainCategoryTop=t.top-200,this.categories.forEach((function(e,o){e._id==t._id&&(n=o),e.className=""})),-1==n?(console.log("主分类id不在范围内",t),!1):this.options.mainCurrentId==t._id?(console.log("重复点击无效",t),!1):(this.options.mainCurrentId=t._id,this.mainCategory=this.categories[n],this.mainCategory.className="current",this.subCategories=this.categories[n].children,this.subCategories.length>0?(this.options.subCurrentId=this.subCategories[0]._id,this.$nextTick((function(){e.fastSelectSubcategory(e.subCategories[0])}))):this.options.subCurrentId=this.options.mainCurrentId,0!=n&&(this.categories[n-1].className="prev"),n!=this.categories.length-1&&(this.categories[n+1].className="next"),void setTimeout((function(){e.calcMainSize(),e.calcSize()}),100))},changeSubCategory:function(t,e){var n=this;this.options.subCurrentId=t._id,setTimeout((function(){n.options.scrollTop=30*e-60}),300)},openSku:function(t){console.log("openSku",t),this.goods=t,this.$refs.tianSkuPop.open()},calcSize:function(){var e=0,n=0,o=0;this.subCategories.forEach((function(i,a){var s=t.createSelectorQuery().select("#sub-"+i._id);s.fields({size:!0},(function(t){t&&(i.top=e,e+=t.height,i.bottom=e)})).exec();var r=t.createSelectorQuery().select("#sub-left-"+i._id);r.fields({size:!0},(function(t){i.left=n+7-o,n+=t.width+7,o=t.width})).exec()}))},calcMainSize:function(){var e=0;this.categories.forEach((function(n){var o=t.createSelectorQuery().select("#main-"+n._id);o.fields({size:!0},(function(t){t&&(n.top=e,e+=t.height,n.bottom=e)})).exec()}))}}};e.default=r}).call(this,n("543d")["default"])},"7b5a":function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("3f59"),n("a9ff");o(n("66fd"));var i=o(n("d3c5"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},d3c5:function(t,e,n){"use strict";n.r(e);var o=n("58f4"),i=n("7273");for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("4043");var s=n("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=r.exports}},[["7b5a","common/runtime","common/vendor"]]]);