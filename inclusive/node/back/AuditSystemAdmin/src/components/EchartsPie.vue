
<template>
  <div>
    <div :id="optionData.chartsId" style="background:#fff;height:100%;"></div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "lineCharts",
  data() {
    return {};
  },
  props: ["optionData"],
  components: {},
  watch: {
    optionData: {
      handler() {
        let vm = this;
        vm.initCharts();
      },
      deep: true,
    },
  },
  mounted() {
    let vm = this;
    vm.initCharts();
  },
  methods: {
    initCharts() {
      let vm = this;

      var color = [
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
        "#0090ff",
        "#06d3c4",
        "#ffbc32",
        "#2ccc44",
        "#ff3976",
        "#6173d6",
        "#914ce5",
        "#42b1cc",
        "#ff55ac",
      ];

      let myChart = this.$echarts.init(
        document.getElementById(vm.optionData.chartsId)
      );
      // 指定图表的配置项和数据
      let option = {
        title: {
          left: "center",
          text: vm.optionData.title,
          top: "20",
        },
        animation: true,
        animationDuration: 5000,
        color: color,
        legend: {
          orient: "vertical",
          right: "10%",
          align: "right",
          top: "middle",
          data: vm.optionData.title,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}",
        },
        series: [
          {
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#fff",
                color: function (params) {
                  return color[Math.floor(Math.random() * (29 - 1 + 1) + 1)];
                },
              },
            },
            type: "pie",
            // radius: "40%", //设置饼图大小
            label: {
              position: "inner",
              fontSize: 18,
              color: "#fff",
              formatter: "{c}",
            },
            data: vm.optionData.chartsData,
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
  },
};
</script>

<style>
</style>
