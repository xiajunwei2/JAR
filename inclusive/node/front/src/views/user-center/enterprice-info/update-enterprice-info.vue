<template>
  <div class="my-company">
      <div class="c-info" v-if="form.companyName">
          <div class="c-text">
              <span class="c-name">{{form.companyName}}</span>
              <Icon type="ios-checkmark-circle" class="c-img" />
              <span class="status">{{form.authenticationStatusStr}}</span>
          </div>
          <!-- <div class="c-btn">更换企业</div> -->
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
<!--            <div class="close"></div>-->
        </div>
        <Form :model="form" ref="form" :label-width="160" class="form-info" :rules="rules">
            <FormItem label="企业名称" prop="companyName">
                <Input v-model="form.companyName" placeholder="请输入企业名称" ></Input>
            </FormItem>
            <FormItem label="社会信用代码" prop="businessLicense">
                <Input v-model="form.businessLicense" placeholder="请输入社会信用代码" ></Input>
            </FormItem>
            <FormItem label="我的贷款需求" prop="loanMoney">
                <Input v-model.number="form.loanMoney" type="number" min="0" placeholder="请输入我的贷款需求">
                    <div slot="append" class="append">万元</div>
                </Input>
            </FormItem>
            <FormItem label="贷款周期" prop="loanCycle">
                <!-- <Input v-model.number="form.loadCycle" type="number" min="0" placeholder="请输入贷款周期" /> -->
                <Select v-model="form.loanCycle">
                    <Option v-for="item in setField('DKZQ')" :value="item.code" :key="item.code">{{ item.value }}</Option>
                </Select>
            </FormItem>
            <FormItem label="行业类型" prop="indutryType">
                <Select v-model="form.indutryType">
                    <Option v-for="item in setField('HYLX')" :value="item.code" :key="item.code">{{ item.value }}</Option>
                </Select>
            </FormItem>
            <FormItem label="企业人员规模" prop="staffCount">
                <Select v-model="form.staffCount">
                    <Option v-for="item in setField('RYGM')" :value="item.code" :key="item.code">{{ item.value }}</Option>
                </Select>
            </FormItem>
            <FormItem label="经营年限" prop="busYears">
                <Select v-model="form.busYears">
                    <Option v-for="item in setField('JYNX')" :value="item.code" :key="item.code">{{ item.value }}</Option>
                </Select>
            </FormItem>
            <FormItem label="经营范围" prop="busRange">
                <Input v-model="form.busRange" placeholder="请输入经营范围" ></Input>
            </FormItem>
            <FormItem label="是否有抵押物" prop="hasMortgage">
                <i-switch v-model="form.hasMortgage"  true-color="#ff4949" :true-value="1" :false-value="0"></i-switch>
            </FormItem>
            <FormItem label="抵押物价值" prop="mortgageValue" class="mortgage-item" v-if="form.hasMortgage" :rules="{required:true,message:'请输入抵押物价值',trigger:'blur',type:'number'}">
                <Input v-model.number="form.mortgageValue"   class="input-text" placeholder="请输入抵押物价值">
                    <div slot="append" class="append">万元</div>
                </Input>
            </FormItem>
            <FormItem label="为政府采购供应商" prop="purchaser">
                <i-switch v-model="form.purchaser"  true-color="#ff4949" :true-value="1" :false-value="0"></i-switch>
            </FormItem>
            <FormItem label="" class="mortgage-item upload-box" prop="purchaserFileNode" v-if="form.purchaser" :rules="{required:true,message:'请上传政府采购合同',trigger:'change',type:'array'}">
                <span v-if="form.purchaserFileNode && form.purchaserFileNode.length">
                    <img :src="item.value" alt="" v-for='(item,index) in form.purchaserFileNode' :key='index' style="width:6.25vw;height:6.25vw;margin-right:10px">
                </span>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="upSuccess"
                    :max-size="102480"
                    :on-exceeded-size="sizeError"
                    :action='uploadurl'
                    :headers="headers"
                    class="upload">
                    <div class="upload-btn">
                        <Icon type="ios-add" size="40"></Icon>
                    </div>
                </Upload>
                <span class="upload-tips">请上传有效的政府采购合同</span>
            </FormItem>
        </Form>
        <div class="next-btn" @click="nextStep">下一步</div>
      </div>
  </div>
