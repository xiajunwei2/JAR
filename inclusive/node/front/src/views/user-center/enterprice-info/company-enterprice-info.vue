<template>
  <div class="my-company">
    <div class="c-info" v-if="companyLoanInfo.companyName">
      <div class="c-text">
        <span class="c-name">{{ companyLoanInfo.companyName }}</span>
        <Icon type="ios-checkmark-circle" class="c-img"/>
        <span class="status">{{ companyLoanInfo.authenticationStatusStr }}</span>
      </div>
      <div class="c-btn" @click="getCompanyList">更换企业</div>
    </div>
    <div class="line"></div>
    <div class="step">
      <img src="/static/images/stpe2.png" style="width:100%;">
    </div>
    <div class="line"></div>
    <div class="info-form">
      <div class="tips">
        <div class="tips-text">
          <div>以下提交的所有资料均妥善安全存储于重庆市大数据局仅用于贷款申请服务</div>
          <div>您所填写资料的完善度将会影响到系统为您匹配贷款产品的准确率，请您务必如实填写详尽</div>
        </div>
        <!--            <div class="close"><Icon type="md-close-circle" class="close-btn" /></div>-->
      </div>
      <Form :model="form" ref="form" :label-width="160" class="form-info" :rules="rules" v-if="$route.params.edit!=1">
        <FormItem label="近一年度营业额" prop="lastTurnover">
          <Input v-model.number="form.lastTurnover" placeholder="请输入近一年度营业额">
            <div slot="append" class="append">万元</div>
          </Input>
        </FormItem>
        <FormItem label="近一年实缴税额" prop="lastTaxAmount">
          <Input v-model.number="form.lastTaxAmount" placeholder="请输入近一年实缴税额">
            <div slot="append" class="append">万元</div>
          </Input>
        </FormItem>
        <FormItem label="固定资产净值" prop="fixAsset">
          <Input v-model.number="form.fixAsset" placeholder="固定资产种类：厂房/办公室/商铺、车辆、其他">
            <div slot="append" class="append">万元</div>
          </Input>
        </FormItem>
        <FormItem label="总资产" prop="asset">
          <Input v-model.number="form.asset" placeholder="选填（最近一期数据）">
            <div slot="append" class="append">万元</div>
          </Input>
        </FormItem>
        <FormItem label="总负债" prop="liabilities">
          <Input v-model.number="form.liabilities" placeholder="选填（最近一期数据）">
            <div slot="append" class="append">万元</div>
          </Input>
        </FormItem>
        <FormItem label="净资产/所有者权益" prop="netAssets">
          <Input v-model.number="form.netAssets" placeholder="选填（最近一期数据）">
            <div slot="append" class="append">万元</div>
          </Input>
        </FormItem>
        <!--<FormItem label="资产负债率" prop="debtRatio">
            <Input v-model="form.debtRatio" placeholder="请输入资产负债率" type="number">
                <div slot="append" class="append">%</div>
            </Input>
        </FormItem>
        <FormItem label="流动比率" prop="currentRatio">
            <Input v-model="form.currentRatio" placeholder="请输入流动比率" type="number">
                <div slot="append" class="append">%</div>
            </Input>
        </FormItem>
        <FormItem label="速动比率" prop="quickRatio">
            <Input v-model="form.quickRatio" placeholder="请输入速动比率" type="number">
                <div slot="append" class="append">%</div>
            </Input>
        </FormItem>
        <FormItem label="现金比率" prop="cashRatio">
            <Input v-model="form.cashRatio" placeholder="请输入现金比率" type="number">
                <div slot="append" class="append">%</div>
            </Input>
        </FormItem>-->
      </Form>
      <!--<Form :model="form" ref="form" :label-width="160" class="form-info" :rules="rules" v-if="$route.params.edit==1">
          <FormItem label="近一年度营业额" prop="lastTurnover">
              <Input v-model.number="form.lastTurnover" placeholder="请输入近一年度营业额" >
                  <div slot="append" class="append">万元</div>
              </Input>
          </FormItem>
          <FormItem label="固定资产净值" prop="fixAsset">
              <Input v-model.number="form.fixAsset" placeholder="请输入固定资产净值" >
                  <div slot="append" class="append">万元</div>
              </Input>
          </FormItem>
          <FormItem label="近一年实缴税额" prop="lastTaxAmount">
              <Input v-model.number="form.lastTaxAmount" placeholder="请输入近一年实缴税额">
                  <div slot="append" class="append">万元</div>
              </Input>
          </FormItem>
          <FormItem label="总资产" prop="asset">
              <Input v-model.number="form.asset" placeholder="请输入总资产" >
                  <div slot="append" class="append">万元</div>
              </Input>
          </FormItem>
          <FormItem label="总负债" prop="liabilities">
              <Input v-model.number="form.liabilities" placeholder="请输入总负债">
                  <div slot="append" class="append">万元</div>
              </Input>
          </FormItem>
          <FormItem label="资产负债率" prop="debtRatio">
              <Input v-model="form.debtRatio" placeholder="请输入资产负债率" type="number">
                  <div slot="append" class="append">%</div>
              </Input>
          </FormItem>
          <FormItem label="流动比率" prop="currentRatio">
              <Input v-model="form.currentRatio" placeholder="请输入流动比率" type="number">
                  <div slot="append" class="append">%</div>
              </Input>
          </FormItem>
          <FormItem label="速动比率" prop="quickRatio">
              <Input v-model="form.quickRatio" placeholder="请输入速动比率" type="number">
                  <div slot="append" class="append">%</div>
              </Input>
          </FormItem>
          <FormItem label="现金比率" prop="cashRatio">
              <Input v-model="form.cashRatio" placeholder="请输入现金比率" type="number">
                  <div slot="append" class="append">%</div>
              </Input>
          </FormItem>
      </Form>-->
      <div class="btns">
        <div class="next-btn" @click="nextPage">下一步</div>
        <div class="next-btn prev" @click="prevPage">返回上一步</div>
      </div>
    </div>
    <mask-layer class='reason-mask' :show='chooseCompanys' title-name='更换企业' box-width='550px'>
      <template slot='content'>
        <div class='reason-content'>
          <div class="companyList" v-for="(item,index) in companyList">
            <p>{{ item.companyName }}</p>
            <div class="btns btn-one" @click="handleClickMask(item.id)">选择</div>
          </div>
        </div>

      </template>
    </mask-layer>
  </div>
