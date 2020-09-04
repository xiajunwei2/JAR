/**
 * Created by lifan on 2020/08/10.
 */
import axios from "axios"
import store from '@/vuex'
const qs = require('qs')
import { Message } from 'element-ui'
import router from '../router'

// 请求拦截
axios.interceptors.request.use(config => {
    let loginuserInfor = JSON.parse(sessionStorage.getItem("loginuserInfor"))
    let TokenStaute = JSON.parse(sessionStorage.getItem("login"))
    if (!store.state.token) {
        router.push('/Login')
    }
    if (TokenStaute) {
        config.headers.Authorization = 'Bearer ' + store.state.token
        config.headers["Content-Type"] = 'application/json;charset=utf-8'
    }
    if (TokenStaute && loginuserInfor) {
        config.headers.Authorization = 'Bearer ' + store.state.token
        config.headers["Content-Type"] = 'application/json;charset=utf-8'
        config.headers["userName"] = sessionStorage.getItem("userInfor") ? JSON.parse(sessionStorage.getItem("userInfor")).userName :''
    }
    return config
})
//基本请求地址
axios.defaults.baseURL = process.env.NODE_ENV == "development" ? location.origin : process.env.VUE_APP_PROXY_URL,//'http://124.70.157.102:9008'
// 响应拦截器
axios.interceptors.response.use(
    (res) => {
        if (res.data.code === 401 || res.data.code === 408) {
            sessionStorage.setItem("login", false);
            router.push({path:'/Login'});
            return Promise.reject(res);
        }
        if (!store.state.token) {
            // window.location.href = "#/Login"
        }
        return Promise.resolve(res);
    },
    error => {
        if (error.response && error.response.status === 401) {
            Message({
                showClose: true,
                message: '未认证操作，请联系管理员！',
                type: 'error',
                duration: 2000
            })
        }
        if (error.response && error.response.status === 404) {
            Message({
                showClose: true,
                message: '找不到资源，请重试！！',
                type: 'error',
                duration: 2000
            })
        }
        if (error.response && error.response.status === 500) {
            Message({
                showClose: true,
                message: '服务器出错啦...',
                type: 'error',
                duration: 2000
            })
        }
        return Promise.reject(error)
    }
);
//通用方法
export const POST = async (url, params) => {
    const res = await axios.post(`${url}`, params);
    return res.data;
};

export const GET = async (url, params) => {
    const res = await axios.get(`${url}`, {
        params: params,
        paramsSerializer: params_2 => {
            return qs.stringify(params_2, {
                indices: false
            });
        }
    });
    return res ? res.data : res;

};

export const PUT = async (url, params) => {
    const res = await axios.put(`${url}`, params);
    return res.data;
};

export const PUT_JSON = async (url, params) => {
    const res = await axios.put(`${url}`, params);
    return res.data;
};

export const DELETE = async (url, params) => {
    const res = await axios.delete(`${url}`, params);
    return res.data;
};

export const PATCH = async (url, params) => {
    const res = await axios.patch(`${url}`, params);
    return res.data;
};
