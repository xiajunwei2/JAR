// 引入全局请求方法
import {joinParams,COM_SERVICE} from './request'
const {get,post} = COM_SERVICE
export const NAME = 'select'

//--------------------------获取企业信息>
/**
 * 获取订单
 */
export const getSelects = async function(tag){
  let urls = {
    'capital':'/customer/list',
    'loanType':'/loanType/list',
    'repay':'/enum/repayment/type',
    'source':'/enum/repayment/source',
    'guarantee':'/enum/guarantee/type',
    'usage':'/enum/loan/usage',
    'industry':'/codeInfo/list/byPCode?pCode=COMPANY_INDUSTRY',
    'nature':'/codeInfo/list/byPCode?pCode=COMPANY_NATURE',
    'busTime':'/codeInfo/list/byPCode?pCode=COMPANY_BUS_TIME'
  }
  let data = {},err = '';
  try{
    data = await get(urls[tag],'auth')
  }catch(e){
    err = e
  }
  return {err:err,data:data}
}
