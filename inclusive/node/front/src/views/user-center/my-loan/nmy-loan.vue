<template>
  <div class="loan">
    <div v-if="company.length > 0">
      <div class="company-item" v-for="item in company" :key="item.customerId">
        <div class="company-info">
          <div class="c-top">
            <div class="left">
              <div class="c-title">{{ item.companyByUserVo && item.companyByUserVo.companyName }}</div>
              <Icon type="ios-checkmark-circle" class="c-auth-img"/>
              <div class="c-auth">
                {{ item.companyByUserVo && item.companyByUserVo.authenticationStatus ? '已认证' : '审核中' }}
              </div>
            </div>
            <div class="btns">
              <div class="btn-dmd"
                   v-show='item.companyByUserVo && item.companyByUserVo.authenticationStatus != -1 && item.companyByUserVo.authenticationStatus != 0'
                   @click="toPage('edit',item)">修改贷款需求
              </div>
              <div class="btn-one"
                   v-show='item.companyByUserVo && item.companyByUserVo.authenticationStatus != -1 && item.companyByUserVo.authenticationStatus != 0 && item.companyByUserVo.loanMoney != null'
                   @click="toPage('loan-matching',item)">一键贷款
              </div>
            </div>
          </div>
          <div class="demand" v-if="item.companyByUserVo && item.companyByUserVo.loanMoney">
            <div style="display:inline-block;">我的贷款需求：</div>
            <span>{{ item.companyByUserVo && item.companyByUserVo.loanMoney }}万元</span></div>
        </div>
        <div class="table-data" v-if="item.loanInfoList && item.loanInfoList.length>0">
          <div class="table-th">
            <div>产品名称</div>
            <div>贷款金额</div>
            <div>贷款周期</div>
            <div>发布日期</div>
            <div>操作人</div>
            <div>当前状态</div>
            <div>操作</div>
          </div>
          <div class="table-td" v-for="sitem in item.loanInfoList" :key="sitem.orderId">
            <div class="td">
              <div class="title">{{ sitem.productName }}</div>
              <div class="bank-box">
                <img :src="sitem.companyLogo && sitem.companyLogo.value" alt="" class="bank-img">
              </div>
            </div>
            <div class="td">{{ sitem.loanMoney }}万元</div>
            <div class="td">{{ sitem.loanCycleStr }}个月</div>
            <div class="td">{{ $moment(sitem.applyTime * 1000).format('YYYY-MM-DD') }}</div>
            <div class="td">{{ sitem.approveStatus === 0 ? sitem.workerName : sitem.operatorName }}</div>
            <div class="td status">{{ sitem.approveStatusStr }}</div>
            <div class="td detail" @click="detail(item,sitem)">查看详情</div>
          </div>
        </div>
        <div class="no-data" v-if="item.loanInfoList.length==0">
          <img src="/static/images/no-release.png" alt="" class="no-img">
          <div class="no-text">尚未发布贷款需求</div>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <p>您还没有添加企业，添加企业后可申请贷款</p>
      <div class="btns btn-one" @click="$router.push({name:'add-company'})">去添加企业</div>
    </div>
    <mask-layer class='reason-mask' :show='HasCompanys' title-name='' @close="handleClickMask(false)" box-width='550px'
                box-height="320px">
      <template slot='content'>
        <p class="tTitle">提示</p>
        <div class='reason-content'>
          <div class="companyList">
            <p>欢迎来到普惠金融服务平台</p>
            <p>申请贷款需要添加企业信息，是否现在添加？</p>
          </div>
          <div class="butns">
            <div class="btns btn-two" @click="handleClickMask(false)">取消</div>
            <div class="btns btn-one" @click="handleClickMask(true)">添加企业</div>
          </div>
        </div>
      </template>
    </mask-layer>
    <!-- <div class="company-item">
      <div class="company-info">
          <div class="c-top">
              <div class="left">
                  <div class="c-title">重庆旷云信息科技有限公司</div>
                  <Icon type="ios-checkmark-circle" class="c-auth-img" />
                  <div class="c-auth">已认证</div>
              </div>
              <div class="btns">
                  <div class="btn-dmd" @click="toPage('update-enterprice-info')">修改贷款需求</div>
                  <div class="btn-one" @click="toPage('loan-matching')">一键贷款</div>
              </div>
          </div>
          <div class="demand">
              <div>我的贷款需求：<span>2,000,000</span></div>
              <div>贷款周期：36个月以上</div>
          </div>
      </div>
      <div class="no-data">
          <img src="/static/images/no-release.png" alt="" class="no-img">
          <div class="no-text">尚未发布贷款需求</div>
      </div>

    </div> -->
  </div>
</template>

<script>
import {COM_SERVICE as http} from "@/api/request.js";

