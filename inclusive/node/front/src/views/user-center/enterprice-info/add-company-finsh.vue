<template>
  <div class="my-company">
      <div class="step">
          <img src="/static/images/add03.png" style="width:100%;">
      </div>
      <div class="line"></div>
      <div class="finsh">
          <img src="/static/images/finsh.png" alt="" class="finsh-img" />
          <div class="c-tips">企业认证信息已提交成功</div>
          <div class="c-desc">平台将在24小时之内反馈审核结果</div>
          <div class="c-desc">您可以点击下方“申请贷款”填写贷款需求</div>
          <div class="btns-box">
              <div class="btns btn-back" @click="$router.push({path:'/'})">返回首页</div>
              <div class="btns btn-opt" @click="$router.push({path:'/loan-matching'})">申请贷款</div>
          </div>
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
                // customerName:[{required:true,message:'请输入企业名称',trigger:'blur'}],
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
            uploadurl:process.env.BASE_API+'/phjr-manager-service/file/uploadFile'

        }
    },
    created(){
        sessionStorage.removeItem('companyData')
        this.headers = {
            token:getToken()
        }
        this.getField();
        setTimeout(()=>{
            this.getCompany();
        },1000)
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
            this.fields = await http.post("/phjr-manager-service/sysCode/getSysCode");

        },
        setField(type){
            let field = this.fields.filter(item=>{
                return item.codeType==type
            });
            if(field.length>0){
                return field[0].sysCodeValueVos;
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
    .finsh{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        min-height: 800px;
        .finsh-img{

        }
        .c-tips{
            font-size:24px;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color:rgba(85,85,85,1);
            margin:15px auto;
        }
        .c-desc{
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(153,153,153,1);
            margin:5px auto;
        }
        .btns-box{
            display: flex;
            margin-top: 54px;
            .btns{
                width:147px;
                height:50px;
                line-height:50px;
                border:2px solid rgba(241,79,74,1);
                text-align: center;
                padding:0 15px;
                margin:0 15px;
                cursor: pointer;
            }
            .btn-back{
                font-size:18px;
                font-family:Source Han Sans CN;
                font-weight:500;
                color:rgba(241,79,74,1);
            }
            .btn-opt{
                font-size:18px;
                font-family:Source Han Sans CN;
                font-weight:500;
                color:rgba(255,255,255,1);
                background:rgba(241,79,74,1);
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
        margin:114px auto 15px;
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
