(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/score/transfer"],{"144c":function(n,e,t){"use strict";var o=t("2ea8"),a=t.n(o);a.a},"2a94":function(n,e,t){"use strict";(function(n,e){var o=t("4ea4");t("3f59"),t("a9ff");o(t("66fd"));var a=o(t("444e"));n.__webpack_require_UNI_MP_PLUGIN__=t,e(a.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},"2ea8":function(n,e,t){},"444e":function(n,e,t){"use strict";t.r(e);var o=t("6fec"),a=t("bc14");for(var u in a)["default"].indexOf(u)<0&&function(n){t.d(e,n,(function(){return a[n]}))}(u);t("144c");var i=t("f0c5"),r=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=r.exports},"6fec":function(n,e,t){"use strict";t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return o}));var o={uniForms:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(t.bind(null,"9682"))},uniFormsItem:function(){return t.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(t.bind(null,"1f74"))},uniEasyinput:function(){return t.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(t.bind(null,"a6fd"))},unicloudDb:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/@dcloudio/uni-cli-shared/components/unicloud-db")]).then(t.bind(null,"960d"))},tianEmpty:function(){return t.e("uni_modules/tian-mall/components/tian-empty/tian-empty").then(t.bind(null,"2fd8"))},uniDateformat:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(t.bind(null,"23e3"))},uniLoadMore:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(t.bind(null,"345c"))}},a=function(){var n=this,e=n.$createElement,t=(n._self._c,n.$hasSSP("5aa8e4c3-6")),o=t?!n.$getSSP("5aa8e4c3-6","default")["loading"]&&0==n.$getSSP("5aa8e4c3-6","default")["data"].length:null,a=t&&!o?n.$getSSP("5aa8e4c3-6","default"):null,u=t?n.$getSSP("5aa8e4c3-6","default")["loading"]||n.$getSSP("5aa8e4c3-6","default")["hasMore"]:null,i=t&&u?n.$getSSP("5aa8e4c3-6","default"):null,r=t&&u&&!i["loading"]?n.$getSSP("5aa8e4c3-6","default"):null;n.$mp.data=Object.assign({},{$root:{m0:t,m1:o,m2:a,m3:u,m4:i,m5:r}})},u=[]},8060:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{balance:0,formData:{point:"",mobile:""}}},computed:{userInfo:function(){return this.$store.state.user.userInfo},score:function(){return this.balance},scoreRate:function(){return this.userInfo.score_charge_rate?100*this.userInfo.score_charge_rate:0},scoreName:function(){return this.$store.state.app.customer.scoreName}},onLoad:function(){this.userInfo.score&&(this.balance=parseInt(this.userInfo.score))},onPullDownRefresh:function(){this.$refs.udb.loadData({clear:!0},(function(){n.stopPullDownRefresh()}))},onReachBottom:function(){console.log("加载下一页"),this.$refs.udb.loadMore()},methods:{loadData:function(n){n.forEach((function(n){n.statusText="审核中",1==n.status?n.statusText="成功":2==n.status&&(n.statusText="拒绝")}))},submit:function(){var e=this,t=parseInt(this.formData.integral);return t?this.formData.mobile?this.balance<t?(this.$message("积分不足"),!1):!this.isSubmit&&void this.confirmAction((function(){e.isSubmit=!0,n.showLoading({title:"请等待"}),e.$request("user/score/transfer",{integral:t,mobile:e.formData.mobile},{loading:!0}).then((function(n){e.isSubmit=!1,console.log("jointeam",n),0==n.code&&(e.balance=n.balance,e.$success("转账成功")),e.formData.integral="",e.formData.mobile="",e.$refs.udb.loadData({clear:!0})}),(function(n){e.isSubmit=!1}))}),"本次操作不可撤销！是否确定转账？"):(this.$message("手机号不能为空"),!1):(this.$message("积分不能为空"),!1)}}};e.default=t}).call(this,t("543d")["default"])},bc14:function(n,e,t){"use strict";t.r(e);var o=t("8060"),a=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=a.a}},[["2a94","common/runtime","common/vendor"]]]);