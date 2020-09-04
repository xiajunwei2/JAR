<template>
  <div class="my-company">
    <!--      <div class="c-info" v-if="companyInfoDto.companyName">-->
    <!--          <div class="c-text">-->
    <!--              <span class="c-name">{{companyInfoDto.companyName}}</span>-->
    <!--              <Icon type="ios-checkmark-circle" class="c-img" />-->
    <!--              <span class="status">已认证</span>-->
    <!--          </div>-->
    <!--          &lt;!&ndash; <div class="c-btn">更换企业</div> &ndash;&gt;-->
    <!--      </div>-->
<!--    <div class="line"></div>-->
    <div class="step">
      <img src="/static/images/add02.png" style="width:100%;">
    </div>
    <div class="line"></div>
    <div class="info-form">
      <div class="tips">
        <div class="tips-text">
          <div>以下提交的所有资料均妥善安全存储于重庆市大数据局仅用于贷款匹配服务</div>
          <div>您提交认证材料后，平台将在24小时内给予审核结果反馈，为保证审核效率，请务必上传符合要求的资料</div>
          <div>平台审核通过后，您的身份将默认为本企业管理员</div>
        </div>
<!--        <div class="close"></div>-->
      </div>
      <Form :model="form" ref="form" :label-width="160" class="form-info" :rules="rules">
        <div class="top-title">
          企业基本信息
        </div>
        <FormItem label="企业名称">
          <Input v-model="companyInfoDto.companyName" placeholder="请输入企业名称" readonly style="border:none;"></Input>
        </FormItem>
        <FormItem label="行业类型" prop="industryType">
          <Select v-model="form.industryType">
            <Option v-for="item in setPullDownData('HYLX')" :value="item.code" :key="item.code">{{
                item.value
              }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="企业人员规模" prop="staffCount">
          <Select v-model="form.staffCount">
            <Option v-for="item in setPullDownData('RYGM')" :value="item.code" :key="item.code">{{
                item.value
              }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="经营年限" prop="busYears">
          <Select v-model="form.busYears">
            <Option v-for="item in setPullDownData('JYNX')" :value="item.code" :key="item.code">{{
                item.value
              }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="经营范围" prop="busRange">
          <Input v-model="form.busRange" placeholder="请输入行业类型" type="textarea"
                 :autosize="{minRows: 6, maxRows:6}"></Input>
        </FormItem>
        <FormItem label="营业执照" prop="businessLicensePhotos">
          <div class="yyzz">
            <div class="exp">
              <img
                src="/static/images/yyzz.png"
                alt="">
            </div>
            <div class="up-btn">
              <UploadItem :action="uploadurl" :fileUrl="form.businessLicensePhotos && form.businessLicensePhotos.length && form.businessLicensePhotos[0].value || ''" @upload="getUploadFile($event,'businessLicensePhotos')"></UploadItem>
            </div>
            <div class="up-right">
              <UploadItem :action="uploadurl" :uptype="2"
                          @upload="getUploadFile($event,'businessLicensePhotos')"></UploadItem>
              <div class="up-text">
                <div> 1. 请上传清晰、完整、无遮挡物的营业执照图片</div>
                <div>2. 要求原件红章清晰，如为复印件需加盖公司公章</div>
                <div>3. 图片大小不超过4M，图片格式为jpg、jpeg、png</div>
              </div>
            </div>
            <Input v-model="form.businessNo" placeholder="请输入行业类型" v-if="false"></Input>
          </div>
        </FormItem>
        <div class="top-title">
          法人身份验证
        </div>
        <FormItem label="法人姓名" prop="legalPerson">
          <Input v-model="form.legalPerson" placeholder="请输入法人姓名"></Input>
        </FormItem>
        <FormItem label="法人身份证号" prop="idCard">
          <Input v-model="form.idCard" placeholder="法人身份证号"></Input>
        </FormItem>
        <FormItem label="法人身份证正反面照片" prop="idCardPhotos">
          <div slot="label">
            <div>法人身份证</div>
            <div>正反面照片</div>
          </div>
          <div class="yyzz">
            <div class="exp">
              <img
                src="/static/images/sfz.jpg"
                alt="">
            </div>
            <div class="up-btn">
              <UploadItem :action="uploadurl" :fileUrl="form.idCardPhotos && form.idCardPhotos.length && form.idCardPhotos[0].value || ''" @upload="getUploadFile($event,'idCardPhotos',0)"></UploadItem>
            </div>
            <div class="up-right">
              <UploadItem :action="uploadurl" :uptype="2" @upload="getUploadFile($event,'idCardPhotos',0)"></UploadItem>
              <div class="up-text">
                <div> 1. 确保身份证上的所有信息清晰可见、完整</div>
                <div>2. 照片内容要求真实有效，不得做任何修改</div>
                <div>3. 图片大小不超过4M，图片格式为jpg、jpeg、png</div>
              </div>
            </div>
          </div>
          <div class="yyzz">
            <div class="exp">
              <img
                src="/static/images/sfz2.jpg"
                alt="">
            </div>
            <div class="up-btn">
              <UploadItem :action="uploadurl" :fileUrl="form.idCardPhotos && form.idCardPhotos.length && form.idCardPhotos[1].value || ''" @upload="getUploadFile($event,'idCardPhotos',1)"></UploadItem>
            </div>
            <div class="up-right">
              <UploadItem :action="uploadurl" :uptype="2" @upload="getUploadFile($event,'idCardPhotos',1)"></UploadItem>
              <div class="up-text">
                <div> 1. 确保身份证上的所有信息清晰可见、完整</div>
                <div>2. 照片内容要求真实有效，不得做任何修改</div>
                <div>3. 图片大小不超过4M，图片格式为jpg、jpeg、png</div>
              </div>
            </div>
          </div>
        </FormItem>
        <div class="top-title">
          管理员身份信息验证
        </div>
        <FormItem label="法人姓名" prop="businessNo">
          <div slot="label">
            <div>管理员是否</div>
            <div>为法人本人</div>
          </div>
          <i-switch v-model="form.boolLegal" @on-change="handleSwitchChange"></i-switch>
        </FormItem>
        <FormItem label="管理员授权函" prop="grantBook" v-if="!form.boolLegal">
          <img src="static/images/words.png" alt="">
          <span style="text-decoration: underline">授权函说明及示例文档</span>
          <a href="http://124.70.157.102:46113/upload/2020/09/02/77a12316-6fcf-4618-a464-5fcd0a2f4bcc.doc" target="_blank">下载</a>
          <div class="yyzz">
            <div class="exp">
              <img
                src="/static/images/sqs.jpg"
                alt="">
            </div>
            <div class="up-btn">
              <UploadItem :action="uploadurl" :fileUrl="form.grantBook && form.grantBook.length && form.grantBook[0].value || ''" @upload="getUploadFile($event,'grantBook')"></UploadItem>
            </div>
            <div class="up-right">
              <UploadItem :action="uploadurl" :uptype="2"
                          @upload="getUploadFile($event,'grantBook')"></UploadItem>
              <div class="up-text">
                <div> 1. 请上传清晰、完整、无遮挡物的营业执照图片</div>
                <div>2. 要求原件红章清晰，如为复印件需加盖公司公章</div>
                <div>3. 图片大小不超过4M，图片格式为jpg、jpeg、png</div>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem label="法人身份证正反面照片" prop="managerIdCardPhotos" v-if="!form.boolLegal">
          <div slot="label">
            <div>管理员身份证</div>
            <div>正反面照片</div>
          </div>
          <div class="yyzz">
            <div class="exp">
              <img
                src="/static/images/sfz.jpg"
                alt="">
            </div>
            <div class="up-btn">
              <UploadItem :action="uploadurl" :fileUrl="form.managerIdCardPhotos && form.managerIdCardPhotos.length && form.managerIdCardPhotos[0].value || ''" @upload="getUploadFile($event,'managerIdCardPhotos',0)"></UploadItem>
            </div>
            <div class="up-right">
              <UploadItem :action="uploadurl" :uptype="2"
                          @upload="getUploadFile($event,'managerIdCardPhotos',0)"></UploadItem>
              <div class="up-text">
                <div> 1. 确保身份证上的所有信息清晰可见、完整</div>
                <div>2. 照片内容要求真实有效，不得做任何修改</div>
                <div>3. 图片大小不超过4M，图片格式为jpg、jpeg、png</div>
              </div>
            </div>
          </div>
          <div class="yyzz">
            <div class="exp">
              <img
                src="/static/images/sfz2.jpg"
                alt="">
            </div>
            <div class="up-btn">
              <UploadItem :action="uploadurl" :fileUrl="form.managerIdCardPhotos && form.managerIdCardPhotos.length && form.managerIdCardPhotos[1].value || ''" @upload="getUploadFile($event,'managerIdCardPhotos',1)"></UploadItem>
            </div>
            <div class="up-right">
              <UploadItem :action="uploadurl" :uptype="2"
                          @upload="getUploadFile($event,'managerIdCardPhotos',1)"></UploadItem>
              <div class="up-text">
                <div> 1. 确保身份证上的所有信息清晰可见、完整</div>
                <div>2. 照片内容要求真实有效，不得做任何修改</div>
                <div>3. 图片大小不超过4M，图片格式为jpg、jpeg、png</div>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem label="管理员姓名" prop="nickName" v-if="!form.boolLegal">
          <Input v-model="form.nickName" placeholder="请输入管理员姓名"></Input>
        </FormItem>
        <FormItem label="管理员身份证号" prop="managerIdCard" v-if="!form.boolLegal">
          <Input v-model="form.managerIdCard" placeholder="请输入管理员身份证号"></Input>
        </FormItem>
        <FormItem label="管理员手机号" prop="managerPhoneNumber">
          <Input v-model="form.managerPhoneNumber" placeholder="请输入管理员手机号" :readonly='!phoneNumInput'></Input>
        </FormItem>
        <FormItem label="短信验证码" prop="smsCode">
          <div class="sms">
            <Input v-model="form.smsCode" placeholder="请输入短信验证码"></Input>
            <div class="sendsms" @click="handleGetCode">{{ codeTip }}</div>
          </div>
        </FormItem>
      </Form>
      <div class="next-btn" @click="nextStep">提 交</div>
    </div>
  </div>
</template>
<script>
import {COM_SERVICE as http} from "@/api/request.js";
import {getToken} from "@/utils/localStorage";
import UploadItem from './upload-item.vue';
import * as valid from '@/utils/validator.js'

export default {
    data() {
    // 文件校验
    const fileValid = ((rule,valid,callback)=>{
        if(rule.field == 'businessLicensePhotos'){
            // 经营执照
            if(!this.form.businessLicensePhotos.length){
                callback(new Error('请上传经营执照'))
            }else{
                callback();
            }
        }else if(rule.field == 'idCardPhotos'){
            // 法人身份证正反面照片
            if(!this.form.idCardPhotos.length || this.form.idCardPhotos.length != 2){
                callback(new Error('请上传法人身份证正反面照片'))
            }else{
                callback();
            }
        }else if(rule.field == 'managerIdCardPhotos'){
            // 管理员身份证正反面照片
            if(!this.form.managerIdCardPhotos.length || this.form.managerIdCardPhotos.length != 2){
                callback(new Error('请上传管理员身份证正反面照片'))
            }else{
                callback();
            }
        }else if(rule.field == 'grantBook'){
            if(!this.form.grantBook.length){
                callback(new Error('请上传授权书'))
            }else{
                callback();
            }

        }
    })
    // 身份证校验
    const idCardValid = ((rule, value, callback) => {
      let title = rule.field == 'idCard' ? '法人' : '管理员';
      if (!value) {
        callback(new Error('请输入' + title + '身份证号'));
      } else {
        let res = valid.cardId(value);
        if (res) {
          callback(res);
        } else {
          callback();
        }
      }
    })
    // 电话号码校验
    const telPhoneValid = ((rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入管理员手机号码'));
      } else {
        let res = valid.telphone(value);
        if (res) {
          callback(res);
        } else {
          callback();
        }
      }
    })
    return {
      companyInfoDto: '', // 公司信息
      form: {
        uuid:null,
        smsCode:'',
        industryType: '',
        staffCount: '',
        busYears: '',
        busRange: '',
        legalPerson: '',
        idCard: '',
        boolLegal: false,
        grantBook: [],
        nickName: '',
        managerIdCard: '',
        managerPhoneNumber: '',
        idCardPhotos: [],
        idCardPhotos0: [], // 正
        idCardPhotos1: [], // 反
        managerIdCardPhotos: [],
        managerIdCardPhotos0: [],
        managerIdCardPhotos1: [],
        businessLicensePhotos: [],
      },
      rules: {
        industryType: [{required: true, message: '请输入行业类型', trigger: 'blur'}],
        staffCount: [{required: true, message: '请选择企业人员规模', trigger: 'blur'}],
        busYears: [{required: true, message: '请选择经营年限', trigger: 'blur'}],
        legalPerson: [{required: true, message: '请选择企业人员规模', trigger: 'blur'}],
        idCard: [{required: true, validator: idCardValid, trigger: 'blur'}],
        nickName: [{required: true, message: '请输入管理员姓名', trigger: 'blur'}],
        managerIdCard: [{required: true, validator: idCardValid, trigger: 'blur'}],
        managerPhoneNumber: [{required: true, validator: telPhoneValid, trigger: 'blur'}],
        grantBook: [{required: true, validator: fileValid, trigger: 'change'}],
        idCardPhotos: [{required: true, validator: fileValid, trigger: 'change'}],
        managerIdCardPhotos: [{required: true, validator: fileValid, trigger: 'change'}],
        businessLicensePhotos: [{required: true, validator: fileValid, trigger: 'change'}],
        busRange: [{required: true, message: '请输入经营范围', trigger: 'blur'}],
        smsCode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
      },
      headers: {},
      fields: [],
      companyInfo: {},
      uploadurl: process.env.BASE_API + '/inclusive/loanInfoMaterial/uploadFile',
      smsTitle: '点击发送',
      time: 60,
      pullDownData: [], // 下拉数据
      phoneNumInput: true, // 判断手机号是否可数据
      companyId:'',
      codeTip: '点击发送',
      codeTimer: null,

    }
  },
  mounted() {
    this.form.managerPhoneNumber = this.$store.state.user.myBaseInfo.userName;
    this.$refs.form.validateField('managerPhoneNumber')
    this.phoneNumInput = false;
  },
  created() {
    if (sessionStorage.getItem('companyData')) {
      this.companyInfoDto = JSON.parse(sessionStorage.getItem('companyData')) || '';
    }
    this.headers = {
      token: getToken()
    }
    this.getPullDownData();
    if(sessionStorage.getItem('company_id')){
      this.companyId = sessionStorage.getItem('company_id')
      this.getCompany();
    }
  },
  methods: {
    formatError() {

    },
    sizeError() {

    },
    upSuccess(response, file, fileList) {
      if (response.code == 200 && response.state == true) {
        this.form.purchaserContract = response.data.value;
      }
    },
    getCompany() {
      http.post('/sysCompany/getCertificationInfo',{companyId:this.companyId},'nauth').then(res=>{
        console.log(res)
        if(res.code == 0 && res.content){
          let companyInfo = res.content.companyBasicInfoVo || '';
          if(companyInfo){
            this.form.industryType = companyInfo.industryType+'';
            this.form.staffCount = companyInfo.staffCount+'';
            this.form.busYears = companyInfo.busYears+'';
            this.form.busRange = companyInfo.busRange;
            this.form.legalPerson = companyInfo.legalPerson;
            this.form.idCard = companyInfo.idCard;
            this.form.boolLegal = companyInfo.boolLegal ? true : false;
            this.form.nickName = companyInfo.nickName;
            this.form.managerIdCard = companyInfo.managerIdCard;
            this.form.managerPhoneNumber = companyInfo.managerPhoneNumber;
            this.form.businessLicensePhotos = companyInfo.businessLicensePhotos;
            this.form.grantBook = companyInfo.grantBook;
            this.form.idCardPhotos = companyInfo.idCardPhotos;
            this.form.idCardPhotos0 = companyInfo.idCardPhotos && companyInfo.idCardPhotos.length ? companyInfo.idCardPhotos[0] : [];
            this.form.idCardPhotos1 = companyInfo.idCardPhotos && companyInfo.idCardPhotos.length ? companyInfo.idCardPhotos[1] : [];
            this.form.managerIdCardPhotos = companyInfo.managerIdCardPhotos;
            this.form.managerIdCardPhotos0 = companyInfo.managerIdCardPhotos && companyInfo.managerIdCardPhotos.length ? [companyInfo.managerIdCardPhotos[0]] : [];
            this.form.managerIdCardPhotos1 = companyInfo.managerIdCardPhotos && companyInfo.managerIdCardPhotos.length ? [companyInfo.managerIdCardPhotos[1]] : [];
          }
        }
        /*this.companyInfo = res;
        this.form = this.companyInfo.customerBaseVo;
        this.form.mortgage = this.form.mortgage == null ? 0 : this.form.mortgage;
        this.form.purchaser = this.form.purchaser == null ? 0 : this.form.purchaser;
        this.form.staffCount = this.form.staffCount != null ? String(this.form.staffCount) : '';
        this.form.loanCycle = this.form.loanCycle != null ? String(this.form.loanCycle) : '';
        localStorage.setItem('companyId', this.companyInfo.customerBaseVo.id);
        localStorage.setItem('fileId', this.companyInfo.qualificationBaseVo.id);
        localStorage.setItem('companyInfo', JSON.stringify(this.companyInfo));*/
      }).catch(err => {
        if (err) {
          this.$alert.success(err.message)
        }
      })
    },
    nextStep() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let companyBasicInfoDto = {...this.form};
          delete companyBasicInfoDto.idCardPhotos0;
          delete companyBasicInfoDto.idCardPhotos1;
          delete companyBasicInfoDto.managerIdCardPhotos0;
          delete companyBasicInfoDto.managerIdCardPhotos1;
          companyBasicInfoDto.industryType = +companyBasicInfoDto.industryType;
          companyBasicInfoDto.staffCount = +companyBasicInfoDto.staffCount;
          companyBasicInfoDto.busYears = +companyBasicInfoDto.busYears;
          companyBasicInfoDto.boolLegal = companyBasicInfoDto.boolLegal ? 1 : 0;
          this.companyInfoDto.registerCounty = +this.companyInfoDto.registerCounty;
          this.companyInfoDto.businessCounty = +this.companyInfoDto.businessCounty;
          let formData = {
            companyInfoDto: this.companyInfoDto,
            companyBasicInfoDto
          }
          if(this.companyId){
            formData.companyId = this.companyId;
          }
          http.post('/sysCompany/saveCertificationInfo', formData, 'nauth')
            .then(res => {
              if (res.code == 0) {
                this.$router.push({name: 'add-company-finsh'});
                this.$alert.success(res.content);
              } else {
                this.$alert.warning(res.content);
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    subForm() {
      let params = JSON.stringify(this.form);
      params = JSON.parse(params);
      if (!params.userId) {
        params.userId = this.$store.state.user.myBaseInfo.id;
      }
      // params.loanMoney = 0 ;
      // params.loanCycle = 0 ;
      http.post('/phjr-manager-service/customer/saveCustomer', params).then(res => {
        this.$alert.success('操作成功');
        this.$router.push({name: 'company-enterprice-info', params: {edit: 1}})
      }).catch(err => this.$alert.success(err.message))
    },
    handleGetCode() {
      if (!this.form.managerPhoneNumber) {
        this.$alert.success('请输入手机号');
        return;
      }
      if (this.codeTimer) return;
      this.$api.user.getCode({mobile: this.form.managerPhoneNumber, smsType: 2}).then(res => {
        if (res.err.code === 500) {
          this.$alert.warning(res.err.message)
          return
        }
        if (res.err) {
          this.codeTip = '重新获取';
          clearInterval(this.codeTimer);
          this.codeTimer = null;
          this.errorFun(res.err);
        } else {
          this.$alert.success('短信已发送，5分钟内有效。');
          this.startTimer();
        }
        if (res.data && res.data.code == 0) {
          this.form.uuid = res.data.content;
        }
      }).catch(res => {
      })
    },
    startTimer() {
      let time = 120;
      this.codeTip = `重新获取(${time}s)`
      this.codeTimer = setInterval(() => {
        this.codeTip = `重新获取(${time}s)`
        time--;
        if (time === 0) {
          this.codeTip = '重新获取'
          clearInterval(this.codeTimer);
          this.codeTimer = null;
          time = 120;
        }
      }, 1000);
    },
    sendSms() {
      if (this.time <= 0 || this.time == 60) {
        // 等待接口对接
        http.post("/sms", {}, 'nauth').then(res => {

        });
      }
      if (this.time == 60) {
        let sms = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(sms);
            this.time = 60;
            this.smsTitle = `点击发送`;
            return;
          }
          this.time--;
          this.smsTitle = `重新获取${this.time}s`;
        }, 1000)
      }
    },
    // 得到上传的图片
    getUploadFile(res, type, index) {
      if (res) {
        let data = [res];
        if (type == 'businessLicensePhotos' || type == 'grantBook') {
          this.form[type] = [res];
        } else {
          this.form[type + index] = [res];
          this.form[type] = [...this.form[type + '0'], ...this.form[type + '1']]
        }
      }
    },
    // 获取下拉数据
    async getPullDownData() {
      this.pullDownData = await http.post("/sysCode/getCode", {codeType: "HYLX,RYGM,JYNX"}, 'nauth')
    },
    setPullDownData(type) {
      let data = this.pullDownData.content || [];
      let field = data.filter(item => {
        return item.codeType == type
      });
      if (field.length > 0) {
        return field[0].sysCodeVoList;
      } else {
        return [];
      }
    },
    // 选择管理员是否为法人本人
    handleSwitchChange(value) {
      if (value) {
        this.phoneNumInput = false;
        this.form.managerPhoneNumber = this.$store.state.user.myBaseInfo.userName;
        this.$refs.form.validateField('managerPhoneNumber')
      } else {
        this.phoneNumInput = true;
      }
    }
  },
  components: {
    UploadItem
  }
}
</script>
<style lang="less" scoped>
* {
  cursor: default;
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
    height: 94px;
    background: rgba(230, 232, 237, 1);
  }

  .info-form {
    .tips {
      margin: 26px 16px;
      // height:69px;
      background: #FBF5EB;
      position: relative;
      padding: 15px;

      .tips-text {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: rgba(221, 162, 60, 1);
        line-height: 20px;
      }

      .close {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        width: 19px;
        height: 19px;
        background: #C2C2C2;
        border-radius: 50%;
      }
    }

    .form-info {
      margin: 26px 16px;
      min-height: 600px;

      .top-title {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        margin: 15px 0 15px 0px;
        padding-bottom: 15px;
        border-bottom: 1px dashed rgba(191, 191, 191, 0.5);
      }

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

      /deep/ [readonly="readonly"] {
        border: none;
      }

      .append {
        padding: 0 5px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
      }

      .mortgage-item {
        background: rgba(245, 245, 247, 1);
        padding: 15px 15px 15px 0;

        .upload-tips {
          margin-left: 15px;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(194, 194, 194, 1);
        }
      }

      .address {
        display: flex;

        /deep/ .ivu-select {
          height: 43px;

          &:nth-child(2) {
            margin-left: 29px;
          }

          .ivu-select-single .ivu-select-selection {
            height: 43px;
          }

          .ivu-select-selected-value {
            height: 43px;
            line-height: 43px;
          }
        }
      }

      .sms {
        display: flex;

        .sendsms {
          width: 180px;
          height: 43px;
          line-height: 43px;
          background: rgba(232, 228, 228, 1);
          border-radius: 3px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          margin-left: 35px;
          cursor: pointer;
        }
      }

      .yyzz {
        display: flex;
        align-items: center;

        .exp {
          width: 185px;
          height: 129px;
          border: 0.05vw dashed rgba(230, 230, 230, 1);
          padding: 15px;

          img {
            width: 100%;
            height: 100%
          }
        }

        .up-btn {
          min-width: 129px;
          max-width: 185px;
          height: 129px;
          border: 0.05vw dashed rgba(230, 230, 230, 1);
          margin: 0 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .up-right {

          .up-text {
            padding: 0px 15px;
            background: rgba(246, 248, 253, 1);
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: #BFBFBF;
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
    margin: 114px auto 15px;
  }
}

.upload-box {
  /deep/ .ivu-form-item-content {
    display: flex;
    align-items: flex-end;
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
}
</style>
