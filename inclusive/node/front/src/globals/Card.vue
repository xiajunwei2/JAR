<template>
  <div class="card-wrapper">
    <div class="title">{{titleName}}</div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'myCard',
  props:{
    titleName:{
      type:String,
      default:'标题'
    }
  }
}
</script>

<style lang='less' scoped>
  .card-wrapper{
    border:1px solid @border-color;
    .title{
      padding:10px;
      font-family:Source Han Sans CN;
      font-weight:bold;
      color:rgba(179,179,179,1);
      background:linear-gradient(0deg,rgba(219,211,210,.5) 0%,rgba(204,202,202,.5) 100%);
      border-bottom:1px solid @border-color;
    }
    .card-content{
      padding:20px;
      background:#fff;
    }
  }
</style>