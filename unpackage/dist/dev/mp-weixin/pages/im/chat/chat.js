(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/im/chat/chat"],{

/***/ 282:
/*!***********************************************************************************************************!*\
  !*** H:/private/AIproject/psychic/assistant-client-front-end/main.js?{"page":"pages%2Fim%2Fchat%2Fchat"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _chat = _interopRequireDefault(__webpack_require__(/*! ./pages/im/chat/chat.nvue */ 283));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_chat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 283:
/*!***************************************************************************************!*\
  !*** H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.nvue?vue&type=template&id=6019c341&scoped=true& */ 284);
/* harmony import */ var _chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.nvue?vue&type=script&lang=js& */ 286);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _chat_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.nvue?vue&type=style&index=0&lang=css& */ 290);
/* harmony import */ var _chat_nvue_vue_type_style_index_1_id_6019c341_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat.nvue?vue&type=style&index=1&id=6019c341&lang=scss&scoped=true& */ 292);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 46);

var renderjs






/* normalize component */

var component = Object(_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6019c341",
  null,
  false,
  _chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/im/chat/chat.nvue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 284:
/*!**********************************************************************************************************************************!*\
  !*** H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=template&id=6019c341&scoped=true& ***!
  \**********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.nvue?vue&type=template&id=6019c341&scoped=true& */ 285);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_template_id_6019c341_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 285:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=template&id=6019c341&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniImMsgList: function () {
      return __webpack_require__.e(/*! import() | components/uni-im-msg-list/uni-im-msg-list */ "components/uni-im-msg-list/uni-im-msg-list").then(__webpack_require__.bind(null, /*! @/components/uni-im-msg-list/uni-im-msg-list.vue */ 707))
    },
    uniImIcons: function () {
      return __webpack_require__.e(/*! import() | components/uni-im-icons/uni-im-icons */ "components/uni-im-icons/uni-im-icons").then(__webpack_require__.bind(null, /*! @/components/uni-im-icons/uni-im-icons.vue */ 714))
    },
    uniImSound: function () {
      return __webpack_require__.e(/*! import() | components/uni-im-sound/uni-im-sound */ "components/uni-im-sound/uni-im-sound").then(__webpack_require__.bind(null, /*! @/components/uni-im-sound/uni-im-sound.vue */ 721))
    },
    uniImControl: function () {
      return __webpack_require__.e(/*! import() | components/uni-im-control/uni-im-control */ "components/uni-im-control/uni-im-control").then(__webpack_require__.bind(null, /*! @/components/uni-im-control/uni-im-control.vue */ 728))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.isCodeText = $event.detail.value
    }
    _vm.e1 = function ($event) {
      _vm.isFocus = false
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 286:
/*!****************************************************************************************************************!*\
  !*** H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.nvue?vue&type=script&lang=js& */ 287);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_software_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 287:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 31));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 33));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _store = __webpack_require__(/*! @/uni_modules/uni-id-pages/common/store */ 59);
