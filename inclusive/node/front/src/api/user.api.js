// 引入全局请求方法
import { joinParams, COM_SERVICE, getServiceName, _axios } from './request'
const { get, post } = COM_SERVICE
export const NAME = 'user'
//登录
export const login = async function (params) {
  let data = {}, err = '';
  try {
    data = await post('/sysLogin/login', params, 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

/**
 * 获取验证码
 * @param {Object} form {phone,type:reset重置,change修改手机}
 */
export const getCode = async function (form) {
  let data = {}, err = '';
  // console.log(form)
  //let formdata = new FormData();
  //formdata.append('tel',form.tel);
  let reqType = form.type;
  try {
    //data = await post('/out/sms/send/'+reqType,formdata,'auth','post','file')
    data = await post('/sysSms/sendSmsInfo', form, 'nauth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}
/**
 * 获取图片验证码
 */
export const getImageCode = async function () {
  let data = {}, err = '';
  try {
    data = await post('/sysLogin/generatorImgCode', '', 'nauth', 'post', 'file')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}
//重置密码验证验证码
/**
 *
 * @param {*} params {"code":params.code,"type":"reset",'phone':params.phone}
 */
export const validCode = async function (params) {
  let data = {}, err = '';
  try {
    data = await post('/auth/check-code', params)
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

//修改密码
export const updatePwd = async function (params) {
  let data = {}, err = '';
  try {
    //data = await post('/authUser/pwd/update', params, 'auth', 'put')
    data = await post('/sysUser/ownResetPassword', params, 'nauth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}
//重置密码
export const resetPwd = async function (params) {
  debugger
  let data = {}, err = '';
  try {
    //data = await post('/out/user/pwd/reset',params,'auth','put')
    data = await post('/sysUser/forgetPassword', params, 'nauth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

//取消微信或者qq的绑定
export const unbinding = async function (type) {
  let data = {}, err = '';
  try {
    data = await post('/unbinding', { login_type: type })
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}
/**
 * 微信或者qq的绑定
 * @param {Object} params {
	"code":"910676",
	"phone":"13122912477",
	"login_type":1,
	"unique_id": "unique_id1"
}
 */
export const bindPhone = async function (params) {
  let data = {}, err = '';
  try {
    data = await post('/binding-by-phone', params)
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

//退出
export const logout = async function () {
  let data = {}, err = '';
  try {
    data = await get('/auth/logout', 'auth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

//获取个人信息
export const getMe = async function () {
  let data = {}, err = '';
  try {
    // data = await get('/auth/resources','auth')
    data = await post('/sysUser/getLoginUser', '', 'auth', 'post', 'file')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

//更新个人信息
export const updateMe = async function (params) {
  let data = {}, err = '';
  try {
    data = await post('/auth/me', params, '', 'put')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}

//注册
export const registe = async function (params) {
  let data = {}, err = '';
  try {
    data = await post('/sysUser/register', params, 'nauth')
  } catch (e) {
    err = e
  }
  return { err: err, data: data }
}


