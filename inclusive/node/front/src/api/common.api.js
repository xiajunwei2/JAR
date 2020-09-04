// 引入全局请求方法
import {joinParams,COM_SERVICE} from './request'
const {get,post} = COM_SERVICE
export const NAME = 'common'

//--------------------------获取企业信息>
/**
 * 获取企业信息
 */
export const getBuss = async function(){
  let data = {},err = '';
  try{
    data = await get('/customer/get/user','auth')
  }catch(e){
    err = e
  }
  return {err:err,data:data}
}
/**
 * 获取企业信息
 */
export const updateBuss = async function(params){
  let data = {},err = '';
  try{
    data = await post('/customer/update/user',params,'auth','put')
  }catch(e){
    err = e
  }
  return {err:err,data:data}
}

export const getLoanType = async function(){
  let data = {},err = '';
  try{
    data = await get('/loanType/list','auth')
  }catch(e){
    err = e
  }
  return {err:err,data:data}
}
/**
 * 新首页获取滚动数据
 */
export const getBankData = async function(){
  let data = {},err = '';
  try{
    data = await post('/loanInfo/getLoanInfo',[],'auth')
  }catch(e){
    err = e
  }
  return data;
}
