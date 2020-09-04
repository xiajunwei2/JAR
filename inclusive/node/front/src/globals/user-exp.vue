<!-- 
 用户体验，喊加载和未查询到数据
-->
<template>
  <div :class="['user-exp-box',size]" v-show='showState<3'>
    <!-- 加载 -->
    <div v-show='showState===1'>
        <div class='content'>
            <p class='spin-icon-load'>
                <i class='circle red'></i>
                <i class='circle green'></i>
                <i class='circle blue'></i>
            </p>
            <p class='spin-icon-text'>Loading...</p>
            <slot></slot>
        </div>
      </div>
      <!-- 没有数据 -->
      <div v-show='showState===2'>
        <img src="@/assets/images/nulldata.png" alt="" v-if="showImg">
        <span class='msg'>{{msg}}</span>
        <slot></slot>
      </div>
      
  </div>
</template>

<script>
export default {
  name:'userExp',
  props:{
    state:{
      default:1
    },
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
    state:{
      handler:function(state){
        if(state<3){
          this.timer = setTimeout(() => {
            this.showState = state
          }, 500);
        }else{
          clearTimeout(this.timer)
          this.showState = state
        }
      },
      immediate:true
    }
  },
  data(){
    return {
      showState:false,
      timer:null
    }
  }
}
</script>
<style lang="less" scoped>
// **********数据为空时的图片展示
.user-exp-box{
  position:absolute;
  top:10%;left:50%;
  transform: translatex(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color:#333;
  font-size:1.6rem;
  img{
    display: block;
    width:225px;
  }
  &.small{
    text-align:center;
    img{
      width:140px;
    }
  }
}
.msg{
  color:#9aaecb;
  margin-top:6px;
}
.spin-icon-load{
    width:40px;
    height:40px;
    margin:auto;
    animation: spin 1s linear infinite;
    position: relative;
    transform-origin: center center;
    /* border:1px solid red; */
}
.spin-icon-text{
    color:#9aaecb;
    margin-top:15px;
}
.content{
  background:#fff;
  padding:30px 40px;
  border-radius: 5px;
}
.circle{
    position:absolute;
    top:0;left:14px;
    width:12px;
    height:12px;
    border-radius: 50%;
    transform-origin: 6px 22px;
}
.red{
  background:@orangeColor;
  transform:rotate(120deg);
}
.green{
  background:#36d497;
  transform:rotate(-120deg);
}
.blue{
  background:#0d59e5;
}
@keyframes spin{
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
