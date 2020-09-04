<template>
  <div class="coor-org-wrapper">
    <!-- 合作机构 -->
    <div class='jq-maxwidth text-center'>
      <div class="center-title"><span class='name'>合作机构</span></div>
      <ul class='bank-lists row'>
        <li class='bank-item' v-for='(item,ii) in bankLists' :key='ii'>
          <img v-lazy='item.src' alt='bank'>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      titleImage:require('@/assets/images/jq/index_bg05.png'),
      bankLists:[
        {src:require('@/assets/images/jq/bank_gongshang.png')},
        {src:require('@/assets/images/jq/bank_jianshe.png')},
        {src:require('@/assets/images/jq/bank_nongye.png')},
        {src:require('@/assets/images/jq/bank_zhongguo.png')},
        {src:require('@/assets/images/jq/bank_guangda.png')},
        {src:require('@/assets/images/jq/bank_chongqing.png')},
        {src:require('@/assets/images/jq/bank_sanxia.png')},
        {src:require('@/assets/images/jq/bank_nongcun.png')},
        {src:require('@/assets/images/jq/bank_nongshang.png')},
        {src:require('@/assets/images/jq/bank_zhaoshang.png')}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .coor-org-wrapper{
    background:@bg-color-grey;
    padding-top:60px;
    padding-bottom:20px;
    .bank-item{
      display:inline-block;
      text-align: center;
      margin-bottom:20px;
      width:20%;
    }
    img{
      max-width: 100%;
    }
  }
</style>>
