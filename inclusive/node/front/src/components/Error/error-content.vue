<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <back-btn-group v-if='type==404' class="back-btn-group"></back-btn-group>
    </div>
  </div>
</template>

<script>
import backBtnGroup from './back-btn-group.vue'
export default {
  name: 'error_content',
  components: {
    backBtnGroup
  },
  props: {
    code: String,
    desc: String,
    src: String,
    type:Number
  }
}
</script>
<style lang='less'>
// 404
.error-page{
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .content-con{
    height: 26rem;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    img{
      display: block;
      // width: 100%;
      // height: 100%;
    }
    .text-con{
      position: absolute;
      left: 0;top: 0;
      h4{
        position: absolute;
        left: 0px;top: 0px;
        font-size: 8rem;
        font-weight: 700;
        color: #0d59e5;
      }
      h5{
        position: absolute;
        width: 30rem;
        left: 5rem;
        top: 21rem;
        font-size: 2rem;
        font-weight: 700;
        color: #96a2bd;
      }
    }
    .back-btn-group{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -2rem;
    }
  }
}
</style>


