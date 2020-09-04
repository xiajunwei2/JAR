<template>
  <div class="companyListDetail">
    <el-row class="name">
      <el-col :span="8">
        {{companyName}}
        <template v-if="statue==1">
          <span style="color:#ccc;padding:10px 0;">未认证</span>
        </template>
        <template v-else>
          <div class="wrz">
            <!-- <img src="../assets/img.png" alt style /> -->
            <span>已认证</span>
          </div>
        </template>
      </el-col>
    </el-row>
    <div class="LoanManageDetail-content">
      <el-tabs v-model="activeName1" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <div class="meg-table">
            <div class="item-row">
              <div class="items">
                <div class="item-title">企业名称</div>
                <div class="item-content">{{companyName}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">管理员姓名</div>
                <div class="item-content">{{workerName}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">管理员手机</div>
                <div class="item-content">{{phoneNumber}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">法人姓名</div>
                <div class="item-content">{{legalPerson}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">法人手机</div>
                <div class="item-content">{{legalPersonPhoneNumber}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">法人身份证</div>
                <div class="item-content">{{idCard}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">社会信用代码</div>
                <div class="item-content">{{businessLicense}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">营业执照</div>
                <div class="item-content">{{businessLicensePhotos}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">行业类型</div>
                <div class="item-content">{{industryTypeStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">经营范围</div>
                <div class="item-content">{{busRange}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">人员规模</div>
                <div class="item-content">{{staffCountStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">企业注册地</div>
                <div class="item-content">{{registerAddressStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">企业经营地</div>
                <div class="item-content">{{businessAddressStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">平台注册时间</div>
                <div class="item-content">{{createdTime|datetimeformat}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">平台认证时间</div>
                <div class="item-content">{{createdTime|datetimeformat}}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="经营状况" name="second">
          <div class="meg-table">
            <div class="item-row">
              <div class="items">
                <div class="item-title">经营年限</div>
                <div class="item-content">{{busYearsStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">近一年度营业额</div>
                <div class="item-content">{{lastTurnover}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">近一年实缴税额</div>
                <div class="item-content">{{lastTaxAmount}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">固定资产净值</div>
                <div class="item-content">{{fixAsset}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">总资产</div>
                <div class="item-content">{{asset}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">总负债</div>
                <div class="item-content">{{liabilities}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">净资产/所有者权益</div>
                <div class="item-content">{{fixAsset}}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他资质" name="third">
          <div class="meg-table">
            <div class="item-row">
              <div class="items">
                <div class="item-title">是否为政府采购供应商</div>
                <div class="item-content">{{purchaserStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">是否有抵押物</div>
                <div class="item-content">{{hasMortgageStr}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">有否有企业信用评价等级证书</div>
                <div class="item-content">{{qyxyFile}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">有否有纳税信用等级证书</div>
                <div class="item-content">{{taxFile}}</div>
              </div>
            </div>
            <div class="item-row">
              <div class="items">
                <div class="item-title">是否为高新技术认定企业</div>
                <div class="item-content">{{highFile}}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Api from "@/api/api.js";
export default {
  name: "companyListDetail",
  data() {
    return {
      statue: 2,
      activeName1: "first",
      companyName: null,
      workerName: null,
      phoneNumber: null,
      authenticationStatus: null,
      authenticationStatusStr: null,
      legalPerson: null,
      legalPersonPhoneNumber: null,
      idCard: null,
      idCardPhotos: null,
      businessLicense: null,
      businessLicensePhotos: null,
      industryType: null,
      industryTypeStr: null,
      staffCount: null,
      staffCountStr: null,
      busYears: null,
      busYearsStr: null,
      busRange: null,
      registerAddress: null,
      businessAddress: null,
      registerAddressStr: null,
      businessAddressStr: null,
      lastTurnover: null,
      fixAsset: null,
      lastTaxAmount: null,
      asset: null,
      liabilities: null,
      debtRatio: null,
      currentRatio: null,
      quickRatio: null,
      cashRatio: null,
      qyxyGrade: null,
      qyxyGradeStr: null,
      qyxyFile: null,
      hasMortgage: null,
      hasMortgageStr: null,
      mortgageValue: null,
      taxCredit: null,
      taxCreditStr: null,
      taxFile: null,
      highTech: null,
      highTechStr: null,
      highFile: null,
      purchaser: null,
      purchaserStr: null,
      purchaserFile: null,
      createdTime: null,
    };
  },
  created() {
    let query = {
      // id: this.$route.query.id,
      companyId: this.$route.query.id,
    };
    let vm=this
    this.$store.commit("loadingChange", true);
    Api.loanInfoMaterialgetLoanMaterial(query).then((res) => {
      this.$store.commit("loadingChange", false);
      if (res.code == 0) {
        vm.companyName = res.content.companyName;
        vm.workerName = res.content.workerName;
        vm.phoneNumber = res.content.phoneNumber;
        vm.authenticationStatus = res.content.authenticationStatus;
        vm.authenticationStatusStr = res.content.authenticationStatusStr;
        vm.legalPerson = res.content.legalPerson;
        vm.legalPersonPhoneNumber = res.content.legalPersonPhoneNumber;
        vm.idCard = res.content.idCard;
        vm.idCardPhotos = res.content.idCardPhotos;
        vm.businessLicense = res.content.businessLicense;
        vm.businessLicensePhotos = res.content.businessLicensePhotos;
        vm.industryType = res.content.industryType;
        vm.industryTypeStr = res.content.industryTypeStr;
        vm.staffCount = res.content.staffCount;
        vm.staffCountStr = res.content.staffCountStr;
        vm.busYears = res.content.busYears;
        vm.busYearsStr = res.content.busYearsStr;
        vm.busRange = res.content.busRange;
        vm.registerAddress = res.content.registerAddress;
        vm.businessAddress = res.content.businessAddress;
        vm.registerAddressStr = res.content.registerAddressStr;
        vm.businessAddressStr = res.content.businessAddressStr;
        vm.lastTurnover = res.content.lastTurnover;
        vm.fixAsset = res.content.fixAsset;
        vm.lastTaxAmount = res.content.lastTaxAmount;
        vm.asset = res.content.asset;
        vm.liabilities = res.content.liabilities;
        vm.debtRatio = res.content.debtRatio;
        vm.currentRatio = res.content.currentRatio;
        vm.quickRatio = res.content.quickRatio;
        vm.cashRatio = res.content.cashRatio;
        vm.qyxyGrade = res.content.qyxyGrade;
        vm.qyxyGradeStr = res.content.qyxyGradeStr;
        vm.qyxyFile = res.content.qyxyFile;
        vm.hasMortgage = res.content.hasMortgage;
        vm.hasMortgageStr = res.content.hasMortgageStr;
        vm.mortgageValue = res.content.mortgageValue;
        vm.taxCredit = res.content.taxCredit;
        vm.taxCreditStr = res.content.taxCreditStr;
        vm.taxFile = res.content.taxFile;
        vm.highTech = res.content.highTech;
        vm.highTechStr = res.content.highTechStr;
        vm.highFile = res.content.highFile;
        vm.purchaser = res.content.purchaser;
        vm.purchaserStr = res.content.purchaserStr;
        vm.purchaserFile = res.content.purchaserFile;
        vm.createdTime = res.content.createdTime;
      } else {
        this.$message.error(res.msg);
      }
    });
  },
  methods: {
    handleClick() {},
  },
};
</script>
<style scoped lang="less">
.wrz {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-left: 10px;
  img {
    width: 30px;
    height: 30px;
  }
}
.LoanManageDetail-content {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  height: 60vh;
}
.meg-table {
  border: 1px solid #93c9ff;
  border-bottom: none;
  border-radius: 4px;
  overflow: hidden;

  .item-row {
    display: flex;
    border-bottom: 1px solid #93c9ff;
  }

  .items {
    flex: 1;
    display: flex;

    .item-title {
      width: 240px;
      background: #deefff;
      display: flex;
      align-items: center;
      padding: 8px 10px;
      border-right: 1px solid #93c9ff;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }

    .border-left {
      border-left: 1px solid #93c9ff;
    }

    .item-content {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 8px 10px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
    }
  }
}
.companyListDetail {
  .name {
    display: flex;
    justify-content: flex-start;
    background: #fff;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    height: 8vh;
    border-radius: 10px;
    .el-col {
      display: flex;
      align-items: center;
      text-align: left;
      padding-left: 50px;
    }
  }
}
.meg-table .items .item-title {
  background-color: #fff;
}
</style>
