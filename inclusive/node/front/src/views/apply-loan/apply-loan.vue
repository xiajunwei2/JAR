<template>
  <div class="applyloan-wrapper bg-color-white margin-tb-sm padding-bottom-xl jq-maxwidth">
    <set-title title-name='精准匹配'></set-title>
    <!-- 步骤 -->
    <my-steps :data='stepLists' :current='stepCurrent'></my-steps>
    <!-- 贷款信息 -->
    <div v-if='stepCurrent==0'>
      <div style='padding:30px;'>
        <div class="form-container" style='max-width:100%;margin:0;'>
          <div class="form-item">
            <span class="form-item-label required">资金来源：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-radio v-model='formInfo.orderLoanInfo.capitalSource' :options='fundFrom' align='center'></my-radio>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">贷款金额：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='formInfo.orderLoanInfo.amount'></my-input>
              <span class='append'>万元</span>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">贷款时间：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='formInfo.orderLoanInfo.loanTimes'></my-input>
              <span class='append'>个月</span>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">借款用途：</span>
            <span class="form-item-input">
              <Select size='large' v-model='formInfo.orderLoanInfo.loanUsage' style='width:330px;' class='jq-select' >
                <Option v-for='ad in usageSelect' :key='ad.value' :label="ad.value" :value='ad.key'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">还款来源：</span>
            <span class="form-item-input">
              <Select size='large' v-model='formInfo.orderLoanInfo.repaymentSource' style='width:330px;' class='jq-select' >
                <Option v-for='ad in sourceSelect' :key='ad.value' :label="ad.value" :value='ad.key'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">还款方式：</span>
            <span class="form-item-input">
              <Select size='large' v-model='formInfo.orderLoanInfo.rateType' style='width:330px;' class='jq-select' >
                <Option v-for='ad in repaySelect' :key='ad.value' :label="ad.value" :value='ad.key'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">担保方式：</span>
            <span class="form-item-input">
              <Select size='large' v-model='formInfo.orderLoanInfo.guaranteeType' style='width:330px;' class='jq-select' >
                <Option v-for='ad in guaranteeSelect' :key='ad.value' :label="ad.value" :value='ad.key'></Option>
              </Select>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 基本信息 -->
    <div v-if='stepCurrent==1'>
      <div style='padding:30px;'>
        <div class="form-container" style='max-width:100%;margin:0;'>
          <div class="form-item">
            <span class="form-item-label required">经营地址：</span>
            <span class="form-item-input">
              <Select size='large' :disabled='true' v-model='formInfo.customerLoanInfo.busProvince' style='width:130px;' class='margin-right jq-select' >
                <Option v-for='ad in addressLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
              </Select>
              <Select size='large' :disabled='true' v-model='formInfo.customerLoanInfo.busCounty' style='width:180px;' class='jq-select' >
                <Option v-for='ad in subAddLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">注册地址：</span>
            <span class="form-item-input">
              <Select size='large' :disabled='true' v-model='formInfo.customerLoanInfo.regProvince' style='width:130px;' class='margin-right jq-select' >
                <Option v-for='ad in addressLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
              </Select>
              <Select size='large' :disabled='true' v-model='formInfo.customerLoanInfo.regCounty' style='width:180px;' class='jq-select'>
                <Option v-for='ad in subAddLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">企业类型：</span>
            <span class="form-item-input">
              <Select size='large' v-model='formInfo.customerLoanInfo.companyIndustry' class='jq-select' style='width:330px;' >
                <Option v-for='ad in industrySelect' :key='ad.code' :label="ad.name" :value='ad.code'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">企业性质：</span>
            <span class="form-item-input">
              <Select size='large' v-model='formInfo.customerLoanInfo.companyNature' class='jq-select' style='width:330px;' >
                <Option v-for='ad in natureSelect'  :key='ad.code' :label="ad.name" :value='ad.code'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">经营年限：</span>
            <span class="form-item-input" style='width:330px;'>
              <Select size='large' v-model='formInfo.customerLoanInfo.busTime' class='jq-select' style='width:330px;' >
                <Option v-for='ad in busTimeSelect' :key='ad.code' :label="ad.name" :value='ad.code'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">注册资金：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='formInfo.customerLoanInfo.regFund' ></my-input>
              <span class='append'>万元</span>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">法人：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='formInfo.customerLoanInfo.legalMan' ></my-input>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">联系电话：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='formInfo.customerLoanInfo.contactTel' :max-length='11'></my-input>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 第三步骤 -->
    <div v-if='stepCurrent==2'>
      <!-- 企业征信情况 -->
      <div style='padding:30px;'>
        <div class="form-container" style='max-width:100%;margin:0;'>
          <div class="form-item">
            <span class="form-item-label required">当前被诉讼：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-radio v-model='formInfo.customerCredit.currentLawsuit' :options='hasToggle' align='center'></my-radio>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">当前被执行：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-radio v-model='formInfo.customerCredit.currentEnforced' :options='hasToggle' align='center'></my-radio>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">征信查询：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='formInfo.customerCredit.queryCount' ></my-input>
              <span class='append'>次</span>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required jq-relative">有无逾期：
              <i class='sub-desc'>(2年内)</i>
            </span>
            <span class="form-item-input" style='width:330px;'>
            <my-radio v-model='formInfo.customerCredit.overdue' :options='hasToggle' align='center'></my-radio>
            </span>
          </div>
          <div class="overtime bg-color-grey padding-tb-lg padding-lr-sm" style='width:500px;' v-if='formInfo.customerCredit.overdue>0'>
            <div class="form-item">
              <span class="form-item-label jq-relative">当前逾期：
                <i class='sub-desc'>(2年内)</i>
              </span>
              <span class="form-item-input" style='width:330px;'>
              <my-radio v-model='formInfo.customerCredit.currentOverdue' :options='hasToggle' align='center'></my-radio>
              </span>
            </div>
            <div class="form-item">
              <span class="form-item-label">逾期次数：</span>
              <span class="form-item-input" style='width:330px;'>
                <my-input v-model='formInfo.customerCredit.currentOverdueCount' ></my-input>
                <span class='append'>次</span>
              </span>
            </div>
            <div class="form-item">
              <span class="form-item-label">最长连续逾期：</span>
              <span class="form-item-input" style='width:330px;'>
                <my-input v-model='formInfo.customerCredit.continuousOverdueCount' ></my-input>
                <span class='append'>月</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 抵押资产信息 -->
    <!-- 贷款信息 -->
    <div v-if='stepCurrent==3'>
      <div style='padding:10px 20px;'>
        <div class="form-container guarantee" v-for='(item,index) in guaranteeLists' :key='index'>
          <div class="form-item jq-nav-label">
            <span class='title'>第{{index+1}}条抵押物信息</span>
            <Button class='jq-btn-grey margin-left-xl' v-if='index>0'  @on-click="delGuarantee(index)">删除本条抵押物信息</Button>
          </div>
          <div class="form-item">
            <span class="form-item-label required">资产类别：</span>
            <span class="form-item-input">
              <Select size='large' v-model='typeId' :disabled='true' style='width:330px;' class='jq-select' >
                <Option v-for='ad in loanTypeSelect' :key='ad.id+index' :label="ad.name" :value="ad.id"></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">资产类型：</span>
            <span class="form-item-input">
              <Select size='large' v-model='item.subType' style='width:330px;' class='jq-select' >
                <Option v-for='(name,index) in loanTypes' :key='index' :label="name" :value='name'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">资产所在区：</span>
            <span class="form-item-input">
              <Select size='large' v-model='item.assetsProvince' style='width:130px;' class='margin-right jq-select' >
                <Option v-for='ad in addressLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
              </Select>
              <Select size='large' v-model='item.assetsCounty' style='width:180px;' class='jq-select' >
                <Option v-for='ad in subAddLists' :key='ad.name' :label="ad.name" :value='ad.name'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">资产价值：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='item.worth' ></my-input>
              <span class='append'>万元</span>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">使用现状：</span>
            <span class="form-item-input">
              <Select size='large' v-model='item.useStatus' style='width:330px;' class='jq-select' >
                <Option v-for='ad in usageList' :key='ad.value' :label="ad.label" :value='ad.value'></Option>
              </Select>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">建筑年份：</span>
            <span class="form-item-input" style='width:330px;'>
              <my-input v-model='item.buildTime' ></my-input>
              <span class='append'>年</span>
            </span>
          </div>
          <div class="form-item">
            <span class="form-item-label required">资产所有权：</span>
            <span class="form-item-input">
              <Select size='large' v-model='item.ownership' style='width:330px;' class='jq-select' >
                <Option v-for='ad in allAssets' :key='ad.value' :label="ad.label" :value='ad.value'></Option>
              </Select>
            </span>
          </div>
        </div>
        <div class="guarantee-add margin-xl">
          <Button class='jq-btn-red'  @on-click="addGuarantee">添加抵押物信息</Button>
        </div>
      </div>
    </div>
    <!-- 步骤按钮 -->
    <div class='margin-xl' style='margin-left:150px;'>
      <Button v-if='stepCurrent>0' class='jq-btn-grey margin-right' style='width:120px;'  @on-click="handleProgress('pre')" :is-timeout='false'>上一步</Button>
      <Button v-if='stepCurrent<3' class='jq-btn-red' style='width:120px;'  @on-click="handleProgress('next')" :is-timeout='false'>下一步</Button>
      <Button v-if='stepCurrent==3' :loading='applyLoading' class='jq-btn-red' style='width:120px;'  @on-click="finish">提交贷款</Button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState([
      'capitalSelect',
      'loanTypeSelect',
      'repaySelect',
      'sourceSelect',
      'guaranteeSelect',
      'usageSelect',
      'industrySelect',
      'natureSelect',
      'busTimeSelect',
      'addressLists',
      'subAddLists'
    ]),
    loanTypes(){
      let obj = {description:''};
      if(this.loanTypeSelect.length){
        this.loanTypeSelect.forEach(item=>{
          if(item.id==this.typeId){
            obj = item;
          }
        })
      }
      return obj.description.split('、')
    }
  },
  data(){
    return {
      applyLoading:false,
      typeId:+(this.$route.query.id),
      formInfo:{
        order:{
          loanTypeId:+(this.$route.query.id)
        },
        orderLoanInfo:{
          capitalSource:0,
          amount:'',
          loanTimes:'',
          loanUsage:'',
          repaymentSource:'',
          rateType:'',
          guaranteeType:''
        },
        customerLoanInfo:{
          busProvince:'',
          busCounty:'',
          regProvince:'',
          regCounty:'',
          companyIndustry:'',
          companyNature:'',
          busTime:'',
          regFund:'',
          legalMan:'',
          contactTel:''
        },
        customerCredit:{
          overdue:0,
          currentLawsuit:0,
          currentEnforced:0,
          queryCount:''
        },
        assetsList:[]
      },
      stepLists:[
        {name:'贷款信息',src:require('@/assets/images/jq/step_1.png')},
        {name:'基本信息',src:require('@/assets/images/jq/step_2.png')},
        {name:'征信情况',src:require('@/assets/images/jq/step_3.png')},
        {name:'抵押物信息',src:require('@/assets/images/jq/step_4.png')},
      ],
      stepCurrent:0,
      hasToggle:[
        {value:1,label:'有'},
        {value:0,label:'无'},
      ],
      fundFrom:[
        {value:0,label:'不限制'},
        {value:1,label:'银行'},
        {value:2,label:'民间机构'}
      ],
      usageList:[
        {value:2,label:'自用'},
        {value:1,label:'租赁'},
        {value:0,label:'空置'},
      ],
      allAssets:[
        {value:1,label:'自有资产'},
        {value:0,label:'非自有资产'},
      ],
      busLists:[
        {value:1,label:'国有企业'},
        {value:2,label:'中外合资企业'},
        {value:3,label:'上市企业'},
        {value:4,label:'混合制企业'},
        {value:5,label:'私营企业'}
      ],
      guaranteeLists:[
        {
          assetsProvince:'',
          assetsCounty:'',
          type:'1',
          subType:'',
          worth:'',
          useStatus:'',
          ownership:'',
          buildTime:''
        }
      ]
    }
  },
  methods:{
    handleProgress(tag){
      switch(tag){
        case 'next':{
          let data = {},flag=true;
          if(this.stepCurrent==0){
            data = this.formInfo.orderLoanInfo;
          }else if(this.stepCurrent==1){
            data = this.formInfo.customerLoanInfo;
          }else if(this.stepCurrent==2){
            data = this.formInfo.customerCredit;
          }
          for(var key in data){
            if(data[key]===''){
              flag = false;
            }
          }
          if(!flag){
            this.$alert.success('请将信息填写完整后继续');
            return;
          }
          this.$fun.scroll2Top();
          this.stepCurrent++;
          break;
        }
        case 'pre':{
          this.stepCurrent--;
        }
      }
    },
    finish(){
      let flag = true;
      this.guaranteeLists.forEach(item=>{
        for(var key in item){
          if(item[key]===''){
            flag = false
          }
        }
      })
      if(!flag){
        this.$alert.success('请将信息填写完整后继续');
        return;
      }
      this.applyLoading = true;
      this.formInfo.assetsList = this.guaranteeLists;
      this.$api.order.orderApply(this.formInfo).then(res=>{
        this.applyLoading = false;
        if(!res.err){
          this.$alert.success('提交成功');
          this.$router.push({name:'choose-case',query:{oid:res.data.id}});
        }
      })
    },
    addGuarantee(){
      this.guaranteeLists.push({
        assetsProvince:'',
        assetsCounty:'',
        type:'1',
        subType:'',
        worth:'',
        useStatus:'',
        ownership:'',
        buildTime:''
      })
    },
    delGuarantee(i){
      this.guaranteeLists.splice(i,1)
    }
  },
  created(){
    let orderId = this.$route.query.oid;
    if(orderId){
      this.$api.order.getOrderById(orderId)
      .then(res=>{
        if(!res.err){
          this.typeId = res.data.order.loanTypeId
          this.formInfo = res.data||{
            order:{},
            customerLoanInfo:{},
            orderLoanInfo:{},
            customerCredit:{}
          }
          this.guaranteeLists = res.data.assetsList||[]
        }
      })
    }else{
      if(!this.typeId){
        this.$router.replace('/404')
        return;
      }
    }
    this.$store.dispatch('getSelects',{tag:'capital'})
    this.$store.dispatch('getSelects',{tag:'loanType'})
    this.$store.dispatch('getSelects',{tag:'repay'})
    this.$store.dispatch('getSelects',{tag:'source'})
    this.$store.dispatch('getSelects',{tag:'guarantee'})
    this.$store.dispatch('getSelects',{tag:'usage'})
    this.$store.dispatch('getSelects',{tag:'industry'})
    this.$store.dispatch('getSelects',{tag:'nature'})
    this.$store.dispatch('getSelects',{tag:'busTime'})
    this.$api.common.getBuss().then(res=>{
      if(!res.err){
        this.formInfo.customerLoanInfo.busProvince = res.data.busProvince
        this.formInfo.customerLoanInfo.busCounty = res.data.busCounty
        this.formInfo.customerLoanInfo.regProvince = res.data.regProvince
        this.formInfo.customerLoanInfo.regCounty = res.data.regCounty
      }
    })
  }
}
</script>

<style lang='less' scoped>
.append{
  position:absolute;
  top:1px;right:1px;
  width:40px;
  height:calc(100% - 2px);
  padding-top:10px;
  text-align: center;
  border-radius: 0 5px 5px 0;
  color:#fff;
  background-color:@orangeColor;
}
.sub-desc{
  position: absolute;
  bottom:-16px;left:10px;
  color:@text-color-grey;
  font-style: normal;
  font-size:12px;
}
.guarantee{
  max-width: 100%;
  margin:0;
  padding:10px 30px;
  margin-bottom:10px;
  padding-bottom:0;
  border-bottom:1px solid @border-color;
  &:hover{
    background:@bg-color-grey;
  }
}
.form-item{
  .form-item-label{
    color:#555;
    font-size:16px;
  }
}
.applyloan-wrapper{
  height:100%;
}
</style>