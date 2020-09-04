function handleAutoCreate(ctx){
  return ctx.keys().reduce((pre,item)=>{
    let config = ctx(item)
    let dft = config.default || config
    if(!dft.name) {
      throw new ReferenceError(`[${item}] component is lack of name prop,please check it.`)
    }
    pre[dft.name] = dft
    return pre
  },{})
}
// **************引入组件（所有组件）************
// import Loading from '@/globals/Loading.vue'; // 全局加载
// import Modal from '@/globals/Modal.vue'; // 全局模态框
// import Button from '@/globals/Button.vue'; // 全局按钮
// import Input from '@/globals/Input.vue'; // 全局input框
const GLOBALS = require.context('../globals',false,/\.vue$/)
const CMPTS = handleAutoCreate(GLOBALS)

// *************引入自定义指令*********
// import clipboard from './directives/clipboard'
// import draggable from './directives/draggable'
// import focus from './directives/focus'
const DIRECTS = require.context('./directives',false,/.js$/)
const DIRS = handleAutoCreate(DIRECTS)
// **************引入自定义方法并导出********
import {myFuns,on,off} from './functions.js';

import listener from './listener';

// **************vue安装器***********
const install = function(Vue,opt={}){
  // 如果安装了，就无需安装
  if (install.installed) return;
  // ======设置所有vue全局方法========
    Vue.prototype.$fun = myFuns
    Vue.prototype.$onet = on
    Vue.prototype.$offet = off
    Vue.prototype.$listener = listener

  // =======设置所有指令==========
    for(let d in DIRS){
      Vue.directive(d,DIRS[d])
    }
  // ====设置所有组件=======
    Object.keys(CMPTS).forEach(item=>{
      Vue.component(CMPTS[item].name,CMPTS[item])
    })
}
// ************自动安装vue**************
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
// ***********最终导出的对象
const finalExports = {
  ...CMPTS,//导出所有组件
  ...myFuns,//导出所有对外方法
  install:install,//导出vue方法
}
export default finalExports