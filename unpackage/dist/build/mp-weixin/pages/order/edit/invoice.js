(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/edit/invoice"],{"3e04":function(n,e,t){"use strict";t.r(e);var i=t("483a"),o=t("eeea");for(var a in o)["default"].indexOf(a)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(a);t("f3ff");var u=t("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=r.exports},"483a":function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return i}));var i={uniForms:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(t.bind(null,"9682"))},uniFormsItem:function(){return t.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(t.bind(null,"1f74"))},uniEasyinput:function(){return t.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(t.bind(null,"a6fd"))}},o=function(){var n=this.$createElement;this._self._c},a=[]},6221:function(n,e,t){"use strict";(function(n,e){var i=t("4ea4");t("3f59"),t("a9ff");i(t("66fd"));var o=i(t("3e04"));n.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},"93fb":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{formData:{type:"none",name:"",code:""},types:[{text:"不开发票",value:"none"},{text:"公司",value:"company"},{text:"个人",value:"personal"}]}},onLoad:function(n){var e=this.getItemData();e.invoice&&(this.formData.name=e.invoice),e.invoice_code&&(this.formData.code=e.invoice_code),e.invoice_type&&(this.formData.type=e.invoice_type)},methods:{submit:function(){console.log("this.formData",this.formData),this.getOpenerEventChannel().emit("addData",{invoice:this.formData.name,invoice_code:this.formData.code,invoice_type:this.formData.type}),setTimeout((function(){return n.navigateBack()}),500)}}};e.default=t}).call(this,t("543d")["default"])},d59b:function(n,e,t){},eeea:function(n,e,t){"use strict";t.r(e);var i=t("93fb"),o=t.n(i);for(var a in i)["default"].indexOf(a)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(a);e["default"]=o.a},f3ff:function(n,e,t){"use strict";var i=t("d59b"),o=t.n(i);o.a}},[["6221","common/runtime","common/vendor"]]]);