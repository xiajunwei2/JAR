<!--
  @author:jeenk_zou
  @createTime:2019/04/29-2019/04/29
  @updateTime:2019
-->
<template>
  <header class='header-box'>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button ref='toggleBtn' type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs_navbar_collapse" aria-expanded="false">
            <span class="sr-only">切换菜单</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to='/home'>
            <img class='logo-image' src="@/assets/images/jq/logo.png" alt="logo">
          </router-link>
          <div class="line" v-if='!navbarShow'></div>
          <div class="login-text" v-if='!navbarShow'>欢迎登录</div>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs_navbar_collapse" v-if='navbarShow' @click='toggleButton'>
          <ul class="nav navbar-nav my-nav">
            <li v-for='(it,i) in navLists' :key='i' class='nav-item' @click='handleNavClick(it,i)'>
              <span :class="{'active':it.router==$route.meta.name && activeIndex != 4}"  href="javascript:;" role='button' >{{it.title}}</span>
            </li>
            <li class='nav-item' @click="handleNavClick('login',4)" v-if='!loginState'>
              <span :class="{'active':activeIndex == 4}" role='button'>企业登录</span>
            </li>
            <li class='nav-item' @click="toAdmin" v-if='!loginState'>
              <span role='button'>机构登录</span>
            </li>
          </ul>
           <div class="navbar-form navbar-right" v-if='loginState' style="margin-top:20px;">
             <!-- <span class='margin-right jq-inline-block' style='color:#ccc;'>|</span> -->
             您好！<span class='text-color-red margin-right-sm'>{{myBaseInfo.userName | account}}</span>
             <Button class='jq-btn-red' style='padding:5px;font-size:12px;transform:translateY(8px)' @on-click='logout'>退出</Button>
          </div>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </header>
</template>

<script>
export default {
  name:'app-header',
  data () {
    return {
      navLists:[
        {title:'首页',id:1,name:'home',router:'/home'},
        {title:'产品介绍',id:3,name:'product',router:'/product'},
        {title:'关于我们',id:3,name:'aboutus',router:'/aboutus'},
        {title:'个人中心',id:2,name:'usercenter',router:'/usercenter'},
        // {title:'企业登录',id:2,name:'nlogin',router:'/nlogin'},
      ],
      account:'',
      activeIndex:0
    };
  },
  filters:{
    account(account){
      if(account){
        let num =  account.split('');
        num.splice(4,3,'***');
        return num.join('')
      }else{
        return ''
      }
    }
  },
  computed:{
    loginShow(){
      return this.$store.state.user.loginShow
    },
    loginState(){
      return this.$store.state.user.loginState
    },
    myBaseInfo(){
      return this.$store.state.user.myBaseInfo
    },
    navbarShow(){
      if(!this.$fun.isPC()){
        return true;
      }else{
        return this.$store.state.navbarShow
      }
    }
  },
  methods: {
    handleNavClick(item,index){
      this.activeIndex = index;
      if(item == 'login'){
        this.$router.push({path:'/nlogin'})
      }else{
        this.$router.push({name:item.name})
      }
      // console.log(this.$refs.toggleBtn.classList)
    },
    toggleButton(){
      let toggle = this.$refs.toggleBtn
      if(!this.$fun.isPC()){
        toggle.click();
      }
    },
    handleLogin(){
      sessionStorage.removeItem('redirect_url');
    },
    // 退出事件
    logout(){
      this.$modal.show({
        title:this.$t('login.logout'),
        subtitle:'确定要现在退出系统吗？',
        callback:({bool,type})=>{
          if(bool){
            this.$store.dispatch('logout').then(res=>{
              if(this.$route.meta.needAuth){
                window.gotoHome('replace');
              }
            })
          }
          this.$modal.close()
        }
      })
    },
    toAdmin(){
      window.open(process.env.BACKEND_URL,'_blank')
    }
  }
}
</script>

<style lang='less' scoped>
  @import './header.less';
</style>
