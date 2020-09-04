<template>
  <div>
    <div :id="optionData.chartsId" style="background:#fff;height:30vh;"></div>
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
    console.log(this.optionData.chartsDataX);
    console.log(this.optionData.chartsData);
    
  },
  methods: {
    initCharts() {
      var colorList = [
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

      let vm = this;
      let myChart1 = this.$echarts.init(
        document.getElementById(vm.optionData.chartsId)
      );

      // const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
      let options = {
        backgroundColor: "#fff",
        legend: {
          icon: "circle",
          top: "5%",
          right: "5%",
          itemWidth: 6,
          itemGap: 20,
          textStyle: {
            color: "#556677",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 0,
            },
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
        },
        grid: {
          top: "15%",
        },
        xAxis: [
          {
            type: "category",
            data: this.optionData.chartsDataX,
            axisLine: {
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#556677",
              },
              // 默认x轴字体大小
              fontSize: 12,
              // margin:文字到x轴的距离
              margin: 15,
            },
            axisPointer: {
              label: {
                // padding: [11, 5, 7],
                padding: [0, 0, 10, 0],
                margin: 15,
                // 移入时的字体大小
                fontSize: 12,
                backgroundColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      // offset: 0.9,
                      offset: 0.86,
                      /*
0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
                        
                        */
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#33c0cd", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#33c0cd", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#556677",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Adidas",
            type: "line",
            data: this.optionData.chartsData[0],
            symbolSize: 1,
            symbol: "circle",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#9effff",
                },
                {
                  offset: 1,
                  color: "#9E87FF",
                },
              ]),
              shadowColor: "rgba(158,135,255, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[0],
                borderColor: colorList[0],
              },
            },
          },
          {
            name: "Nike",
            type: "line",
            data: this.optionData.chartsData[1],

            symbolSize: 1,
            symbol: "circle",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new this.$echarts.graphic.LinearGradient(1, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#73DD39",
                },
                {
                  offset: 1,
                  color: "#73DDFF",
                },
              ]),
              shadowColor: "rgba(115,221,255, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[1],
                borderColor: colorList[1],
              },
            },
          },
          {
            name: "老北京布鞋",
            type: "line",
            data: this.optionData.chartsData[2],

            symbolSize: 1,
            yAxisIndex: 1,
            symbol: "circle",
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#fe9a",
                },
                {
                  offset: 1,
                  color: "#fe9a8b",
                },
              ]),
              shadowColor: "rgba(254,154,139, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[2],
                borderColor: colorList[2],
              },
            },
          },
        ],
      };
      if (this.optionData.chartsData.length) {
        myChart1.setOption(options);
      }
      window.addEventListener("resize", () => {
        myChart1.resize();
      });
    },
  },
};
</script>

<style>
</style>
