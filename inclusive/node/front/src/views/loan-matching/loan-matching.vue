<template>
  <div id="mach">
    <div class="mach">
      <div class="center mach_head">
        <div class="company">
          <div class="company_title">{{ companyInfo.companyName }}</div>
          <Icon class="company_icon" color="#31d406" type="ios-checkmark-circle"/>
          <span style="color:#fff;marginLeft:4px">{{ companyInfo.authenticationStatusStr }}</span>
          <!-- <Icon class="company_icon" color="#cccccc" type="ios-checkmark-circle" /> -->
        </div>
        <div class="demand">
          <div class="demand_mine">
            我的贷款需求: <span>{{ companyInfo.loanMoney }}</span>万元
          </div>
          <div class="demand_date">贷款期限:{{ companyInfo.loanCycleStr }}月</div>
        </div>
      </div>
      <div class="center mach_main">
        <div class="demand_info">为您匹配到以下产品:</div>
        <div class="line"></div>
        <div class="main_item" v-for="(item,index) in prodList">
          <div class="item_head">
            <div class="head_left"></div>
            <div class="head_right">
              <div class="right_title">{{ item.loanTypeName }}</div>
              <!--              <div class="right_en">Credit loan</div>-->
            </div>
          </div>
          <div class="item_body">
            <div class="body_items" v-for="(items,index) in item.matchLoanProductVos" :key="index">
              <div class="item_title">{{ items.productName }}</div>
              <div class="item_percent">{{ (items.suitability - Math.ceil(Math.random() * 20)) + '%' }}</div>
              <div class="item_suitability">匹配度</div>
              <div class="item_foot">
                <div class="item_type">
                  <div class="type_left">担保类型</div>
                  <div class="type_right">{{ items.loanType }}</div>
                </div>
                <div class="item_type">
                  <div class="type_left">贷款利率</div>
                  <div class="type_right">{{ items.loanRate }}%</div>
                </div>
                <div class="item_btn perfect_btn" @click="toPage(items)">立即申请</div>
              </div>
            </div>
          </div>
        </div>
        <!--        <div class="main_item">-->
        <!--          <div class="item_head">-->
        <!--            <div class="head_left"></div>-->
        <!--            <div class="head_right">-->
        <!--              <div class="right_title">抵押贷</div>-->
        <!--              <div class="right_en">Mortgage loan</div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="item_body">-->
        <!--            <div class="body_items" v-for="(item,index) in mortgageList" :key="index">-->
        <!--              <div class="item_title">{{item.title}}</div>-->
        <!--              <div class="item_percent">{{(98-Math.ceil(Math.random()*20))+'%'}}</div>-->
        <!--              <div class="item_suitability">匹配度</div>-->
        <!--              <div class="item_foot">-->
        <!--                <div class="item_type">-->
        <!--                  <div class="type_left">担保类型</div>-->
        <!--                  <div class="type_right">{{item.type}}</div>-->
        <!--                </div>-->
        <!--                <div class="item_type">-->
        <!--                  <div class="type_left">贷款利率</div>-->
        <!--                  <div class="type_right">3.85%-6.55%</div>-->
        <!--                </div>-->
        <!--                <div class="item_btn perfect_btn" @click="toPage(item)">立即申请</div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="perfect">
        <div class="main_item center">
          <div class="item_head">
            <div class="head_msg">
              <Icon color="#fff" type="ios-alert"/>
              <div class="msg_content">以下产品需要您完善资料</div>
            </div>
          </div>
          <div class="item_body perfect_body">
            <div class="body_items perfect_items" v-for="(item,index) in noList" :key="index">
              <div class="item_title">{{ item.title }}</div>
              <div class="item_percent">{{ (65 - Math.ceil(Math.random() * 30)) + '%' }}</div>
              <div class="item_suitability">匹配度</div>
              <div class="item_foot perfect_foot">
                <div class="item_type">
                  <div class="type_left">担保类型</div>
                  <div class="type_right">{{ item.type }}</div>
                </div>
                <div class="item_type">
                  <div class="type_left">贷款利率</div>
                  <div class="type_right">3.85%-6.55%</div>
                </div>
                <div class="item_btn perfect_btn">立即申请</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {COM_SERVICE as http} from '@/api/request'

