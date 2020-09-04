<template>
  <div class="myloan-wrapper">
    <set-title title-name='借款申请'></set-title>
    <div class="filter-container padding-tb padding-lr-lg jq-c-center" style="padding-top:21px;padding-bottom:27px;">
      <router-link to='/loan-type'>
        <Button class='jq-btn-red margin-right-lg' style='padding:5px;width:63px;height:30px;line-height:20px;background:rgba(214,53,46,1);border-radius:10px;font-size:16px;'>添加</Button>
      </router-link>
      <div class="margin-right-xl">
        <span style="font-size:16px;">申请日期：</span>
        <DatePicker v-model='date' @on-change='handleDateChange' format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="开始日期 - 结束日期" style="width: 300px"></DatePicker>
      </div>
      <div>
        <span style="font-size:16px;">申请状态：</span>
        <Select v-model='searchMap.status' style='width:300px;' class='jq-select' @on-change='getLists'>
          <Option v-for='ad in statusLists' :key='ad.name' :label="ad.name" :value='ad.code'></Option>
        </Select>
      </div>
    </div>
    <div class="table-container">
      <Table class='jq-table' stripe :columns="tableColumns" :data="dataLists" :loading='loading'></Table>
      <my-page :page-map='pageMap' :is-to-top='false' @on-page='handlePage'></my-page>
    </div>
  </div>
</template>

<script>
import listMixin from '@/mixins/list.mixin.js';
export default {
  mixins:[listMixin],
  data(){
    return {
      date:[],
      searchMap:{
        status:'',
        startTime:'',
        endTime:''
      },
      statusLists:[],
      tableColumns: [
        {
          type:'index',
          title:'序号',
          width:70,
          align:'center',
        },
        {
          title: '担保形式',
          key: 'guaranteeTypeDesc',
          align:'center',
          render:(h,params)=>{
            return h('div',params.row.guaranteeTypeDesc||'抵押贷款')
          }
        },
        {
          title: '融资额度',
          key: 'amount',
          align:'center',
          render:(h,params)=>{
            let status = params.row.order.status;
            return h('div',{'class':[status>200&&'text-color-red']},params.row.orderLoanInfo.amount+'.00万元');
          }
        },
        {
          title: '融资期限',
          key: 'loanTimes',
          align:'center',
          render:(h,params)=>{
            return h('div',params.row.orderLoanInfo.loanTimes+'个月')
          }
        },
        {
          title: '申请时间',
          key: 'requestTime',
          align:'center',
          width:180,
          render:(h,params)=>{
            let status = params.row.order.status;
            return h('div',{'class':[status>200&&'text-color-grey']},params.row.order.requestTime)
          }
        },
        {
          title: '状态',
          key: 'orderStatusDesc',
          align:'center'
        },
        {
          title: '操作',
          width:200,
          align:'center',
          render:(h,params)=>{
            let b = [];
            let status = params.row.order.status;
            b.push(h('span',{'class':['text-color-'+(status>200?'grey':'orangedark'),'margin-right-sm',status<=200&&'text-active-a'],on:{
              click:e=>{
                if(status>200) return;
                this.$router.push({name:'choose-case',query:{oid:params.row.order.id}})
              }
            }},'选择方案'))
            b.push(h('span',{'class':['text-color-orangedark','margin-right-sm','text-active-a'],on:{
              click:e=>{
                this.$router.push({name:'order-info',query:{oid:params.row.order.id}})
              }
            }},'详情'))
            b.push(h('span',{'class':['text-color','text-active-a'],on:{
              click:e=>{

              }
            }},'取消贷款'))
            return b;
          }
        }
      ],
    }
  },
  methods:{
    getLists(){
      this.loading = true;
      this.$api.order.getOrder({
        rows:this.pageMap.size,
        page:this.pageMap.current,
        customerId:this.$store.state.user.myBaseInfo.customerId,
        ...this.searchMap
      }).then(this.handleResponse)
    },
    handleDateChange(item){
      this.searchMap.startTime = this.$fun.moment(item[0]);
      this.searchMap.endTime = this.$fun.moment(item[1]);
      this.getLists();
    }
  },
  created(){
    this.$api.order.getStatus().then(res=>{
      if(!res.err){
        this.statusLists = (res.data||[]).reduce((pre,item)=>{
          pre.push({
            code:Object.keys(item)[0],
            name:Object.values(item)[0]
          })
          return pre;
        },[])
      }
    })
  }
}
</script>

<style scoped>
.table-container{
  min-height:300px;
}
.table-container >>>  .ivu-table-cell span{
    font-size:16px;
    font-weight:300;
  }
.table-container >>> td:nth-child(6) .ivu-table-cell span{
    font-size:14px;
    font-weight:300;
    color:#555555;
}
.table-container >>>  .ivu-table-cell span.text-active-a,.table-container >>>  .ivu-table-cell span.margin-right-sm{
    font-size:14px;
    font-weight:300;
  }
.table-container >>>  .ivu-table-cell span.margin-right-sm{
    color:#FE5003;
  }
.table-container >>>  .ivu-table-cell div{
    font-size:14px;
    font-weight:300;
    color:#555;
  }
.table-container >>> .ivu-table td{
  border:none;
}
.table-container >>> .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td{
  background:#F2F2F2;
}
.table-container >>> .ivu-table:before{
  height:0px;
}
</style>
