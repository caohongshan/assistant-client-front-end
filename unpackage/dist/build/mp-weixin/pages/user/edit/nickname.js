(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/edit/nickname"],{"0396":function(n,e,t){"use strict";t.r(e);var u=t("c68d"),i=t("cdb4");for(var o in i)["default"].indexOf(o)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(o);t("8e60");var a=t("f0c5"),r=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],void 0);e["default"]=r.exports},"128a":function(n,e,t){},"61f1b":function(n,e,t){"use strict";(function(n,e){var u=t("4ea4");t("3f59"),t("a9ff");u(t("66fd"));var i=u(t("0396"));n.__webpack_require_UNI_MP_PLUGIN__=t,e(i.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},"8e60":function(n,e,t){"use strict";var u=t("128a"),i=t.n(u);i.a},c68d:function(n,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"c",(function(){return o})),t.d(e,"a",(function(){return u}));var u={uniForms:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(t.bind(null,"9682"))},uniFormsItem:function(){return t.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(t.bind(null,"1f74"))},uniEasyinput:function(){return t.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(t.bind(null,"a6fd"))}},i=function(){var n=this.$createElement;this._self._c},o=[]},cdb4:function(n,e,t){"use strict";t.r(e);var u=t("f344"),i=t.n(u);for(var o in u)["default"].indexOf(o)<0&&function(n){t.d(e,n,(function(){return u[n]}))}(o);e["default"]=i.a},f344:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=n.database(),u={data:function(){return{formData:{name:""}}},onLoad:function(){this.userInfo.hasNickName&&(this.formData.name=this.userInfo.nickname)},computed:{userInfo:function(){return this.$store.state.user.userInfo}},methods:{submit:function(){var n=this;this.confirmAction((function(){t.collection("uni-id-users").doc(n.userInfo._id).update({nickname:n.formData.name}).then((function(e){n.$success("修改成功"),n.navTimeBack(),n.userInfo.nickname=n.formData.name}))}),"是否确定修改？")}}};e.default=u}).call(this,t("a9ff")["default"])}},[["61f1b","common/runtime","common/vendor"]]]);