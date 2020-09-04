import Vue from 'vue'; //引入vue
import App from './App'; // 引入APP组件
import router from './router'; //引入路由
import i18n from './locale';// 引入国际化
import {store} from './vuex/store';
import moment from 'moment';

// 跳转到首页
window.gotoHome = function(method='push'){
  router[method]({name:process.env.HOME})
}
document.title = process.env.TITLE;//配置标题

// 引入懒加载--start
import VueLazyload from 'vue-lazyload';
//src下的assets目录下的图片
Vue.use(VueLazyload,{
	error:require('./assets/images/jq/error.jpg'),
	loading:require('./assets/images/jq/loading.jpg')
})
// 引入懒加载--end

// 引入iview--start
import ViewUI from 'view-design';
// import {Select,Option,DatePicker,Table,Checkbox,Spin} from 'view-design';
import 'view-design/dist/styles/iview.css';
// Vue.component('Select',Select);
// Vue.component('Option',Option);
// Vue.component('DatePicker',DatePicker);
// Vue.component('Table',Table);
// Vue.component('Checkbox',Checkbox);
// Vue.component('Spin',Spin);
Vue.use(ViewUI);
// 引入iview--end

// 解决ie9以上的兼容性问题--start
  import "babel-polyfill";
  //
  if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
  if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;
 // 解决ie9以上的兼容性问题--end

import '@/assets/fonts/iconfont.css'; //引入icon字体图标

Vue.config.productionTip = false;// 定义全局变量

// 引入所有的http请求--start
import * as api from '@/api';
Vue.prototype.$api = api.default;
// 引入所有的http请求--end
// 添加时间处理工具
Vue.prototype.$moment = moment;

// 引入插件(包括方法，服务，过滤器，指令等)--start
import Plugin from './utils';
Vue.use(Plugin);
// 引入插件(包括方法，服务，过滤器，指令等)--end

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)


import '@/vueInstance/alert/alert'; //引入alert实例
import '@/vueInstance/modal/modal'; //引入alert实例

// 引入全局公共样式--start
require('!style-loader!css-loader!less-loader!./assets/less/main.less');
require('!style-loader!css-loader!less-loader!./assets/less/plugin.less');
/* eslint-disable no-new */
// 引入全局公共样式--end

// 创建vue实例--start
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>',
})
// 创建vue实例--end

// 路由拦截--start
import {getToken} from './utils/localStorage'

router.beforeEach((to, from, next) => {
  // document.title = '跳转中...';
  if(to.meta.needAuth && !getToken()){
    store.state.user.userInfo = '';
    store.state.user.loginState = false;
    next({name:'nlogin'});
  }else{
    next();
  }
})

router.afterEach((to, from, next) => {
  document.title = to.meta.title + ' | ' + process.env.TITLE;
});
// 路由拦截--end
