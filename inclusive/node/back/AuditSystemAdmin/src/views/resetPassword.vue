<template>
  <div class="login">
    <div class="login-Contenner">
      <div class="bj"></div>
      <div class="login-right">
        <h2 class="login-right-title">重置密码</h2>
        <el-form :model="logins" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
          <el-form-item prop="loginName">
            <div class="item-input">
              <el-input placeholder="请输入账号" clearable v-model="logins.loginName">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="yzm">
            <div class="item-input item-yzm">
              <el-input class="item-input-yzm" clearable type="text" placeholder="请输入验证码">
              </el-input>
              <img src="../assets/yzm.png" class="item-input-yzm-img" @click="submitForm('ruleForm')" alt />
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="item-input">
              <el-input type="password" clearable placeholder="请输入密码" v-model="logins.password">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="submit-btn" type="primary" :icon="loginStatue ? 'el-icon-loading' : ''"
              @click="submitForm('ruleForm')">立即重置</el-button>
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
	import Api from '@/api/api.js'
export default {
	name: 'login',
	data() {
		return {
			logins: {
				loginName: '17601210962',
				password: '12345678'
			},
			loginStatue: false,
			rules: {
				loginName: [
					{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				]
			},
			timer: null
		};
	},
	created() {
		sessionStorage.clear('treemenu');
	},
	methods: {
		submitForm(formName) {
			let vm = this;
			vm.$refs[formName].validate(valid => {
				if (valid) {
					this.loginStatue = true;
					this.$http.post('/wisdom/sysUser/login',this.logins).then(res => {
						this.loginStatue = false;
						if (res && res.code==0) {
							sessionStorage.setItem('login', true);
							this.$store.commit("setuserInfor",res.content)
							let userInfor=JSON.stringify(res.content)
							sessionStorage.setItem('userInfor', userInfor);
							vm.$router.push({
								path: '/admin/home'
							});
							this.$notify.success({
								title: `欢迎您使用，含谷数据管理平台!`,
								duration: 3000
							});
						} else {
							this.$message.error({
								title: '登陆失败',
								message: res.msg,
								duration: 3000
							});
						}
					});
				} else {
					return false;
				}
			});
		}
	}
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
