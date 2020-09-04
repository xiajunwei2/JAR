<template>
  <div class="login-wrapper text-center">
    <p class='title'>登录</p>
    <div class="form-container">
      <div class='form-box'>
        <my-input class='margin-bottom' type="text" v-model="formInline.account" placeholder="请输入手机号" :prepend='true'
          :max-length='11'>
          <img src="@/assets/images/jq/login01.png" alt="" slot="prepend">
        </my-input>
        <my-input class='margin-bottom' type="password" v-model="formInline.password" placeholder="请输入密码"
          :prepend='true' :max-length='16'>
          <img src="@/assets/images/jq/login02.png" alt="" slot="prepend">
        </my-input>
        <div class="check-code-box">
          <input type="text" v-model="formInline.kaptcha" placeholder="图片验证码" @keyup.13="handleSubmit"
            class="check-code" />
          <img :src="imageCode" class="check-code-img" />
          <img src="@/assets/images/jq/reflush.png" class="reflush" @click='getImageCode' />
        </div>
      </div>

    </div>
    <div class='margin-bottom other-link'>
      <router-link to='/log/forget' class='forget'>忘记密码</router-link>
      <router-link to='/log/register' class='register'>用户注册</router-link>
    </div>
    <div style="margin-bottom:10px;">
      <Button style='width:323px;' class='jq-btn-red' @on-click="handleSubmit">登录</Button>
    </div>
  </div>
</template>

<script>
import {telphone,password} from '@/utils/validator.js';
export default {
  data(){
    return {
      formInline: {
        account: this.$route.query.tel||'',
        password: '',
        kaptcha:''
      },
      imageCode:''
    }
  },
  methods: {
      handleSubmit() {
        let form = this.formInline
        if(!form.account){
          this.$alert.success('请输入手机号码');
          return;
        }
        if(!form.password){
           this.$alert.success('请输入密码');
          return;
        }
        if(!form.kaptcha){
          this.$alert.success('请输入验证码');
          return;
        }
        let telValid = telphone(form.account);
        if(telValid){
          this.$alert.success(telValid);
          return
        }
        if(form.password.length<6){
          this.$alert.success('密码不得少于6位数');
          return;
        }
        this.$store.dispatch('login',form).then(data=>{
          window.gotoHome('replace');
        }).catch(err=>{
          this.$alert.success(err.message||'error');
        })
      },
      getImageCode(){
        let $vm = this;
        this.$api.user.getImageCode()
        .then(res=>{
          if(res.data.status<400){
            var reader = new FileReader();
            reader.readAsDataURL(res.data.data);  // 转换为base64，可以直接放入a表情href
            reader.onload = function (e) {
              $vm.imageCode = e.target.result;
            }
          }
        })
      }
  },
  created(){
    this.getImageCode()
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 349px;
  .title {
    border-bottom: 1px solid #e8ebed;
    font-size: 20px;
    line-height: 36px;
    color: #111;
    margin-bottom: 30px;
    padding-bottom: 6px;
  }
  .form-container {
    padding: 0 10px;
    .form-box {
      .margin-bottom {
        margin-bottom: 25px;
      }
    }
    .check-code-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .check-code {
        width: 182px;
        height: 38px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(195, 193, 193, 1);
        border-radius: 5px;
        padding-left: 15px;
        box-shadow: none;
        outline: none;
        &:hover,
        &:focus {
          border-color: @redColor;
        }
      }
      .check-code-img {
        width: 66px;
        height: 32px;
      }
      .reflush {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
  .other-link {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    .forget {
      color: #666;
      font-size: 12px;
      border-bottom: 1px solid @border-color;
      padding-bottom: 1px;
      &:hover {
        color: @redColor;
        border-color: @redColor;
      }
    }
    .register {
      color: @redColor;
      font-size: 12px;
    }
  }
}
</style>