export default {
  data() {
    return {
      userId: '',
      companyInfo: '', // 企业信息
      customerId: '',
      customInfo: {},
      creditLoanList: [
        {title: "政府采e贷", type: '商业价值信用贷'},
        {title: "新才e贷", type: '人才贷'},
        {title: "科创贷", type: '知识价值信用贷'},
        {title: "路保贷", type: '商业价值信用贷'},
      ],
      mortgageList: [
        {title: "个人助业贷", type: '住房抵押贷'},
        {title: "法人按揭贷", type: '住房抵押贷'},
        {title: "厂房贷", type: '工业厂房抵押贷'},
      ],
      noList: [
        {title: "云电贷", type: '信用贷'},
        {title: "云税贷", type: '信用贷'},
        {title: "科创e贷", type: '信用贷'},
      ],
      companyId: '', // 企业id
      prodList: []
    }
  },
  created() {

    this.userId = this.$store.state.user.myBaseInfo.userId

    if (sessionStorage.getItem('company_id') !== null)
      this.companyId = sessionStorage.getItem('company_id')
    else
      this.companyId = this.$store.state.user.myBaseInfo.companyId

    if (this.$route.query.companyId)
      this.companyId = this.$route.query.companyId;
    // console.log(this.userId)
    // console.log(this.$store.state.user.myBaseInfo.id)
    this.getCurrentInfo()
    this.getLoanProductList();
  },
  methods: {
    toPage(item) {
      let params = {
        productId: 1,
        companyId: this.companyId,
        userId: this.userId,
        item: item,
      }
      this.$router.push({name: 'apply-info', params: params})
    },
    // 获取企业基本信息
    getCurrentInfo() {
      let params = {
        companyId: this.companyId
      }
      http.post('/loanInfoMaterial/getLoanMaterial', params, 'nauth').then(res => {
        console.log(res)
        if (res.code == 0 && res.content) {
          this.companyInfo = res.content;
        }
        // this.customInfo=res
        // this.customerId=res.id
        // console.log(res)
      })
    },
    // 获取贷款产品列表数据
    getLoanProductList() {
      http.post('/loanInfo/getMatchProductInfo', {companyId: this.companyId}, 'nauth')
        .then(res => {
          this.prodList = res.content
        })
    }
  }
}
</script>

<style lang="less" scoped>
#mach {
  background: url('../../../static/images/bbg.png') no-repeat;
  background-size: cover;
  padding-top: 24px;
}

.center {
  width: 1200px;
  margin: 0 auto;
  user-select: none;
}

.mach_head {
  // margin-top: 24px;
  height: 142px;
  background-color: #e0240e;
  box-sizing: border-box;
  padding-top: 36px;
  padding-left: 30px;

  .company {
    display: flex;
    justify-content: flex-start;

    .company_icon {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
    }

    img {
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }

    .company_title {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 30px;
      margin-right: 15px;
    }
  }

  .demand {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .demand_mine {
      color: #fff;

      span {
        color: #f1d746;
        font-size: 20px;
        margin: 0 10px;
      }
    }

    .demand_date {
      color: #fff;
      margin-left: 40px;
    }
  }
}

.mach_main,
.perfect {
  margin-top: 25px;
  display: flex;
  flex-direction: column;

  .demand_info {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  .line {
    height: 1px;
    background: rgba(233, 228, 228, 1);
    margin-top: 22px;
  }

  .main_item {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding-bottom: 55px;
    // background-color: #faf9fd;
    .item_head {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .head_left {
        width: 6px;
        height: 33px;
        background: linear-gradient(-90deg,
        rgba(243, 18, 34, 1) 0%,
        rgba(248, 67, 104, 1) 53%,
        rgba(255, 81, 47, 1) 100%);
      }

      .head_right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 15px;

        .right_title {
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 8px;
        }

        .right_en {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 300;
          color: rgba(51, 51, 51, 1);
        }
      }
    }

    .item_body {
      margin-top: 40px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .item_foot {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: #fafafa;
        box-sizing: border-box;
        padding-top: 22px;
        padding-bottom: 24px;
        width: 265px;
        height: 147px;
      }

      .body_items {
        height: 100%;
        width: 286px;
        background-color: #fff;
        display: flex;
        box-sizing: border-box;
        padding-top: 35px;
        padding-bottom: 40px;
        align-items: center;
        flex-direction: column;
        margin-right: 16px;
        margin-top: 30px;

        .item_title {
          font-size: 26px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 35px;
        }

        .item_percent {
          color: #f14f4a;
          font-size: 50px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .item_suitability {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(165, 165, 165, 1);
          margin-bottom: 33px;
        }

        .item_type {
          display: flex;
          justify-content: flex-start;
          width: 200px;
          margin-bottom: 12px;

          .type_left {
            font-size: 13px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(175, 178, 188, 1);
            margin-right: 22px;
          }

          .type_right {
            font-size: 15px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(15, 24, 52, 1);
          }
        }

        .item_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          width: 206px;
          height: 31px;
          background: rgba(252, 63, 50, 1);
          border-radius: 15px;
          margin-top: 10px;
          cursor: pointer;
        }
      }

      .body_items:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}

.perfect {
  background-color: rgba(230, 233, 238, .5);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 75px;
  // height: 368px;
  .perfect_body {
    margin-top: 0 !important;
  }

  .perfect_items {
    background: linear-gradient(0deg,
    rgba(212, 218, 223, 1) 0%,
    rgba(247, 249, 253, 1) 100%);
  }

  .perfect_foot {
    background-color: #e9ebed !important;
  }

  .perfect_btn {
    background: rgba(216, 218, 220, 1) !important;
    color: #8f9499 !important;
  }

  .head_msg {
    display: flex;
    justify-content: flex-start;
    width: 238px;
    height: 30px;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
    background: rgba(68, 67, 65, 1);
    border-radius: 15px;

    img {
      width: 18px;
      height: 18px;
    }

    .msg_content {
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left: 5px;
    }

    .ivu-icon {
      font-size: 18px;
    }
  }
}
</style>
