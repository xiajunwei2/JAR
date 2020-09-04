<template>
  <div>
      <!-- banner图 -->
    <div
      id="carousel-example-generic"
      class="mt20 carousel slide"
      data-ride="carousel"
    >
      <!-- Indicators -->
      <!-- <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" :class='{active:i==0}' v-for='(it,i) in bannerLists.length' :key='i' :data-slide-to="i"></li>
      </ol> -->

      <!-- Wrapper for slides -->
      <div
        class="carousel-inner"
        role="listbox"
      >
        <div
          :class="['item','text-center',i==0 && 'active']"
          v-for='(it,i) in bannerLists'
          :key='i'
          :style="{backgroundImage:'url('+it.image+')'}"
        >
          <!-- <img :src="it.image" alt="..." class='max-width-100'> -->
          <!-- <img
            :src="it.image"
            style='display:inline-block;width:100%;height:100%;'
          > -->
          <div class="carousel-caption"></div>
        </div>
      </div>

      <!-- Controls -->
      <a
        class="left carousel-control"
        href="#carousel-example-generic"
        role="button"
        data-slide="prev"
      >
        <span class='box'><i class="iconfont icon-xiaji"></i></span>
        <!-- <span class="sr-only">Previous</span> -->
      </a>
      <a
        class="right carousel-control"
        href="#carousel-example-generic"
        role="button"
        data-slide="next"
      >
        <span class='box'><i class="iconfont icon-xiaji"></i></span>
        <!-- <span class="sr-only">Next</span> -->
      </a>
      <!-- 数字统计 -->
      <div class="statics-wrapper">
        <div class='jq-maxwidth text-center'>
          <div class="row">
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu01.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.companyCount? countNum.companyCount:0"></count-to>
                </b>个</p>
              <p class='desc'>注册企业</p>
            </div>
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu02.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.applyLoan? countNum.applyLoan:0"></count-to>
                </b>次</p>
              <p class='desc'>申请贷款</p>
            </div>
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu03.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.letGoLoan? countNum.letGoLoan:0"></count-to>
                </b>笔</p>
              <p class='desc'>成功放款</p>
            </div>
            <div class='col-xs-3'>
              <p class='icon'><img
                  src="@/assets/images/jq/sy_menu04.png"
                  alt=""
                ></p>
              <p class='number'><b>
                  <count-to :end="countNum.loanMoney? countNum.loanMoney:0"></count-to>
                </b>万元</p>
              <p class='desc'>放款总额</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'Banner',
    data(){
        return {
            countNum:{},
            bannerLists: [
                { url: '', image: require('@/assets/images/jq/banner.png') },
                // { url: '', image: require('@/assets/images/jq/banner.png') },
                // { url: '', image: require('@/assets/images/jq/banner.png') }
            ],
        }
    },
    mounted(){
        this.getCountNum();
    },
    methods:{
        async getCountNum() {
            let { data } = await this.$api.order.getCount()
            this.countNum = data.content;
        },
    }
}
</script>
<style lang="less" scoped>
.home-box{
  position: relative;
}
.padding-tb-60{
  padding:60px 0;
}
// 我的申请
.apply-wrapper{
  position: absolute;
  bottom:90px;
  z-index:11;
  left:calc(50% - 90px);
  .apply-box{
    position: relative;
    img{
      border-radius:10px;
    }
  }
  .onekey-apply{
    position: absolute;
    top: 0;
    left: 44px;
    font-size: 18px;
    color:#fff;
  }
}
.carousel{
  height:597px;
}
.carousel-inner{
  height:597px;
  .item{
    background-repeat:no-repeat;
    background-size: cover;
    background-position-x: center;
    background-position-y: top;
    height: 597px;
  }
}
// 数据统计
.statics-wrapper{
  position: absolute;
  bottom:5px;left:50%;
  transform: translatex(-50%);
  background-color: rgba(0,0,0,.5);
  width:100%;
  max-width: 100vw;
  padding:10px;
  color:#fff;
  .row>div{
    position: relative;
  }
  .row>div:not(:last-child)::after{
    content:'';
    position: absolute;
    top:36px;right:0;
    width:1px;
    height:41px;
    background:rgba(255,255,255,1);
    opacity:0.5;
  }
  .iconfont{
    font-size:2.4rem;
  }
  .icon,.number{
    margin-bottom:6px;
  }
  .icon img{
    width:28px;
    height:28px;
  }
  .number b{
    font-size:3.6rem;
    font-weight: 300;
  }
  .desc{
    color:#999;
  }
}
</style>
