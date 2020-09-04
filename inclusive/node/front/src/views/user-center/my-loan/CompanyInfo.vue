<template>
  <div class="info">
      <table class="table" border>
          <tr><td class="title">申请企业</td><td class="ctx">{{data.companyName}}</td></tr>
          <tr><td class="title">申请人姓名</td><td class="ctx">{{data.workerName}}</td></tr>
          <tr><td class="title">申请人手机</td><td class="ctx">{{data.phoneNumber}}</td></tr>
          <tr><td class="title">法人姓名</td><td class="ctx">{{data.legalPerson}}</td></tr>
          <tr><td class="title">法人手机</td><td class="ctx">{{data.legalPersonPhoneNumber}}</td></tr>
          <tr><td class="title">法人身份证</td><td class="ctx">{{data.idCard}}</td></tr>
          <tr><td class="title">社会信用代码</td><td class="ctx">{{data.businessLicense}}</td></tr>
          <tr><td class="title">营业执照</td><td class="ctx"><span v-show='data.businessLicensePhotos' @click="showImg(data.businessLicensePhotos)">查看</span> </td></tr>
          <tr><td class="title">行业类型</td><td class="ctx">{{data.industryTypeStr}}</td></tr>
          <tr><td class="title">经营范围</td><td class="ctx">{{data.busRange}}</td></tr>
          <tr><td class="title">人员规模</td><td class="ctx">{{data.staffCountStr}} 人</td></tr>
          <tr><td class="title">企业注册地</td><td class="ctx">{{data.registerAddressStr}}</td></tr>
          <tr><td class="title">企业经营地</td><td class="ctx">{{data.businessAddressStr}}</td></tr>
      </table>
    <Modal v-model="imgshow" class-name="vertical-center-modal" :closable="false">
        <img :src="imgsrc" alt="" class="doc" :style="{width:width,height:height}">
        <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
export default {
    props:['data'],
    data() {
        return {
            imgshow:false,
            imgsrc:'',
            width:'',
            height:''
        }
    },
    methods:{
        showImg(src){
            this.imgsrc = src[0].value;
            this.imgshow = true;
            this.width = '100%';
            this.height = 'auto';
        }
    }
}
</script>
<style lang="less" scoped>
.info{
    padding:25px 32px;
    .table{
        border:1px solid #E6E6E6;
        td{
            height:55px;
            line-height:55px;
        }
        .title{
            padding:0 30px;
            width:152px;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:300;
            color:rgba(85,85,85,1);
        }
        .ctx{
            padding-left:35px;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:300;
            color:rgba(153,153,153,1);
            span{
                font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:300;
                color:rgba(47,163,245,1);
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}
/deep/ .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    padding:0;
    .doc{
        width:100%;
        height:300px;
    }
    .ivu-modal-body{
        padding:0;
    }
    .ivu-modal-footer{
        display:none;
    }
    .ivu-modal{
        top: 0;
    }
}
</style>
