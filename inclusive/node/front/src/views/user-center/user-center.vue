<!--
@startTime:2019-
@author:zoujingqiang
@endTime:2019-
@description:xxx
-->
<template>
  <div class='user-center-box jq-maxwidth'>
    <!-- 左侧菜单栏 -->
    <div class="user-center-left">
      <ul class='user-center-list'>
        <!-- <li class='list-item user-center-title'>个人中心</li> -->
        <li class='list-item new-user-center'>
            <div class="zh-text">个人中心</div>
            <div class="en-text">Personal Center</div>
        </li>
        <li class="list-item" :class='{active:it.routername==$route.meta.subname}' v-for='it in usercenterLists' :key='it.name' @click='jumpTo(it.routername)'>
          <span class="item-text">{{it.name}}</span>
        </li>
      </ul>
    </div>
    <div class='user-center-right' :style="{background:$route.meta.subname == 'my-loan' || $route.meta.subname == 'my-companys' ? 'none' : ''}">
      <div class="right-content">
        <transition name='router'>
          <router-view v-if='alive'></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alive:true,
      usercenterLists:[
        {name:'我的贷款',routername:'my-loan'},
        {name:'我的企业',routername:'my-companys'},
        {name:'贷款需求',routername:'my-enterprice-info'},
        {name:'修改密码',routername:'account'},
        // {name:'我的消息',routername:'my-msg'}
      ],
    };
  },
  methods:{
    jumpTo(routername){
      if(routername==this.$route.name){
        this.alive = false;
        this.$nextTick(()=>{
          this.alive = true;
        })
        return;
      }
      this.$router.push({name:routername})
    }
  }
}
</script>

<style lang='less' scoped>
@deep:~'>>>';
.user-center-box{
  padding-top:20px;
  padding-bottom: 20px;
  display:flex;
  font-family: '微软雅黑';
}
.user-center-left{
  width:160px;
  margin-right:20px;
  text-align: center;
}

.list-item{
  color:#B5B5B5;
  padding:14px;
  font-size: 1.6rem;
  background:#fff;
  cursor: pointer;
  &.active{
    // background:#F1EEEE;
    color:@redColor;
  }
  &:hover{
    color:@redColor;
  }
  .item-text{
    position: relative;
    &::before{
      content:"";
      width:5px;
      height:2px;
      background:rgba(159,156,156,1);
      position: absolute;
      top:50%;
      left:-17px;
      transform:translateY(-50%);
    }
  }
}
.user-center-title{
  cursor: text;
  background-color:@redColor;
  color:#fff !important;
  background-image:url('../../assets/images/user-center.png');
  background-repeat:no-repeat;
}
.new-user-center{
    cursor: text;
    color:#fff !important;
    background-image:url('/static/images/222_03.png');
    background-repeat:no-repeat;
    background-size:cover;
    height:94px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:flex-start;
    padding-left:31px;
    .zh-text{
      font-size:18px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .en-text{
      font-size:12px;
      font-family:Source Han Sans CN;
      font-weight:300;
      color:rgba(194,194,194,1);
    }
}

.user-center-right{
  margin-bottom: 20px;
  background:#fff;
  width:calc(100% - 160px);
}
@{deep}.right-title{
  font-weight: 500;
  color:@redColor;
  font-size: 2rem;
  margin-bottom: 10px;
  padding:20px 0px;
  border-bottom: 1px solid #eee;
}
.right-content{
  min-height:calc(100vh - 310px);
}
@media screen and (max-width:992px ){
  .user-center-box{
    display: block;
  }
  .user-center-list{
    display: flex;
  }
  .list-item{
    flex:1;
  }
  .user-center-left{
    margin-bottom:20px;
    margin-right:0;
    width:100%;
  }
  .user-center-right{
    width:100%;
  }
}
</style>
