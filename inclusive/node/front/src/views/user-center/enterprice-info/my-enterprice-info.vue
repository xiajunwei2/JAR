<template>
  <div class="my-company">
    <div class='my-company-content' v-if='companyLoanInfo'>
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
        <img src="/static/images/stpe1.png" style="width:100%;">
      </div>
      <div class="line"></div>
      <div class="info-form">
        <div class="tips">
          <div class="tips-text">
            <div>以下提交的所有资料均妥善安全存储于重庆市大数据局仅用于贷款申请服务</div>
            <div>您所填写资料的完善度将会影响到系统为您匹配贷款产品的准确率，请您务必如实填写详尽</div>
          </div>
          <!--                <div class="close"><Icon type="md-close-circle" class="close-btn"/></div>-->
        </div>
        <Form ref='form' :model="form" :rules="rules" :label-width="160" class="form-info">
          <!--<FormItem label="企业名称" prop="customerName">
              <Input v-model="form.customerName" placeholder="请输入企业名称" />
          </FormItem>
          <FormItem label="社会信用代码" prop="businessNo">
              <Input v-model="form.businessNo" placeholder="请输入社会信用代码" />
          </FormItem>-->
          <FormItem class='required' label="我的贷款需求" prop="loanMoney">
            <Input v-model="form.loanMoney" placeholder="请输入我的贷款需求">
              <div slot="append" class="append">万元</div>
            </Input>
          </FormItem>
          <FormItem label="贷款周期" prop="loanCycle">
            <Select v-model="form.loanCycle">
              <Option v-for="item in setField('DKZQ')" :value="item.code" :key="item.code">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <!--<FormItem label="行业类型" prop="indutryType">
              <Select v-model="form.indutryType">
                  <Option v-for="item in setField('INDUTRY')" :value="item.code" :key="item.code">{{ item.value }}</Option>
              </Select>
          </FormItem>
          <FormItem label="企业人员规模" prop="staffCount">
              <Select v-model="form.staffCount">
                  <Option v-for="item in setField('RYGM')" :value="item.code" :key="item.code">{{ item.value }}</Option>
              </Select>
          </FormItem>
          <FormItem label="经营年限" prop="busYears">
              <Select v-model="form.busYears">
                  <Option :value="0">一年</Option>
                  <Option :value="1">一年以上</Option>
              </Select>
          </FormItem>
          <FormItem label="经营范围" prop="busRange">
              <Input v-model="form.busRange" placeholder="请输入经营范围" />
          </FormItem>-->
          <FormItem label="是否有抵押物" prop="hasMortgage">
            <div class="mortgage-box">
              <i-switch v-model="form.hasMortgage"></i-switch>
              <div class="mortgage-input" v-if="form.hasMortgage">
                <div class="input-label">抵押物价值</div>
                <Input v-model="form.mortgageValue" class="input-text" placeholder="请输入抵押物价值">
                  <div slot="append" class="append">万元</div>
                </Input>
              </div>
            </div>
          </FormItem>
          <!--<FormItem label="为政府采购供应商" prop="purchaserContract">
              <div class="mortgage-box">
                  <div class="mortgage" v-if="form.purchaser">是</div>
                  <div class="mortgage" v-if="!form.purchaser">否</div>
              </div>
          </FormItem>
          <FormItem label="" v-if="false">
                  <Upload
                      ref="upload"
                      :show-upload-list="false"
                      :on-success="upSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="102480"
                      :on-format-error="formatError"
                      :on-exceeded-size="sizeError"
                      action="//jsonplaceholder.typicode.com/posts/"
                      class="upload">
                      <div class="upload-btn">
                          <Icon type="ios-add" size="40"></Icon>
                      </div>
                  </Upload>
          </FormItem>-->
        </Form>
        <div class="next-btn" @click="nextPage">下一步</div>
      </div>
    </div>
    <div class="noData" v-else>
      <p>您还没有添加企业，添加企业并且认证成功后可填写贷款需求</p>
      <div class="btns btn-one" @click="$router.push({name:'add-company'})">去添加企业</div>
    </div>
    <mask-layer class='reason-mask' :show='chooseCompanys' title-name='更换企业' @close="chooseCompanys = false"
                box-width='550px'>
      <template slot='content'>
        <div class='reason-content'>
          <div class="companyList" v-for="(item,index) in companyList">
            <p>{{ item.companyName }}</p>
            <div class="btns btn-one" @click="handleClickMask(item.id)">选择</div>
          </div>
        </div>

      </template>
    </mask-layer>
    <mask-layer class='reason-mask2' :show='HasCompanys' title-name='' @close="handleClickMask2(false)"
                box-width='550px'
                box-height="320px">
      <template slot='content'>
        <p class="tTitle">提示</p>
        <div class='reason-content'>
          <div class="companyList">
            <p>欢迎来到普惠金融服务平台</p>
            <p>填写贷款需求需要添加企业并认证成功，是否现在添加？</p>
          </div>
          <div class="butns">
            <div class="btns btn-two" @click="handleClickMask2(false)">取消</div>
            <div class="btns btn-one" @click="handleClickMask2(true)">添加企业</div>
          </div>
        </div>
      </template>
    </mask-layer>
  </div>
</template>
<script>
import {COM_SERVICE as http} from "@/api/request.js";
import {getToken} from "@/utils/localStorage"

