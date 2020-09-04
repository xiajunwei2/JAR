<!-- 
  @author:jeenk_zou
  @createTime:2019/04/28-2019/04/30
  @updateTime:2019
-->
<template>
  <div class='frame-box' id='frame_box'>
    <!-- 头部 -->
    <my-head></my-head>
    <!-- 内容部分 -->
    <section class='frame-body' id='frame_body' v-if='isAlive'>
      <!-- <keep-alive :include="include">
        <router-view v-if="$route.meta.keepAlive" keepAlive />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" dekeepAlive /> -->
      <transition name='router'>
        <router-view></router-view>  
      </transition>
    </section>
    <!-- 底部 -->
    <my-foot></my-foot>
    <!-- 回到顶部 -->
    <to-top></to-top>
  </div>
</template>

<script>
import myHead from '_c_/NHeader/Header'
import myFoot from '_c_/Footer/Footer'
export default {
  components:{
    myHead,
    myFoot,
  },
  data(){
    return {
      include: [],
      showRouter:false
    }
  },
  computed:{
    isAlive(){
      return this.$store.state.isAlive
    }
  },
  watch: {
    $route(to, from) {
      //是否需要缓存
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // 进入页面加入缓存，返回后删除缓存
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  },
}
</script>

<style lang='less'>
	@import './frame.less';
</style>