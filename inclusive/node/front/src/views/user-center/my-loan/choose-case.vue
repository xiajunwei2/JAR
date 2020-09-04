<template>
    <div class="choosecase-wrapper bg-color-white jq-maxwidth margin-tb-sm">
      <set-title title-name='精准匹配' :is-back='true'></set-title>
      <div class="choosecase-content padding-sm">
        <div class='match-list-box' style='min-height:calc(100vh - 400px);'>
          <ul class="match-case">
            <li v-for='(item,index) in matchLists' :key='index' class='match-case-item padding margin-bottom-sm'>
              <case-head :case-index='index' :data='item' @on-select='handleSelect'></case-head>
              <div class="margin-bottom-xl">
                <p class='margin-tb font-size-lg'>申请要求</p>
                <p class='text-color-grey'>{{item.requireList}}</p>
              </div>
              <div>
                <p class='margin-tb-sm font-size-lg'>资料清单</p>
                <p class='text-color-grey'>{{item.checkList}}</p>
              </div>
            </li>
          </ul>
          <ul class="match-case">
            <li v-for='(item,index) in recomLists' :key='index' class='match-case-item padding margin-bottom-sm'>
              <case-head :case-index='index' color='orange' :data='item'></case-head>
              <div class='text-color-orange margin-top-xl'>修改提示：{{item.matchDesc}}</div>
            </li>
          </ul>
        </div>
        <null-data :show='!listShow' msg='未匹配到产品<br/><br/>请修改信息重新匹配'></null-data>
        <div class="text-center margin-top-xl">
          <Button class="jq-btn-red" @on-click='rematch'>修改信息重新匹配</Button>
        </div>
      </div>
    </div>
</template>

<script>
import caseHead from './compts/head.vue';
export default {
  components:{
    caseHead
  },
  data(){
    return {
      orderId:this.$route.query.oid,
      matchLists:[],
      recomLists:[],
      listShow:true
    }
  },
  methods:{
    handleSelect(id){
      this.$api.order.selectCase(this.orderId,id)
      .then(res=>{
        if(!res.err){
          this.$alert.success('选择方案成功')
          this.$router.replace({name:'my-loan'})
        }
      })
    },
    // 修改信息重新匹配
    rematch(){
      this.$router.push({name:'apply-loan',query:{oid:this.orderId}})
    }
  },
  created(){
    if(!this.orderId){
      this.$router.replace('/404')
      return;
    }
    this.$api.order.getMatch(this.orderId)
    .then(res=>{
      if(!res.err){
        (res.data||[]).forEach(item=>{
          if(item.matchDesc){
            this.recomLists.push(item)
          }else{
            this.matchLists.push(item)
          }
        })
        this.listShow = (this.recomLists.length || this.matchLists.length);
      }
    })
  }
}
</script>

<style lang='less' scoped>
.choosecase-wrapper{
  min-width:900px;
}
.match-list-box{
    min-height: calc(100vh - 400px);
}
.match-case-item{
  background-color:#F7F7F7;
}
.text-color-grey{
  font-size:14px;
  font-family:Source Han Sans CN;
  font-weight:300;
  color:rgba(153,153,153,1);
  line-height:18px;
}
.font-size-lg{
  font-size:16px;
  font-family:Source Han Sans CN;
  font-weight:bold;
  color:rgba(51,51,51,1);
}
</style>