export default {
  data() {
    const ruleValid = ((rule, valid, callback) => {
      if (rule.field == 'loanMoney') {
        if (!this.form.loanMoney) {
          callback(new Error('请输入贷款需求'))
        } else {
          let reg = /\d/;
          if (!reg.test(this.form.loanMoney)) {
            callback(new Error('请输入数字'))
          } else {
            callback()
          }
        }
      } else {
        if (!this.form.loanCycle) {
          callback(new Error('请选择贷款周期'))
        } else {
          callback()
        }
      }
    })
    return {
      HasCompanys: false,
      chooseCompanys: false,
      companyList: [],
      form: {
        id: '',
        userId: '',
        customerName: '',
        businessNo: '',
        loanMoney: '',
        loanCycle: '',
        hasMortgage: false,
        indutryType: '',
        staffCount: '',
        busYears: 0,
        busRange: '',
        mortgage: 0,
        purchaser: 0,
        mortgageValue: '',
        purchaserContract: ''
      },
      rules: {
        loanMoney: [{required: true, validator: ruleValid, trigger: 'blur'}],
        loanCycle: [{required: true, validator: ruleValid, trigger: 'change'}],
      },
      companyLoanInfo: '', // 企业贷款材料数据
      companyId: '', // 企业id
    }
  },
  created() {
    sessionStorage.removeItem('loanInfo')
    sessionStorage.removeItem('company_id')
    this.companyId = this.$route.query.id
    // this.companyId = this.$route.params.id || ''
    this.getField();

  },
  methods: {
    handleClickMask2(bool) {
      if (bool === false)
        this.HasCompanys = false
      else if (bool === true) {
        this.$router.push({name: "add-company"})
      }
    },
    handleClickMask(id) {
      this.companyId = id
      this.getCompanyLoanInfo()
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
    // 获取企业申请贷款材料
    getCompanyLoanInfo() {
      let reqUrl = '/sysCompany/getMainCompany'; // 主企业（无传参企业id时，默认）
      let postData = '';
      if (this.companyId) {
        reqUrl = '/loanInfoMaterial/getLoanMaterial';
        postData = {companyId: this.companyId}
      }
      http.post(reqUrl, postData, 'nauth')
        .then(res => {
            if (res) {
              // if (!this.companyId && !this.$route.query.id) {
              //   this.companyId = res.content && res.content.companyId;
              //   this.getCompanyLoanInfo();
              // } else {
              this.companyLoanInfo = res.content;
              if (!this.companyLoanInfo) {
                this.HasCompanys = true
              }
              sessionStorage.setItem('AllInfos', JSON.stringify(res.content))
              this.form = res.content;
              if (this.form) {
                this.form.loanMoney = this.form.loanMoney ? (this.form.loanMoney + '') : '';
                this.form.loanCycle = this.form.loanCycle ? (this.form.loanCycle + '') : '';
                this.form.hasMortgage = this.form.hasMortgage ? true : false;
                if (this.companyId) {
                  sessionStorage.setItem('company_id', this.companyId);
                }
                sessionStorage.setItem('allLoanInfo', JSON.stringify(this.form));
              }
              console.log(this.form)
            }
          }
        )
    },
    formatError() {

    }
    ,
    sizeError() {

    }
    ,
    upSuccess() {

    }
    ,
    nextPage() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let infoData = {
            companyId: this.companyId,
            loanMoney: this.form.loanMoney,
            loanCycle: this.form.loanCycle,
            hasMortgage: this.form.hasMortgage,
            mortgageValue: this.form.mortgageValue
          }
          sessionStorage.setItem('loanInfo', JSON.stringify(infoData));
          this.$router.push({name: 'company-enterprice-info'})
        }
      })
    }
    ,
    async getField() {
      this.fields = await http.post("/sysCode/getCode", {codeType: 'DKZQ'}, 'nauth');
      this.getCompanyLoanInfo();
    }
    ,
    setField(type) {
      let field = [];
      let data = this.fields && this.fields.content || [];
      if (data && data.length) {
        field = data.filter(item => {
          return item.codeType == type
        });
      }
      console.log(field)
      if (field.length > 0) {
        return field[0].sysCodeVoList;
      } else {
        return [];
      }
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
      cursor: pointer;
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
        cursor: pointer;

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
        padding: 0 5px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
      }

      .mortgage-box {
        height: 43px;
        line-height: 43px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .mortgage {
          width: 230px;
          height: 43px;
          line-height: 43px;
          text-align: center;
          background: rgba(245, 245, 245, 0.5);
          border: 1px solid rgba(194, 194, 194, 1);
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(194, 194, 194, 1);

          &:hover {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: rgba(221, 63, 59, 1);
            border: 1px solid rgba(241, 79, 74, 1);
            cursor: pointer;
          }

        }

        .active {
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(221, 63, 59, 1);
          border: 1px solid rgba(241, 79, 74, 1);
          cursor: pointer;
        }

        .mortgage-input {
          display: flex;

          .input-label {
            flex: 1;
            height: 43px;
            line-height: 43px;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: rgba(51, 51, 51, 1);
          }

          .input-text {
            width: 330px;
            height: 43px;
            margin-left: 38px;
          }
        }
      }
    }
  }

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
}

.upload {
  width: 120px;

  .upload-btn {
    width: 120px;
    height: 120px;
    line-height: 120px;
    border: 1px dashed rgba(194, 194, 194, 1);
    text-align: center;
    color: rgba(194, 194, 194, 1);
    cursor: pointer;
  }
}

/deep/ .reason-mask2 .mask-box {
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
