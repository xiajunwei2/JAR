<!-- 
startTime:2019
author:zoujingqiang
endTime:2019
updateTime:2019
updateUser:zoujingqiang
updateEndTime:2019
-->
<template>
  <!-- 加载层 -->
  <div class="loading-mask" v-show="isShow">
    <i class="iconfont icon-loading"></i>
  </div>
</template>

<script>
export default {
  name:'pageLoading',
  props:{
    show:{
      type:Boolean,
      default:false
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

<style lang='less' scoped>
  .loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1111;
  width: 100%;
  text-align:center;
  margin-top: 100px;
  > i {
    font-size: 50px;
    animation: rotate 2s linear infinite;
    color:#ccc;
  }
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>