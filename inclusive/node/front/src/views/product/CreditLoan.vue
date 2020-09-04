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
    <mask-layer class='reason-mask' :show='HasCompanys' title-name='' @close="handleClickMask(false)" box-width='550px'
                box-height="300px">
      <template slot='content'>
        <p class="tTitle">提示</p>
        <div class='reason-content'>
          <div class="companyList">
            <p>添加企业且认证成功后可申请贷款</p>
          </div>
          <div class="butns">
            <div class="btns btn-two" @click="handleClickMask(false)">取消</div>
            <div class="btns btn-one" @click="handleClickMask(true)">添加企业</div>
          </div>
        </div>
      </template>
    </mask-layer>
    <mask-layer class='reason-mask' :show='HasCompanysInfo' title-name='' @close="handleClickMask(false)"
                box-width='550px'
                box-height="300px">
      <template slot='content'>
        <p class="tTitle">提示</p>
        <div class='reason-content'>
          <div class="companyList">
            <p>您还没有完善您的贷款需求，是否立即去完善？</p>
          </div>
          <div class="butns">
            <div class="btns btn-two" @click="handleClickMask(false)">取消</div>
            <div class="btns btn-one" @click="handleClickMask(true)">填写贷款需求</div>
          </div>
        </div>
      </template>
    </mask-layer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          title: '综合信用贷', id: 1, desc: '针对小微企业提供的信用、抵押综合类贷款产品，抵押、信用贷款的方式均可。',
          prods: [
            {title: '助业快e贷', desc: '针对个体工商户的信用类贷款，可贷2-50万，随时提前还款，自主把握，方便快捷'},
            {
              title: '普惠贷',
              desc: '针对小微型企业、个体工商户的贷款，信用抵押方式均可，接受房产抵押，抵押率最高可至100%；担保公司担保、保险公司保证保险参保；现金及现金等价物、贵金属、债券和票据等质押；'
            },
            {title: '年审贷', desc: '接受房产、土地使用权抵押，专业担保公司担保等，免除客户每年重新核定授信额度、办理抵质押登记所带来的繁琐手续'},
            {title: '育才贷', desc: '针对幼儿园经营者，抵押、信用贷款的方式均可'},
            {title: '万家贷', desc: '针对酒店经营者，抵押、信用贷款的方式均可'},
          ]
        },
        {
          title: '商业价值贷', id: 2, desc: '通过对小微企业进行商业价值评估提供的贷款产品，缓解小微企业融资困难问题。',
          prods: [
            {title: '融e贷', desc: '拥有核心企业应收账款，供应商可申请融资，无需抵押'},
            {title: '路保贷', desc: '对取得重庆市内“村村通公路”或“干线道路”项目建设提供施工的建筑企业或其法定代表人、实际控制人提供的信贷产品'},
            {title: '农村“一二三”产业融合贷款', desc: '从事农村“一二三”产业相关经营项目的自然人，无需提供抵押，享受担保费财政补贴。'},
            {title: '医保贷', desc: '有稳定医保结算回款的医院、药房、医药公司、诊所等可申请，无需抵押担保，凭合法有效的医保回款证明办理。'},
            {title: '创业担保贷', desc: '创业、再就业人员，吸纳一定失业人员的企业，具体以当地就业部门审核为准，享受财政贴息。'},
          ]
        },
        {
          title: '订单价值贷', id: 3, desc: '针对取得稳定订单、政府采购合同的小微企业提供的信用贷款产品。',
          prods: [
            {title: '订单贷', desc: '针对取得稳定订单的小微企业，无需抵押担保，凭稳定订单办理贷款。'},
            {title: '政采e贷', desc: '拥有政府采购贸易背景及真实订单，信用记录良好，具备行合同、偿还债务的能力；政府采购项目为预算内项目。'},
            {title: '政府采e贷', desc: '对个体工商户及纳税等级为A、B、M级小微企业的信贷产品。纯信用、全线上、随借随还、按日计息；减免税额，纳入增信'},
            {title: '采e贷', desc: '针对政府采购小企业供应商，最高额度300万，随借随还'},
          ]
        },
        {
          title: '水电税务贷', id: 4, desc: '基于企业用电信息、纳税金额确定贷款金额，用于企业生产经营周转的贷款产品。',
          prods: [
            {title: '纳税e贷', desc: '纳税信用等级在B级（含）以上小微企业可申请，纯信用，秒批秒贷，随借随还'},
            {title: '税易贷', desc: '从事合法经营的企事业法人或其他经济组织可申请，按企业实际缴纳的税款确定贷款额度，无需提供担保'},
            {title: '退税贷', desc: '取得或预计取得国家相关税务部门合法退税的小微企业，无需抵押担保，凭合法有效的退税手续办理贷款'},
            {title: '云税贷', desc: '个体工商户及纳税等级为A、B、M级小微企业，缴税好，纯信用、全线上、随借随还、按日计息；减免税额，纳入增信'},
            {title: '云电贷', desc: '个体工商户及纳税等级为A、B、M级小微企业，用电多，纯信用、全线上、随借随还、按日计息；减免税额，纳入增信'},
          ]
        },
        {
          title: '知识价值贷', id: 5, desc: '针对区科技局入库企业，或是纳入重庆市科技型企业库的小微企业提供的贷款产品。',
          prods: [
            {title: '科创贷', desc: '区科技局入库企业可申请，无需抵押物，由政府指定公司提供担保，最高额度500万'},
            {title: '新才e贷', desc: '针对高新技术人才及企业的经营类贷款，信用方式，随时提前还款，自主把握，方便快捷'},
            {title: '高新贷', desc: '针对通过国家高新技术企业认证、获得《高新技术企业证书》的高新技术企业。信用贷款，无需抵押；自主支付，资金灵活；标准审核，量身定制。'},
          ]
        },
      ],
      currItem: {},
      HasCompanys: false,
      HasCompanysInfo: false,
    }
  },
  created() {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].title == this.$route.query.name){
        this.currItem = this.tabs[i];
      }
    }
  },
  methods: {
    tabChange(item) {
      this.currItem = item;
    },
    handleClickMask(bool) {
      if (bool === false) {
        this.HasCompanys = false
        this.HasCompanysInfo = false
      } else if (bool === true) {
        if (this.$store.state.user.myBaseInfo.isRelationCompany === 0) {
          this.$router.push({name: "add-company"})
          return false
        } else if (sessionStorage.getItem('isDkInfo') == 1) {
          this.$router.push({name: "my-enterprice-info"})
          return false
        }
      }
    },
    toPage() {
      if (this.$store.state.user.myBaseInfo.isRelationCompany === 0) {
        this.HasCompanys = true
        return false
      } else {
        this.$router.push({name: "loan-matching"})
        return false
      }
      if (sessionStorage.getItem('isDkInfo') == 1) {
        this.HasCompanysInfo = true
        return false
      } else {
        this.$router.push({name: "loan-matching"})
        return false
      }
      // this.$router.push({path:"/loan-type"})

      // this.$router.push({name: "loan-matching"})
      // this.$router.push({name:'loan-matching'})
    }
  },
}
</script>
<style lang="less" scoped>
* {
  cursor: default;
}

/deep/ .reason-mask .mask-box {
  .tTitle {
    font-size: 20px;
    color: #5e5e5e;
  }

  .mask-title {
    border-bottom: none;
  }

  .mask-content {
    width: 100%;
    padding: 40px;
    text-align: center;
  }

  .icon-box {
    text-align: center;
    margin: 20px 0 30px;
  }

  .iconfont.icon-cuowu {
    font-size: 56px;
    color: rgba(241, 79, 74, 1);
  }

  .companyList {
    text-align: center;
    margin: 30px 0 0 0;

    p {
      font-size: 16px;
    }
  }

  .reason-content {
    text-align: left;
    line-height: 30px;
  }

  .butns {
    width: 270px;
    height: 40px;
    margin: 0 auto;
  }

  .btn-one {
    float: right;
    display: inline-block;
    width: 123px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    //padding:0px 15px;
    cursor: pointer;
    border: 2px solid rgba(204, 204, 204, 0);
    background: rgba(241, 79, 74, 1);
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 30px auto 0;
    border-radius: 5px;
  }

  .btn-two {
    float: left;
    border-radius: 5px;
    display: inline-block;
    width: 123px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    //padding:0px 15px;
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 1);
    background: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    margin: 30px auto 0;
  }
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
