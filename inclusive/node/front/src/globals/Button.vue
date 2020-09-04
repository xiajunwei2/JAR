<template>
  <div :class="{
    'jq-btn':true,
    'btn-loading':loadingShow,
    'btn-small':size==='small',
    'btn-disabled':disabled
    }" @click='buttonClick'>
     <i v-if='loadingShow' class="i-loading iconfont icon-loading"></i>
     <span v-if='!loadingShow' >
       <!-- <span v-if="loading && size!='small'">{{loadingMsg || $t('button.loadingmsg')}}</span> -->
       <slot></slot>
     </span>
  </div>
</template>

<script>
export default {
  name:'Button',
  props:{
    'loading':{
      type:Boolean,
      default:false
    },
    'duration':{
      type:Number,
      default:2
    },
    'size':{
      type:String,
      default:'middle'
    },
    // 'loading-msg':String,
    'disabled':{
      type:Boolean,
      default:false
    },
    'is-timeout':{
      type:Boolean,
      default:true
    }
  },
  watch:{
    loading:{
      handler:function(n,o){
        if(!n){
          clearTimeout(this.clickTimer)
          this.clicked = false
          clearTimeout(this.loadingTimer)
          this.loadingShow = false
        }else{
          this.loadingTimer =setTimeout(() => {
            this.loadingShow = true
          }, 1000);
        }
      }
    }
  },
  data () {
    return {
      clicked:false,
      clickTimer:null,
      loadingShow:false,
      loadingTimer:null
    };
  },
  methods: {
     buttonClick(e){
      if(this.clicked || this.disabled) return
      this.$emit('on-click',e)
      if(this.isTimeout){
        this.clicked = true
        this.clickTimer = setTimeout(()=>{
          this.clicked = false
        },this.duration*1000)
      }
     }
  }
}
</script>

<style lang='less' scoped>
  .jq-btn{
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    min-width: 70px;
    line-height: normal;
    font-size:14px;
  }
  .i-loading{
    position:relative;
    font-size: 1.6rem;
  }
  .jq-btn.btn-loading{
    pointer-events: none;
    opacity: .8;
    .i-loading{
      animation: loading 1s linear infinite;
    }
  }
  .jq-btn.btn-small{
    padding:8px 12px;
  }
  .jq-btn.btn-disabled,
  .jq-btn.btn-disabled:hover,
  .jq-btn.btn-disabled:active{
    cursor: not-allowed;
    background: lighten(@redColor,16%);
  }
.jq-btn-grey.btn-dis.jq-btn.btn-disabled{
  cursor: not-allowed;
  background-color: gray;
}
  @keyframes loading {
    0%{transform: rotate(0);}
    100%{transform: rotate(360deg);}
  }
</style>