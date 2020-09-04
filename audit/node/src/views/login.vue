<template>
  <div class="login">
    <div class="login-Contenner">
      <div class="bj"></div>
      <div class="login-right">
        <h2 class="login-right-title">用户登录</h2>
        <el-form :model="logins" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
          <el-form-item prop="userName">
            <div class="item-input">
              <el-input placeholder="请输入账号" suffix-icon="el-icon-user-solid" v-model="logins.userName"></el-input>
            </div>
          </el-form-item>

          <el-form-item prop="password">
            <div class="item-input">
              <el-input suffix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="logins.password">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="code">
            <div class="item-input item-yzm">
              <el-input v-model="logins.code" class="item-input-yzm" clearable type="text" placeholder="请输入验证码">
              </el-input>
              <img :src="yzmUrl? yzmUrl:baseUrl" class="item-input-yzm-img" @click="getPassCode()" alt />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-btn" type="primary" :icon="loginStatue ? 'el-icon-loading' : ''"
              @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-forget" type="text" @click="forgetPassWord">找回密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import Api from "@/api/api.js";
export default {
  name: "login",
  data() {
    return {
      logins: {
        userName: "19913146112",
        password: "123456",
        code:'',
        uuid:'',
      },
      yzmUrl:'',
      baseUrl:require('../assets/yzm.png'),
      loginStatue: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      timer: null,
    };
  },
  created() {
    this.getPassCode()
    sessionStorage.clear("treemenu");
  },
  methods: {
    getPassCode(){
        this.$http.post('/auditsystem/sysLogin/generatorImgCode').then(res=>{
          if(res.code==0){
            console.log(res)
            this.yzmUrl=res.content.pictureCodeImg
            this.logins.uuid=res.content.uuid
          }
        })
    },
    forgetPassWord() {
      this.$router.push({
        name: "resetPassword",
      });
    },
    login(){
      // userName:'19913146112',password:'123456'
      let params = this.form;
      this.loading = true;
     
    },
    submitForm(formName) {
      let vm = this;
      let params=this.logins
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginStatue = true;
          this.$http.post("/auditsystem/sysLogin/login",params).then(res=>{
            this.loading = false;
            if(res.code==0){
              this.$store.commit('setToken',res.content.token);
              this.$store.commit('seTUserInfo',res.content.sysUserInfoVo)
              localStorage.setItem('hg_auto_token',res.content.token);
              this.$router.push('/index')
            }else{
              // this.$message.error({message:res.msg,duration:0});
              this.$message.error(res.msg);
            }
          })
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.login {
  overflow: hidden;
  user-select: none;
  background-image: url(../assets/loginbj.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  padding: 0 100px;
  justify-content: center;
  align-items: center;
  .login-Contenner {
    display: flex;
    width: 70%;
    height: 55vh;
    min-height: 600px;
    background-color: #fff;
    .bj {
      width: 50%;
      height: 100%;
      background-image: url(../assets/loginright.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .login-right {
      width: 50%;
      height: 100%;
      .login-right-title {
        text-align: center;
        margin-top: 8vh;
      }
      .demo-ruleForm {
        text-align: right;
        .item-yzm {
          position: relative;
          width: 100%;
        }
        .item-input {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        padding: 50px 100px;
        .submit-btn {
          width: 100%;
          background-color: #4d69f6;
        }
        .btn-forget {
          float: right;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          opacity: 0.88;
        }
        .item-input-yzm-img {
          position: absolute;
          right: 0;
          width: 96px;
          height: 30px;
          margin: 0 20px;
        }
      }
    }
  }
}
</style>