var _vuex = __webpack_require__(/*! vuex */ 42);
var _msgManager = _interopRequireDefault(__webpack_require__(/*! @/common/msgManager.js */ 288));
var _utils = _interopRequireDefault(__webpack_require__(/*! @/common/utils.js */ 55));
var _emojiCodes = _interopRequireDefault(__webpack_require__(/*! @/common/emojiCodes */ 289));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var oldScrollTop;
var _default = {
  data: function data() {
    return {
      //当前会话对象id
      conversation_id: false,
      //聊天输入框高度
      textareaHeight: 26,
      //正在加载更多聊天数据
      loadMoreIng: true,
      //收到正在对话的用户发来新消息，时悬浮按钮提示
      hasNews: false,
      //是否为pc宽屏（width>960px）
      isWidescreen: false,
      hasMore: true,
      //系统信息
      systemInfo: {
        safeAreaInsets: {
          bottom: 0
        }
      },
      isCodeText: false,
      menuIsShow: false,
      emojiIsShow: false,
      soundIsShow: false,
      menuList: [{
        "title": "图片",
        "iconCode": "e7be"
      }, {
        "title": "视频",
        "iconCode": "e690"
      }, {
        "title": "文件",
        "iconCode": "e69e"
      }],
      keyboardHeight: 0,
      keyboardMaxHeight: 260,
      emojiCodes: _emojiCodes.default,
      isFocus: false,
      msgListMoveX: 0
    };
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapState)({
    currentConversationId: function currentConversationId(state) {
      return state.uniIm.currentConversationId;
    }
  })), (0, _vuex.mapGetters)({
    conversation: 'uniIm/conversation',
    //未读消息数量
    unread_count: 'uniIm/unread_count'
  })), {}, {
    currentConversation: function currentConversation() {
      var conversation_id = this.conversation_id; //|| this.currentConversationId
      // console.log('this.currentConversationId',this.currentConversationId,this.conversation_id);
      return this.conversation(conversation_id) || {};
    },
    isSafariPc: function isSafariPc() {
      return this.systemInfo.browserName == 'safari' && this.isWidescreen;
    },
    msgList: function msgList() {
      return this.currentConversation.msgList || [];
    },
    msg: function msg() {
      var conversation_id = this.conversation_id; //|| this.currentConversationId
      if (conversation_id) {
        var msgManagers = getApp().globalData.uniIm.msgManagers;
        var msgManager = msgManagers[conversation_id];
        if (!msgManager) {
          msgManagers[conversation_id] = new _msgManager.default(this.currentConversation);
        }
        return msgManagers[conversation_id];
      }
      return {};
    },
    //聊天数据
    //当前会话的聊天框文字内容
    chatText: {
      get: function get() {
        var _this$currentConversa;
        // console.log('this.currentConversation',this.currentConversation);
        return (_this$currentConversa = this.currentConversation) === null || _this$currentConversa === void 0 ? void 0 : _this$currentConversa.chatText;
      },
      set: function set(chatText) {
        this.updateConversation([this.conversation_id, {
          chatText: chatText
        }]);
      }
    },
    //当前用户自己的uid
    current_uid: function current_uid() {
      return _store.store.userInfo._id;
    },
    imPlaceholderheight: function imPlaceholderheight() {
      var imPlaceholderheight = 32 + this.textareaHeight;
      if (this.keyboardHeight || this.menuIsShow || this.emojiIsShow) {
        imPlaceholderheight += this.keyboardMaxHeight;
      }
      if (!this.keyboardHeight) {
        imPlaceholderheight += this.systemInfo.safeAreaInsets.bottom / 2;
      }
      return imPlaceholderheight;
    },
    mpIsFocus: function mpIsFocus() {
      return this.isFocus;
    }
  }),
  watch: {
    "currentConversation.group_member": function currentConversationGroup_member(data, oldData) {
      if (oldData && data && Object.keys(data).length != Object.keys(oldData).length) {
        var title = this.currentConversation.title;
        if (this.currentConversation.group_id) {
          title += "（" + Object.keys(this.currentConversation.group_member).length + "人）";
        }
        uni.setNavigationBarTitle({
          title: title
        });
      }
    }
  },
  created: function created() {
    var _this = this;
    this.systemInfo = uni.getSystemInfoSync();
    // console.log('this.systemInfo',this.systemInfo );

    // 监听键盘高度变化显示最后一条消息
    uni.onKeyboardHeightChange(function (_ref) {
      var height = _ref.height;
      _this.keyboardHeight = height;
      if (height) {
        _this.keyboardMaxHeight = height;
      } else {
        _this.msgListMoveX = 0;
      }
      _this.showLast(0);
    });
  },
  mounted: function mounted() {},
  onShow: function onShow() {
    if (this.currentConversation.id) {
      // 窗口显示时（因为可能是有其他app切换进已打开的本窗口，所以是onshow而不只是onload）设置全局变量 正在聊天的用户的会话id
      this.setCurrentConversationId(this.currentConversation.id);
      var _this$currentConversa2 = this.currentConversation,
        title = _this$currentConversa2.title,
        group_id = _this$currentConversa2.group_id,
        group_member = _this$currentConversa2.group_member;
      // console.log('this.currentConversation',this.currentConversation);
      if (group_id) {
        title += "（" + Object.keys(group_member).length + "人）";
      }
      // console.log('onShow:'+title);
      uni.setNavigationBarTitle({
        title: title,
        complete: function complete(e) {
          // console.log(e);
        }
      });
    }
  },
  onUnload: function onUnload() {
    // console.log('onUnload');
    //页面销毁之前销毁 全局变量 正在聊天的用户的id
    this.setCurrentConversationId(false);
    // console.log('beforeDestroy');
    // 关闭sound播放
    getApp().globalData.uniIm.audioContext.stop();
  },
  beforeDestroy: function beforeDestroy() {
    //页面销毁之前销毁 全局变量 正在聊天的用户的id
    this.setCurrentConversationId(false);
    // console.log('beforeDestroy');
    // 关闭sound播放
    getApp().globalData.uniIm.audioContext.stop();
  },
  onHide: function onHide() {
    // 关闭sound播放
    getApp().globalData.uniIm.audioContext.stop();
  },
  onLoad: function onLoad(e) {
    var _this2 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('onLoad', e, e.conversation_id, _this2.msgList.length);
              if (!(!e.conversation_id && e.user_id)) {
                _context.next = 6;
                break;
              }
              e.conversation_id = _utils.default.getConversationId(e.user_id);
              // console.log('has e.user_id',e.user_id,e.conversation_id);
              if (_this2.conversation(e.conversation_id)) {
                _context.next = 6;
                break;
              }
              _context.next = 6;
              return _this2.getConversation({
                friend_uid: e.user_id
              });
            case 6:
              _context.next = 8;
              return _this2.load(e.conversation_id);
            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0, _vuex.mapMutations)("uniIm", ["setMsgList"])), {}, {
    load: function load(conversation_id) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var title;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //设置当前会话id
                //设置全局的app当前正在聊天的会话id
                _this3.setCurrentConversationId(conversation_id);
                _this3.conversation_id = conversation_id;
                if (_this3.currentConversation.id) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 5;
                return _this3.loadConversation(conversation_id);
              case 5:
                if (_context2.sent) {
                  _context2.next = 7;
                  break;
                }
                return _context2.abrupt("return", uni.showToast({
                  title: '无效的conversation_id',
                  icon: 'none'
                }));
              case 7:
                title = _this3.currentConversation.title;
                if (_this3.currentConversation.group_id) {
                  title += "（" + Object.keys(_this3.currentConversation.group_member).length + "人）";
                }
                uni.setNavigationBarTitle({
                  title: title
                });
                _this3.$nextTick(function () {
                  _this3.$refs['msg-list'].init();
                });

                //清除未读数
                if (_this3.currentConversation.unread_count) {
                  _this3.clearUnreadCount(_this3.conversation_id);
                }

                //debug用模拟一次性自动发送100条数据
                // for (var i = 0; i < 20; i++) {
                // 	this.chatText = '这是第'+i+'条消息'
                // 	this.beforeSendMsg()
                // }*/
              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    onChatInputFocus: function onChatInputFocus() {
      var _this4 = this;
      this.isFocus = true;
      this.$nextTick(function () {
        _this4.menuIsShow = false;
        _this4.emojiIsShow = false;
      });
    },
    changeSoundIsShow: function changeSoundIsShow() {
      var _this5 = this;
      this.soundIsShow = !this.soundIsShow;
      if (this.soundIsShow) {
        uni.hideKeyboard();
      } else {
        this.isFocus = true;
      }
      uni.$emit('changeSoundIsShow');
      this.$nextTick(function () {
        _this5.menuIsShow = false;
        _this5.emojiIsShow = false;
      });
    },
    changeMenuIsShow: function changeMenuIsShow(e) {
      var _this6 = this;
      if (this.keyboardHeight) {
        this.menuIsShow = true;
        uni.hideKeyboard();
      } else {
        this.menuIsShow = !this.menuIsShow;
      }
      this.emojiIsShow = false;
      this.$nextTick(function () {
        _this6.showLast(0);
      });
      e.stopPropagation();
    },
    changeEmojiIsShow: function changeEmojiIsShow(e) {
      var _this7 = this;
      this.soundIsShow = false;
      if (this.keyboardHeight) {
        this.emojiIsShow = true;
        uni.hideKeyboard();
      } else {
        this.emojiIsShow = !this.emojiIsShow;
      }
      this.menuIsShow = false;
      this.$nextTick(function () {
        _this7.showLast(0);
      });
      e.stopPropagation();
    },
    chooseAndUploadFile: function chooseAndUploadFile(type) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                uniCloud.chooseAndUploadFile({
                  type: type,
                  count: 9,
                  sizeType: ['compressed'],
                  success: function success(e) {
                    // console.log(e);
                    e.tempFiles.forEach(function (event) {
                      var url = event.url,
                        name = event.name,
                        size = event.size;
                      // console.log('event',event);

                      type = event.type.split('/')[0];
                      if (!['image', 'video'].includes(type)) {
                        type = 'file';
                      }
                      // console.log('type===>', type);
                      var data = {};
                      data[type] = {
                        url: url,
                        size: size,
                        name: name
                      };
                      _this8.beforeSendMsg(data);
                    });
                  },
                  fail: function fail(e) {
                    console.error(e);
                    // uni.showToast({
                    // 	title: JSON.stringify(e),
                    // 	icon: 'none'
                    // });
                  },
                  complete: function complete() {
                    uni.hideLoading();
                  }
                });
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    hideKeyboard: function hideKeyboard() {
      var _this9 = this;
      // console.log('hideKeyboard');
      uni.hideKeyboard();
      this.$nextTick(function () {
        _this9.menuIsShow = false;
        _this9.emojiIsShow = false;
        _this9.isFocus = false;
      });
    },
    input: function input() {
      var _this10 = this;
      // 此事件仅非宽屏设备才会调用 非 Android端一旦输入换行符合直接发送消息
      if (this.systemInfo.platform != 'android' && this.chatText.indexOf('\n') >= 0) {
        var ClearBr = function ClearBr(key) {
          key = key.replace(/<\/?.+?>/g, '');
          key = key.replace(/[\r\n]/g, '');
          return key;
        };
        // console.log("有\n",this.chatText, this.chatText.length);
        this.chatText = this.chatText.substring(0, this.chatText.length - 1);
        //检查去除换行符后是否为空
        if (ClearBr(this.chatText).length) {
          this.beforeSendMsg();
        } else {
          uni.showToast({
            title: '不能发送空消息',
            icon: 'none'
          });
          this.chatText = '';
          this.$nextTick(function () {
            _this10.chatText = '';
            _this10.textareaHeight = 26;
          });
        }
      }
    },
    sendSound: function sendSound(e) {
      // console.log('sendSound',e);
      this.beforeSendMsg({
        sound: e
      });
    },
    beforeSendMsg: function beforeSendMsg() {
      var _arguments = arguments,
        _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var param, data, key;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                param = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};
                data = {
                  type: 'text'
                }; // 根据传入的参数设置消息类型和内容
                for (key in param) {
                  if (param[key]) {
                    data.type = key;
                    data.text = param[key];
                  }
                }
                // 如果是文本类型需要做一些处理
                if (!(data.type == 'text')) {
                  _context4.next = 9;
                  break;
                }
                //清除空格
                data.text = _this11.chatText.trim();
                // 阻止发送空消息
                if (data.text.length) {
                  _context4.next = 7;
                  break;
                }
                return _context4.abrupt("return", uni.showToast({
                  title: '不能发送空消息',
                  icon: 'none'
                }));
              case 7:
                // 在下一个进程 清除输入框的文本内容
                setTimeout(function (e) {
                  _this11.chatText = '';
                }, 0);

                // 当消息是否为 code类型开启时设置 -- 快速实现，临时方案 后续会优化
                if (_this11.isCodeText) {
                  data.type = 'code';
                }
              case 9:
                data = Object.assign(data, {
                  to_uid: _this11.currentConversation.friend_uid,
                  conversation_id: _this11.currentConversation.id,
                  group_id: _this11.currentConversation.group_id,
                  client_create_time: Date.now(),
                  from_uid: _this11.current_uid,
                  self: true
                });
                _this11.setMsgList(data);
                setTimeout(function () {
                  _this11.textareaHeight = 26;
                }, 100);
                _this11.showLast();
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    retriesSendMsg: function retriesSendMsg(data) {
      uni.showLoading({
        mask: true
      });
      // console.log('retriesSendMsg', data);
      data.isRetries = true;
      this.sendMsg(data, function (e) {
        uni.hideLoading();
      });
    },
    showLast: function showLast() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
      this.$refs['msg-list'].showLast(duration);
      this.hasNews = false;
    },
    linechange: function linechange(e) {
      //console.log(e.detail);
      var _e$detail = e.detail,
        height = _e$detail.height,
        lineCount = _e$detail.lineCount;
      // console.log(height,lineCount);
      if (lineCount === 1) {
        this.textareaHeight = 26;
      } else if (height <= 100) {
        this.textareaHeight = height - 2;
      }
    },
    showControl: function showControl(_ref2) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var index, msgContentDomInfo, isSelf, controlData, top, bottom, left, right, width, height;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                index = _ref2.index, msgContentDomInfo = _ref2.msgContentDomInfo;
                console.log('index', index, _this12.msgList, _this12.msgList[index]);
                isSelf = _this12.msgList[index].from_uid == _this12.current_uid;
                controlData = {
                  msg: _this12.msgList[index],
                  msgIndex: index,
                  isInTop: false
                }; // console.log('msgContentDomInfo', JSON.stringify(msgContentDomInfo));
                top = msgContentDomInfo.top, bottom = msgContentDomInfo.bottom, left = msgContentDomInfo.left, right = msgContentDomInfo.right, width = msgContentDomInfo.width, height = msgContentDomInfo.height;
                controlData.width = width;
                if (isSelf) {
                  controlData.right = width / 3 + 'px';
                  controlData.left = '';
                } else {
                  controlData.left = width / 3 + 'px';
                  controlData.right = '';
                }
                if (top < 60) {
                  controlData.top = bottom + 8 + 'px';
                } else {
                  controlData.top = top - 65 + 'px';
                }
                controlData.isInTop = top > 60;
                _this12.$refs['uni-im-control'].show(controlData);
                // console.log(index);
              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    clickMenu: function clickMenu(index, e) {
      // console.log('clickMenu-',index);
      if (index < 2) {
        this.chooseAndUploadFile(index === 0 ? 'image' : 'video');
      }
      if (index === 2) {
        this.chooseAndUploadFile('all');
      }
      e.stopPropagation();
    },
    clickEmojiItem: function clickEmojiItem(emojiUniCode, e) {
      this.chatText += emojiUniCode;
      e.stopPropagation();
    },
    tapUnreadCount: function tapUnreadCount() {
      //点击未读消息文字按钮事件
      if (this.isWidescreen) {
        // this.$emit('tapUnreadCount') //点击后会话列表自动滚动 置顶 待读项
        // console.log('tapUnreadCount');
      } else {
        uni.navigateBack();
      }
    },
    getkey: function getkey(id, index) {
      return index;
    }
  }, (0, _vuex.mapActions)({
    // 加载更多会话数据
    getConversation: 'uniIm/getConversation',
    clearUnreadCount: 'uniIm/clearUnreadCount',
    getMsgManager: 'uniIm/getMsgManager',
    loadConversation: 'uniIm/loadMoreConversation'
  })), (0, _vuex.mapMutations)({
    setCurrentConversationId: 'uniIm/setCurrentConversationId',
    updateConversation: 'uniIm/updateConversation',
    updateMsgManager: 'uniIm/updateMsgManager',
    addMsgManager: 'uniIm/addMsgManager'
  })),
  onNavigationBarButtonTap: function onNavigationBarButtonTap(e) {
    if (e.index === 0) {
      if (this.currentConversation.group_id) {
        uni.navigateTo({
          url: "/pages/uni-im/group/info?conversation_id=" + this.currentConversation.id
        });
      } else {
        // console.log(this.currentConversation,6565);
        uni.navigateTo({
          url: "/pages/uni-im/chat/info?user_id=" + this.currentConversation.friend_uid
        });
        // uni.showToast({
        // 	title: '仅群里可见，详细信息',
        // 	icon: 'none'
        // });
      }
    }
    // uni.navigateBack();
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 30)["default"]))

/***/ }),

/***/ 290:
/*!************************************************************************************************************************!*\
  !*** H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.nvue?vue&type=style&index=0&lang=css& */ 291);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 291:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 292:
/*!*************************************************************************************************************************************************!*\
  !*** H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=style&index=1&id=6019c341&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_1_id_6019c341_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./chat.nvue?vue&type=style&index=1&id=6019c341&lang=scss&scoped=true& */ 293);
/* harmony import */ var _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_1_id_6019c341_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_1_id_6019c341_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_1_id_6019c341_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_1_id_6019c341_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_software_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_software_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_software_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_software_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_chat_nvue_vue_type_style_index_1_id_6019c341_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 293:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!H:/private/AIproject/psychic/assistant-client-front-end/pages/im/chat/chat.nvue?vue&type=style&index=1&id=6019c341&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[282,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/im/chat/chat.js.map