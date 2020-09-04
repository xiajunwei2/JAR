<template>
  <div class="login-main-wrapper jq-c-center">
    <!-- <img class='login-bg' src="@/assets/images/jq/login_bg.png" alt=""> -->
    <div class='jq-maxwidth login-container'>
      <img class='login-left' src="@/assets/images/jq/login_left1.png" alt="">
      <div class='form-box'>
        <router-view></router-view>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  mounted(){
    this.$store.commit('updateNavbar',false)
  },
  beforeDestroy(){
    this.$store.commit('updateNavbar',true)
  }
}
</script>

<style lang="less" scoped>
  .login-main-wrapper{
    padding:50px 0;
    min-height:calc(100vh - 240px);
    // min-height:400px;
    position:relative;
    background:url('../../assets/images/jq/login_bg.png') no-repeat;
    background-size:100% 100%;
  }
  img{
    max-width:100%;
    max-height:80%;
  }
  .login-container{
    width:100%;
  //   height:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .form-box{
    // float:right;
    padding:20px 10px;
    background:#fafdff;
    border-radius: 15px;
    overflow-x:hidden;
  }
</style>