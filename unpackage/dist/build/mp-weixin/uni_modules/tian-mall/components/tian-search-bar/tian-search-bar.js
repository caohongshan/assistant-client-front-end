(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/tian-mall/components/tian-search-bar/tian-search-bar"],{"0203":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return n}));var n={tianIcons:function(){return i.e("uni_modules/tian-mall/components/tian-icons/tian-icons").then(i.bind(null,"a527"))}},a=function(){var t=this.$createElement;this._self._c},c=[]},1528:function(t,e,i){"use strict";i.r(e);var n=i("c12a"),a=i.n(n);for(var c in n)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(c);e["default"]=a.a},"1b5d":function(t,e,i){},"9d9e":function(t,e,i){"use strict";i.r(e);var n=i("0203"),a=i("1528");for(var c in a)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(c);i("9fb7");var o=i("f0c5"),s=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"51cc3f65",null,!1,n["a"],void 0);e["default"]=s.exports},"9fb7":function(t,e,i){"use strict";var n=i("1b5d"),a=i.n(n);a.a},c12a:function(t,e,i){"use strict";(function(t,n,a){var c=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=c(i("2eee")),s=c(i("c973")),r=t.database(),u={name:"TianSearchBar",props:{placeholder:{type:String,default:"请输入搜索内容"},radius:{type:[Number,String],default:5},clearButton:{type:String,default:"auto"},cancelButton:{type:String,default:"auto"},cancelText:{type:String,default:"取消"},bg_color:{type:String,default:"#F8F8F8"},maxlength:{type:[Number,String],default:100},value:{type:[Number,String],default:""},focus:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},configs:{type:Object,default:function(){return{selectCity:!1,fixed:!1,isSeat:!1,radius:5,searchBackground:"",cityColor:"#000000"}}}},inject:{tianPage:{from:"tianPage",default:null}},data:function(){return{selectedCityName:"",selectCityKey:"user_select_city",show:!1,showSync:!1,back:!1,searchVal:""}},watch:{value:{immediate:!0,handler:function(t){this.searchVal=t,t&&(this.show=!0)}},focus:{immediate:!0,handler:function(t){var e=this;t&&(this.show=!0,this.$nextTick((function(){e.showSync=!0})))}},searchVal:function(t,e){this.$emit("input",t)},userInfo:function(){this.getSelectedCityName()}},computed:{searchStyle:function(){return"border-radius:".concat(this.radius,"px;background-color:").concat(this.configs.searchBackground)},userInfo:function(){return this.$store.state.user.userInfo},placeholderText:function(){return this.configs.placeholder?this.configs.placeholder:this.placeholder},bgColorText:function(){return this.configs.bgColor?this.configs.bgColor:this.bg_color},pageStyle:function(){var t=this.systemInfo.custom,e=t.top,i=t.left,n=t.width,a=this.systemInfo.windowWidth;if(e&&this.configs.fixed){var c=["padding-top:".concat(e,"px;")];console.log(this.tianPage);if(this.tianPage&&this.tianPage.configs&&this.tianPage.configs.configs&&this.tianPage.configs.configs.backgroundImg&&c.push("background-image:url(".concat(this.tianPage.configs.configs.backgroundImg,") ;background-repeat:no-repeat;background-size: 100%;")),this.tianPage&&this.tianPage.dataList&&this.tianPage.dataList.length>0&&"tian-search-bar"==this.tianPage.dataList[0].component||this.configs.isFirst){var o=a-i-n,s=n+2*o;c.push("padding-right:".concat(s,"px;width:").concat(a-s-o,"px;padding-left:").concat(o,"px"))}return c.join(";")}return"background-color:".concat(this.bgColorText)},pageTmpStyle:function(){var t=this.systemInfo.custom.height;if(t&&this.configs.fixed)return"height:".concat(t+10,"px;")}},mounted:function(){this.getSelectedCityName()},methods:{goBack:function(){n.navigateBack({})},loadData:function(){this.getSelectedCityName()},getSelectedCityName:function(){if(this.configs.selectCity)if(this.userInfo.selectCity)this.selectedCityName=this.userInfo.selectCity.name;else{var t=n.getStorageSync(this.selectCityKey);console.log("city",t),t?this.selectedCityName=t.name:(this.selectedCityName="请选择",this.getLocation())}},getLocation:function(){var t=this;return(0,s.default)(o.default.mark((function e(){var i,n,c;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return{"北京市":"110000","天津市":"120000","重庆市":"500000","上海市":"310000","北京":"110000","天津":"120000","重庆":"500000","上海":"310000"},e.next=3,r.collection("opendb-city-china").where("type==2 && is_recommend==true").field("code,name").get();case 3:i=e.sent,n=i.result,c={},n.data.map((function(t){c[t.name]=t.code})),a.getFuzzyLocation({type:"wgs84",success:function(e){t.getLocationCallback(e)}});case 8:case"end":return e.stop()}}),e)})))()},getLocationCallback:function(t){var e=this;console.log("getLocation",t),this.$request("utils/getLocationAddress",{fromLatlng:[t.latitude,t.longitude].join()}).then((function(i){if(console.log("data",i),i.ad_info){var a={};a=districts[i.ad_info.district]?{latitude:t.latitude,longitude:t.longitude,name:i.ad_info.district,code:districts[i.ad_info.district]}:zhixiashi[i.ad_info.province]?{latitude:t.latitude,longitude:t.longitude,name:i.ad_info.province,code:zhixiashi[i.ad_info.province]}:{latitude:t.latitude,longitude:t.longitude,name:i.ad_info.city,code:i.ad_info.adcode.substr(0,4)+"00"},n.setStorage({key:e.selectCityKey,data:a,success:function(){console.log("重新加载首页",a),setTimeout((function(){e.$store.dispatch("app/init",{city:a})}),100)}}),e.selectedCityName=a.name}}))},searchClick:function(){var t=this;this.configs.disabled?n.navigateTo({url:this.configs.openUrl}):this.disabled?this.$emit("click"):this.show||(this.show=!0,this.$nextTick((function(){t.showSync=!0})))},clear:function(){this.$emit("clear",{value:this.searchVal}),this.searchVal=""},cancel:function(){this.$emit("cancel",{value:this.searchVal}),this.searchVal="",this.show=!1,this.showSync=!1,n.hideKeyboard()},confirm:function(){n.hideKeyboard(),this.$emit("confirm",{value:this.searchVal})},blur:function(){n.hideKeyboard(),this.$emit("blur",{value:this.searchVal})}}};e.default=u}).call(this,i("a9ff")["default"],i("543d")["default"],i("bc2e")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/tian-mall/components/tian-search-bar/tian-search-bar-create-component',
    {
        'uni_modules/tian-mall/components/tian-search-bar/tian-search-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9d9e"))
        })
    },
    [['uni_modules/tian-mall/components/tian-search-bar/tian-search-bar-create-component']]
]);
