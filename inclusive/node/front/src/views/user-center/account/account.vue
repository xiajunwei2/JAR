<template>
  <div class="account-wrapper">
    <set-title title-name='修改密码'></set-title>
    <div class="form-container">
      <div class='form-box'>
        <div class="form-item">
          <span class='form-item-label'>原密码</span>
          <my-input class='form-item-input' v-model="formInfo.oldPassword" placeholder="不少于6位数的字母组合" type='password' >
          </my-input>
        </div>
        <div class="form-item">
          <span class='form-item-label'>新密码</span>
          <my-input class='form-item-input' v-model="formInfo.newPassword" placeholder="不少于6位数的字母组合" type='password' >
          </my-input>
        </div>
        <div class="form-item">
          <span class='form-item-label'>确认密码</span>
          <my-input class='form-item-input' v-model="formInfo.pwdCondition" placeholder="请输入确认密码" type='password' >
          </my-input>
        </div>
        <div class="form-item padding-tb-xl" style='margin-left:100px;'>
          <Button class='jq-btn-red' style='width:100px;' @on-click='save'>保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCode from '_c_/get-code.vue'
import {removeToken} from '@/utils/localStorage'
export default {
  components:{
    getCode
  },
  data(){
    return {
      formInfo: {
        oldPassword: '',
        newPassword:'',
        pwdCondition: ''
      },
    }
  },
  methods:{
    save(){
      let flag = true;
      for(var key in this.formInfo){
        if(!this.formInfo[key]){
          flag = false;
          break;
        }
      }
      if(!flag){
        this.$alert.success('请填写完整信息');
        return;
      }else if(this.formInfo.newPassword != this.formInfo.pwdCondition){
        this.$alert.warning('两次输入密码不一致')
        return
      }
      let formData = {...this.formInfo};
      delete formData.pwdCondition;
      formData.userId = this.$store.state.user.myBaseInfo.userId,
      this.$api.user.updatePwd(formData)
      .then(res=>{
        if(!res.err){
          this.$alert.success('已修改');
          this.formInfo = {};
          removeToken();
          this.$router.push({name:'nlogin'})
          this.$store.state.user.userInfo = '';
          this.$store.state.user.loginState = false;
        }else{
          this.$alert.success(res.err.msg)
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.form-container{
  margin:30px;
  .form-item{
    margin-bottom:25px;
  }
  .form-item-label{
    color:#555;
    font-size:16px;
    font-family:Adobe Heiti Std;
  }
  /deep/ .input-box{
     .input-style{
       color:#C2C2C2;
       padding:7px 15px;
     }
  }
}
.get-code{
  position:absolute;
  right:7px;
  top:9px;
  z-index:+1;
  color:@redColor;
  cursor: pointer;
}
</style>