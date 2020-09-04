// alert.js
import Vue from 'vue';

// 具体的组件
import Alert from './Alert.vue';
Alert.newInstance = properties => {
    const props = properties || {};
	// 实例化一个组件，然后挂载到body上
    const Instance = new Vue({
        data: props,
        render:function(h){
            return h(Alert, {
                props: props
            });
        }
    });
    // 挂载到body上
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
	// 通过闭包维护alert组件的引用
    const alert = Instance.$children[0];
    return {
        // Alert组件对外暴露的两个方法
        show :function(noticeProps) {
            alert.add(noticeProps);
        },
        success :function(){
            alert.success(...arguments)
        },
        error :function(){
            alert.error(...arguments)
        },
        warning :function(){
            alert.warning(...arguments)
        },
        close (name) {
            alert.remove(name);
        }
    }
};

// 提示单例
let messageInstance;
// 获取单例
function getAlertInstance () {
    messageInstance = messageInstance || Alert.newInstance();
    return messageInstance;
}
// 组件提供的方法
function show() {
    // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
    let instance = getAlertInstance();
    instance.show(...arguments);
}
function close(){
    let instance = getAlertInstance();
    instance.close(...arguments);
}
function success(c,d){
    let instance = getAlertInstance();
    instance.success(...arguments);
}
function error(c,d){
    let instance = getAlertInstance();
    instance.error(...arguments);
}
function warning(c,d){
    let instance = getAlertInstance();
    instance.warning(...arguments);
}
// 将方法挂载到vue原型对象上，直接通过this调用
Vue.prototype.$alert = {
    show,
    close,
    success,
    error,
    warning
}
// 对外暴露的方法
export default {
    show,
    close,
    success,
    error,
    warning
}
