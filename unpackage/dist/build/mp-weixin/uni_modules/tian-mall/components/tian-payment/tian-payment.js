(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/tian-mall/components/tian-payment/tian-payment"],{"0f7e":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"49dc"))},tianIcons:function(){return n.e("uni_modules/tian-mall/components/tian-icons/tian-icons").then(n.bind(null,"a527"))},uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,"345c"))}},i=function(){var e=this.$createElement,t=(this._self._c,this.paymentList&&this.paymentList.length>0);this.$mp.data=Object.assign({},{$root:{g0:t}})},r=[]},3500:function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("9523"));function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){(0,i.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={data:function(){return{balance:0,type:"",order:{},loaded:!1,paymentList:[]}},props:{value:{type:Object,default:function(){return{}}},confirm:{type:Boolean,default:!1}},watch:{value:function(e){console.log("watch value",e),this.order=e,this.loadData(e)}},methods:{loadData:function(e){var t=this;this.$request("payment/info",a(a({},e),{},{id:e._id,module:e.module})).then((function(e){t.loaded=!0,t.paymentList=e.paymentList,t.order=e.order,t.balance=e.balance,0==t.order.total_fee&&t.paymentList.filter((function(e){return"balance"==e.key})).length>0&&(t.type="balance",t.paymentProcess())}))},choose:function(t){var n=this,o="".concat(t.key,"BeforePayment");this.type=t.key,t.confirm?e.showModal({content:"确定使用".concat(t.name,"吗？"),success:function(e){e.confirm&&(n[o]&&!n[o]()||n.paymentProcess())}}):this[o]&&!this[o]()||this.paymentProcess()},balanceBeforePayment:function(){return!(this.order.total_fee>this.balance)||(this.$message("余额不足"),!1)},paymentProcess:function(){var t=this;e.showLoading({title:"支付中",mask:!0}),this.$request("payment/pay",a(a({},this.order),{},{id:this.order.id,module:this.order.module,type:this.type})).then((function(n){e.hideLoading(),n.transaction_id?t.paySuccess():n.mweb_url?window.location.replace(n.mweb_url):n.redirect_url?window.location.replace(n.redirect_url):e.requestPayment(a(a({},n),{},{success:function(e){t.paySuccess()},fail:function(e){t.payFailed()}}))}),(function(e){t.$refs.payPopup.close()}))},paySuccess:function(){console.log("支付成功",this.confirm),this.$success("支付成功"),this.$emit("success",this.value),this.$refs.payPopup.close(),this.$emit("successed",this.order)},payFailed:function(){this.$message("支付失败")},close:function(){var t=this;this.$refs.payPopup.close(),this.confirm&&e.showModal({content:"确定取消订单吗？",confirmText:"去意已决",cancelText:"我再想想",success:function(n){n.confirm?(e.showLoading({title:"正在取消订单",mask:!0}),t.$request("payment/cancel",{id:t.order.id,module:t.order.module}).then((function(e){t.$message("取消成功"),t.navTimeBack()}))):t.$refs.payPopup.open()}})},open:function(){this.$refs.payPopup.open()},change:function(e){var t=e.show;t||this.$emit("close")}}};t.default=c}).call(this,n("543d")["default"])},"70e2":function(e,t,n){"use strict";n.r(t);var o=n("3500"),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},dd82:function(e,t,n){"use strict";var o=n("f031"),i=n.n(o);i.a},f031:function(e,t,n){},f09a:function(e,t,n){"use strict";n.r(t);var o=n("0f7e"),i=n("70e2");for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("dd82");var a=n("f0c5"),c=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/tian-mall/components/tian-payment/tian-payment-create-component',
    {
        'uni_modules/tian-mall/components/tian-payment/tian-payment-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f09a"))
        })
    },
    [['uni_modules/tian-mall/components/tian-payment/tian-payment-create-component']]
]);
