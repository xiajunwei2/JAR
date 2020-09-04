<template>
  <div class="mue-header">
    <el-container class="el-container-mue">
      <el-header class="header">
        <el-row>
          <el-col class="header_left" :span="12">
            <img src="../assets/logo.e57dadc.png" class="logo" alt />
            <div class="header_line"></div>
            <div class="header_title">管理后台</div>
          </el-col>
          <el-col class="header_right" :span="12">
            <div style="font-size:16px;">Hi，{{$store.state.userInfor&&$store.state.userInfor.nickName}}，欢迎您！</div>
            <div class="right_line"></div>
            <div class="iconfont icon-index-copy" @click="gohome" style="cursor:pointer;"></div>
            <div class="right_line"></div>
            <div class="iconfont icon-tuichu" @click="gologin" style="cursor:pointer;"></div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding:0">
        <transition
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__bounceOut"
        >
          <router-view style="overflow: hidden;" />
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "mue-header",
  data() {
    return {};
  },
  mounted() {
    let vm = this;
  },
  methods: {
    gohome() {
      this.$router.push({
        name: "index",
      });
    },
    gologin() {
      this.$router.push({
        name: "login",
      });
      this.$store.commit("setUserInfor", []);
      sessionStorage.setItem("login", false);
      sessionStorage.removeItem("userInfor");
      sessionStorage.setItem("loginuserInfor", false);
    },
  },
};
</script>

<style lang="less" scoped>
.mue-header {
  .el-container-mue {
    height: 100vh;
  }
}
.el-header {
  background-color: #050218;
  height:60px !important;
}
.el-row {
  height: 100%;
  .header_left {
    color: #fff;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .logo{
      width: 321px;
      height: 60px;
    }
    .header_title {
      font-size: 26px;
      color: #737378;
    }
    .header_line {
      height: 30px;
      width: 1px;
      background-color: #737378;
      margin: 0 30px;
    }
    img {
      height: 100%;
    }
  }
  .header_right {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    color: #c9c9c9;
    .right_line {
      width: 3px;
      height: 30px;
      background-color: #c9c9c9;
      margin: 0 30px;
    }
    .iconfont {
      font-size: 30px;
    }
  }
}
</style>