</template>
<script>
import {COM_SERVICE as http} from "@/api/request.js";

export default {
  data() {
    return {
      chooseCompanys:false,
      companyList:[],
      companyLoanInfo: [],
      form: {
        id: '',
        customerId: '',
        lastTurnover: '',
        fixAsset: '',
        lastTaxAmount: '',
        asset: '',
        liabilities: '',
        netAssets: '',
        debtRatio: '',
        currentRatio: '',
        quickRatio: '',
        cashRatio: ''
      },
      rules: {
        lastTurnover: [{required: true, message: '请输入近一年度营业额', trigger: 'blur', type: 'number'}],
        //fixAsset:[{required:true,message:'请输入固定资产净值',trigger:'blur',type:'number'}],
        lastTaxAmount: [{required: true, message: '请输入近一年实缴税额', trigger: 'blur', type: 'number'}],
        //asset:[{required:true,message:'请输入总资产',trigger:'blur',type:'number'}],
        //liabilities:[{required:true,message:'请输入负债',trigger:'blur',type:'number'}],
        debtRatio: [{required: true, message: '请输入负债率', trigger: 'blur'}],
        currentRatio: [{required: true, message: '请输入流动比率', trigger: 'blur'}],
        quickRatio: [{required: true, message: '请输入速动比率', trigger: 'blur'}],
        cashRatio: [{required: true, message: '请输入现金比率', trigger: 'blur'}],
      },
      loanInfo: '', // 公司贷款基本信息
      companyId:''
    }
  },
  created() {
    if (sessionStorage.getItem('loanInfo')) {
      this.loanInfo = JSON.parse(sessionStorage.getItem('loanInfo')) || '';
    }
    if (JSON.parse(sessionStorage.getItem('AllInfos')))
      this.companyLoanInfo = JSON.parse(sessionStorage.getItem('AllInfos'))
    if (sessionStorage.getItem('allLoanInfo')) {
      this.form = JSON.parse(sessionStorage.getItem('allLoanInfo'));
      this.form.lastTurnover = this.form.lastTurnover ? +this.form.lastTurnover : 0;
      this.form.lastTaxAmount = this.form.lastTaxAmount ? +this.form.lastTaxAmount : 0;
    }
  },
  methods: {
    formatError() {

    },
    sizeError() {

    },
    upSuccess() {

    },
    handleClickMask(id) {
      this.companyId = id
      this.prevPage()
      this.chooseCompanys = false
    },
    getCompanyList() {
      this.chooseCompanys = true
      let params = {userId: this.$store.state.user.myBaseInfo.userId}
      http.post('/sysCompany/getCompanyByUserId', params, 'nauth')
        .then(res => {
          if (res.code == 0) {
            this.companyList = res.content || [];
          }
        }).catch(res => {
      })
    },
    nextPage() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loanInfo.lastTurnover = this.form.lastTurnover;
          this.loanInfo.lastTaxAmount = this.form.lastTaxAmount;
          this.loanInfo.fixAsset = this.form.fixAsset;
          this.loanInfo.asset = this.form.asset;
          this.loanInfo.liabilities = this.form.liabilities;
          this.loanInfo.netAssets = this.form.netAssets;
          sessionStorage.setItem('loanInfo', JSON.stringify(this.loanInfo));
          this.$router.push({name: 'ext-enterprice-info'})
        }
      })
      /*if(this.$route.params.edit){
          this.$refs.form.validate(valid=>{
              if(valid){
                  localStorage.setItem('step2',JSON.stringify(this.form));
                  this.subForm();
              }
          })
      }else{
          this.$router.push({name:'ext-enterprice-info'})
      }*/
    },
    prevPage() {
      if (this.$route.params.edit == 1) {
        this.$router.push({name: 'update-enterprice-info', params: {edit: this.$route.params.edit}})
      } else {
        this.$router.push({name: 'my-enterprice-info', params: {edit: this.$route.params.edit,id:this.companyId}})
      }
    },
    subForm() {
      let params = JSON.stringify(this.form);
      params = JSON.parse(params);
      if (!params.customerId) {
        params.customerId = Number(localStorage.getItem('companyId'));
      }

      http.post('/phjr-manager-service/status/saveBusStatus', params).then(res => {
        this.$alert.success('操作成功');
        this.$router.push({name: 'ext-enterprice-info', params: {edit: 1}})
      }).catch(err => this.$alert.success(err.message))
    },
  },
}
</script>
<style lang="less" scoped>
* {
  cursor: default;
}
.companyList {
  margin: 15px 0 15px 0;
}

