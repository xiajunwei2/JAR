<template>
  <div class="forget-wrapper text-center">
    <p class='title'>找回密码</p>
    <div class="form-container">
      <div class='form-box'>
        <div class="form-item">
          <span class='form-item-label required'>手机号码</span>
          <my-input class='form-item-input' v-model="formInfo.account" placeholder="请输入手机号码" :max-length='11'  >
          </my-input>
        </div>
        <div class="form-item">
          <span  class='form-item-label required'>验证码</span>
          <get-code v-model='formInfo.verifyCode' :tel='formInfo.account' req-type='change/pwd'></get-code>
        </div>
        <div class="form-item">
          <span class='form-item-label required'>密码</span>
          <my-input class='form-item-input' v-model="formInfo.newPwd" placeholder="不少于6位数的字母组合" type='password' >
          </my-input>
        </div>
        <div class="form-item" style='font-size:12px;justify-content:center;'>
          如一直未收到验证码请致电客服：023-6173 8886
        </div>
      </div>
    <div>
      <Button style='width:326px;' class='jq-btn-red' @on-click="handleSubmit">提交</Button>
    </div>
    </div>
  </div>
</template>

<script>
import getCode from '_c_/get-code.vue'
export default {
  components:{
    getCode
  },
  data(){
    return {
      formInfo: {
        account: '',
        verifyCode: '',
        newPwd:''
      },
    }
  },
  methods: {
      handleSubmit() {
        if(!/^1[3|4|5|6|7|8|9][0-9]{2}/.test(this.formInfo.account)){
          this.$alert.success('请输入正确的手机号码');
          return ;
        }
        this.$api.user.resetPwd(this.formInfo)
        .then(res=>{
          if(!res.err){
            this.$alert.success('已修改')
            this.$router.replace({name:'login'})
          }else{
            this.$alert.success(res.err.message)
          }
        })
      }
  }
}
</script>

<style lang="less" scoped>
  .forget-wrapper{
    width:350px;
  }
    .title{
      border-bottom: 1px solid #e8ebed;
      font-size: 20px;
      line-height: 36px;
      color: #111;
      margin-bottom:20px;
    }
    .form-container{
      padding:0 10px;
    }
    .other-link{
      display: flex;
      justify-content: space-between;
      padding:0 6px;
      .forget{
        color: #666;
        font-size: 12px;
        border-bottom: 1px solid @border-color;
        padding-bottom: 1px;
        &:hover{
          color: @redColor;
          border-color:@redColor;
        }
      }
      .register{
        color: @redColor;
        font-size: 12px;
      }
    }
</style>
