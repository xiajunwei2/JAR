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
      <img src="/static/images/stpe3.png" style="width:100%;">
    </div>
    <div class="line"></div>
    <div class="info-form">
      <div class="tips">
        <div class="tips-text">
          <div>以下提交的所有资料均妥善安全存储于重庆市大数据局仅用于贷款申请服务</div>
          <div>您所填写资料的完善度将会影响到系统为您匹配贷款产品的准确率，请您务必如实填写详尽</div>
        </div>
        <!--            <div class="close"><Icon type="md-close-circle" class="close-btn"/></div>-->
      </div>
      <Form :model="form" :label-width="250" class="form-info" v-if="$route.params.edit!=1">
        <FormItem label="是否有企业信用评价等级证书" prop="qyxyFile">
          <i-switch v-model="form.qyxyGrade" true-color="#ff4949" :true-value="1" :false-value="0"/>
        </FormItem>
        <div class="mortgage-item upload-box" v-show="form.qyxyGrade">
          <span v-if="form.qyxyFileNode && form.qyxyFileNode.length">
            <span class='img-box' v-for="(item,index) in form.qyxyFileNode" :key='index'>
              <img :src="item.value" alt="" style="width:6.25vw;height:6.25vw">
              <i class='iconfont icon-cuowu' @click="handleDeleteImg(index,'qyxyFileNode')"></i>
            </span>
          </span>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="qyxyFileUp"
            :format="['jpg','jpeg','png']"
            :max-size="102480"
            :on-format-error="formatError"
            :before-upload="beforeUpImg"
            :on-exceeded-size="sizeError"
            :action="uploadurl"
            :headers="headers"
            class="upload">
            <div class="upload-btn">
              <Icon type="ios-add" size="40"></Icon>
            </div>
          </Upload>
          <span class="upload-tips">请上传有效的政府采购合同</span>
        </div>
        <FormItem label="是否有纳税信用等级证书" prop="taxCredit">
          <i-switch v-model="form.taxCredit" true-color="#ff4949" :true-value="1" :false-value="0"/>
        </FormItem>
        <div class="mortgage-item upload-box" v-show="form.taxCredit">
          <span v-if="form.taxFileNode && form.taxFileNode.length">
            <span class='img-box' v-for="(item,index) in form.taxFileNode" :key='index'>
              <img :src="item.value" alt="" style="width:6.25vw;height:6.25vw">
              <i class='iconfont icon-cuowu' @click="handleDeleteImg(index,'taxFileNode')"></i>
            </span>
          </span>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="taxFileUp"
            :format="['jpg','jpeg','png']"
            :max-size="102480"
            :on-format-error="formatError"
            :before-upload="beforeUpImg"
            :on-exceeded-size="sizeError"
            :action="uploadurl"
            :headers="headers"
            class="upload">
            <div class="upload-btn">
              <Icon type="ios-add" size="40"></Icon>
            </div>
          </Upload>
          <span class="upload-tips">请上传有效的政府采购合同</span>
        </div>
        <FormItem label="是否为高新技术认定企业" prop="highTech">
          <i-switch v-model="form.highTech" true-color="#ff4949" :true-value="1" :false-value="0"/>
        </FormItem>
        <div class="mortgage-item upload-box" v-show="form.highTech">
          <span v-if="form.highFileNode && form.highFileNode.length">
            <span class='img-box' v-for="(item,index) in form.highFileNode" :key='index'>
              <img :src="item.value" alt="" style="width:6.25vw;height:6.25vw">
              <i class='iconfont icon-cuowu' @click="handleDeleteImg(index,'highFileNode')"></i>
            </span>
          </span>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="highFileUp"
            :format="['jpg','jpeg','png']"
            :max-size="102480"
            :on-format-error="formatError"
            :on-exceeded-size="sizeError"
            :before-upload="beforeUpImg"
            :action="uploadurl"
            :headers="headers"
            class="upload">
            <div class="upload-btn">
              <Icon type="ios-add" size="40"></Icon>
            </div>
          </Upload>
          <span class="upload-tips">请上传有效的政府采购合同</span>
        </div>
        <FormItem label="是否为政府采购供应商" prop="purchaser">
          <i-switch v-model="form.purchaser" true-color="#ff4949" :true-value="1" :false-value="0"/>
        </FormItem>
        <div class="mortgage-item upload-box" v-show="form.purchaser">
          <span v-if="form.purchaserFileNode && form.purchaserFileNode.length">
            <span class='img-box' v-for="(item,index) in form.purchaserFileNode" :key='index'>
              <img :src="item.value" alt="" style="width:6.25vw;height:6.25vw">
              <i class='iconfont icon-cuowu' @click="handleDeleteImg(index,'purchaserFileNode')"></i>
            </span>
          </span>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="purchaserFileUp"
            :format="['jpg','jpeg','png']"
            :max-size="102480"
            :on-format-error="formatError"
            :on-exceeded-size="sizeError"
            :before-upload="beforeUpImg"
            :action="uploadurl"
            :headers="headers"
            class="upload">
            <div class="upload-btn">
              <Icon type="ios-add" size="40"></Icon>
            </div>
          </Upload>
          <span class="upload-tips">请上传有效的政府采购合同</span>
        </div>
      </Form>
      <Form :model="form" :label-width="250" class="form-info" v-if="$route.params.edit==1">
        <FormItem label="是否有企业信用评价等级证书" prop="qyxyFile">
          <i-switch v-model="form.qyxyGrade" true-color="#ff4949" :true-value="1" :false-value="0"/>
        </FormItem>
        <div class="mortgage-item upload-box">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="qyxyFileUp"
            :format="['jpg','jpeg','png']"
            :max-size="102480"
            :on-format-error="formatError"
            :on-exceeded-size="sizeError"
            :before-upload="beforeUpImg"
            :action="uploadurl"
            :headers="headers"
            class="upload">
            <div class="upload-btn">
              <Icon type="ios-add" size="40" v-if="!form.qyxyFile"></Icon>
              <img :src="form.qyxyFile" alt="" v-if="form.qyxyFile" style="width:100%;height:100%;">
            </div>
          </Upload>
          <span class="upload-tips">请上传有效的政府采购合同</span>
        </div>
        <FormItem label="是否有纳税信用等级证书" prop="taxCredit">
          <i-switch v-model="form.taxCredit" true-color="#ff4949" :true-value="1" :false-value="0"/>
        </FormItem>
        <div class="mortgage-item upload-box">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="taxFileUp"
            :format="['jpg','jpeg','png']"
            :max-size="102480"
            :on-format-error="formatError"
            :on-exceeded-size="sizeError"
            :before-upload="beforeUpImg"
            :action="uploadurl"
            :headers="headers"
            class="upload">
            <div class="upload-btn">
              <Icon type="ios-add" size="40" v-if="!form.taxFile"></Icon>
              <img :src="form.taxFile" alt="" v-if="form.taxFile" style="width:100%;height:100%;">
            </div>
          </Upload>
          <span class="upload-tips">请上传有效的政府采购合同</span>
        </div>
        <FormItem label="是否为高新技术认定企业" prop="highTech">
          <i-switch v-model="form.highTech" true-color="#ff4949" :true-value="1" :false-value="0"/>
        </FormItem>
        <div class="mortgage-item upload-box">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="highFileUp"
            :format="['jpg','jpeg','png']"
            :max-size="102480"
            :on-format-error="formatError"
            :on-exceeded-size="sizeError"
            :action="uploadurl"
            :headers="headers"
            class="upload">
            <div class="upload-btn">
              <Icon type="ios-add" size="40" v-if="!form.highFile"></Icon>
              <img :src="form.highFile" alt="" v-if="form.highFile" style="width:100%;height:100%;">
            </div>
          </Upload>
          <span class="upload-tips">请上传有效的政府采购合同</span>
        </div>
      </Form>
      <div class="btns">
        <div class="next-btn save" @click="save">保 存</div>
        <div class="next-btn" @click="toPage('loan-matching')">一键贷款</div>
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
import {getToken} from "@/utils/localStorage"

