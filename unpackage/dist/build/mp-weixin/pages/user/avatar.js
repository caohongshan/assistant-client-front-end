(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/avatar"],{"1e98":function(t,e,i){"use strict";(function(t,e){var a=i("4ea4");i("3f59"),i("a9ff");a(i("66fd"));var o=a(i("9dc5"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(o.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},"7d65":function(t,e,i){"use strict";var a=i("b849"),o=i.n(a);o.a},"8c5d":function(t,e,i){"use strict";(function(t){var a=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(i("9523")),n=i("9b07"),s={data:function(){return{imageSrc:"",isShowImg:!1,SCREEN_WIDTH:0,SCREEN_HEIGHT:0,cropperInitW:0,cropperInitH:0,cropperW:0,cropperH:0,cropperL:0,cropperT:0,transL:0,transT:0,scaleP:0,imageW:0,imageH:0,cutL:0,cutT:0,cutB:0,cutR:"100%",qualityWidth:0,innerAspectRadio:1,ratio:1,pageinfo:{PAGE_X:0,PAGE_Y:0,PR:0,T_PAGE_X:0,T_PAGE_Y:0,CUT_L:0,CUT_T:0,CUT_R:0,CUT_B:0,CUT_W:0,CUT_H:0,IMG_RATIO:0,IMG_REAL_W:0,IMG_REAL_H:0,DRAFG_MOVE_RATIO:1,INIT_DRAG_POSITION:100,DRAW_IMAGE_W:0}}},onLoad:function(t){var e=this.systemInfo;this.qualityWidth=this.pageinfo.DRAW_IMAGE_W=this.cutB=this.cropperW=this.cropperInitW=this.SCREEN_WIDTH=e.screenWidth,this.cropperH=this.cropperInitH=this.SCREEN_HEIGHT=e.safeArea.height-e.navigationBarHeight,this.pageinfo.PR=e.pixelRatio},onReady:function(){var e=this;t.getStorage({key:"avatar",success:function(t){console.log(t),e.imageSrc=t.data,e.loadImage()}})},methods:{setData:function(t){var e=this;Object.keys(t).forEach((function(i){e.$set(e.$data,i,t[i])}))},loadImage:function(){var e=this,i=this;t.showLoading({title:"图片加载中..."}),t.getImageInfo({src:i.imageSrc,success:function(a){e.pageinfo.IMG_RATIO=a.width/a.height,e.pageinfo.IMG_RATIO>=1?(e.pageinfo.IMG_REAL_W=e.SCREEN_WIDTH,e.pageinfo.IMG_REAL_H=e.SCREEN_WIDTH/e.pageinfo.IMG_RATIO):e.SCREEN_WIDTH/e.SCREEN_HEIGHT<e.pageinfo.IMG_RATIO?(console.log("SCREEN_WIDTH/this.SCREEN_HEIGHT,this.pageinfo.IMG_RATIO",e.SCREEN_WIDTH/e.SCREEN_HEIGHT,e.pageinfo.IMG_RATIO),e.pageinfo.IMG_REAL_W=e.SCREEN_WIDTH,e.pageinfo.IMG_REAL_H=e.SCREEN_WIDTH/e.pageinfo.IMG_RATIO):(e.pageinfo.IMG_REAL_H=e.SCREEN_HEIGHT,e.pageinfo.IMG_REAL_W=e.SCREEN_HEIGHT*e.pageinfo.IMG_RATIO);var o=e.pageinfo.IMG_REAL_W<e.pageinfo.IMG_REAL_H?e.pageinfo.IMG_REAL_W:e.pageinfo.IMG_REAL_H;if(e.pageinfo.INIT_DRAG_POSITION=o>e.pageinfo.INIT_DRAG_POSITION?e.pageinfo.INIT_DRAG_POSITION:o,console.log("实际宽高",a.width,a.height),console.log("显示宽高",e.pageinfo.IMG_REAL_W,e.pageinfo.IMG_REAL_H),e.pageinfo.IMG_RATIO>=1){var n=(e.pageinfo.IMG_REAL_W-e.pageinfo.IMG_REAL_H)/2,s=n;i.setData({cropperW:e.SCREEN_WIDTH,cropperH:e.SCREEN_WIDTH/e.pageinfo.IMG_RATIO,cropperL:0,cropperT:(e.SCREEN_HEIGHT-e.pageinfo.IMG_REAL_H)/2,cutL:n,cutT:0,cutR:s,cutB:0,imageW:e.pageinfo.IMG_REAL_W,imageH:e.pageinfo.IMG_REAL_H,scaleP:e.pageinfo.IMG_REAL_W/e.SCREEN_WIDTH,qualityWidth:e.pageinfo.DRAW_IMAGE_W,innerAspectRadio:e.pageinfo.IMG_RATIO})}else{var _=(e.pageinfo.IMG_REAL_H-e.pageinfo.IMG_REAL_W)/2,c=_;console.log(_),i.setData({cropperW:e.pageinfo.IMG_REAL_W,cropperH:e.pageinfo.IMG_REAL_H,cropperL:(e.SCREEN_WIDTH-e.pageinfo.IMG_REAL_W)/2,cropperT:(e.SCREEN_HEIGHT-e.pageinfo.IMG_REAL_H)/2,cutL:0,cutT:_,cutR:0,cutB:c,imageW:e.pageinfo.IMG_REAL_W,imageH:e.pageinfo.IMG_REAL_H,scaleP:e.pageinfo.IMG_REAL_W/e.SCREEN_WIDTH,qualityWidth:e.pageinfo.DRAW_IMAGE_W,innerAspectRadio:e.pageinfo.IMG_RATIO})}i.setData({isShowImg:!0}),t.hideLoading()}})},contentStartMove:function(t){this.pageinfo.PAGE_X=t.touches[0].pageX,this.pageinfo.PAGE_Y=t.touches[0].pageY},contentMoveing:function(t){var e=(this.pageinfo.PAGE_X-t.touches[0].pageX)*this.pageinfo.DRAFG_MOVE_RATIO,i=(this.pageinfo.PAGE_Y-t.touches[0].pageY)*this.pageinfo.DRAFG_MOVE_RATIO;e>0?this.cutL-e<0&&(e=this.cutL):this.cutR+e<0&&(e=-this.cutR),i>0?this.cutT-i<0&&(i=this.cutT):this.cutB+i<0&&(i=-this.cutB),this.setData({cutL:this.cutL-e,cutT:this.cutT-i,cutR:this.cutR+e,cutB:this.cutB+i}),this.pageinfo.PAGE_X=t.touches[0].pageX,this.pageinfo.PAGE_Y=t.touches[0].pageY},contentTouchEnd:function(){},getImageInfo:function(){var e=this,i=this;if(t.showLoading({title:"图片生成中",mask:!0}),!this.isSubmit){this.isSubmit=!0;var a=t.createCanvasContext("myCanvas");a.drawImage(i.imageSrc,0,0,this.pageinfo.IMG_REAL_W,this.pageinfo.IMG_REAL_H),a.draw(!0,(function(){var a=(i.cropperW-i.cutL-i.cutR)/i.cropperW*e.pageinfo.IMG_REAL_W,s=(i.cropperH-i.cutT-i.cutB)/i.cropperH*e.pageinfo.IMG_REAL_H,_=i.cutL/i.cropperW*e.pageinfo.IMG_REAL_W,c=i.cutT/i.cropperH*e.pageinfo.IMG_REAL_H;t.canvasToTempFilePath({x:_,y:c,width:a,height:s,destWidth:a,destHeight:s,quality:.8,fileType:"jpg",canvasId:"myCanvas",success:function(i){var a=new Date,s=t.getStorageSync("avatarField");s||(s="user");var _=[s,"images",a.getFullYear(),a.getMonth()+1,a.getDate(),a.getTime()+".jpg"],c=_.join("/");t.showLoading({title:"图片上传中"}),(0,n.cloudUploadFile)(i.tempFilePath,c).then((function(i){console.log("url",i);try{e.$prePage().editData((0,o.default)({},s,i))}catch(a){console.log("getOpenerEventChannel fail",a)}e.$success("上传成功"),setTimeout((function(){t.navigateBack({delta:1})}),1500)}),(function(i){e.isSubmit=!1,t.showModal({title:"上传失败",showCancel:!1})}))}})}))}},dragStart:function(t){this.pageinfo.T_PAGE_X=t.touches[0].pageX,this.pageinfo.T_PAGE_Y=t.touches[0].pageY,this.pageinfo.CUT_L=this.cutL,this.pageinfo.CUT_R=this.cutR,this.pageinfo.CUT_B=this.cutB,this.pageinfo.CUT_T=this.cutT},dragMove:function(t){var e=t.target.dataset.drag;switch(e){case"right":var i=(this.pageinfo.T_PAGE_X-t.touches[0].pageX)*this.pageinfo.DRAFG_MOVE_RATIO;this.pageinfo.CUT_R+i<0&&(i=-this.pageinfo.CUT_R),this.pageinfo.CUT_B+i<0&&(i=-this.pageinfo.CUT_B),this.setData({cutR:this.pageinfo.CUT_R+i,cutB:this.pageinfo.CUT_B+i});break;case"left":i=(this.pageinfo.T_PAGE_X-t.touches[0].pageX)*this.pageinfo.DRAFG_MOVE_RATIO;this.pageinfo.CUT_L-i<0&&(i=this.pageinfo.CUT_L),this.pageinfo.CUT_L-i>this.cropperW-this.cutR&&(i=this.pageinfo.CUT_L-(this.cropperW-this.cutR)),this.pageinfo.CUT_B-i<0&&(i=this.pageinfo.CUT_B),this.setData({cutL:this.pageinfo.CUT_L-i,cutB:this.pageinfo.CUT_B-i});break;case"top":i=(this.pageinfo.T_PAGE_Y-t.touches[0].pageY)*this.pageinfo.DRAFG_MOVE_RATIO;this.pageinfo.CUT_T-i<0&&(i=this.pageinfo.CUT_T),this.pageinfo.CUT_T-i>this.cropperH-this.cutB&&(i=this.pageinfo.CUT_T-(this.cropperH-this.cutB)),this.pageinfo.CUT_R-i<0&&(i=this.pageinfo.CUT_R),this.setData({cutT:this.pageinfo.CUT_T-i,cutR:this.pageinfo.CUT_R-i});break;case"bottom":i=(this.pageinfo.T_PAGE_Y-t.touches[0].pageY)*this.pageinfo.DRAFG_MOVE_RATIO;this.pageinfo.CUT_B+i<0&&(i=-this.pageinfo.CUT_B),this.pageinfo.CUT_L+i<0&&(i=-this.pageinfo.CUT_L),this.setData({cutB:this.pageinfo.CUT_B+i,cutL:this.pageinfo.CUT_L+i});break;case"rightBottom":break;default:break}}}};e.default=s}).call(this,i("543d")["default"])},"9a3c":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},o=[]},"9dc5":function(t,e,i){"use strict";i.r(e);var a=i("9a3c"),o=i("cfe9");for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);i("7d65");var s=i("f0c5"),_=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=_.exports},b849:function(t,e,i){},cfe9:function(t,e,i){"use strict";i.r(e);var a=i("8c5d"),o=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a}},[["1e98","common/runtime","common/vendor"]]]);