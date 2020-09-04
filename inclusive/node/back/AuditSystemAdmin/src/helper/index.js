// import axios from 'axios';
// import store from '@/vuex'
// import { Message, Loading } from 'element-ui'
// // 配置axios基本信息
// let instance = axios.create({
//     baseURL: process.env.NODE_ENV == "development" ? location.origin : process.env.VUE_APP_PROXY_URL,
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//     }
// });
// // 拦截axios输出
// instance.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     Loading.service();
//     Message.warning({
//         message: '网络异常，请联系管理员',
//         type: 'warning',
//         offset: 200
//     });
//     return Promise.reject(error);
// });
// // 配置token;
// let config = {
//     headers: { 'Authorization': store.state.token ? 'Bearer ' + store.state.token : '' },
// }
// /**
//  * 封装请求，
//  */
// export const http = {
//     get: async function (url, configure) {
//         if (configure) {
//             config.headers = Object.assign(config.headers, configure);
//         }
//         let res = await instance.get(url, config);
//         if (res.status == 200) {
//             return Promise.resolve(res.data);
//         } else {
//             return Promise.reject(res.data);
//         }
//     },
//     post: async function (url, params, configure) {
//         if (configure) {
//             config.headers = Object.assign(config.headers, configure);
//         }
//         let res = await instance.post(url, params, config);
//         if (res.status == 200) {
//             return Promise.resolve(res.data);
//         } else {
//             return Promise.reject(res.data);
//         }
//     }
// }
/**
 * 日期格式化工具
 * @param {有效的时间戳} date 
 * @param {格式化字符串} format 
 */
export const datetimeformat = function (date, format = 'YYYY-MM-dd HH:mm:ss') {
    date = new Date(date * 1000);
    if (date == 'Invalid Date') {
        return '';
    }

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? month : '0'.concat(month);
    let day = date.getDate();
    day = day >= 10 ? day : '0'.concat(day);
    let hour = date.getHours();
    hour = hour >= 10 ? hour : '0'.concat(hour);
    let minute = date.getMinutes();
    minute = minute >= 10 ? minute : '0'.concat(minute);
    let seconds = date.getSeconds();
    seconds = seconds >= 10 ? seconds : '0'.concat(seconds);
    let regFormat = /[Y]{4}|[M]{2}|[d]{2}|[H]{2}|[m]{2}|[s]{2}/g;
    let res;
    while ((res = regFormat.exec(format)) != null) {
        if (res[0] == 'YYYY') {
            format = format.replace(res[0], year);
        }
        if (res[0] == 'MM') {
            format = format.replace(res[0], month);
        }
        if (res[0] == 'dd') {
            format = format.replace(res[0], day);
        }
        if (res[0] == 'HH') {
            format = format.replace(res[0], hour);
        }
        if (res[0] == 'mm') {
            format = format.replace(res[0], minute);
        }
        if (res[0] == 'ss') {
            format = format.replace(res[0], seconds);
        }
    }
    return format;
}