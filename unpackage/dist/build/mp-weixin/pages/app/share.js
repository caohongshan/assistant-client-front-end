(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/app/share"],{"0757":function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e.database(),o={data:function(){return{isCopy:!1,isValid:!0,isLoading:!0,parentUserInfo:{avatar:"/static/missing-face.png",nickname:"正在获取",mobile:"***********"},formData:{mobile:"",code:""},codeDuration:0,codeInterVal:null,read:!0,inviteCode:"",providerList:[]}},onLoad:function(e){console.log("share",e),this.inviteCode=e.u,this.globalInviteCode&&(this.inviteCode=this.globalInviteCode),n.hideLoading(),this.getInviterInfo(),this.isCopy=!0},computed:{customer:function(){return this.$store.state.app.customer},userInfo:function(){return this.buildUserInfo(this.$store.state.user.userInfo)},appConfig:function(){return this.$config.app},globalInviteCode:function(){return this.$store.state.user.inviteCode}},methods:{copyInviteCode:function(e){var t=this;n.setClipboardData({data:this.inviteCode,success:function(){console.log("copyInviteCode success"),t.isCopy=!0,e&&t.$success("操作成功")}})},getInviterInfo:function(){var e=this;this.inviteCode&&i.action("mobile").collection("uni-id-users").where('my_invite_code=="'.concat(this.inviteCode,'"')).field("avatar,nickname,mobile").limit(1).get().then((function(t){var n=t.result;console.log("getInviterInfo",n),0!=n.data.length?(e.buildMember(n.data),e.parentUserInfo=n.data[0],e.isLoading=!1):e.isValid=!1}))},changeRead:function(e){this.read=e.detail.value.length>0},sendSmsCode:function(){var e=this;this.codeDuration?this.$message("请在".concat(this.codeDuration,"秒后重试")):/^1\d{10}$/.test(this.formData.mobile)?(n.showLoading({title:"请等待"}),this.$request("user/login/sendSms",{mobile:this.formData.mobile}).then((function(t){e.codeDuration=60,e.codeInterVal=setInterval((function(){e.codeDuration--,0===e.codeDuration&&e.codeInterVal&&(clearInterval(e.codeInterVal),e.codeInterVal=null)}),1e3),e.$success("验证码发送成功")}),(function(t){e.$message("验证码发送失败")}))):this.$message("手机号码填写错误")},login:function(){var e=this;if(this.isSubmit)return!1;/^1\d{10}$/.test(this.formData.mobile)?/^\d{6}$/.test(this.formData.code)?(this.isSubmit=!0,n.showLoading({title:"请等待"}),this.$request("user/login/mobile",{inviteCode:this.inviteCode,channelCode:this.$store.state.user.channelCode,mobile:this.formData.mobile,code:this.formData.code}).then((function(t){e.$success("邀请成功"),e.goHome()}),(function(t){e.isSubmit=!1,e.$message("登录失败")}))):this.$message("验证码填写错误"):this.$message("手机号码填写错误")},homepage:function(){n.reLaunch({url:"/pages/index/index"})},download:function(){this.navTo("/pages/app/web",this.customer.downloadUrl)},goHome:function(){n.reLaunch({url:"/pages/index/index"})}}};t.default=o}).call(this,n("a9ff")["default"],n("543d")["default"])},"0a29":function(e,t,n){"use strict";var i=n("1bca"),o=n.n(i);o.a},"1bca":function(e,t,n){},"84c9":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}));var i={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(n.bind(null,"9682"))},uniFormsItem:function(){return n.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(n.bind(null,"1f74"))},uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"a6fd"))}},o=function(){var e=this.$createElement;this._self._c},s=[]},b52a:function(e,t,n){"use strict";n.r(t);var i=n("84c9"),o=n("f22b");for(var s in o)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("0a29");var a=n("f0c5"),u=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);t["default"]=u.exports},f22b:function(e,t,n){"use strict";n.r(t);var i=n("0757"),o=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=o.a},f996:function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("3f59"),n("a9ff");i(n("66fd"));var o=i(n("b52a"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])}},[["f996","common/runtime","common/vendor"]]]);