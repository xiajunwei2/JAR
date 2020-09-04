/** 
 * @param {Object}  binding = {trigger//拖动的元素，body//设置样式的元素,recover//是否更新的时候恢复到原来的位置}
 * @description 拖动--主要适用于遮罩层
*/
import { on } from '../functions'
import loadingImg from '@/assets/images/place/240-240.png'
import defaultAvatar from '@/assets/images/avatar.png'
export default {
  name:'imgerr',
  inserted: (el, binding, vnode) => {
    let isAva = binding.arg==='avatar' //是否是头像的报错
    el.alt = isAva?'头像':'封面'
    let value = binding.value
    let defaultCover = ''
    // 如果是个对象的话,表明来自于异步等待加载
    if(Object.prototype.toString.call(value)==='[object Object]'){
      defaultCover = value.cover || (isAva?defaultAvatar:loadingImg)
      el.src = defaultCover
      let image = new Image()
      image.src = value.src
      image.onload = function(){
        el.src = value.src
      }
    }else{
      defaultCover = value || (isAva?defaultAvatar:loadingImg)
    }
    on(el,'error',function handleError(e){
      el.src = defaultCover
    })
  }
}
