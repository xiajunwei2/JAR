<template>
  <div class="box-title">
      <div class="left">
          <div class="d-title">{{title}}</div>
          <div class="d-etitle">{{etitle}}</div>
      </div>
      <div class="right" v-if="rtitle" @click="$emit('more')">
          <slot name="right">
              <div>{{rtitle}}</div>
              <img src="/static/images/allow.png" alt="">
          </slot>
      </div>
  </div>
</template>
<script>
export default {
    name:'BoxTitle',
    props:{
        title:{type:String,default:''},
        etitle:{type:String,default:''},
        rtitle:{type:String,default:''},
    },
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
.box-title{
    display: flex;
    justify-content:space-between;
    align-items: center;
    .left{
        .d-title{
            font-size:32px;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color:rgba(51,51,51,1);
            height:33px;
            line-height:33px;
            border-left:6px solid rgba(243,18,34,1); 
            padding-left:20px;
        }
        .d-etitle{
            font-size:14px;
            font-family:PingFang SC;
            font-weight:300;
            color:rgba(51,51,51,1);
            padding-left:26px;
            margin:11px 0px;
        }
    }
    .right{
        display:flex;
        align-items:center;
        font-size:14px;
        font-family:Source Han Sans CN;
        font-weight:300;
        color:rgba(51,51,51,1);
        cursor: pointer;
        img{
            width:5px;
            height:9px;
            margin-left:10px;
        }
    }
}
</style>