import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/index'
// import animated from 'animate.css' // https://animate.style/
import qs from 'qs'
import lodash from 'lodash'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUi from 'element-ui'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import echarts from 'echarts'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'

Vue.use(VXETable)
VXETable.use(VXETablePluginElement)


// 导入请求http
import { http, datetimeformat } from '@/helper';

Vue.use(VXETable)
Vue.config.productionTip = false;

// Vue.use(animated);
Vue.use(ElementUi)
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment
Vue.prototype.$qs = qs
Vue.prototype.$store = store
Vue.prototype._ = lodash
Vue.prototype.$modal = VXETable.modal
// 添加axios
Vue.prototype.$http = http;
// 配置全局过滤器
Vue.filter('datetimeformat', datetimeformat);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//this.$moment(时间戳).format("YYYY-MM-DD HH:mm:ss")