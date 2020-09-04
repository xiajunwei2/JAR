<template>
  <div class="orderinfo-wrapper">
    <set-title title-name='订单详情' :is-back='true'></set-title>
    <div class="orderinfo-container padding-sm">
      <my-card title-name='订单详情' class='margin-bottom-sm'>
        <div class="row">
          <div class="col-md-5">
            <span class="text-color-grey">订单号：</span>
            <span>{{orderInfo.order.orderNo}}</span>
          </div>
          <div class="col-md-4">
            <span class="text-color-grey">申请时间：</span>
            <span>{{orderInfo.order.requestTime}}</span>
          </div>
          <div class="col-md-3">
            <span class="text-color-grey">订单状态：</span>
            <span class='text-color-green'>{{orderInfo.orderStatusDesc}}</span>
          </div>
        </div>
      </my-card>
      <my-card title-name='借款信息' class='margin-bottom-sm'>
        <div class="row margin-bottom">
          <div class="col-md-5">
            <span class="text-color-grey">借款金额：</span>
            <span>{{orderInfo.orderLoanInfo.amount}}万元</span>
          </div>
          <div class="col-md-4">
            <span class="text-color-grey">使用期限：</span>
            <span>{{orderInfo.orderLoanInfo.loanTimes}}个月</span>
          </div>
          <div class="col-md-3">
            <span class="text-color-grey">资金来源：</span>
            <span>{{orderInfo.orderLoanInfo.capitalSource | handleSelect(fundFrom,'value','label')}}</span>
          </div>
        </div>
        <div class="row">
            <div class="col-md-5">
              <span class="text-color-grey">借款用途：</span>
              <span>{{orderInfo.orderLoanInfo.loanUsage | handleSelect(usageSelect,'key','value')}}</span>
            </div>
            <div class="col-md-4">
              <span class="text-color-grey">借款来源：</span>
              <span>{{orderInfo.orderLoanInfo.repaymentSource | handleSelect(sourceSelect,'key','value')}}</span>
            </div>
            <div class="col-md-3">
              <span class="text-color-grey">担保方式：</span>
              <span>{{orderInfo.orderLoanInfo.guaranteeType | handleSelect(guaranteeSelect,'key','value')}}</span>
            </div>
          </div>
      </my-card>
      <my-card title-name='企业基本信息' class='margin-bottom-sm'>
        <div class="row margin-bottom">
          <div class="col-md-5">
            <span class="text-color-grey">注册地址：</span>
            <span>{{orderInfo.customerLoanInfo.regProvince}}{{orderInfo.customerLoanInfo.regCounty}}</span>
          </div>
          <div class="col-md-4">
            <span class="text-color-grey">经营地址：</span>
            <span>{{orderInfo.customerLoanInfo.busProvince}}{{orderInfo.customerLoanInfo.busCounty}}</span>
          </div>
          <div class="col-md-3">
            <span class="text-color-grey">企业类型：</span>
            <span>{{orderInfo.customerLoanInfo.companyIndustry | handleSelect(industrySelect,'code')}}</span>
          </div>
        </div>
        <div class="row">
            <div class="col-md-5">
              <span class="text-color-grey">所属企业：</span>
              <span>{{orderInfo.customerLoanInfo.companyNature | handleSelect(natureSelect,'code')}}</span>
            </div>
            <div class="col-md-4">
              <span class="text-color-grey">经营年限：</span>
              <span>{{orderInfo.customerLoanInfo.busTime | handleSelect(busTimeSelect,'code')}}</span>
            </div>
          </div>
      </my-card>
    </div>
    <div class='text-center margin'>
      <Button class="jq-btn-red" style='border-radius:0;' @on-click='$router.back(1)'>返回借款列表</Button>
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
  },
  filters:{
    handleSelect(val,arr,by='id',get='name'){
      let str = '';
      (arr||[]).forEach(item=>{
        if(val==item[by]){
          str = item[get];
        }
      })
      return str;
    }
  },
  data(){
    return {
      orderInfo:{
        order:{},
        customerLoanInfo:{},
        orderLoanInfo:{},
        customerCredit:{}
      },
      fundFrom:[
        {value:0,label:'不限制'},
        {value:1,label:'银行'},
        {value:2,label:'民间机构'}
      ],
    }
  },
  created(){
    this.$store.dispatch('getSelects',{tag:'capital'})
    this.$store.dispatch('getSelects',{tag:'loanType'})
    this.$store.dispatch('getSelects',{tag:'repay'})
    this.$store.dispatch('getSelects',{tag:'source'})
    this.$store.dispatch('getSelects',{tag:'guarantee'})
    this.$store.dispatch('getSelects',{tag:'usage'})
    this.$store.dispatch('getSelects',{tag:'industry'})
    this.$store.dispatch('getSelects',{tag:'nature'})
    this.$store.dispatch('getSelects',{tag:'busTime'})
    let orderId = this.$route.query.oid;
    if(!orderId)return
    this.$api.order.getOrderById(orderId)
    .then(res=>{
      // console.log(res)
      if(!res.err){
        this.orderInfo = res.data||{
          order:{},
          customerLoanInfo:{},
          orderLoanInfo:{},
          customerCredit:{}
        }
      }
    })
  }
}
</script>

<style lang='less' scoped>
  .orderinfo-container{
    min-height:300px;
  }
</style>