</template>
<script>
import {COM_SERVICE as http} from "@/api/request.js";
import {getToken} from "@/utils/localStorage"
export default {
    data() {
        return {
            form:{
                id:'',
                userId:'',
                customerName:'',
                businessNo:'',
                loanMoney:'',
                loanCycle:'',
                indutryType:'',
                staffCount:'',
                busYears:0,
                busRange:'',
                mortgage:0,
                purchaser:0,
                mortgageValue:0,
                purchaserContract:''
            },
            rules:{
                customerName:[{required:true,message:'请输入企业名称',trigger:'blur'}],
                businessNo:[{required:true,message:'请输入社会信用代码',trigger:'blur'}],
                loanCycle:[{required:true,message:'请输入贷款周期',trigger:'blur'}],
                loanMoney:[{required:true,message:'请输入我的贷款需求',trigger:'blur',type:'number'}],
                indutryType:[{required:true,message:'请输入行业类型',trigger:'blur'}],
                staffCount:[{required:true,message:'请输入企业人员规模',trigger:'blur'}],
                busYears:[{required:true,message:'请输入经营年限',trigger:'blur',type:'number'}],
                busRange:[{required:true,message:'请输入经营范围',trigger:'blur'}],
                // mortgage:[{required:true,message:'请选择是否有抵押物',trigger:'blur'}],
                // mortgageValue:[{required:true,message:'请输入抵押物价值',trigger:'blur',type:'number'}],
                // purchaser:[{required:true,message:'请选择是否为政府采购供应商',trigger:'blur'}],
                // purchaserContract:[{required:true,message:'请上传政府采购供应商合同',trigger:'blur'}],
            },
            headers:{},
            fields:[],
            companyInfo:{},
            uploadurl:process.env.BASE_API+'/inclusive/loanInfoMaterial/uploadFile',
            companyId:'',
        }
    },
    created(){
        this.companyId = this.$route.query.id || '';
        sessionStorage.removeItem('loan_data');
        this.headers = {
            token:getToken(),
            Authorization:'Bearer '+getToken()
        }
        this.getField();
        setTimeout(()=>{
            this.getLoanDetail();
        },1000)
    },
    methods: {
        sizeError(){

        },
        upSuccess(response, file, fileList){
            if(response && response.code == 0 && response.content){
                this.form.purchaserFileNode.push(response.content)
            }
            console.log(response)
        },
        // 获取贷款详情
        getLoanDetail(){
            http.post('/loanInfoMaterial/getLoanMaterial',{companyId:this.companyId,id:''},'nauth')
            .then(res=>{
                if(res.code == 0){
                    this.form = res.content;
                    this.form.mortgageValue = this.form.mortgageValue ? +this.form.mortgageValue : 0
                    this.form.loanCycle = this.form.loanCycle+'';
                    this.form.industryType = this.form.industryType+'';
                    this.form.staffCount = this.form.staffCount+'';
                    this.form.busYears = this.form.busYears+'';
                    this.form.purchaserFileNode = this.form.purchaserFileNode && this.form.purchaserFileNode.length ? this.form.purchaserFileNode : [];
                }
            })
        },
        getCompany(){
            http.post('/phjr-manager-service/customer/findCustomerDetailByUserId',{userId:this.$store.state.user.myBaseInfo.id}).then(res=>{
                this.companyInfo = res;
                this.form = this.companyInfo.customerBaseVo;
                this.form.mortgage = this.form.mortgage==null ? 0 : this.form.mortgage ;
                this.form.purchaser = this.form.purchaser==null ? 0 : this.form.purchaser ;
                this.form.staffCount = this.form.staffCount!=null ? String(this.form.staffCount):'';
                this.form.loanCycle = this.form.loanCycle!=null ? String(this.form.loanCycle):'';
                localStorage.setItem('companyId',this.companyInfo.customerBaseVo.id);
                localStorage.setItem('fileId',this.companyInfo.qualificationBaseVo.id);
                localStorage.setItem('companyInfo',JSON.stringify(this.companyInfo));
            }).catch(err=>this.$alert.success(err.message))
        },
        nextStep(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    let loanData = {

                    }
                    localStorage.setItem('step1',JSON.stringify(this.form));
                    this.subForm();
                }
            })
        },
        subForm(){
            let params = JSON.stringify(this.form);
            params = JSON.parse(params);
            if(!params.userId){
                params.userId = this.$store.state.user.myBaseInfo.id;
            }
            // params.loanMoney = 0 ;
            // params.loanCycle = 0 ;
            http.post('/phjr-manager-service/customer/saveCustomer',params).then(res=>{
                this.$alert.success('操作成功');
               this.$router.push({name:'company-enterprice-info',params:{edit:1}})
            }).catch(err=>this.$alert.success(err.message))
        },
        async getField(){
            // /phjr-manager-service/sysCode/getSysCode
            this.fields = await http.post("/sysCode/getCode",{codeType:"DKZQ,HYLX,RYGM,JYNX"},'nauth')
        },
        setField(type){
            let data = this.fields.content || [];
            let field = data.filter(item=>{
                return item.codeType==type
            });
            if(field.length>0){
                return field[0].sysCodeVoList;
            }else{
                return [];
            }
        }
    },
}
</script>
<style lang="less" scoped>
*{
    cursor: default;
}
.my-company{
    .c-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height:47px;
        line-height:47px;
        background:rgba(255,255,255,1);
        padding:0 23px;
        .c-text{
            .c-name{
                font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:500;
                color:rgba(51,51,51,1);
            }
            .c-img{
                width:17px;
                height:16px;
                color:#31D406;
                font-size:20px;
                margin:0 5px;
                vertical-align: sub;
            }
            .status{
                font-size:14px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(51,51,51,1);
            }
        }
        .c-btn{
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:500;
            color:rgba(241,79,74,1);
        }
    }
    .line{
        height:15px;
        background:rgba(230,232,237,0.3);
    }
    .step{
        //height:94px;
        //background:rgba(230,232,237,1);
    }
    .info-form{
        .tips{
            margin:26px 16px;
            height:69px;
            background:rgba(252,227,212,1);
            border:1px solid rgba(250,168,166,1);
            position: relative;
            .tips-text{
                display: flex;
                flex-direction:column;
                justify-content:space-evenly;
                font-size:14px;
                height:69px;
                padding-left:20px;
                font-family:Source Han Sans CN;
                font-weight:300;
                color:rgba(153,153,153,1);
            }
            .close{
                position: absolute;
                top:50%;
                right:24px;
                transform: translateY(-50%);
                width:19px;
                height:19px;
                background:#C2C2C2;
                border-radius:50%;
            }
        }
        .form-info{
            margin:26px 16px;
            /deep/ .ivu-form-item-label{
                font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:300;
                color:rgba(51,51,51,1);
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: flex-end;
                padding:0 12px 0 0;
                height:43px;
                &::before{
                    margin-right:0px;
                    padding-left:4px;
                }
            }
            /deep/ .ivu-input{
                height:43px;
                border:1px solid rgba(194,194,194,0.5);
            }
            /deep/ .ivu-form-item-error{
                .ivu-input-group-append{
                    border:1px solid #dcdee2;
                }
            }
            .append{
                padding:0 5px;
                font-size:16px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(179,179,179,1);
            }
            .mortgage-item{
                background:rgba(245,245,247,1);
                padding:15px 15px 15px 0;
                .upload-tips{
                    margin-left:15px;
                    font-size:16px;
                    font-family:Source Han Sans CN;
                    font-weight:300;
                    color:rgba(194,194,194,1);
                }
            }
        }
    }
    .next-btn{
        width:163px;
        height:41px;
        line-height:41px;
        text-align:center;
        background:rgba(241,79,74,1);
        border-radius:3px;
        font-size:18px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin:44px 29px 54px;
        cursor: pointer;
    }
}
.upload-box{
    /deep/ .ivu-form-item-content{
        display: flex;
        align-items: flex-end;
    }
    .upload{
        width:120px;
        .upload-btn{
            width:120px;
            height:120px;
            line-height:120px;
            border:1px dashed rgba(194,194,194,1);
            text-align:center;
            color:rgba(194,194,194,1);
            cursor: pointer;
        }
    }
}
</style>
