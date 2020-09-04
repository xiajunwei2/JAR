<!-- 
@startTime:2019-
@author:zoujingqiang
@endTime:2019-
@description:面包屑和查看更多
-->
<template>
  <div class='set-title-box jq-maxwidth'>
    <span>
      <img class='icon' src="@/assets/images/jq/icons.png" alt="">
      <span class='my-title'>{{titleName}}</span>
    </span>
    <span>
      <a href="javascript:;" v-if='isBack'  @click.stop='$router.back'><i class="iconfont icon-xiaji"></i>返回上一页</a>
      <router-link v-if='path' :to='path'>查看更多</router-link>
    </span>
    
  </div>
</template>

<script>
export default {
  name:'setTitle',
  props:{
    'title-name':{
      type:String,
      required:true
    },
    isBack:{
      default:false
    },
    path:{
      type:String
    }
  }
}
</script>

<style lang='less' scoped>
  .set-title-box{
    padding:14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid rgba(166, 166, 166, 0.39);
    
    .icon{
      position: relative;
      top:-2px;
    }
    .my-title{
      font-weight: bold;
      font-family: '微软雅黑';
      margin-left:6px;
      font-size: 23px;
      color:@redColor;
    }
    a{
      font-size: 16px;
      cursor: pointer;
      color:#ccc;
      &:hover{
        text-decoration: underline;
      }
    }
    .iconfont.icon-xiaji{
      transform: rotate(-180deg) translateX(6px);
    }
  }
</style>