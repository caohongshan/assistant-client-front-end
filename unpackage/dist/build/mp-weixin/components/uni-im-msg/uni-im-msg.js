(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-im-msg/uni-im-msg"],{"06d6":function(t,e,n){"use strict";(function(t,i){var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,u=r(n("2eee")),a=r(n("c973")),s=n("58c5"),l=r(n("b7df"));setTimeout((function(){o=getApp().globalData.uniIm.audioContext}),0);var c={data:function(){return{username:"用户名",videoUrl:"",soundPlayState:0}},mounted:function(){var t=this;if("video"==this.msg.type)this.videoUrl=this.msg.text.url;else if("sound"==this.msg.type){o.onPlay((function(){var e=getApp().globalData.uniIm.audioContext.src;e==t.msg.text.url&&(t.soundPlayState=1)}));var e=function(){t.soundPlayState=0};o.onPause(e),o.onStop(e),o.onEnded(e),o.onError(e)}},props:{msg:{type:Object,default:function(){return{body:""}}},self:{type:Boolean,default:function(){return!1}},avatar_file:{type:[Object,String,Boolean],default:function(){return{url:"/uni-im/static/avatarUrl.png"}}},index:{type:Number}},computed:{userInfo:function(){return this.$store.getters["uniIm/userInfo"](this.msg.from_uid)||{}},msgStateIcon:function(){switch(this.msg.state){case 0:return"spinner-cycle";case-100:return"refresh-filled";case-200:return"info-filled";default:return""}},mineId:function(){return t.getCurrentUserInfo().uid},msgClass:function(){var t="";if("text"==this.msg.type){var e=this.msg.text.replace(/[\u0000-\u007f]/g,"a").replace(/[\u0080-\u07ff]/g,"aa").replace(/[\u0800-\uffff]/g,"aa").length;e>30&&(t+=" exceed")}return this.self&&(t+=" self-text-box"),t},avatarUrl:function(){var t,e;return this.self?null===(t=s.store.userInfo.avatar_file)||void 0===t?void 0:t.url:null===(e=this.userInfo.avatar_file)||void 0===e?void 0:e.url},soundBoxWidth:function(){return i.upx2px(12.5*this.msg.text.time)+50+"px"},htmlString:function(){if("text"!=this.msg.type)return"";var t=this.msg.text;if(/</g.test(t))return t;if(!t)return"";return t=t.replace(/(https?:\/\/|www\.)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g,(function(t){var e=t;return-1==t.indexOf("http")&&(e="http://"+t),'<a class="link" target="_blank" href="'+e+'">'+t+"</a> "})),t},nodes:function(){if(this.msg.text!=this.htmlString)try{var t=(0,l.default)(this.htmlString);return t.map((function(t){return t.attrs&&t.attrs.class?t.attrs.class+=" msg-text":t.attrs={class:"msg-text"},t})),t}catch(e){return console.error("htmlString error：",e),""}},fileSize:function(){if("file"==this.msg.type){var t=this.msg.text.size;return t<Math.pow(1024,1)?parseInt(10*t)/10+"B":t<Math.pow(1024,2)?parseInt(t/Math.pow(1024,1)*10)/10+"KB":t<Math.pow(1024,3)?parseInt(t/Math.pow(1024,2)*10)/10+"MB":"err"}},fileName:function(){if("file"==this.msg.type){var t=this.msg.text.name;return t.length<30?t:t.slice(0,15)+"..."+t.slice(-15)}}},methods:{clickLink:function(t){i.setClipboardData({data:t,complete:function(t){}})},playSound:function(t){o.src=t,1===this.soundPlayState?o.stop():(o.stop(),o.play())},previewImage:function(e){i.showLoading(),!e.includes("://")||e.includes("https://img-cdn-tc.dcloud.net.cn/uploads/avatar")||e.includes("https://ask.dcloud.net.cn/uploads/avatar")?i.previewImage({urls:[e],complete:function(){i.hideLoading()}}):t.getTempFileURL({fileList:[e]}).then((function(t){var e=t.fileList||t.result.fileList;i.previewImage({urls:[e[0].tempFileURL],complete:function(){i.hideLoading()}})}))},playVideo:function(){i.navigateTo({url:"/pages/pages/uni-im/common/video/video?url="+this.videoUrl,animationDuration:300,animationType:"fade-in"})},showControl:function(){var t=this;return(0,a.default)(u.default.mark((function e(){var n,r;return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("showControl---"),r=i.createSelectorQuery().in(t),e.next=4,new Promise((function(t){r.selectAll(".msg-content").boundingClientRect((function(e){n=e[0],t(n)})).exec()}));case 4:t.$emit("showControl",{index:t.index,msgContentDomInfo:n});case 5:case"end":return e.stop()}}),e)})))()},retriesSendMsg:function(){this.$emit("retriesSendMsg",this.msg)},downLoadFile:function(){i.downloadFile({url:this.msg.text.url,success:function(t){200===t.statusCode&&i.saveFile({tempFilePath:t.tempFilePath,success:function(t){i.openDocument({filePath:t.savedFilePath})}})}})}}};e.default=c}).call(this,n("a9ff")["default"],n("543d")["default"])},4759:function(t,e,n){"use strict";var i=n("7f0d"),r=n.n(i);r.a},"7f0d":function(t,e,n){},"93d9":function(t,e,n){"use strict";n.r(e);var i=n("06d6"),r=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},aea6:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={cloudImage:function(){return n.e("uni_modules/uni-id-pages/components/cloud-image/cloud-image").then(n.bind(null,"6682"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"06f3"))},uniImIcons:function(){return n.e("components/uni-im-icons/uni-im-icons").then(n.bind(null,"31f0"))}},r=function(){var t=this.$createElement;this._self._c},o=[]},f71d:function(t,e,n){"use strict";n.r(e);var i=n("aea6"),r=n("93d9");for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("4759");var u=n("f0c5"),a=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=a.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-im-msg/uni-im-msg-create-component',
    {
        'components/uni-im-msg/uni-im-msg-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f71d"))
        })
    },
    [['components/uni-im-msg/uni-im-msg-create-component']]
]);
