<template>
  <transition name='maskFade'>
    <div class='mask-layer-box' v-show='show'>
      <transition name='maskLayer'>
        <div v-show='show' :id='maskBoxId' class="mask-box demo-mask-box" :style='{width:boxWidth,height:boxHeight}'>
            <p :id='maskMoveId' class='mask-title demo-mask-move' v-drag='dragbinding'>
                <span class='name'>{{titleName}}<span class='subname'>{{subtitle}}</span></span>
                <span title='关闭' class='close' @click='handleSubmit(false)'>
                    <i class='iconfont icon-guanbi'></i>
                </span>
            </p>
            <div :class='{"mask-content":true,"foot-height":footerShow}'>
              <slot name='content'></slot>
            </div>
            <div class='mask-operate' v-if='footerShow'>
              <slot name='footer'></slot>
            </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
var increse = 1
export default {
  name:'maskLayer',
  props:{
    show:{
      type:Boolean,
      required:true
    },
    'title-name':{
      type:String,
      default:'提示'
    },
    subtitle:{
      type:String
    },
    'box-width':{
      default:'600px'
    },
    'box-height':{
      default:'420px'
    },
    'footer-show':{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      maskBoxId:1,
      maskMoveId:2,
      dragbinding:{}
    };
  },
  methods: {
    // 出来关闭事件
    handleSubmit(bool){
      this.$emit('close',bool)
    },
    //随机生成两位数
    random(){
      return Math.ceil(Math.random()*100)
    }
  },
  created(){
    this.maskBoxId = 'mask_box_'+increse+this.random()
    this.maskMoveId = 'mask_move_'+increse+this.random()
    increse++;
    this.dragbinding = {
      trigger:'#'+this.maskMoveId,
      body:"#"+this.maskBoxId,
      update:true
    }
  },
}
</script>

<style lang='less' scoped>
.maskFade-leave-to{
  opacity: 0;
}
.maskFade-leave-active{
  transition: all .5s ease-in-out;
}
.maskLayer-enter{
  transform: translateY(-50%);
}
.maskLayer-leave-to{
  transform: rotateY(90deg);
}
.maskLayer-enter-active,
.maskLayer-leave-active{
  transition: all .3s ease-in-out;
}
 // mask遮罩层
  .mask-layer-box{
      position:fixed;
      z-index:2222;
      top:0;left:0;
      width:100%;
      height:100%;
      overflow: auto;
      background:rgba(29,32,40,.4);
      display: flex;
      justify-content: center;
      align-items: center;
      .mask-box{
        border-radius: @border-radius-base;
        background:#fff;
        position: absolute;
        max-height: 100%;
      }
  }
  // *************遮罩层title的样式
  .mask-title{
    border-radius: @border-radius-base;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding:15px;
    background:#fff;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    .name{
      color:#000;
      font-size:1.6rem;
    }
    .close{
      height:20px;
      line-height: 8px;
      width: 20px;
      text-align: center;
      float:right;
      cursor: pointer;
      i{
        color:#333;
      }
      &:hover{
        background: rgba(255,255,255,.15);
      }
    }
  }
  .mask-content {
    position: relative;
    overflow: auto;
    height:calc(100% - 47px);
    &.foot-height{
      height:calc(100% - 153px);
    }
    .padding{
      padding:20px 105px 40px;
    }
  }
  .min-content{
    padding:20px 30px 0;
    height: 470px;
    overflow: auto;
  }
  .mask-operate{
    background: #fff;
    position: absolute;
    bottom:0;left:0;
    width:100%;
    text-align: center;
    padding:20px 0;
  }
</style>