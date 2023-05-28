import Vue from 'vue'
import App from './App'
import store from './store'
import mallPlugin from './js_sdk/mall/plugin'
Vue.config.productionTip = false

Vue.use(mallPlugin);

import mixin from '@/common/mixin/mixin.js'
Vue.mixin(mixin)

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    store,
	...App
})
app.$mount()
