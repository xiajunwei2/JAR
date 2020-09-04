<!-- 
 startTime:2018-10-23
 author:zoujingqiang
 endTime:
-->
<template>
  <div :class="['null-data',size]" v-show='isShow'>
      <img src="@/assets/images/nulldata.png" alt="" v-if="showImg">
      <span class='msg' v-html="msg"></span>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:'nullData',
  props:{
    show:Boolean,
    msg:{
      type:String,
      default:'暂无数据'
    },
    size:{
      type:String,
      default:'small'
    },
    showImg:{
      type:Boolean,
      default:true
    }
  },
  watch:{
    show:{
      handler:function(bool){
        if(bool){
          this.timer = setTimeout(() => {
            this.isShow = true
          }, 500);
        }else{
          clearTimeout(this.timer)
          this.isShow = false
        }
      },
      immediate:true
    }
  },
  data(){
    return {
      isShow:false,
      timer:null
    }
  }
}
</script>
<style lang="less" scoped>
.msg{
  color:#BFBFBF;
  margin-top:6px;
  font-size:18px;
}
</style>