export default {
  data() {
    return {
      chooseCompanys:false,
      companyList:[],
      form: {
        qyxyGrade: 0,
        taxCredit: 0,
        highTech: 0,
        qyxyFile: '',
        qyxyFileNode: [],
        taxFile: '',
        taxFileNode: [],
        highFile: '',
        highFileNode: [],
        purchaser: 0,
        purchaserFileNode: []
      },
      rules: {
        name: [{required: true, message: '请输入企业名称', trigger: 'blur'}]
      },
      uploadurl: process.env.BASE_API + '/inclusive/loanInfoMaterial/uploadFile',
      headers: {},
      loanInfo: '',
      companyLoanInfo: []
    }
  },
  created() {
    if (sessionStorage.getItem('loanInfo')) {
      this.loanInfo = JSON.parse(sessionStorage.getItem('loanInfo'));
    }
    if (JSON.parse(sessionStorage.getItem('AllInfos')))
      this.companyLoanInfo = JSON.parse(sessionStorage.getItem('AllInfos'))
    if (sessionStorage.getItem('allLoanInfo')) {
      this.form = JSON.parse(sessionStorage.getItem('allLoanInfo'));
      this.form.lastTurnover = this.form.lastTurnover ? +this.form.lastTurnover : 0;
      this.form.lastTaxAmount = this.form.lastTaxAmount ? +this.form.lastTaxAmount : 0;
      this.form.qyxyFileNode = this.form.qyxyFileNode && this.form.qyxyFileNode.length ? this.form.qyxyFileNode : [];
      this.form.taxFileNode = this.form.taxFileNode && this.form.taxFileNode.length ? this.form.taxFileNode : [];
      this.form.highFileNode = this.form.highFileNode && this.form.highFileNode.length ? this.form.highFileNode : [];
      this.form.purchaserFileNode = this.form.purchaserFileNode && this.form.purchaserFileNode.length ? this.form.purchaserFileNode : [];
    }
    this.headers = {
      token: getToken(),
      Authorization: 'Bearer ' + getToken()
    }
  },
  methods: {
    beforeUpImg(file) {
      //debugger
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt20M = file.size / 1024 / 1024 < 4;
      if (!isJPG && !isPNG) {
        this.$Notice.warning({
          title: '提示',
          desc: '上传图片必须是JPG/JPEG/PNG/ 格式!'
        });
      }
      if (!isLt20M) {
        this.$Notice.warning({
          title: '提示',
          desc: '上传图片大小不能超过 4MB!'
        });
      }
      return (isJPG || isPNG) && isLt20M;
    },
    formatError() {

    },
    sizeError() {

    },
    handleClickMask(id) {
      this.$router.push({name: 'my-enterprice-info', params: {edit: this.$route.params.edit,id:id}})
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
    qyxyFileUp(response, file, fileList) {
      if (response && response.code == 0 && response.content) {
        this.form.qyxyFileNode.push(response.content)
      }
    },
    taxFileUp(response, file, fileList) {
      if (response && response.code == 0 && response.content) {
        this.form.taxFileNode.push(response.content)
      }
    },
    highFileUp(response, file, fileList) {
      if (response && response.code == 0 && response.content) {
        this.form.highFileNode.push(response.content)
      }
    },
    purchaserFileUp(response, file, fileList) {
      if (response && response.code == 0 && response.content) {
        this.form.purchaserFileNode.push(response.content)
      }
    },
    toPage(name) {
      this.save(1,name)
    },
    // 删除已上传图片
    handleDeleteImg(index,type){
      this.form[type].splice(index,1);
    },
    save(type,name) {
      let postData = {...this.loanInfo};
      console.log(this.loanInfo)
      let companyId = sessionStorage.getItem('company_id');
      postData.companyId = companyId;
      postData.loanCycle = postData.loanCycle ? +postData.loanCycle : 0;
      postData.loanMoney = postData.loanMoney ? +postData.loanMoney : 0;
      postData.hasMortgage = postData.hasMortgage == 'true' || postData.hasMortgage ? 1 : 0;
      postData.qyxyGrade = this.form.qyxyGrade ? 1 : 0;
      postData.qyxyFileNode = this.form.qyxyGrade ? this.form.qyxyFileNode : [];
      postData.taxCredit = this.form.taxCredit ? 1 : 0;
      postData.taxFileNode = this.form.taxCredit ? this.form.taxFileNode : [];
      postData.highTech = this.form.highTech ? 1 : 0;
      postData.highFileNode = this.form.highFileNode ? this.form.highFileNode : [];
      postData.purchaser = this.form.purchaser ? 1 : 0;
      postData.purchaserFileNode = this.form.purchaserFileNode ? this.form.purchaserFileNode : [];
      http.post('/loanInfoMaterial/saveLoanMaterial', postData, 'nauth')
        .then(res => {
          if (res.code == 0) {
            this.$alert.success(res.content);
          } else {
            this.$alert.warning(res.content);
          }
          if (type !== 1)
            this.$router.push({name: 'my-enterprice-info'})
          else
            this.$router.push({name: name})
        })
      // /phjr-manager-service/qualification/saveQualification
      /*let params = JSON.stringify(this.form);
      params = JSON.parse(params);
      params.id = Number(localStorage.getItem('fileId'));
      params.customerId = Number(localStorage.getItem('companyId'));
      http.post("/phjr-manager-service/qualification/saveQualification",params).then(res=>{
          this.$alert.success('操作成功');
      })*/
    }
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

      .c-img{
        width:17px;
        height:16px;
        color:#31D406;
        font-size:20px;
        margin:0 5px;
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
        padding: 0 5px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(179, 179, 179, 1);
      }

      .mortgage-item {
        background: rgba(245, 245, 247, 1);
        padding: 15px;
        margin-bottom: 15px;

        .upload-tips {
          margin-left: 15px;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 300;
          color: rgba(194, 194, 194, 1);
        }
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

    .save {
      background: #fff;
      border: 2px solid rgba(241, 79, 74, 1);
      color: rgba(241, 79, 74, 1);
    }
  }
}

.upload-box {
  display: flex;
  align-items: flex-end;
  .img-box{
    position:relative;
    margin-right:10px;
    display:inline-block;
    cursor:pointer;
    &:after{
      display:none;
      content:'';
      position:absolute;
      z-index:1;
      width:100%;
      height:100%;
      left:0;
      top:0;
      background:rgba(0,0,0,0.4);
    }
    &:hover {
      &:after,.iconfont{
        display:inline-block;
      }
    }
  }
  .iconfont.icon-cuowu{
    display:none;
    position:absolute;
    right:6px;
    top:6px;
    z-index:111;
    color:#fff;
    cursor:pointer;
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
