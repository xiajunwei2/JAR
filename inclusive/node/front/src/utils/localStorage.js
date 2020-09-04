export const TOKAN_NAME = 'ph_token'
export const REF_TOKEN = 'ref_token'

export function setLocalStorage(key,value,expires=600000) {
  var curtime = Date.now(); // 获取当前时间 ，转换成JSON字符串序列 
  var valueDate = JSON.stringify({
    val: value,
    timer: curtime,
    exp:expires
  });
  try {
    localStorage.setItem(key, valueDate);
  } catch(e) {
    // 兼容性写法
    if(isQuotaExceeded(e)) {
      console.log("Error: 本地存储超过限制");
      localStorage.clear();
    } else {
      console.log("Error: 保存到本地存储失败");
    }
  }
}

function isQuotaExceeded(e) {
  var quotaExceeded = false;
  if(e) {
    if(e.code) {
      switch(e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014: // Firefox 
          if(e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
              quotaExceeded = true;
          }
          break;
      }
    } else if(e.number === -2147024882) { // IE8 
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}

export function getLocalStorage(key) {
  let value = localStorage.getItem(key)
  if(value) {
    var dataObj = JSON.parse(value); // 将字符串转换成JSON对象
    // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间 
    if(dataObj.exp){
      var isTimed = (Date.now() - dataObj.timer) > dataObj.exp;
      if(isTimed) {
        localStorage.removeItem(key);
        return null;
      }
    }
    return dataObj.val;
  } else {
    return null;
  }
}

// 获取token
export const getToken=function(){
  return getLocalStorage(TOKAN_NAME)
}

// 设置token
export const setToken=function(token,expires){
  setLocalStorage(TOKAN_NAME,token,expires)
}

// 删除token
export const removeToken = function(){
  localStorage.removeItem(TOKAN_NAME)
}


// 获取token
export const getRefToken=function(){
  return getLocalStorage(REF_TOKEN)
}

// 设置token
export const setRefToken=function(token,expires){
  setLocalStorage(REF_TOKEN,token,expires)
}

// 删除token
export const removeRefToken = function(){
  localStorage.removeItem(REF_TOKEN)
}

//清空token
export const clearAll = function(){
  localStorage.clear();
}