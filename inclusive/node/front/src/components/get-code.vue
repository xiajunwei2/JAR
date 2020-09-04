<template>
  <div class="getcode-wrapper">
    <my-input :styles="{'padding':'10px 80px 10px 15px'}" class='form-item-input' v-model="verifyCode" placeholder="验证码" :max-length='6'  >
    </my-input>
   <span class="code-tip" :class="{'code-dis':codeTimer}" @click='handleGetCode'>{{codeTip}}</span>
  </div>
</template>

<script>
export default {
  props:['tel','reqType'],
  data(){
    return {
      verifyCode:'',
      codeTip:'获取验证码',
      codeTimer:null
    }
  },
  watch:{
    verifyCode(val){
      this.$emit('input',val)
    }
  },
  methods:{
    // 获取验证码
    handleGetCode(){
      if(!this.tel){
        this.$alert.success('请输入手机号');
        return;
      }
      if(this.codeTimer) return;
      this.$api.user.getCode({tel:this.tel,type:this.reqType})
      .then(res=>{
        if(res.err.code===500){
          this.$alert.error(res.err.message)
          return
        }
        if(res.err){
          this.codeTip = '重新获取';
          clearInterval(this.codeTimer);
          this.codeTimer = null;
          this.errorFun(res.err);
        }else{
          this.$alert.success('短信已发送，5分钟内有效。');
          this.startTimer();
        }
      }).catch(res=>{})
    },
    startTimer(){
      let time = 120;
      this.codeTip = `重新获取(${time}s)`
      this.codeTimer = setInterval(() => {
        this.codeTip = `重新获取(${time}s)`
        time--;
        if(time===0){
          this.codeTip = '重新获取'
          clearInterval(this.codeTimer);
          this.codeTimer = null;
          time = 120;
        }
      }, 1000);
    },
  },
  beforeDestroy(){
    clearInterval(this.codeTimer)
  }
}
</script>

<style lang='less' scoped>
  .getcode-wrapper{
    display:inline-block;
    position:relative;
    width:100%;
  }
  .code-tip {
    position: absolute;
    top: 12px;
    right: 8px;
    color: @redColor;
    cursor: pointer;
    &.code-dis{
      cursor: not-allowed;
      color:#999;
    }
}
</style>