<template>
  <footer class='footer-wrapper'>
    <div class='jq-maxwidth'>
      <ul class="row">
        <li class="col-xs-8 copyright">
          <p class='line-height-30'>Copyright©2019-2020 重庆市九龙坡区人民政府 All Rights Reserved.</p>
          <p class='line-height-30'>渝ICP备<a href='http://www.beian.miit.gov.cn/' target='blank'>19013939</a>号-1</p>
          <p class='line-height-30'><img style='transform:translateY(-5px)' class='margin-right-sm' src='@/assets/images/jq/cicba.buttom.png' width='50' >技术支持：重庆大数据人工智能创新中心</p>              
        </li>
        <li class="col-xs-4 contact">
          <img src="@/assets/images/jq/code.jpg" alt="" width="100" />
          <div class="jq-inline-block tel-time">
              <p class='tel'>客服电话</p>
              <p class='tel'>{{aboutus.phone}}</p>
              <!-- <p class='tel'>{{aboutus.phone}}</p>
              <p class='time'>客服热线 （09:00-18:00）</p> -->
          </div>
        </li>
      </ul>
    </div>
  </footer>
  
</template>

<script>
export default {
  name: 'app-footer',
  computed:{
    aboutus(){
      return this.$store.state.aboutus
    }
  }
}
</script>

<style lang='less' scoped>
  @import './footer.less';
</style>