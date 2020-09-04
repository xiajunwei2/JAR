<template>
  <div class="loantype-wrapper bg-color-white jq-maxwidth margin-tb-sm">
    <set-title title-name='贷款类型' :is-back='true'></set-title>
    <div class="loantype-container padding-sm">
      <my-card v-for='type in typeLists' :key='type.name' :title-name='type.name' class='margin-bottom-sm'>
        <div class="jq-flex-btw jq-c-center">
          <span>{{type.description}}</span>
          <Button class="btn-border-red" style='padding:6px 16px;border-radius:20px' @on-click='chooseType(type)'>选择该分类</Button>
        </div>
      </my-card>
    </div>
    <div class='text-center padding'>
      <router-link to='/user-center/my-loan'>
        <Button class="jq-btn-red">返回借款列表</Button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      typeLists:[
        // {name:'住宅抵押贷',description:'普通住宅、住宅（划拨）、经济适用房、公租房、还建房、自建房（宅基地）、花园洋房、别墅'},
        // {name:'商铺抵押贷',description:'门面、商场、写字楼、市场摊位'},
        // {name:'厂房抵押贷',description:'标准厂房（钢结构）、标准厂房（钢混结构）、普通厂房（砖混）、普通厂房（土木）'},
      ]
    }
  },
  methods:{
    chooseType(item){
      this.$router.push({name:'apply-loan',query:{'id':item.id}})
    }
  },
  created(){
    this.$api.common.getLoanType()
    .then(res=>{
      if(!res.err){
        this.typeLists = res.data||[]
      }
    })
  }
}
</script>
<style scoped>
.loantype-container >>> .card-wrapper{border:1px solid #E0E2E0;}
.loantype-container >>> .card-wrapper .title{border-bottom:none;}
.loantype-wrapper{position:relative;min-height:calc(100vh - 260px);}
.loantype-wrapper .text-center{position: absolute;bottom: 0px;left: 50%;transform: translateX(-50%);}
</style>