/deep/ .reason-mask .mask-box {
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

  .reason-content {
    text-align: left;
    line-height: 30px;

    p {
      display: inline-block;
    }
  }

  .btn-one {
    float: right;
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
}

.my-company {
  .c-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 47px;
    line-height: 47px;
    background: rgba(255, 255, 255, 1);
    padding: 0 23px;

    .c-text {
      .c-name {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }

      .c-img {
        width: 17px;
        height: 16px;
        color: #31D406;
        font-size: 20px;
        margin: 0 5px;
        vertical-align: sub;
      }

      .status {
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }

    .c-btn {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(241, 79, 74, 1);
    }
  }

  .line {
    height: 15px;
    background: rgba(230, 232, 237, 0.3);
  }

  .step {
    //height: 94px;
    //background: rgba(230, 232, 237, 1);
  }

  .info-form {
    .tips {
      margin: 26px 16px;
      height: 69px;
      background: rgba(252, 227, 212, 1);
      border: 1px solid rgba(250, 168, 166, 1);
      position: relative;

      .tips-text {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 14px;
        height: 69px;
        padding-left: 20px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: rgba(153, 153, 153, 1);
      }

      .close {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        width: 19px;
        height: 19px;
        // background:#C2C2C2;
        border-radius: 50%;

        .close-btn {
          cursor: pointer;
        }
      }
    }

    .form-info {
      margin: 26px 16px;

      /deep/ .ivu-form-item-label {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-end;
        padding: 0 12px 0 0;
        height: 43px;

        &::before {
          margin-right: 0px;
          padding-left: 4px;
        }
      }

      /deep/ .ivu-input {
        height: 43px;
        border: 1px solid rgba(194, 194, 194, 0.5);
      }

      /deep/ .ivu-form-item-error {
        .ivu-input-group-append {
          border: 1px solid #dcdee2;
        }
      }

      .append {
        width: 65px;
        padding: 0 5px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
      }
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
}
</style>
