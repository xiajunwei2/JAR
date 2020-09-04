<template>
  <div class="head-wrapper jq-maxwidth">
    <span :class="['jq-gradient-'+color,'padding-tb-sm','padding-lr','text-color-white','border-radius','font-size-xl']">{{color=='red'?'匹配':'推荐'}}方案{{caseIndex | case}}</span>
    <span>
      <!-- <img src="@/assets/images/jq/logo_gongshang.png" alt="" class='margin-right'> -->
      <span class="text-color-grey margin-right">金融机构</span>
      <!-- <span class='font-size-xl'><b>{{data.capitalName}}</b></span> -->
      <span class='font-size-xl'><b><span style="vertical-align:bottom;">****</span> 银行</b></span>
    </span>
    <span>
      <span class="text-color-grey">贷款利率</span>
      <span>
        <span class="text-color-orange text-bold" style='font-size:20px;vertical-align:baseline'>{{data.rate}}%</span>
        <b class='font-size-lg'>/<span class='font-size-sm'>月</span></b>
      </span>
    </span>
    <span>
      <span class="text-color-grey">还款方式</span>
      <span class='text-color-orange text-bold margin-left-xs font-size-xl'>{{data.rateTypeName}}</span>
    </span>
    <span>
      <span class="text-color-grey">抵押率</span>
      <span>
        <span class="text-color-orange text-bold" style='font-size:20px;vertical-align:baseline'>{{data.mortgageRate}}</span>
        <b class='font-size-lg'>/<span class='font-size-sm'>月</span></b>
      </span>
    </span>
    <Button class="jq-btn-red" v-if="color=='red'" style="font-size:15px;" @on-click='handleSelect'>选择该方案</Button>
  </div>  
</template>

<script>
export default {
  props:{
    caseIndex:{
      type:Number,
      default:0
    },
    color:{
      default:'red'
    },
    data:{
      default:()=>{
        return {}
      }
    }
  },
  filters:{
    case(index){
      let arr = ["一","二","三","四","五","六","七","八","九"]
      return arr[index]
    }
  },
  methods:{
    handleSelect(){
      this.$emit('on-select',this.data.id)
    }
  }
}
</script>

<style lang='less' scoped>
.head-wrapper{
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding:10px 0;
  border-bottom:1px solid @border-color;
}
span{
  vertical-align: middle;
}
</style>