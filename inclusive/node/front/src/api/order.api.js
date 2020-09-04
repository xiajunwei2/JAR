// 引入全局请求方法
import { joinParams, COM_SERVICE } from './request'
const { get, post } = COM_SERVICE
export const NAME = 'order'

//--------------------------获取企业信息>
/**
 * 获取订单
 */
export const getOutOrder = async function (params) {
  let data = {}, err = '';
  try {
    data = await get('/out/order/page?' + joinParams(params), 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}
/**
 * 获取订单
 */
export const getOrder = async function (params) {
  let data = {}, err = '';
  try {
    data = await get('/order/page?' + joinParams(params), 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}
// 获取状态
export const getStatus = async function (params) {
  let data = {}, err = '';
  try {
    data = await get('/order/status', 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

// 申请贷款
export const orderApply = async function (params) {
  let data = {}, err = '';
  try {
    data = await post('/order/apply', params, 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

// 匹配信息
export const getMatch = async function (id) {
  let data = {}, err = '';
  try {
    data = await get('/product/get/match/' + id, 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

// 选择方案
export const selectCase = async function (orderId, productId) {
  let data = {}, err = '';
  try {
    data = await get('/order/product/select/' + orderId + '/' + productId, 'auth', 'put')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

// 获取订单
export const getOrderById = async function (id) {
  let data = {}, err = '';
  try {
    data = await get('/order/get/' + id, 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}
// 获取统计数据
export const getCount = async function () {
  let data = {}, err = '';
  try {
    data = await post('/operation/getHomePageStatistic',{},'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}


