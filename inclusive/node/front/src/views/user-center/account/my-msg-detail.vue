<template>
  <div class="account">
      <div class="a-title">
          <span class="line"></span> 我的消息
      </div>
      <div class="detail">
          <div class="d-title">贷款授信成功</div>
          <div class="line"></div>
          <div class="d-body">
              <p>邮件比较流行于PC时代的互联网产品，但目前也有应用。推送的前提是用户用邮箱注册，或者用户账号绑定了邮箱账号。邮件可以方便的打开PC邮件，查收邮件的情景比较倾向于完成重要的事情，所以对非紧要的营销类邮件容易忽略。同时因为长期的营销邮件滥用，目前邮件作为通知的效果也越来越差。但是对于卸载了APP的用户而言，邮件仍然是召回流失用户相对有效的手段</p>
              <p>
                  push几乎可以说是移动端APP最核心的通知方式。最核心的指标是到达率和点击率。消息往往不是100%能够送达用户的。受限于厂商，目前Android全量消息到达率达到50%算是比较好的水平，这基本还是建立在Android保活联盟的基础上。点击率则跟消息类型和内容息息相关，也是大家优化的重点
              </p>
          </div>
          <div class="btn-back" @click="$router.go(-1)">返回</div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}
</script>
<style lang="less" scoped>
.account{
    padding:0px 31px;
    .a-title{
        margin:29px 0px;
        font-size:30px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(51,51,51,1);
        height:33px;
        line-height:33px;
        .line{
            display: inline-block;
            width:6px;
            height:33px;
            background:linear-gradient(-90deg,rgba(243,18,34,1) 0%,rgba(248,67,104,1) 53%,rgba(255,81,47,1) 100%);
            vertical-align:top;
        }
    }
    .detail{
        padding:73px 30px 30px;
        position: relative;
        .d-title{
            font-size:24px;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color:rgba(51,51,51,1);
            text-align:center; 
        }
        .line{
            width:100%;
            height:1px;
            background:rgba(191,191,191,1);
            opacity:0.3;
            margin:28px auto 39px;
        }
        .d-body{
            min-height:600px;
            p{
                font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:300;
                color:rgba(153,153,153,1);
                line-height:30px;
            }
        }
        .btn-back{
            position: absolute;
            bottom:30px;
            left:30px;
            width:73px;
            height:35px;
            line-height:35px;
            border:1px solid rgba(153,153,153,0.5);
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:500;
            color:rgba(153,153,153,1);
            text-align: center;
            cursor: pointer;

        }
    }   
}
</style>