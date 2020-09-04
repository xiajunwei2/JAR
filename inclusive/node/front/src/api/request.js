import axios from 'axios'
import router from '@/router'
import { store } from '@/vuex/store';
import { getToken, setToken } from '@/utils/localStorage.js'
// 请求后台所有的urls
let baseurl = process.env.BASE_API;
// let baseurl = process.env.NODE_ENV == "development" ? location.origin : 'http://124.70.157.102:9008'
// 参数分解
export const joinParams = function (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('joinParams function must accept an object');
  } else {
    var params = []
    for (var v in obj) {
      let value = obj[v]
      if (typeof value === 'object') continue;
      if (value || value === 0) params.push('&' + v + "=" + encodeURIComponent(value))
    }
    return params.join('')
  }
}

// 所有网关
export let serviceMap = {
  // auth:'/phjr-manager-service',
  auth: '/inclusive',
  nauth: '/inclusive',//新网关
}
let currentPath = '' // 当前路由
// 路由拦截器
router.afterEach((to, from, next) => {
  currentPath = to.path;
})
export const _axios = axios
// http request拦截器
axios.interceptors.request.use(
  config => {
    let url = config.url
    if (typeof (url) == 'object') {
      url = url.url
    }
    let token = getToken()  // 设置token
    if (token) {
      config.headers.token = token;
      config.headers.Authorization = 'Bearer ' + token;
      // 刷新token
      setToken(token);
    }
    return config;
  }
)
// 超时时间
const TIMEOUT = process.env.TIMEOUT
// axios拦截器
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code > 400) {
      // token失效后重新请求刷新token
      if (response.data.code === 401) {
        // 如果是刷新token的接口报错401直接进入登录页面
        handleError()
        return Promise.reject(response)
      }
    }
    // 对响应数据做点什么
    return Promise.resolve(response)
  },
  error => {
    if (error.message && error.message.includes('timeout')) {
      alert('请求超时')
      return Promise.reject({
        response: {
          message: error.message
        }
      })
    }
    if (error.response) {
      // token失效后重新请求刷新token
      if (error.response.status === 401) {
        // 如果是刷新token的接口报错401直接进入登录页面
        // if(error.config.url.includes('refreshToken')){
        handleError()
        // return Promise.reject(error)
        // }
        // 如果当前路由不是login
        // if (router.currentRoute.name !== 'login') {
        // 那么去请求新 token并返回重新请求的接口
        // let res = doRequest(error,0)
        // return res
        // }
      }
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// 提供一个捕获异步后返回数据的方法
async function asyncCapture (asyncFn) {
  try {
    let data = await asyncFn()
    return { err: '', data: data }
  } catch (e) {
    return { err: e, data: '' }
  }
}
//accessToken过期，通过refreshToken 重置accessToken和refreshToken
function handleRefreshToken () {
  return new Promise((open, close) => {
    axios.get(baseurl + serviceMap.auth + '/auth/refreshToken').then(res => {
      if (res) {
        if (res.data.state) {
          open(res.data.data)
        } else {
          handleError()
          close('error')
        }
      } else {
        close('error')
      }
    })
  })
}
// 处理刷新token后重新获取接口数据，并返回到页面
async function doRequest (response, responseState) {
  const { err, data } = await asyncCapture(handleRefreshToken)
  if (err) {
    handleError()
    return false
  }
  let { accessToken, refreshToken, expire } = data
  setToken(accessToken, expire)
  let config = responseState > 0 ? response.config : response.response.config
  config.headers.token = accessToken
  const res = await axios.request(config)
  return res
}
//过滤失败（token未通过验证）直接进入登录页
function handleError () {
  store.dispatch('logout', false);
}
// 所有的url的headers
const myHeaders = {
  json: { 'Content-Type': 'application/json;charset=utf-8' },
  file: { 'Content-Type': 'multipart/form-data' }
}
const errorMsg = {
  falseError: '请求操作失败，请稍后重试；',
  dataError: '服务器连接出现异常，请检查网络，稍后重试；',
  httpError: '服务器连接出现异常，请稍后重试；'
}
const errorMsgEn = {
  falseError: 'The requestion is error, please try again later.',
  dataError: 'The server connection is abnormal, please check the network and try again later.',
  httpError: 'The server connection is abnormal, please try again later.'
}
function iszh () {
  return localStorage.getItem('lang') === 'zh'
}
export function getServiceName (s) {
  if (s) {
    return baseurl + serviceMap[s]
  } else {
    return baseurl
  }
}
export function handleStateFalse (data, tip = 'yes', current) {
  if (typeof data !== 'object' || current != router.currentRoute.path) return
}
export function handleCatchError (obj, tip = 'yes', current) {
  if (current != router.currentRoute.path) return
  obj = obj || {}
  let message = obj.data && obj.data.message || obj.message
  //根据后台返回数据提示
  let code = obj && obj.status
  let errorInfo
  // 服务器错误
  if (code >= 500) {
    if (message == 'GENERAL') {
      errorInfo = [(iszh() ? '服务器已停用，请联系管理员；' : 'The server is stoped,please inform administrator.')]
    }
    // 服务器连接失败
    else {
      errorInfo = [(iszh() ? errorMsg.httpError : errorMsgEn.httpError)]
    }
  }
  // 前端代码请求错误
  else {
    errorInfo = [(iszh() ? errorMsg.dataError : errorMsgEn.dataError)]
  }
  if (code) errorInfo.push('code：' + code)
}
let prevUrl = '', prevTime = 0
function handleForbidden (url, forbidden) {
  if (!forbidden) return true
  let nowTime = Date.now()
  let dTime = prevTime === 0 ? 9999 : (nowTime - prevTime)
  if (url === prevUrl && dTime <= 2000) {
    // console.log('forbidden')
    return false
  }
  prevUrl = url
  prevTime = nowTime
  return true
}
export const COM_SERVICE = {
  /**
   * @param {string,object} opt 为对象是所有配置内容，为字符串时标识URL
   * @param {string} s 网关名称，从serviceMap中得到
   * @param {string} method 请求方法，默认为get,可以为get,post,put,delete
   * @param {string} tip 出现报错时，是否自动提示
   * @param {boolean} forbidden 是否防止用户多次请求，默认为false
   * @description 没有请求主体的请求，get,post,delete都可以使用，只要参数在url上
   */
  get: function (opt, s = '', method = 'get', tip = 'no', forbidden = false) {
    if (!opt) throw new Error('get method of server.js is error')
    let url, service;
    if (typeof opt === 'object') {
      url = opt.url
      method = opt.method || 'get'
      service = getServiceName(opt.service)
      tip = opt.tip || 'yes'
      forbidden = opt.forbidden || false
    } else {
      url = opt
      service = getServiceName(s)
    }
    let currentP = currentPath
    let isClicked = handleForbidden(url, forbidden)
    if (isClicked === false) return Promise.reject('拒绝重复请求')
    return new Promise((open, close) => {
      axios({
        method: method,
        url: service + url,
        timeout: TIMEOUT
      }).then(res => {
        if (res.data.state) {
          open(res.data.data)
        } else {
          close(res.data)
          handleStateFalse(res.data, tip, currentP)
        }
      }).catch(err => {
        close(errorMsg.httpError)
        handleCatchError(err.response, tip, currentP)
      })
    })
  },
  /**
   * @param {string,object} opt 为对象是所有配置内容，为字符串时标识URL
   * @param {object} data 发送到后台的数据
   * @param {string} s 网关名称，从serviceMap中得到
   * @param {string} method 请求方法，默认为post,可以为post,put
   * @param {string} h 请求头，默认为json
   * @param {string} tip 出现报错时，是否自动提示
   * @param {function} upload 如果上传文件，传入上传文件的方法
   * @param {boolean} forbidden 是否防止用户多次请求，默认为false
   * @description 没有请求主体的请求，get,post,delete都可以使用，只要参数在url上
  */
  post: function (opt, data, s = '', method = 'post', h = 'json', tip = 'no', upload, forbidden = true) {
    if (!opt) throw new Error('post method of server.js is error')
    let url, uploadFun, headers, pdata, sss, serv;
    if (typeof opt === 'object') {
      url = opt.url
      method = opt.method || 'post'
      headers = 'file' == opt.header ? null : myHeaders.json
      pdata = 'file' == opt.header ? opt.data : JSON.stringify(opt.data)
      sss = getServiceName(opt.service)
      serv = opt.uploadfile ? ('/zuul' + sss) : sss
      tip = opt.tip || 'yes'
      uploadFun = opt.upload || function () { }
      forbidden = opt.forbidden || false
    } else {
      url = opt
      uploadFun = upload || function () { }
      headers = 'file' == h ? null : myHeaders.json
      pdata = 'file' == h ? data : JSON.stringify(data)
      sss = getServiceName(s)
      serv = tip == 'uploadFile' ? ('/zuul' + sss) : sss
    }
    let currentP = currentPath
    let isClicked = handleForbidden(url, forbidden)
    let time = 'file' === h ? 0 : TIMEOUT
    if (isClicked === false) return Promise.reject('拒绝重复请求')
    return new Promise((open, close) => {
      axios({
        method: method,
        url: serv + url,
        data: pdata,
        headers: headers,
        onUploadProgress: uploadFun,
        timeout: time
      }).then(res => {
        if (res.data.state) {
          open(res.data.data)
        } else if (res.data.code == 0) {
          open(res.data)
        } else {
          close(res.data)
          handleStateFalse(res.data, tip, currentP)
        }
      }).catch(err => {
        close(err.response)
        handleCatchError(err.response, tip, currentP)
      })
    })
  }
}
