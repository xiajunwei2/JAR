<template>
  <div class="info">
      <table class="table" border>
          <tr><td class="title">经营年限</td><td class="ctx">{{data.busYearsStr}}</td></tr>
          <tr><td class="title">近一年度营业额</td><td class="ctx">{{data.lastTurnover}} 万元</td></tr>
          <tr><td class="title">固定资产净值</td><td class="ctx">{{data.fixAsset}} 万元</td></tr>
          <tr><td class="title">近一年实缴税额</td><td class="ctx">{{data.lastTaxAmount}} 万元</td></tr>
          <tr><td class="title">总资产</td><td class="ctx">{{data.asset}}</td></tr>
          <tr><td class="title">总负债</td><td class="ctx">{{data.liabilities}}</td></tr>
          <tr><td class="title">资产负债率</td><td class="ctx">{{data.debtRatio}}</td></tr>
          <tr><td class="title">流动比率</td><td class="ctx">{{data.currentRatio}}</td></tr>
          <tr><td class="title">速动比率</td><td class="ctx">{{data.quickRatio}}</td></tr>
          <tr><td class="title">现金比率</td><td class="ctx">{{data.cashRatio}}</td></tr>
      </table>
  </div>
</template>
<script>
export default {
    props:['data'],
    data() {
        return {
          
        }
    },
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
            width:173px;
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
</style>