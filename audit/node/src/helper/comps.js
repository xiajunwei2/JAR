import Vue from 'vue'
// 通过正则获取所有组件
let requireComponents = require.context('../components/',false,/\w+\.vue$/);

requireComponents.keys().map(component=>{
    // 注册全局组件
    if(requireComponents(component).default && requireComponents(component).default.name){
        Vue.component(requireComponents(component).default.name,requireComponents(component).default||requireComponents(component));
    }
});
