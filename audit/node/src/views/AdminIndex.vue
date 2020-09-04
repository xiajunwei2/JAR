<template>
  <div id="myChart"></div>
</template>

<script>
	// import Api from '@/api/api.js'
import echarts from 'echarts'
export default {
   data() {
     return {
       
     }
   },
   mounted (){
     this.getEchartsData()
     this.renderCharts()
   },
   methods: {
     renderCharts(){
        let myChart = echarts.init(document.getElementById('myChart'));

        // 指定图表的配置项和数据
        let option = {
          series: [{
              type: 'pie',
              radius: '55%',
              data: [{
                value: 28
              },
              {
                value: 72
              }]
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
     }
   }
}
</script>

<style lang="less" scoped>
#myChart {
  width: 100%;
  height: 100%;
}
</style>