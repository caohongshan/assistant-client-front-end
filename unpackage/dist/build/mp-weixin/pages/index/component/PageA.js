(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/component/PageA"],{"58fe":function(t,n,e){"use strict";(function(t){var a=e("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var c=a(e("4285")),u={name:"Basic",filters:{titleFilter:function(t){if(0===t.length)return"";for(var n="",e=0;e<t.length;e++)0!==e&&(n+=" / "),n+=t[e];return n}},data:function(){return{navList:c.default.data}},created:function(){t.onSocketMessage((function(t){console.log(t.data)}))},methods:{aaa:function(){t.request({url:"http://104.168.141.167:3000/chat",method:"post",success:function(t){console.log(t)}})}}};n.default=u}).call(this,e("543d")["default"])},"90d5":function(t,n,e){"use strict";var a=e("cad9"),c=e.n(a);c.a},b8cc:function(t,n,e){"use strict";e.r(n);var a=e("e042"),c=e("e869");for(var u in c)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return c[t]}))}(u);e("90d5");var o=e("f0c5"),r=Object(o["a"])(c["default"],a["b"],a["c"],!1,null,"edc11fac",null,!1,a["a"],void 0);n["default"]=r.exports},cad9:function(t,n,e){},e042:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){}));var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.navList,(function(n,e){var a=t.__get_orig(n),c=t._f("titleFilter")(n.title);return{$orig:a,f0:c}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},c=[]},e869:function(t,n,e){"use strict";e.r(n);var a=e("58fe"),c=e.n(a);for(var u in a)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/index/component/PageA-create-component',
    {
        'pages/index/component/PageA-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b8cc"))
        })
    },
    [['pages/index/component/PageA-create-component']]
]);
