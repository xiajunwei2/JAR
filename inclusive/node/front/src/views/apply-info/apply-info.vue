<template>
  <div id="apply_info">
    <div class="apply_info center">
      <div class="info_head">
        <div class="head_left">
          <div class="left_title">物业贷</div>
          <div class="left_en">Personal Center</div>
          <div class="left_foot">小投资 高回报</div>
        </div>
        <div class="head_right">
          <div class="right_top">
            <div>贷款额度: <span>0-100万</span></div>
            <div class="top_center">贷款利率: <span>5.5%-6%</span></div>
            <div>贷款周期: <span>6-36个月</span></div>
          </div>
          <div class="right_bott">
            <div>贷款类型: <span>知识价值信用贷</span></div>
          </div>
        </div>
      </div>
      <div class="info_form">
        <Steps :current="setNum">
          <Step title="STEP1" content="基本信息"></Step>
          <Step title="STEP2" content="经营状况"></Step>
          <Step title="STEP3" content="补充资质"></Step>
        </Steps>
        <div v-if="setNum === 0">
          <div class="form_head">
            <div class="head_left"></div>
            <div class="head_right">申请资料</div>
          </div>
          <div class="line"></div>
          <div class="form_item">
            <div class="item_title">贷款金额</div>
            <input type="text" v-model="params.loanMoney" placeholder="贷款金额" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">贷款周期</div>
            <input type="text" v-model="params.loanCycleStr" placeholder="贷款周期" disabled/>
            <!--          <i-select v-model="params.loanCycle" style="width:736px">-->
            <!--            <i-option v-for="(item,index) in cycleList" :value="item.code" :key="index">{{ item.value }}</i-option>-->
            <!--          </i-select>-->
          </div>
          <div class="form_item">
            <div class="item_title">企业名称</div>
            <input type="text" v-model="params.companyName" placeholder="企业名称" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">社会信用代码</div>
            <input type="text" v-model="params.businessLicense" placeholder="社会信用代码" disabled/>
          </div>
          <div class="form_item license">
            <div class="item_title">营业执照</div>
            <div class="item_upload">
              <div class="uplaod_img" v-for="item in params.businessLicensePhotos">
                <img :src="item.value" alt="">
              </div>
              <!--            <div class="upload_btn">-->
              <!--              <div class="btn_icon">-->
              <!--                <img src="../../assets/images/jq/reflush.png" alt="">-->
              <!--              </div>-->
              <!--              <div class="re_submit">-->
              <!--                <Upload :show-upload-list="false" :on-success="uploadBusSuccess" :headers="headers" :action="actionUrl">-->
              <!--                  <div>重新上传</div>-->
              <!--                </Upload>-->
              <!--              </div>-->
              <!--            </div>-->
            </div>
          </div>
          <div class="form_item">
            <div class="item_title">注册地址</div>
            <input type="text" v-model="params.registerAddressStr" placeholder="注册地址" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">经营地址</div>
            <input type="text" v-model="params.businessAddressStr" placeholder="经营地址" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">行业类型</div>
            <input type="text" v-model="params.industryTypeStr" placeholder="行业类型" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">经营范围</div>
            <input type="textarea" v-model="params.busRange" placeholder="经营范围" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">法人姓名</div>
            <input type="text" v-model="params.legalPerson" placeholder="法人姓名" disabled/>
            <!--          <i-select v-model="params.staffCount" style="width:736px; height:43px">-->
            <!--            <i-option v-for="(item,index) in peopleList" :value="item.code" :key="index">{{ item.value }}</i-option>-->
            <!--          </i-select>-->
          </div>

          <div class="form_item">
            <div class="item_title">法人身份证</div>
            <input type="text" v-model="params.idCard" placeholder="法人身份证" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">申请人姓名</div>
            <input type="text" v-model="params.workerName" placeholder="申请人姓名" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">申请人手机号</div>
            <input type="text" v-model="params.phoneNumber" placeholder="申请人手机号" disabled/>
          </div>
          <!--        <div class="form_item license" v-if="false">-->
          <!--          <div class="item_title">高新技术企业认定证书</div>-->
          <!--          <div class="item_upload">-->
          <!--            <div class="uplaod_img">-->
          <!--              <img :src="params.highFile? uploadImg.deafult:params.highFile" alt="">-->
          <!--            </div>-->
          <!--            <div class="upload_btn">-->
          <!--              <div class="btn_icon">-->
          <!--                <img src="../../assets/images/jq/reflush.png" alt="">-->
          <!--              </div>-->
          <!--              <div class="re_submit">-->
          <!--                <Upload :show-upload-list="false" :on-success="uploadsuccess" :headers="headers" :action="actionUrl">-->
          <!--                  <div>重新上传</div>-->
          <!--                </Upload>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
        <div v-if="setNum === 1">
          <div class="form_item">
            <div class="item_title">人员规模</div>
            <input type="text" v-model="params.staffCountStr" placeholder="人员规模" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">经营年限</div>
            <input type="text" v-model="params.busYearsStr" placeholder="经营年限" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">近一年度营业额</div>
            <input type="text" v-model="params.lastTurnover" placeholder="近一年度营业额" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">近一年缴税额</div>
            <input type="text" v-model="params.lastTaxAmount" placeholder="近一年缴税额" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">固定资产净值</div>
            <input type="text" v-model="params.fixAsset" placeholder="固定资产净值" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">总资产</div>
            <input type="text" v-model="params.asset" placeholder="总资产" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">总负债</div>
            <input type="text" v-model="params.liabilities" placeholder="总负债" disabled/>
          </div>
          <div class="form_item">
            <div class="item_title">净资产/所有者权益</div>
            <input type="text" v-model="params.netAssets" placeholder="净资产/所有者权益" disabled/>
          </div>
        </div>
        <div v-if="setNum === 2">
          <div class="form_item license">
            <div class="item_title">企业信用评价等级证书</div>
            <div class="item_upload">
              <div class="uplaod_img" v-for="item in params.qyxyFileNode">
                <img :src="item.value" alt="">
              </div>
            </div>
          </div>
          <div class="form_item license">
            <div class="item_title">纳税信用等级证书</div>
            <div class="item_upload">
              <div class="uplaod_img" v-for="item in params.taxFileNode">
                <img :src="item.value" alt="">
              </div>
            </div>
          </div>
          <div class="form_item license">
            <div class="item_title">高新技术认定证书</div>
            <div class="item_upload">
              <div class="uplaod_img" v-for="item in params.highFileNode">
                <img :src="item.value" alt="">
              </div>
            </div>
          </div>
          <div class="form_item license">
            <div class="item_title">政府采购供应商合同</div>
            <div class="item_upload">
              <div class="uplaod_img" v-for="item in params.purchaserFileNode">
                <img :src="item.value" alt="">
              </div>
            </div>
          </div>
          <div class="form_item">
            <div class="item_title">是否有抵押物</div>
            {{ params.hasMortgageStr }},抵押物价值{{ params.mortgageValue }}万元
          </div>
        </div>
        <div class="form_foot">
          <div class="edit_info" @click="editInfo">修改资料</div>
          <div class="apply" v-if="setNum!==2" @click="next">下一步</div>
          <div class="apply" v-if="setNum===2" @click="SubFrom">提交申请</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getToken} from '@/utils/localStorage.js'
