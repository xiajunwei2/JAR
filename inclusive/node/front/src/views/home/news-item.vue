<template>
  <div class="news-item" @click="$emit('look',item)">
      <img :src="item.titleImage" alt="" class="i-img">
      <div class="i-body">
        <div class="i-title">{{item.title}}</div>
        <div class="i-desc" v-html="item.content"></div>
        <div class="i-time">{{$moment(item.publishTime*1000).format('YYYY-MM-DD')}}</div>
      </div>
  </div>
</template>
<script>
export default {
    name:'NewsItem',
    props:{
        item:{type:Object,default:()=>{return {}}},
    },
    data(){
        return {

        }
    },
    methods:{

    },
    components:{

    }
}
</script>
<style lang="less" scoped>
.news-item{
    // width:100%;
    display: flex;
    padding:26px 0px;
    border-bottom:1px solid rgba(242,242,242,1);
    cursor: pointer;
    .i-img{
        // width:261px;
        height:194px;
        margin-right:53px;
    }
    .i-title{
        width:600px;
        font-size:20px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(51,51,51,1);
        margin-top:10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .i-desc{
        font-size:15px;
        font-family:Source Han Sans CN;
        font-weight:300;
        color:rgba(85,85,85,1);
        line-height:25px;
        margin-top:28px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .i-time{
        font-size:14px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(196,197,208,1);
        margin-top:32px;
    }
    &:hover{
        .i-title{
            color:#3F73F4;
        }
        .i-desc{
            color:#3F73F4;
        }
    }

}
</style>
