import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/index'
import animated from 'animate.css' // https://animate.style/
import qs from 'qs'
import lodash from 'lodash'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css';
import "./utils/Elementui_components_use";
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import {
  http,
  datetimeformat
} from '@/helper';

Vue.use(VXETable)
Vue.config.productionTip = false;

Vue.use(animated);

Vue.prototype.$http = http
Vue.prototype.$moment = moment
Vue.prototype.$qs = qs
Vue.prototype._ = lodash
Vue.prototype.$modal = VXETable.modal
Vue.filter('datetimeformat', datetimeformat);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