import {COM_SERVICE as http} from '@/api/request'

export default {
  data() {
    return {
      setNum: 0,
      uploadImg: {
        deafult: require('../../../static/images/xypj.jpg'),
        active: ''
      },
      cycleList: [],
      typeList: [],
      peopleList: [],
      date: '',
      type: '',
      perNum: '',
      actionUrl: process.env.BASE_API + '/phjr-manager-service/file/uploadFile',
      // actionUrl:'http://192.168.0.37:9999/phjr-manager-service/file/uploadFile',
      params: {
        liabilities: '',
        loanMoney: '',
        loanCycle: '',
        mortgageValue: '',
        hasMortgageStr: '',
        qyxyFileNode: '',
        taxFileNode: '',
        highFileNode: '',
        purchaserFileNode: '',
        busYearsStr: '',
        phoneNumber: '',
        workerName: '',
        idCard: '',
        legalPerson: '',
        busRange: '',
        industryTypeStr: '',
        businessLicense: '',
        staffCountStr: '',
        businessAddressStr: '',
        registerAddressStr: '',
        companyName: '',
        loanCycleStr: '',
        customerId: '',
        userId: '',
        productId: '',
        loadMoney: '',
        loadCycle: '',
        customerName: '',
        indutryType: '',
        staffCount: '',
        businessIcense: '',
        busYears: '',
        lastTurnover: '',
        lastTaxAmount: '',
        highFile: '',
        fixAsset: '',
        asset: '',
        debtRatio: '',
        netAssets: '',
        companyId: '',
        product: ''
      }
    }
  },
  created() {
    // this.getType()
    console.log(this.$route.params)
    this.params.product = this.$route.params.item.productId
    this.params.companyId = this.$route.params.companyId
    this.params.productId = this.$route.params.productId
    this.params.userId = this.$route.params.userId
    console.log(this.myBaseInfo)
    this.getDataCompany();
  },
  computed: {
    headers() {
      return {'token': getToken()}
    },
    myBaseInfo() {
      return this.$store.state.user.myBaseInfo
    },
  },
  methods: {
    editInfo() {
      this.$router.push({name: 'my-enterprice-info', query: {id: this.params.companyId}})
    },
    next() {
      this.setNum++
    },
    getDataCompany() {
      let params = {
        companyId: this.params.companyId
      }
      http.post('/loanInfoMaterial/getLoanMaterial', params, 'nauth').then(res => {
        this.params = Object.assign(this.params, res.content);
        this.params.staffCount = this.params.staffCount != null ? String(this.params.staffCount) : '';
        this.params.loadCycle = this.params.loadCycle != null ? String(this.params.loadCycle) : '';
        this.params.indutryType = this.params.indutryType != null ? String(this.params.indutryType) : '';
        this.params.workerName = this.myBaseInfo.nickName
        this.params.phoneNumber = this.myBaseInfo.userName
      })
    },
    // getType(){
    //   http.post('/phjr-manager-service/sysCode/getSysCode').then(res=>{
    //     // console.log(res)
    //     this.typeList=res[0].sysCodeValueVos
    //     this.peopleList=res[1].sysCodeValueVos
    //     this.cycleList=res[2].sysCodeValueVos
    //   })
    // },
    formValidation() {
      let params = {
        companyId: this.params.companyId,
        companyName: this.params.companyName,
        product: this.params.product,
        loanMoney: this.params.loanMoney,
        loanCycle: this.params.loanCycle,
        worker: this.myBaseInfo.userId,
        workerName: this.myBaseInfo.nickName,
        phoneNumber: this.myBaseInfo.userName
      }
      // if (params.companyId == undefined || params.userId == undefined || params.productId == undefined) {
      //   this.$Message.error('请返回重新操作')
      //   return
      // }
      // if (!params.loadMoney) {
      //   this.$Message.warning('请填写贷款金额')
      //   return
      // }
      // if (!params.loadCycle) {
      //   this.$Message.warning('请填写贷款周期')
      //   return
      // }
      // if (!params.customerName) {
      //   this.$Message.warning('请填写企业名称')
      //   return
      // }
      // if (!params.indutryType) {
      //   this.$Message.warning('请填写行业类别')
      //   return
      // }
      // if (!params.staffCount) {
      //   this.$Message.warning('请填写企业人员规模')
      //   return
      // }
      // if(params.businessIcense){
      //   this.$Message.warning('请上传营业执照')
      //   return
      // }
      // if (!params.busYears) {
      //   this.$Message.warning('请填写经营年限')
      //   return
      // }
      // if (!params.lastTurnover) {
      //   this.$Message.warning('请填写近一年度营业额')
      //   return
      // }
      // if (!params.lastTaxAmount) {
      //   this.$Message.warning('请填写近一年实缴税额')
      //   return
      // }
      // if(params.highFile){
      //   this.$Message.warning('请填写高新技术认定企业	')
      //   return
      // }
      // return
      http.post('/inclusive/loanInfo/submitLoanApply', params).then(res => {
        if (res.code === 0) {
          this.$Message.success('申请成功')
          this.$router.push({name: 'my-loan'})
        } else {
          this.$Message.error('申请失败')
        }
      })
    },
    uploadBusSuccess(res) {
      this.params.businessIcense = res.data.value
    },
    uploadsuccess(res) {
      this.params.highFile = res.data.value
    },
    SubFrom() {
      // this.params.loadCycle=this.date
      // this.params.indutryType=this.type
      // this.params.staffCount=this.perNum
      let params = this.params
      this.formValidation()
      // console.log(params)
      // console.log(this.date)
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-steps {
  margin-top: 30px;
  margin-bottom: 10px;
}

.ivu-steps .ivu-steps-title {
  font-size: 25px;
}

#apply_info {
  background: url('../../../static/images/bbg.png') no-repeat;
  background-size: cover;
  padding-top: 23px;
}

.center {
  width: 1200px;
  margin: 0 auto;
  user-select: none;
}

.info_head {
  display: flex;
  justify-content: space-between;
  // margin-top: 23px;
  height: 142px;

  .head_left {
    width: 256px;
    background: url('../../../static/images/333_03.png') no-repeat;
    display: flex;
    color: #fff;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 37px;
    padding-top: 31px;

    .left_title {
      font-size: 40px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }

    .left_en {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(194, 194, 194, 1);
      margin: 10px 0;
    }

    .left_foot {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }

  .head_right {
    flex: 1;
    background-color: #dc241e;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 55px;
    padding-top: 33px;

    .right_top {
      flex: 1;
      display: flex;

      div {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }

      .top_center {
        margin: 0 158px;
      }
    }

    .right_bott {
      flex: 1;

      div {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}

.info_form {
  display: flex;
  flex-direction: column;
  margin-top: 27px;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 38px;
  padding-right: 38px;
  margin-bottom: 58px;

  .line {
    height: 1px;
    background: rgba(194, 194, 194, 1);
    // margin: 0 38px;
  }

  .form_head {
    height: 88px;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    align-items: center;

    .head_left {
      width: 6px;
      height: 33px;
      margin-right: 18px;
      background: linear-gradient(-90deg,
      rgba(243, 18, 34, 1) 0%,
      rgba(248, 67, 104, 1) 53%,
      rgba(255, 81, 47, 1) 100%);
    }

    .head_right {
      flex: 1;
      font-size: 32px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }

  .form_item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;

    .item_title {
      width: 200px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
    }

    input {
      width: 736px;
      max-width: 736px;
      height: 43px;
      box-sizing: border-box;
      padding-left: 10px;
      border: 1px solid rgba(194, 194, 194, 1);
      outline: none;
    }
  }

  .form_item:nth-of-type(3) {
    margin-top: 30px;
  }

  .license {
    height: 170px;

    .item_upload {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;

      .uplaod_img {
        width: 163px;
        height: 122px;
        margin-right: 10px;
        // background-color: pink;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .upload_btn {
        width: 104px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(245, 245, 250, 1);
        margin-left: 15px;
        user-select: none;
        cursor: pointer;

        .re_submit {
          color: #C2C2C2;
          display: flex;
          align-items: center;
          // margin-top: 5px;
        }

        .btn_icon {
          width: 15px;
          height: 15px;
          // background-color: skyblue;
          margin: 5px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .form_foot {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140px;

    div {
      width: 147px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .edit_info {
      border: 1px solid rgba(241, 79, 74, 1);
      color: #f14f4a;
    }

    .apply {
      background: rgba(241, 79, 74, 1);
      color: #fff;
      margin-left: 64px;
    }
  }
}

// /deep/ .ivu-select-single .ivu-select-selection{
//    height: 43px!important;
//    div{
//      height: 43px!important;
//    }
// }
</style>