export default {
  data() {
    return {
      HasCompanys: false,
      bankimg: require('@/assets/images/jq/bank_zhaoshang.png'),
      company: []
    }
  },
  created() {
    if (this.$store.state.user.myBaseInfo.companyId !== null) {
      let params = {companyId: this.$store.state.user.myBaseInfo.companyId}
      http.post('/loanInfoMaterial/perfectLoanMaterial', params, 'nauth')
        .then(res => {
          if (res.code == 0) {
            sessionStorage.setItem('isDkInfo', res.content.isPerfectLoan)
          }
        }).catch(res => {
      })
    } else {
      sessionStorage.setItem('isDkInfo', 1)
    }
    this.getCompanyList();
  },
  methods: {
    handleClickMask(bool) {
      if (bool === false)
        this.HasCompanys = false
      else if (bool === true) {
        this.$router.push({name: "add-company"})
      }
    },
    detail(companyData, loanData) {
      let companyId = companyData && companyData.companyByUserVo && companyData.companyByUserVo.id; // 公司id
      let loanId = loanData && loanData.loanId; // 产品id
      this.$router.push({path: "/user-center/loandetail", query: {companyId, loanId}})
    },
    toPage(name, data) {
      let companyId = data && data.companyByUserVo && data.companyByUserVo.id; // 公司id
      if (name == 'edit') {
        // 修改贷款需求
        this.$router.push({name: 'my-enterprice-info', query: {id: companyId}})
      } else {
        this.$router.push({name: name, query: {id: companyId}});
      }
    },
    getCompanyList() {
      http.post('/loanInfo/loanInfoByUser', {userId: this.$store.state.user.myBaseInfo.userId}, 'nauth')
        .then(res => {
          if (res.code == 0) {
            this.company = res.content || [];
            if (this.company.length === 0)
              this.HasCompanys = true
          }
        }).catch(res => {
      })
      // http.post("/customerUser/getUserLoanOrder",{userId:this.$store.state.user.myBaseInfo.id},'nauth').then(res=>{
      //     this.company = res;
      // })
    }
  },
}
</script>
<style lang="less" scoped>
* {
  cursor: default;
}

.noData {
  width: 100%;
  text-align: center;
  margin-top: 10%;

  p {
    display: inline-block;
    font-size: 18px;
    margin-right: 10px;
  }
}

.btns {
  display: flex;

  .next-btn {
    width: 163px;
    height: 41px;
    line-height: 41px;
    text-align: center;
    background: rgba(241, 79, 74, 1);
    border-radius: 3px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 44px 29px 54px;
    cursor: pointer;
  }

  .prev {
    background: #fff;
    border: 2px solid rgba(241, 79, 74, 1);
    color: rgba(241, 79, 74, 1);
  }
}

.btn-one {
  display: inline-block;
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  //padding:0px 15px;
  cursor: pointer;
  border: 2px solid rgba(204, 204, 204, 0);
  background: rgba(241, 79, 74, 1);
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  //margin: 30px auto 0;
}

.loan {
  .company-item {
    background-color: white;
    margin-bottom: 10px;

    .company-info {
      padding: 35px 33px 0px;
      // height:141px;
      position: relative;

      .c-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;

        .left {
          display: flex;
          align-items: center;

          .c-title {
            font-size: 24px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }

          .c-auth-img {
            width: 17px;
            height: 16px;
            color: #31D406;
            font-size: 20px;
            margin: 0 10px;
            vertical-align: sub;
          }

          .c-auth {
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }

        .btns {
          display: flex;
          align-items: center;

          .btn-dmd {
            width: 163px;
            height: 41px;
            line-height: 41px;
            border: 2px solid rgba(241, 79, 74, 1);
            border-radius: 3px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(241, 79, 74, 1);
            text-align: center;
            margin-right: 16px;
            cursor: pointer;
          }

          .btn-one {
            width: 163px;
            height: 41px;
            line-height: 41px;
            background: rgba(243, 31, 25, 1);
            border-radius: 3px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            cursor: pointer;
          }
        }
      }

      .demand {
        display: flex;
        padding: 10px 0 31px 0;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);

        div {
          margin-right: 15px;
        }

        span {
          color: #D6352E;
        }
      }

      &::after {
        content: "";
        width: calc(100% - 66px);
        height: 2px;
        background: rgba(51, 51, 51, 1);
        opacity: 0.09;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .table-data {
      .table-th {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 42px;
        line-height: 42px;

        div {
          width: calc(100% / 7);
          text-align: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(167, 171, 195, 1);
        }
      }

      .table-td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        //margin: 40px 0;
        padding: 40px 0;
        position: relative;

        .td {
          width: calc(100% / 7);
          text-align: center;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(167, 171, 195, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          cursor: default;

          .title {
            padding: 13px 4px;
            width: 100px;
            height: 57px;
            //line-height: 57px;
            background: rgba(206, 6, 21, 1);
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
          }

          .bank-box {
            width: 100px;
            height: 50px;
            line-height: 50px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(245, 47, 62, 1);
            border-top: none;
            overflow: hidden;

            .bank-img {
              width: 100%;
              height: 100%;
              // height:24px;
            }
          }
        }

        .status {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(42, 177, 6, 1);
        }

        .detail {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          text-decoration: underline;
          color: rgba(51, 51, 51, 1);
          cursor: pointer;
        }

        &::after {
          content: "";
          width: calc(100% - 66px);
          height: 1px;
          border-bottom: 2px dashed rgba(179, 179, 179, 1);
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
        }

        &:last-child {
          &::after {
            content: "";
            display: none;
          }
        }
      }
    }

    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 300px;

      .no-img {
        width: 85px;
        height: 68px;
      }

      .no-text {
        margin-top: 33px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(194, 194, 194, 1);
      }
    }
  }
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
</style>
