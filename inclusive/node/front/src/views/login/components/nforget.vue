<template>
  <div class="login-box">
    <div class="left">
      <img class='logo-image' src="@/assets/images/jq/logo.png" alt="logo">
      <div class="s-title">三高九龙坡 三宜山水城</div>
      <div class="s-title-text">政府官方平台</div>
      <div class="s-title-text">数据安全</div>
      <div class="s-title-text">申请便捷</div>
      <div class="line"></div>
      <div class="match">
        <div class="m-title">精准匹配</div>
        <div class="m-desc">一次匹配多家银行产品</div>
      </div>
    </div>
    <div class="right">
      <!-- <div class="tabs">
              <div class="tab-item" :class="{'active':activeIndex==1}" @click="tabChange(1)">登录</div>
              <div class="tab-item" :class="{'active':activeIndex==2}" @click="tabChange(2)">注册</div>
          </div> -->
      <div class="forget-box">
        忘记密码
      </div>
      <Form ref="reform" :model="reform" :rules="regrules" :label-width="0" class="login-form">
        <FormItem prop="mobile">
          <div class="tel">
            <span>手机号码：</span>
            <Input v-model="reform.mobile" placeholder="请输入手机号"></Input>
          </div>
        </FormItem>
        <FormItem prop="smsCode">
          <div class="code">
            <Input v-model.trim="reform.smsCode" placeholder="短信验证码"></Input>
            <div class="send-sms" @click="handleGetCode">{{ codeTip }}</div>
          </div>
        </FormItem>
        <FormItem prop="password">
          <Input v-model.trim="reform.password" placeholder="不少于6位的字母+数字组合" :type="IsShowPsd">
            <Icon type="md-eye-off" slot="append" @click.native="setIsShowPsd"></Icon>
          </Input>
        </FormItem>
      </Form>
      <!-- <div class="f-text">
          <Form ref="reform" :model="reform" :rules="regrules" :label-width="0" class="login-form">
            <FormItem>
                <div class="tel">
                    <span>手机号码：</span>
                    <Input v-model="reform.mobile" placeholder="请输入手机号" readonly></Input>
                </div>
            </FormItem>
            <FormItem prop="smsCode">
                <div class="code">
                    <Input v-model.trim="reform.smsCode" placeholder="短信验证码"></Input>
                    <div class="send-sms" @click="handleGetCode">{{codeTip}}</div>
                </div>
            </FormItem>
            <FormItem prop="password">
                <Input v-model.trim="reform.password" placeholder="不少于6位的字母+数字组合" type="password">
                    <Icon type="md-eye-off" slot="append"></Icon>
                </Input>
            </FormItem>
          </Form>
           <div class="f-text">
              <span v-if="activeIndex==1" @click="forget">忘记密码？</span>
          </div> -->
      <div class="login-btn" @click="subForm">提 交</div>
      <div class="l-text">
        <span>如一直未收到验证码请致电客服：023-6173 8886</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      IsShowPsd:'password',
      reform: {
        // mobile: this.$route.params.tel||'',
        mobile: this.$route.query.tel,
        smsCode: '',
        password: '',
      },
      regrules: {
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (!/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(value)) {
                return callback(new Error('请输入正确的手机号码'));
              }
              return callback();
            }, trigger: 'blur'
          },
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value && (value.length < 6 || !/^[a-zA-Z0-9]*$/.test(value))) {
                return callback(new Error('请输入不少于6位的字母+数字组合'));
              }
              return callback();
            }, trigger: 'blur'
          }
        ],
        smsCode: [{required: true, message: '请输入短信验证码', trigger: 'blur'}],
      },
      imageCode: '',
      activeIndex: 1,
      codeTip: '点击发送',
      codeTimer: null,
    }
  },
  created() {
    this.getImageCode();
  },
  methods: {
    setIsShowPsd(){
      this.IsShowPsd = this.IsShowPsd=== 'password' ? 'text' : 'password';
    },
    tabChange(index) {
      this.activeIndex = index;
      index == 1 ? this.$refs.form && this.$refs.form.resetFields() : this.$refs.reform && this.$refs.reform.resetFields();
    },
    getImageCode() {
      let $vm = this;
      this.$api.user.getImageCode()
        .then(res => {
          if (res.data.status < 400) {
            var reader = new FileReader();
            reader.readAsDataURL(res.data.data);  // 转换为base64，可以直接放入a表情href
            reader.onload = function (e) {
              $vm.imageCode = e.target.result;
            }
          }
        })
    },
    subForm() {
      this.$refs.reform.validate(valid => {
        if (valid) {
          console.log(this.reform)
          this.$api.user.resetPwd(this.reform).then(res => {
            if (!res.err) {
              this.$alert.success('已修改')
              this.$router.replace({name: 'nlogin'})
            } else {
              this.$alert.success(res.err.msg)
            }
          })
        }
      })
    },
    handleGetCode() {
      if (!this.reform.mobile) {
        this.$alert.success('请输入手机号');
        return;
      }
      if (this.codeTimer) return;
      this.$api.user.getCode({mobile: this.reform.mobile, smsType: 1}).then(res => {
        if (res.err.code === 500) {
          this.$alert.warning(res.err.message)
          return
        }
        if (res.err) {
          this.codeTip = '重新获取';
          clearInterval(this.codeTimer);
          this.codeTimer = null;
          this.errorFun(res.err);
        } else {
          this.$alert.success('短信已发送，5分钟内有效。');
          this.startTimer();
        }
        if (res.data && res.data.code == 0) {
          this.reform.uuid = res.data.content;
        }
      }).catch(res => {
      })
    },
    startTimer() {
      let time = 120;
      this.codeTip = `重新获取(${time}s)`
      this.codeTimer = setInterval(() => {
        this.codeTip = `重新获取(${time}s)`
        time--;
        if (time === 0) {
          this.codeTip = '重新获取'
          clearInterval(this.codeTimer);
          this.codeTimer = null;
          time = 120;
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.codeTimer);
  }
}
</script>
<style lang="less" scoped>
* {
  cursor: default;
}

.login-box {
  position: relative;
  background: url(/static/images/dbj.png) no-repeat;
  background-size: cover;
  width: calc(100vw - 10px);
  height: 100vh;

  .left {
    position: absolute;
    top: 158px;
    left: 414px;

    .logo-image {
      width: 200px;
      height: 45px;
    }

    .s-title {
      font-size: 32px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-top: 26px;
    }

    .s-title-text {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(156, 164, 178, 1);
      margin: 23px 0px;
    }

    .line {
      width: 355px;
      height: 1px;
      margin: 27px 0px;
      background: rgba(189, 199, 211, 0.41);
    }

    .match {
      width: 366px;
      height: 102px;
      background: linear-gradient(115deg,
      rgba(238, 37, 52, 1) 0%,
      rgba(241, 84, 70, 1) 100%);
      border-radius: 10px;
      padding: 33px 26px;

      .m-title {
        font-size: 20px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }

      .m-desc {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
        margin-top: 15px;
      }
    }
  }

  .right {
    width: 422px;
    height: 492px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 7px 8px 1px rgba(51, 51, 51, 0.17);
    position: absolute;
    top: 127px;
    right: 362px;
    padding: 54px 60px;

    .forget-box {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: center;
      padding: 21px 0px;
      border-bottom: 2px solid rgba(189, 199, 211, 0.29);
      margin-bottom: 40px;
    }

    .login-form {
      /deep/ .ivu-input {
        height: 38px;
      }

      /deep/ [type="password"] {
        border-right: none;
      }

      /deep/ .ivu-input-group-append,
      .ivu-input-group-prepend {
        background: none;
      }

      .tel {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);

        /deep/ .ivu-input-wrapper {
          flex: 1;
          //border: none;
          //outline: none;
        }

        ///deep/ .ivu-input {
        //  border: none;
        //  outline: none;
        //  color: rgba(153, 153, 153, 1);
        //}
        ///deep/ .ivu-input:hover,
        ///deep/ .ivu-input:focus {
        //  border: none !important;
        //  border-color: transparent !important;
        //  outline: none;
        //  box-shadow: none;
        //}
      }

      .code {
        display: flex;
        align-items: center;

        .check-code-img {
          width: 79px;
          height: 38px;
          margin: 0 6px;
        }

        .reflush {
          width: 18px;
          height: 19px;
        }

        .send-sms {
          width: 150px;
          height: 38px;
          line-height: 38px;
          background: rgba(222, 241, 248, 1);
          text-align: center;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(7, 123, 166, 1);
          margin-left: 6px;
          cursor: pointer;
        }
      }
    }

    .f-text {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(194, 194, 194, 0.8);
      margin: 0px 0 38px;
      cursor: pointer;
      display: inline-block;

      span {
        cursor: pointer;
      }
    }

    .login-btn {
      height: 41px;
      line-height: 41px;
      background: rgba(219, 31, 29, 1);
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      cursor: pointer;
    }

    .l-text {
      text-align: center;
      margin-top: 30px;

      span {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: rgba(194, 194, 194, 0.8);
        cursor: pointer;
      }
    }
  }
}
</style>
