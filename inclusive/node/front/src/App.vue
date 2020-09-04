<template>
  <div id="ydy_app">
    <router-view v-if='isAlive' />
    <waiting v-else></waiting>
  </div>
</template>
<script>
import waiting from '_c_/200.vue';
export default {
  name: "App",
  components:{
    waiting
  },
  data(){
    return {
      isAlive:true
    }
  },
  created(){
    this.isAlive = true;
    // 如果已经登录
    if(this.$store.getters.isLogin){
      this.$store.dispatch('getMyInfo'); // 加载个人信息
    }
    
   
  }
};
</script>