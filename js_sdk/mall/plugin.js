import { initUtil } from './util.js'
import {
	initRequest
} from './request.js'
import {
	initInterceptor
} from './interceptor.js'
//#ifdef H5
import {
	initImplemented
} from '../implemented/h5.js'
//#endif
import {
	initPermission
} from './permission.js'

export default {
	install(Vue) {
		initUtil(Vue)
		initRequest(Vue)
		initInterceptor(Vue)
		initPermission(Vue)
		//#ifdef H5
		initImplemented()
		//#endif
	}
}
