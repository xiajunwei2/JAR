<template>
  <div id="myChart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      items:{},
      myChart:null
    };
  },
  mounted() {
    // this.renderCharts();
  },
  methods: {
    renderCharts() {
      let e = document.documentElement.clientWidth;
      let myChart = echarts.init(document.getElementById("myChart"));
      this.myChart = myChart;
      var color = ["#006ced", "#ffe000", "#ffa800", "#ff5b00", "#ff3000"];
      let itemStyle = {
        normal: {
          opacity: 0.7,
          borderWidth: 3,
          borderColor: "#235894",
        },
      };
      // 指定图表的配置项和数据
      let option = {
        animation: true,
        animationDuration: 5000,
        color: color,
        legend: {
          orient: "vertical",
          bottom: "bottom",
          data: ["已审核", "待审核"],
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}"
        },

        series: [
          {
            type: "pie",
            radius: "80%", //设置饼图大小
            label: {
              position: "inner",
              fontSize: e/1080*9,
              color: "#235894",
              formatter: "{b}：{c}%",
              //   formatter: "{b|{b}：}{c}{per|{d}%}  ",
            },
            // data: [
            //   { value: '0.0', name: "已审核" },
            //   { value: '0.0', name: "待审核" },
            // ],
            data: [
              { value: this.items.doneRate, name: "已审核" },
              { value: this.items.undoneRate, name: "待审核" },
            ],
            itemStyle: itemStyle,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      //监听页面宽度变化重新渲染canvas
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    setData(data){
      this.items=data
      this.renderCharts();
    }
  },
};
</script>

<style lang="less" scoped>
#myChart {
  width: 100%;
  height: 100%;
}
</style>
