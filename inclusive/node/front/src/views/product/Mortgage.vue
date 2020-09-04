<template>
  <div class="item">
    <div class="item-tabs">
      <div class="tab" :class="{'active':item.id==currItem.id}" @click="tabChange(item)" v-for="item in tabs"
           :key="item.id">{{ item.title }}
      </div>
    </div>
    <div class="item-bottom">
      <div class="item-ctx">
        <div class="left">
          <div class="title">{{ currItem.title }}</div>
          <div class="desc">{{ currItem.desc }}</div>
          <div class="btn-one" @click="toPage">一键贷款</div>
        </div>
        <div class="right">
          <div class="title">相关产品</div>
          <div class="rela-prod">
            <div class="prod-item" v-for="(item,index) in currItem.prods" :key="index">
              <div class="p-title">{{ item.title }}</div>
              <div class="p-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          title: '住房抵押贷', id: 1, desc: '针对能提供工业用房或商品房等抵押品的小微企业发放的贷款产品。',
          prods: [
            {title: '小企业网贷通', desc: '针对成立一年以上的小微企业，额度循环使用1年，提款还款操作方便，利率优惠'},
            {title: '便捷贷', desc: '授信有效期最长3年；额度循环使用；还款方式灵活，手续简便；有效解决小微企业临时性资金周转问题'},
            {title: '房快贷', desc: '能提供房产作抵押的自然人，一键申请；自动审批；实时评估；随借随还'},
            {title: '个人助业贷', desc: '从事合法经营的自然人可申请，一次授信，循环支用；手机银行自助办理支用还款；贷款到期更可在手机银行自助办理无还本续贷'},
          ]
        },
        {
          title: '工业厂房贷', id: 2, desc: '对于具有工业厂房且产权明晰的小微企业，通过抵押所购/建厂房提供的贷款产品。',
          prods: [
            {title: '抵押e贷', desc: '各类小微企业可申请，需工业厂房、住房、商铺抵押，审批放贷速度快，最高1000万'},
            {title: '工业厂房贷款', desc: '所购/建厂房抵押贷款，满足企业自建工业厂房或购买一手/二手工业厂房融资需求，贷款期限长，还款方式多样。'},
          ]
        },
        {
          title: '其他抵押贷', id: 3, desc: '以现金及现金等价物、贵金属、债券和票据等质押提供的贷款，用于满足企业在生产经营过程中的融资需求。',
          prods: [
            {title: '发展贷', desc: '授信有效期最长3年；额度循环使用；还款方式灵活；贷款资金可用于流动资金周转或固定资产投资。'},
            {title: '小微法人房抵贷', desc: '申请手续简；审批效率高；贷款期限长；支取方式活：可采用随借随还方式，贷款期限最长1年（含）'},
            {title: '抵押快贷', desc: '随借随还、按日计息；减免税额，纳入增信'},
          ]
        },
      ],
      currItem: {}
    }
  },
  created() {
    if (this.$route.query.name === undefined) {
      this.currItem = this.tabs[0];
    } else {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].title == this.$route.query.name) {
          this.currItem = this.tabs[i];
        }
      }
    }
  },
  methods: {
    tabChange(item) {
      this.currItem = item;
    },
    toPage() {
      this.$router.push({name: 'loan-matching'})
    }
  },
}
</script>
<style lang="less" scoped>
* {
  cursor: default;
}

.item {
  position: relative;
  z-index: 1;

  .item-tabs {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 88px;
    display: flex;
    background: transparent;

    .tab {
      min-width: 129px;
      height: 65px;
      line-height: 65px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #333333;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: rgba(48, 42, 53, 1);
        color: rgba(255, 255, 255, 1);
      }

      // &:not(hover){
      //    background:#ffffff;
      //    color:#333333;
      // }
    }

    .active {
      background: rgba(48, 42, 53, 1);
      color: rgba(255, 255, 255, 1);
    }
  }

  .item-bottom {
    background: url(/static/images/777_02.png) no-repeat;
    background-size: cover;

    .item-ctx {
      max-width: 1200px;
      min-height: 800px;
      margin: 0px auto;
      padding: 60px 88px;
      display: flex;
      background: transparent;

      .left {
        min-width: 175px;

        .title {
          font-size: 40px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          white-space: nowrap;
        }

        .desc {
          margin-top: 41px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 28px;
        }

        .btn-one {
          width: 175px;
          height: 61px;
          line-height: 61px;
          text-align: center;
          background: rgba(241, 79, 74, 1);
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          margin-top: 50px;
          cursor: pointer;
        }
      }

      .right {
        margin-left: 89px;

        .title {
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }

        .rela-prod {
          display: flex;
          flex-wrap: wrap;

          .prod-item {
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0px 3px 6px 0px rgba(51, 51, 51, 0.09);
            padding: 20px;
            width: calc(100% / 2 - 45px);
            margin-right: 45px;
            margin-top: 26px;

            .p-title {
              font-size: 18px;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }

            .p-desc {
              margin-top: 17px;
              font-size: 14px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 20px;
            }

            &:hover {
              background: rgba(241, 79, 74, 0.5);;
            }
          }
        }
      }
    }
  }
}
</style>
