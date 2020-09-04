<template>
  <div class="header">
    <el-container>
      <el-header>
        <el-row style="height: 60px;">
          <el-col :span="6" style="height: 60px;">
            <h4 style="text-align:left;margin:4% 0 0 20px;color:#fff;cursor: pointer;" @click="toindex">
              <i class="el-icon-arrow-left" v-if="$route.name!=='index'"></i>
              审核系统
            </h4>
          </el-col>
          <el-col :span="18" style="height: 60px;">
            <div class="header-right">
              <div class="header-right-msg" @click="messageDetail">
                消息
                <span style="margin-right: 10px;">
                  <countTo :startVal='startVal' :endVal='message' :duration='5000'></countTo>
                </span> |
              </div>
              <div class="header-right-header">
                <el-dropdown>
                  <span class="el-dropdown-link" style="color:#fff">
                    <div style="display:flex;align-items: center;">
                      <img src="../assets/img.png" alt />
                      <i class="el-icon-caret-bottom"></i>
                    </div>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="forGot">重置密码</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="header-right-setting">
                <i class="el-icon-s-tools" @click="setting"></i>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import countTo from "vue-count-to"; 
export default {
  name: "home",
    components: { 
    countTo
  },
  data() {
    return {
      message: 0,
      startVal:0,
    };
  },
  created(){
    this.getMessageLists()
  },
  mounted() {
    let vm = this;
  },
  methods: {
    forGot() {
      this.$router.push({
        name: "resetPassword",
      });
    },
     getMessageLists(){
      this.$http.post('/auditsystem/sysMessage/getMessageCount').then(res=>{
        if(res.code==0){
           this.message=res.content
        }
      })
    },
    messageDetail() {
      this.$router.push("/message");
    },
    toindex() {
      this.$router.push("/index");
    },
    setting() {
      this.$router.push({
        name: "usermanage",
      });
    },
    logOut() { 
      this.$router.push({
        name: "login",
      });
      this.$store.commit('setToken','')
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  background-color: #1269f9;
  height: 60px;
  .header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 60px;
    .header-right-msg {
      cursor: pointer;
      color: #fff;
      span {
        background-color: #fff;
        color: #1269f9;
        border-radius: 9px;
        padding: 0 5px;
      }
    }
    .header-right-header {
      cursor: pointer;
      width: 80px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        margin-right: 5px;
        height: 30px;
        width: 30px;
      }
    }
    .header-right-setting {
      width: 50px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
