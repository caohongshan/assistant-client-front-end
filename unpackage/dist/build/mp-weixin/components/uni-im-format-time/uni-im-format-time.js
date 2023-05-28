(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-im-format-time/uni-im-format-time"],{"134e":function(t,e,n){"use strict";n.r(e);var i=n("9460"),r=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},"23ab":function(t,e,n){},"27d0":function(t,e,n){"use strict";var i=n("23ab"),r=n.n(i);r.a},"44df":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement;this._self._c},r=[]},4567:function(t,e,n){"use strict";n.r(e);var i=n("44df"),r=n("134e");for(var u in r)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n("27d0");var a=n("f0c5"),f=Object(a["a"])(r["default"],i["b"],i["c"],!1,null,"ed25287c",null,!1,i["a"],void 0);e["default"]=f.exports},9460:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("49c1")),u={computed:{formatTime:function(){var t=this.index,e=this.msgList[t],n=e.create_time||e.client_create_time;if(t&&t!=this.msgList.length-1){var i=this.msgList[t-1],u=i.create_time||i.client_create_time;if(n-u<6e4)return""}return r.default.formatTime(n)}},data:function(){return{}},props:{index:{type:Number,default:function(){return""}},msgList:{type:Array,default:function(){return[]}}}};e.default=u}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-im-format-time/uni-im-format-time-create-component',
    {
        'components/uni-im-format-time/uni-im-format-time-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4567"))
        })
    },
    [['components/uni-im-format-time/uni-im-format-time-create-component']]
]);
