(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/app/cities"],{"7e89":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){}));var i=function(){var t=this.$createElement;this._self._c},n=[]},"863f":function(t,e,a){"use strict";a.r(e);var i=a("db47"),n=a.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},a78a:function(t,e,a){"use strict";(function(t,e){var i=a("4ea4");a("3f59"),a("a9ff");i(a("66fd"));var n=i(a("caa0"));t.__webpack_require_UNI_MP_PLUGIN__=a,e(n.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])},caa0:function(t,e,a){"use strict";a.r(e);var i=a("7e89"),n=a("863f");for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);var c=a("f0c5"),s=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=s.exports},db47:function(t,e,a){"use strict";(function(t,i,n){var o=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=o(a("2eee")),s=o(a("c973")),d=t.database(),r={data:function(){return{localCity:{},limit:500,save:!1,codeList:{},dataList:[],hotLetter:"热门",zhixiashi:{"北京市":"110000","天津市":"120000","重庆市":"500000","上海市":"310000","北京":"110000","天津":"120000","重庆":"500000","上海":"310000"}}},onLoad:function(t){t.save&&(this.save=t.save),this.loadData()},computed:{isLogin:function(){return this.$store.getters["user/isTokenValid"]}},methods:{loadData:function(){var t=this;d.collection("opendb-city-china").where("(type==1) || (type==2 && is_recommend==true)").field("code,name,first_letter,is_recommend").orderBy("first_letter asc,name asc").limit(this.limit).get().then((function(e){var a=e.result;console.log(a);var i="",n=[],o=["省直辖县级行政区划","自治区直辖县级行政区划","县"],c=[];a.data.map((function(e){e.first_letter!=i&&(i&&t.dataList.push({letter:i,data:n}),i=e.first_letter,n=[]),-1==o.indexOf(e.name)&&(n.push(e.name),e.is_recommend&&c.push(e.name),t.zhixiashi[e.name]?t.codeList[e.name]=t.zhixiashi[e.name]:t.codeList[e.name]=e.code)})),c.length>0&&t.dataList.unshift({letter:t.hotLetter,data:c}),t.dataList.push({letter:i,data:n}),t.getLocation()}))},getLocationCallback:function(t){var e=this;console.log("getLocation",t),this.$request("utils/getLocationAddress",{fromLatlng:[t.latitude,t.longitude].join()}).then((function(t){if(console.log("data",t),t.ad_info){e.codeList[t.ad_info.district]?e.localCity={name:t.ad_info.district+"（当前定位）",realName:t.ad_info.district,code:e.codeList[t.ad_info.district]}:e.zhixiashi[t.ad_info.province]?e.localCity={name:t.ad_info.province+"（当前定位城市）",realName:t.ad_info.province,code:e.zhixiashi[t.ad_info.province]}:e.localCity={name:t.ad_info.city+"（当前定位城市）",realName:t.ad_info.city,code:e.codeList[t.ad_info.city]},console.log("this.localCity",e.localCity);var a=e.dataList[0].letter==e.hotLetter;if(e.codeList[e.localCity.name]=e.localCity.code,a){var i=e.dataList[0].data.findIndex((function(t){return 0==e.localCity.name.indexOf(t)}));-1!=i&&e.dataList[0].data.splice(i,1),e.dataList[0].data.unshift(e.localCity.name)}else e.dataList.unshift({letter:e.hotLetter,data:[e.localCity.name]})}}))},getLocation:function(){var t=this;i.getFuzzyLocation({type:"wgs84",success:function(e){t.getLocationCallback(e)}})},chooseCity:function(t){var e=this;return(0,s.default)(c.default.mark((function a(){var i;return c.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(console.log("chooseCity",t,e.codeList[t.item.name]),i={code:e.codeList[t.item.name],name:t.item.name},e.localCity&&e.localCity.code==i.code&&(i.name=e.localCity.realName),n.setStorage({key:"user_select_city",data:i}),!e.save||!e.isLogin){a.next=8;break}return a.next=7,d.collection("uni-id-users").where("_id==$cloudEnv_uid").update({select_city:i});case 7:e.$store.dispatch("user/getUserInfo");case 8:e.$success("设置成功"),n.$emit("updateGlobelCity",i),e.navTimeBack(!0,1500,(function(){e.$store.dispatch("app/init",{city:i})}));case 11:case"end":return a.stop()}}),a)})))()}}};e.default=r}).call(this,a("a9ff")["default"],a("bc2e")["default"],a("543d")["default"])}},[["a78a","common/runtime","common/vendor"]]]);