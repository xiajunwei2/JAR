<template>
  <div class="login">
    <div class="login-Contenner" v-loading="$store.state.loading" element-loading-text="数据拼命处理中,请稍后...">
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
          <!-- <el-form-item prop="yzm"> -->
          <el-form-item prop="code">
            <div class="item-input item-yzm">
              <el-input class="item-input-yzm" v-model="logins.code" @keyup.enter.native="submitForm('ruleForm')"
                clearable type="text" placeholder="请输入验证码"></el-input>
              <img :src="passCodeUrl?passCodeUrl:baseCode" class="item-input-yzm-img" @click="getPassCode()" alt />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-btn" type="primary" :icon="loginStatue ? 'el-icon-loading' : ''"
              @click="submitForm('ruleForm')" style="width:100%;">登录</el-button>
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
import Api from "@/api/api.js";
export default {
  name: "login",
  data() {
    return {
      passCodeUrl: "",
      baseCode: require("../assets/yzm.png"),
      logins: {
        code: "",
        uuid: "",
        loginType:0,
        userName: "19913146112",
        password: "cq123456",
      },
      loginStatue: false,
      rules: {
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "请输入账号",
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
      url: null,
      urlget: null,
    };
  },
  created() {
    sessionStorage.clear("treemenu");
    sessionStorage.setItem("login", false);
    this.urlget = 'inclusive/sysUser/getLoginUser'; 
    this.url = '/inclusive/sysLogin/login';
    this.getPassCode();
  },
  methods: {
    getPassCode() {
      let vm = this;
      this.$store.commit("loadingChange", true);
      Api.sysLogingeneratorImgCode().then((res) => {
        this.$store.commit("loadingChange", false);
        if (res.code == 0) {
          this.passCodeUrl = res.content.pictureCodeImg;
          this.logins.uuid = res.content.uuid;
        } else {
          sessionStorage.setItem("login", false);
          vm.$message.error({
            title: "登陆失败",
            message: res.msg,
            duration: 3000,
          });
        }
      });
    },
    forgetPassWord() {
      this.$router.push({
        name: "resetPassword",
      });
    },
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.loginStatue = true;
          vm.$store.commit("loadingChange", true);
          Api.login(vm.url, vm.logins).then((res) => {
            vm.$store.commit("loadingChange",false);
              vm.loginStatue = false;
            if (res && res.code == 0) {
              let token = res.content;
              vm.$store.commit("setToken", token);
              sessionStorage.setItem("login", true);
              Api.getuser(vm.urlget).then((res) => { 
                if(res.code==0){
                  sessionStorage.setItem("loginuserInfor", true);
                  sessionStorage.setItem("userInfor", JSON.stringify(res.content));
                  vm.$store.commit("setUserInfor", res.content);
                  vm.$router.push({
                    path: "/adminIndex",
                  });
                  vm.$notify.success({
                    title: `欢迎您使用，普惠金融管理平台!`,
                    duration: 3000,
                  });
                  if(!sessionStorage.getItem('login')){
                    return ;
                  }
                  setTimeout(()=>{
                    //获取所有的下啦列表 
                    vm.$store.dispatch("sysCodegetCode", "DKZQ"); //贷款周期
                    vm.$store.dispatch("sysCodegetCode", "CPZT"); //产品状态
                    vm.$store.dispatch("sysCodegetCode", "DKZT"); //贷款周期
                    vm.$store.dispatch("sysCodegetCode", "ZCDZ"); //注册地址
                    vm.$store.dispatch("sysCodegetCode", "JYDZ"); //经营地址
                    vm.$store.dispatch("sysCodegetCode", "JGLX"); //机构类型
                    // vm.$store.dispatch("sysCodegetCode", "JGZT"); //机构状态
                    // vm.$store.dispatch("sysCodegetCode", "JGDJ"); //机构等级
                    vm.$store.dispatch("sysCompanygetAllMechanism"); //经营地址
                    vm.$store.dispatch("productTypegetAllType"); //经营地址
                    vm.$store.dispatch("sysDeptgetPageDept"); //经营地址
                    vm.$store.dispatch("sysCompanygetFirstGradeMechanism"); //一级机构列表
                    vm.$store.dispatch("sysMenugetSelectMenu"); //获取所有菜单列表
                    vm.$store.dispatch("GetsysRoleGetAllRole"); //获取所有菜单列表
                    vm.$store.dispatch("setListMenu"); //获取所有菜单列表
                  },1000);
                }else{
                    vm.$message.error(res.msg);
                  return;
                }
              });
              
            } else {
              sessionStorage.setItem("login", false);
              vm.$message.error({
                title: "登陆失败",
                message: res.msg,
                duration: 3000,
              });
            }
          });
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
          width: 230px;
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
