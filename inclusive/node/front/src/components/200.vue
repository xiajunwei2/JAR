<template>
  <!-- <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"/> -->
  <div class='jumping-box'>
    <!-- <span>
      <i class="iconfont icon-Loading rotate"></i>
      正在为您进行跳转，请稍候...
    </span> -->
    <div class='jumping-loading'>
      <span class='c-out top-bd'>
        <span class="c-in top-bd">
          <span class="c-inin top-bd"></span>
        </span>
      </span>
      <span class='loading-text'>页面正在加载，请稍候...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error_200'
}
</script>
<style lang='less' scoped>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.jumping-box{
  .center;
  width:100%;
  height:100%;
}
.jumping-loading{
  text-align: center;
}
.loading-text{
  margin:20px 0;
  font-size: 16px;

}
.top-bd{
  margin:auto;
  border-top:2px solid;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-radius: 50%;
  will-change: transform;
}
.c-out{
  border-top-color: #0d59e5;
  .center;
  width:100px;
  height:100px;
  animation: rotate 3s infinite linear;
}
.c-in{
  border-top-color: rgba(230,28,29,1);
  .center;
  width:70px;
  height:70px;
  animation: rotate 2s infinite linear;
}
.c-inin{
  width:30px;
  height: 30px;
  background:#397af2;
  animation: scale 1.5s infinite linear;
}
@keyframes rotate{
  0%{transform:rotate(0);}
  100%{transform:rotate(360deg);}
}
@keyframes scale {
  from{opacity:0;transform:scale(0);}
  to{opacity: 1;transform:scale(1)}
}
</style>



