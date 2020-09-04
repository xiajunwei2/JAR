<template>
  <div class="product">

    <div class="head-banner">
      <div class="head-tab">
        <div class="tabs">
          <div class="item dyBtn" :class="{'active':comp=='CreditLoan'}" @click="tabChage('CreditLoan')">信用贷款</div>
          <div class="item dyBtn" :class="{'active':comp=='Mortgage'}" @click="tabChage('Mortgage')">抵押贷款</div>
        </div>
      </div>
<!--      <img src="/static/images/loan.png" v-if="comp=='CreditLoan'" class="b-img">-->
<!--      <img src="/static/images/maloan.png" v-if="comp=='Mortgage'" class="b-img">-->
    </div>
    <Component :is="comp" class="cpt"></Component>
  </div>
</template>

<script>
import CreditLoan from '@/views/product/CreditLoan.vue';
import Mortgage from '@/views/product/Mortgage.vue';

export default {
  data() {
    return {
      comp: 'CreditLoan'
    }
  },
  created() {
    if (this.$route.query.type && this.$route.query.type == 1) {
      this.comp = 'CreditLoan';
    } else if (this.$route.query.type && this.$route.query.type == 2) {
      this.comp = 'Mortgage';
    }
  },
  methods: {
    tabChage(comp) {
      this.comp = comp;
    }
  },
  components: {
    CreditLoan,
    Mortgage,
  }
}
</script>
<style lang="less" scoped>
.product {
  background: #ffffff;

  .head-tab {
    height: 81px;
    position: relative;
    top: 65px;
    margin-bottom: 58px;
    //background: rgba(32, 18, 27, 1);

    .tabs {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 88px;
      display: flex;
      background: transparent;

      .dkBtn {
        background: #333333;
      }

      .dyBtn {
        background: rgba(0,0,0,.2);
      }

      .item {
        width: 485px;
        height: 81px;
        line-height: 81px;
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        cursor: pointer;
        //background: transparent;
      }

      .active {
        background: #333333;
        //background: rgba(241, 79, 74, 1);
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        //color: rgba(255, 255, 255, 1);
      }
    }
  }

  .head-banner {
    height: 277px;
    background-image: url(/static/images/jdd_home_index_solution_bg.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;

    .b-img {
      position: absolute;
      top: 50%;
      left: 23%;
      transform: translateY(-80%);
      width: 25vw;
      max-width: 391px;
    }
  }

  .cpt {
    margin: -65px auto 0;
  }
}
</style>
