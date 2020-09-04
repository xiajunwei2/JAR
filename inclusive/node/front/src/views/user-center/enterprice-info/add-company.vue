<template>
  <div class="my-company">
<!--      <div class="c-info" v-if="form.companyName">-->
<!--          <div class="c-text">-->
<!--              <span class="c-name">{{form.companyName}}</span>-->
<!--              <Icon type="ios-checkmark-circle" class="c-img" />-->
<!--              <span class="status">已认证</span>-->
<!--          </div>-->
<!--          &lt;!&ndash; <div class="c-btn">更换企业</div> &ndash;&gt;-->
<!--      </div>-->
      <div class="line"></div>
      <div class="step">
          <img src="/static/images/add01.png" style="width:100%;">
      </div>
      <div class="line"></div>
      <div class="info-form">
        <div class="tips">
            <div class="tips-text">
                <div>以下提交的所有资料均妥善安全存储于重庆市大数据局仅用于贷款匹配服务</div>
                <div>您提交认证材料后，平台将在24小时内给予审核结果反馈，为保证审核效率，请务必上传符合要求的资料</div>
                <div>平台审核通过后，您的身份将默认为本企业管理员</div>
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
            <FormItem label="注册地址" prop="registAddress">
                <div class="address">
                    <Select v-model="form.registerProvince">
                        <Option v-for="item in registAddressArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="form.registerCounty">
                        <Option v-for="item in setField('ZCDZ')" :value="item.code" :key="item.code">{{ item.value }}</Option>
                    </Select>
                </div>
            </FormItem>
            <FormItem label="经营地址" prop="bussinessAddress">
                <div class="address">
                    <Select v-model="form.businessProvince">
                        <Option v-for="item in registAddressArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="form.businessCounty">
                        <Option v-for="item in setField('JYDZ')" :value="item.code" :key="item.code">{{ item.value }}</Option>
                    </Select>
                </div>
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
        // 地址校验
        const addressValid = ((rule,value,callback)=>{
            if(rule.field == 'registAddress'){
                // 注册地址
                if(!this.form.registerProvince || !this.form.registerCounty){
                    callback(new Error('请选择注册地址'));
                }else{
                    callback();
                }
            }else{
                // 经营地址
                if(!this.form.businessProvince || !this.form.businessCounty){
                    callback(new Error('请选择经营地址'));
                }else{
                    callback();
                }
            }
        })
        // 社会信用代码校验
        const codeValid = ((rule,valid,callback)=>{
            if(!this.form.businessLicense){
                callback(new Error('请输入社会信用代码'))
            }else{
                let reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
                if(!reg.test(this.form.businessLicense)){
                    callback(new Error('请输入正确格式的社会信用代码'))
                }else{
                    callback()
                }
            }
        })
        return {
            form:{
                companyName:'',
                businessLicense:'',
                registerProvince:'chongqing',
                registerCounty:'',
                businessProvince:'chongqing',
                businessCounty:'',
            },
            rules:{
                companyName:[{required:true,message:'请输入企业名称',trigger:'blur'}],
                businessLicense:[{required:true,validator:codeValid,trigger:'blur'}],
                registAddress:[{required:true,validator:addressValid,trigger:'blur'}],
                bussinessAddress:[{required:true,validator:addressValid,trigger:'blur'}],
            },
            headers:{},
            fields:[],
            companyInfo:{},
            uploadurl:process.env.BASE_API+'/phjr-manager-service/file/uploadFile',
            registAddressArr:[{name:'重庆市',code:'chongqing'}], // 注册和经营地址首地址（暂时写死）
            //registAddressArr:[{name:'重庆市',code:'ZCDZ'}], // 注册地址首地址
            //manageAddressArr:[{name:'重庆市',code:'JYDZ'}], // 经营地址首地址
            pageType:'',
            companyId:'', // 企业id
        }
    },
    created(){
        sessionStorage.removeItem('companyData');
        sessionStorage.removeItem('company_id');
        this.pageType = this.$route.query.type || '';
        this.companyId = this.$route.query.id || '';
        // 如果是重新认证，则请求企业数据
        this.headers = {
            token:getToken()
        }
        this.getField();
        if(this.pageType == 'certificate' || this.companyId){
            sessionStorage.setItem('company_id',this.companyId);
            this.getCompany();
        }
    },
    methods: {
        formatError(){

        },
        sizeError(){

        },
        upSuccess(response, file, fileList){
            if(response.code==200 && response.state==true){
                this.form.purchaserContract = response.data.value;
            }
        },
        getCompany(){
            http.post('/sysCompany/getCertificationInfo',{companyId:this.companyId},'nauth').then(res=>{
                console.log(res)
                if(res.code == 0 && res.content){
                    let companyInfo = res.content.companyInfoVo;
                    if(companyInfo){
                        this.form = {
                            companyName:companyInfo.companyName,
                            businessLicense:companyInfo.businessLicense,
                            registerProvince:companyInfo.registerProvince,
                            registerCounty:companyInfo.registerCounty+'',
                            businessProvince:companyInfo.businessProvince,
                            businessCounty:companyInfo.businessCounty+'',
                        }
                    }
                }
                /*this.companyInfo = res;
                this.form = this.companyInfo.customerBaseVo;
                this.form.mortgage = this.form.mortgage==null ? 0 : this.form.mortgage ;
                this.form.purchaser = this.form.purchaser==null ? 0 : this.form.purchaser ;
                this.form.staffCount = this.form.staffCount!=null ? String(this.form.staffCount):'';
                this.form.loanCycle = this.form.loanCycle!=null ? String(this.form.loanCycle):'';
                localStorage.setItem('companyId',this.companyInfo.customerBaseVo.id);
                localStorage.setItem('fileId',this.companyInfo.qualificationBaseVo.id);
                localStorage.setItem('companyInfo',JSON.stringify(this.companyInfo));*/
            }).catch(err=>this.$alert.success(err.message))
        },
        nextStep(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    let submitData = {...this.form};
                    sessionStorage.setItem('companyData',JSON.stringify(submitData));
                    // this.subForm();
                    this.$router.push({name:'add-company-stwo'})
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
            this.fields = await http.post("/sysCode/getCode",{codeType:"ZCDZ,JYDZ"},'nauth');


        },
        setField(type){
            let data = this.fields && this.fields.content || [];
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
            // height:69px;
            background:#FBF5EB;
            position: relative;
            padding:15px;
            .tips-text{
                display: flex;
                flex-direction:column;
                justify-content:space-evenly;
                font-size:14px;
                font-family:Source Han Sans CN;
                font-weight:300;
                color:rgba(221,162,60,1);
                line-height:20px;
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
            min-height:600px;
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
            .address{
                display: flex;
                /deep/ .ivu-select{
                    height:43px;
                    &:nth-child(2){
                        margin-left:29px;
                    }
                    /deep/ .ivu-select-selection{
                        height:43px;
                    }
                    .ivu-select-selected-value{
                        height:43px;
                        line-height:43px;
                    }
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
