export default {
  // 监听者模式
  callback:{},
  on:function(name,fn){
    this.callback[name] = fn
  },
  once:function(name,fn){
    this.callback[name] = {
      callback:fn
    }
  },
  off:function(name){
    delete this.callback[name]
  },
  emit:function(name,...args){
    let fn = this.callback[name]
    if(!fn) throw new ReferenceError('callback is undefined')
    if(typeof fn === 'function'){
      fn(...args)
    }else{
      fn.callback(...args)
      this.off(name)
    }
  }
}