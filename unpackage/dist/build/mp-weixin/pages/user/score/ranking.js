(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/score/ranking"],{"296d":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,a=(t._self._c,t.__map(t.dataList,(function(e,a){var n=t.__get_orig(e),r=e.score.toFixed(1);return{$orig:n,g0:r}})));t.$mp.data=Object.assign({},{$root:{l0:a}})},r=[]},"359a":function(t,e,a){"use strict";(function(t,e){var n=a("4ea4");a("3f59"),a("a9ff");n(a("66fd"));var r=n(a("9904"));t.__webpack_require_UNI_MP_PLUGIN__=a,e(r.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])},9904:function(t,e,a){"use strict";a.r(e);var n=a("296d"),r=a("ac69");for(var i in r)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(i);var o=a("f0c5"),c=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=c.exports},ac69:function(t,e,a){"use strict";a.r(e);var n=a("b547"),r=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},b547:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=t.database(),n={data:function(){return{level:"",limit:100,dataList:[]}},onLoad:function(){this.loadData()},methods:{loadData:function(){var t=this,e=this.$store.state.user.userInfo._id;a.collection("uni-id-users").where("score>0").field("avatar,nickname,score").orderBy("score desc,register_date asc").limit(this.limit).get().then((function(a){var n=a.result;console.log(n.data),t.buildMember(n.data),n.data.forEach((function(a,n){a.score=parseInt(a.score),a._id==e&&(t.level="第".concat(n+1,"名"))})),t.level||(t.level="超过".concat(t.limit,"名")),t.dataList=n.data}))}}};e.default=n}).call(this,a("a9ff")["default"])}},[["359a","common/runtime","common/vendor"]]]);